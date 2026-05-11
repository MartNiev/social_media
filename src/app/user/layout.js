import "@/app/globals.css";
import Header from "@/components/header";
import WelcomeMessage from "@/components/welcomeMessage";

export const metadata = {
	title: "Welcome Page",
};

export default function UserLayout({ children }) {
	return (
		<section>
			<Header />
			<WelcomeMessage />
			{children}
		</section>
	);
}
