import React from 'react'
import './H2.css'

function H2(props) {

    return(
        <>
            <h2 className={props.class}>{props.h2}</h2>
        </>
    )
}

export default H2