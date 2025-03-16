import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import DetalheProduto from "./detalhe-produto"; // Importa o modal
import "../components/produtos.scss"; // Arquivo CSS para estilização
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dados from '../service/dados.json';
import Card from './Card';
import logo from '../assets/logo.png';



const API_URL = 'https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json'; // Substitua pelo seu endpoint real

// essa função buscará toda a lista de imagens dentro da pasta produtos/categorias, de forma que não será necessário criar manualmente botões ao crescermos as categorias
const importImages = () => {
    const images = import.meta.glob("../assets/produtos/categorias/*.png", { eager: true });
    return Object.entries(images).map(([path, module]: any) => {
      const fileName = path.split("/").pop()?.replace(".png", "") || "Desconhecido";
      return { src: module.default, name: fileName };
    });
  };

//função para conversão de qualquer campo number para moeda real
export const formatarPrecoBRL = (preco: number): string => {
    return preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
};
  
// Dicionário que mapeia os nomes dos arquivos aos nomes exibidos nos botões
const categoryNames: Record<string, string> = {
    tech: "Tecnologia",
    market: "Supermercado",
    drink: "Bebidas",
    ferramentas: "Ferramentas",
    saude: "Saúde",
    sport: "Esportes e Fitness",
    moda: "Moda",
  };
  
const produtoImages = importImages();
const Produtos: React.FC = () => {

    const [selectedProduto, setSelectedProduto] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // consumindo dados direto do json local
    const [prod, setProdutos] = useState(dados.products);

    //consumindo dados direto da api, erro de cors foi identificado, por isso utilizado o json local
    // const [prod, setProdutos] = useState<any[]>([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);

    // useEffect(() => {
    //     // Fazendo a requisição para o endpoint
    //     fetch(API_URL)
    //     .then((response) => {
    //         if (!response.ok) {
    //         throw new Error(`Erro ao buscar os produtos: ${response.status}`);
    //         }
    //         return response.json();
    //     })
    //     .then((data) => {
    //         setProdutos(data.produtos);
    //         setLoading(false);
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //         setError(error.message);
    //         setLoading(false);
    //     });
    // }, []);

    const abrirModal = (produto: any) => {
        setSelectedProduto(produto);
        setModalOpen(true);
      };

  // Configuração do carrossel
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Exibe 4 produtos por vez
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    
    <div className="produtos-container">
      {/* Banner */}
      <div className="banner-container">
        <div className="banner-text">
          <h1>Venha conhecer nossas promoções</h1>
          <span>50% Off</span> nos produtos
          <br />
          <button className="banner-button">Ver produto</button>
        </div>
      </div>

      {/* Categorias */}
      <div className="categorias-container">
        {produtoImages.map(({ name, src }, index) => (
          <button key={index} className="categoria-button">
            <img src={src} alt={name} className="categoria-icon" />
            {/* <span>{categoryNames[name] || "Categoria"}</span>  descomentar caso queira adicionar o nome das categorias de forma dinamica, não utilizado pois a imagem ja veio com o nome da categoria*/}
          </button>
        ))}
      </div>

      {/* Carrossel de produtos */}
      <div className="carousel-container">
        <h2 className="titulo-produtos">Produtos relacionados</h2>
        <div className="categoria-tabs">
            <button className="active">CELULAR</button>
            <button>ACESSÓRIOS</button>
            <button>TABLETS</button>
            <button>NOTEBOOKS</button>
            <button>TVS</button>
            <button>VER TODOS</button>
        </div>

        <Slider {...settings} className="carousel-produtos">
            {prod.map((produto) => (
            <div key={produto.productName} className="produto-card">
                <img src={produto.photo} alt={produto.productName} className="produto-imagem" />
                <p className="produto-nome">{produto.productName}</p>
                <p className="preco-antigo">{formatarPrecoBRL(produto.price)}</p>
                <p className="preco-novo">{formatarPrecoBRL(produto.price)}</p>
                <p className="frete-gratis">Frete grátis</p>
                <button className="botao-comprar" onClick={() => abrirModal(produto)}>
                    COMPRAR
                </button>
            </div>
            ))}
        </Slider>
      </div>
      <Card />
      <Slider {...settings} className="carousel-produtos">
            {prod.map((produto) => (
            <div key={produto.productName} className="produto-card">
                <img src={produto.photo} alt={produto.productName} className="produto-imagem" />
                <p className="produto-nome">{produto.productName}</p>
                <p className="preco-antigo">{formatarPrecoBRL(produto.price)}</p>
                <p className="preco-novo">{formatarPrecoBRL(produto.price)}</p>
                <p className="frete-gratis">Frete grátis</p>
                <button className="botao-comprar" onClick={() => abrirModal(produto)}>
                    COMPRAR
                </button>
            </div>
            ))}
        </Slider>
      <Card />

      {/* Modal de Detalhes do Produto */}
      <DetalheProduto produto={selectedProduto} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <div className="marcas-container">
    <h2 className="titulo-marcas">Navegue por marcas</h2>
    <div className="marcas-grid">
        {Array(5).fill(0).map((_, index) => (
            <div key={index} className="marca-card">
                <img src={logo}className="marca-imagem" />
            </div>
        ))}
    </div>
    </div>
    <Slider {...settings} className="carousel-produtos">
            {prod.map((produto) => (
            <div key={produto.productName} className="produto-card">
                <img src={produto.photo} alt={produto.productName} className="produto-imagem" />
                <p className="produto-nome">{produto.productName}</p>
                <p className="preco-antigo">{formatarPrecoBRL(produto.price)}</p>
                <p className="preco-novo">{formatarPrecoBRL(produto.price)}</p>
                <p className="frete-gratis">Frete grátis</p>
                <button className="botao-comprar" onClick={() => abrirModal(produto)}>
                    COMPRAR
                </button>
            </div>
            ))} 
    </Slider>



 <div className="footer-container">
    
    <div className="newsletter-section">
        
        <div className="newsletter-content">
        <h2 >Inscreva-se na nossa newsletter</h2>
            <p>Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da Econverse.</p>
        </div>

        
        <div className="newsletter-form-container">
        
            <div className="newsletter-form">
                <input type="text" placeholder="Digite seu nome" />
                <input type="email" placeholder="Digite seu e-mail" />
                <button className='botao-inscrever'>INSCREVER</button>
            </div>
            <div className="newsletter-termos">
                <input type="checkbox" id="termos" />
                <label htmlFor="termos">Aceito os termos e condições</label>
            </div>
        </div>
    </div>   
    
</div>    

<div className="footer-content">
        <div className="footer-info">
            <div className="footer-logo">
              
                <img src={logo} alt="Econverse Logo" />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className="social-icons">
                    <i className="fab fa-facebook"></i>
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-linkedin"></i>
                </div>
            </div>
            <div className="footer-divider"></div>
            <div className="footer-links">
                <div className="footer-section">
                    <h3>Institucional</h3>
                    <ul>
                        <li>Sobre Nós</li>
                        <li>Movimentos</li>
                        <li>Trabalhe conosco</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Ajuda</h3>
                    <ul>
                        <li>Suporte</li>
                        <li>Fale Conosco</li>
                        <li>Perguntas Frequentes</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Termos</h3>
                    <ul>
                        <li>Termos e Condições</li>
                        <li>Política de Privacidade</li>
                        <li>Troca e Devolução</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
<div className="footer-end">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div> 
    </div>
    
  );
};

export default Produtos;
