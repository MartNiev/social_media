import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { use } from "react";

export async function POST(req) {
	try {
		let data = await req.json();
		const username = data.user;
		console.log(username);

		const filepath = path.join(process.cwd(), "users", "userList.json");

		const readingUserList = fs.readFileSync(filepath, "utf-8");
		const userList = JSON.parse(readingUserList);
		const userObject = userList[username];

		return NextResponse.json(userObject);
	} catch (error) {
		return NextResponse.json({ success: false });
	}
}
