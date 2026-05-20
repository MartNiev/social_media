import fs from "fs";
import { mkdir } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		const object = await req.json();

		const filename = `${object.username}.json`;

		const filePath = path.join(process.cwd(), "users", filename);

		const userListPath = path.join(process.cwd(), "users", "userList.json");

		const userObject = JSON.parse(fs.readFileSync(userListPath, "utf-8"));
		userObject.username.push(object.username);

		const imageFolderPath = path.join(process.cwd(), "src/userImages", object.username);

		await mkdir(imageFolderPath, { recursive: true });

		fs.writeFileSync(filePath, JSON.stringify(object, null, 2), "utf-8");
		fs.writeFileSync(userListPath, JSON.stringify(userObject, null, 2), "utf-8");

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error writing file:", error.message);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
