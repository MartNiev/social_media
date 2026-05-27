"use client";
import { useEffect, useState, useRef } from "react";
import Message from "@/components/uiMessage";

let cacheUser;
let cacheUserFound;

export default function SignupScreen() {
	const [passwordNotMatch, setPasswordNotMatch] = useState(false);
	const [emptyFields, setEmptyFields] = useState(false);
	const [userExist, setUserExist] = useState(null);
	const [submitButton, setSubmitButton] = useState(false);

	const userInput = useRef({
		firstname: "",
		lastname: "",
		age: "",
		username: "",
		password: "",
		confirm: "",
		posts: [],
	});

	async function searchUser(username) {
		try {
			let response = await fetch("/api/searchUser", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ user: username }),
			});

			let data = await response.json();

			return data.userFound;
		} catch (error) {}
	}

	async function handleSignUp() {
		if (userInput.current.username !== cacheUser) {
			var userFound = await searchUser(userInput.current.username);
			cacheUser = userInput.current.username;
			if (userFound) {
				cacheUserFound = true;
			} else {
				cacheUserFound = false;
			}
		}

		if (userFound || cacheUserFound) {
			setUserExist(true);
			return;
		} else if (!userFound) {
			setUserExist(false);
		}

		let isEmpty = !(
			userInput.current.firstname &&
			userInput.current.lastname &&
			userInput.current.age &&
			userInput.current.username &&
			userInput.current.password &&
			userInput.current.confirm
		);

		if (isEmpty) {
			setEmptyFields(true);
			setSubmitButton(false);
			return;
		} else {
			setEmptyFields(false);
		}

		if (userInput.current.password !== userInput.current.confirm) {
			setPasswordNotMatch(true);
			setSubmitButton(false);
			return;
		} else {
			setPasswordNotMatch(false);
			setSubmitButton(true);

			async function saveProfile(profileObj) {
				try {
					const response = await fetch("/api/save", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(profileObj),
					});
				} catch (error) {
					alert("Error saving profile: " + error.message);
				}
			}

			if (!userExist) saveProfile(userInput.current);
		}
	}

	return (
		<div>
			<form id="signupForm" className="inputForm">
				<label htmlFor="signupForm">Sign Up</label>
				<Message condition={passwordNotMatch} message="Password does NOT Match." />
				{!userExist && <Message condition={emptyFields} message="All fields are required." />}

				<Message condition={userExist} message="Username is Taken!" />
				<input
					className="formInput"
					type="text"
					placeholder="First Name"
					onChange={(e) => {
						userInput.current = {
							...userInput.current,
							firstname: e.target.value,
						};
					}}
				/>
				<input
					className="formInput"
					type="text"
					placeholder="Last Name"
					onChange={(e) => {
						userInput.current = {
							...userInput.current,
							lastname: e.target.value,
						};
					}}
				/>
				<input
					className="formInput"
					type="number"
					placeholder="Age"
					onChange={(e) => {
						userInput.current = { ...userInput.current, age: e.target.value };
					}}
				/>
				<input
					className="formInput"
					type="text"
					placeholder="Username"
					onChange={(e) => {
						userInput.current = {
							...userInput.current,
							username: e.target.value,
						};
					}}
				/>
				<input
					className="formInput"
					type="password"
					placeholder="Password"
					onChange={(e) => {
						userInput.current = {
							...userInput.current,
							password: e.target.value,
						};
					}}
				/>
				<input
					className="formInput"
					type="password"
					placeholder="Confirm"
					onChange={(e) => {
						userInput.current = {
							...userInput.current,
							confirm: e.target.value,
						};
					}}
				/>
				<button
					// type="button"
					type={submitButton ? "submit" : "button"}
					className="w-30 regButton"
					onClick={handleSignUp}
				>
					Submit
				</button>
			</form>
		</div>
	);
}
