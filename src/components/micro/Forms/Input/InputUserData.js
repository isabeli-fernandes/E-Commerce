import React from 'react'
import './Input.css'
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import InputMask from "react-input-mask";

function InputHook(props) {

    if (props.hook) {
        return (
            <>
                <div className="input-container">
                    <label>{props.label}:</label>
                    <input disabled={props.disabled} value={props.value} maxLength={props.maxlength} {...props.register(props.name, { required: props.required, maxLength: props.maxlength, minLength: props.minlength, pattern: { value: props.pattern, message: props.required }, })} onChange={e => props.change(e)} className={`form-input ${props.border}`} name={props.name} placeholder={props.placeholder} type={props.type} />
                    
                </div>
                <ErrorMessage errors={props.errors} name={props.name} />
            </>
        )
    } else if (props.mask) {
        return (
            <>
                <div className="input-container">
                    <label>{props.label}:</label>
                    <InputMask disabled={props.disabled} value={props.value} mask={props.mask} {...props.register(props.name, { required: props.required, maxLength: props.maxlength, minLength: props.minlength, pattern: { value: props.pattern, message: props.required } })} onChange={e => props.change(e)} className={`form-input ${props.border}`} name={props.name} placeholder={props.placeholder} type={props.type} />
                        
                </div>
                <ErrorMessage errors={props.errors} name={props.name} />
            </>
        )
    }


}

export default InputHook