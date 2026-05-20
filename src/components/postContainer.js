"use client";
import { useState, useEffect } from "react";
import Post from "./post";

export default function PostsContainer({ children }) {
	const [newPost, setNewPost] = useState({});

	useEffect(() => {
		let newPostObject = JSON.parse(sessionStorage.getItem("reloadPost"));

		console.log(newPostObject);
		setNewPost(newPostObject);

		sessionStorage.setItem("reloadPost", null);
	}, []);

	return (
		<div className="postsContainer">
			{children}
			{newPost && <Post {...newPost} />}
		</div>
	);
}
