import React, { useState } from "react"
import { Switch, Route } from "react-router-dom"

import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Category from './pages/Category/Category'
import Checkout from './pages/Checkout/Checkout'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import Product from './pages/Product/Product'
import Register from './pages/Register/Register'
import Success from './pages/Success/Success'
import NotFound from "./pages/NotFound/NotFound"
import Catalog from "./pages/Catalog/Catalog"
import Sales from "./pages/Sales/Sales"
import Search from "./pages/Search/Search"
import About from "./pages/About/About"
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword"
import Contact from "./pages/Contact/Contact"
import ProductNotFound from "./pages/ProductNotFound/ProductNotFound"
import OrderSummary from "./pages/OrderSummary/OrderSummary"
import Address from "./components/macro/Forms/Address/AddressForm"
import FormUser from "./components/macro/Forms/FormUser/FormUser"
import MeusPedidos from "./components/macro/MeusPedidos/MeusPedidos"
import NewPasswordForm from "./components/macro/Forms/FormForgotPassword/NewPasswordForm"
import NewPassword from "./pages/ForgotPassword/NewPassword"
import ProtectedRoute from "./ProtectedRoute"
import api from "./services/api"
import OrderSummaryRoute from "./components/macro/Route/OrderSummaryRoute"
import Ticket from "./components/macro/Ticket/Ticket"

export const Routes = () => {

    // isLogged recebe a resposta de getWithExpiry, 
    // caso a funcao retorne um valor, isLogged == true,
    // caso a funcao retorne null, isLogged == false
    const [isLogged, setLogged] = useState(getWithExpiry("token"))

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

    return (
        <Switch>
            {/* 
                ProtectedRoute se refere a rotas que so podem ser acessadas caso o usuario esteja logado,
                eh passado para a props isAuth o valor de isLogged para verificar se ira renderizar ou nao o componente
                (Obs.: ProtectedRoute criado na src do projeto)
             */}
            <Route path="/" component={Home} exact/>
            <Route path="/home" component={Home} exact/>
            <Route path="/login" component={Login} />
            <Route path="/product/:id" component={Product} />
            <Route path="/register" component={Register} />
        
            <Route path="/catalog/:category" component={Catalog} />
            <Route path="/sales" component={Sales} />
            <Route path="/search/:text" component={Search} />
            <Route path="/about" component={About} />
            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route path="/contact" component={Contact} />
            <Route path="/productnotfound" component={ProductNotFound} />
            <Route path="/cart" component={Cart} exact/>
            <Route path="/newpassword/:token" component={NewPassword}/>
            <Route path="/category" component={Category} />
            <Route path="/newpasswordform" component={NewPasswordForm}/>
            <Route path="/category" component={Category}/>
            {/* <OrderSummaryRoute path="/checkout" component={Checkout} /> */}
            <ProtectedRoute path="/checkout" component={Checkout} isAuth={isLogged} />
            <ProtectedRoute path="/dashboard" component={Dashboard} isAuth={isLogged} />
            {/* <ProtectedRoute path="/success" component={Success} isAuth={isLogged} /> */}
            {/* <ProtectedRoute path="/order" component={OrderSummary} isAuth={isLogged} /> */}
            <OrderSummaryRoute path="/success" component={Success} />
            <OrderSummaryRoute path="/order" component={OrderSummary} />
            <ProtectedRoute path="/addressform" component={Address} isAuth={isLogged} />
            <ProtectedRoute path="/formuser" component={FormUser} isAuth={isLogged} />
            <ProtectedRoute path="/myorder" component={MeusPedidos} isAuth={isLogged} />
            <Route path="/newpassword" component={NewPassword} />
            <Route path="/newpasswordform" component={NewPasswordForm} />
            <Route path="/ticket/:id" component={Ticket}/>

            <Route component={NotFound} />
        </Switch>
    )
}