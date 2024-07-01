'use client';
import { assets } from '@/app/_assets/assets';
import axios from 'axios';

import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Page = () => {
	const [image, setImage] = useState(false);
	const [data, setData] = useState({
		title: '',
		description: '',
		category: 'Startup',
		author: 'Alex Bennett',
		authorImg: '/authorImg.png',
	});

	const onChangeHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setData((prevData) => ({
			...prevData,
			[name]: value,
		}));
		console.log(data);
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault(); // prevent page reload
		const formData = new FormData();
		formData.append('title', data.title);
		formData.append('description', data.description);
		formData.append('category', data.category);
		formData.append('author', data.author);
		formData.append('authorImg', data.authorImg);
		formData.append('image', image);
		const res = await axios.post('/api/blog', formData);
		console.log(res);
		if (res.data.success) {
			toast.success(res.data.msg);
			//reset form
			setImage(false);
			setData({
				title: '',
				description: '',
				category: 'Startup',
				author: 'Alex Bennett',
				authorImg: '/authorImg.png',
			});
			//
		} else {
			toast.error(res.data.msg);
		}
	};

	return (
		<>
			<form
				onSubmit={onSubmitHandler}
				className="pt-5 px-5 sm:pt-12 sm:pl-16"
				action=""
			>
				<p className="text-xl">Upload thumbnail</p>
				<label htmlFor="image">
					<Image
						src={!image ? assets.upload_area : URL.createObjectURL(image)}
						width={140}
						height={70}
						alt=""
					/>
				</label>
				<input
					onChange={(e) => {
						setImage(e.target.files[0]);
					}}
					type="file"
					id="image"
					hidden
					required
				/>
				<p className="text-xl mt-4 ">Blog title</p>
				<input
					name="title"
					onChange={onChangeHandler}
					value={data.title}
					className="w-full sm:w-[500px] mt-4 px-4 py-3 border "
					type="text"
					placeholder="type here"
					required
				/>
				<p className="text-xl mt-4 ">Blog Description</p>
				<textarea
					name="description"
					onChange={onChangeHandler}
					value={data.description}
					className="w-full sm:w-[500px] mt-4 px-4 py-3 border "
					type="text"
					placeholder="write content here"
					rows={6}
					required
				/>
				<p className="text-xl mt-4 ">Blog Category</p>
				<select
					onChange={onChangeHandler}
					value={data.category}
					name="category"
					className="w-40 mt-4 px-4 py-3 border text-gray-500 "
				>
					<option value="Startup">Startup</option>
					<option value="Technology">Technology</option>
					<option value="LifeStyle">Lifestyle</option>
				</select>
				<br />
				<button
					type="submit"
					className="mt-8 w-40 h-12 bg-black text-white"
				>
					ADD
				</button>
			</form>
		</>
	);
};

export default Page;
