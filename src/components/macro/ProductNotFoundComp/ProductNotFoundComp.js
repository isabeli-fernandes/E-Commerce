import React from "react";
import "./ProductNotFoundComp.css"

function ProductNotFoundComp(props) {
    return (
        <>
            <div className="notfound">
                    <p>O produto "<span>{props.search}"</span> não foi encontrado, por favor tente usar palavras chaves como:</p>
                    <ul>
                        <p>- Louças antigas</p>
                        <p>- Cozinha</p>
                        <p>- Armário real</p>
                    </ul>
            </div>
        </>
    );
}
export default ProductNotFoundComp;