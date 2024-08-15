import { ChangeEvent, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Bira } from "../../domain/bira/model";
import { NewBiraRepository } from "../../domain/bira/repository";
import { isValidDateString } from "../../lib/date";
import { NewStorage } from "../../lib/storage";
import OverlayedLoader from "../component/OverlayedLoader";
import PDFViewer from "../component/PDFViewer";
import { PATH_HOME } from "../route";
import { QRCodeSVG } from "qrcode.react";
import { AdminContext } from "../context/AdminContext";

export default function Detail() {
  const params = useParams();
  const navigate = useNavigate();

  const isLoggedInAsAdmin = useContext(AdminContext);

  const [item, setItem] = useState<Bira | null>(null);
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDocumentLoaded, setIsDocumentLoaded] = useState(false);

  const api = NewBiraRepository();
  const storage = NewStorage();

  // init
  useEffect(() => {
    if (!params.id) {
      navigate(PATH_HOME);
      return;
    }
    setIsLoading(true);
    api
      .get(params.id)
      .then((item) => {
        if (!item) {
          toast.error("データの取得に失敗しました。");
          navigate(PATH_HOME);
          return;
        }
        setDate(item.date);
        setItem(item);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
        toast.error("データの取得に失敗しました。");
        navigate(PATH_HOME);
      });
  }, []);

  const onDocumentLoaded = () => {
    setIsDocumentLoaded(true);
  };

  const onClickDownload = () => {
    if (!item) {
      return;
    }
    window.open(item.url, "_blank");
  };

  const onChangeDate = async (e: ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    if (!params.id) {
      navigate(PATH_HOME);
      return;
    }
    if (!isValidDateString(date)) {
      alert(
        "すみません、対応していないブラウザのようです。。日付が yyyy-MM-dd の形式になっていません。",
      );
      return;
    }

    setDate(date);
    setIsLoading(true);
    try {
      await api.updateDate(params.id, date);
      toast.success("更新されました。");
    } catch (e) {
      console.error(e);
      toast.error("更新に失敗しました。");
    } finally {
      setIsLoading(false);
    }
  };

  const onClickDelete = async () => {
    if (!item || !params.id) {
      toast.error("削除対象のデータを取得できていません。");
      return;
    }
    if (!window.confirm("本当に削除しますか？")) {
      return;
    }

    setIsLoading(true);
    try {
      await api.delete(params.id);
      await storage.delete(item.name);
      toast.success("削除されました。");
      await new Promise((res) => setTimeout(res, 500));
      setIsLoading(false);
      navigate(PATH_HOME);
      return;
    } catch (e) {
      setIsLoading(false);
      console.error(e);
      toast.error("削除に失敗しました。");
    }
  };

  if (isLoading || !item) {
    return <OverlayedLoader />;
  }

  return (
    <div className="pdf-detail flex md:flex-row flex-col md:gap-16 gap-6 w-fit">
      <section>
        {!isDocumentLoaded ? (
          <>
            <OverlayedLoader />
            <div className="h-screen w-screen"></div>
          </>
        ) : (
          <></>
        )}
        <PDFViewer
          url={item.url}
          showPager={true}
          onDocumentLoaded={onDocumentLoaded}
          isFullscreenEnabled={true}
        />
      </section>
      <button
        onClick={onClickDownload}
        className="md:hidden bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        ダウンロード
      </button>
      <section className="flex flex-col items-start">
        <div className="hidden md:block mb-8 p-2 bg-white">
          <QRCodeSVG value={item.url} />
        </div>
        {isLoggedInAsAdmin && (
          <>
            <div>
              <span>日付: </span>
              <span className="text-caption">※選択し直すと変更されます</span>
            </div>
            <input
              type="date"
              name="date"
              className="border-2 border-indigo-300 p-1 rounded"
              value={date}
              onChange={onChangeDate}
            />
            <button
              className="mt-4 sm:mt-12 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={onClickDelete}
            >
              削除
            </button>
          </>
        )}
      </section>
    </div>
  );
}
