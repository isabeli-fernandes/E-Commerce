import React, { useState, useEffect } from "react";
import Input from "../../../micro/Forms/Input/Input";
import Button from "../../../micro/Button/Button"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import api from "../../../../services/api";

function FormLogin(props) {

    const history = useHistory()

    function test() {
        return window.location.href= "/cart";
    }

    const addUser = (userMail) => {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        }

        api.get(`/user/email/${userMail}`, config)
        .then(
            res => {
                const now = new Date()

                const item = {
                    value: res.data,
                    expiry: now.getTime() + (1000 * 60 * 60 * 10)
                }
                localStorage.setItem("user", JSON.stringify(item));
                test();
            },
            err => {
                console.log(err);
            }
            
        )
        
    }

    function logar(userMail) {
        addUser(userMail);
    }

    const [email, setEmail] = useState("")
    const [password1, setPassword] = useState("")

    function postApi(data) {
        api.post("/login", data)
        .then(res => {
            localStorage.setItem("token", res.data.jwt)
            logar(res.data.email)
        })
        .catch(err => {
            alert("Senha ou e-mail incorreto, tente novamente.")
            console.log(err)
        })
    }

    const handleSubmit = () => {

        const data = ({
            username: email,
            password: password1
        })

        postApi(data)
    }
    
    return (
        <>
            <div className="container custom-form-div py-2">

                <div className="row custom-form d-flex justify-content-center">
                    <div className="col-10 col-sm-8 col-md-7 col-lg-5">
                        <Input change={e => setEmail(e.target.value)} label="E-mail" className="form-input form-control col-12 form-label" type="email" id="email" placeholder="Digite seu e-mail..." />
                    </div>
                </div>

                <div className="row custom-form d-flex justify-content-center">
                    <div className="col-10 col-sm-8 col-md-7 col-lg-5">
                        <Input change={e => setPassword(e.target.value)} label="Senha" type="password" className="form-label form-control form-input col-12 " id="senha" placeholder="Digite sua senha..." />
                    </div>
                    <small className="text-center my-0 mb-2">Esqueceu a senha? <Link to="/forgotpassword">  Recuperar</Link></small>
                </div>

                <div className="row justify-content-center">
                    <Button label="Entrar" onclick={handleSubmit} navigation="" class="btn-confirmacao" type="submit" />

                    <p className="mt-3 mb-1 text-center">Ainda não tem cadastro?</p>
                    <Button label="Cadastrar"  class="btn-confirmacao" navigation route="./register" />
                </div>
            </div>
        </>
    )
}

export default FormLogin