import React, { useState } from "react";
import "./CardProduct.css"
import Button from '../../../micro/Button/Button'

function CardProduct(props) {
    function imageRender() {
        var imgSrc = require(`../../../../assets/images/products/${props.image}`);
        return <img src={`${imgSrc.default}`} />
    }



    const addToCart = () => {
        const product = {
            id: props.id,
            price: props.price,
            salePrice: props.salePrice,
            product: props.product,
            year: props.year,
            image: props.image,
            storage:props.qty,
            qty:1
        }
        let cartList = localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart"))
            : []
        
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
                    if (product.storage >=1) {
                        cartList.push(product)
                        break 
                    } else {
                         window.alert("Produto sem estoque")
                         break
                    }


                }
            }
        } else {

            if (product.storage >=1) {
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

        if (props.salePrice) {

            const saleFormated = props.salePrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const priceFormated = props.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const parcelas = (props.salePrice / 10).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            return (
                <>
                    <div className="preco-de">{priceFormated}</div>
                    <div className="preco-por">{saleFormated}</div>
                    <div className="parcelas">À vista, ou em até <em>{10}x</em> de <em>{parcelas}</em> no cartão</div>
                </>
            )
        } else {
            
            const priceFormated = props.price?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const parcelas = (props.price / 10).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            return (
                <>
                    <div className="preco-por">{priceFormated}</div>
                    <div className="parcelas">À vista, ou em até <em>{10}x</em> de <em>{parcelas}</em> no cartão</div>
                </>
            )
        }

    }  
    
    function AlertDefault(){
        window.alert("Produto sem estoque")

    }

    return (
        <>
            <li className="card-product col-11 col-sm-8 col-md-3 col-lg-2 mb-4 ">


                <div className={props.salePrice && props.qty>=1 ? "sale-etiq caixa-imagem" : "caixa-imagem"}>
                    <a href={`/product/${props.id}`}>
                        {imageRender()}
                    </a>
                </div>


                <div className="corpo-card">

                    <a href={`/product/${props.id}`}  className="descricao">{props.product}<br />({props.year})</a>

                    <div className="pagamento">
                        <div className="preco">
                            {preco()}
                        </div>

                        <Button onclick={props.qty>=1?addToCart:AlertDefault } disabled={props.qty>=1?false:true} class={props.qty>=1?"btn-comprar btn-expand":"btn-sem-estoque btn-expand"} label={props.qty>=1?"COMPRAR":"sem estoque"} />

                    </div>

                </div>

            </li>
        </>
    )
}


export default CardProduct
