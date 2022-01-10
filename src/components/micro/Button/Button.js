import React from 'react'
import './Button.css'
import { Link } from 'react-router-dom'

function Button(props) {
    function clickDvent(e) {
        e.preventDefault();
        if (props.onclick) {
            props.onclick()
        }

    }
    const typeButton = () => {
        if (props.navigation) {
            return (
                <Link to={props.route} className={"btn-custom-default " + props.class}>
                    {props.label}
                </Link>
            )
        } else {
            return (
                <button type={props.type} onClick={e => clickDvent(e)} className={"btn-custom-default " + props.class} disabled={props.disabled}>
                    {props.label}
                </button>
            )
        }
    }

    return (
        <>
            {typeButton()}
        </>
    )
}

export default Button