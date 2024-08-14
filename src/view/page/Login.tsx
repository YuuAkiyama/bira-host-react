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
      <h2>Login</h2>
      {userName == "" ? (
        <div>
          <button onClick={onClickLogin}>Googleログイン</button>
        </div>
      ) : (
        <div>
          <div>
            <div>ログイン中のユーザー: {userName}</div>
            <button onClick={onClickLogout}>Googleログアウト</button>
          </div>
        </div>
      )}
    </div>
  );
}
