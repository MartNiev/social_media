import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Post from "@/components/post";
import Header from "@/components/header";
import WelcomeMessage from "@/components/welcomeMessage";
import PostsContainer from "@/components/postContainer";

export async function getCookie() {
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

	if (!profileObj) redirect("/");

	return (
		<div>
			<Header profileObj={profileObj} />
			<p className="welcome">My Posts</p>;
			<PostsContainer profileObj={profileObj}>
				{profileObj.posts.map((post, idx) => (
					<Post {...post} key={idx + Math.random()} />
				))}
			</PostsContainer>
		</div>
	);
}
