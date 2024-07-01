'use client';
import Image from 'next/image';
import Header from './_components/Header';
import BlogList from './_components/BlogList';
import Footer from './_components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
	return (
		<>
			<ToastContainer theme="dark" />
			<Header />
			<BlogList />
			<Footer />
		</>
	);
}
