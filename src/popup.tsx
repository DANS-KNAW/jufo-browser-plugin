import React from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  return (
    <main>
      <p>Popup!</p>
    </main>
  )
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
