import "@/app/components/components.css";
import { useEffect, useState } from "react";

export default function CreatePost({ setCreatePostMenu, posts, setPosts }) {
	const [caption, setCaption] = useState("");
	const [fileLocation, setFileLocation] = useState("");
	const [submitButton, setSubmitButton] = useState(true);

	useEffect(() => {}, []);

	function handleSave() {
		if (caption === "" && fileLocation === "") {
			setSubmitButton(false);
			return;
		} else {
			setCreatePostMenu(false);
		}

		const filename = "/images/" + fileLocation.split("\\")[2];

		const newPost = { caption: caption, imageSrc: filename };

		setPosts([...posts, newPost]);

		// Save the new post using API save to save for later
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
					<label htmlFor="filepath">
						<img id="uploadImage" src="./upload-alt.svg"></img>
					</label>
					<input
						type="file"
						id="file"
						name="file"
						draggable={false}
						hidden={true}
						accept={[".jpg", ".png", ".jpeg"]}
						onChange={(e) => {
							setFileLocation(e.target.value);
						}}
						single
					/>
				</div>
				<div className="flex gap-4">
					<button
						type="button"
						// type={submitButton ? "submit" : "button"}
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
