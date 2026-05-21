import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import Post from "@/components/post";
import Header from "@/components/header";
import WelcomeMessage from "@/components/welcomeMessage";
import PostsContainer from "@/components/postContainer";

async function getCookie() {
	try {
		const cookie = await cookies();

		const raw = cookie.get("user")?.value;

		const profileObj = raw ? JSON.parse(raw) : null;

		return profileObj;
	} catch (err) {
		console.log(err);
	}
}

export default async function Dashboard() {
	let profileObj = await getCookie();

	if (!profileObj) return redirect("/");
	// Fixed the problem when the user has no post and user adds the first post then the pos
	return (
		<div>
			<Header profileObj={profileObj} />
			<WelcomeMessage />
			<PostsContainer profileObj={profileObj}>
				{profileObj.posts.map((post, idx) => (
					<Post {...post} key={idx + Math.random()} />
				))}
			</PostsContainer>
		</div>
	);
}
