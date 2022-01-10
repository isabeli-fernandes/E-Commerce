import {Link} from "react-router-dom";
import React from 'react'
import './Footer.css'

function Footer(props) {

    return(
        <>
        <footer>
            <div className="container-fluid pt-1">
                <div className="row justify-content-between first-footer pt-3 px-0">
                <div className=" col-5 col-xs-6 col-sm-6 col-md-3 sobre px-2">
                        <h3>
                            sobre
                        </h3>
                        <ul>
                            <li><Link to={"/About/"}>Visão</Link></li>
                            <li><Link to={"/About/"}>Missão</Link></li>
                            <li><Link to={"/About/"}>História</Link></li>
                        </ul>
                    </div>
                    <div className=" col-7 col-xs-6 col-sm-6 col-md-3 produtos px-2">
                        <h3>
                            produtos
                        </h3>
                        <ul>
                            <li><Link to={"/Category/"}>Comprar</Link></li>
                            <li><Link to={"/Contact/"}>Vender</Link></li>
                            <li><Link to={"/Sales/"}>Promoções</Link></li>
                        </ul>
                    </div>
                    <div className="col-5 col-xs-6 col-sm-2 col-md-3 contato px-2">
                        <h3>
                            contato
                        </h3>
                        <ul>
                            <li><Link to={"/Contact/"}>Dúvidas</Link></li>
                            <li><Link to={"/Contact/"}>Informações</Link></li>
                            <li><Link to={"/Contact/"}>Sugestões</Link></li>
                        </ul>
                    </div>
                    <div className="col-7 col-xs-6 col-sm-6 col-md-3 redes px-2">
                        <h3>
                            redes sociais
                        </h3>
                        <ul>
                            <li className="instagram"><a href="https://www.instagram.com/velho_luxo/" target="_blank">Instagram</a></li>
                            <li className="facebook"><a href="https://www.facebook.com/Velho-Luxo-108803898301516" target="_blank">Facebook</a></li>
                            <li className="pinterest"><a href="https://br.pinterest.com/velholuxo/_saved/" target="_blank"></a>Pinterest</li>
                        </ul>
                    </div>

                    <div className="col-12 footerPaymentAndSocial">
                        <h3 className="titlePaymentsMethodsFooter">
                            Formas de pagamento
                        </h3>
                        <ul className="p-0">
                            <div className="container">
                                <div className="row justify-content-around p-1">
                                    <div className="col-1 p-0">
                                        <li className="amex"></li>
                                    </div>
                                    <div className="col-1 p-0">
                                        <li className="diners"></li>
                                    </div>
                                    <div className="col-1 p-0">
                                        <li className="elo"></li>
                                    </div>
                                    <div className="col-1 p-0">
                                        <li className="hipercard"></li>
                                    </div>
                                    <div className="col-1 p-0">
                                        <li className="mastercard"></li>
                                    </div>
                                    <div className="col-1 p-0">
                                        <li className="visa"></li>
                                    </div>
                                    <div className="col-1 p-0">
                                        <li className="pixFooter"></li>
                                    </div>
                                    <div className="col-1 p-0">
                                        <li className="boletoFooter"></li>
                                    </div>
                                </div>
                            </div>
                            
                            {/* <li className="diners"></li>
                            <li className="elo"></li>
                            <li className="hipercard"></li>
                            <li className="mastercard"></li>
                            <li className="visa"></li>
                            <li className="discover"></li>
                            <li className="pix"></li>
                            <li className="boleto"></li> */}
                        </ul>
                    </div>

                    <div className="col-md-12 last-footer px-0">
                        Velho Luxo Antiquário® - Todos os direitos reservados
                    </div>

                </div>
                
            </div>
        </footer>
        </>
    )
}

export default Footer