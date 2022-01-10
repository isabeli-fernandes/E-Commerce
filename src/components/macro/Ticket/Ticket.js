import React, { useEffect, useState } from "react";
import "./Ticket.css"
import Codigo from "../../../assets/images/ticket/codigo.png"
import Logo from "../../../assets/images/headers/velho-luxo.png"
import api from "../../../services/api";

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

function Ticket(props) {
    const id = props.match.params.id;
    const [order, setOrder] = useState(initial);
    const [orderProduct, setOrderProducts] = useState([]);

    const dateInput = order.dateOrder
    const data = new Date(dateInput);
    const dueDate = new Date();
    dueDate.setDate(data.getDate() + 4)
    const dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    const amountFormated = order.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const dueDateTicket = dueDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' });;

    function getOrder() {
        api
            .get(`/orders/${id}`)
            .then((response) => {
                setOrder(response.data)
                getItemOrder(response.data.id)
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }

    function getItemOrder(id) {
        api
        .get(`/itemsOrder/${id}`)
        .then((response) => setOrderProducts(response.data))
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getOrder()

    }, []);




    return (
        <>
        <div className="allPatternTicket">
            <div className="container layoutTicket">
                <div className="row">
                    {/* First line */}
                    <div className="fistLineTicket logoTicket col-3"><img src={Logo} height="67"/></div>
                    <div className="fistLineTicket slotTicket col-2"></div>
                    <div className="fistLineTicket slotTicket numTicket col-7"> 23791.11103 60000.000103 01000.222206 1 48622000000000</div>
                    {/* Second line */}
                    <div className="slotTicket col-9">
                        <div className="titleTicket col-12">Local de pagamento</div>
                        <div className="infoTicketLeft col-12">PAGÁVEL EM QUALQUER BANCO</div>
                    </div>
                    <div className="slotTicket col-3">
                        <div className="titleTicket col-12">Vencimento</div>
                        <div className="infoTicketRight col-12">{dueDateTicket}</div>
                    </div>
                    {/* Third line */}
                    <div className="slotTicket col-9">
                        <div className="titleTicket col-12">Beneficiário</div>
                        <div className="infoTicketLeft businessNameTicket col-12">Velho Luxo Antiquário - Produtos de decoração e coleção</div>
                    </div>
                    <div className="slotTicket col-3">
                        <div className="titleTicket col-12">Agência/Código beneficiário</div>
                        <div className="infoTicketRight col-12">1111-8/0002222-5</div>
                    </div>
                    {/* Fourth line */}
                    <div className="slotTicket col-9">
                        <div className="row moreInfoTicketLine">
                            <div className="titleTicket moreInfoTicketTitle col-2">Data do doc</div>
                            <div className="titleTicket moreInfoTicketTitle col-4">Nº documento</div>
                            <div className="titleTicket moreInfoTicketTitle col-2">Espécie doc.</div>
                            <div className="titleTicket moreInfoTicketTitle col-1">Aceite</div>
                            <div className="titleTicket col-3">Data processamento</div>

                            <div className="infoTicketLeft moreInfoTicket col-2">{dataFormatada}</div>
                            <div className="infoTicketLeft moreInfoTicket col-4">{"11115487" + order.id}</div>
                            <div className="infoTicketLeft moreInfoTicket col-2"></div>
                            <div className="infoTicketLeft moreInfoTicket col-1">N</div>
                            <div className="infoTicketLeft  col-3">{dataFormatada}</div>
                        </div>
                    </div>
                    <div className="slotTicket col-3">
                        <div className="titleTicket col-12">Carteira/Nosso Número</div>
                        <div className="infoTicketRight col-12">06/00000001001-6</div>
                    </div>
                    {/* Fifth line */}
                    <div className="slotTicket col-9">
                        <div className="row moreInfoTicketLine">
                            <div className="titleTicket moreInfoTicketTitle col-2">Uso do banco</div>
                            <div className="titleTicket moreInfoTicketTitle col-3">Carteira</div>
                            <div className="titleTicket moreInfoTicketTitle col-1">Espécie</div>
                            <div className="titleTicket moreInfoTicketTitle col-3">Quantidade</div>
                            <div className="titleTicket col-3">(x)Valor</div>

                            <div className="infoTicketLeft moreInfoTicket col-2"></div>
                            <div className="infoTicketLeft moreInfoTicket col-3">06</div>
                            <div className="infoTicketLeft moreInfoTicket col-1">R$</div>
                            <div className="infoTicketLeft moreInfoTicket col-3"></div>
                            <div className="infoTicketLeft  col-3"></div>
                        </div>
                    </div>
                    <div className="slotTicket col-3">
                        <div className="titleTicket col-12">(=)Valor documento</div>
                        <div className="infoTicketRight col-12">{amountFormated}</div>
                    </div>
                    {/* Sixth line */}
                    <div className="slotTicket col-9">
                        <div className="titleTicket col-12">Local de pagamento</div>
                        <div className="infoTicketLeft instructions col-12">Não receber após o vencimento.</div>
                    </div>
                    
                    <div className="slotTicket col-3">
                        <div className="container layoutTicketInfo">
                            <div className="row instructionsLine">
                                <div className="titleTicket instructionsTitle col-12">(-)Desconto/Abatimentos</div>
                                <div className="infoTicketRight instructionsInfo col-12"></div>
                                <div className="titleTicket instructionsTitle col-12">(-)Outras deduções</div>
                                <div className="infoTicketRight instructionsInfo col-12"></div>
                                <div className="titleTicket instructionsTitle col-12">(+)Multa</div>
                                <div className="infoTicketRight instructionsInfo col-12"></div>
                                <div className="titleTicket instructionsTitle col-12">(+)Outros acréscimos</div>
                                <div className="infoTicketRight instructionsInfo col-12"></div>
                                <div className="titleTicket instructionsTitle col-12">(=)Valor cobrado</div>
                                <div className="infoTicketRight instructionsInfo col-12"></div>                         
                            </div>
                        </div>
                    </div>
                    {/* Last line */}
                    <div className="slotTicket col-9">
                        <div className="titleTicket col-12">Sacado</div>
                        <div className="infoTicketLeft  infoLastLineTicket col-12"> 
                            E-COMMERCE DE COLECAO E DECORACAO ANTIGAS E VALIOSAS LMTD. CNPJ: 21.636.886/0001-34 
                            RUA FRANCISCO MARENGO 1111 1 ANDAR
                            TATUAPÉ - São Paulo/SP - CEP: 03313-000
                        </div>
                    </div>
                    <div className="slotTicket col-3">
                        <div className="titleTicket lastTitleTicket col-12">Cód baixa</div>
                    </div>
                </div>
            </div>
            <div className="titleTicket barCodeTitle col-12">Sacador/Avalista</div>

            <div className="container barCodeTicket">
                <div className="row">
                    <div className="col=6">
                    <img src={Codigo} height="100" width="300"/>
                    </div>
                    <div className="col-6"></div>
                </div>

            </div>

        </div>
        </>
    );
}

export default Ticket;