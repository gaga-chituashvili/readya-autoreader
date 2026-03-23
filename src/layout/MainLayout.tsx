import { Outlet } from "@tanstack/react-router";
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
