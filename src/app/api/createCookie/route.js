"use server";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { cookies } from "next/headers";

export async function GET(req) {
	try {
		await req;

		const { searchParams } = new URL(req.url);
		const name = searchParams.get("name");

		const filename = `${name}.json`;

		const filepath = path.join(process.cwd(), "users", filename);

		const readingJSONFile = fs.readFileSync(filepath, "utf-8");

		const cookie = await cookies();

		let cookieExist = cookie.has("user");
		console.log(cookieExist);

		cookie.set("user", readingJSONFile);

		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({ message: error }, { status: 500 });
	}
}
