import { BrowserRouter, Routes, Route } from "react-router-dom";
import type { AppRoute } from "./routes/route";
import { routes } from "./routes/route";
import { App as AntdApp, ConfigProvider } from "antd";
import theme from "./theme";

const renderRoutes = (routes: AppRoute[]) => {
  return routes.map((route) => (
    <Route key={route.path} path={route.path} element={<route.element />}>
      {route.children && renderRoutes(route.children)}
    </Route>
  ));
};

const App = () => {
  const BASENAME = import.meta.env.BASE_URL;
  return (
    <BrowserRouter basename={BASENAME}>
      <ConfigProvider theme={theme}>
        <AntdApp>
          <Routes>{renderRoutes(routes)}</Routes>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
