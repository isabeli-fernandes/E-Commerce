import React, { useState } from 'react';
import CardProduct from '../Cards/Products/CardProduct';

function ListProductsCatalogy(props){
    const products = props.products || []
    
    
    
    function image(image) {
        
            var imgSrc = require(`../../../assets/images/products/${image}`);
            
            return  imgSrc.default
            
    }

    function listProducts(){
        return products.map(product =>{
            return <>
            <CardProduct
            id={product.product.id}
            image={product.product.image}
            product={product.product.product}
            year={product.product.year}
            price={(product.price)}
            salePrice={(product.salePrice)}
            qty={(product.qty)}
            
            />
            </>
        })
    }

    return<>
        <ul className="row lista-cards  tamanho  mb-3 justify-content-around">
        
            {listProducts()}
       
        </ul>
    
    </>

}
export default ListProductsCatalogy;