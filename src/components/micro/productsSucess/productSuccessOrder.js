import React, { useEffect, useState } from "react";
import api from "../../../services/api";

function ProductSuccessOrder(props) {
    const products = JSON.parse(localStorage.getItem('cart')) || []

    let total = props.total()
    let subTotal = props.sub()
    let discount = props.desconto()
    let somarTotal = props.tot()
    
    function imageRender(image) {
        var imgSrc = require(`../../../assets/images/products/${image}`);
    
        return <img className="imageSuccess" src={`${imgSrc.default}`} />
    }

    useEffect(() => {
        setRegion(props.prazo)
    }, [])

    const [prazo, setPrazo] = useState("")
    const [frete, setFrete] = useState("")
    const [freteNum, setFreteNum] = useState(0)

    function setRegion(uf) {

        var today = new Date()
        var deliveryDate = new Date()
        var day = ""
        var month = ""
        var year = ""
        var dataBack = ""

        api.get("/deliveryDate/" + uf)
        .then(res => {
            deliveryDate.setDate(today.getDate() + res.data.addDate)
            day = String(deliveryDate.getUTCDate()).padStart(2, '0') // padStart(2, '0') para quando for mes de um unico numero, adicionar 0 a esquerda
            month = String(deliveryDate.getUTCMonth() + 1).padStart(2, '0') // month + 1 pois o mes inicia em 0 no Date do JS
            year = deliveryDate.getUTCFullYear()
            dataBack = year + "-" + month + "-" + day // formatando a data para mandar para o back
            setPrazo(deliveryDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' }));
            setFrete(res.data.deliveryPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
            setFreteNum(res.data.deliveryPrice)
            props.funcPrazo(dataBack)
            props.funcFrete(res.data.deliveryPrice)
        })
        .catch(err => {
            console.error("Erro ao buscar prazo", err)
        })
    }

    function listProducts() {
        return products.map((product) => {
            return <>

                <li key={product.id} className="row bloco-produto justify-content-center item-1">
                    <div className="col-md-3 col-4 ">
                        {imageRender(product.image)}
                    </div>
                    <div className="col-md-9 col-9">
                        <div className="row ">
                            <div className="atributos tipo-atributo col-3  d-sm-flex">Produto:</div>
                            <div className="atributos atributo-descricao col-9 col-sm-9">{product.product}</div>

                            <div className="atributos tipo-atributo col-3  d-sm-flex">Valor Unit.:</div>
                            <div className="atributos atributo-valor col-9 col-sm-9">{product.salePrice ? product.salePrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>

                            <div className="atributos tipo-atributo col-3  d-sm-flex">Qtd.:</div>
                            <div className="atributos atributo-qtd col-9 col-sm-9">{product.qty}</div>

                            <div className="atributos tipo-atributo col-3  d-sm-flex">Valor Total:</div>
                            <div className="atributos atributo-qtd col-9 col-sm-9">{props.tot(product.id).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                        </div>
                    </div>


                </li>
            </>

        })

    }



    return (
        <>
            {listProducts()}
            {/* {console.log(total)} */}

            <div className="valor-total">Sub Total: &nbsp;<b>{subTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</b></div>

        
            <div className="valor-total">Frete: &nbsp;<b>{frete}</b></div>
            <div className="valor-total">Total: &nbsp;<b> {(total + freteNum).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</b></div>
            <div className="valor-total mt-3">Prazo estimado para entrega: <b>{prazo}</b></div>
        </>
    )
}
export default ProductSuccessOrder;