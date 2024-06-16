import { Link } from "react-router-dom";

function Card({cardTtile, cardText, cardLink = "/", cardLinkText="Visualizar post"}){
    return (
        <>
            <div className="card mb-4" >
                <div className="card-body">
                    <h3 className="card-title">{cardTtile}</h3>
                    <p className="card-text">{cardText}</p>
                    <Link to={cardLink} className="btn btn-primary">{cardLinkText}</Link>
                </div>
            </div>
        </>
        
    );
}

export default Card;