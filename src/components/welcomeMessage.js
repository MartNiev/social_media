import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function getCookie() {
	try {
		const cookie = await cookies();

		const raw = cookie.get("user")?.value;

		const profileObj = raw ? JSON.parse(raw) : null;

		return profileObj;
	} catch (err) {
		console.log(err);
	}
}

export default async function WelcomeMessage() {
	let profileObj = await getCookie();

	return <p className="welcome">Hello, {profileObj && profileObj.firstname}</p>;
}
