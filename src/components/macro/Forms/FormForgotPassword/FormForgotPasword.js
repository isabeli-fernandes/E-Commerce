import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap'
import "./FormForgotPassword.css"
import Input from "../../../micro/Forms/Input/Input";
import FormDefault from "../FormDefault/FormDefault";
import { Link } from "react-router-dom";
import Button from "../../../micro/Button/Button"
import api from '../../../../services/api';
import Loading from "../../../../assets/images/success/loading.gif"
import { useHistory } from 'react-router';

function FormForgotPassword(props) {

    const history = useHistory()
    const [email, setEmail] = useState("");

    // desabilita botão apos o click
    const [disable, setDisable] = React.useState(false);

    // imagem de loading
    function renderLoading() {
        return <img className="img-loading-btn" src={Loading} alt="Enviando requisição" />
    }

    function postEmail(data) {
        api.post("/forgotpassword", data)
            .then((response) => {
                alert("Link de redefinição de senha enviado, cheque seu e-mail.")
                window.location.href = "/login";
            })
            .catch((err) => {
                console.error("Erro ao realizar post de envio de e-mail para recuperação de senha" + err)
                alert("E-mail não encontrado, verifique se digitou corretamente.")
                setDisable(false)
            });
    }

    const handleSubmit = () => {
        const data = ({
            email: email,
        })

        postEmail(data)
        setDisable(true)
    }

    return (
        <>
            <main class="container-fluid custom-container py-2 pb-5">

                <FormDefault title="Recuperar senha" action="" class="custom-form-box mx-3 mx-sm-1 mx-lg-4 px-5 px-sm-1 px-lg-4">

                    <div className="row d-flex justify-content-center pt-4">

                        <p className="text-center recuperar-senha-text">Um link de reset de senha será enviado ao seu e-mail.</p>

                        <div className=" col-12 col-md-6">
                            <Input change={e => setEmail(e.target.value)} label="E-mail" className="form-input form-control col-12 form-label" type="email" id="email" placeholder="Digite seu e-mail..." />
                        </div>
                        <small className="text-center">Não lembra seu e-mail? <Link to="/contact" className="recuperar">Entrar em contato</Link></small>

                    </div>

                    <div className="row justify-content-center mt-2">
                        <Button onclick={handleSubmit} disabled={disable} label={disable ? renderLoading() : "Enviar"} class="btn-confirmacao mx-5 my-1" />
                    </div>

                </FormDefault>

            </main>

        </>
    )
}

export default FormForgotPassword


