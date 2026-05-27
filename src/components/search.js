"use client";
import "@/components/components.css";
import Header from "@/components/header";
import { useState } from "react";

export function SearchResults({ username, firstname, isFound }) {
	return (
		<div className="resultSection">
			{isFound ? (
				<p
					className="result"
					onClick={() => {
						// Add route to a view of the profile
					}}
				>
					{username}, {firstname}
				</p>
			) : (
				<p className="noresult">No Profile Found</p>
			)}
		</div>
	);
}

async function loadProfile(username) {
	try {
		let response = await fetch("/api/load", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ user: username }),
		});

		let data = await response.json();

		return data;
	} catch (error) {}
}

export default function Search() {
	const [showResult, setShowResult] = useState(false);
	const [isFound, setIsFound] = useState(true);
	const [username, setUsername] = useState("");
	const [firstname, setfirstname] = useState("");

	function handleSearch(e) {
		let value = e.target.value;

		async function requestProfile(username) {
			try {
				let response = await fetch(`/api/searchUser`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ user: username }),
				});

				if (response.ok) {
					var data = await response.json();
					console.log(data);

					if (data.userFound === false) {
						setIsFound(false);
					} else {
						let data = await loadProfile(username);
						console.log(data);

						setUsername(data.username);
						setfirstname(data.firstname);
						setIsFound(true);
					}

					setShowResult(true);
				}
			} catch (error) {
				console.log("Error:", error.message);
			}
		}

		requestProfile(value);
	}

	return (
		<div className="searchSection">
			<Header />
			<div className="searchContainer">
				<input
					type="text"
					className="searchBar"
					placeholder="Search"
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleSearch(e);
						}
					}}
				></input>

				{showResult && (
					<SearchResults username={username} firstname={firstname} isFound={isFound} />
				)}
			</div>
		</div>
	);
}
