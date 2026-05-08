"use client";
import "./components.css";
import { useRouter } from "next/navigation";

export default function Header() {
	async function deleteCookie() {
		try {
			const res = await fetch("/api/deleteCookie", { method: "DELETE" });

			if (res.ok);
		} catch (err) {
			console.log("Error Occurred: " + err);
		}
	}

	const router = useRouter();
	function handleSignOut() {
		deleteCookie();
		router.push("/");
	}

	function handleCreate() {
		// setCreatePostMenu(true);
	}

	return (
		<div className="header">
			<div className="customFont">
				<p>The Social</p>
			</div>
			<nav className="navButtons">
				<button className="bt">Profile</button>
				<button className="bt" onClick={handleCreate}>
					Create
				</button>
				<button className="bt">Follow</button>
				<button className="bt" onClick={handleSignOut}>
					Signout
				</button>
			</nav>
			<div className="searchContainer">
				<input className="searchBar" type="text" id="search" name="search" placeholder="Search" />
			</div>
		</div>
	);
}
