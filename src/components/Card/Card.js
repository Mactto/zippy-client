import { Link } from 'react-router-dom';
import './Card.css';

const Card = (props) => {
  return (
    <Link to={`/album/${props.album.id}`}>
      <div className="card">
        <div className="album_title">{props.album.title}</div>
        <div className="created">{props.album.created}에 생성</div>
      </div>
    </Link>
  );
};

export default Card;
