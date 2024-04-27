import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => {
          return <Route path={route.path} element={route.component} />;
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
