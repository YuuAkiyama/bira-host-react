import { useCallback, useEffect, useState } from "react";
import { listenAuthStateChange, login, logout } from "../../lib/auth";
import { useNavigate } from "react-router-dom";
import { PATH_HOME } from "../route";
import toast from "react-hot-toast";

export default function Login() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    return listenAuthStateChange((user) => {
      if (!user) {
        return;
      }
      setUserName(user.displayName || "");
    });
  }, []);

  const onClickLogin = useCallback(async () => {
    try {
      await login();
      toast.success("ログインしました");
      navigate(PATH_HOME);
    } catch (e) {
      console.error(e);
      toast.error("エラーが発生しました");
    }
  }, [navigate]);

  const onClickLogout = useCallback(async () => {
    try {
      await logout();
      toast.success("ログアウトしました");
      navigate(PATH_HOME);
    } catch (e) {
      toast.error("エラーが発生しました");
      console.error(e);
    }
  }, [navigate]);

  return (
    <div>
      {userName == "" ? (
        <div className="my-8">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClickLogin}
          >
            Googleログイン
          </button>
        </div>
      ) : (
        <div>
          <div>
            <div className="my-8 bg-white rounded p-4 w-fit">
              ログイン中のユーザー: {userName}
            </div>
            <button
              onClick={onClickLogout}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              ログアウト
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
