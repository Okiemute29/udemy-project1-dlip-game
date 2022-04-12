import React from "react";
import "./singlecard.css";

export default function Singlecard({ disabled, flipped, card, handle }) {
  function handleClick() {
    if (!disabled) {
      handle(card);
    }
  }

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          onClick={handleClick}
          className="back"
          src="/img/cover.png"
          alt="card back"
        />
      </div>
    </div>
  );
}
