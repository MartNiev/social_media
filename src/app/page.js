import "@/components/components.css";
import LoginSignupSection from "@/components/loginSignupSection";

export default function Home() {
	return (
		<div className="mainPage">
			<div className="logoSection">
				<h2 className="name">Social</h2>
			</div>
			<div className="loginSection">
				<LoginSignupSection />
			</div>
		</div>
	);
}
