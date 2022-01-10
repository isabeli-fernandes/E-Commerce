
import ListProduct from '../Cards/Products/CardProduct'
import React, { useState, useEffect } from 'react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './listProductsCarroussel.css'



function ListProducts(props) {
    const products = props.products || []
    const [width, setWidth] = useState()
    const [visibleSlide, setVisibleSlide] = useState(5)


    function windowSize() {
        var widthNow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        setWidth(widthNow);
    }

    window.addEventListener('resize', () => {
        // foi necessario colocar um time para não ficar em loop infinito
        setTimeout(
            () => {

                windowSize(() => setSlide(width))


            }, 1000)

    });
    useEffect(() => {
        windowSize(setSlide(width))

    }
    )



    function setSlide(current) {
        if (current > 1250) {
            setVisibleSlide(5)
        } else if (current < 1250 && current > 1000) {
            setVisibleSlide(4)

        } else if (current < 1000 && current > 800) {
            setVisibleSlide(3)
        } else if (current < 800 && current > 570) {
            setVisibleSlide(2)
        } else {
            setVisibleSlide(1)
        }

    }



    let index = 0

    //consome e faz o map do array
    function listarProdutos() {


        return products.map(
            function (product) {

                return (<>
                    <Slide index={index = index++}  >

                        <div className="row lista-cards  tamanho  mb-3 justify-content-center">
                            <ListProduct  id={product.product.id} image={product.product.image} year={product.product.year} product={product.product.product} price={product.price} salePrice={product.salePrice}
                                qty={product.qty} />
                        </div>

                    </Slide>


                </>
                )
            }
        )
    }



    return <>

        <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={100}
            totalSlides={products.length}
            infinite={true}
            isPlaying={true}
            interval={2500}
            step={2}
            isIntrinsicHeight={true}
            visibleSlides={visibleSlide}
            className=" container-fluid "
        >
            <div className="row justify-content-around">
                <ButtonBack className="col-1 customButtonCarroussel text-center">{"<"}</ButtonBack>

                <Slider className="col-md-10 col-8">
                    {listarProdutos()}


                </Slider>
                <ButtonNext className="col-1 customButtonCarroussel text-center">{">"}</ButtonNext>
            </div>

        </CarouselProvider>
    </>

}

export default ListProducts