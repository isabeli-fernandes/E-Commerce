import React from 'react'
import './Input.css'
import { useForm } from "react-hook-form";
import MaskedInput from 'react-text-mask'
import { ErrorMessage } from "@hookform/error-message";

function InputCep(props) {

    return (
        <>
            <div className="input-container">
                <label>{props.label}:</label>
                <MaskedInput mask={props.mask} value={props.value} {...props.register(props.name, {
                    // validate vai executar uma arrow function com o valor do input como parametro (value)
                    validate: value => {
                        // retorna a funcao definida na props validation passando o valor do input como parametro 
                        // -> props.validation nesse caso sera a funcao de checagem de cep que recebera o valor do input como parametro
                        return props.validation(value) != false || props.required
                        // caso o retorno da funcao seja diferente de false, o input eh validado, caso contrario, exibe a mensagem de erro
                    }, required: props.required, maxLength: props.maxlength, minLength: props.minlength, pattern: { value: props.pattern, message: props.required }
                })} onChange={e => props.change(e)} onBlur={e => props.blur(e.target.value)} disabled={props.disabled} className="form-input" name={props.name} placeholder={props.placeholder} type={props.type} />
            </div>
            <ErrorMessage errors={props.errors} name={props.name} />
        </>
    )

}

export default InputCep