import React from "react";
import "./detalhe-produto.scss"; 

interface Produto {
  productName: string;
  photo: string;
  price: string;
}

interface ModalProps {
  produto: Produto | null;
  isOpen: boolean;
  onClose: () => void;
}

export const formatarPrecoBRL = (preco: number): string => {
  return preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
  });
};

const DetalheProduto: React.FC<ModalProps> = ({ produto, isOpen, onClose }) => {
  if (!isOpen || !produto) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-body">
          <img src={produto.photo} alt={produto.productName} className="modal-img" />

          <div className="modal-info">
            <h2>{produto.productName}</h2>
            <p className="modal-price">{formatarPrecoBRL(produto.price)}</p>
            <p className="modal-description">
              {produto.descriptionShort}
            </p>
            <a href="#" className="modal-link">Veja mais detalhes do produto &gt;</a>

            <div className="modal-actions">
              <div className="quantity-selector">
                <button>-</button>
                <span>01</span>
                <button>+</button>
              </div>
              <button className="modal-buy">COMPRAR</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalheProduto;
