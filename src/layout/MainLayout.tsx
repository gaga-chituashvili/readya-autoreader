import { Outlet } from "@tanstack/react-router";
import { Header } from "@/component/header/Header";
import { Footer } from "@/component/footer/Footer";
import Breadcrumbs from "@/component/ui/Breadcrumbs";
import { ScrollToTop } from "@/component/ui/ScrollToTop";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <main className="pt-[4.1rem]">
        <Outlet />
      </main>
      <ScrollToTop />
      <Footer />
    </>
  );
};

export default MainLayout;
