import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

export const Header = ({
  lections,
  getList,
  getMaterials,
  materials,
  setErrorModal,
  setErrorText,
}) => {
  const params = useParams();

  const [list, setList] = React.useState(null);

  React.useEffect(() => {
    if (lections) {
      const lection = lections.find((lection) => lection._id === params.id);
      setList(lection);
    }
  }, [lections, params.id]);

  const onEdit = () => {
    axios
      .patch("http://95.163.234.208:7000/api/list/updatelist/", {
        ...list,
        editable: true,
        active: false,
      })
      .then(() => getList());
  };

  const startLection = async () => {
    await axios
      .patch("http://95.163.234.208:7000/api/list/updatelist/", {
        ...list,
        active: true,
      })
      .then(() => getList());
  };

  const stopLection = async () => {
    await axios
      .patch("http://95.163.234.208:7000/api/list/updatelist/", {
        ...list,
        active: false,
        usersId: [],
        published: 0,
      })
      .then(() => {
        materials.forEach((mat) => {
          axios
            .patch("http://95.163.234.208:7000/api/lection/updatematerial/", {
              ...mat,
              optionsReply: [],
              pollId: [],
              complete: false,
            })
            .then(() => {
              getMaterials();
              getList();
            });
        });
      });
  };

  const closeEdit = async () => {
    await axios
      .patch("http://95.163.234.208:7000/api/list/updatelist/", {
        ...list,
        editable: false,
        active: false,
      })
      .then(() => {
        getList();
        getMaterials();
      });
  };

  const onDublicateList = async () => {
    await axios
      .post("http://95.163.234.208:7000/api/list/dublicatelist", {
        name: list.name,
      })
      .then((res) => {
        materials.forEach((material) => {
          axios.post("http://95.163.234.208:7000/api/lection/addmaterial", {
            order: material.order,
            owner: res.data._id,
            text: material.text,
            documentId: material.documentId,
            pollId: material.pollId,
            complete: false,
          });
        });
        getList();
        getMaterials();
      })
      .catch((err) => {
        console.log(err);
        setErrorText("Ошибка при повторении лекции!");
        setErrorModal(true);
      });
  };

  return (
    <div className="header">
      <div className="header_left">
        <svg
          width="47"
          height="47"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ margin: "10px 74px 10px 13px" }}
        >
          <mask
            id="mask0_11_265"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="50"
            height="50"
          >
            <path
              d="M25 0C38.8071 0 50 11.1929 50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25C0 11.1929 11.1929 0 25 0Z"
              fill="#68BFD6"
            ></path>
          </mask>
          <g mask="url(#mask0_11_265)">
            <path
              d="M25 0C38.8071 0 50 11.1929 50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25C0 11.1929 11.1929 0 25 0Z"
              fill="#68BFD6"
            ></path>
            <circle cx="25.3846" cy="18.0769" r="10.3846" fill="white"></circle>
            <ellipse
              cx="25.3846"
              cy="44.6153"
              rx="15.7692"
              ry="15.3846"
              fill="white"
            ></ellipse>
          </g>
        </svg>
        {list?.active ? (
          <button className="header_active">Активно</button>
        ) : (
          <button className="header_activeNone"></button>
        )}
      </div>
      <div className="header_section">
        <div className="header_text">{list?.name}</div>
        <div className="header_icons">
          {!list?.editable ? (
            <div className="header_icon1" onClick={onEdit}>
              <svg
                width="47"
                height="47"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M35.4039 17.7808L32.2193 14.5961C31.8349 14.2117 31.3238 14 30.7801 14C30.2365 14 29.7254 14.2117 29.341 14.5961L16.0101 27.927C15.8836 28.0535 15.802 28.2181 15.7779 28.3954L15.0074 34.072C14.9731 34.3251 15.059 34.5798 15.2396 34.7604C15.394 34.9148 15.6025 35 15.818 35C15.8545 35 15.8913 34.9976 15.9281 34.9926L21.6045 34.2221C21.7819 34.198 21.9464 34.1165 22.073 33.9899L35.4039 20.6591C35.7883 20.2747 36 19.7635 36 19.2199C36 18.6763 35.7883 18.1652 35.4039 17.7808ZM21.1112 32.638L16.7731 33.2268L17.362 28.8888L26.8086 19.4422L30.5578 23.1914L21.1112 32.638ZM34.247 19.5022L31.7147 22.0345L27.9655 18.2853L30.4978 15.753C30.5996 15.6512 30.7184 15.636 30.7801 15.636C30.8419 15.636 30.9607 15.6512 31.0624 15.753L34.2471 18.9376C34.3488 19.0394 34.364 19.1581 34.364 19.2199C34.364 19.2816 34.3488 19.4004 34.247 19.5022Z"
                  fill="#68BFD6"
                />
                <circle cx="25" cy="25" r="24.5" stroke="#68BFD6" />
              </svg>
            </div>
          ) : (
            <div className="header_icon1" onClick={closeEdit}>
              <svg
                width="47"
                height="47"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M35.4039 17.7808L32.2193 14.5961C31.8349 14.2117 31.3238 14 30.7801 14C30.2365 14 29.7254 14.2117 29.341 14.5961L16.0101 27.927C15.8836 28.0535 15.802 28.2181 15.7779 28.3954L15.0074 34.072C14.9731 34.3251 15.059 34.5798 15.2396 34.7604C15.394 34.9148 15.6025 35 15.818 35C15.8545 35 15.8913 34.9976 15.9281 34.9926L21.6045 34.2221C21.7819 34.198 21.9464 34.1165 22.073 33.9899L35.4039 20.6591C35.7883 20.2747 36 19.7635 36 19.2199C36 18.6763 35.7883 18.1652 35.4039 17.7808ZM21.1112 32.638L16.7731 33.2268L17.362 28.8888L26.8086 19.4422L30.5578 23.1914L21.1112 32.638ZM34.247 19.5022L31.7147 22.0345L27.9655 18.2853L30.4978 15.753C30.5996 15.6512 30.7184 15.636 30.7801 15.636C30.8419 15.636 30.9607 15.6512 31.0624 15.753L34.2471 18.9376C34.3488 19.0394 34.364 19.1581 34.364 19.2199C34.364 19.2816 34.3488 19.4004 34.247 19.5022Z"
                  fill="#68BFD6"
                  opacity="0.5"
                />
                <circle
                  cx="25"
                  cy="25"
                  r="24.5"
                  stroke="#68BFD6"
                  opacity="0.5"
                />
              </svg>
            </div>
          )}
          <div className="header_icon1" onClick={onDublicateList}>
            <svg
              width="47"
              height="47"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28.2692 18H18.1154C17.5631 18 17.1154 18.4477 17.1154 19V28.3846C17.1154 28.9369 17.5631 29.3846 18.1154 29.3846H19.7308V23.6154C19.7308 21.9585 21.0739 20.6154 22.7308 20.6154H29.2692V19C29.2692 18.4477 28.8215 18 28.2692 18ZM31.2692 20.6154H32.8846C34.5415 20.6154 35.8846 21.9585 35.8846 23.6154V33C35.8846 34.6569 34.5415 36 32.8846 36H22.7308C21.0739 36 19.7308 34.6569 19.7308 33V31.3846H18.1154C16.4585 31.3846 15.1154 30.0415 15.1154 28.3846V19C15.1154 17.3431 16.4585 16 18.1154 16H28.2692C29.9261 16 31.2692 17.3431 31.2692 19V20.6154ZM22.7308 22.6154H32.8846C33.4369 22.6154 33.8846 23.0631 33.8846 23.6154V33C33.8846 33.5523 33.4369 34 32.8846 34H22.7308C22.1785 34 21.7308 33.5523 21.7308 33V23.6154C21.7308 23.0631 22.1785 22.6154 22.7308 22.6154Z"
                fill="#68BFD6"
              />
              <circle cx="25" cy="25" r="24.5" stroke="#68BFD6" />
            </svg>
          </div>
        </div>
      </div>
      <div className="header_right">
        {!list?.editable ? (
          !list?.active ? (
            <button onClick={startLection} className="header_button">
              К службе
            </button>
          ) : (
            <button onClick={stopLection} className="header_buttondis">
              Завершить службу
            </button>
          )
        ) : (
          <button className="header_buttonEditable">К службе</button>
        )}
      </div>
    </div>
  );
};
