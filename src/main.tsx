import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

function registerSW() {
  if (!("serviceWorker" in navigator)) return;
  const run = () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  };
  if ("requestIdleCallback" in window) {
    (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(run);
  } else {
    setTimeout(run, 1500);
  }
}

if (document.readyState === "complete") registerSW();
else window.addEventListener("load", registerSW);
