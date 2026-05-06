"use client";
import { useState, useEffect, use } from "react";
import SignupScreen from "./signupscreen";
import LoginScreen from "./loginscreen";

export default function LandingPage({ setProfile, setPosts }) {
  const [form, setForm] = useState(true);

  function changeScreen(stateValue) {
    setForm(stateValue);
  }

  return (
    <div className="flex w-screen h-screen">
      <div className="flex-2 flex justify-center items-center green">
        <h2 className="name">Social</h2>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="flex justify-center gap-4 pb-3">
          <button className="regButton" onClick={() => changeScreen(true)}>
            Login
          </button>
          <button className="regButton" onClick={() => changeScreen(false)}>
            Signup
          </button>
        </div>
        {form ? (
          <LoginScreen setProfile={setProfile} setPosts={setPosts} />
        ) : (
          <SignupScreen />
        )}
      </div>
    </div>
  );
}
