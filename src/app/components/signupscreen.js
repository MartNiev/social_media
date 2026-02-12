"use client";
import { useState, useEffect, useRef, use } from "react";
import Message from "@/app/components/uiMessage";

export default function SignupScreen() {
  const [passwordNotMatch, setPasswordNotMatch] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [userExist, setUserExist] = useState(null);
  const [submitButton, setSubmitButton] = useState(false);

  // change to useRef

  const userInput = useRef({
    firstname: "",
    lastname: "",
    age: "",
    username: "",
    password: "",
    confirm: "",
    posts: [],
  });

  const usersList = useRef([]);

  useEffect(() => {
    async function loadUserList() {
      try {
        const response = await fetch("/api/load?name=userList");
        const userList = await response.json();

        for (const user of userList.username) {
          usersList.current.push(user);
        }

        setUserExist(false);
        setSubmitButton(true);
      } catch (error) {
        alert("Error loading file: " + error.message);
      }
    }

    loadUserList();
  }, []);

  let users = new Set(usersList.current);

  function handleChange(value) {
    if (users.has(value)) {
      setUserExist(true);
      return;
    } else {
      setUserExist(false);
    }
  }

  function handleSignUp() {
    console.log(users);

    if (
      !(
        userInput.current.firstname &&
        userInput.current.lastname &&
        userInput.current.age &&
        userInput.current.username &&
        userInput.current.password &&
        userInput.current.confirm
      )
    ) {
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
      <form id="signupForm" className="flex flex-col items-center gap-5 p-4">
        <Message
          condition={passwordNotMatch}
          message="Password does NOT Match."
        />
        {!userExist && (
          <Message condition={emptyFields} message="All fields are required." />
        )}

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
            handleChange(e.target.value);
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
          //type="button"
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
