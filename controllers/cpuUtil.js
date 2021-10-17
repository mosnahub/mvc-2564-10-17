const CPUUtil = require('../models/cpuUtil');

exports.getIndex = (req, res, next) => {
	CPUUtil.find()
		.sort({ updatedAt: -1 })
		.then((result) => {
			res.render('index', {
				path: '/',
				title: 'Home Page',
				cpuUtils: result,
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.postCPUUtil = (req, res, next) => {
	const time = req.body.time;
	const cpu = req.body.cpu;

	const cpuUtil = new CPUUtil();

	cpuUtil.upsert(time, cpu);

	res.redirect('/');
};
