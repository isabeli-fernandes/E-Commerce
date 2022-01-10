import React, { useEffect, useState } from "react";
import './Catalog.css';
import ListProductsCatalogy from "../../components/macro/listProducts/ListProductsCatalogy";
import Button from "../../components/micro/Button/Button";
import H1 from "../../components/micro/Title/H1";
import api from "../../services/api";
import SelectByFilter from "../../components/micro/Forms/Select/SelectByFilter";

export default function Catalog(props) {

    const category = props.match.params.category;
    const [products, setProducts] = useState()
    const [filter, setFilter] = useState([
        { id: 1, subjectDescription: "Menor Valor" },
        { id: 2, subjectDescription: "Maior Valor" },
        { id: 3, subjectDescription: "Maior Desconto" },
        { id: 4, subjectDescription: "Nome A-Z" },
        // { id: 5, subjectDescription: "Mais Novo" },
    ])
    const [renderList, setRenderList] = useState(<ListProductsCatalogy products={products} />)

    function renderProduct() {
        api
            .get("/products/category/" + category)
            .then((response) => {
                setProducts(response.data)
                setRenderList(<ListProductsCatalogy products={response.data} />)
            })
            .catch((err) => {
                console.error("Erro ao consumir api de products" + err);
            });
    }

    useEffect(() => {
        renderProduct()
        window.scrollTo(0, 0);
    }, []);

    // Preço ordem alfabética
    function filterName() {
        var productTemp = products
        productTemp.sort(function (a, b) {
            if (a.product.product > b.product.product) {
                return 1
            }
            if (a.product.product < b.product.product) {
                return -1
            }
        })

        setProducts(productTemp)
    }

    // Preço menor para o maior
    function filterAsc() {
        var productTemp = products
        productTemp.sort(function (a, b) {
            if (a.price < b.price) {
                return 1
            }
            if (a.price > b.price) {
                return -1
            }
        })

        setProducts(productTemp)
    }

    // Preço maior para o menor
    function filterDesc() {
        var productTemp = products
        productTemp.sort(function (a, b) {
            if (a.price > b.price) {
                return 1
            }
            if (a.price < b.price) {
                return -1
            }
        })
        setProducts(productTemp)
    }

    // Promoções
    function filterSale() {
        var productTemp = products
        productTemp.sort(function (a, b) {
            if (a.salePrice < b.salePrice) {
                return 1
            }
            if (a.salePrice > b.salePrice) {
                return -1
            }
        })
        setProducts(productTemp)
    }

    function setProductBy(e) {

        if (e == 1) {
            filterDesc()
            return setRenderList(<ListProductsCatalogy products={products} />)

        } else if (e == 2) {
            filterAsc()
            return setRenderList(<ListProductsCatalogy products={products} />)

        } else if (e == 3) {
            filterSale()
            return setRenderList(<ListProductsCatalogy products={products} />)

        } else if (e == 4) {
            filterName()
            return setRenderList(<ListProductsCatalogy products={products} />)

        } else {
            renderProduct()
            return setRenderList(<ListProductsCatalogy products={products} />)
        }


        // } else if (filter.id == 5){

        // }
    }


    return (
        <>
            <div className="row justify-content-center mb-3 p-0 mx-0">
                <H1 h1={`${category}`} />
                <div className="col-9 linha-divisoria "></div>
            </div>

            <form action="" class="row justify-content-md-end justify-content-center mb-3">
                <div className="col-md-3 col-6 mx-4" >
                    {/* <Filter></Filter> */}
                    <SelectByFilter label="Ordenar por: " options={filter} change={e => setProductBy(e.target.value)} default="Ordernar:" />
                </div>
            </form>

            <div className="container container-cards my-4">
                {renderList}
            </div>

            <div className="ver-mais row justify-content-center tamanho pb-3">
                {/* <Button route="" class="btn-ver-mais" label="VER MAIS" /> */}
            </div>
        </>
    )
}