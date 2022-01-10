import React from 'react';

import Payment from '../../../assets/images/tracking/pagar.png'
import Separando from '../../../assets/images/tracking/packaging.png'
import Rota from '../../../assets/images/tracking/enviado.png'
import './Tracking.css'


function TrackingPack(props) {


    return <>
        <div className="container">
            <div className="row">
               
                    <div className=" col-12 custom-tracking ">
                        
                        <div className="row justify-content-center">
                            <div className={"col-2 line default-line align-self-center default-line-initial "+ "completedTask" }>
                            </div>
                            <div className={"col-1 tracking-img-col " }>
                                <img src={Payment} className={ props.status > 1? "completedTask images-tracking": " images-tracking" }/>
                            </div>
                            <div className={props.status > 1?"col-2 line default-line align-self-center completedTask ": "col-3 line default-line align-self-center"}>
                            </div>
                            <div className="col-1 tracking-img-col">
                                <img src={Separando}  className={ props.status > 2? "completedTask images-tracking": " images-tracking" }/>
                            </div>
                            <div className={props.status > 2?"col-2 line default-line align-self-center completedTask ": "col-3 line default-line align-self-center"}>
                            </div>
                            <div className="col-1 tracking-img-col">
                                <img src={Rota} className={ props.status > 3? "completedTask images-tracking": " images-tracking" } />
                            </div>


                           
                        </div>
                    </div>

               

                

            </div>

        </div>

    </>
}
export default TrackingPack