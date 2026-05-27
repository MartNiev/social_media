import Header from "@/components/header";
import WelcomeMessage from "@/components/welcomeMessage";
import { getCookie } from "@/utils/userProfile";
import { redirect } from "next/navigation";

export default async function Feed() {
	let profileObj = await getCookie();
	if (!profileObj) redirect("/");

	return (
		<div>
			<Header profileObj={profileObj} />
			<WelcomeMessage />
		</div>
	);
}
