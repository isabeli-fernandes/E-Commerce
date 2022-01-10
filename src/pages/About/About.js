import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./About.css"
import H1 from "../../components/micro/Title/H1";
import H2 from "../../components/micro/Title/H2";
import Text from "../../components/micro/Text/Text";

function About(props) {
    return (
        <>
            <main className="container-fluid py-2 pb-3">

                <H1 h1="Sobre"/>

                <H2 className="pt-2" id="historia" h2="História"/>

                <Text class="text-center text-about" text="O antiquário Velho Luxo nasceu em 2021, com o intuito de facilitar o acesso a peças antigas àqueles que as amam. Surgindo assim um e-commerce, que abrange todo território nacional, e com foco na qualidade e atendimento ao cliente. "/>
        
                <Text class="text-center text-about" text="Oferecemos à todos os clientes, peças antigas e exclusivas, todas em ótimo estado. No nosso catálogo é possível encontrar móveis, porcelanas, cristais, luminárias, bronzes, mármores, relógios, obras de arte, tapetes e objetos de decoração."/>

                <Text class="text-center text-about" text= "Oferecemos atendimento personalizado com profissionais experientes e qualificados para satisfazer e dar o melhor a cada cliente."/>

                <Text class="text-center text-about" text= "Encontre no Antiquário Velho Luxo, peças únicas, às quais acrescentarão charme e elegância na sua decoração."/>

                <H2 className="pt-2" id="missao" h2="Missão"/>
     
                <Text class="text-center text-about"text= "Ter o maior acervo de peças no cenário nacional para atender os apreciadores de artes, antiguidades e afins."/>
            
                <H2 className="pt-2" id="visão" h2="Visão"/>
        
                <Text class="text-center text-about" text= "Ser um antiquário de referência com reconhecimento nacional."/>

            </main>

        </>
    )
}

export default About