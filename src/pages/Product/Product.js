import React, { useEffect, useState } from 'react'
import './Product.css'
import Button from '../../components/micro/Button/Button'
import H1 from '../../components/micro/Title/H1'
import H2 from '../../components/micro/Title/H2'
import api from '../../services/api'


const initial = {
    product: {
        id: 0,
        product: "",
        conservationStat: {
            id: 4,
            description: ""
        },
        description: "",
        feature: "",
        year: "",
        categoryDTO: {
            id: 2,
            category: "",
            description: ""
        },
        quantity: 1,
        image:"padrao.png"
    },
    price: 0,
    salePrice: 0,
    qty: 0
}

function Product(props) {

    function imageRender() {
        var imgSrc = require(`../../assets/images/products/${produto.product.image}`);
        return <img src={`${imgSrc.default}`} className="image-product-api" />
    }

    const id = props.match.params.id;

    const [produto, setProduto] = useState({...initial});
    function chargeProduct(){
        api.get("/products/"+id).then( (response) => setProduto(response.data) ).catch((err) => {
            console.error("Erro ao consumir API" + err);

        });
     
    }
    useEffect(() => {
        chargeProduct()
        window.scrollTo(0, 0);
    }, []);

    const [item, setItem] = useState();

    const product = produto || [];

    const addToCart = () => {

        let cartList = localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart"))
            : []
        
        const product = {
            id: produto.product.id,
            price: produto.price,
            salePrice: produto.salePrice,
            product: produto.product.product,
            year: produto.product.year,
            image: produto.product.image,
            qty:1, 
            storage:produto.qty
        }
            if (cartList.length >0) {
                for (var i = 0; i <= cartList.length; ++i) {
                    if (cartList[i].id == product.id) {
                        if (cartList[i].storage > cartList[i].qty) {
                            cartList[i].qty = cartList[i].qty + 1
                            break 
                        } else {
                             window.alert("Produto sem estoque")
                             break
                        }
                    } else if (i == cartList.length - 1) {
                        if (product.storage >= 1) {
                            cartList.push(product)
                            break                           
                        } else {
                             window.alert("Produto sem estoque")
                             break
                        }
                        
    
                    }
                }
            } else {
    
                if (product.storage >= 1) {
                    cartList.push(product)
                                          
                } else {
                     window.alert("Produto sem estoque")
                     
                }
               
            }
            let cartString = JSON.stringify(cartList)
            localStorage.setItem("cart", cartString)
            window.location.href = "/cart";
    
        }
    



    const preco = () => {

        if (produto.salePrice) {

            const saleFormated = produto.salePrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const priceFormated = produto.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const parcelas = (produto.salePrice / 10).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            return (
                <>
                    <div className="preco-de tamanho-num">De: {priceFormated}</div>
                    <div className="preco-por tamanho-num">Por: {saleFormated}</div>
                    <div className="parcelas tamanho-letra">À vista, ou em até <span className="tamanho-letra">{10}x</span> de <span className="tamanho-letra">{parcelas}</span> no cartão</div>
                </>
            )
        } else {

            const priceFormated = produto.price?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const parcelas = (produto.price / 10).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            return (
                <>
                    <div className="preco-por tamanho-num">Por: {priceFormated}</div>
                    <div className="parcelas tamanho-letra">À vista, ou em até <span className="tamanho-letra">{10}x</span> de <span className="tamanho-letra">{parcelas}</span> no cartão</div>
                </>
            )
        }

    }


  
    function AlertDefault(){
        window.alert("Produto sem estoque")
    }

    return (
        <>
            <H1 h1={produto.product.product}></H1>
            <section className="mb-4">
                <div className="container-fluid container-fluid-section">
                    <div className="container">
                        <div className="row row-correction">
                            <div className="container container-imagem mx-0 col-12 col-md-7 col-lg-6 mt-3">
                                <div className="row p-0 imagem-caixa-registradora">
                                    {imageRender()}
                                </div>
                            </div>
                            <div className="container Valores px-0 px-md-3 px-lg-0 mb-5 col-12 col-md-5 col-lg-6 d-flex flex-column justify-content-center">
                                <h4 className="valor text-center">{preco()}</h4>
                                <Button onclick={produto.qty>=1?addToCart:AlertDefault } disabled={produto.qty>=1?false:true} class={produto.qty>=1?"btn-comprar  align-self-center":"btn-sem-estoque align-self-center "} label={produto.qty>=1?"COMPRAR":"sem estoque"} />

                                <h4 className="frete-fixo-produto text-center pt-4">Frete fixo R$150,00</h4>
                            </div>
                        </div>
                    </div>

                    <div className="container-fluid container-fluid-caracteristicas">
                        <div className="row">
                            <H2 h2="Informações do Produto"></H2>
                        </div>
                    </div>

                    <div className="container container-fluid-informações-texto px-5 py-2">
                        <div className="row">
                            <p className="h1-informações-texto">
                                {produto.product.description} </p>
                        </div>
                    </div>
                    <div className="container-fluid container-fluid-caracteristicas">
                        <div className="row">
                            <H2 h2="Características"></H2>
                        </div>
                    </div>
                    <div className="container container-fluid-caracteristicas-texto px-5 py-2">
                        <div className="row">
                            <p className="h1-caracteristicas-texto">
                                {produto.product.feature} </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Product