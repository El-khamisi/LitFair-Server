const skillsModel = require('./model-skills')
const connection = require('../../../DB/MongDB.config');
connection("skills")
const getAll =async(req,res)=>{
    console.log('get all')
    const result = await skillsModel.find({}) 
    res.json(result)
}
const search =async(req, res)=>{
    const skill =req.query.skill? req.query.skill : ""
    const regSkill= new RegExp(`^${skill}|. ${skill}`,"i")
    const result =  await skillsModel.find({"skills" :{$regex : regSkill}}).limit(50).sort()
    console.log(result)
    res.json(result)
}
const newSkill = async (req, res)=>{
    const skill = new skillsModel({'Skills Keys': req.params.skillName})
    await skill.save();
    res.send(skill);
}
module.exports = {getAll, search, newSkill}