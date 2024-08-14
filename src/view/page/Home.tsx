import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Bira } from "../../domain/bira/model";
import { NewBiraRepository } from "../../domain/bira/repository";
import { formatDate, getCurrentDate } from "../../lib/date";
import { Link } from "react-router-dom";
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
    console.log("load");
  }, [date, loadBiraList]);

  if (isLoading) {
    // TODO: Loader
    return <div>よみこみ中</div>;
  }

  return (
    <div>
      <h2>Home</h2>
      <input type="date" name="date" value={date} onChange={onChangeDate} />
      <span>以降のお知らせ</span>
      {items.map((item) => {
        return (
          <div key={item.id}>
            <Link to={PATH_DETAIL_TO(item.id)}>{item.id}</Link>
          </div>
        );
      })}
    </div>
  );
}
