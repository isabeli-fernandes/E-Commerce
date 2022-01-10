import React, { useState } from 'react'

function RadioButton(props) {

    return (

        <div className={props.className}>
            <div className="row d-flex justify-content-between">

                <input name={props.name}
                    type="radio"
                    value={props.id}
                    id={props.id}
                    value={props.id}
                    checked={props.checked}
                    onChange={props.onChange}
                    className="col-3 mt-1">
                </input>

                <a href="" onClick={props.onClick} className="col-3 mt-1">
                    <img src={props.src} className={props.clname} />
                </a>

            </div>

            <div className="row">

                <label className="d-flex justify-content-center" for={props.id}>{props.label}</label>

            </div>


            <p>{props.street} {props.number} {props.complement}</p>
            <p>{props.district} {props.city} {props.state}</p>
            <p>CEP: <span className={props.class}>{props.cep}</span></p>
            <p>{props.reference}</p>

        </div>
    )
}

export default RadioButton