import React, { useState} from "react";

function ProductSuccess(props) {

    const productsOrder = props.products || []
    let total = 0;

    const [PrecoTotal, setPrecoTotal] = useState(total)

    function setTotalPrice() {
        setPrecoTotal(total)
        return PrecoTotal
    }
    function imageRender(image) {
        var imgSrc = require(`../../../assets/images/products/${image}`);
        return <img className="imageSuccess" src={`${imgSrc.default}`} />
    }

    function listProducts() {
        return productsOrder.map((product) => {
            total += parseInt(product.preco)
            localStorage.setItem('total', total)
            return <>

                <li key={product.id} className="row bloco-produto justify-content-center item-1">
                    <div className="col-md-3 col-4 ">
                        {imageRender(product.productsDTO.image)}
                    </div>
                    <div className="col-md-9 col-9">
                        <div className="row ">
                            <div className="atributos tipo-atributo col-4  d-sm-flex">Produto:</div>
                            <div className="atributos atributo-descricao col-8 col-sm-8">{product.productsDTO.product}</div>

                    
                            <div className="atributos tipo-atributo col-4  d-sm-flex">Valor Unit:</div>
                            <div className="atributos atributo-valor col-8 col-sm-8">{(product.totalPrice / product.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>

                            <div className="atributos tipo-atributo col-4  d-sm-flex">Valor Total:</div>
                            <div className="atributos atributo-valor col-8 col-sm-8">{product.totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>

                            <div className="atributos tipo-atributo col-4  d-sm-flex">Qtd.:</div>
                            <div className="atributos atributo-qtd col-8 col-sm-8">{product.quantity}</div>
                        </div>
                    </div>


                </li>
            </>

        })

    }


    const finalPrice = parseInt(total + props.frete)

    return (
        <>
            {listProducts()}
            <div class="valor-total">Sub Total: &nbsp;<b>{(props.subTotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</b></div>

            {/* <div class="valor-total">Descontos total: &nbsp;<b>{props.discount}</b></div> */}
            <div class="valor-total">Frete: &nbsp;<b>{props.frete}</b></div>
            <div class="valor-total">Total: &nbsp;<b>{props.finalPrice}</b></div>
        </>
    )
}

export default ProductSuccess;