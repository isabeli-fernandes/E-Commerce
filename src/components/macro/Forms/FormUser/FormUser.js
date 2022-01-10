import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import FormDefault from '../FormDefault/FormDefault';
import Input from "../../../micro/Forms/Input/Input";
import Button from "../../../micro/Button/Button"
import api from '../../../../services/api';
import InputHook from "../../../micro/Forms/Input/InputHook"
import InputUserData from "../../../micro/Forms/Input/InputUserData"
import { useForm } from "react-hook-form"; // lembrar de fazer npm install para instalar a biblioteca react-hook-form
import { ErrorMessage } from "@hookform/error-message"; // lembrar de fazer npm install para instalar a biblioteca error-message

function FormUser(props) {
    let bool = true

    // desfragmentando as funcoes e objetos da biblioteca
    const { register, handleSubmit, watch, formState: { errors }, reset, clearErrors, setError, setValue } = useForm();

    const [show, setShow] = useState(bool);

    const user = JSON.parse(localStorage.getItem("user"));

    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [tel, setTel] = useState("")
    const [cpf, setCpf] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {

        getUser();

    }, []);

    const getUser = () => {
        api.get(`/user/${user.value.id}`).then(
            res => {
                setName(res.data.firstName);
                setLastname(res.data.lastName);
                setTel(res.data.telephone.number);
                setCpf(res.data.cpf);
                setEmail(res.data.email);
                setValue('nome', res.data.firstName, { shouldValidate: true })
                setValue('sobrenome', res.data.lastName, { shouldValidate: true })
                if (res.data.telephone.number.charAt(2) == 9) {
                    var number = res.data.telephone.number.toString()

                    const parte1 = number.charAt(0) + number.charAt(1)
                    const parte2 = number.slice(2,7)
                    const parte3 = number.slice(7,11)

                    const numeroAjustado = "(" + parte1 + ") " + parte2 + "-" + parte3

                    setValue('telefone', numeroAjustado, { shouldValidate: true })
                } else {
                    var number = res.data.telephone.number.toString()
                    
                    const parte1 = number.charAt(0) + number.charAt(1)
                    const parte2 = number.slice(2,6)
                    const parte3 = number.slice(6,10)

                    const numeroAjustado = "(" + parte1 + ") " + parte2 + "-" + parte3

                    setValue('telefone', numeroAjustado, { shouldValidate: true })
                }
                
            });
    }

    const updateApi = async data => {

        const dados = ({
            id: user.value.id,
            firstName: name,
            lastName: lastname,
            telephone: {
                number: tel.toString().replace(/[^0-9]/g, "")
            }
        })

        api.put("/user", dados)
            .then(res => {
                alert("Seus dados foram alterados com sucesso!")
                getUser()
                disableForm()
            })
            .catch(err => {
                console.error("Erro ao atualizar dados" + err)
                alert("Erro ao atualizar dados!")
            })
    }

    function disableForm() {
        bool = true
        setShow(bool)
        changeButton(bool)
    }

    function ableForm() {
        bool = false
        setShow(bool);
        changeButton(bool)
    }

    const changeButton = (change) => {
        if (change) {
            setB({
                alterar: "",
                salvar: "d-none"
            })
        } else {
            setB({
                alterar: "d-none",
                salvar: ""
            })
        }
    }

    const [stateB, setB] = useState({
        alterar: "",
        salvar: "d-none"
    })

    // limpam o vaor do input ao alterar o campo quando o mesmo tem erro
    function LimparNome(e) {
        var newName = e.target.value
        setName(newName)
        clearErrors(["nome"])
    }
    function LimparSobrenome(e) {
        var newLastname = e.target.value
        setLastname(newLastname)
        clearErrors(["sobrenome"])
    }
    function ValidarTel(e) {
        var tel = e.target.value;
        tel = tel.toString().replace(/[^0-9]/g, ""); // transforma o valor digitado para apenas numeros
        setTel(tel)
        clearErrors(["telefone"])
        return tel
    }

    const [isValid, setValid] = useState({
        cpf: true,
        email: true,
        cpfCheck: true
    })

    return (
        <>
            <FormDefault title="Meus Dados">

                <div className="row forms-block">

                    <div className="row custom-form d-flex justify-content-center">
                        <div className=" col-12 col-md-5">
                        <InputUserData hook // hook eh a props para input padrao com a verificacao
                            name="nome" // name sera utilizado no componente para fazer as comparacoes
                            register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                            required={<span className="text-danger">Digite um nome válido e sem números!</span>} // mensagem de erro que sera exibida caso o campo nao seja valido
                            maxlength={50} // tamanho maximo do campo
                            pattern={/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u}
                            errors={errors}
                            clear={clearErrors}
                            change={LimparNome}
                            disabled={show}
                            value={name}
                            label="Nome"
                            type="text"
                            className="form-input col-12"
                            placeholder="Ex.: Francisca" />
                            {/* <Input change={handleName} value={name} disabled={show} label="Nome" type="text" id="nome" className="form-input col-12" placeholder="Nome" /> */}
                        </div>

                        <div className="col-12 col-md-6">
                        <InputUserData hook // hook eh a props para input padrao com a verificacao
                            name="sobrenome" // name sera utilizado no componente para fazer as comparacoes
                            register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                            required={<span className="text-danger">Digite um sobrenome válido e sem números!</span>} // mensagem de erro que sera exibida caso o campo nao seja valido
                            maxlength={150} // tamanho maximo do campo
                            pattern={/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u}
                            errors={errors}
                            change={LimparSobrenome}
                            disabled={show}
                            value={lastname}
                            label="Sobrenome"
                            type="text"
                            className="form-input col-12"
                            placeholder="Ex.: dos Santos" />
                            {/* <Input change={handleLastname} value={lastname} disabled={show} label="Sobrenome" type="text" id="sobrenome" className="form-input col-12"
                                placeholder="Sobrenome" /> */}
                        </div>
                    </div>

                    <div className="row custom-form d-flex justify-content-center">
                        <div className="col-12 col-md-3">
                        <InputUserData // hook eh a props para input padrao com a verificacao
                            name="cpf" // name sera utilizado no componente para fazer as comparacoes
                            register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                            required={user.cpf == "" ? <span className="text-danger">Digite um CPF válido!</span> : ""} // mensagem de erro que sera exibida caso o campo nao seja valido
                            maxlength={14} // tamanho maximo do campo
                            minlength={11} // tamanho minimo do campo
                            pattern={/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/u}
                            errors={errors}
                            mask="999.999.999-99" // mascara que sera aplicada
                            disabled={true}
                            value={cpf}
                            label="CPF"
                            type="text"
                            className="form-input col-12"
                            placeholder="000.000.000-00" />
                        {isValid.cpf ? "" : <span className="text-danger">Digite um CPF válido! </span>}
                        {isValid.cpfCheck ? "" : <span className="text-danger">CPF já cadastrado!</span>}
                            {/* <Input change value={cpf} disabled={true} label="CPF" type="text" id="cpf" className="form-input col-12"
                                placeholder="CPF" /> */}
                        </div>

                        <div className="col-12 col-md-4">
                            <Input change value={email} disabled={true} label="E-mail" type="email" id="email" className="form-input col-12"
                                placeholder="e-mail" />
                        </div>

                        <div className="col-12 col-md-4">
                        <InputUserData // hook eh a props para input padrao com a verificacao
                            name="telefone" // name sera utilizado no componente para fazer as comparacoes
                            register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                            required={<span className="text-danger">Digite o campo com DDD e telefone!</span>} // mensagem de erro que sera exibida caso o campo nao seja valido
                            maxlength={15} // tamanho maximo do campo
                            minlength={11} // tamanho minimo do campo
                            pattern={/\([1-9]\d\)\s9?\d{4}-\d{4}/}
                            errors={errors}
                            mask={tel.charAt(2) == 9 ? "(99) 99999-9999" : "(99) 9999-9999"} // mascara que sera aplicada
                            change={ValidarTel}
                            disabled={show}
                            value={tel}
                            label="Telefone"
                            type="text"
                            id="telefone"
                            className="form-input col-12"
                            placeholder="(00) 00000-0000" />
                            {/* <Input change={handleTel} value={tel} disabled={show} label="Telefone" type="text" id="telefone" className="form-input col-12"
                                placeholder="Telefone" /> */}
                        </div>

                    </div>
                </div>
                <div className="row justify-content-center">
                    <Button onclick={ableForm} label="Alterar" class={`btn-confirmacao ${stateB.alterar}`} />
                    <Button onclick={handleSubmit(updateApi)} label="Salvar" class={`btn-confirmacao ${stateB.salvar}`} />
                </div>


            </FormDefault>

        </>
    )
}

export default FormUser