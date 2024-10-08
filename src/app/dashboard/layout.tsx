// import Dashboard from "./page";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body
        >
          {/* <Dashboard/> */}
          {children}
        </body>
      </html>
    );
  }