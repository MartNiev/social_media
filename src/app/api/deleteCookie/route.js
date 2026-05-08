import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(req) {
	try {
		await req;

		const cookie = await cookies();
		cookie.delete("user");

		console.log("Cookie Deleted ");
		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({ message: error });
	}
}
