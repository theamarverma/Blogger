'use client';
import React, { useEffect, useState } from 'react';
import BlogTableItem from '@/app/_components/AdminComponents/BlogTableItem';
import axios from 'axios';
import { toast } from 'react-toastify';

const Page = () => {
	const [blogs, setBlogs] = useState([]);

	const fetchBlogs = async () => {
		const res = await axios.get('/api/blog');
		setBlogs(res.data.blogs);
	};

	const deleteBlog = async (mongoId) => {
		const res = await axios.delete('/api/blog', {
			params: {
				id: mongoId,
			},
		});
		toast.success(res.data.msg);
		if (res.data.success) {
			fetchBlogs(); //after deleting the blog, fetch the blogs again like refresh the data
		}
	};

	useEffect(() => {
		fetchBlogs();
	}, []);
	return (
		<div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
			<h1>All blogs</h1>
			<div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray scrollbar-hide">
				<table className="w-full text-sm text-gray-500">
					<thead className="text-sm text text-gray-700 text-left uppercase bg-gray-50">
						<tr>
							<th
								scope="col"
								className="hidden sm:block px-6 py-3 "
							>
								Author Name
							</th>
							<th
								scope="col"
								className=" px-6 py-3 "
							>
								Blog Title
							</th>
							<th
								scope="col"
								className=" px-6 py-3 "
							>
								Date
							</th>
							<th
								scope="col"
								className=" px-6 py-3 "
							>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{blogs.map((item, index) => {
							console.log(item);
							return (
								<BlogTableItem
									key={index}
									mongoId={item._id}
									title={item.title}
									author={item.author}
									authorImg={item.authorImg}
									date={item.date}
									deleteBlog={deleteBlog}
								/>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Page;
