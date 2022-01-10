import React, { useEffect, useState } from 'react'
import Remove from '../../../../assets/images/cart/remover.png'

export default function CartCard(props) {

    const [iqty, setQty] = useState(props.qty)
    const [list, setList] = useState(props.list)
    const [storage, setStorage] = useState(props.storage)

    function updateCart(cartItem) {
        localStorage.setItem('cart', JSON.stringify(cartItem));

        localStorage.setItem('qtyCart', cartItem.length)
        window.location.reload()
    }

    useEffect(() => {
        setQty(props.qty)
        setList(props.list)
    }, [])

    function remove(id) {
        var cartTemp = JSON.parse(localStorage.getItem('cart'))
        console.log(cartTemp)
        for (var i = 0; i < cartTemp.length; i++) {
            if (cartTemp[i].id == id) {
                cartTemp.splice(i, 1);
                updateCart(cartTemp);
                setQty(0)
                window.location.reload()

            }
        }
    }

    function increaseItem(id) {
        list.map(item => {
            if (id == item.id) {
                if (item.storage > iqty) {
                    setList(...list, item.qty = 1 + item.qty)

                    updateCart(list);
                    setQty(iqty + 1)
                    return console.log(list)

                } else {
                    return alert("produto sem estoque")


                }
            }
        })
    }

    function decreaseItem(id) {
        list.map(item => {
            if (id == item.id) {
                if (item.qty > 1) {
                    setList(...list, item.qty = item.qty - 1)

                    updateCart(list);
                    setQty(iqty - 1)
                    return console.log(list)

                } else {
                    return alert("deseja remover o item?")
                }
            }
        })
    }

    return (
        <>
            <div className="row carrinho-card mt-1 mb-2 mx-0 align-items-center justify-content-between">
                <div className=" col-2 col-md-2  p-0">
                    <a href={`/product/${props.id}`} > {props.render(props.image)}</a>
                </div>
                <a href={`/product/${props.id}`} className="col-4 col-md-4 pe-0  texto-carrinho">
                    {props.product}
                </a>

                <div className=" col-1 numero quantidade align-content-center text-center">
                    {iqty < storage ?<button onClick={e => {
                        e.preventDefault()
                        increaseItem(props.id)
                    }} className="controle positivo increase-btn">+</button>
                    : <button className="controle limit-btn increase-btn">+</button>} {iqty}
                    {iqty > 1 ?<button onClick={e => {
                        e.preventDefault()
                        decreaseItem(props.id)
                    }} className="controle negativo decrease-btn" >-</button>
                    : <button className="controle limit-btn decrease-btn">-</button>}
                </div>

                <div className="col-2 texto-carrinho text-center">
                    <span className="numero">{props.salePrice 
                    ? (props.salePrice * iqty).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) 
                    : (props.price * iqty).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>

                <div className="col-2 ">
                    <a onClick={e => {
                        e.preventDefault()
                        remove(props.id)


                    }} href="#" className="removerCarrinho row justify-content-center">
                        <img className="remover col-7 col-md-4" src={Remove} alt="" width="20px" />
                    </a>
                </div>
            </div>
        </>
    )

}