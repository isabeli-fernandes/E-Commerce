import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css'
import AsideMenu from '../../components/macro/AsideMenu/AsideMenu';
import Address from '../../components/macro/Forms/Address/AddressForm';
import FormUser from '../../components/macro/Forms/FormUser/FormUser';
import MeusPedidos from '../../components/macro/MeusPedidos/MeusPedidos';


function Dashboard(props) {
    const newLocation = window.location.pathname

    function setLocation() {
        switch (newLocation) {
            case "/dashboard/address":
                return(
                    <Address />
                )
                break;
            case "/dashboard/myorder":
                return(
                    <MeusPedidos />
                    )
                break;
            default:
                return(
                    <FormUser />
                )
        }
    }

    return (
        <>
            <main className="conatiner-fluid custom-container py-5">

                <div className="row row-correction">
                    <AsideMenu />

                    <div className="row d-flex pe-0 justify-content-center col-md-9 col-12">
                        {setLocation()}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Dashboard