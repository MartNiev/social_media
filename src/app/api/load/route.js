import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(req) {
	try {
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
