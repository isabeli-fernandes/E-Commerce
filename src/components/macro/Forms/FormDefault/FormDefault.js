import React from 'react'
import './FormDefault.css'

function FormDefault(props) {

    if (props.submit) {
        return(
            <>
                <div className={props.class}>
                    <h1 className="custom-title">{props.title}</h1>
    
                    <form onSubmit={e => props.submit(e)} className={props.formClass} action={props.action}>
                        {props.children}
                    </form>
                </div>
            </>
        )
    } else {
        return(
            <>
                <div className={props.class}>
                    <h1 className="custom-title">{props.title}</h1>
    
                    <form className={props.formClass} action={props.action}>
                        {props.children}
                    </form>
                </div>
            </>
        )
    }
}

export default FormDefault