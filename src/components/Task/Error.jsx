import React from "react";

export const Error = ({ errorText, setErrorModal, errorModal }) => {
  return (
    <div className={errorModal ? "frame active" : "frame"}>
      <div className="modalError">
        <img
          alt="error_img"
          src="https://100dayscss.com/codepen/alert.png"
          width="44"
          height="38"
        />
        <span className="Modaltitle">Возникла ошибка!</span>
        <p className="modalparag">{errorText}</p>
        <div className="modalbutton" onClick={() => setErrorModal(false)}>
          Хорошо
        </div>
      </div>
    </div>
  );
};
