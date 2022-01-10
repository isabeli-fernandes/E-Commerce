import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap'
import Button from "../Button/Button"
import Modal from 'react-bootstrap/Modal'

function ModalComp(props) {
    const [show, setShow] = useState(props.show);
   

    function handleClose() {
        setShow(false);
    }

    function handleClick(e) {
        e.preventDefault();
    }

    return (
        <>
            <form onClick={handleClick}>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{props.msg}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {props.info}
                        {props.info1}
                        {props.info2}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button label="Fechar" class="btn-voltar" variant="secondary" onclick={handleClose} />
                    </Modal.Footer>
                </Modal>

            </form>
        </>
    );
}

export default ModalComp