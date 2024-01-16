import React from 'react';
import { createRoot } from 'react-dom/client';
import './main.css'

function App() {
  return (
    <main className="text-4xl text-red-400">
      <h1>Hello Worlsd!</h1>
    </main>
  );
}

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
