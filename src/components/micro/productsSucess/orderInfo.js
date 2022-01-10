import React from "react";
import "./orderInfo.css"

function orderInfo(props) {
    return (
        <>
            <div class="row">
                <ul class="lista-pagamento col-12 mx-0 d-flex flex-column">

                    <h4>{props.titulo}</h4>

                    <li class="row pagamento-lista info-sucesso">
                        <div class="atributos tipo-pagamento info-sucesso ">{props.primeiraLinha} {props.primeiraLinha1} {props.primeiraLinha2} {props.boleto}</div>
                        <div class="atributos numero-cartao info-sucesso">{props.segundaLinha} {props.segundaLinha1} {props.segundaLinha2}</div>
                        <div class="atributos tipo-pagamento info-sucesso">{props.terceiraLinha} {props.terceiraLinha1}</div>
                        <div class="atributos tipo-pagamento info-sucesso">{props.quartaLinha}</div>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default orderInfo;