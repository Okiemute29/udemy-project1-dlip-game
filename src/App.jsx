import React, { useState, useEffect } from "react";
import "./App.css";
import Singlecard from "./components/singlecard";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false }
];

function App() {
  const [cards, setcards] = useState([]);
  const [turns, setturns] = useState(0);
  const [choiceone, setchoiceone] = useState(null);
  const [choicetwo, setchoicetwo] = useState(null);
  const [disable, setdisable] = useState(false);

  // Shuffle card
  const Shufflecards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setchoiceone(null);
    setchoicetwo(null);
    setcards(shuffleCards);
    setturns(0);
  };
  const handleChoice = (cards) => {
    choiceone ? setchoicetwo(cards) : setchoiceone(cards);
  };
  const reset = () => {
    setchoiceone(null);
    setchoicetwo(null);
    setturns((prev) => {
      return prev + 1;
    });
    setdisable(false);
  };

  useEffect(() => {
    if (choiceone && choicetwo) {
      setdisable(true);
      if (choiceone.src === choicetwo.src) {
        setcards((prevcards) => {
          return prevcards.map((card) => {
            if (card.src === choiceone.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        reset();
      } else {
        setTimeout(() => reset(), 1000);
      }
    }
  }, [choiceone, choicetwo]);

  // Starts game automatically

  useEffect(() => {
    Shufflecards();
  }, []);

  // const compare = (cards) => {
  //   if (choiceone.src === choicetwo.src) {
  //     console.log("match");
  //     setturns((prev) => {
  //       return prev + 1;
  //     });
  //   } else {
  //     console.log("does not match");
  //     reset();
  //   }
  // };

  // choicetwo && compare();
  // console.log(choiceone);
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={Shufflecards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <Singlecard
            flipped={card === choiceone || card === choicetwo || card.matched}
            handle={handleChoice}
            card={card}
            key={card.id}
            disabled={disable}
          />
        ))}
      </div>
      <p>turns:{turns}</p>
    </div>
  );
}

export default App;
