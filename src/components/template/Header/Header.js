import React, { useEffect, useState } from 'react'
import './Header.css'
import Logotipo from '../../micro/Logo/Logo'
import DropdownMenu from '../../macro/DropdownMenu/DropdownMenu'
import FormSearch from '../../macro/Forms/FormSearch/FormSearch'
import Profile from '../../micro/Profile/Profile'
import Bag from "../../micro/Bag/Bag"
import LoginButton from '../../micro/LoginButton/LoginButton'
import api from '../../../services/api'

function Header(props) {

    const location = window.location.pathname

    // login recebe a resposta invertida de getWithExpiry, 
    // caso a funcao retorne um valor, login == false,
    // caso a funcao retorne null, login == true
    const [login, setLogin] = useState();
    // login true significa que estamos deslogados, login false significa que estamos logados

    const removeUser = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    const changeState = () => {
        if (login) {
            if (getWithExpiry("token")) {
                setLogin(false);
            }
        } else {
            removeUser();
            setLogin(true);
        }
        compProfile();
    }

    // caso getWithExpiry retorne um valor, Profile eh renderizado, caso retorne null, nao
    const [perfil, setPerfil] = useState(getWithExpiry("token") ? <Profile /> : <></>)

    function compProfile() {
        setPerfil(getWithExpiry("token") ? <Profile /> : <></>)
    }

    // funcao getWithExpiry recebe uma chave da localStorage como parametro
    // retorna null caso nao atenda as condicoes de verificacao
    // retorna o valor da chave caso atenda as condicoes de verificacao
    function getWithExpiry(key) {

        // itemStr recebe a String do item armazenado na localStorage
        // (eh armazenada apenas a String do token)
        const tokenStr = localStorage.getItem(key)

        // se o item nao existir, returna null
        if (!tokenStr) {
            return null
        }

        // now recebe o horario do momento em que eh feita a requisicao
        const now = new Date()

        // api.get recebe no corpo o objeto JSON com o token e retorna em milisegundos o tempo de expiracao
        api.get("/login/" + tokenStr)
            .then(response => {
                // compara o tempo de expiracao do token com o tempo atual
                if (now.getTime() > response.data.expiration) {
                    // Se o token expirou, deleta o item da localStorage
                    // e returna null
                    localStorage.removeItem(key)
                    localStorage.removeItem("user")
                    return null
                }
            })
            .catch(err => {
                console.log(err)
                return null
            })

        // caso o token nao tenha expirado, retorna o valor da String do token
        return tokenStr
    }

    function getPerfil() {
        return perfil
    }

    useEffect(() => {
        getPerfil()
        setLogin(!getWithExpiry("token"))
    }, [])

    return (
        <>
            <header>
                <div className="container-fluid">
                    <div className="row header-row-ajust">

                        <div className="titulo-header col-lg-3 col-md-8 col-sm-7 col-4 justify-content-center">
                            <Logotipo home={location} />
                        </div>

                        <div className="form-pesquisa-header col-lg-6 d-lg-block d-none">
                            <FormSearch />
                        </div>


                        <LoginButton click={changeState} notLogged={login} />

                        {perfil}

                        <Bag />

                        <div className="container form-pesquisa col-10 d-lg-none d-block">
                            <FormSearch />
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-12">
                            <nav id="menu">
                                <ul className="align-content-center justify-content-center px-5 d-none d-sm-flex">
                                    <li><a href="/home">Home</a></li>
                                    <li><a href="/category">Categorias</a></li>
                                    <li><a href="/sales">Promoções</a></li>
                                    <li><a href="/contact">Contato</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>

                <DropdownMenu class="d-block d-sm-none" />

            </header>
        </>
    )
}

export default Header