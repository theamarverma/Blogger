import { connectDB } from '@/app/_lib/config/db';
import emailModel from '@/app/_lib/models/emailModel';
import { NextResponse } from 'next/server';

const LoadDB = async () => {
	await connectDB();
};
LoadDB();
export async function POST(request) {
	const formData = await request.formData();
	const email = formData.get('email');
	const emailData = {
		email,
	};
	await emailModel.create(emailData);
	return NextResponse.json({
		success: true,
		msg: 'Email added',
	});
}

export async function GET(request) {
	const emails = await emailModel.find({});
	return NextResponse.json({ emails });
}

export async function DELETE(request) {
	const emailId = request.nextUrl.searchParams.get('id');
	await emailModel.findByIdAndDelete(emailId);
	return NextResponse.json({
		success: true,
		msg: 'Email deleted',
	});
}
