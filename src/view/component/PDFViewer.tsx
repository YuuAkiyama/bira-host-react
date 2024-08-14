import { useState } from "react";
import { Document, Page } from "react-pdf";
import OverlayedLoader from "./OverlayedLoader";

const options = {
  cMapUrl: "/cmaps/",
};

export default function PDFViewer({ url }: { url: string }) {
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
    setIsLoading(false);
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
      {isLoading ? (
        <>
          <OverlayedLoader />
          <div className="h-dvh"></div>
        </>
      ) : (
        <div>
          <p>
            ページ {pageNumber || (numPages ? 1 : "--")} / {numPages || "--"}
          </p>
          <div className="flex gap-2">
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
      )}
    </>
  );
}
