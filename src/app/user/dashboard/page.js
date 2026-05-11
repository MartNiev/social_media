import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Post from "@/components/post";

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

	if (profileObj.posts.length === 0) return <></>;

	return (
		<>
			<div className="gridcontainer">
				<div className="postsContainer">
					{profileObj.posts.map((p, idx) => (
						<Post {...p} key={idx + Math.random()} />
					))}
				</div>
			</div>
		</>
	);
}
