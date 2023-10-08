import { Link } from 'react-router-dom';
import './Card.css';

const Card = (props) => {
  return (
    <Link to={`/album/${props.album.id}`}>
      <div className="card">
        <div className="album_title">{props.album.title}</div>
        created_by {props.album.created}
      </div>
    </Link>
  );
};

export default Card;
