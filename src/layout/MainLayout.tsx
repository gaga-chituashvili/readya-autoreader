import { Outlet } from "@tanstack/react-router";
import { Header } from "@/component/header/Header";
import { Footer } from "@/component/footer/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="pt-18">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
