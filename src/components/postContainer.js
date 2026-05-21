"use client";
import { useState, useEffect } from "react";
import Post from "./post";

export default function PostsContainer({ profileObj, children }) {
	const [newPost, setNewPost] = useState({});

	useEffect(() => {
		let newPostObject = JSON.parse(sessionStorage.getItem("reloadPost"));

		setNewPost(newPostObject);

		sessionStorage.setItem("reloadPost", null);
	}, []);

	return profileObj.posts.length === 0 && !newPost ? (
		<div className="noPostContainer">
			<div className="noPostCard">
				<p className="noPostMessage">Share a new post with us! </p>
			</div>
		</div>
	) : (
		<div className="gridcontainer">
			<div className="postsContainer">
				{children}
				{newPost && <Post {...newPost} />}
			</div>
		</div>
	);
}
