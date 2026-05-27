import Search from "@/components/search";
import { getCookie } from "@/utils/userProfile";
import { redirect } from "next/navigation";
import Header from "@/components/header";

export default async function ComponentName() {
	let profileObj = await getCookie();
	if (!profileObj) redirect("/");

	return (
		<div>
			<Header profileObj={profileObj} />
			<Search profileObj={profileObj} />
		</div>
	);
}
