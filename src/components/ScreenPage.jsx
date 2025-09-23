import React, { useState } from "react";
import "./ScreenPage.css";
import gioca from "../assets/gioca.png";
import charizard from "../assets/charizard.gif";
import rayquaza from "../assets/rayquaza.gif";
import gyarados from "../assets/gyarados.gif";

const ScreenPage = ({ setCategory, setStart, setMode }) => {
  const [selected, setSelected] = useState(null);
  const [showModePopup, setShowModePopup] = useState(false);

  const handleSelect = (category) => {
    setSelected(category);
    setCategory(category);
  };

  const handlePlayClick = () => {
    if (selected) {
      setShowModePopup(true); // mostra popup invece di partire subito
    }
  };

  const chooseMode = (mode) => {
    setMode(mode);
    setShowModePopup(false);
    setStart(true);
  };

  return (
    <div className="screen-container">
      <h2 className="title"></h2>
      <div className="gif-row">
        <img
          src={charizard}
          alt="Charizard"
          className={`gif ${selected === "starter" ? "selected" : ""}`}
          onClick={() => handleSelect("starter")}
        />
        <img
          src={rayquaza}
          alt="Rayquaza"
          className={`gif ${selected === "legendary" ? "selected" : ""}`}
          onClick={() => handleSelect("legendary")}
        />
        <img
          src={gyarados}
          alt="Gyarados"
          className={`gif ${selected === "common" ? "selected" : ""}`}
          onClick={() => handleSelect("common")}
        />
      </div>
      <div className="button-container">
        <img
          src={gioca}
          alt="Gioca"
          className={`gioca-button ${!selected ? "disabled" : ""}`}
          onClick={handlePlayClick}
        />
      </div>

      {/* Modal per scegliere la modalità */}
      {showModePopup && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Scegli la modalità di gioco</h3>
            <div className="modal-buttons">
              <button onClick={() => chooseMode("single")}>Giocatore Singolo</button>
              <button onClick={() => chooseMode("versus")}>1 vs 1</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScreenPage;
