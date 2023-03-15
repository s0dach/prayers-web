import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import "../Header/styles.css";

export const PollAdd = ({
  pollActive,
  setPollActive,
  materials,
  taskIdAdd,
  getMaterials,
}) => {
  const [inputValue, setInputValue] = React.useState("");
  const [optionValue, setOptionValue] = React.useState("");
  const [optionValue1, setOptionValue1] = React.useState("");
  const [optionValue2, setOptionValue2] = React.useState("");
  const [optionValue3, setOptionValue3] = React.useState("");
  const [optionValue4, setOptionValue4] = React.useState("");
  const [optionValue5, setOptionValue5] = React.useState("");
  const [optionValue6, setOptionValue6] = React.useState("");
  const [optionValue7, setOptionValue7] = React.useState("");
  const [optionValue8, setOptionValue8] = React.useState("");
  const [optionValue9, setOptionValue9] = React.useState("");

  const [stateOption, setStateOption] = React.useState(false);
  const [stateOption1, setStateOption1] = React.useState(false);
  const [stateOption2, setStateOption2] = React.useState(false);
  const [stateOption3, setStateOption3] = React.useState(false);
  const [stateOption4, setStateOption4] = React.useState(false);
  const [stateOption5, setStateOption5] = React.useState(false);
  const [stateOption6, setStateOption6] = React.useState(false);
  const [stateOption7, setStateOption7] = React.useState(false);
  const [stateOption8, setStateOption8] = React.useState(false);
  const [stateOption9, setStateOption9] = React.useState(false);
  const [stateOption10, setStateOption10] = React.useState(false);
  const [stateOption11, setStateOption11] = React.useState(false);
  const [stateOption12, setStateOption12] = React.useState(false);
  const [stateOption13, setStateOption13] = React.useState(false);
  const [stateOption14, setStateOption14] = React.useState(false);

  const params = useParams();

  const addPoll = async (e) => {
    let preOptionValues = [];
    preOptionValues.push(
      optionValue,
      optionValue1,
      optionValue2,
      optionValue3,
      optionValue4,
      optionValue5,
      optionValue6,
      optionValue7,
      optionValue8,
      optionValue9
    );
    const OptionValues = preOptionValues.filter((element) => element !== "");
    if (taskIdAdd === null) {
      await axios
        .post("http://95.163.234.208:7000/api/lection/addpoll", {
          order: materials.length + 1,
          owner: params.id,
          text: `<h1><span style="color: rgb(102, 163, 224);">Опрос:</span><span style="background-color: rgb(204, 224, 245); color: rgb(102, 163, 224);"> ${inputValue}
          </span></h1>`,
          documentId: 0,
          pollId: [],
          pollOptions: OptionValues,
          pollQuestion: inputValue,
          optionsReply: [],
        })
        .then(() => getMaterials())
        .catch((e) => {
          console.log(e);
          alert("Ошибка при добавлении материала!");
        });
    } else {
      await materials.forEach((material) => {
        if (Number(material.order) >= Number(taskIdAdd)) {
          axios
            .patch("http://95.163.234.208:7000/api/lection/updatematerial", {
              ...material,
              _id: material._id,
              owner: params.id,
              order: material.order + 1,
            })
            .then(() => getMaterials())
            .catch((e) => {
              console.log(e);
              alert("Ошибка при добавлении материала!");
            });
        }
      });
      await axios
        .post("http://95.163.234.208:7000/api/lection/addpoll", {
          order: taskIdAdd,
          owner: params.id,
          text: `<h1><span style="color: rgb(102, 163, 224);">Опрос:</span><span style="background-color: rgb(204, 224, 245); color: rgb(102, 163, 224);"> ${inputValue}
          </span></h1>`,
          documentId: 0,
          pollId: [],
          pollOptions: OptionValues,
          pollQuestion: inputValue,
          optionsReply: [],
        })
        .then(() => {
          getMaterials();
        })
        .catch((e) => {
          console.log(e);
          alert("Ошибка при добавлении материала!");
        });
    }

    setPollActive(false);
    setInputValue("");
    setOptionValue("");
    setOptionValue1("");
    setOptionValue2("");
    setOptionValue3("");
    setOptionValue4("");
    setOptionValue5("");
    setOptionValue6("");
    setOptionValue7("");
    setOptionValue8("");
    setOptionValue9("");
    setStateOption(false);
    setStateOption1(false);
    setStateOption2(false);
    setStateOption3(false);
    setStateOption4(false);
    setStateOption5(false);
    setStateOption6(false);
    setStateOption7(false);
    setStateOption8(false);
    setStateOption9(false);
    setStateOption10(false);
    setStateOption11(false);
    setStateOption12(false);
    setStateOption13(false);
    setStateOption14(false);
  };

  return (
    <div
      className={pollActive ? "modal active" : "modal"}
      onClick={() => setPollActive(false)}
    >
      <div className="modal_pollcontent" onClick={(e) => e.stopPropagation()}>
        <div className="pollDiv">
          <span>Вопрос?</span>
          <input
            className="poll_input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className="addPoll">
          <div className="pollDiv">
            <span>Опция</span>
            <input
              value={optionValue}
              onChange={(e) => setOptionValue(e.target.value)}
              className="poll_input"
            />
          </div>
          <div className="pollDiv">
            <span>Опция</span>
            <input
              value={optionValue1}
              onChange={(e) => setOptionValue1(e.target.value)}
              className="poll_input"
            />
          </div>
          <div className="pollDiv">
            {!stateOption ? (
              <div className="addPoll">
                <button
                  onClick={() => {
                    setStateOption(true);
                    setStateOption1(true);
                  }}
                  className="poll_button"
                >
                  Добавить опцию
                </button>
              </div>
            ) : (
              <>
                <span>Опция</span>
                <input
                  value={optionValue2}
                  onChange={(e) => setOptionValue2(e.target.value)}
                  className="poll_input"
                />
              </>
            )}
          </div>
        </div>
        <div className="addPoll">
          <div className="pollDiv">
            {stateOption1 && (
              <div className="addPoll">
                <button
                  onClick={() => {
                    setStateOption2(true);
                    setStateOption1(false);
                    setStateOption3(true);
                  }}
                  className="poll_button"
                >
                  Добавить опцию
                </button>
              </div>
            )}
            {stateOption2 && (
              <>
                <span>Опция</span>
                <input
                  value={optionValue3}
                  onChange={(e) => setOptionValue3(e.target.value)}
                  className="poll_input"
                />
              </>
            )}
          </div>
          <div className="pollDiv">
            {stateOption3 && (
              <div className="addPoll">
                <button
                  onClick={() => {
                    setStateOption4(true);
                    setStateOption3(false);
                    setStateOption5(true);
                  }}
                  className="poll_button"
                >
                  Добавить опцию
                </button>
              </div>
            )}
            {stateOption4 && (
              <>
                <span>Опция</span>
                <input
                  value={optionValue4}
                  onChange={(e) => setOptionValue4(e.target.value)}
                  className="poll_input"
                />
              </>
            )}
          </div>
          <div className="pollDiv">
            {stateOption5 && (
              <div className="addPoll">
                <button
                  onClick={() => {
                    setStateOption6(true);
                    setStateOption5(false);
                    setStateOption7(true);
                  }}
                  className="poll_button"
                >
                  Добавить опцию
                </button>
              </div>
            )}
            {stateOption6 && (
              <>
                <span>Опция</span>
                <input
                  value={optionValue5}
                  onChange={(e) => setOptionValue5(e.target.value)}
                  className="poll_input"
                />
              </>
            )}
          </div>
        </div>
        <div className="addPoll">
          <div className="pollDiv">
            {stateOption7 && (
              <div className="addPoll">
                <button
                  onClick={() => {
                    setStateOption8(true);
                    setStateOption7(false);
                    setStateOption9(true);
                  }}
                  className="poll_button"
                >
                  Добавить опцию
                </button>
              </div>
            )}
            {stateOption8 && (
              <>
                <span>Опция</span>
                <input
                  value={optionValue6}
                  onChange={(e) => setOptionValue6(e.target.value)}
                  className="poll_input"
                />
              </>
            )}
          </div>
          <div className="pollDiv">
            {stateOption9 && (
              <div className="addPoll">
                <button
                  onClick={() => {
                    setStateOption10(true);
                    setStateOption9(false);
                    setStateOption11(true);
                  }}
                  className="poll_button"
                >
                  Добавить опцию
                </button>
              </div>
            )}
            {stateOption10 && (
              <>
                <span>Опция</span>
                <input
                  value={optionValue7}
                  onChange={(e) => setOptionValue7(e.target.value)}
                  className="poll_input"
                />
              </>
            )}
          </div>
          <div className="pollDiv">
            {stateOption11 && (
              <div className="addPoll">
                <button
                  onClick={() => {
                    setStateOption12(true);
                    setStateOption11(false);
                    setStateOption13(true);
                  }}
                  className="poll_button"
                >
                  Добавить опцию
                </button>
              </div>
            )}
            {stateOption12 && (
              <>
                <span>Опция</span>
                <input
                  value={optionValue8}
                  onChange={(e) => setOptionValue8(e.target.value)}
                  className="poll_input"
                />
              </>
            )}
          </div>
        </div>
        <div className="pollDiv">
          {stateOption13 && (
            <div className="addPoll">
              <button
                onClick={() => {
                  setStateOption14(true);
                  setStateOption13(false);
                }}
                className="poll_button"
              >
                Добавить опцию
              </button>
            </div>
          )}
          {stateOption14 && (
            <>
              <span>Опция</span>
              <input
                value={optionValue9}
                onChange={(e) => setOptionValue9(e.target.value)}
                className="poll_input"
              />
            </>
          )}
        </div>
        <button onClick={addPoll} className="saveBtn">
          Сохранить
        </button>
      </div>
    </div>
  );
};
