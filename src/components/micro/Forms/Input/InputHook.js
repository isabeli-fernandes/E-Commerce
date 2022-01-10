import React from 'react'
import './Input.css'
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import InputMask from "react-input-mask";
import MaskedInput from 'react-text-mask'

function InputHook(props) {

    if (props.hook) {
        return (
            <>
                <div className="input-container">
                    <label>{props.label}:</label>
                    {props.change
                        ? <input value={props.value} maxLength={props.maxlength} {...props.register(props.name, { required: props.required, maxLength: props.maxlength, minLength: props.minlength, pattern: { value: props.pattern, message: props.required }, onChange: e => props.change(e) })} className={`form-input ${props.border}`} name={props.name} placeholder={props.placeholder} type={props.type} disabled={props.disabled} />
                        : <input value={props.value} maxLength={props.maxlength} {...props.register(props.name, { required: props.required, maxLength: props.maxlength, minLength: props.minlength, pattern: { value: props.pattern, message: props.required } })} className={`form-input ${props.border}`} name={props.name} placeholder={props.placeholder} type={props.type} disabled={props.disabled}/>
                    }
                </div>
                <ErrorMessage errors={props.errors} name={props.name} />
            </>
        )
    } else if (props.validation) {
        return (
            <>
                <div className="input-container">
                    <label>{props.label}:</label>
                    {props.change
                        ? <InputMask mask={props.mask} {...props.register(props.name, { onChange: e => props.change(e),
                            // validate vai executar uma arrow function com o valor do input como parametro (value)
                            validate: value => {
                                // retorna a funcao definida na props validation passando o valor do input como parametro 
                                return props.validation(value) === true || props.message
                                // caso o retorno da funcao seja diferente de false, o input eh validado, caso contrario, exibe a mensagem de erro
                            }, required: props.required, maxLength: props.maxlength, minLength: props.minlength,
                            pattern: { value: props.pattern, message: props.required }
                        })}
                            className={`form-input ${props.border}`} name={props.name} placeholder={props.placeholder} type={props.type} />

                        : <InputMask mask={props.mask} {...props.register(props.name, { required: props.required, maxLength: props.maxlength, minLength: props.minlength, pattern: { value: props.pattern, message: props.required } })} className={`form-input ${props.border}`} name={props.name} placeholder={props.placeholder} type={props.type} />
                    }
                </div>
                <ErrorMessage errors={props.errors} name={props.name} />
            </>
        )
    } else if (props.confirm) {
        return (
            <>
                <div className="input-container">
                    <label>{props.label}:</label>
                    <input {...props.register(props.name, {
                        validate: value => {
                            return value === props.watch("senha") || <span className="text-danger">As senhas não coincidem</span>
                        }
                    })
                    } onBlur={e => props.blur(e)} className="form-input" name={props.name} placeholder={props.placeholder} type={props.type} />
                </div>
            </>
        )
    } else if (props.mask) {
        return (
            <>
                <div className="input-container">
                    <label>{props.label}:</label>
                    {props.change
                        ? <InputMask mask={props.mask} {...props.register(props.name, { required: props.required, maxLength: props.maxlength, minLength: props.minlength, pattern: { value: props.pattern, message: props.required }, onChange: e => props.change(e) })} className={`form-input ${props.border}`} name={props.name} placeholder={props.placeholder} type={props.type} />
                        : <InputMask mask={props.mask} {...props.register(props.name, { required: props.required, maxLength: props.maxlength, minLength: props.minlength, pattern: { value: props.pattern, message: props.required } })} className={`form-input ${props.border}`} name={props.name} placeholder={props.placeholder} type={props.type} />
                    }
                </div>
                <ErrorMessage errors={props.errors} name={props.name} />
            </>
        )
    }


}

export default InputHook