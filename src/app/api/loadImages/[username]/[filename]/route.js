import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(req, { params }) {
	await req;
	const { username, filename } = await params;

	try {
		const imagePath = path.join(process.cwd(), "src/userImages", username, filename);
		let image = await fs.readFile(imagePath);
		const fileType = filename.split(".")[1];

		return new NextResponse(image, {
			headers: {
				"Content-Type": `image/${fileType.toLowerCase()}`,
				"Cache-Control": "private, max-age=86400", // cache for 1 day
			},
		});
	} catch (error) {
		console.log(error.message);
		return NextResponse.json({ status: 500 });
	}
}
