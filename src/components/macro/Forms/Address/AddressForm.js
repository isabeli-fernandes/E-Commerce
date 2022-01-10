import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import FormDefault from '../FormDefault/FormDefault';
import Input from "../../../micro/Forms/Input/Input";
import Button from "../../../micro/Button/Button";
import Select from "../../../micro/Forms/Select/Select";
import api from "../../../../services/api";
import InputCep from "../../../micro/Forms/Input/InputCep";
import { useForm } from "react-hook-form"; // lembrar de fazer npm install para instalar a biblioteca react-hook-form
import { ErrorMessage } from "@hookform/error-message"; // lembrar de fazer npm install para instalar a biblioteca error-message
import InputHook from "../../../micro/Forms/Input/InputHook"
import RadioButton from "../../../micro/Forms/Radio/RadioButton";
import UserAddress from "../../Address/UserAddress";
import Modal from 'react-bootstrap/Modal'
import MoreAddresses from "../../moreAddress/MoreAddress";
import Loading from "../../../../assets/images/success/loading.gif"

const initial = {
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

function Address(props) {
    let bool = true

    // desfragmentando as funcoes e objetos da biblioteca react-hook-form
    const { register, handleSubmit, watch, formState: { errors }, reset, setValue, clearErrors, setError } = useForm();

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

    const [address, setAddress] = useState({ ...initial });
    const [show, setShow] = useState(bool);

    const [id, setId] = useState("");
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

    useEffect(() => { })

    function putAddress(data) {
        setAddress({ ...address, cep: data.cep.replace(/\D/g, '') })
        var newAddress = ({ ...address, cep: data.cep.replace(/\D/g, '') })
        api.put("/address", newAddress)
            .then((response) => {
                alert("Seu endereço foi alterado com sucesso!")
            })
            .catch((err) => {
                console.error("Erro ao realizar atualização de endereço" + err)
                alert("Erro ao cadastrar endereço!")
            })
    }

    const user = JSON.parse(localStorage.getItem("user"));

    // buscar e mostrar endereços cadastrados 
    const [userA, setUserA] = useState(
        <UserAddress>
            <MoreAddresses function={setOpenModal} />
        </UserAddress>);

    function getAllAddressess(addressList) {
        setUserA(
            <UserAddress userAddress={addressList} function={getSelectedAddress}>
                <MoreAddresses function={setOpenModal} />
            </UserAddress>);
    }

    function getSelectedAddress(selectedAddress) {
        api.get(`/address/find/${selectedAddress}`)
            .then(response => {
                setAddress({ ...response.data, id: selectedAddress })

                var cep = response.data.cep
                cep = cep.substring(0, 5) + "-" + cep.substring(5, cep.length)
                setAddress({ ...response.data, cep: cep })
                setValue("cep", cep, { shouldValidate: true })
                setValue("cidade", response.data.city, { shouldValidate: true })
                setValue("rua", response.data.street, { shouldValidate: true })
                setValue("bairro", response.data.district, { shouldValidate: true })
                setValue("estado", response.data.state, { shouldValidate: true })
                setValue("numero", response.data.number, { shouldValidate: true })
            })
            .catch((err) => {
                console.log("Erro ao consumir api de endereços selecionados" + err)
            })
    }

    const getAddress = () => {
        api.get(`/userAddress/myAddress/${user.value.id}`).then(
            res => {
                getAllAddressess(res.data)

            })
            .catch((err) => {
                console.error("Erro ao consumir api de Address" + err)
            })
    }

    const getUfs = () => {
        return ufs
    }

    useEffect(() => {
        getAddress();
        getUfs();

    }, []);

    async function disableForm(data) {
        bool = true
        setShow(bool)
        putAddress(data)
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

    let change = false

    /////////////////// INICIO FUNCOES DE BUSCA E VALIDACAO DE CEP /////////////////////

    function limpa_formulário_cep() {
        //Limpa valores do formulário de cep.
        setAddress({ ...address, street: "", district: "", city: "", state: "", number: "", complement: "", reference: "" });
        setAddressToLink({ ...newAddressToLink, street: "", district: "", city: "", state: "", number: "", complement: "", reference: "" } );
    }

    function meu_callback(conteudo) {
        if (!("erro" in conteudo)) {
            //Atualiza os campos com os valores.
            setAddress({ ...address, street: conteudo.logradouro, district: conteudo.bairro, city: conteudo.localidade, state: conteudo.uf })
            setAddressToLink({ ...newAddressToLink, street: conteudo.logradouro, district: conteudo.bairro, city: conteudo.localidade, state: conteudo.uf});
            setValue("rua", conteudo.logradouro)
            setValue("bairro", conteudo.bairro)
            setValue("cidade", conteudo.localidade)
        } //end if.
        else {
            //CEP não Encontrado.
            limpa_formulário_cep();
            alert("CEP não encontrado.");
        }
    }

    /////////////////// FIM FUNCOES DE BUSCA DE CEP /////////////////////

    function pesquisacep(e) {

        clean2(["cep"])
        
        const valor = e
        setValue("cep", valor)
        setValue2("cep", valor)

        //Nova variável "cep" somente com dígitos.
        const cep = valor.replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                setAddress({ ...address, street: "...", district: "...", city: "...", state: "...", number: "", complement: "", reference: "" });
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

    function setInputCep(e) {
        clearErrors(["cep"])
        const valor = e.target.value

        //Nova variável "cep" somente com dígitos.
        const cep = valor.replace(/\D/g, '');

        setAddress({ ...address, cep: cep })
    }

    function LimparNumero(e) {
        clearErrors(["numero"])
        setAddress({ ...address, number: e.target.value })
        setAddressToLink({ ...newAddressToLink, number: e.target.value })
    }

    function LimparRua(e) {
        clearErrors(["rua"])
        setAddress({ ...address, street: e.target.value })
    }

    function LimparBairro(e) {
        clearErrors(["bairro"])
        setAddress({ ...address, district: e.target.value })
    }

    function LimparCidade(e) {
        clearErrors(["cidade"])
        setAddress({ ...address, city: e.target.value })
    }


    // adicionar endereço

    const [modalState, setStateModal] = useState(false)
    const [newAddressToLink, setAddressToLink] = useState({ cep: "", street: "", district: "", city: "", state: "", number: "", complement: "", reference: "" })
    const [addressAlias, setAliasAddress] = useState()

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

    // desabilita botão finalizar apos o click
    const [disable, setDisable] = React.useState(false);

    function renderLoading() {
        return <img className="img-loading-btn" src={Loading} alt="Gerando pedido" />
    }


    return (
        <>
            <FormDefault title="Endereços" className="container custom-form-box mx-3 mx-sm-1 mx-lg-4 px-5 px-sm-1 px-lg-4">
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
                                        blur={pesquisacep}
                                        label="CEP" type="text" id="cep" className="form-input col-12"
                                        placeholder="00000-000" validation={pesquisacep}
                                        change={e => setAddressToLink({ ...newAddressToLink, cep: e.target.value })} register={register2} errors={errors2}
                                        value={newAddressToLink.cep} />
                                    {/* <InputCep className="form-input col-12 form-label" length="9" blur={pesquisacep} value={order.address.cep} label="CEP" type="text" id="cep" className="form-input col-12" placeholder="Digite seu CEP..." change={e => setOrder({ ...order, address: { ...order.address, cep: e.target.value } })} /> */}
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


                <div className="row custom-form d-flex justify-content-center">
                    <div className=" col-12 col-md-3" value={address.id}>
                        {/* INPUT PARA BUSCA DE CEP AO CLICAR FORA DO FORMULARIO. 
                        LENGTH == LIMITE DE CARACTERES NO INPUT 
                        (POR ENQUANTO 9 PENSANDO NA MÁSCARA QUE INSERE "-") */}
                        <InputCep
                            name="cep" pattern={/^\d{5}-\d{3}$/}
                            mask={[/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                            required={<span className="text-danger">Campo inválido!</span>}
                            blur={pesquisacep} validation={pesquisacep}
                            label="CEP" type="text" id="cep" className="form-input col-12"
                            placeholder="00000-000" value={address.cep} disabled={show}
                            change={setInputCep} register={register} errors={errors} />
                        {/* <InputCep length="9" blur={pesquisacep} value={address.cep} disabled={show} label="CEP" type="text" id="cep" className="form-input col-12" placeholder="Digite seu CEP..." change={e => setAddress({ ...address, cep: e.target.value})} /> */}
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
                            placeholder="Digite o logradouro..." disabled={show}
                            value={address.street}
                        />
                        {/* <Input input value={address.street} disabled={show} name="rua" label="Logradouro" type="text" id="rua" className="form-input col-12" placeholder="Digite o logradouro..." change={e => setAddress({ ...address, street: e.target.value })} /> */}
                    </div>

                    <div className=" col-12 col-md-2">
                        <InputHook hook // hook eh a props para input padrao com a verificacao
                            name="numero" // name sera utilizado no componente para fazer as comparacoes
                            register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                            required={<span className="text-danger">Digite um número válido</span>} // mensagem de erro que sera exibida caso o campo nao seja valido
                            pattern={/(\d)/}
                            errors={errors}
                            clear={clearErrors}
                            change={LimparNumero}
                            value={address.number}
                            label="Número"
                            type="text"
                            className="form-input col-12"
                            placeholder="Digite o número..." disabled={show} />
                    </div>

                </div>

                <div className="row custom-form d-flex justify-content-center">

                    <div className="col-12 col-md-5">
                        <Input input value={address.complement} disabled={show} label="Complemento" type="text" id="complemento" className="form-input col-12" placeholder="Digite o complemento..." change={e => setAddress({ ...address, complement: e.target.value })} />
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
                            placeholder="Digite o bairro..." disabled={show}
                            value={address.district} />
                        {/* <Input input value={address.street} disabled={show} name="rua" label="Logradouro" type="text" id="rua" className="form-input col-12" placeholder="Digite o logradouro..." change={e => setAddress({ ...address, street: e.target.value })} /> */}
                    </div>
                </div>
                <div className="row custom-form d-flex justify-content-center">
                    <div className="col-12 col-md-4">
                        <Input input value={address.reference} disabled={show} label="Ponto de referência" type="text" id="ponto-referencia" className="form-input col-12" placeholder="Digite um ponto de referência..." change={e => setAddress({ ...address, reference: e.target.value })} />
                    </div>

                    <div className="col-12 col-md-5">
                        <InputHook hook // hook eh a props para input padrao com a verificacao
                            name="cidade" // name sera utilizado no componente para fazer as comparacoes
                            register={register} // register recebe o estado atual do que esta em register para utilizar na funcao do componente
                            required={<span className="text-danger">Campo inválido!</span>} // mensagem de erro que sera exibida caso o campo nao seja valido
                            errors={errors}
                            change={LimparCidade}
                            label="Cidade"
                            type="text"
                            placeholder="Digite sua cidade..." disabled={show}
                            value={address.city} />
                        {/* <Input input value={address.street} disabled={show} name="rua" label="Logradouro" type="text" id="rua" className="form-input col-12" placeholder="Digite o logradouro..." change={e => setAddress({ ...address, street: e.target.value })} /> */}
                    </div>

                    <div className="col-12 col-md-2">
                        <Select disabled={show} label="Estado:" options={ufs} selected={address.state} change={e => setAddress({ ...address, state: e.target.value })} default="Estado" />
                    </div>

                </div>
                <div className="row justify-content-center pt-5">
                    <Button onclick={ableForm} label="Alterar" class={`btn-confirmacao ${stateB.alterar}`} />
                    <Button onclick={handleSubmit(disableForm)} label="Salvar" class={`btn-confirmacao ${stateB.salvar}`} />
                </div>

            </FormDefault>

        </>
    )
}

export default Address