import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import FormDefault from "../FormDefault/FormDefault";
import Input from "../../../micro/Forms/Input/Input";
import H2 from "../../../micro/Title/H2";
import Button from "../../../micro/Button/Button";
import SelectCard from "../../../micro/Forms/Select/SelectCard";
import api from "../../../../services/api";

function FormDataCard(props) {


    const [displayNoneB, setDisplayNoneB] = useState("d-none")
    const [displayNoneC, setDisplayNoneC] = useState("")
    const [buttons, setButtons] = useState(
        <>
            <Button class="col-4 cartao forma-pagamento selected-button" label={<H2 h2="Cartão" />}></Button>
            <Button onclick={changeComponent} class="col-4 forma-pagamento boleto disabled-button" label={<H2 h2="Boleto" />}></Button>
        </>
    )
    let change = false

    // useEffect(() => {
    //     setButtons(
    //         <>
    //             <Button function={changeComponent} class="col-4 cartao forma-pagamento selected-button" label={<H2 h2="Cartão" />}></Button>
    //             <Button function={changeComponent} class="col-4 forma-pagamento boleto disabled-button" label={<H2 h2="Boleto" />}></Button>
    //         </>
    //     )
    //     setDisplayNoneB("d-none")
    //     setDisplayNoneC("")
    //     setChange(false)
    // }, [])

    function nothing() {
        return
    }

    function changeComponent() {
        if (change) {
            setButtons(
                <>
                    <Button class="col-4 cartao forma-pagamento selected-button" label={<H2 h2="Cartão" />}></Button>
                    <Button onclick={changeComponent} class="col-4 forma-pagamento boleto disabled-button" label={<H2 h2="Boleto" />}></Button>
                </>
            )
            change = false
            setDisplayNoneB("d-none")
            setDisplayNoneC("")
            console.log("noneC")
            console.log(change)
        } else {
            setButtons(
                <>
                    <Button onclick={changeComponent} class="col-4 cartao forma-pagamento disabled-button" label={<H2 h2="Cartão" />}></Button>
                    <Button  class="col-4 forma-pagamento boleto selected-button" label={<H2 h2="Boleto" />}></Button>
                </>
            )
            change = true
            setDisplayNoneB("")
            setDisplayNoneC("d-none")
            console.log("noneB")
            console.log(change)
        }
    }

    const [paymentMethod, setPaymentMethod] = useState("")
    const [selectedMethod, setSelected] = useState("")

    useEffect(() => {
        api
            .get("/payments")
            .then((response) => setPaymentMethod(response.data))
            .catch((err) => {
            console.error("Erro ao consumir api de payments" + err)
        })
    }, [])

    // console.log(paymentMethod)

    return (
        <>

            <div className="escolha row justify-content-around mt-4 ">

                {buttons}

            </div>

            <FormDefault id="card" title="Dados de Pagamento" className="mt-5" action="/order">


                <div className={`row pagamento justify-content-center ${displayNoneB}`}>
                    <div className="col-8 justify-content-center text-center ">
                        <input type="text" readonly className="form-control-plaintext justifi-content-center text-center" id="staticEmail"
                            value="Número do boleto: 000000 000000 000000 000000 000000" />
                    </div>
                </div>

                <div className={"row justify-content-center"}>
                    <div className={`row custom-form ${displayNoneC}`}>

                        <div className=" col-12 col-md-5">
                            <Input label="Nome do Titular" className="form-input col-12 form-label" type="text" name="name" placeholder="Nome como está no cartão" />
                        </div>

                        <div className=" col-6 col-md-4">
                            <Input label="CPF-Titular" className="form-input col-12 form-label" type="text" name="CPF" placeholder="999-999-999-99" />
                        </div>

                        <div className=" col-6 col-md-3">
                            <Input label="Data Nascimento Titular" className="form-input col-12 form-label" type="date" name="birthDate" placeholder="Ex.: Dia/Mês/Ano." />
                        </div>

                        <div className=" col-12 col-md-4">
                            <Input label="Numero do Cartão" className="form-input col-12 form-label" type="text" name="cardNumber" placeholder="Ex.: 0000 1111 2222 3333." />
                        </div>

                        <div className=" col-6 col-md-1">
                            <Input label="CVV" className="form-input col-12 form-label" type="text" name="cvv" placeholder="Ex.: 000." />
                        </div>

                        <div className=" col-6 col-md-2">
                            <Input label="Mês de vencimento" className="form-input col-12 form-label" type="text" name="dia" placeholder="mm" />
                        </div>

                        <div className=" col-6 col-md-2">
                            <Input label="Ano de vencimento" className="form-input col-12 form-label" type="text" name="mes" placeholder="aaaa" />
                        </div>

                   
                    </div>
                </div>

            </FormDefault>

        </>
    )
}

export default FormDataCard