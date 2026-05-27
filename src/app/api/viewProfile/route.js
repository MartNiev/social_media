import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req) {
	try {
		let data = await req.json();
		const username = data.user;
		console.log(username);

		const filepath = path.join(process.cwd(), "users", "userList.json");

		const readingUserList = fs.readFileSync(filepath, "utf-8");
		const userList = JSON.parse(readingUserList);
		const userObject = userList[username];

		return NextResponse.json({ firstname: userObject.firstname, posts: userObject.posts });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ success: false });
	}
}
