import { getCookie } from "@/utils/userProfile";
import { redirect } from "next/navigation";
import Post from "@/components/post";
import Header from "@/components/header";
import PostsContainer from "@/components/postContainer";
import "@/components/components.css";

async function viewRequest(username) {
	try {
		let response = await fetch("http://localhost:3000/api/viewProfile", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ user: username }),
		});

		const data = await response.json();

		return data;
	} catch (error) {}
}

export default async function Profile({ params }) {
	const { username } = await params;

	let profileObj = await getCookie();
	if (!profileObj) redirect("/");

	const profileView = await viewRequest(username);

	return (
		<div>
			<Header profileObj={profileObj} />
			<div className="viewPageMessage">
				<p className="viewPosts">{profileView.firstname}'s Posts</p>
				<button className="regButton">Follow</button>
			</div>
			<PostsContainer profileObj={profileView}>
				{profileView.posts.map((post, idx) => (
					<Post {...post} key={idx + Math.random()} />
				))}
			</PostsContainer>
		</div>
	);
}
