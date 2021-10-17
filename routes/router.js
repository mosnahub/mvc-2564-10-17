const express = require('express');

const router = express.Router();

const cpuUtilController = require('../controllers/cpuUtil');

router.get('/', cpuUtilController.getIndex);

router.post('/cpu-util', cpuUtilController.postCPUUtil);

module.exports = router;
