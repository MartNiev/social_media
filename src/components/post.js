import "./components.css";
import Image from "next/image";

export default function Post({ caption, imageSrc }) {
	return (
		<div className="postCard">
			<div className="cardImage">
				{imageSrc && (
					<Image
						src={imageSrc}
						alt="Post Image"
						className="image"
						width={300}
						height={300}
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
