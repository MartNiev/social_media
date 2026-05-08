"use client";
import { useState } from "react";
import LoginScreen from "@/components/loginScreen";
import SignupScreen from "@/components/signUpScreen";

export default function LoginSignupSection() {
	const [form, setForm] = useState(true);

	function changeScreen(stateValue) {
		setForm(stateValue);
	}

	return (
		<div className="loginSignup">
			<div className="loginSignupButton">
				<button className="regButton" onClick={() => changeScreen(true)}>
					Login
				</button>
				<button className="regButton" onClick={() => changeScreen(false)}>
					Signup
				</button>
			</div>
			{form ? <LoginScreen /> : <SignupScreen />}
		</div>
	);
}
