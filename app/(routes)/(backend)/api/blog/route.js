import { connectDB } from '@/app/_lib/config/db';
import blogModel from '@/app/_lib/models/blogModel';
import { log } from 'console';
import { writeFile } from 'fs/promises';
const { NextResponse } = require('next/server');

const fs = require('fs');
const LoadDB = async () => {
	await connectDB();
};

LoadDB();
//api endpoint for getting all blogs
export async function GET(request) {
	const blogId = request.nextUrl.searchParams.get('id');

	if (blogId) {
		const blog = await blogModel.findById(blogId);
		return NextResponse.json(blog);
	} else {
		const blogs = await blogModel.find({});

		return NextResponse.json({
			blogs,
		});
	}
}
//Api endpoint for adding a blog
export async function POST(request) {
	const formData = await request.formData();
	const timestamp = Date.now();

	const image = formData.get('image');

	const imageByteData = await image.arrayBuffer();

	const buffer = Buffer.from(imageByteData);

	const path = `./public/${timestamp}_${image.name}`;

	await writeFile(path, buffer);

	const imgUrl = `/${timestamp}_${image.name}`;

	const blogData = {
		title: `${formData.get('title')}`,
		category: `${formData.get('category')}`,
		description: `${formData.get('description')}`,
		author: `${formData.get('author')}`,
		image: `${imgUrl}`,
		authorImg: `${formData.get('authorImg')}`,
	};

	await blogModel.create(blogData);
	console.log('blog created');
	return NextResponse.json({
		success: true,
		msg: 'blog created',
	});
}

//creating Api endpoint for deleting a blog

export async function DELETE(request) {
	const blogId = await request.nextUrl.searchParams.get('id');
	const blog = await blogModel.findById(blogId);
	fs.unlink(`./public${blog.image}`, (err) => {
		if (err) {
			console.log(err);
		}
	});

	await blogModel.findByIdAndDelete(blogId);
	return NextResponse.json({
		msg: 'blog deleted',
	});
}
