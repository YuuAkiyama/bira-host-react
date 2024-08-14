import { useState } from "react";
import { Document, Page } from "react-pdf";

const options = {
  cMapUrl: "/cmaps/",
};

export default function PDFViewer({
  url,
  showPager,
  onDocumentLoaded,
}: {
  url: string;
  showPager: boolean;
  onDocumentLoaded?: () => void;
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

  return (
    <>
      <Document
        options={options}
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
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
