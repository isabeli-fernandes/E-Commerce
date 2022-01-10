import React, { useEffect, useState } from 'react'
import './CartItems.css'
import Remove from '../../../assets/images/cart/remover.png'
import Produto from '../../../assets/images/cart/caixaRegistradora.png'
import { Link } from 'react-router-dom'
import CartCard from './CartCard/CartCard'


function CartItems(props) {
    const productItems = JSON.parse(localStorage.getItem("cart")) || []
    const qtyCart = JSON.parse(localStorage.getItem('qtyCart'))

    function imageRender(image) {
        var imgSrc = require(`../../../assets/images/products/${image}`);
        return <img className="imagem-carrinho" src={`${imgSrc.default}`} />
    }

    function listCartItem() {

        return productItems.map(product => {
            let qtd = 0
            return (
                <CartCard
                    render={imageRender}
                    id={product.id}
                    product={product}
                    image={product.image}
                    product={product.product}
                    qty={product.qty}
                    price={product.price}
                    salePrice={product.salePrice}
                    storage={product.storage}
                    list={productItems}
                />
            )
        })
    }

    return (
        <>
            {listCartItem()}
        </>
    )
}



export default CartItems