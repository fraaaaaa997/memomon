import React, { useState } from "react";
import "./ScreenPage.css";

import gioca from "../assets/gioca.png";
import charizard from "../assets/charizard.gif";
import rayquaza from "../assets/rayquaza.gif";
import gyarados from "../assets/gyarados.gif";

/* nuove immagini per il modal: assicurati che esistano in src/assets */
import sceltamodalita from "../assets/sceltamodalita.png";
import singolo from "../assets/singolo.jpeg";
import doppio from "../assets/doppio.jpeg";

const ScreenPage = ({ setCategory, setStart, setMode }) => {
  const [selected, setSelected] = useState(null);
  const [showModePopup, setShowModePopup] = useState(false);

  const handleSelect = (category) => {
    setSelected(category);
    setCategory(category);
  };

  const handlePlayClick = () => {
    if (selected) {
      setShowModePopup(true);
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
        <div
          className="modal-overlay"
          onClick={() => setShowModePopup(false)} /* click esterno chiude */
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()} /* impedisce la chiusura quando clicchi dentro */
            role="dialog"
            aria-modal="true"
          >
            <img
              src={sceltamodalita}
              alt="Seleziona modalità"
              className="modal-background"
            />

            <div className="modal-buttons">
              <img
                src={singolo}
                alt="Giocatore singolo"
                className="mode-button"
                onClick={() => chooseMode("single")}
              />
              <img
                src={doppio}
                alt="1 vs 1"
                className="mode-button"
                onClick={() => chooseMode("versus")}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScreenPage;
