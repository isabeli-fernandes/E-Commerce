import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Checkout.css'
import { useHistory } from 'react-router';
import FormShippigAddress from '../../components/macro/Forms/FormCheckout/FormShippigAddress';


function Checkout(props) {
 

    return (
        <>
            <main class="container-fluid mb-4">
                
                <FormShippigAddress />

            </main>
        </>
    )
}

export default Checkout