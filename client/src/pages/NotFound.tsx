import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();
  return (
    <main className="flow-main">
      <div className="container" style={{ maxWidth: 640, textAlign: "center" }}>
        <AlertCircle size={40} color="#1769E0" aria-hidden="true" />
        <p className="eyebrow" style={{ marginTop: 24 }}>Page not found</p>
        <h1 style={{ fontSize: 44, letterSpacing: "-.05em", margin: 0 }}>This page is not available.</h1>
        <p style={{ color: "#5B6472", margin: "16px auto 24px", maxWidth: 420 }}>The scholarship page you requested could not be found. Return to the checker to browse the available opportunities.</p>
        <button className="button button-primary" onClick={() => setLocation("/")}><Home size={16} /> Go home</button>
      </div>
    </main>
  );
}
