"use server";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { cookies } from "cookies-next";
import { getCookie } from "cookies-next";

export async function GET(req) {
	try {
		await req;

		const { searchParams } = new URL(req.url);
		const name = searchParams.get("name");

		const filename = `${name}.json`;

		const filepath = path.join(process.cwd(), "users", filename);

		const readingJSONFile = fs.readFileSync(filepath, "utf-8");
		const userProfileObject = JSON.parse(readingJSONFile);

		return NextResponse.json(userProfileObject);
	} catch (error) {
		return NextResponse.json({ success: false });
	}
}
