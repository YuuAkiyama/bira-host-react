import { ChangeEvent, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { NewBiraRepository } from "../../domain/bira/repository";
import { formatDate, getCurrentDate, isValidDateString } from "../../lib/date";
import OverlayedLoader from "../component/OverlayedLoader";

import { useNavigate } from "react-router-dom";
import { extractFileExtension } from "../../lib/file";
import { NewStorage } from "../../lib/storage";

export default function Upload() {
  const api = NewBiraRepository();
  const storage = NewStorage();
  const today = getCurrentDate();
  const todayString = formatDate(today);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(todayString);
  const [file, setFile] = useState<File | null>(null);

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };
  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      if (file.size > 21_000_000) {
        e.target.value = "";
        toast("ファイルサイズは20MB以下にしてください", {
          position: "top-center",
          icon: "🙏",
        });
        return;
      }
      setFile(file);
      return;
    }
  };

  const onClickButton = useCallback(async () => {
    if (!date) {
      toast.error("日付を入力してください");
      return;
    }

    if (!isValidDateString(date)) {
      toast.error(
        "すみません、非対応のブラウザのようです。。。日付が yyyy-MM-dd の形式になっていません。",
      );
      return;
    }

    if (!file) {
      toast.error("ファイルを選択してください");
      return;
    }

    setIsLoading(true);

    // TODO: このあたり BiraService としてまとめる
    const filename = uuidv4() + extractFileExtension(file.name, ".jpg");

    try {
      await storage.upload(file, filename);
      const url = await storage.getDownloadURL(filename);
      const createdId = await api.add({
        name: filename,
        url,
        date: date,
      });
      toast.success("登録が完了しました。");
      navigate("/detail/" + createdId);
    } catch (e) {
      console.error(e);
      toast.error("登録に失敗しました。");
    }

    setIsLoading(false);
  }, [date, file]);

  return (
    <>
      {isLoading ? <OverlayedLoader /> : <></>}
      <section className="max-sm:w-full flex flex-col w-fit bg-gray-200 md:px-12 px-2 py-10  rounded">
        <div>
          <span>1. </span>
          <span>お知らせの日付</span>
          <input
            className="ml-2 border-2 border-indigo-300 rounded p-1"
            type="date"
            name="date"
            value={date}
            onChange={onChangeDate}
          />
        </div>
        <div className="mt-12">
          <span>2. </span>
          <input
            type="file"
            accept="application/pdf"
            name="upload"
            onChange={onChangeFile}
          />
          <div className="text-sm text-slate-700">
            <div className="mt-2">
              ※↓でアドビがPDFのサイズ削減してくれます。
            </div>
            <a
              className="text-blue-600 underline dark:text-blue-500 hover:no-underline"
              href="https://www.adobe.com/jp/acrobat/online/compress-pdf.html"
              target="_blank"
            >
              https://www.adobe.com/jp/acrobat/online/compress-pdf.html
            </a>
          </div>
        </div>
        <button
          onClick={onClickButton}
          className="self-end mt-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit"
        >
          登録
        </button>
      </section>
    </>
  );
}
