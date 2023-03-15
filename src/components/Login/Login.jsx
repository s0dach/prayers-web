import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { AuthContext } from "../../context/context";
import "./styles.css";

export const Login = () => {
  const { setIsAuth } = React.useContext(AuthContext);
  const [valueLogin, setValueLogin] = React.useState("");
  const [valuePassword, setValuePassword] = React.useState("");
  const [verifed, setVerifed] = React.useState(false);

  const login = (event) => {
    event.preventDefault();
    if (valueLogin === "editor" && valuePassword === "editorbot22" && verifed) {
      setIsAuth(true);
      localStorage.setItem("auth", "true");
    } else {
      setIsAuth(false);
    }
  };
  return (
    <div className="container">
      <div className="login_page">
        <div className="form">
          <form className="login_form">
            <span className="spanLogin">ЛОГИН</span>
            <input
              className="login_login"
              onChange={(e) => setValueLogin(e.target.value)}
              type="text"
            />
            <span className="spanLogin">ПАРОЛЬ</span>
            <input
              onChange={(e) => setValuePassword(e.target.value)}
              type="password"
            />
            <div className="captcha">
              <ReCAPTCHA
                sitekey="6Leu1PQjAAAAAMELXL78MW0jcVxFFvakB1BItxnk"
                onChange={() => setVerifed(true)}
              />
            </div>

            <div className="div_button">
              <button onClick={login} className="header_active">
                войти
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
