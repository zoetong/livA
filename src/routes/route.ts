import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import LivePage from "../pages/Live";
import MainLayout from "../layouts/MainLayout";

export interface AppRoute {
  path: string;
  element: React.ComponentType;

  name?: string;
  children?: AppRoute[];
}

// 主布局下的子路由
export const mainRoutes: AppRoute[] = [
  {
    path: "/",
    element: HomePage,
    name: "sidebar_home",
  },
  {
    path: "/login",
    element: LoginPage,
    name: "sidebar_assets",
  },
  {
    path: "/live",
    element: LivePage,
    name: "sidebar_profile",
  },
];

// 顶层路由
export const routes: AppRoute[] = [
  {
    path: "/",
    element: MainLayout,
    children: mainRoutes,
  },
];
