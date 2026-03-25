import { Outlet } from "@tanstack/react-router";
import { Header } from "@/component/header/Header";
import { Footer } from "@/component/footer/Footer";
import Breadcrumbs from "@/component/ui/Breadcrumbs";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <main className="pt-[4.1rem]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
