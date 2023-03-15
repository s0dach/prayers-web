import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./components/AppRouter";
import React from "react";
import { AuthContext } from "./context/context";

function App() {
  const [isAuth, setIsAuth] = React.useState(false);
  const [load, setLoad] = React.useState(true);

  React.useEffect(() => {
    if (localStorage.getItem("auth")) {
      setIsAuth(true);
    }
    setLoad(false);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        load,
        isAuth,
        setIsAuth,
      }}
    >
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
