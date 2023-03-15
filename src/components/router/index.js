import { Lists } from "../List/Lists";
import Login from "../Login/Login";
import { LogPoll } from "../LogPoll/LogPoll";

export const privateRoute = [
  // { path: "/custom", element: <Lists /> },
  { path: "/posts/:id", element: <Lists /> },
  { path: "/polls", element: <LogPoll /> },
];

export const publicRoute = [{ path: "/login", element: <Login /> }];
