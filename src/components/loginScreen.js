"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Message from "@/components/uiMessage";

import "@/components/components.css";
import loadProfile from "@/components/loadProfile";

export default function LoginScreen() {
	const loginInfo = useRef({});
	const [passwordIncorrect, setPasswordIncorrect] = useState(false);
	const router = useRouter();

	async function handleLogin() {
		if (!(loginInfo.current.username && loginInfo.current.password)) return;

		let profile = await loadProfile(loginInfo.current);

		if (!profile) return setPasswordIncorrect(true);

		console.log(profile);
		router.push("/user/dashboard");
	}

	return (
		<div className="loginForm">
			<Message message="Username or Password is incorrect" condition={passwordIncorrect} />
			<form id="loginScreen" className="inputForm">
				<label htmlFor="loginScreen">Log In</label>

				<input
					className="formInput"
					type="text"
					placeholder="Username"
					onChange={(e) => {
						loginInfo.current = { username: e.target.value };
					}}
				/>
				<input
					className="formInput"
					type="password"
					placeholder="Password"
					onChange={(e) => {
						loginInfo.current = {
							...loginInfo.current,
							password: e.target.value,
						};
					}}
				/>
				<button type="button" className="w-30 regButton" onClick={handleLogin}>
					Submit
				</button>
			</form>
		</div>
	);
}
