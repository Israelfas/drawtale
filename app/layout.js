import "./globals.css";

export const metadata = {
  title: "Drawtale Edu",
  description: "Bloques interactivos de matematicas, lengua con IA y ciencias.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
