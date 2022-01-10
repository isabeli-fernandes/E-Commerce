import React from "react";

function SearchInfo(props) {
    return (
        <>  
        <div class="container resultado col-6 col-xs-8 col-sm-7 col-md-8 col-lg-6 info-resultado mt-2">
            <h2>Resultados para <span>"{props.product}"</span></h2>
        </div>
        </>
    );
}

export default SearchInfo;