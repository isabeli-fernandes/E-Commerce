import React, { useState, useEffect } from "react";
import './Search.css';
import Select from "../../components/micro/Forms/Select/Select";
import SearchInfo from "../../components/micro/SearchInfo/SearchInfo";
import api from "../../services/api";
import ListProductsCatalogy from "../../components/macro/listProducts/ListProductsCatalogy";
import ProductNotFoundComp from "../../components/macro/ProductNotFoundComp/ProductNotFoundComp";

export default function Search(props) {
    const text = props.match.params.text;

    const [search, setSearch] = useState()
    const [filter, setFilter] = useState([
        { id: 1, subjectDescription: "Menor Valor" },
        { id: 2, subjectDescription: "Maior Valor" },
        { id: 3, subjectDescription: "Maior Desconto" },
   
    ])

    useEffect(() => {
        api
            .get("/search/product?description=" + text)
            .then((response) => {
                setSearch(response.data)
            })
            .catch((err) => {
                console.error("Erro ao consumir api de search" + err);
            });
    }, []);


    function setTag() {
        if (search != 0) {
            return (
                <ListProductsCatalogy products={search} />
            )

        } else {
            return (
                <ProductNotFoundComp search={text} />
            )
        }

    }

    return (
        <>
            <section>
                <div class="container">
                    <div class="row">

                        <SearchInfo product={text} />
                        <div className="row row-correction form-filter">
                            <form action="" class="row justify-content-md-end justify-content-center mb-3">
                                {/* <div className="col-md-3 col-6 mx-4" >
                                    <Select label="Ordenar por: " default="Selecione o Filtro" options={filter} />
                                </div> */}

                            </form>
                        </div>

                    </div>

                    <ul className="row lista-cards catalogo tamanho mb-3">

                        {setTag()}

                    </ul>

                </div>

            </section>
        </>

    )

}