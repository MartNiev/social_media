import { getCookie } from "@/utils/userProfile";
import { redirect } from "next/navigation";
import Post from "@/components/post";
import Header from "@/components/header";
import PostsContainer from "@/components/postContainer";

export default async function Profile({}) {
	let profileObj = await getCookie();

	if (!profileObj) redirect("/");

	return (
		<div>
			<Header profileObj={profileObj} />
			<p className="welcome">My Posts</p>
			<PostsContainer profileObj={profileObj}>
				{profileObj.posts.map((post, idx) => (
					<Post {...post} key={idx + Math.random()} />
				))}
			</PostsContainer>
		</div>
	);
}
