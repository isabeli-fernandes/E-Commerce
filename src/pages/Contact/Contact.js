import React from 'react';
import { useEffect, useState } from 'react';
import api from '../../services/api'
import FormContact from '../../components/macro/Forms/FormContact/FormContact';

function Contact(props) {
    const [options, setOptions] = useState()

    useEffect(() => {
        window.scroll(0, 0)
        api.get("/subjects").then((response) => setOptions(response.data)).catch((err) => {
            console.error("Erro ao consumir api de subjects" + err)
        })
    }, [])

    return <>

        <section className="container-fluid container-form px-sm-5 my-3 py-3">
            <FormContact options={options}/>
        </section>

    </>
}
export default Contact;