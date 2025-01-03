import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./app/index.css";
import { router } from "./pages/routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router}></RouterProvider>,
);
