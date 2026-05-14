"use client";
import Post from "@/components/post";
import { useEffect, useState } from "react";

export default function Test({ profileObj }) {
	const [post, setPosts] = useState([]);

	useEffect(() => {
		const newPost = { caption: "My Baby", imageSrc: "/images/1.JPEG" };

		setPosts([newPost]);
	}, []);

	return (
		<div className="postsContainer">
			{profileObj.posts.map((post, idx) => (
				<Post {...post} key={idx + Math.random()} />
			))}
			{/* {post.map((p, i) => (
				<Post {...p} key={i + Math.random()} />
			))} */}
		</div>
	);
}
