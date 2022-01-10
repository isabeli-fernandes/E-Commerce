import React, { useState } from "react";
import "./Logo.css";
import Logo from '../../../assets/images/headers/velho-luxo.png'
import Logo2 from '../../../assets/images/headers/vl.png'

export default function Logotipo(props) {

    const logoTitle = () => {
        if (props.home == "/home" || props.home == "/") {
            return (
                <>
                    <h1 className="title-logo">
                        <a href="/" className="logo-marca" title="Velho Luxo">
                            <img className="logo d-sm-flex d-none" alt="Velho Luxo"
                                src={Logo} />
                            <img className="logo-2 d-flex d-sm-none" alt="Velho Luxo"
                                src={Logo2} />
                        </a>
                    </h1>
                </>
            )
        } else {
            return (
                <>
                    <a href="/" className="logo-marca" title="Velho Luxo">
                        <img className="logo d-sm-block d-none" alt="Velho Luxo"
                            src={Logo} />
                        <img className="logo-2 d-block d-sm-none" alt="Velho Luxo"
                            src={Logo2} />
                    </a>
                </>
            )
        }
    }

    return logoTitle()

}