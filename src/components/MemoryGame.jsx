import React, { useEffect, useState } from "react";
import "./MemoryGame.css";

const MemoryGame = ({ category, mode }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  // solo per modalità 1vs1
  const [turn, setTurn] = useState(1); // 1 o 2
  const [scores, setScores] = useState({ p1: 0, p2: 0 });

  useEffect(() => {
    async function fetchPokemons() {
      let pokemonIds = [];

      if (category === "starter") {
        pokemonIds = [
          1, 4, 7, 25, 152, 155, 158, 252,
          255, 258, 387, 390, 393, 650, 653, 656,
        ];
      } else if (category === "legendary") {
        pokemonIds = [
          144, 145, 146, 150, 249, 250, 382, 383,
          384, 480, 481, 482, 483, 484, 485, 487,
        ];
      } else {
        const all = Array.from({ length: 151 }, (_, i) => i + 1);
        const shuffled = all.sort(() => 0.5 - Math.random());
        pokemonIds = shuffled.slice(0, 16);
      }

      const details = await Promise.all(
        pokemonIds.map(async (id) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const data = await res.json();
          return {
            id: data.id,
            name: data.name,
            img: data.sprites.front_default,
          };
        })
      );

      const gameCards = [...details, ...details]
        .map((p, i) => ({ ...p, uid: i }))
        .sort(() => Math.random() - 0.5);

      setCards(gameCards);
    }

    fetchPokemons();
  }, [category]);

  const handleFlip = (card) => {
    if (
      flipped.length === 2 ||
      flipped.includes(card.uid) ||
      matched.includes(card.id)
    )
      return;

    const newFlipped = [...flipped, card.uid];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped.map((uid) =>
        cards.find((c) => c.uid === uid)
      );

      if (first.id === second.id) {
        setMatched((prev) => [...prev, first.id]);

        if (mode === "versus") {
          // assegna punto al giocatore di turno
          setScores((prev) => ({
            ...prev,
            [turn === 1 ? "p1" : "p2"]: prev[turn === 1 ? "p1" : "p2"] + 1,
          }));
          // resta lo stesso turno se fa punto
        }
      } else {
        // cambia turno se 1vs1
        if (mode === "versus") {
          setTimeout(() => {
            setTurn((prev) => (prev === 1 ? 2 : 1));
          }, 1000);
        }
      }

      setTimeout(() => setFlipped([]), 1000);
    }
  };

  const gameEnded = matched.length === cards.length / 2 && cards.length > 0;

  return (
    <div className="memory-container">
      <h2 className="title">{category}</h2>

     {/*  <div className="turno">
      <p>È il turno di <br />Giocatore {turn}</p>

      </div> */}

      {mode === "versus" && (
        
        <div className="scoreboard">
            
          <div className="scoreboard">
            
  <p className="player1">Giocatore 1: <br />{scores.p1}</p>
  <p className="player2">Giocatore 2: <br />{scores.p2}</p>
</div>
         
        </div>
      )}

      <div className="grid">
        {cards.map((card) => (
          <div
            key={card.uid}
            className="card"
            onClick={() => handleFlip(card)}
          >
            {flipped.includes(card.uid) || matched.includes(card.id) ? (
              <img src={card.img} alt={card.name} />
            ) : (
              <div className="back" />
            )}
          </div>
        ))}
      </div>


      {gameEnded && (
        <h3 className="victory">
          🎉 Hai vinto!{" "}
          {mode === "versus" &&
            (scores.p1 > scores.p2
              ? "Giocatore 1 vince!"
              : scores.p2 > scores.p1
              ? "Giocatore 2 vince!"
              : "Pareggio!")}
        </h3>
      )}
    </div>
  );
};

export default MemoryGame;
