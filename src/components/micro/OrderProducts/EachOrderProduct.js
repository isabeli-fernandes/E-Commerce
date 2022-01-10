import React from 'react';
function EachItemOrderProduct(props) {
    const item = props.item || {}
    function imgRender(){
        
        var img = require(`../../../assets/images/products/${item.productsDTO.image}`)
        
        return <img src={`${img.default}`} className="imagePedido" />
    }

    return <>
        

            <div className="container-fluid backGroundCustom ">
                <div className="row m-0">
                    <div className="col-3">
                        {imgRender()}
                    </div>
                    <div className="col-8">
                        {item.productsDTO.product}
                    </div>
                    <div className="col-1">
                        {"Qtd: " + item.quantity}
                    </div>

                </div>

            </div>

        
    </>

}
export default EachItemOrderProduct;