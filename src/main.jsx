import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";
import PublicRoute from "./routes/PublicRoute.jsx"
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import './index.css'
import App from './page/App.jsx'
import Desafio from "./page/Desafio.jsx";
import X1 from "./page/X1.jsx";
import Login from "./page/Login.jsx";
import Quizzes from "./page/Quizzes.jsx";
import Ranking from "./page/Ranking.jsx";
import ConfigPage from "./page/ConfigPage.jsx";
import Contato from "./page/Contato.jsx";
import PageNotFound from "./page/PageNotFound.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <HelmetProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/quiz/mode/geral/:id" element={<Desafio />} />
          <Route path="/quiz/mode/x1/:id" element={<X1 />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/configuracao/:id" element={<ProtectedRoute><ConfigPage /></ProtectedRoute> } />
          <Route path="/contato" element={<Contato />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </HelmetProvider>
    </AuthProvider>
  </BrowserRouter>,
)

const loader = document.getElementById("preloader");
if (loader) loader.style.display = "none";
