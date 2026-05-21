"use client";
import "./components.css";
import { useEffect, useState } from "react";
import { useRoute } from "next/navigation";

export default function CreatePost({ setCreatePostMenu, profileObj }) {
	const [caption, setCaption] = useState("");
	const [file, setFile] = useState("");
	const [submitButton, setSubmitButton] = useState(true);

	useEffect(() => {}, []);

	function handleSave() {
		if (caption === "" && file === "") {
			return setSubmitButton(false);
		} else if (caption === "" || file === "") {
			return setSubmitButton(false);
		}

		async function editRequest(username, filename) {
			try {
				let response = fetch(`/api/edit?username=${username}`, {
					method: "PUT",
					body: JSON.stringify({
						caption: caption,
						imageSrc: `/api/loadImages/${username}/${filename}`,
					}),
				});

				if (response.ok) console.log(await response.json());
			} catch (error) {
				console.log(error);
			}
		}

		async function sendFileRequest(fileData, username) {
			try {
				let fileOGName = file.name.split(".")[0];
				let fileType = file.name.split(".")[1];
				let fileName = `${fileOGName}${Math.round(Math.random() * 10)}.${fileType.toLowerCase()}`;

				const formData = new FormData();
				formData.append("file", fileData);
				console.log(username);
				let response = await fetch(`/api/saveImage?username=${username}&filename=${fileName}`, {
					method: "POST",
					body: formData,
				});

				const res = await response.json();
				editRequest(profileObj.username, fileName);

				if (!response.ok) {
					console.log("Did not work");
				} else {
					sessionStorage.setItem(
						"reloadPost",
						JSON.stringify({
							caption: caption,
							imageSrc: `/api/loadImages/${profileObj.username}/${fileName}`,
						}),
					);
					setCreatePostMenu(false);
				}
			} catch (err) {
				console.log("Error: " + err.message);
			}

			setSubmitButton(true);

			// setPosts([...posts, newPost]);
		}

		sendFileRequest(file, profileObj.username);
	}
	return (
		<div className="createWindow">
			<form className="postForm">
				<input
					type="text"
					id="caption"
					name="caption"
					placeholder="Caption"
					onChange={(e) => {
						setCaption(e.target.value);
					}}
				/>
				<div
					id="fileArea"
					onDragOver={(e) => {
						e.preventDefault();
					}}
					onDrop={(e) => {
						e.preventDefault();

						const dataTransfer = new DataTransfer();
						let file = e.dataTransfer.files[0];

						let elem = document.getElementById("file");

						dataTransfer.items.add(file);
						elem.files = dataTransfer.files;
					}}
				>
					<label htmlFor="file" className="imageLabel">
						<img id="uploadImage" src="/upload-alt.svg"></img>
					</label>
					<input
						type="file"
						id="file"
						name="file"
						draggable={false}
						hidden={true}
						accept={[".jpg", ".png", ".jpeg"]}
						onChange={(e) => {
							setFile(e.target.files[0]);
						}}
						single="true"
					/>
				</div>
				<div className="flex gap-4">
					<button
						// type="button"
						type={submitButton ? "submit" : "button"}
						className="regButton"
						onClick={handleSave}
					>
						Save
					</button>

					<button
						className="regButton"
						onClick={() => {
							setCreatePostMenu(false);
						}}
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}
