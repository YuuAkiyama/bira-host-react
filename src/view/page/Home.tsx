import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bira } from "../../domain/bira/model";
import { NewBiraRepository } from "../../domain/bira/repository";
import { formatDate, getCurrentDate } from "../../lib/date";
import OverlayedLoader from "../component/OverlayedLoader";
import PDFViewer from "../component/PDFViewer";
import { PATH_DETAIL_TO } from "../route";

export default function Home() {
  const api = NewBiraRepository();
  const today = getCurrentDate();
  const todayString = formatDate(today);

  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<Bira[]>([]);
  const [date, setDate] = useState(todayString);

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
    const dateString = e.target.value;
    setDate(dateString);
  };

  const loadBiraList = useCallback(async (date: string) => {
    setIsLoading(true);
    try {
      // NOTE: 全件取得しているので気が向いたらページ分割する
      const ls = await api.list(date);
      setItems(ls);
    } catch (e) {
      console.error(e);
      alert("読み込みに失敗しました。");
    }
    setIsLoading(false);
  }, []);

  // init
  useEffect(() => {
    loadBiraList(date);
  }, []);

  useEffect(() => {
    loadBiraList(date);
  }, [date, loadBiraList]);

  if (isLoading) {
    return <OverlayedLoader />;
  }

  return (
    <div>
      <section className="bg-gray-200 w-fit rounded px-4 py-2">
        <input
          type="date"
          className="border-2 border-indigo-300 p-1 rounded"
          name="date"
          value={date}
          onChange={onChangeDate}
        />
        <span className="ml-2">以降のお知らせ</span>
      </section>
      <section className="my-4 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {items.map((item) => {
          return (
            <div key={item.id} className="cursor-pointer w-fit">
              <Link to={PATH_DETAIL_TO(item.id)}>
                <PDFViewer url={item.url} showPager={false} />
              </Link>
            </div>
          );
        })}
      </section>
    </div>
  );
}
