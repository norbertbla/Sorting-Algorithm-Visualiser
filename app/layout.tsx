import "./globals.css";

export const metadata = {
  title: "SA Visualizer",
  description: "Visualize sorting algorithms in real time",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"> 
      <body>{children}</body>
    </html>
  );
}
