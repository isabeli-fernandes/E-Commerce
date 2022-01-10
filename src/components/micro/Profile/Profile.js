import React from "react";
import Perfil from "../../../assets/images/headers/user.png"

function Profile(props) {
    return (
        <>
            <div className="perfil-link col-2 col-lg-1">
                <a href="/dashboard" className="perfil-bloco">
                    <img className="perfil-imagem" src={Perfil} />
                    <div href="/dashboard" className="perfil-nome"><b>Perfil</b></div>
                </a>
            </div>
        </>
    )

}

export default Profile