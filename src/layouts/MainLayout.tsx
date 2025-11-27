import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div className="w-full h-screen flex ">
      <header className="fixed top-0 left-0 w-full h-[72px] bg-transparent z-[20]">
        <Header />
      </header>

      <main className="h-full w-full overflow-hidden bg-transparent">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
