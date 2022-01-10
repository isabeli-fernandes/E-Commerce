import React, {useEffect, useState} from "react";
import Sacola from "../../../assets/images/headers/sacola.png"
import "./Bag.css"

const initialCart = 0

function Bag(props) {
    const[qtyCart, setQty]  = useState(initialCart)
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')
    ))

    function setQtyCart() {
        var qty = 0
        if (cartItems) {
            cartItems.map(item => {
                qty = qty + item.qty
            })
        }
        localStorage.setItem('qtyCart', qty)
        setQty(qty)
        return qty
    }

    useEffect(() => {
        setQtyCart()
        setCartItems(JSON.parse(localStorage.getItem('cart')))
    }, [])

    return (
        <>
            <div className="login-button-header sacola col-2 col-sm-1">
                <a href="/cart" className="perfil-bloco">
                    <div className="bag-item">{qtyCart}</div>
                    <img className="login-imagem sacola-imagem" src={Sacola} />
                    <div className="perfil-nome">Sacola</div>
                </a>
            </div>
        </>
    )

}

export default Bag