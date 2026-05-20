"use server";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { cookies } from "next/headers";

export async function PUT(req) {
	try {
		await req;
		let body = await req.json();
		console.log(body);

		const { searchParams } = new URL(req.url);
		const name = searchParams.get("username");

		const filename = `${name}.json`;

		const filepath = path.join(process.cwd(), "users", filename);

		const readingJSONFile = fs.readFileSync(filepath, "utf-8");
		const userProfileObject = JSON.parse(readingJSONFile);

		userProfileObject.posts.push(body);

		const cookie = await cookies();
		let cookieExist = cookie.has("user");
		if (cookieExist) cookie.delete("user");
		cookie.set("user", JSON.stringify(userProfileObject));

		fs.writeFileSync(filepath, JSON.stringify(userProfileObject, null, 2), "utf-8");

		return NextResponse.json(userProfileObject);
	} catch (error) {
		return NextResponse.json({ success: false });
	}
}
