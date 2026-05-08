import "./components.css";
import Image from "next/image";

export default function Post({ caption, imageSrc }) {
	return (
		<div className="postCard">
			<div className="cardImage">
				{imageSrc && <img src={imageSrc} alt="Post Image" className="image" />}
			</div>
			<div className="cardCaption">
				<p>{caption}</p>
			</div>
		</div>
	);
}
