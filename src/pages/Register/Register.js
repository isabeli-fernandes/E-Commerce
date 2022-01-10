import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css'
import FormDefault from '../../components/macro/Forms/FormDefault/FormDefault'
import FormRegister from '../../components/macro/Forms/FormRegister.js/FormRegister';

function Register(props) {

    const customSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <section className="container-fluid px-sm-5 py-3 custom-container">
                
                <FormDefault title="Faça seu Cadastro" action="#" className="custom-form-box mx-3 mx-sm-1 mx-lg-4 px-5 px-sm-1 px-lg-4">
                
                    <FormRegister/>

                </FormDefault>
            </section>
        </>
    )
}

export default Register