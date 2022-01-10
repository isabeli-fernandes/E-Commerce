import React, { useEffect, useState } from "react";
import EachItemOrderProduct from "./EachOrderProduct";
export default function OrderProducts(props) {
    

    function renderItems() {

     
        return props.options.map(
            function (item) {
                return (
                    <>
                    <li key={item.id} className="col-12 meu-pedido-item item-pedido-box p-2 mb-2">
                   <EachItemOrderProduct key={item.productsDTO.id} item = {item}/>

                    </li>
                    </>
                )
            }
        )
    }

    return (
        <>
            {renderItems()}
        </>
    )

}