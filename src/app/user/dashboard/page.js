import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import Post from "@/components/post";
import Header from "@/components/header";
import WelcomeMessage from "@/components/welcomeMessage";
import Image from "next/image";
import sharp from "sharp";
import { Calligraffitti, Love_Light } from "next/font/google";

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

async function getImage(profileObj) {
	try {
		let imagePath = path.join(process.cwd(), "src/userImages", profileObj.username);
		const files = await fs.readdir(imagePath);

		// let posts = [];

		const posts = await Promise.all(
			files.map(async (filename, i) => {
				const caption = profileObj.posts[i].caption;
				const fileType = filename.split(".")[1];
				const imagePath = path.join(process.cwd(), "src/userImages", profileObj.username, filename);

				let image = await fs.readFile(imagePath);
				const base64 = image.toString("base64");
				let imageSrc = `data:${`image/${fileType}`};base64,${base64}`;

				return { caption, imageSrc };
			}),
		);

		return posts;
	} catch (err) {
		console.error(err);
	}

	// console.log(posts);
}

export default async function Dashboard() {
	let profileObj = await getCookie();

	if (!profileObj) return redirect("/");

	// let posts = await getImage(profileObj);

	let imagePath = path.join(process.cwd(), "src/userImages", profileObj.username);
	const files = await fs.readdir(imagePath);

	const posts = files.map((filename, i) => ({
		caption: profileObj.posts[i].caption,
		imageSrc: `/api/loadImages/${profileObj.username}/${filename}`,
	}));

	return (
		<div>
			<Header profileObj={profileObj} />
			<WelcomeMessage />

			<div className="gridcontainer">
				<div className="postsContainer">
					{posts.map((post, idx) => (
						<Post {...post} key={idx + Math.random()} />
					))}
				</div>
			</div>
		</div>
	);
}
