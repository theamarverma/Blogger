import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

console.log('MONGODB_URI:', MONGODB_URI); // Add this line to debug

if (!MONGODB_URI) {
	throw new Error(
		'Please define the MONGODB_URI environment variable inside .env.local'
	);
}

export const connectDB = async () => {
	try {
		const status = await mongoose.connect(MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		// console.log(status.connection.host);s
		console.log('Db connected successfully');
	} catch (error) {
		console.error('Error connecting to database', error);
		process.exit(1);
	}
};
