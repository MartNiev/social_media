import "@/app/globals.css";
import Header from "@/components/header";
import WelcomeMessage from "@/components/welcomeMessage";

export const metadata = {
	title: "Home",
};

export default function UserLayout({ children }) {
	return <section>{children}</section>;
}
