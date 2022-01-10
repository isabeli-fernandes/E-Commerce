import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./SuccessPage.css"
import ProductSuccess from "../../micro/productsSucess/productsSucess";
import OrderInfo from '../../micro/productsSucess/orderInfo'
import Button from "../../micro/Button/Button"
import api from "../../../services/api";
import { Link } from "react-router-dom";

const initial = {
    id: 0,
    myUser: {
        id: 0
    },
    payment: {
        id: 0,
        description: "",
        installments: "",
    },
    address: {
        id: 0,
        cep: "",
        city: "",
        state: "",
        district: "",
        street: "",
        number: 0,
        complement: "",
        reference: ""
    },
    telephone: {
        id: 0,
        number: ""
    },
    card: {
        cardNumber: "",
        name: "",
        cpf: "",
        birthDate: "",
        dueDate: "",
        flag:
        {
            id: 0,
            description: ""
        }
    },
    delivery: {
        id: 0,
        descricao: ""
    },
    dateOrder: "",
    deliveryDate: "",
    qtyTotal: 0,
    deliveryValue: 0.0,
    totalDiscounts: 0,
    amount: 0.0,
    bankSlip: ""
}
const crypto = require('crypto');
const alg = 'aes-256-ctr'
const pwd = 'qwertjose'

function SuccessPage(props) {

    function uncriptCard(cript) {
        var decipher = crypto.createDecipher(alg, pwd)
        var uncrypted = decipher.update(cript, 'hex', 'utf8')
        let c = ""
        for (let index = 0; index < uncrypted.length; index++) {

            if (index < uncrypted.length - 4) {
                c = c + "#"
            } else {
                c = c + uncrypted.charAt(index)
            }


        }
        return c
    }



    const user = JSON.parse(localStorage.getItem("user"));
    const [order, setOrder] = useState(initial);
    const [orderProduct, setOrderProducts] = useState([]);

    const dateInput = order.deliveryDate
    const data = new Date(dateInput);
    const dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    const subTotal = (order.amount - order.deliveryValue)
    const amountFormated = order.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const deliveryFormated = order.deliveryValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const totalDiscount = order.totalDiscounts.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    const installmentsPrice = order.amount / order.payment.installments
    const cepFormated = order.address.cep.substring(0, 5) + "-" + order.address.cep.substring(5);

    function getOrder() {
        api
            .get(`/orders/${localStorage.getItem('idOrderLastCreated')}`)
            .then((response) => {
                setOrder(response.data)
                getItemOrder(response.data.id)
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }

    function getItemOrder(id, order) {
        api
            .get(`/itemsOrder/${id}`)
            .then((response) => {
                setOrderProducts(response.data)
            }
            )
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getOrder()
        localStorageRemoveOrder()

    }, []);

    function localStorageRemoveOrder() {
        localStorage.removeItem('order')
        localStorage.removeItem('total')
        localStorage.removeItem('qtyCart')
        localStorage.removeItem('cart')
        localStorage.removeItem('discount')
        localStorage.removeItem('subTotal')
    }


    return (
        <>
            <h1>OBRIGADO!</h1>

            <p class="msg-compra">
                Seu pedido foi <em>concluído com sucesso</em> e os dados da compra foram enviados para seu e-mail.
            </p>

            <div class="container-fluid container-principal">

                <h2 class="numero-pedido col-12">Número do Pedido:<b>&nbsp;{order.id}</b></h2>

                <div class="row linha-geral justify-content-between">

                    <ul class="container col-12 col-lg-6 mx-0 d-flex flex-column">
                        <h4>Itens</h4>

                        <ProductSuccess
                            subTotal={subTotal}
                            products={orderProduct}
                            frete={deliveryFormated}
                            finalPrice={amountFormated}
                            discount={totalDiscount}
                        />

                    </ul>

                    <div class="container col-12 col-lg-5 mx-0 info-sucesso">



                        <OrderInfo titulo="Pagamento"
                            primeiraLinha={order.payment.id == 1 || order.payment.id == 13 ? order.payment.description : order.payment.description + " - " + order.card.flag.description}
                            primeiraLinha2={order.payment.id == 1 ? " Veja o seu boleto " : ""}
                            boleto= {order.payment.id == 1  ? <Link to={"/ticket/" + order.id} target="_blank" className="linkTicket">AQUI</Link> : ""}
                            segundaLinha={order.payment.id == 1 || order.payment.id == 13 ? "" : uncriptCard(order.card.cardNumber)}
                            terceiraLinha={order.payment.installments >= 2 ? order.payment.installments + " x de" : order.payment.installments}
                            terceiraLinha1={order.payment.installments >= 2 ? installmentsPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : amountFormated}
                            quartaLinha={"Total: " + amountFormated}
                        />

                        <OrderInfo titulo="Entrega"
                            primeiraLinha={order.delivery.descricao}
                            segundaLinha="Prazo estimado para entrega: " segundaLinha1={dataFormatada}
                            terceiraLinha={deliveryFormated} />

                        <OrderInfo titulo="Endereço de entrega"
                            primeiraLinha={order.address.street + ","} primeiraLinha1={order.address.number + "."} primeiraLinha2={"Comp: " + order.address.complement}
                            segundaLinha={order.address.district + " - "} segundaLinha1={order.address.city + " - "} segundaLinha2={order.address.state}
                            terceiraLinha={"CEP: " + cepFormated} quartaLinha={"Referência: " + order.address.reference} />

                    </div>

                </div>

                <div class="texto-prazo">Prazo estimado para entrega: <b>{dataFormatada}</b></div>

                <Button navigation route="/dashboard/myorder" class="btn-retorno" label="Pedidos" />

            </div>
        </>
    );
}

export default SuccessPage;