
import React from 'react';



function SelectCard(props) {
    const paymentMethod = props.paymentMethod || []
    const cart = JSON.parse(localStorage.getItem('cart'))

    function somar() {
        let valor = 150
        if (cart) {
            cart.map(product => {
                {
                    product.salePrice
                        ? valor = valor + (product.salePrice * product.qty)
                        : valor = valor + (product.price * product.qty)
                       
                }
            })
        }
        return valor
    }

    function calcInstallments(installments) {
        var installmentsPrice = 0
        installmentsPrice = somar() / installments
        
        return installmentsPrice
    }

    function getPaymentMethod() {
        return paymentMethod.map(
            option =>  { 
                if(option.id==3){
                    return <option key={option.id} value={option.id}>{option.description} {option.installmentsPrice} {somar().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</option>
                }

                if(option.id>=4 && option.id<13){
                    return <option key={option.id} value={option.id}>{option.description} {option.installments + " x de "}{calcInstallments(option.installments).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</option>
                }
            })
        }
    

    return (
        <div className="input-container">
            <label>{props.label}</label>
            <select onChange={e => props.change(e)} className="form-input col-12">
                {getPaymentMethod()}
            </select>
        </div>
    )
}

export default SelectCard