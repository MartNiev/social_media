import "@/components/components.css";

export default function Loading() {
	return (
		<div className="loadingScreen">
			<p>
				Loading
				<span className="dot">.</span>
				<span className="dot">.</span>
				<span className="dot">.</span>
			</p>
		</div>
	);
}
