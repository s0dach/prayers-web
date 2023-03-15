import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "./styles.css";
import "../quillstyles.css";
import "react-quill/dist/quill.snow.css";
import { htmlToMarkdown } from "../Parser/Parser";
import axios from "axios";

export const EditTask = ({
  activeModalEdit,
  setActiveModalEdit,
  editMaterial,
  editTaskId,
  getMaterials,
  editMaterialText,
  setEditMaterialText,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [file, setFile] = React.useState("Вложений нет");

  const editorRef = React.useRef();

  const insertStar = (e) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();
    input.onchange = () => {
      const file = input.files[0];
      setFile(file);
    };
  };

  // кастомные значки в тулбар
  var icons = Quill.import("ui/icons");
  icons[
    "bold"
  ] = `<svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="25" cy="25" r="24.5" stroke="#68BFD6"/>
  <path d="M20.824 24.04H25.72C26.44 24.04 27.04 23.84 27.52 23.44C28 23.024 28.24 22.432 28.24 21.664C28.24 20.8 28.024 20.192 27.592 19.84C27.16 19.488 26.536 19.312 25.72 19.312H20.824V24.04ZM17.824 16.864H26.152C27.688 16.864 28.92 17.216 29.848 17.92C30.776 18.624 31.24 19.688 31.24 21.112C31.24 21.976 31.024 22.72 30.592 23.344C30.176 23.952 29.576 24.424 28.792 24.76V24.808C29.848 25.032 30.648 25.536 31.192 26.32C31.736 27.088 32.008 28.056 32.008 29.224C32.008 29.896 31.888 30.528 31.648 31.12C31.408 31.696 31.032 32.2 30.52 32.632C30.008 33.048 29.352 33.384 28.552 33.64C27.752 33.88 26.8 34 25.696 34H17.824V16.864ZM20.824 31.552H26.128C27.04 31.552 27.744 31.32 28.24 30.856C28.752 30.376 29.008 29.704 29.008 28.84C29.008 27.992 28.752 27.344 28.24 26.896C27.744 26.432 27.04 26.2 26.128 26.2H20.824V31.552Z" fill="#68BFD6"/>
  </svg>
  `;
  icons[
    "italic"
  ] = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="25" cy="25" r="24.5" stroke="#68BFD6"/>
  <path d="M25.3695 16.864H28.0815L27.5535 19.456H24.8415L25.3695 16.864ZM24.3855 21.592H27.1215L24.5535 34H21.8175L24.3855 21.592Z" fill="#68BFD6"/>
  </svg>`;
  icons[
    "image"
  ] = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="25" cy="25" r="24.5" stroke="#68BFD6"/>
  <path d="M28.6562 20.2188C29.5882 20.2188 30.3437 20.9743 30.3437 21.9062C30.3437 22.8382 29.5882 23.5938 28.6562 23.5938C27.7242 23.5938 26.9687 22.8382 26.9687 21.9062C26.9687 20.9743 27.7245 20.2188 28.6562 20.2188ZM18.2816 17.125H31.7816C32.9927 17.125 34.0002 18.1322 34.0002 19.375V30.625C34.0002 31.8678 32.993 32.875 31.7819 32.875H18.2819C17.0391 32.875 16.0319 31.8678 16.0319 30.625V19.375C16.0316 18.1322 17.0089 17.125 18.2816 17.125ZM17.7191 30.3895L22.5284 23.8539C22.6163 23.6922 22.8167 23.5938 23.0312 23.5938C23.2461 23.5938 23.4467 23.6911 23.5659 23.8532L27.3136 28.9192L28.6175 27.2985C28.7385 27.148 28.9316 27.0591 29.1368 27.0591C29.3421 27.0591 29.5351 27.148 29.6564 27.2985L32.3114 30.5965C32.3114 30.5955 32.3114 30.5975 32.3114 30.5965L32.3128 19.375C32.3128 19.0649 32.0604 18.8125 31.7503 18.8125H18.2503C17.9401 18.8125 17.6878 19.0649 17.6878 19.375V30.3895H17.7191Z" fill="#68BFD6"/>
  </svg>`;
  icons[
    "customDoc"
  ] = `<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="25" cy="25" r="24.5" stroke="#68BFD6"/>
  <path d="M31.3915 35.4883H18.4281C17.6757 35.4874 16.9543 35.1881 16.4222 34.656C15.8901 34.1239 15.5908 33.4025 15.5899 32.65V15.557C15.5908 14.8045 15.8901 14.0831 16.4222 13.5511C16.9543 13.019 17.6757 12.7196 18.4281 12.7188H26.9299C27.1551 12.7188 27.371 12.8082 27.5303 12.9674L33.9805 19.4176C34.0595 19.4965 34.1222 19.5902 34.1649 19.6933C34.2077 19.7964 34.2297 19.907 34.2297 20.0186V32.6495C34.229 33.402 33.9297 34.1236 33.3976 34.6558C32.8655 35.188 32.1441 35.4874 31.3915 35.4883ZM18.4281 14.418C18.1261 14.4183 17.8366 14.5384 17.623 14.7519C17.4095 14.9655 17.2894 15.255 17.2891 15.557V32.65C17.2894 32.952 17.4095 33.2416 17.623 33.4551C17.8366 33.6687 18.1261 33.7888 18.4281 33.7891H31.3915C31.6935 33.7888 31.983 33.6687 32.1966 33.4551C32.4101 33.2416 32.5302 32.952 32.5305 32.65V20.3703L26.5776 14.418H18.4281Z" fill="#68BFD6"/>
  <path d="M33.3801 20.8682H28.918C28.1655 20.8673 27.4441 20.568 26.912 20.0359C26.3799 19.5038 26.0806 18.7824 26.0797 18.0299V13.5684C26.0797 13.343 26.1692 13.1269 26.3286 12.9676C26.4879 12.8083 26.704 12.7188 26.9293 12.7188C27.1547 12.7188 27.3708 12.8083 27.5301 12.9676C27.6894 13.1269 27.7789 13.343 27.7789 13.5684V18.0299C27.7792 18.3319 27.8993 18.6215 28.1129 18.835C28.3264 19.0486 28.616 19.1687 28.918 19.169H33.3796C33.6049 19.169 33.821 19.2585 33.9803 19.4178C34.1397 19.5772 34.2292 19.7933 34.2292 20.0186C34.2292 20.2439 34.1397 20.46 33.9803 20.6194C33.821 20.7787 33.6049 20.8682 33.3796 20.8682H33.3801Z" fill="#68BFD6"/>
  <path d="M18.8359 25.1434C18.8359 24.956 19.0059 24.7911 19.2709 24.7911H20.8184C21.8079 24.7911 22.5878 25.2562 22.5878 26.5158V26.5532C22.5878 27.8129 21.7779 28.2927 20.743 28.2927H20.0027V29.912C20.0027 30.1522 19.7105 30.2717 19.4176 30.2717C19.1248 30.2717 18.8359 30.1522 18.8359 29.912V25.1434ZM20.0056 25.8107V27.3926H20.7476C21.1673 27.3926 21.4227 27.1531 21.4227 26.6433V26.5606C21.4227 26.0508 21.1673 25.8107 20.7476 25.8107H20.0056Z" fill="#68BFD6"/>
  <path d="M24.9355 24.7911C25.9704 24.7911 26.7803 25.2709 26.7803 26.5606V28.5028C26.7803 29.7919 25.9704 30.2717 24.9355 30.2717H23.6085C23.3015 30.2717 23.0987 30.1069 23.0987 29.9194V25.1434C23.0987 24.956 23.3015 24.7911 23.6085 24.7911H24.9355ZM24.2683 25.8107V29.2522H24.9355C25.3558 29.2522 25.6107 29.0126 25.6107 28.5028V26.5606C25.6107 26.0508 25.3558 25.8107 24.9355 25.8107H24.2683Z" fill="#68BFD6"/>
  <path d="M27.5224 25.1514C27.5224 24.9112 27.7772 24.7911 28.0321 24.7911H30.6336C30.8811 24.7911 30.9865 25.0539 30.9865 25.2935C30.9865 25.5711 30.8591 25.8107 30.6336 25.8107H28.6914V27.0783H29.8242C30.0508 27.0783 30.1765 27.2952 30.1765 27.5354C30.1765 27.7376 30.0718 27.9777 29.8242 27.9777H28.6914V29.912C28.6914 30.1522 28.3992 30.2717 28.1069 30.2717C27.8146 30.2717 27.5218 30.1522 27.5218 29.912L27.5224 25.1514Z" fill="#68BFD6"/>
  </svg>
  `;
  //модули тулбара
  const modules = React.useMemo(
    () => ({
      toolbar: {
        container: ["bold", "italic", "image", "customDoc"],
        handlers: {
          customDoc: insertStar,
        },
      },
      clipboard: {
        matchVisual: false,
      },
      imageUpload: {
        url: "https://api.imgur.com/3/image",
        method: "POST",
        name: "image",
        withCredentials: false,
        headers: {
          Authorization: "Client-ID ed6e53ec921452e",
        },
        callbackOK: (serverResponse, next) => {
          next(serverResponse.data.link);
        },
        callbackKO: (serverError) => {
          alert(serverError);
        },
        checkBeforeSend: (file, next) => {
          next(file);
        },
      },
    }),
    []
  );
  const editComplete = () => {
    setIsLoading(true);
    const htmlTooMarkdown = htmlToMarkdown(editMaterialText);
    const firstFinishedTextTest = htmlTooMarkdown
      .split("![](")
      .join("<img src=");
    const lastFinishedTextTest = firstFinishedTextTest
      .split(".png)")
      .join(".png>");
    const firstFinishedText = lastFinishedTextTest
      .split("![](")
      .join("<img src=");
    const lastFinishedText = firstFinishedText.split(".jpg)").join(".jpg>");
    const obj = {
      text:
        file === "Вложений нет"
          ? lastFinishedText
          : lastFinishedText + `\`[Вложения:${file.name}]\``,
    };
    axios
      .patch("http://95.163.234.208:7000/api/lection/updatematerial", {
        ...editMaterial,
        text: obj.text,
      })
      .then(() => getMaterials());
    setTimeout(() => {
      const date = new FormData();
      date.append("file", file);
      date.append("data", editTaskId);
      axios
        .post("http://95.163.234.208:8000/upload-file-to-google-drive", date)
        .then((e) => console.log("ok"))
        .catch((e) => console.log("Ошибка"));
      setFile("Вложений нет");
      setIsLoading(false);
      setActiveModalEdit(false);
    }, "2000");
  };
  return (
    <div className={activeModalEdit ? "modal active" : "modal"}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <ReactQuill
          value={editMaterialText}
          onChange={(e) => setEditMaterialText(e)}
          ref={editorRef}
          modules={modules}
          placeholder="Введите текст. Для избежания возникновения проблем при передачи контента в телеграм, документы и изображения старайтесь добавлять в последнюю очередь"
        />
        <div className="groupbtns">
          <button
            onClick={() => setActiveModalEdit(false)}
            className="closeBtn"
          >
            Отменить
          </button>
          <button
            disabled={isLoading}
            onClick={editComplete}
            className="saveBtn"
          >
            {isLoading ? "Сохранение..." : "Сохранить"}
          </button>
        </div>
      </div>
    </div>
  );
};
