import React from 'react'
import CategoryLeft from "../../components/micro/categories/CategoriesLeft"
import CategoryRight from '../../components/micro/categories/CategoriesRight'
import Quarto from "../../assets/images/category/quarto.jpg"
import Cozinha from "../../assets/images/category/loucasPortuguesas.jpg"
import Sala from "../../assets/images/category/sala.jpg"
import Diversos from "../../assets/images/category/diversos.jpg"

function Category(props) {

    return(
        <>
        <h1>Categorias</h1>
        <CategoryLeft image={Quarto} category="Quarto" description="Encontre armários, penteadeiras e objetos para decorar seu quarto."/>
        <CategoryRight image={Cozinha} category="Cozinha" description="Louças, mesas, armários  e muito mais para sua cozinha."/>
        <CategoryLeft image={Sala} category="Sala" description="Aparadores, sofás, objetos decorativos para valorizar sua sala."/>
        <CategoryRight image={Diversos} category="Diversos" description="Tudo de mais diferente e único está aqui."/>

        </>
    )
}

export default Category