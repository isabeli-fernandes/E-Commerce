import React from 'react'
import './H3.css'

function H3(props) {

    return(
        <>
            <h3 className={props.class}>{props.h3}</h3>
        </>
    )
}

export default H3