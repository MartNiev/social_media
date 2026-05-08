"use server";

import { cookies } from "next/headers";
import { validateLogin } from "@/utils/validation";

async function createCookie(profileObj) {
	const cookie = await cookies();

	let cookieExist = cookie.has("user");

	if (cookieExist) cookie.delete("user");

	cookie.set("user", JSON.stringify(profileObj));
}

export default async function loadProfile(loginInfo) {
	console.log(loginInfo);
	try {
		const response = await fetch(`http:/localhost:3000/api/load/?name=${loginInfo.username}`, {
			method: "GET",
		});
		let storedUserInfo = await response.json();
		const isValidated = validateLogin(storedUserInfo, loginInfo);

		if (!isValidated) return false;

		if (response.ok && isValidated) {
			await createCookie(storedUserInfo);
			return storedUserInfo;
		}
	} catch (error) {
		console.log("Error fetching api: " + error.message);
	}
}
