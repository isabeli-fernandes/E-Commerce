import React, { useState, useEffect} from 'react'
import RadioButton from '../../micro/Forms/Radio/RadioButton'
import "./UserAddress.css"
import Remove from "../../../assets/images/cart/remover.png"
import api from '../../../services/api'

function UserAddress(props) {
    const address = props.userAddress || []
    const [ads, setAds] = useState();

    const handleChange = e => {
        const target = e.target;
        if (target.checked) {
            props.function(target.value)
            setAds(target.value);
        }
    }

    // Deletar endereço
    const [delAddress, setDeleteAddress] = useState()

    function deleteAddress(id) {
        var idUser = JSON.parse(localStorage.getItem("user"))
        api.delete("/userAddress/delAddress/" + idUser.value.id + "/" + id)
            .then((response) => {
                console.log(response)
                alert("Seu endereço foi excluído com sucesso!")
                window.location.reload();
            })
            .catch((err) => {
                console.error("Erro ao excluir endereço" + err)
                alert("Erro ao excluir endereço!")
            })
    }

    function renderUserAddress() {

        return address.map(userAddress => {
            return <RadioButton
                className="col-lg-3 col-md-5 col-10 new-address "
                name="radioDefault"
                class="custom-cep-radio"
                inline
                value={userAddress.id.idAddress}
                checked={ads == userAddress.id.idAddress}
                onChange={handleChange}
                id={userAddress.id.idAddress}
                for={userAddress.id.idAddress}
                label={userAddress.description}
                src={Remove}
                street={userAddress.address.street + ", "}
                number={userAddress.address.number + " - "}
                complement={userAddress.address.complement}
                district={userAddress.address.district + ",  "}
                city={userAddress.address.city + " - "}
                state={userAddress.address.state}
                cep={userAddress.address.cep}
                reference={"Referência: " + userAddress.address.reference}
                clname="button-remove-address"
                onClick={e => {
                    e.preventDefault()
                    deleteAddress(userAddress.id.idAddress)
                }}
            />

        })
    }
    console.log(ads)

 

    return <div className="container">

        <div className="mb-3 mt-3 row d-flex justify-content-around">

            {renderUserAddress()}
            {props.children}

        </div>

    </div>


}
export default UserAddress