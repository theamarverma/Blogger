import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const emailModel =
	mongoose.models.email || mongoose.model('email', emailSchema); //if model already exists, use it, else create a new one

export default emailModel;
