import Header from "@/components/header";
import WelcomeMessage from "@/components/welcomeMessage";
import { getCookie } from "@/app/user/profile/page";
import { redirect } from "next/navigation";

export default async function Feed() {
	let profileObj = await getCookie();
	if (!profileObj) redirect("/");

	return (
		<div>
			<Header />
			<WelcomeMessage />
		</div>
	);
}
