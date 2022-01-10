import React, { useState, useEffect} from 'react'
import './Home.css'
import ListProducts from '../../components/macro/listProducts/ListProductsCarroussel'
import Banners from '../../components/macro/Banners/Banner'
import Emphasis from '../../components/macro/Cards/Products/CardProductEmphasis'
import api from '../../services/api'
import CarrousselEmphasis from '../../components/macro/Cards/Products/EmphasisCarroussel'

function Home(props) {
    const[offers, setOffers] = useState()
    const[news,setNews] = useState()
    const[emphasis,setEmphasis] = useState()

    function emphasisRender(){
        api.get("/products/emphasis").then((response) => {setEmphasis(response.data)}).catch((error) => console.log("Erro ao carregar newer "+ error))
    }
    
    function offersData(){
        api.get("/products/offers").then((response) => {setOffers(response.data)
            }).catch((error) => console.log("Erro ao carregar api de offers"+error))
    }
    function newlestData(){
        api.get("/products/recentlyAdd").then((response) => {setNews(response.data)}).catch((error) => console.log("Erro ao carregar newer "+ error))
    }
    useEffect(() => {
        window.scroll(0, 0)
        offersData()
        newlestData()
        emphasisRender()
    },[])

    return (
        <>

            <Banners />
            <h2 className="home-titles mt-4">Promoções</h2>

            {/* <!-- Inicio lista cards produtos promocoes--> */}

               
            <ListProducts products ={offers}/>
     
            {/* <!-- Fim lista cards produtos promocoes --> */}


            {/* <!-- INÍCIO DESTAQUES --> */}

            <h2 className="mt-3 home-titles mb-4">Destaques</h2>
            <CarrousselEmphasis products={emphasis}/>
      

            {/* <!-- FINAL  DESTAQUES --> */}

            <h2 id="novidades">Novidades</h2>

            {/* <!-- Inicio lista cards produtos novidades --> */}
        
                <ListProducts products={news}/>
          

        </>
    )
}

export default Home