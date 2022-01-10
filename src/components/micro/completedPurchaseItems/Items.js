import React from "react";
import "./Items.css"

function Items(props) {
    return (
        <>
            <li class="row bloco-produto item-1 li">

                <div class="atributos tipo-atributo col-3 d-none d-sm-flex">Descrição:</div>
                <div class="atributos atributo-descricao col-12 col-sm-9">Penteadeira (1908) Madeira</div>

                <div class="atributos tipo-atributo col-3 d-none d-sm-flex">Valor:</div>
                <div class="atributos atributo-valor col-12 col-sm-9">R$1999,00</div>

                <div class="atributos tipo-atributo col-3 d-none d-sm-flex">Quantidade:</div>
                <div class="atributos atributo-qtd col-12 col-sm-9">01</div>
            </li>
        </>
    )
}

export default Items