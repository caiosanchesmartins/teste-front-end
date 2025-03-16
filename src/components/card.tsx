import React from 'react';
import "./card.scss"; 

const importImages = () => {
    const images = import.meta.glob("../assets/home/*.png", { eager: true });
    return Object.entries(images).map(([path, module]: any) => ({
        src: module.default,
        name: path.split("/").pop()?.replace(".png", "") || "Imagem",
    }));
};

const cardImages = importImages();

const duplicatedImages = [...cardImages, ...cardImages];

const Card: React.FC = () => {
    return (
        <div className="card-container">
            {duplicatedImages.map(({ src, name }, index) => (
                <div key={index} className="card">
                    <img src={src} alt={name} className="card-img" />
                    <div className="card-content">
                        
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;
