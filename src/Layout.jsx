import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider, useTheme } from "./lib/ThemeContext";

function LayoutInner({ children }) {
  const { theme } = useTheme();
  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{
        background: "var(--bc-bg)",
        color: "var(--bc-text)",
      }}
    >
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function Layout({ children }) {
  return (
    <ThemeProvider>
      <LayoutInner>{children}</LayoutInner>
    </ThemeProvider>
  );
}