import { Link } from "react-router-dom";
import "./Card.css"

const Card = (props) => {
    return (
        <div className="card">
          {props.card.id}
          <Link to={`/album/${props.card.id}`}>
            <button>편집하기</button>
          </Link>
        </div>
      );
}

export default Card;