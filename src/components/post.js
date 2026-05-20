import "./components.css";

export default function Post({ caption, imageSrc }) {
	return (
		<div className="postCard">
			<div className="cardImage">
				{imageSrc && (
					<img
						src={imageSrc}
						alt="Post Image"
						className="image"
						loading="eager"
						draggable="false"

						// onClick={() => {
						// 	console.log("Hello");
						// }}
					/>
				)}
			</div>
			{/* <div className="cardCaption">
				<p>{caption}</p>
			</div> */}
		</div>
	);
}
