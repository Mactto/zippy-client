import Card from "../../components/Card/Card";
import "../../styles/Main/Main.css"

const cards = [
    {
        id: "9f96400b-dd1a-4753-8874-0a921bb502de",
    },
    {
        id: "b7382e54-8c3e-4470-98ab-143173d6e45a",
    },
    {
        id: "b7382e54-8c3e-4470-98ab-143173d6e45a",
    },
    {
        id: "b7382e54-8c3e-4470-98ab-143173d6e45a",
    },
]

const MainPage = () => {
  return (
    <div className="main_container">
        <div className="cards">
            {
                cards.map((card) => (
                    <Card key={card.id} card={card} />
                ))
            }
        </div>
    </div>
  );
};

export default MainPage;
