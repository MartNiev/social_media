import Search from "@/components/search";
import { getCookie } from "@/app/user/profile/page";
import { redirect } from "next/navigation";

export default async function ComponentName() {
	let profileObj = await getCookie();
	if (!profileObj) redirect("/");

	return <Search />;
}
