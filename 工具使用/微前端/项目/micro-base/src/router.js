import Home from "./pages/home/index.js";
import About from "./pages/about/index.js";

export const routes = [
  {
    path: "/",
    component: <Home></Home>,
  },
  {
    path: "/about",
    component: <About></About>,
  },
];
