import fs, { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import sharp from "sharp";

function calculateGCD(a, b) {
	while (b !== 0) {
		[a, b] = [b, a % b];
	}
	return a;
}

function getAspectRatio(height, width) {
	let gcd = calculateGCD(height, width);
	return [height / gcd, width / gcd];
}

function convertAspectRatio(height, width) {
	let resArray = [
		{ height: 4000, width: 3000 },
		{ height: 2880, width: 2160 },
		{ height: 2048, width: 1536 },
		{ height: 1920, width: 1440 },
		{ height: 1600, width: 1200 },
		{ height: 1440, width: 1080 },
		{ height: 1280, width: 960 },
		{ height: 1200, width: 900 },
		{ height: 1024, width: 768 },
		{ height: 900, width: 675 },
		{ height: 800, width: 600 },
		{ height: 640, width: 480 },
		{ height: 480, width: 360 },
		{ height: 320, width: 240 },
	];

	for (const res of resArray) {
		let heightDiff = height - res.height;

		if (heightDiff === Math.abs(heightDiff)) {
			let widthDiff = width - res.width;
			if (widthDiff !== Math.abs(widthDiff)) continue;

			let top = heightDiff / 2;
			let left = widthDiff;

			return { left: left, top: top, height: res.height, width: res.width };
		}
	}
}

export async function POST(req) {
	try {
		const { searchParams } = new URL(req.url);
		const username = searchParams.get("username");

		const request = await req.formData();
		const file = request.get("file");

		let userImageFolder = path.join(process.cwd(), "src/userImages", username);

		await fs.mkdir(userImageFolder, { recursive: true });
		let filePath = path.join(process.cwd(), "src/userImages", username, file.name);

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		sharp(buffer).metadata((err, data) => {
			let width = data.width;
			let height = data.height;

			if (err) return console.log("Error in metadata:", err);

			let aspectRatio = getAspectRatio(height, width);

			if (aspectRatio[0] === 3 && aspectRatio[1] === 4) {
				writeFile(filePath);
				return;
			} else {
				let pos = convertAspectRatio(height, width);

				sharp(buffer)
					.extract({ left: pos.left, top: pos.top, width: pos.width, height: pos.height })
					.toFile(filePath);
			}
		});

		return NextResponse.json({ success: true });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ success: false });
	}
}
