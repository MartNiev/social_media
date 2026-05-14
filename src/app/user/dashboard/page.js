import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Post from "@/components/post";
import Header from "@/components/header";
import WelcomeMessage from "@/components/welcomeMessage";
import Test from "@/components/test";

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

	return (
		<div>
			<Header profileObj={profileObj} />
			<WelcomeMessage />
			<div className="gridcontainer">
				{/* <Test profileObj={profileObj} /> */}
				<div className="postsContainer">
					{profileObj.posts.map((post, idx) => (
						<Post {...post} key={idx + Math.random()} />
					))}
				</div>
			</div>
		</div>
	);
}
