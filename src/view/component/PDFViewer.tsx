import { useState } from "react";
import { Document, Page } from "react-pdf";

const options = {
  cMapUrl: "/cmaps/",
};

export default function PDFViewer({
  url,
  showPager,
  onDocumentLoaded,
  isFullscreenEnabled = false,
}: {
  url: string;
  showPager: boolean;
  onDocumentLoaded?: () => void;
  isFullscreenEnabled?: boolean;
}) {
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
    onDocumentLoaded?.();
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function onClickPage() {
    if (isFullscreenEnabled) {
      document
        .getElementsByClassName("react-pdf__Page__canvas")[0]!
        .requestFullscreen();
    }
  }

  return (
    <>
      <Document
        options={options}
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        className={"cursor-pointer"}
        loading={
          <div
            className="bg-white"
            style={{
              aspectRatio: "1 / 1.414",
              height: "80vh!important",
              width: "auto!important",
            }}
          ></div>
        }
      >
        <Page onClick={onClickPage} pageNumber={pageNumber} />
      </Document>
      {showPager ? (
        <div>
          <p>
            ページ {pageNumber || (numPages ? 1 : "--")} / {numPages || "--"}
          </p>
          <div className="flex justify-start gap-2">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${pageNumber <= 1 ? "opacity-50 cursor-not-allowed" : ""}`}
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
            >
              ＜
            </button>
            <button
              type="button"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${pageNumber >= numPages ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              ＞
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
