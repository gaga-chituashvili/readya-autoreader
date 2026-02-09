import { Outlet } from "react-router-dom";
import { Header } from "../component/header/Header";
import { Footer } from "../component/footer/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
