import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from "../../../micro/Forms/Input/Input"
import Button from "../../../micro/Button/Button"
import { useHistory } from "react-router"
import api from "../../../../services/api"
import InputHook from "../../../micro/Forms/Input/InputHook"
import { useForm } from "react-hook-form"; // lembrar de fazer npm install para instalar a biblioteca react-hook-form
import { ErrorMessage } from "@hookform/error-message"; // lembrar de fazer npm install para instalar a biblioteca error-message
import InputCep from "../../../micro/Forms/Input/InputCep"
import Select from "../../../micro/Forms/Select/Select"
import Loading from "../../../../assets/images/success/loading.gif"

const initial = {
    firstName: "",
    lastName: "",
    cpf: "",
    email: "",
    telephone: {

        number: ""
    },
    born: "",
    password: ""
}
const initialAddress = {
    id: 0,
    cep: "",
    street: "",
    number: "",
    complement: "",
    district: "",
    reference: "",
    city: "",
    state: ""
}

function FormRegister(props) {
    // Endereços
    const [address, setAddress] = useState({ ...initialAddress });
    const [ufs, setUfs] = useState([
        { id: 1, subjectDescription: "AC" }, { id: 2, subjectDescription: "AL" }, { id: 3, subjectDescription: "AP" },
        { id: 4, subjectDescription: "AM" }, { id: 5, subjectDescription: "BA" }, { id: 6, subjectDescription: "CE" },
        { id: 7, subjectDescription: "DF" }, { id: 8, subjectDescription: "ES" }, { id: 9, subjectDescription: "GO" },
        { id: 10, subjectDescription: "MA" }, { id: 11, subjectDescription: "MS" }, { id: 12, subjectDescription: "MT" },
        { id: 13, subjectDescription: "MG" }, { id: 14, subjectDescription: "PA" }, { id: 15, subjectDescription: "PB" },
        { id: 16, subjectDescription: "PR" }, { id: 17, subjectDescription: "PE" }, { id: 18, subjectDescription: "PI" },
        { id: 19, subjectDescription: "RJ" }, { id: 20, subjectDescription: "RN" }, { id: 21, subjectDescription: "RS" },
        { id: 22, subjectDescription: "RO" }, { id: 23, subjectDescription: "RR" }, { id: 24, subjectDescription: "SC" },
        { id: 25, subjectDescription: "SP" }, { id: 26, subjectDescription: "SE" }, { id: 27, subjectDescription: "TO" }
    ]);

    function renderLoading() {
        return <img className="img-loading-btn" src={Loading} alt="Gerando pedido" />
    }

    const getUfs = () => {
        return ufs
    }

    useEffect(() => {
        getUfs();
    }, []);

    useEffect(() => { })


    /////////////////// INICIO FUNCOES DE BUSCA E VALIDACAO DE CEP /////////////////////

    function limpa_formulário_cep() {
        //Limpa valores do formulário de cep.
        setAddress({ ...address, street: "", district: "", city: "", state: "", number: "", complement: "", reference: "" });
    }

    function meu_callback(conteudo) {
        if (!("erro" in conteudo)) {
            //Atualiza os campos com os valores.
            setAddress({ ...address, street: conteudo.logradouro, district: conteudo.bairro, city: conteudo.localidade, state: conteudo.uf })
            clearErrors(["rua"])
            clearErrors(["bairro"])
            clearErrors(["cidade"])
            setValue("rua", conteudo.logradouro)
            setValue("bairro", conteudo.bairro)
            setValue("cidade", conteudo.localidade)
            clearErrors(["rua"])
        } //end if.
        else {
            //CEP não Encontrado.
            limpa_formulário_cep();
            alert("CEP não encontrado.");
        }
    }

    /////////////////////////// FUNCAO DE VALIDAR CEP //////////////////////////

    function pesquisacep(e) {

        clearErrors(["cep"])

        const valor = e

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
                setAddress({ ...address, street: "...", district: "...", city: "...", state: "...", number: "", complement: "", reference: "" });

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
    /////////////////// FIM FUNCOES DE BUSCA E VALIDACAO DE CEP /////////////////////


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

    const [user, setUser] = useState(initial)
    const [passwordConfirm, setConfirm] = useState("")
    useEffect(() => {
    }, [])
    const history = useHistory()
    function goBackTo() {
        history.goBack()

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

    // buscar email na base para saber se já foi cadastrado
    const checkMail = (email) => {
        api.get('/user/checkEmail/' + email).then((response) => {
            if (response.data) {
                setValid({ ...isValid, email: false })
                return true
            } else {
                setValid({ ...isValid, email: true })
                return false
            }
        }).catch((error) => {
            console.log("Erro ao buscar" + error)
            setValid({ ...isValid, email: true })
        })
    }

    // buscar cpf na base para saber se já foi cadastrado
    const checkCPF = (cpf) => {
        api.get('/user/cpf/' + cpf).then((response) => {
            if (response.data) {
                setValid({ ...isValid, cpf: true, cpfCheck: false })
                return true
            }
        }).catch((error) => {
            console.log("Erro ao buscar"+ error)
            return false
            // setValid({ ...isValid, cpfCheck: true })
        })
    }
    // desabilita botão cadastrar após o click
    const [disable, setDisable] = React.useState(false);
    //retorna dataFormatada

    
    // funcao async executada recebendo o parametro data do register do react-hook-form
    const registration = async data => {

        setDisable(true)

        if (isValid.cpf == false) {
            setDisable(false)
            return window.alert("CPF inválido!")
        } else if (checkMail(data.email)) {
            setDisable(false)
            return window.alert("E-mail já cadastrado!")
        } else if (checkCPF(user.cpf.toString().replace(/[^0-9]/g, ""))) {
            setDisable(false)
            return window.alert("CPF já cadastrado!")
        }
        // objeto newUser recebendo os valores de register 
        // (register guarda os valores dos inputs atraves do props name)
        const newUser = ({
            firstName: data.nome,
            lastName: data.sobrenome,
            cpf: user.cpf.toString().replace(/[^0-9]/g, ""), // formatando para apenas numeros
            email: data.email,
            telephone: {

                number: data.telefone.toString().replace(/[^0-9]/g, "") // formatando para apenas numeros
            },
            born: data.data,
            password: data.senha
        })

        //verificação da data de nascimento
        var dataCurrente = new Date();
        var dateCurrent = (dataCurrente.getFullYear()-16)+"-"+dataCurrente.getMonth()+"-"+dataCurrente.getDate()

        if(dateCurrent>newUser.born) {
           
                api.post('/sign-up', newUser).then((response) => {
                window.alert("Cadastrado com successo!")
                sendAddress(response.data.id)
                goBackTo()
            }).catch((error) => {
                window.alert("Erro ao cadastrar")
                setDisable(false)
            })
        }else{
            setDisable(false)
            var formatedDateError =  newUser.born
            var formatedDateError = new Date(formatedDateError)
            window.alert("Erro ao cadastrar! Data de nascimento invalida: " +formatedDateError.toLocaleDateString('pt-BR', {timeZone: 'UTC'})+ "\n Certifique-se de ter mais de 16 anos ao efetuar o cadastro")
        }
            
         

      

       
    }
    

    function sendAddress(userId) {
        api.post("/address", address)
            .then((response) => {
                idAddreess(userId, response.data.id)
            })
            .catch((err) => {
                console.error("Erro ao criar endereço" + err)
            })
    }

    function idAddreess(userId, addressId) {
        const userAddress = {
            id: {
                idUser: userId,
                idAddress: addressId

            },
            description: "",
            address: {
                id: addressId
            }
        }
        api.post("/userAddress", userAddress)
            .then((response) => {
            })
            .catch((err) => {
                console.error("Erro criar endereço" + err)
            })
    }


    const [isValid, setValid] = useState({
        cpf: true,
        email: true,
        cpfCheck: true
    })

    /////////// INICIO DA FUNCAO DE VALIDACAO DE CPF /////////////

    // @see https://incom.in.gov.br/js/util.js
    function checarCPF(cpf) {
        setValid({ ...isValid, cpfCheck: true, cpf: true })
        cpf = cpf.toString().replace(/[^0-9]/g, ""); // transforma os valores digitados para apenas numeros

        let booleano = true
        if (cpf == "") {
            setUser({ ...user, cpf: "" })
        }
        if (cpf.length !== 11 || ['00000000000', '11111111111', '22222222222',
            '33333333333', '44444444444', '55555555555', '66666666666',
            '77777777777', '88888888888', '99999999999'].includes(cpf)) {
            setUser({ ...user, cpf: "" })
            if (cpf != "") {
                setValid({ ...isValid, cpfCheck: true, cpf: false })
            }
            setError("cpf", {
                type: "focus",
                message: "",
            })
            return false;
        }
        var soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        var resto = 11 - (soma % 11);
        if (resto == 10 || resto == 11) {
            resto = 0;
        }
        if (resto != parseInt(cpf.charAt(9))) {
            clearErrors(["cpf"]) // limpa o erro ao clicar no campo CPF quando este exibe erro
            setUser({ ...user, cpf: "" })
            if (cpf != "") {
                setValid({ ...isValid, cpfCheck: true, cpf: false })
            }
            return false;
        }
        var soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        var resto = 11 - (soma % 11);
        if (resto == 10 || resto == 11) {
            resto = 0;
        }
        if (resto != parseInt(cpf.charAt(10))) {
            clearErrors(["cpf"]) // limpa o erro ao clicar no campo CPF quando este exibe erro
            setUser({ ...user, cpf: "" })
            if (cpf != "") {
                setValid({ ...isValid, cpfCheck: true, cpf: false })
            }
            return false;
        }
        setValid({ ...isValid, cpf: true })
        setUser({ ...user, cpf: cpf })
        clearErrors(["cpf"]) // limpa o erro ao clicar no campo CPF quando este exibe erro
        return true;
    }

    function ValidarTel(e) {
        var tel = e.target.value;
        tel = tel.toString().replace(/[^0-9]/g, ""); // transforma o valor digitado para apenas numeros
        setUser({ ...user, telephone: { ...user.telephone, number: tel } })
        clearErrors(["telefone"])
        return tel
    }

    // limpam o vaor do input ao alterar o campo quando o mesmo tem erro
    function LimparCPF(e) {
        clearErrors(["cpf"])
        setValid({...isValid, cpfCheck: true})
    }
    function LimparNome(e) {
        clearErrors(["nome"])
    }
    function LimparSobrenome(e) {
        clearErrors(["sobrenome"])
    }
    function LimparData(e) {
        clearErrors(["data"])
    }
    function LimparEmail(e) {
        setValid({ ...isValid, email: true })
        var email = e.target.value
        setUser({ ...user, email: email })
        clearErrors(["email"])
        return email
    }
    function LimparSenha(e) {
        clearErrors(["senha"])
    }
    function LimparConfirmacao(e) {
        return
    }
    function LimparRua(e) {
        clearErrors(["rua"])
        setAddress({ ...address, street: e.target.value })
    }
    function LimparNumero(e) {
        clearErrors(["numero"])
        setAddress({ ...address, number: e.target.value })
        setValue("numero", e.target.value)
    }
    function LimparBairro(e) {
        clearErrors(["bairro"])
        setAddress({ ...address, district: e.target.value })
        
    }
    function LimparCidade(e) {
        clearErrors(["cidade"])
        setAddress({ ...address, city: e.target.value })
    }

    const [cep, setCep] = useState()

    function setInputCep(e) {
        clearErrors(["cep"])
        const valor = e.target.value

        //Nova variável "cep" somente com dígitos.
        const cep = valor.replace(/\D/g, '');

        setAddress({ ...address, cep: cep})
    }


    return (
        <>
            <div className="row justify-content-center">
                <div className="row custom-form d-flex justify-content-center">
                    <div className="nome col-12 col-md-4">


                        <InputHook hook // hook eh a props para input padrao com a verificacao
                            name="nome" // name sera utilizado no componente para fazer as comparacoes
                            register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                            required={<span className="text-danger">Digite um nome válido e sem números!</span>} // mensagem de erro que sera exibida caso o campo nao seja valido
                            maxlength={50} // tamanho maximo do campo
                            pattern={/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u}
                            errors={errors}
                            clear={clearErrors}
                            change={LimparNome}
                            label="Nome"
                            type="text"
                            className="form-input col-12"
                            placeholder="Ex.: Francisca" />

                    </div>
                    <div className="sobrenome col-12 col-md-4 col-xl-5">
                        <InputHook hook // hook eh a props para input padrao com a verificacao
                            name="sobrenome" // name sera utilizado no componente para fazer as comparacoes
                            register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                            required={<span className="text-danger">Digite um sobrenome válido e sem números!</span>} // mensagem de erro que sera exibida caso o campo nao seja valido
                            maxlength={150} // tamanho maximo do campo
                            pattern={/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u}
                            errors={errors}
                            change={LimparSobrenome}
                            label="Sobrenome"
                            type="text"
                            className="form-input col-12"
                            placeholder="Ex.: dos Santos" />
                    </div>
                    <div className="nascimento col-12 col-md-3 col-xl-2">
                        <InputHook hook // hook eh a props para input padrao com a verificacao
                            name="data" // name sera utilizado no componente para fazer as comparacoes
                            register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                            required={<span className="text-danger">Digite uma data válida!</span>} // mensagem de erro que sera exibida caso o campo nao seja valido
                            pattern={/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/}
                            errors={errors}
                            change={LimparData}
                            label="Data de Nascimento"
                            type="date"
                            className="form-input col-12" />

                    </div>
                </div>

                <div className="row custom-form d-flex justify-content-center">

                    <div className="cpf col-12 col-sm-6 col-md-3">
                        <InputHook // hook eh a props para input padrao com a verificacao
                            name="cpf" // name sera utilizado no componente para fazer as comparacoes
                            register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                            message={<span className="text-danger">Digite um CPF válido!</span>} // mensagem de erro que sera exibida caso o campo nao seja valido
                            required={<span className="text-danger">Digite um CPF válido!</span>}
                            maxlength={14} // tamanho maximo do campo
                            minlength={11} // tamanho minimo do campo
                            pattern={/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/u}
                            errors={errors}
                            change={LimparCPF}
                            validation={checarCPF} // funcao que ira ser utilizada como validador do campo
                            mask="999.999.999-99" // mascara que sera aplicada
                            value={user.cpf}
                            label="CPF"
                            type="text"
                            className="form-input col-12"
                            placeholder="000.000.000-00" />

                    </div>

                    <div className="telefone col-12 col-sm-6 col-md-3">
                        <InputHook // hook eh a props para input padrao com a verificacao
                            name="telefone" // name sera utilizado no componente para fazer as comparacoes
                            register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                            required={<span className="text-danger">Digite o campo com DDD e telefone!</span>} // mensagem de erro que sera exibida caso o campo nao seja valido
                            maxlength={15} // tamanho maximo do campo
                            minlength={11} // tamanho minimo do campo
                            pattern={/\([1-9]\d\)\s9?\d{4}-\d{4}/}
                            errors={errors}
                            mask={user.telephone.number.charAt(2) == 9 ? "(99) 99999-9999" : "(99) 9999-9999"} // mascara que sera aplicada
                            value={user.telephone.number}
                            change={ValidarTel}
                            label="Telefone"
                            type="text"
                            id="telefone"
                            className="form-input col-12"
                            placeholder="(00) 00000-0000" />
                    </div>

                    <div className="email col-12 col-md-5">
                        <InputHook hook // hook eh a props para input padrao com a verificacao
                            name="email" // name sera utilizado no componente para fazer as comparacoes
                            register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                            required={<span className="text-danger">Digite o email corretamente!</span>} // mensagem de erro que sera exibida caso o campo nao seja valido
                            maxlength={255} // tamanho maximo do campo
                            pattern={/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/}
                            errors={errors}
                            change={LimparEmail}
                            label="E-mail"
                            type="email"
                            id="email"
                            className="form-input col-12"
                            placeholder="exemplo@exemplo.com" />
                        {isValid.email ? "" : <span className="text-danger">E-mail já cadastrado!</span>}
                    </div>

                </div>


                <div className="row custom-form d-flex justify-content-center">
                    <div className=" col-12 col-md-3">
                        {/* INPUT PARA BUSCA DE CEP AO CLICAR FORA DO FORMULARIO. 
                        LENGTH == LIMITE DE CARACTERES NO INPUT 
                        (POR ENQUANTO 9 PENSANDO NA MÁSCARA QUE INSERE "-") */}
                        <InputCep
                            name="cep" pattern={/^\d{5}-\d{3}$/}
                            mask={[/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                            required={<span className="text-danger">Campo inválido!</span>}
                            blur={pesquisacep}
                            label="CEP" type="text" id="cep" className="form-input col-12"
                            placeholder="00000-000" validation={pesquisacep}
                            change={setInputCep} register={register} errors={errors} />
                    </div>

                    <div className=" col-12 col-md-6">
                        <InputHook hook // hook eh a props para input padrao com a verificacao
                            name="rua" // name sera utilizado no componente para fazer as comparacoes
                            register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                            required={<span className="text-danger">Campo inválido!</span>} // mensagem de erro que sera exibida caso o campo nao seja valido
                            errors={errors}
                            change={LimparRua}
                            label="Logradouro"
                            type="text"
                            placeholder="Digite o logradouro..."
                            value={address.street}
                        />
                        {/* <Input value={address.street} label="Número" type="text" id="rua" className="form-input col-12" placeholder="Digite o número..." change={e => setAddress({ ...address, street: e.target.value })} /> */}

                    </div>

                    <div className=" col-12 col-md-2">
                        <InputHook hook // hook eh a props para input padrao com a verificacao
                            name="numero" // name sera utilizado no componente para fazer as comparacoes
                            register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                            required={<span className="text-danger">Campo inválido!</span>} // mensagem de erro que sera exibida caso o campo nao seja valido
                            errors={errors}
                            change={LimparNumero}
                            label="Número"
                            type="text"
                            placeholder="Digite o número..."
                        />
                        {/* <Input value={address.number} label="Número" type="text" id="rua" className="form-input col-12" placeholder="Digite o número..." change={e => setAddress({ ...address, number: e.target.value })} /> */}
                    </div>

                </div>

                <div className="row custom-form d-flex justify-content-center">

                    <div className="col-12 col-md-5">
                        <Input value={address.complement} label="Complemento" type="text" id="complemento" className="form-input col-12" placeholder="Digite o complemento..." change={e => setAddress({ ...address, complement: e.target.value })} />
                    </div>
                    <div className="col-12 col-md-6">
                        <InputHook hook // hook eh a props para input padrao com a verificacao
                            name="bairro" // name sera utilizado no componente para fazer as comparacoes
                            register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                            required={<span className="text-danger">Campo inválido!</span>} // mensagem de erro que sera exibida caso o campo nao seja valido
                            errors={errors}
                            change={LimparBairro}
                            label="Bairro"
                            type="text"
                            placeholder="Digite seu bairro..."
                            value={address.district}
                        />
                        {/* <Input value={address.district} label="Bairro" type="text" id="bairro" className="form-input col-12" placeholder="Digite seu bairro..." change={e => setAddress({ ...address, district: e.target.value })} /> */}
                    </div>

                </div>

                <div className="row custom-form d-flex justify-content-center">
                    <div className="col-12 col-md-4">
                        <Input value={address.reference} label="Ponto de referência" type="text" id="ponto-referencia" className="form-input col-12" placeholder="Digite um ponto de referência..." change={e => setAddress({ ...address, reference: e.target.value })} />
                    </div>
                    <div className="col-12 col-md-5">
                        <InputHook hook // hook eh a props para input padrao com a verificacao
                            name="cidade" // name sera utilizado no componente para fazer as comparacoes
                            register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                            required={<span className="text-danger">Campo inválido!</span>} // mensagem de erro que sera exibida caso o campo nao seja valido
                            errors={errors}
                            minlength={1}
                            change={LimparCidade}
                            label="Cidade"
                            type="text"
                            placeholder="Digite sua cidade..."
                            value={address.city}
                        />
                        {/* <Input value={address.city} label="Cidade" type="text" id="cidade" className="form-input col-12" placeholder="Digite sua cidade..." change={e => setAddress({ ...address, city: e.target.value })} /> */}
                    </div>

                    <div className="col-12 col-md-2">
                        <Select label="Estado:" options={ufs} selected={address.state} change={e => setAddress({ ...address, state: e.target.value })} default="Estado" />
                    </div>

                </div>
                <div className="row custom-form d-flex justify-content-around">

                    <div className="senha col-12 col-sm-6 col-md-5">

                        {/* componente 'InputPassword' criado por haver uma particularidade nesse input especifico */}

                        <InputHook hook // hook eh a props para input padrao com a verificacao
                            name="senha" // name sera utilizado no componente para fazer as comparacoes
                            register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                            required={<><span className="text-danger">Senha inválida</span><br /></>} // mensagem de erro que sera exibida caso o campo nao seja valido
                            pattern={/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/} // senha deve ter min 8 caracteres, min uma letra e min um numero
                            errors={errors} // passa o objeto errors para o componente para ser utilizado pelo componente ErrorMessage
                            type="password"
                            change={LimparSenha}
                            label="Senha"
                            type="password"
                            id="senha"
                            className="form-input col-12 form-control"
                            placeholder="Defina uma senha" />
                        <small>A senha deve conter no mínimo 8 caracteres, uma letra e um número</small>
                    </div>


                    <div className="confirmarSenha col-12 col-sm-6 col-md-5">
                        <InputHook confirm // confirm eh a props que indica que eh o segundo campo de senha, o campo de confirmacao
                            name="confirmarSenha"
                            register={register}
                            watch={watch} // watch ira comparar o valor digitado com o valor do primeiro input de senha
                            blur={LimparConfirmacao}
                            label="Confirmar Senha"
                            type="password"
                            id="confirmarSenha"
                            className="form-input col-12 form-control"
                            placeholder="Confirme a senha" />

                        {/* componente que exibe a mensagem de erro do componente que leva o nome indicado pela prop 'name' */}
                        <ErrorMessage errors={errors} name="confirmarSenha" />
                    </div>

                </div>
            </div>

            <div className="row justify-content-around py-4">
                <Button label="Voltar" onclick={history.goBack} class="btn-retorno" />
                {/* no onclick, eh executada a funcao 'handleSubmit' do hook-form, 
                a qual ira exibir os erros de cada campo preenchido incorretamente,
                ou ira executar a funcao callback passada para ela caso o formulario esteja corretamente preenchido */}
                <Button onclick={handleSubmit(registration)} disabled={disable} label={disable ? renderLoading() : "Cadastrar"} class="btn-confirmacao" />
            </div>
        </>
    )
}

export default FormRegister