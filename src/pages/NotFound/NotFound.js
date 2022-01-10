import React from 'react'
import errorImage from "../../assets/images/notFound/errorImage.png"

function NotFound(props) {

    return(
        <>
        <div>
            <img src={errorImage} alt="404ERRORNOTFOUND"/>
        </div>
        </>
    )
}

export default NotFound