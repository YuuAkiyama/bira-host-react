import { Link, Outlet } from "react-router-dom";
import { PATH_LOGIN, PATH_UPLOAD } from "../route";

export default function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul className="pl-4 flex gap-4">
          {/* TODO: いまのページに応じて切り替え */}
          <li>
            <Link to="/">一覧</Link>
          </li>
          <li>
            <Link to={PATH_UPLOAD}>アップロード</Link>
          </li>
          <li>
            <Link to={PATH_LOGIN}>ログイン/ログアウト</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <main className="px-10 pb-10">
        <Outlet />
      </main>
    </div>
  );
}
