import axios from "axios";
import React from "react";
import { Header } from "../Header/Header";
import "../Header/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { Tasks } from "../Task/Tasks";
import { Instruction } from "../Task/Instruction";
import { Error } from "../Task/Error";
import { ReactComponent as RemoveCircle } from "../../assets/svg/remove.svg";
import { ReactComponent as EditCircle } from "../../assets/svg/edit.svg";

export const Lists = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [lists, setLists] = React.useState(null);
  const [lections, setLections] = React.useState(null);
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  const [listInputValue, setListInputValue] = React.useState("");
  const [instrActive, setInstrActive] = React.useState(false);
  const [materials, setMaterials] = React.useState(null);
  // Отсюда пойдут основные правки mongodb

  const [errorText, setErrorText] = React.useState(null);
  const [errorModal, setErrorModal] = React.useState(false);
  // Получение лекций
  const getList = React.useCallback(async () => {
    try {
      await axios
        .get("http://95.163.234.208:7000/api/list/getlist", {})
        .then((res) => {
          setLections(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
  // Получение лекций
  React.useEffect(() => {
    getList();
  }, [getList]);
  // Добавление лекций
  const addList = () => {
    if (!listInputValue) {
      alert("Введите название списка");
      return;
    }
    axios
      .post("http://95.163.234.208:7000/api/list/addlist", {
        listInputValue,
      })
      .then(() => {
        setVisiblePopup(false);
        setListInputValue("");
        getList();
      })
      .catch((err) => {
        console.log(err);
        alert("Ошибка при добавлении списка!");
      });
  };

  // Получение материалов
  const getMaterials = React.useCallback(async () => {
    try {
      if (params.id !== "1") {
        await axios
          .get("http://95.163.234.208:7000/api/lection/getmaterial", {
            params: { params },
          })
          .then((res) => {
            setMaterials(res.data);
          });
      }
    } catch (err) {
      console.log(err);
    }
  }, [params]);

  React.useEffect(() => {
    getMaterials();
  }, [getMaterials]);
  // тут конец правок

  const onDublicateList = async () => {
    lists?.forEach(async (list) => {
      if (list.id === Number(params.id)) {
        await axios.post("http://95.163.234.208:3500/lists", {
          name: list.name,
          colorId: 1,
          usersId: [],
        });
        await axios
          .get("http://95.163.234.208:3500/lists?_expand=color&_embed=tasks")
          .then(({ data }) => {
            data.forEach((list) => {
              if (list.id === Number(params.id)) {
                list.tasks.forEach((task) => {
                  axios.post("http://95.163.234.208:3500/tasks", {
                    listId: data[data.length - 1].id,
                    active: task.active,
                    text: task.text,
                    documentId: task.documentId,
                    completed: false,
                  });
                });
              }
            });
            setLists(data);
          });
      }
    });
  };

  const editTitle = (lection) => {
    const newTitle = window.prompt("Новое название лекции", lection.name);
    if (newTitle) {
      axios
        .patch("http://95.163.234.208:7000/api/list/updatelist/", {
          ...lection,
          name: newTitle,
        })
        .then(() => getList())
        .catch((e) => {
          alert("Не удалось обновить название лекции");
          console.log(e);
        });
    }
  };

  const removeList = (id) => {
    if (window.confirm("Вы действительно хотите удалить лекцию?")) {
      axios
        .delete(`http://95.163.234.208:7000/api/list/deletelist/${id}`)
        .then(() => {
          getList();
        });
    }
  };

  return (
    <>
      <Error
        errorText={errorText}
        errorModal={errorModal}
        setErrorModal={setErrorModal}
      />
      {lections ? (
        <>
          <Instruction
            instrActive={instrActive}
            setInstrActive={setInstrActive}
          />
          <Header
            setErrorText={setErrorText}
            setErrorModal={setErrorModal}
            materials={materials}
            getMaterials={getMaterials}
            getList={getList}
            lections={lections}
            onDublicateList={onDublicateList}
          />
          <div className="section">
            <div className="section_left">
              <div className="section_text">Активные</div>
              <div className="section_overflow">
                {lections
                  ? lections.map((lection) =>
                      lection.active ? (
                        <div
                          onClick={() => {
                            navigate(`/posts/${lection._id}`);
                          }}
                          className="section_activelectname"
                          key={lection._id}
                        >
                          {lection.name}
                        </div>
                      ) : undefined
                    )
                  : "Загрузка."}
              </div>
              <div className="border"></div>
              <div className="section_text">Доступные</div>
              <div className="section_overflow">
                {lections
                  ? lections.map((lection) =>
                      !lection.active ? (
                        <div
                          className="listsTable"
                          key={lection._id}
                          onClick={() => {
                            navigate(`/posts/${lection._id}`);
                          }}
                        >
                          <div className="section_dislectname">
                            {lection.name}
                          </div>
                          <div className="flexTable">
                            <div onClick={() => editTitle(lection)}>
                              <EditCircle />
                            </div>
                            <div onClick={() => removeList(lection._id)}>
                              <RemoveCircle />
                            </div>
                          </div>
                        </div>
                      ) : undefined
                    )
                  : "Загрузка."}
              </div>
              <div className="border"></div>
              {visiblePopup ? (
                <div className="addListBlock">
                  <input
                    value={listInputValue}
                    onChange={(e) => setListInputValue(e.target.value)}
                    className="lection_input"
                    type="text"
                    placeholder="Название лекции"
                  />
                  <button className="buttonOK" onClick={addList}>
                    OK
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => setVisiblePopup(true)}
                  className="section_addlection"
                >
                  + добавить лекцию
                </div>
              )}
              <div>
                <button
                  className="section_helpbtn"
                  onClick={() => setInstrActive(true)}
                >
                  <div className="section_helpbtn1">?</div>Инструкция сервиса
                </button>
              </div>
            </div>
            <Tasks
              setErrorText={setErrorText}
              setErrorModal={setErrorModal}
              getList={getList}
              setMaterials={setMaterials}
              materials={materials}
              getMaterials={getMaterials}
              lections={lections}
              setLists={setLists}
            />
          </div>
        </>
      ) : (
        <div className="backgroundColor">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
};
