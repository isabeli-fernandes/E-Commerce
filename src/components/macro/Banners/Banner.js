import React from 'react'
import { Carousel } from 'react-bootstrap'
import  Banner1  from '../../../assets/images/banners/banner-1.jpg'
import  Banner2  from '../../../assets/images/banners/banner-2.jpg'
import  Banner3  from '../../../assets/images/banners/banner-3.jpg'
import  Banner4  from "../../../assets/images/banners/banner-4.jpg"
import { Link } from 'react-router-dom'

function Banner(props) {

    return (
        <>
            <Carousel variant="dark">
                <Carousel.Item>
                    <Link to="/category">
                    <img
                        className="d-block w-100"
                        src={Banner1}
                        alt="First slide"
                    /></Link>
                </Carousel.Item>
                <Carousel.Item>
                    <Link to="/sales">
                    <img
                        className="d-block w-100"
                        src={Banner2}
                        alt="Second slide"
                    /></Link>
                </Carousel.Item>
                <Carousel.Item>
                    <a href="#novidades">
                    <img
                        className="d-block w-100"
                        src={Banner3}
                        alt="Third slide"
                    /></a>
                </Carousel.Item>
                <Carousel.Item>
                    <Link to="/catalog/Diversos">
                    <img
                        className="d-block w-100"
                        src={Banner4}
                        alt="Fourth slide"
                    /></Link>
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default Banner