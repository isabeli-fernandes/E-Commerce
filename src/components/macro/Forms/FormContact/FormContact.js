import React from 'react';
import "./FormContact.css"
import { useState, useEffect } from 'react';
import api from '../../../../services/api';
import SelectOptions from '../../../micro/Forms/Select/SelectOption';
import ModalComp from '../../../micro/Modal/Modal';
import FormDefault from '../FormDefault/FormDefault';
import Button from "../../../micro/Button/Button"
import { useHistory } from 'react-router';
import InputHook from '../../../micro/Forms/Input/InputHook';
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Loading from "../../../../assets/images/success/loading.gif"

function FormContact(props) {

    const history = useHistory()
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [subject, setSubject] = useState(1);
    const { setValue, register, handleSubmit, formState: { errors }, clearErrors } = useForm();

    function handleShow() {
        return show
    }

    function sendContact(contact) {
        api.post("/contacts", contact)
            .then((response) => {
                setShow(true)
                alert("Sua mensagem foi enviada com sucesso! Responderemos o mais breve possível. O prazo máximo é de 24h para o retorno de nossa equipe. Confira seu e-mail e cheque sua caixa de spam. Obrigado!")
                window.location.href = "/home";
            })
            .catch((err) => {
                console.error("Erro ao realizar Post de contato" + err)
                alert("Você deve preencher todos os campos do formulário.")
                setDisable(false)
            });
    }

    function postContact() {
        const contact = ({
            subject: {
                id: subject
            },
            name: name,
            phoneNumber: phoneNumber.toString().replace(/[^0-9]/g, ""),
            email: email,
            content: content
        })

        sendContact(contact)
        setDisable(true)
    }

    useEffect(() => {
        document.addEventListener("keydown", function (event) {
            if (event.keyCode === 13 && event.target.nodeName === "INPUT") {
                var form = event.target.form;
                var index = Array.prototype.indexOf.call(form, event.target);
                form.elements[index + 1].focus();
                event.preventDefault();
            }
        });
        getUserData()
    }, []);

    function getUserData() {
        if (localStorage.getItem('user')) {
            var user = JSON.parse(localStorage.getItem('user'))
            console.log(localStorage.getItem('user'))
            api.get("/user/" + user.value.id)
                .then(res => {
                    setName(res.data.firstName)
                    setEmail(res.data.email)
                    setPhoneNumber(res.data.telephone.number)
                    setValue('nome', res.data.firstName)
                    setValue('email', res.data.email)
                    if (res.data.telephone.number.charAt(2) == 9) {
                        var number = res.data.telephone.number.toString()

                        const parte1 = number.charAt(0) + number.charAt(1)
                        const parte2 = number.slice(2, 7)
                        const parte3 = number.slice(7, 11)

                        const numeroAjustado = "(" + parte1 + ") " + parte2 + "-" + parte3

                        setValue('telefone', numeroAjustado, { shouldValidate: true })
                    } else {
                        var number = res.data.telephone.number.toString()

                        const parte1 = number.charAt(0) + number.charAt(1)
                        const parte2 = number.slice(2, 6)
                        const parte3 = number.slice(6, 10)

                        const numeroAjustado = "(" + parte1 + ") " + parte2 + "-" + parte3

                        setValue('telefone', numeroAjustado, { shouldValidate: true })
                    }
                })
        }
    }

    // const [isValid, setValid] = useState({
    //     email: true
    // }) 

    function ValidarTel(e) {
        var tel = e.target.value
        tel = tel.toString().replace(/[^0-9]/g, ""); // transforma o valor digitado para apenas numeros
        setPhoneNumber(tel)
        clearErrors(["telefone"])
        return phoneNumber
    }

    function LimparNome(e) {
        setName(e.target.value)
        clearErrors(["nome"])
    }

    function LimparEmail(e) {
        setEmail(e.target.value)
        clearErrors(["email"])
        return email
    }

    // imagem de loading
    function renderLoading() {
        return <img className="img-loading-btn" src={Loading} alt="Gerando pedido" />
    }

    // desabilita botão apos o click
    const [disable, setDisable] = React.useState(false);

    // limitar caracteres
    const [count, setCount] = useState(0);

    return <>
        <FormDefault title="Contato" className="custom-form-box mx-3 mx-sm-1 mx-lg-4 px-5 px-sm-1 px-lg-4" >
            <div className="row forms-block justify-content-center">
                <div className="row custom-form justify-content-center">
                    <div className="col-12 col-md-6">

                        <InputHook hook
                            name="nome"
                            register={register}
                            required={<span className="text-danger">Digite um nome válido e sem números!</span>}
                            maxlength={50}
                            pattern={/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u}
                            errors={errors}
                            clear={clearErrors}
                            label="Nome"
                            value={name}
                            type="text"
                            className="form-input col-12"
                            placeholder="Digite seu nome..."
                            change={LimparNome} />
                    </div>

                    <div className="col-12 col-md-5">
                        <SelectOptions label="Assunto:" options={props.options} change={e => setSubject(e.target.value)} />
                    </div>

                </div>

                <div className="row custom-form justify-content-center">
                    <div className="col-12 col-sm-6 col-md-6">

                        <InputHook hook
                            name="email"
                            register={register}
                            required={<span className="text-danger">Digite o email corretamente!</span>}
                            maxlength={255}
                            pattern={/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/}
                            errors={errors}
                            label="E-mail"
                            type="email"
                            id="email"
                            value={email}
                            errors={errors}
                            className="form-input col-12"
                            placeholder="Digite seu e-mail..."
                            change={LimparEmail} />
                    </div>

                    <div className="col-12 col-sm-6 col-md-5">
                        <InputHook
                            name="telefone"
                            register={register}
                            maxlength={15}
                            minlength={11}
                            required={<span className="text-danger">Digite o campo com DDD e telefone!</span>}
                            pattern={/\([1-9]\d\)\s9?\d{4}-\d{4}/}
                            errors={errors}
                            mask={phoneNumber.charAt(2) == 9 ? "(99) 99999-9999" : "(99) 9999-9999"}
                            value={phoneNumber}
                            change={ValidarTel}
                            label="Telefone"
                            type="text"
                            id="telefone"
                            className="form-input col-12"
                            placeholder="(00) 00000-0000" />
                    </div>

                </div>

                <div className="row justify-content-center">
                    <div className="col-12 col-md-11">
                        <label htmlFor="textarea" className="form-label col-12">Deixe sua mensagem:</label>
                        <textarea required className="textarea col-12" id="textarea" rows="5"
                            placeholder=" Escreva sua mensagem..." maxlength="300" onKeyDown={e => setContent(e.target.value)} onChange={e => setCount(e.target.value.length)}></textarea>
                        <small className="counter">{count}/300</small>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center pt-3">
                <Button label="Voltar" onclick={history.goBack} class="btn-retorno mx-5 my-1" />
                <Button onclick={handleSubmit(postContact)} disabled={disable} label={disable ? renderLoading() : "Enviar"} class="btn-confirmacao mx-5 my-1" />

            </div>

            <div className="row justify-content-around">

                <ModalComp show={show}
                    msg={<p className="modal-text">Sua mensagem foi enviada.</p>}
                    info={<p className="modal-text">Responderemos o mais breve possível. O prazo máximo é de 24h para o retorno de nossa equipe.</p>}
                    info1={<p className="modal-text">Confira seu e-mail e cheque sua caixa de spam.</p>}
                    info2={<p className="modal-text">Obrigado!</p>}>
                </ModalComp>

            </div>

        </FormDefault>
    </>
}
export default FormContact