import React, { useState, useEffect } from "react"
import Input from "../../../micro/Forms/Input/Input"
import Button from "../../../micro/Button/Button"
import FormDefault from "../FormDefault/FormDefault"
import { useHistory, useParams } from 'react-router';
import api from "../../../../services/api";
import Loading from "../../../../assets/images/success/loading.gif"
import InputHook from "../../../micro/Forms/Input/InputHook";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

function NewPasswordForm(props) {

    const history = useHistory()
    const [passwordConfirm, setConfirm] = useState("")
    const { token } = useParams()
    const url = `/newpassword/${token}`
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

    // desabilita botão apos o click
    const [disable, setDisable] = React.useState(false);

    // imagem de loading
    function renderLoading() {
        return <img className="img-loading-btn" src={Loading} alt="Enviando requisição" />
    }

    useEffect(() => {
    }, [])

    function LimparSenha(e) {
        clearErrors(["senha"])
    }

    function LimparConfirmacao(e) {
        return
    }

    // redefine senha
    const redefinition = async data => {
        setDisable(true)
        postNewPassword(data)
    }

    function postNewPassword(newPassword) {
        const newPasswordInfo = {
            password: newPassword.senha,
        }
        api.post(url, newPasswordInfo)
            .then((response) => {
                alert("Senha redefinida com sucesso!")
                window.location.href = "/login";
            })
            .catch((err) => {
                console.error("Erro erro ao relizar definição de senha" + err)
                alert("Não foi possível redefinir a senha.")
                setDisable(false)
            });
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
    }, []);

    return (
        <>
            <main class="container-fluid custom-container py-2 pb-5">

                <FormDefault title="Redefinir Senha" action="" class="custom-form-box mx-3 mx-sm-1 mx-lg-4 px-5 px-sm-1 px-lg-4">

                    <div className="container custom-form-div py-2">

                        <div className="row custom-form d-flex justify-content-center">
                            <p className="text-center recuperar-senha-text">A senha deve conter no mínimo 8 caracteres, uma letra e um número</p>

                            <div className="col-10 col-sm-8 col-md-7 col-lg-5">
                                <InputHook hook
                                    name="senha"
                                    register={register}
                                    required={<><span className="text-danger">Senha inválida</span><br /></>}
                                    pattern={/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/}
                                    errors={errors}
                                    type="password"
                                    change={LimparSenha}
                                    label="Senha"
                                    type="password"
                                    id="senha"
                                    className="form-input col-12 form-control"
                                    placeholder="Defina uma senha" />
                            </div>
                        </div>

                        <div className="row custom-form d-flex justify-content-center">
                            <div className="col-10 col-sm-8 col-md-7 col-lg-5 pb-2">
                                <InputHook confirm
                                    name="confirmarSenha"
                                    register={register}
                                    watch={watch}
                                    blur={LimparConfirmacao}
                                    label="Confirmar Senha"
                                    type="password"
                                    id="confirmarSenha"
                                    className="form-input col-12 form-control"
                                    placeholder="Confirme a senha" />

                                <ErrorMessage errors={errors} name="confirmarSenha" />
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            
                            <Button onclick={handleSubmit(redefinition)} disabled={disable} label={disable ? renderLoading() : "Redefinir"} class="btn-confirmacao mx-5 my-1" />

                        </div>
                    </div>

                </FormDefault>

            </main>

        </>
    )
}

export default NewPasswordForm


