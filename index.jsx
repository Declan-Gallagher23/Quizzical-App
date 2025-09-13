import {createRoot} from "react-dom/client"
import App from "/App.jsx"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const root = createRoot(document.getElementById("root"))
root.render(<App />)