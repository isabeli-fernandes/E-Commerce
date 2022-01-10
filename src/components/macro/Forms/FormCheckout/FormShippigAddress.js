import React, { useEffect, useState } from "react"
import Input from "../../../micro/Forms/Input/Input"
import FormDefault from "../FormDefault/FormDefault"
import Button from "../../../micro/Button/Button";
import H2 from "../../../micro/Title/H2";
import SelectCard from "../../../micro/Forms/Select/SelectCard";
import api from "../../../../services/api"
import { useHistory } from "react-router";
import SelectedFlag from "../../../micro/Forms/Select/SelectedFlag";
import InputCep from "../../../micro/Forms/Input/InputCep";
import Select from "../../../micro/Forms/Select/Select";
import { MoipValidator } from "moip-sdk-js";
import { useForm } from "react-hook-form"; // lembrar de fazer npm install para instalar a biblioteca react-hook-form
import { ErrorMessage } from "@hookform/error-message"; // lembrar de fazer npm install para instalar a biblioteca error-message
import InputHook from "../../../micro/Forms/Input/InputHook"
import { Redirect } from "react-router-dom";
import Loading from "../../../../assets/images/success/loading.gif"
import InputCard from "../../../micro/Forms/Input/InputCard";
import MoreAddresses from "../../moreAddress/MoreAddress";
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import "./FormShippingAddress.css"
import cardValidator from "card-validator";
import RadioButton from "../../../micro/Forms/Radio/RadioButton";
import UserAddress from "../../Address/UserAddress";

const initial = {

    myUser: {
        id: 0,
        email: "",
    },
    payment: {
        id: 3
    },
    address: {
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
            id: 1

        }
    },
    delivery: {
        id: 1

    },
    deliveryValue: 150,

}
const crypto = require('crypto');
const alg = 'aes-256-ctr'
const pwd = 'qwertjose'

function FormShippigAddress(props) {

    const [success, setSuccess] = useState(false)

    function criptCard(num) {

        var text = num
        var cipher = crypto.createCipher(alg, pwd)
        var crypted = cipher.update(text, 'utf8', 'hex')
        return crypted.toString()


    }




    const user = JSON.parse(localStorage.getItem('user'))

    const [order, setOrder] = useState(initial);
    const [flags, setFlag] = useState([]);
    const [inputBrand, setInputBrand] = useState("");
    const [inputMonth, setInputMonth] = useState("");
    const [inputYear, setInputYear] = useState("");
    // desfragmentando as funcoes e objetos da biblioteca react-hook-form
    const { register, handleSubmit, formState: { errors }, reset, clearErrors, setError, setValue } = useForm({
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
    const { register: register2, handleSubmit: handleSubmit2, formState: { errors: errors2 }, reset: reset2, clearErrors: clean2, setError: setErr, setValue: setValue2 } = useForm({
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


    const [userA, setUserA] = useState(<UserAddress>
        <MoreAddresses function={setOpenModal} />
    </UserAddress>);

    function getAllAddressess(addressList) {

        setUserA(<UserAddress userAddress={addressList} function={getSelectedAddress}>
            <MoreAddresses function={setOpenModal} />

        </UserAddress>);
    }

    function getSelectedAddress(selectedAddress) {
        api.get(`/address/find/${selectedAddress}`)
            .then(response => {
                setOrder({ ...order, address: { ...response.data, id: null } })
            })
            .catch((err) => {
                console.log("Erro ao consumir api de endereços selecionados" + err)
            })
    }

    const getAddress = () => {
        api.get(`/userAddress/myAddress/${user.value.id}`).then(
            res => {
                getTelephone(res.data[0].address)
                getAllAddressess(res.data)
                // CepRun(res.data[0].address.cep)
            })
            .catch((err) => {
                console.error("Erro ao consumir api de Address" + err)
            })
    }


    useEffect(() => {
        window.scrollTo(0, 0);
        getAddress();
        getUfs();
    }, []);

    const getTelephone = (addressRes) => {
        api.get(`/user/${user.value.id}`).then(
            res => {
                var cepTemp = addressRes.cep.substring(0, 5) + "-" + addressRes.cep.substring(5);
                setOrder({ ...order, myUser: { email: res.data.email, id: res.data.id }, telephone: { ...res.data.telephone }, address: { ...addressRes, cep: cepTemp } })
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
                // setValue('telefone', res.data.telephone.number)
                setValue('cep', cepTemp)
                setValue("E-mail", res.data.email)
                setValue('numero', addressRes.number)


            })
            .catch((err) => {
                console.error("Erro ao consumir api de telefone" + err)
            })

    }

    const getUfs = () => {
        return ufs
    }

    function postOrder(payment) {
        if (cpfCheck == false) {
            return alert("Preencha os dados corretamente")
        }


        var tempOrder = { ...order }
        let user = JSON.parse(localStorage.getItem("user"))

        if (payment == 1) {
            tempOrder = ({
                ...tempOrder,
                myUser: {...tempOrder.myUser, id: user.value.id, email: user.value.email},
                payment: { ...tempOrder.payment, id: payment },
                telephone: { ...tempOrder.telephone, number: tempOrder.telephone.number.toString().replace(/[^0-9]/g, "") },
                card: null
            })
        } else if (payment > 1 && payment < 13) {
            tempOrder = ({
                ...tempOrder,
                payment: { ...tempOrder.payment, id: payment },
                telephone: { ...tempOrder.telephone, number: tempOrder.telephone.number.toString().replace(/[^0-9]/g, "") },
                card: { ...tempOrder.card, cardNumber: criptCard(tempOrder.card.cardNumber), dueDate: "20" + inputYear + "-" + inputMonth + "-01" }
            })
        } else if (payment == 13) {
            tempOrder = ({
                ...tempOrder,
                myUser: {...tempOrder.myUser, id: user.value.id, email: user.value.email},
                payment: { ...tempOrder.payment, id: payment },
                telephone: { ...tempOrder.telephone, number: tempOrder.telephone.number.toString().replace(/[^0-9]/g, "") },
                card: { ...tempOrder.card, cardNumber: criptCard(tempOrder.card.cardNumber), dueDate: "20" + inputYear + "-" + inputMonth + "-01" }
            })
        }




        let orderJson = JSON.stringify(tempOrder)

        localStorage.setItem('order', orderJson)

        setDisable(true)
        changeRedirect()

    }

    function changeRedirect() {
        setTimeout(function () {
            setSuccess(true)

        }, 2000)
    }

    const [mask, setMask] = useState("9999 9999 9999 9999999")

    function authCard(e) {
        clearErrors(["CardNum"])
        var card = e

        if (MoipValidator.isValidNumber(card) == true) {


            switch (MoipValidator.cardType(card).brand) {
                case "VISA":
                    setOrder({ ...order, card: { ...order.card, flag: { id: 2 }, cardNumber: card } })
                    setInputBrand("VISA")
                    return true
                    break;
                case "MASTERCARD":
                    setOrder({ ...order, card: { ...order.card, flag: { id: 1 }, cardNumber: card } })
                    setInputBrand("MASTERCARD");
                    return true
                    break;
                case "AMEX":
                    setOrder({ ...order, card: { ...order.card, flag: { id: 3 }, cardNumber: card } })
                    setInputBrand("AMERICAN EXPRESS");
                    return true
                    break;
                case "ELO":
                    setOrder({ ...order, card: { ...order.card, flag: { id: 4 }, cardNumber: card } })
                    setInputBrand("ELO");
                    return true
                    break;
                case "HIPERCARD":
                    setOrder({ ...order, card: { ...order.card, flag: { id: 5 }, cardNumber: card } })
                    setInputBrand("HIPERCARD");
                    return true
                    break;
                case "DINERS":
                    setOrder({ ...order, card: { ...order.card, flag: { id: 6 }, cardNumber: card } })
                    setInputBrand("DINERS CLUB");
                    return true
                    break;
                default:
                    return setInputBrand("Cartão não aceito!")
            }
        }
        return false
    }

    const [cardNumber, setCardNumber] = useState("");
    const [cvv, setCvv] = useState("");

    function authDateCard(data) {
        var dataCurrente = new Date();
        var dateCurrent = (dataCurrente.getFullYear() - 10) + "-" + dataCurrente.getMonth() + "-" + dataCurrente.getDate()

        if (displayNoneE.display == "d-none") {
            if (displayNoneB.display == "d-none") {
                if (dateCurrent > order.card.birthDate) {

                    if (inputBrand != "Cartão não aceito") {

                        if (displayNoneD.display == "") {
                            if (MoipValidator.isExpiryDateValid(inputMonth, inputYear) == true) {
                                return postOrder(2)
                            } else {
                                return window.alert("Preencha a validade do cartão corretamente")
                            }
                        }

                        if (MoipValidator.isValidNumber(data.CardNum) == true) {
                            if (MoipValidator.isSecurityCodeValid(data.CardNum, data.cvv) == true) {
                                if (MoipValidator.isExpiryDateValid(inputMonth, inputYear) == true) {
                                    postOrder(order.payment.id)
                                } else {
                                    window.alert("Preencha a validade do cartão corretamente")
                                }
                            } else {
                                window.alert("Preencha o CVV corretamente")
                            }
                        } else {
                            window.alert("Preencha o número do cartão corretamente")
                        }
                    } else {
                        return window.alert("Cartão não aceito")
                    }

                } else {
                    window.alert("Data de nascimento do titular do cartão invalida!")

                }
            } else {
                return postOrder(1);
            }
        } else {
            return postOrder(13);
        }
    }

    function callRedirect() {
        if (success) {
            return <Redirect to={{ pathname: "/order", state: { ...order } }} />
        }
        return
    }

    function changeB() {
        setDisplayNoneB({
            display: ""
        })
        setDisplayNoneD({
            display: "d-none"
        })
        setDisplayNoneC({
            display: "d-none"
        })
        setDisplayNoneE({
            display: "d-none"
        })
        setButtons(
            <>
                <Button onclick={changeC} class={"col-4 cartao forma-pagamento disabled-button"} label={<H2 h2="Crédito" />}></Button>
                <Button onclick={changeD} class={"col-4 forma-pagamento cartao disabled-button"} label={<H2 h2="Débito" />}></Button>
                <Button onclick={changeE} class="col-4 forma-pagamento boleto disabled-button" label={<H2 h2="Pix" />}></Button>
                <Button onclick={changeB} class="col-4 forma-pagamento boleto selected-button" label={<H2 h2="Boleto" />}></Button>
 </>
        )
    }

    function changeC() {
        setDisplayNoneC({
            display: ""
        })
        setDisplayNoneD({
            display: "d-none"
        })

        setDisplayNoneE({
            display: "d-none"
        })
        setDisplayNoneB({
            display: "d-none"
        })
        setButtons(
            <>
                <Button onclick={changeC} class={"col-4 cartao forma-pagamento selected-button"} label={<H2 h2="Crédito" />}></Button>
                <Button onclick={changeD} class={"col-4 forma-pagamento cartao disabled-button"} label={<H2 h2="Débito" />}></Button>
                <Button onclick={changeE} class="col-4 forma-pagamento boleto disabled-button" label={<H2 h2="Pix" />}></Button>
                <Button onclick={changeB} class="col-4 forma-pagamento boleto disabled-button" label={<H2 h2="Boleto" />}></Button>
            </>
        )
    }

    function changeD() {
        setDisplayNoneD({
            display: ""
        })
        setDisplayNoneC({
            display: "d-none"
        })

        setDisplayNoneE({
            display: "d-none"
        })
        setDisplayNoneB({
            display: "d-none"
        })
        setButtons(
            <>
                <Button onclick={changeC} class={"col-4 cartao forma-pagamento disabled-button"} label={<H2 h2="Crédito" />}></Button>
                <Button onclick={changeD} class={"col-4 forma-pagamento cartao selected-button"} label={<H2 h2="Débito" />}></Button>
                <Button onclick={changeE} class="col-4 forma-pagamento pix disabled-button" label={<H2 h2="Pix" />}></Button>
                <Button onclick={changeB} class="col-4 forma-pagamento boleto disabled-button" label={<H2 h2="Boleto" />}></Button>
            </>
        )
    }

    function changeE() {
        setDisplayNoneE({
            display: ""
        })
        setDisplayNoneD({
            display: "d-none"
        })

        setDisplayNoneC({
            display: "d-none"
        })
        setDisplayNoneB({
            display: "d-none"
        })
        setButtons(
            <>
                <Button onclick={changeC} class={"col-4 cartao forma-pagamento disabled-button"} label={<H2 h2="Crédito" />}></Button>
                <Button onclick={changeD} class={"col-4 forma-pagamento cartao disabled-button"} label={<H2 h2="Débito" />}></Button>
                <Button onclick={changeE} class="col-4 forma-pagamento pix selected-button" label={<H2 h2="Pix" />}></Button>
                <Button onclick={changeB} class="col-4 forma-pagamento boleto disabled-button" label={<H2 h2="Boleto" />}></Button>
            </>
        )
    }



    const [displayNoneB, setDisplayNoneB] = useState({
        display: "d-none"
    })
    const [displayNoneD, setDisplayNoneD] = useState({
        display: "d-none"

    })
    const [displayNoneC, setDisplayNoneC] = useState("d-none")
    const [displayNoneE, setDisplayNoneE] = useState({
        display: "d-none"

    })
    const [dueDate, setDueDate] = useState("")
    const [buttons, setButtons] = useState(
        <>
            <Button onclick={changeC} class={"col-4 cartao forma-pagamento selected-button"} label={<H2 h2="Crédito" />}></Button>
            <Button onclick={changeD} class={"col-4 forma-pagamento cartao disabled-button"} label={<H2 h2="Débito" />}></Button>
            <Button onclick={changeE} class="col-4 forma-pagamento pix disabled-button" label={<H2 h2="Pix" />}></Button>
            <Button onclick={changeB} class="col-4 forma-pagamento boleto disabled-button" label={<H2 h2="Boleto" />}></Button>
        </>
    )
    let change = false
    const history = useHistory()


    const [paymentMethod, setPaymentMethod] = useState("")

    function getListPayments() {
        api
            .get("/payments")
            .then((response) => setPaymentMethod(response.data))
            .catch((err) => {
                console.error("Erro ao consumir api de payments" + err)
            })

    }
    function getListFlags() {
        api
            .get("/flags")
            .then((response) => setFlag(response.data))
            .catch((err) => {
                console.error("Erro ao consumir api de flag" + err)
            })

    }
    function getOrderLocal() {
        setOrder()
    }

    useEffect(() => {

        getListPayments()
        getListFlags()

    }, [])

    function backToCart() {
        window.location.href = "/cart"
    }

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


    /////////////////// INICIO FUNCOES DE BUSCA E VALIDACAO DE CEP /////////////////////

    function limpa_formulário_cep() {
        //Limpa valores do formulário de cep.
        setAddressToLink({ ...newAddressToLink, street: "", district: "", city: "", state: "", number: "", complement: "", reference: "" });
    }

    function meu_callback(conteudo) {
        if (!("erro" in conteudo)) {
            //Atualiza os campos com os valores.
            setAddressToLink({ ...newAddressToLink, street: conteudo.logradouro, district: conteudo.bairro, city: conteudo.localidade, state: conteudo.uf })
        } //end if.
        else {
            //CEP não Encontrado.
            limpa_formulário_cep();
            alert("CEP não encontrado.");
        }
    }


    function buscarCep(e) {

        clean2(["cep"])

        const valor = e
        setValue2('cep', valor)
        //Nova variável "cep" somente com dígitos.
        const cep = valor.replace(/\D/g, '');


        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                setAddressToLink({ ...newAddressToLink, street: "...", district: "...", city: "...", state: "...", number: "", complement: "", reference: "" });

                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(res => res.json())
                    .then(data => meu_callback(data))

            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    };
    /////////////////// FIM FUNCOES DE BUSCA E VALIDACAO DE CEP /////////////////////

    /////////////////// INICIO FUNCAO DE VALIDAÇÃO DE CPF /////////////////////

    // @see https://incom.in.gov.br/js/util.js
    function checarCPF(e) {
        setCheck(true)
        setCpf(true)
        clearErrors(["cpf"]) // limpa o erro ao clicar no campo CPF quando este exibe erro
        clearErrors(["cpfD"]) // limpa o erro ao clicar no campo CPF quando este exibe erro
        var cpf = e;
        cpf = cpf.toString().replace(/[^0-9]/g, ""); // transforma os valores digitados para apenas numeros
        setOrder({ ...order, card: { ...order.card, cpf: cpf } })
        let booleano = true
        if (cpf == "") {
            // setCheck(false)
            setCpf("")
            return false
        }

        if (cpf.length !== 11 || ['00000000000', '11111111111', '22222222222',
            '33333333333', '44444444444', '55555555555', '66666666666',
            '77777777777', '88888888888', '99999999999'].includes(cpf)) {
            setCheck(false)
            setCpf("")
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
            setCheck(false)
            setCpf("")
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
            setCheck(false)
            setCpf("")
            return false;
        }
        clearErrors(["cpf"]) // limpa o erro ao clicar no campo CPF quando este exibe erro
        clearErrors(["cpfD"]) // limpa o erro ao clicar no campo CPF quando este exibe erro
        setCheck(true)
        setCpf(cpf)
        return true;
    }

    /////////////////// FIM FUNCAO DE VALIDAÇÃO DE CPF /////////////////////

    // limpam o vaor do input ao alterar o campo quando o mesmo tem erro

    function LimparNome(e) {
        clearErrors(["nome"])
        clearErrors(["nomeD"])
        setOrder({ ...order, card: { ...order.card, name: e.target.value } })
    }

    function LimparData(e) {
        clearErrors(["data"])
        clearErrors(["dataD"])
        setOrder({ ...order, card: { ...order.card, birthDate: e.target.value } })
    }

    function LimparTelefone(e) {
        clearErrors(["telefone"])
        clearErrors(["telefoneD"])
        setOrder({ ...order, telephone: { ...order.telephone, id: null, number: e.target.value } })
    }

    function LimparEmail(e) {
        clearErrors(["E-mail"])
        clearErrors(["E-mailD"])
        setOrder({ ...order, myUser: { ...order.myUser, email: e.target.value } })
    }

    function LimparNumero(e) {
        clean2(["Número"])
        setAddressToLink({ ...newAddressToLink, number: e.target.value })
        // clearErrors(["Número"])
        // clearErrors(["NúmeroD"])
        // setOrder({ ...order, address: { ...order.address, id: null, number: e.target.value } })
    }

    const [cpfCheck, setCheck] = useState(true)
    const [cpfValue, setCpf] = useState("")

    // desabilita botão finalizar apos o click
    const [disable, setDisable] = React.useState(false);

    function renderLoading() {
        return <img className="img-loading-btn" src={Loading} alt="Gerando pedido" />
    }

    ///////////////////////// INICIO FUNCAO QUE SETA BANDEIRA DO CARTAO /////////////////
    // funcao que remove os erros debaixo do campo e seta a bandeira onChange 
    function LimpaCartao(e) {
        clearErrors(["CardNum"])
        clearErrors(["CardNumD"])
        var cartao = e.target.value.toString().replace(/[^0-9]/g, "")

        if (cartao.length <= 0) {
            setInputBrand("")
        }

        var valid = require('card-validator')
        var numberValidator = valid.number(cartao)

        if (numberValidator.card) {
            if (numberValidator.card.type == 'american-express') {
                setMask("9999 999999 99999")
                setOrder({ ...order, card: { ...order.card, flag: { id: 3 }, cardNumber: cartao } })
            } else if (numberValidator.card.type == 'diners-club') {
                setMask("9999 999999 9999")
                setOrder({ ...order, card: { ...order.card, flag: { id: 6 }, cardNumber: cartao } })
            } else if (numberValidator.card.type == 'maestro') {
                setMask("9999 9999 9999 9999999")
                setOrder({ ...order, card: { ...order.card, flag: { id: 1 }, cardNumber: cartao } })
            } else if (numberValidator.card.type == 'mastercard') {
                setMask("9999 9999 9999 9999999")
                setOrder({ ...order, card: { ...order.card, flag: { id: 1 }, cardNumber: cartao } })
            } else if (numberValidator.card.type == 'visa') {
                setMask("9999 9999 9999 9999999")
                setOrder({ ...order, card: { ...order.card, flag: { id: 2 }, cardNumber: cartao } })
            } else if (numberValidator.card.type == 'elo') {
                setMask("9999 9999 9999 9999")
                setOrder({ ...order, card: { ...order.card, flag: { id: 4 }, cardNumber: cartao } })
            } else if (numberValidator.card.type == 'hipercard') {
                setMask("9999 9999 9999 9999")
                setOrder({ ...order, card: { ...order.card, flag: { id: 5 }, cardNumber: cartao } })
            } else {
                setMask("9999 9999 9999 9999")
                setInputBrand("Cartão não aceito!")
            }
            var brand = numberValidator.card.type
            setInputBrand(brand.toUpperCase())
        }

        setCardNumber(cartao)

    }
    ///////////////////////// FIM FUNCAO QUE SETA BANDEIRA DO CARTAO /////////////////


    ///////////////////////// INICIO FUNCAO QUE VALIDA O NUMERO DO CARTAO /////////////////
    function validateCard(number) {

        clearErrors(["CardNum"])
        clearErrors(["CardNumD"])

        var card = number.replace(/[^0-9]/g, "")

        var valid = require('card-validator')
        var numberValidator = valid.number(card, { maxLength: 19 })

        if (numberValidator.isValid) {
            return true;
        } else {
            return false
        }

    }
    ///////////////////////// FIM FUNCAO QUE VALIDA O NUMERO DO CARTAO /////////////////

    function LimparCpf(e) {
        clearErrors(["cpf"])
        clearErrors(["cpfD"])
    }
    const [modalState, setStateModal] = useState(false)

    function setOpenModal() {
        setStateModal(true)

    }
    function closeModal() {
        setStateModal(false)

    }

    function postAddressUser() {
        var idUser = JSON.parse(localStorage.getItem('user'))
        var valor = newAddressToLink.cep
        const cep = valor.replace(/\D/g, '');

        api.post('/userAddress', { id: { idUser: idUser.value.id }, address: { ...newAddressToLink, cep: cep }, description: addressAlias }).then(response => {
            console.log(response)
            window.alert("Endereço Salvo")
            closeModal()
            //chamar a atualização do comp de reder
            getAddress()
        }).catch(err => {
            console.log("Falha ao vincular usuario endereço" + err)
            window.alert("Erro ao salvar Endereço")

        });

    }
    const [newAddressToLink, setAddressToLink] = useState({ cep: "", street: "", district: "", city: "", state: "", number: "", complement: "", reference: "" })
    const [addressAlias, setAliasAddress] = useState()
    return (

        <>


            <FormDefault id="address" title="Dados de entrega" action="/order">
                <div className="row mt-2 justify-content-center mb-3">
                    {userA}
                </div>
                <Modal
                    show={modalState}
                    onHide={() => setStateModal(false)}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >

                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Adicionar um novo endereço
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div class="row  justify-content-center mb-3">

                            <div class="row ">



                                <div class=" col-6 col-sm-6 col-md-4">
                                    <InputCep
                                        name="cep" pattern={/^\d{5}-\d{3}$/}
                                        mask={[/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                                        required={<span className="text-danger">Campo inválido!</span>}
                                        blur={buscarCep}
                                        label="CEP" type="text" id="cep" className="form-input col-12"
                                        placeholder="00000-000" validation={buscarCep}
                                        change={e => setAddressToLink({ ...newAddressToLink, cep: e.target.value })} register={register2} errors={errors2}
                                        value={newAddressToLink.cep} />
                                    {/* <InputCep className="form-input col-12 form-label" length="9" blur={buscarCep} value={order.address.cep} label="CEP" type="text" id="cep" className="form-input col-12" placeholder="Digite seu CEP..." change={e => setOrder({ ...order, address: { ...order.address, cep: e.target.value } })} /> */}
                                </div>

                                <div class=" col-6 col-sm-6 col-md-2">
                                    <Select label="Estado" disabled={true} options={ufs} selected={newAddressToLink.state} change={e => setAddressToLink({ ...newAddressToLink, state: e.target.value })} default="Estado:" />
                                </div>

                                <div class=" col-6 col-sm-6 col-md-5">
                                    <Input value={newAddressToLink.city} disabled={false} change={e => setAddressToLink({ ...newAddressToLink, city: e.target.value })} label="Cidade" className="form-input col-12 form-label" type="text" name="city" placeholder="Digite a cidade..." />
                                </div>

                                <div class=" col-9 col-md-6">
                                    <Input value={newAddressToLink.street} disabled={false} change={e => setAddressToLink({ ...newAddressToLink, street: e.target.value })} label="Logradouro" className="form-input col-12 form-label" type="text" name="street" placeholder="Digite o logradouro..." />
                                </div>

                                <div class=" col-3  col-md-2">
                                    <InputHook hook // hook eh a props para input padrao com a verificacao
                                        name="Número" // name sera utilizado no componente para fazer as comparacoes
                                        register={register2} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                                        required={<span className="text-danger">Digite um número válido</span>} // mensagem de erro que sera exibida caso o campo nao seja valido
                                        maxlength={5} // tamanho maximo do campo
                                        pattern={/(\d)/}
                                        errors={errors2}
                                        clear={clean2}
                                        change={LimparNumero}
                                        value={newAddressToLink.number}
                                        label="Número"
                                        type="text"
                                        className="form-input col-12"
                                        placeholder="Digite o número..." />
                                </div>

                                <div class=" col-6 col-md-4">
                                    <Input value={newAddressToLink.district} disabled={false} change={e => setAddressToLink({ ...newAddressToLink, district: e.target.value })} label="Bairro" className="form-input col-12 form-label" type="text" name="district" placeholder="Digite o Bairro..." />
                                </div>

                                <div class=" col-6  col-md-4">
                                    <Input value={newAddressToLink.complement} change={e => setAddressToLink({ ...newAddressToLink, complement: e.target.value })} label="Complemento" className="form-input col-12 form-label" type="text" name="complement" placeholder="Digite o complemento..." />
                                </div>

                                <div class=" col-6 col-md-4">
                                    <Input value={newAddressToLink.reference} change={e => setAddressToLink({ ...newAddressToLink, reference: e.target.value })} label="Referencia" className="form-input col-12 form-label" type="text" name="reference" placeholder="Digite um ponto de referência" />

                                </div>

                                <div class=" col-6 col-md-4">
                                    <Input value={addressAlias} change={e => setAliasAddress(e.target.value)} label="Apelido do Endereço" className="form-input col-12 form-label" type="text" name="aliasAddress" placeholder="Ex.: Minha Casa" />
                                </div>


                        </div>

                        <div className="col-10 d-flex justify-content-between mt-3">    

                            <Button label="Fechar" onclick={closeModal} class="btn-retorno" />
                            <Button onclick={handleSubmit2(postAddressUser)} label={disable ? renderLoading() : "Salvar"} class="btn-confirmacao" type="submit" />
                        </div>
                   
                    </div>

                </Modal.Body>
            </Modal>



                    {/* 
                <div class="row  justify-content-center mb-3">

                    <div class="row ">
                        <div class=" col-6  col-sm-6 col-md-3">
                            <InputHook  // hook eh a props para input padrao com a verificacao
                                name="telefone" // name sera utilizado no componente para fazer as comparacoes
                                register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                                required={<span className="text-danger">Digite um telefone válido</span>} // mensagem de erro que sera exibida caso o campo nao seja valido
                                maxlength={15} // tamanho maximo do campo
                                pattern={/^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/}
                                errors={errors}
                                clear={clearErrors}
                                change={LimparTelefone}
                                mask={order.telephone.number.charAt(2) == 9 ? "(99) 99999-9999" : "(99) 9999-9999"}
                                label="Telefone"
                                type="tel"
                                className="form-input col-12"
                                placeholder="Telefone para contato com DDD" />

                        </div>

                        <div class=" col-6  col-sm-6 col-md-4">
                            <InputHook hook // hook eh a props para input padrao com a verificacao
                                name="E-mail" // name sera utilizado no componente para fazer as comparacoes
                                register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                                required={<span className="text-danger">Digite um email válido</span>} // mensagem de erro que sera exibida caso o campo nao seja valido
                                maxlength={30} // tamanho maximo do campo
                                pattern={/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i}
                                errors={errors}
                                clear={clearErrors}
                                change={LimparEmail}
                                disabled={true}
                                label="E-mail"
                                type="mail"
                                className="form-input col-12 form-label"
                                placeholder="E-mail para contato" />

                        </div>


                        <div class=" col-6 col-sm-6 col-md-3">
                            <InputCep
                                name="cep" pattern={/^\d{5}-\d{3}$/}
                                mask={[/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                                required={<span className="text-danger">Campo inválido!</span>}
                                blur={buscarCep}
                                label="CEP" type="text" id="cep" className="form-input col-12"
                                placeholder="00000-000" validation={buscarCep}
                                change={e => setOrder({ ...order, address: { ...order.address, id: null, cep: e.target.value } })} register={register} errors={errors}
                                value={order.address.cep} />
                            {/* <InputCep className="form-input col-12 form-label" length="9" blur={buscarCep} value={order.address.cep} label="CEP" type="text" id="cep" className="form-input col-12" placeholder="Digite seu CEP..." change={e => setOrder({ ...order, address: { ...order.address, cep: e.target.value } })} /> */}
                    {/* </div>

                        <div class=" col-6 col-sm-6 col-md-2">
                            <Select label="Estado" disabled={false} options={ufs} selected={order.address.state} change={e => setOrder({ ...order, address: { ...order.address, id: null, state: e.target.value } })} default="Estado:" />
                        </div>

                        <div class=" col-6 col-sm-6 col-md-4">
                            <Input value={order.address.city} disabled={false} change={e => setOrder({ ...order, address: { ...order.address, id: null, city: e.target.value } })} label="Cidade" className="form-input col-12 form-label" type="text" name="city" placeholder="Digite a cidade..." />
                        </div>

                        <div class=" col-9 col-md-6">
                            <Input value={order.address.street} disabled={false} change={e => setOrder({ ...order, address: { ...order.address, id: null, street: e.target.value } })} label="Logradouro" className="form-input col-12 form-label" type="text" name="street" placeholder="Digite o logradouro..." />
                        </div>

                        <div class=" col-3  col-md-2">
                            <InputHook hook // hook eh a props para input padrao com a verificacao
                                name="Número" // name sera utilizado no componente para fazer as comparacoes
                                register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                                required={<span className="text-danger">Digite um número válido</span>} // mensagem de erro que sera exibida caso o campo nao seja valido
                                maxlength={5} // tamanho maximo do campo
                                pattern={/(\d)/}
                                errors={errors}
                                clear={clearErrors}
                                change={LimparNumero}
                                value={order.address.number}
                                label="Número"
                                type="text"
                                className="form-input col-12"
                                placeholder="Digite o número..." />
                        </div>

                        <div class=" col-6 col-md-4">
                            <Input value={order.address.district} disabled={false} change={e => setOrder({ ...order, address: { ...order.address, id: null, district: e.target.value } })} label="Bairro" className="form-input col-12 form-label" type="text" name="district" placeholder="Digite o Bairro..." />
                        </div>

                        <div class=" col-6  col-md-4">
                            <Input value={order.address.complement} change={e => setOrder({ ...order, address: { ...order.address, id: null, complement: e.target.value } })} label="Complemento" className="form-input col-12 form-label" type="text" name="complement" placeholder="Digite o complemento..." />
                        </div>

                        <div class=" col-6 col-md-4">
                            <Input value={order.address.reference} change={e => setOrder({ ...order, address: { ...order.address, id: null, reference: e.target.value } })} label="Referencia" className="form-input col-12 form-label" type="text" name="reference" placeholder="Digite um ponto de referência" />

                        </div>

                    </div>

                </div> */} 

            </FormDefault>

                <FormDefault id="card" title="Dados de Pagamento" className="mt-5" action="/order">
                    <div className="escolha row justify-content-around mt-4 ">

                        {buttons}

                    </div>

                    <div className={"row justify-content-center"}>
                        {displayNoneD.display != "d-none" ?
                            <div className={`row custom-form ${displayNoneD.display}`}>
                                <div className=" col-12 col-md-5">
                                    <InputHook hook // hook eh a props para input padrao com a verificacao
                                        name="nomeD" // name sera utilizado no componente para fazer as comparacoes
                                        register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                                        required={<span className="text-danger">Digite um nome válido e sem números!</span>} // mensagem de erro que sera exibida caso o campo nao seja valido
                                        maxlength={50} // tamanho maximo do campo
                                        pattern={/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u}
                                        errors={errors}
                                        clear={clearErrors}
                                        change={LimparNome}
                                        label="Nome Titular"
                                        type="text"
                                        className="form-input col-12"
                                        placeholder="Nome como está no cartão" />
                                </div>

                                <div className=" col-6 col-md-4">
                                    <InputHook // hook eh a props para input padrao com a verificacao
                                        name="cpfD" // name sera utilizado no componente para fazer as comparacoes
                                        register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                                        required={cpfValue == "" ? <><span className="text-danger">Digite um CPF válido!</span><br /></> : ""} // mensagem de erro que sera exibida caso o campo nao seja valido
                                        message={cpfValue == "" ? <><span className="text-danger">Digite um CPF válido!</span><br /></> : ""} // mensagem de erro que sera exibida caso o campo nao seja valido
                                        maxlength={14} // tamanho maximo do campo
                                        minlength={11} // tamanho minimo do campo
                                        pattern={/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/u}
                                        errors={errors}
                                        change={LimparCpf}
                                        validation={checarCPF}
                                        mask="999.999.999-99" // mascara que sera aplicada
                                        value={cpfValue}
                                        label="CPF Titular"
                                        type="text"
                                        className="form-input col-12"
                                        placeholder="000.000.000-00" />

                                </div>

                                <div className=" col-6 col-md-3">
                                    <InputHook hook // hook eh a props para input padrao com a verificacao
                                        name="dataD" // name sera utilizado no componente para fazer as comparacoes
                                        register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                                        required={<span className="text-danger">Digite uma data válida!</span>} // mensagem de erro que sera exibida caso o campo nao seja valido
                                        pattern={/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/}
                                        errors={errors}
                                        change={LimparData}
                                        label="Data de Nascimento Titular"
                                        type="date"
                                        className="form-input col-12"
                                    />
                                </div>

                                <div className=" col-12 col-md-4">
                                    <InputCard
                                        name="CardNumD" // name sera utilizado no componente para fazer as comparacoes
                                        register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                                        required={<span className="text-danger">Insira um número de cartão válido!</span>}
                                        errors={errors}
                                        change={LimpaCartao}
                                        validation={validateCard}
                                        mask={mask}
                                        maskchar={null}
                                        value={cardNumber}
                                        label="Número do cartão"
                                        type="text"
                                        className="form-input col-12"
                                        placeholder="0000 0000 0000 0000" />
                                </div>

                                <div className=" col-6 col-md-2">
                                    <Input label="Bandeira" disabled value={inputBrand} />
                                </div>


                                <div className=" col-6 col-md-2">
                                    <div className="row">
                                        <Input change={e => setInputMonth(e.target.value)} label="Mês" classCustom="col-6" type="text" placeholder="MM" maxlength={2} />
                                        <Input change={e => setInputYear(e.target.value)} label="Ano" classCustom="col-6" type="text" placeholder="AA" maxlength={2} />
                                    </div>
                                </div>

                            </div>
                            : ""}
                    </div>


                <div className="row pagamento justify-content-center"> {displayNoneE.display != "d-none" ?
                    <div>
                        <h3 className="ticketInfo">O PIX será gerado na próxima página, por gentileza clicar no botão "Finalizar"</h3>

                    </div>
                    : ""}

                </div>

                <div className={"row justify-content-center"}>
                        {displayNoneB.display != "d-none" ?
                            <div className={`row custom-form`}>
                                <h3 className="ticketInfo">Finalize a sua compra para gerar o boleto para pagamento!</h3>
                            </div>
                            : ""}
                    </div>


                    <div className={"row justify-content-center"}>
                        {displayNoneC.display != "d-none" ?
                            <div className={`row custom-form`}>

                                <div className=" col-12 col-md-5">
                                    <InputHook hook // hook eh a props para input padrao com a verificacao
                                        name="nome" // name sera utilizado no componente para fazer as comparacoes
                                        register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                                        required={<span className="text-danger">Digite um nome válido e sem números!</span>} // mensagem de erro que sera exibida caso o campo nao seja valido
                                        maxlength={50} // tamanho maximo do campo
                                        pattern={/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u}
                                        errors={errors}
                                        clear={clearErrors}
                                        change={LimparNome}
                                        label="Nome Titular"
                                        type="text"
                                        className="form-input col-12"
                                        placeholder="Nome como está no cartão" />
                                </div>

                                <div className=" col-6 col-md-4">
                                    <InputHook // hook eh a props para input padrao com a verificacao
                                        name="cpf" // name sera utilizado no componente para fazer as comparacoes
                                        register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                                        required={cpfValue == "" ? <><span className="text-danger">Digite um CPF válido!</span><br /></> : ""} // mensagem de erro que sera exibida caso o campo nao seja valido
                                        message={cpfValue == "" ? <><span className="text-danger">Digite um CPF válido!</span><br /></> : ""} // mensagem de erro que sera exibida caso o campo nao seja valido
                                        maxlength={14} // tamanho maximo do campo
                                        minlength={11} // tamanho minimo do campo
                                        pattern={/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/u}
                                        errors={errors}
                                        change={LimparCpf}
                                        validation={checarCPF}
                                        mask="999.999.999-99" // mascara que sera aplicada
                                        value={cpfValue}
                                        label="CPF Titular"
                                        type="text"
                                        className="form-input col-12"
                                        placeholder="000.000.000-00" />

                                </div>

                                <div className=" col-6 col-md-3">
                                    <InputHook hook // hook eh a props para input padrao com a verificacao
                                        name="data" // name sera utilizado no componente para fazer as comparacoes
                                        register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                                        required={<span className="text-danger">Digite uma data válida!</span>} // mensagem de erro que sera exibida caso o campo nao seja valido
                                        pattern={/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/}
                                        errors={errors}
                                        change={LimparData}
                                        label="Data de Nascimento Titular"
                                        type="date"
                                        className="form-input col-12"
                                    />
                                </div>

                                <div className=" col-12 col-md-4">
                                    <InputCard
                                        name="CardNum" // name sera utilizado no componente para fazer as comparacoes
                                        register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                                        required={<span className="text-danger">Insira um número de cartão válido!</span>}
                                        errors={errors}
                                        change={LimpaCartao}
                                        validation={validateCard}
                                        maskchar={null}
                                        mask={mask}
                                        label="Número do cartão"
                                        type="text"
                                        className="form-input col-12"
                                        placeholder="0000 0000 0000 0000" />
                                </div>

                                <div className=" col-6 col-md-1">
                                    <InputHook hook
                                        name="cvv" // name sera utilizado no componente para fazer as comparacoes
                                        register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                                        required // mensagem de erro que sera exibida caso o campo nao seja valido
                                        errors={errors}
                                        change={e => { setCvv(e.target.value) }}
                                        maxlength={4}
                                        label="CVV"
                                        type="text"
                                        value={cvv}
                                        className="form-input col-12"
                                        placeholder="CVV" />

                                </div>

                                <div className=" col-6 col-md-2">
                                    <Input label="Bandeira" disabled value={inputBrand} />
                                </div>


                                <div className=" col-6 col-md-2">
                                    <div className="row">

                                        <Input change={e => setInputMonth(e.target.value)} label="Mês" classCustom="col-6" type="text" placeholder="MM" maxlength={2} />
                                        <Input change={e => setInputYear(e.target.value)} label="Ano" classCustom="col-6" type="text" placeholder="AA" maxlength={2} />
                                    </div>
                                </div>


                                <div className=" col-6 col-md-3">
                                    <SelectCard label="Forma de Pagamento:" paymentMethod={paymentMethod} change={e => setOrder({ ...order, payment: { id: e.target.value } })} />
                                </div>


                            </div>
                            : ""}
                    </div>


                    <div className="row justify-content-around py-4">
                        <Button label="Voltar" onclick={backToCart} class="btn-retorno" />
                        <Button onclick={handleSubmit(authDateCard)} label={disable ? renderLoading() : "Finalizar"} class="btn-confirmacao" type="submit" />
                    </div>

            </FormDefault>

                {callRedirect()}

        </>
            )
}

 export default FormShippigAddress