import { useState, useEffect, use, useRef } from "react";
import { validateLogin } from "@/app/utils/validation";
import Message from "./uiMessage";

export default function LoginScreen({ setProfile }) {
  const loginInfo = useRef({});
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);

  useEffect(() => {}, []);

  function handleLogin() {
    console.log(loginInfo.current);
    if (!(loginInfo.current.username && loginInfo.current.password)) return;

    async function loadUserProfile() {
      try {
        const response = await fetch(
          `/api/load/?name=${loginInfo.current.username}`,
        );
        const storedUserInfo = await response.json();

        const isValidated = validateLogin(storedUserInfo, loginInfo.current);

        if (isValidated) {
          setPasswordIncorrect(false);
          setProfile(storedUserInfo);
        } else {
          setPasswordIncorrect(true);
        }
      } catch (error) {
        alert("Error fetching api: " + error);
      }
    }

    loadUserProfile();
  }

  return (
    <>
      <Message
        message="Username or Password is incorrect"
        condition={passwordIncorrect}
      />
      <form className="flex flex-col items-center gap-5 p-4">
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
    </>
  );
}
