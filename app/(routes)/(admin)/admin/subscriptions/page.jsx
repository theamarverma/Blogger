'use client';
import EmailTableItem from '@/app/_components/AdminComponents/EmailTableItem';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Page = () => {
	const [emails, setEmails] = useState([]);

	const fetchEmails = async () => {
		const res = await axios.get('/api/email');
		setEmails(res.data.emails);
	};
	const deleteEmail = async (mongoId) => {
		const res = await axios.delete('/api/email', {
			params: {
				id: mongoId,
			},
		});
		toast.success(res.data.msg);
		if (res.data.success) {
			fetchEmails(); //after deleting the email, fetch the emails again like refresh the data
		}
	};

	useEffect(() => {
		fetchEmails();
	}, []);

	return (
		<div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 ">
			<h1>All Subscription</h1>
			<div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray scrollbar-hide">
				<table className="w-full text-sm text-gray-500 ">
					<thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
						<tr>
							<th
								scope="col"
								className="px-6 py-3"
							>
								Email Subscription
							</th>
							<th
								scope="col"
								className="px-6 py-3 hidden sm:block"
							>
								Date
							</th>
							<th
								scope="col"
								className="px-6 py-3"
							>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{emails.map((item, index) => {
							return (
								<EmailTableItem
									key={index}
									mongoId={item._id}
									email={item.email}
									date={item.date}
									deleteEmail={deleteEmail}
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
