
import React from 'react'

function SelectedFlag(props) {
    const Flag = props.Flags || []

    function getFlagtMethod() {
        return Flag.map(
            option =>  { 
                return <option key={option.id} value={option.id}>{option.description}</option>
         
            }
        )
    }

    return (
        <div className="input-container">
            <label>{props.label}</label>
            <select onChange={e => props.change(e)} className="form-input col-12">
                {getFlagtMethod()}
            </select>
        </div>
    )
}

export default SelectedFlag