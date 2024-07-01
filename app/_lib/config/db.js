import mongoose from 'mongoose';

export const connectDB = async () => {
	await mongoose.connect(`${process.env.MONGO_URI}/blog-app`);
	console.log('Db connected successfully');
};
