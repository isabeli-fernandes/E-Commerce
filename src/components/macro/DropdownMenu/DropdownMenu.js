import React from "react";
import "./DropdownMenu.css"
import { Accordion, Card, useAccordionButton } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap'
import Menu from "../../../assets/images/headers/Menu-de-Tres-Linhas.png"

export default function DropdownMenu(props) {

    function CustomToggle({ children, eventKey }) {
        const decoratedOnClick = useAccordionButton(eventKey, () =>
            console.log('totally custom!'),
        );

        return (
            <button
                type="button"
                onClick={decoratedOnClick}
                className="dropdown-button"
            >
                {children}
            </button>
        );
    }

    return (
        <>
            <Accordion defaultActiveKey="1" className={props.class}>
                <Card className="card-menu">
                    <Card.Header className="menu-dropdown-header">
                        <CustomToggle eventKey="0"><img src={Menu} className="img-dropdown" /></CustomToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body className="menu-dropdown-header">
                            <nav id="menu">
                                <ul className="dropdown-itens-menu align-content-center justify-content-center px-5 flex-column">
                                    <li><a href="/home">Home</a></li>
                                    <li><a href="/category">Catálogo</a></li>
                                    <li><a href="/sales">Promoções</a></li>
                                    <li><a href="/contact">Contato</a></li>
                                </ul>
                            </nav>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </>
    )

}