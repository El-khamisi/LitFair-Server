const amqp = require('amqplib/callback_api');
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
require('dotenv').config();

const env = {
	job_DB: process.env.job_DB,
    // rabbitMQ
    MQ_URL: process.env.MQ_URL,
    PUBLISH_VIDEOMQ_NAME: process.env.PUBLISH_VIDEOMQ_NAME,
    CONSUME_VIDEOMQ_NAME: process.env.CONSUME_VIDEOMQ_NAME,
};
const appModel  = (async (_id, predictions) => {



mongoose.connect(env.job_DB).then(async(connection)=>{

//const connection = mongoose.connection;
let doc = await mongoose.connection.collection('applications').find({_id: ObjectId(_id.appId)}).toArray();
doc = doc[0];
let update = {};
for(const [key, value] of Object.entries(predictions)){
	const inc = (doc.feedback_1[key]+predictions[key])/5;
	update[key] = Math.round( inc * 100) / 100;

}
 res = await mongoose.connection.collection('applications').updateOne({_id: ObjectId(_id.appId)}, {$set:{feedback_1:update}});
connection.disconnect();

console.log(res);

})



    return 
});
// appModel;

async function receive() {
    try {

        amqp.connect(env.MQ_URL, function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }
                channel.assertQueue(env.CONSUME_VIDEOMQ_NAME, {
                    durable: false
                });


                console.log("[x] Jobs queue Waiting for messages. To exit press CTRL+C");

                channel.consume(env.CONSUME_VIDEOMQ_NAME, function(msg) {
			
			const obj = JSON.parse(msg.content);
			appModel(obj._id, obj.predictions);
			
                    console.log(" [x] Received %s", msg.content.toString());
                    channel.ack(msg);

                }, 
                {
                    noAck: false
                });


            });
        });
    } catch (e) {
        console.log(e)
    }
}


receive();