import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req) {
	try {
		const data = await req.json();
		const username = data.user;

		const filepath = path.join(process.cwd(), "users", "userList.json");

		const readingUserList = fs.readFileSync(filepath, "utf-8");
		const userList = JSON.parse(readingUserList);

		let userFound = Object.hasOwn(userList, username);

		if (userFound) {
			return NextResponse.json({ userFound: true });
		} else {
			return NextResponse.json({ userFound: false });
		}
	} catch (error) {
		return NextResponse.json({ success: false });
	}
}
