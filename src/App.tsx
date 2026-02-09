import "./App.css";
import MainLayout from "./layout/MainLayout";
import { RoutesConfig } from "./routes/Routes";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {RoutesConfig.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
