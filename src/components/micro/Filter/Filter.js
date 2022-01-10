import React from "react";

function Filter(props) {
    return (
        <>
            <div class="container mt-4 col-6 col-xs-4 col-sm-5 col-md-4 col-lg-6 rel no-wrap text-end">

                <form action="" class="row justify-content-md-between justify-content-center mb-3">
                    <label for="filtro" class="col-md-5 p-0 me-1  col-8">Ordenar por: </label>
                    <select name="filtro" class="col-md-6 col-8" id="filtro">
                        <option value="default">Filtro</option>
                        <option value="maior-preco">Maior Valor</option>
                        <option value="menor-preco">Menor Valor</option>
                        <option value="ofertas">Maior desconto</option>
                        <option value="mais-antigo">Mais Antigo</option>
                        <option value="mais-novo">Mais Novo</option>
                    </select>
                </form>
            </div>
        </>
    );
}

export default Filter;