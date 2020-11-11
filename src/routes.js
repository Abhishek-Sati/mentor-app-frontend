import Home from "./components/Home";
import Detail from "./components/Detail";
import Error404 from "./components/Common/Error404";

export default [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/:mentor_id",
    exact: true,
    component: Detail,
  },
  {
    path: "*",
    component: Error404,
  },
];
