import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "evellacreates | Professional Human Writing",
  description: "Human-crafted resumes and LinkedIn optimizations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
