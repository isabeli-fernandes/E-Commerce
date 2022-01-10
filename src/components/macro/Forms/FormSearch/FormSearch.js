import React, {useState}from "react"
import Lupa from "../../../../assets/images/headers/lupa.png"

function FormSearch(props) {

    const [word, setWord] = useState()

    return (
        <>
            <form action="/search" onSubmit={e => {e.preventDefault()
                word != undefined
                ?window.location.href="/search/"+word
                :setWord(undefined)}}>
                <div className="container">
                    <div className="row">
                        <div className="pesquisa-btn mx-0 col-11">
                            <input type="text" className="pesquisa" placeholder="O que deseja colecionar?" value={word} onChange={e => setWord(e.target.value)}/>
                        </div>
                        <div className="pesquisa-btn mx-0 col-1">
                            <button className="button-submit" type="submit">
                                <img className="lupa"
                                    src={Lupa} />
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            
        </>
    )

}

export default FormSearch
