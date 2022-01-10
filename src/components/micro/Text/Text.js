import React from 'react'

function Text(props) {

    return(
        <>
            <p className={props.class}>{props.text}</p>
        </>
    )
}

export default Text