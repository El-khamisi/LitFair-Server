const router = require('express').Router();
const { successfulRes } = require('../../utils/response');

const { jobType, experienceType } = require('../job/model');

const jobStatus = {
    unemployed: 'I am unemployed and desperate for a job',
    looking: 'I am actively looking for new opportunities and jobs',
    happy: `I am happy where I am but don't mind finding good opportunities`,
    interested: `I am only interested in very specific opportunities`,
    notLooking: `I am not looking for a job`
};

router.get('/job-config', (req, res) => {
    successfulRes(res, 200, {
        job_type: jobType,
        experience_type: experienceType,
        job_status: jobStatus
    });
});

module.exports = router;
