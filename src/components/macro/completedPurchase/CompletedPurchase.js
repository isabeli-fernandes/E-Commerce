import React from "react";
import "./CompletedPurchase.css"
import Items from "../../micro/completedPurchaseItems/Items"

function CompletedPurchase(props) {
    return (
        <>
            <div class="container-fluid container-principal">

                <h2 class="numero-pedido col-12">NÚMERO DO PEDIDO:<b>&nbsp;12345678</b></h2>

                <ul class="container lista-produtos">

                    
                    <Items/>
                    <Items/>

                    <div class="valor-total">Total:&nbsp;<b>R$9999,99</b></div>

                </ul>

                <div class="texto-prazo">Prazo estimado para entrega: <b>01/01/2022</b></div>

            </div>
        </>
    )
}

export default CompletedPurchase