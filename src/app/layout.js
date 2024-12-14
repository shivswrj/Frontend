import "./globals.css";

export const metadata = {
  title: "",
  description: "Created By Shivam Swaraj",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
