import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react'
import './Cart.css'
import CartItemsComp from '../../components/macro/CartItemsComp/CartItemsComp';
import api from '../../services/api';



function Cart(props) {

    // login recebe a resposta invertida de getWithExpiry, 
    // caso a funcao retorne um valor, login == false,
    // caso a funcao retorne null, login == true
    const [login, setLogin] = useState(!getWithExpiry("token")); 
    // login true significa que estamos deslogados, login false significa que estamos logados

    const changeState = () => {
        if (login) {
            if (getWithExpiry("token")) {
                setLogin(false);
            }
        }
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
                    window.location.reload()
                    return null
                }
            })
            .catch(err => {
                localStorage.removeItem(key)
                localStorage.removeItem("user")
                window.location.reload()
                return null
            })

        // caso o token nao tenha expirado, retorna o valor da String do token
        return tokenStr
    }

    useEffect(() => {
        // getWithExpiry("token")
    })

    return (
        <>
            <CartItemsComp click={changeState} logged={login} />
        </>
    )
}

export default Cart