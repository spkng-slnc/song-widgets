import { createRoot } from "react-dom/client";
import { App } from "./features/App/App.tsx";
import "./main.css.ts";
import { data } from "@api/data.ts";
import { themeClass } from "./theme.css";

// This is obviously not a database, but I'm going to use it as one to sloppily simulate having a server
const db = sessionStorage.getItem("songsDb");
if (!db) sessionStorage.setItem("songsDb", JSON.stringify(data));

if (!document.body.classList.contains(themeClass)) {
  document.body.classList.add(themeClass);
}

createRoot(document.getElementById("root")!).render(<App />);
