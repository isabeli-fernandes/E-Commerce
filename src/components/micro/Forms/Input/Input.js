import React from 'react'
import './Input.css'

function Input(props) {

    if (props.change) {
        return (
            <>
            <div className={"input-container " + props.classCustom}>
                <label>{props.label}:</label>
                <input value={props.value} onChange={e => props.change(e)} disabled={props.disabled} className="form-input" name={props.name} placeholder={props.placeholder} type={props.type} max={props.max} min={props.min}  maxLength={props.maxlength}/>
            </div>
            </>
        )
    } else {
        return(
            <>
            <div className={"input-container " + props.classCustom}>
                <label>{props.label}:</label>
                <input value={props.value} disabled={props.disabled} className="form-input" name={props.name} placeholder={props.placeholder} type={props.type} max={props.max} min={props.min}  maxLength={props.maxlength}/>
            </div>
            </>
        )
    }

    
}

export default Input