import { Link, Outlet, useLocation } from "react-router-dom";
import { PATH_HOME, PATH_UPLOAD } from "../route";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";

export default function Layout() {
  const location = useLocation();
  const isLoggedInAsAdmin = useContext(AdminContext);
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav className="flex flex-row items-center p-2 bg-blue-200 underline w-full border-b-2 border-indigo-400">
        <Link to={PATH_HOME}>
          <img className="h-12" src="/app-icon.png" />
        </Link>
        <ul className="pl-4 flex gap-4">
          {/* TODO: いまのページに応じて切り替え */}
          {location.pathname !== PATH_HOME ? (
            <li>
              <Link to={PATH_HOME}>&lt; 戻る</Link>
            </li>
          ) : isLoggedInAsAdmin ? (
            <li>
              <Link to={PATH_UPLOAD}>アップロード</Link>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </nav>
      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <main className="px-8 md:px-10 pt-4 pb-10">
        <Outlet />
      </main>
    </div>
  );
}
