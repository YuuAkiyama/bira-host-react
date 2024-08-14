import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Detail from "./page/Detail";
import Home from "./page/Home";
import { PATH_DETAIL, PATH_LOGIN, PATH_UPLOAD } from "./route";
import Upload from "./page/Upload";
import Login from "./page/Login";
import NotFound from "./page/NotFound";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { isAdmin, listenAuthStateChange } from "../lib/auth";
import { AdminContext } from "./context/AdminContext";

export default function App() {
  const [isLoggedInAsAdmin, setIsLoggedInAsAdmin] = useState(false);

  useEffect(() => {
    return listenAuthStateChange((userOrNull) => {
      if (!userOrNull) {
        setIsLoggedInAsAdmin(false);
        return;
      }
      isAdmin(userOrNull?.uid || "").then((res) => {
        setIsLoggedInAsAdmin(res);
      });
    });
  }, []);
  return (
    <div>
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <AdminContext.Provider value={isLoggedInAsAdmin}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={PATH_DETAIL} element={<Detail />} />
            {isLoggedInAsAdmin ? (
              <Route path={PATH_UPLOAD} element={<Upload />} />
            ) : (
              <></>
            )}
            <Route path={PATH_LOGIN} element={<Login />} />

            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AdminContext.Provider>
      <Toaster />
    </div>
  );
}
