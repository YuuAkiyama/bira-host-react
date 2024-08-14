import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Detail from "./page/Detail";
import Home from "./page/Home";
import { PATH_DETAIL, PATH_LOGIN, PATH_UPLOAD } from "./route";
import Upload from "./page/Upload";
import Login from "./page/Login";
import NotFound from "./page/NotFound";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div>
      <h1>Basic Example</h1>
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={PATH_DETAIL} element={<Detail />} />
          <Route path={PATH_UPLOAD} element={<Upload />} />
          <Route path={PATH_LOGIN} element={<Login />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}
