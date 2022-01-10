import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react'
import '../../../pages/Cart/Cart.css'
import CartItems from '../../micro/CartItems/CartItems';
import Button from "../../micro/Button/Button"
import { useHistory } from "react-router"
import { Link } from 'react-router-dom';
import CardProduct from '../Cards/Products/CardProduct';
import { Redirect } from "react-router-dom";
import Input from '../../micro/Forms/Input/Input';
import InputHook from '../../micro/Forms/Input/InputHook';
import InputCep from '../../micro/Forms/Input/InputCep';
import { useForm } from "react-hook-form"; // lembrar de fazer npm install para instalar a biblioteca react-hook-form
import { ErrorMessage } from "@hookform/error-message"; // lembrar de fazer npm install para instalar a biblioteca error-message
import { render } from '@testing-library/react';
import api from '../../../services/api';

const initialCart = 0


function CartItemsComp(props) {
    const history = useHistory()
    const [qtyCart, setQty] = useState(initialCart)
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')
    ))
    const [total, setTotal] = useState(0)
    const [address, setAddress] = useState({
        state: ""
    })
    

        // desfragmentando as funcoes e objetos da biblioteca react-hook-form
        const { register, handleSubmit, watch, formState: { errors }, reset, setValue, clearErrors, setError } = useForm({
            mode: 'onChange',
            reValidateMode: 'onChange',
            defaultValues: {},
            resolver: undefined,
            context: undefined,
            criteriaMode: "firstError",
            shouldFocusError: true,
            shouldUnregister: false,
            shouldUseNativeValidation: false,
            delayError: undefined
          });

    function limpa_formulário_cep() {
        //Limpa valores do formulário de cep.
        setAddress({ ...address, state: ""});
    }

    function meu_callback(conteudo) {
        if (!("erro" in conteudo)) {
            //Atualiza os campos com os valores.
            setAddress({ ...address, state: conteudo.uf })
            setFreight(setRegion(conteudo.uf));
            console.log(conteudo)
            console.log(freight)
        } //end if.
        else {
            //CEP não Encontrado.
            limpa_formulário_cep();
            alert("CEP não encontrado.");
        }
    }

    function buscarCep(value) {

        clearErrors(["cep"])

        const valor = value

        setValue("cep", valor)

        var cep = ""

        //Nova variável "cep" somente com dígitos.
        if (valor) {
            cep = valor.replace(/\D/g, '');
        }

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                setAddress({ ...address, state: "..." });

                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(res => res.json())
                    .then(data => meu_callback(data))
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
                return false
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
            return false
        }
    };

    const [freight, setFreight] = useState(0);
    const [CEP, setCEP] = useState("");

    function setRegion(uf) {

        api.get("/deliveryDate/" + uf)
        .then(res => {
            setFreight(res.data.deliveryPrice)
        })
        .catch(err => {
            console.error("Erro ao buscar endereço", err)
        })
    }

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

    // const [success, setSuccess] = useState(false)
    

    useEffect(() => {
        setQtyCart()
        setCartItems(JSON.parse(localStorage.getItem('cart')))
        somar()
    }, [])

    function somar() {
        let valor = 0
        if (cartItems) {
            cartItems.map(product => {
                {
                    product.salePrice
                    ? valor = valor + (product.salePrice * product.qty)
                    : valor = valor + (product.price * product.qty)
                }
            })
        }
        setTotal(valor)
    }

    function preventDefault(e) {
        e.preventDefault()
        props.click()
        window.location.href = props.logged ? "/login" : "/checkout";

    }
    return (

        <>
            <div className="container mt-5">

                <div className="row justify-content-center mt-2 mb-2">
                    <h2 className="titulo col-12 mb-3">Sacola</h2>
                    <div className="col-9 linha-divisoria mb-3"></div>
                </div>
            </div>

            <div className=" container personalizado-carrinho-desc p-0 pl-md-1 pr-md-1  ">

                <div className="row container-descricao justify-content-between align-items-center">
                    <div className="col-2"></div>
                    <h2 className=" texto-desc col-4 text-start  col-md-4">DESCRIÇÃO PRODUTOS</h2>
                    <h2 className="texto-desc col-1  "><abbr title="Quantidade unitaria">QTD UN.</abbr></h2>
                    <h2 className="texto-desc col-2 ">PREÇO </h2>
                    <h2 className="texto-desc col-2"><abbr title="Remover do carrinho">REM</abbr></h2>

                </div>
            </div>

            <div className=" container personalizado-carrinho p-0 pl-md-1 pr-md-1  ">

                {qtyCart >= 1 ? <CartItems /> :
                    <div className="m-5 justify-content-center">
                        <p className="text-center">Está meio vazio aqui, não? Confira nossas promoções e outros itens da loja!</p>
                    </div>}


                {qtyCart >= 1 ? <div className="row tamanho  ">
                    <div className="col-5 mb-3 mt-3 text-start">
                        <div className="row">
                            <div className="col-6 pt-1">
                            <InputCep
                                name="cep" 
                                pattern={/^\d{5}-\d{3}$/}
                                mask={[/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                                required={<span 
                                className="text-danger">Campo inválido!</span>}
                                blur={buscarCep}
                                label="Calcular frete" 
                                type="text" 
                                className="form-input col-12"
                                placeholder="00000-000" 
                                validation={buscarCep}
                                register = {register}
                                errors= {errors}
                                change={e => { setCEP(e.target.value) }}/>
                            </div>
                            <div className="col-6 mt-4 pt-2">
                                {freight ? <h4 className="texto-total">Frete: <span className="numero total">{freight.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></h4> : ""}
                            </div>
                        </div>
                    </div>
                    <div className="col-5 mb-3 mt-5">
                        <h4 className="texto-total">Quantidade: <span className="numero total">{qtyCart} </span> - Total: <span className="numero total">{freight ?(total + freight).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : (total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></h4>
                    </div>

                </div> : ""}

                <div className="row justify-content-center tamanho mb-4">
                    <div className="col-9 linha-divisoria-apoio justify-self-center "></div>
                </div>

                <div className="d-flex justify-content-between mb-5">
                    <Button navigation route={"/home"} class="btn-retorno ajuste-btn-retorno" label="Continuar Comprando" />
                    {qtyCart >= 1 ? <Link onClick={(e) => preventDefault(e)} class="btn-custom-default btn-comprar align-self-center" label="">
                        FINALIZAR
                    </Link> : ""}
                </div>

            </div> 
        </>
    )
}

export default CartItemsComp;