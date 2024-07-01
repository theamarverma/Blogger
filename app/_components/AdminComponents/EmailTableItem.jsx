import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import { fetchEmails } from '@/app/(routes)/(admin)/admin/subscriptions/page';
const EmailTableItem = ({ email, mongoId, date, deleteEmail }) => {
	const EmailDate = new Date(date);

	return (
		<tr className="bg-white border-b text-left">
			<th
				scope="row"
				className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
			>
				{email ? email : 'No email'}
			</th>
			<td className="px-6 py-4 hidden sm:block">{EmailDate.toDateString()}</td>
			<td
				onClick={() => {
					deleteEmail(mongoId);
				}}
				className="px-6 py-4 cursor-pointer"
			>
				x
			</td>
		</tr>
	);
};

export default EmailTableItem;
