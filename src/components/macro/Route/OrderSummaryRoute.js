import { Route, Redirect } from "react-router-dom";

const OrderSummaryRoute = ({component: Component, ...rest}) => {

    return (
        <Route {...rest} render={(props) => {
            return props.location.state !== undefined 
            ? <Component {...props} />
            : <Redirect to={{pathname: "dashboard/myorder", state : {from : props.location}}} />
        }} />
    )

}

export default OrderSummaryRoute