import React from "react";
import { Route, Redirect } from "react-router-dom"

// isAuth recebe true ou false de acordo com o que eh passado, 
// component eh o componente que desejamos renderizar,
// ...rest sao quaisquer outros parametros passados para o componente
function ProtectedRoute({ isAuth: isAuth, component: Component, ...rest }) {
    
    return(
        // Route eh a route padrao, render ira renderizar o componente ou o redirect, de acordo com a condicao
        <Route {...rest} render={(props) => {
            if (isAuth) {
                return <Component />
            } else {
                return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            }
        }} />
    )
}

export default ProtectedRoute