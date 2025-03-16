import React from "react";
import "./error.scss";
import errorImage from "../assets/error.png"; // Imagem de erro

const ErrorPage = () => {
    return (
        <div className="error-container">
            <img src={errorImage} alt="Erro" className="error-image" />
            <p className="error-text">Página em construção</p>
        </div>
    );
};

export default ErrorPage;