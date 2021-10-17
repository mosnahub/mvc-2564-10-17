const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cpuUtilSchema = new Schema(
	{
		_id: {
			type: String,
			required: true,
		},
		cpu: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

cpuUtilSchema.methods.upsert = function (t, c) {
	let time = parseFloat(t);
	let cpu = parseInt(c);

	if (time % 5 != 0) {
		time = Math.floor(time / 5) * 5 + 5;
	}

	this.model('CPUUtil').findById({ _id: time.toString() }, (err, cpuUtil) => {
		if (err) {
			console.log(err);
			return;
		}

		if (cpuUtil) {
			if (cpu > parseInt(cpuUtil.cpu)) {
				cpuUtil.cpu = cpu;
				return cpuUtil.save();
			}
			return;
		}
		this.model('CPUUtil').create({
			_id: time.toString(),
			cpu: cpu.toString(),
		});
		return;
	});
};

const CPUUtil = mongoose.model('CPUUtil', cpuUtilSchema);
module.exports = CPUUtil;
