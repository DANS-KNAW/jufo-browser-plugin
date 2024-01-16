import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <main className="green-border">
      <p>Hello Browser!</p>
    </main>
  );
}

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
