import React from 'react'
import './Input.css'
import { useForm } from "react-hook-form";
import MaskedInput from 'react-text-mask'
import InputMask from "react-input-mask";
import { ErrorMessage } from "@hookform/error-message";

function InputCard(props) {

    return (
        <>
            <div className="input-container">
                <label>{props.label}:</label>
                <InputMask value={props.value} maskChar={props.maskchar} mask={props.mask} {...props.register(props.name, {onChange: e => props.change(e),
                    // validate vai executar uma arrow function com o valor do input como parametro (value)
                    validate: value => {
                        // retorna a funcao definida na props validation passando o valor do input como parametro 
                        // -> props.validation nesse caso sera a funcao de checagem de cep que recebera o valor do input como parametro
                        return props.validation(value) === true || props.required
                        // caso o retorno da funcao seja diferente de false, o input eh validado, caso contrario, exibe a mensagem de erro
                    }, required: props.required, pattern: { value: props.pattern, message: props.required }
                })} disabled={props.disabled} className="form-input" name={props.name} placeholder={props.placeholder} type={props.type} />
            </div>
            <ErrorMessage errors={props.errors} name={props.name} />
        </>
    )

}

export default InputCard