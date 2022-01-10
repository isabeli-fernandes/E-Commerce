import React from 'react'

function SelectByFilter(props) {
    const options = props.options || []


    function getOptions(){
        return options.map(
            function(option){
                if (props.selected == option.id) {
                    return <option selected="selected" key={option.id} value={option.id}>{option.subjectDescription}</option>
                } else {
                    return <option key={option.id} value={option.id}>{option.subjectDescription}</option>
                }
            }
        )
    }

    if (props.selected) {
        return(
            <div className="input-container">
                <label>{props.label}</label>
                <select onChange={e => props.change(e)} disabled={props.disabled} className="form-input col-12">
                    {getOptions()}
                </select>
            </div>
        )
    } else {
        return(
            <div className="input-container">
                <label>{props.label}</label>
                <select onChange={e => props.change(e)} disabled={props.disabled} className="form-input col-12">
                    {getOptions()}
                </select>
            </div>
        )
    }
    
}

export default SelectByFilter