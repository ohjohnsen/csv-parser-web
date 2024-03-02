import { useCSVReader, formatFileSize } from "react-papaparse";

export default function Reader() {
  const { CSVReader } = useCSVReader();

  const [col, setCol] = useState<string[]>([]);
  const \[val, setVal] = useState<string[\][]>([]);

  return (
    <CSVReader
      onUploadAccepted={(results: any) => {
        const value: string[][] = results.data;
        const filtered = value.filter((_, i) => i !== 0);
        setCol(value[0]);
        setVal(filtered);
      }}
      config={{ worker: true }}
      noDrag
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
        Remove,
      }: any) => (
        <>
          <div {...getRootProps()}>
            {acceptedFile ? (
              <>
                <div className="info-container">
                  <div>
                    <p>{acceptedFile.name}</p>
                    <span>{formatFileSize(acceptedFile.size)}</span>
                  </div>
                  <div className="info__progress">
                    <ProgressBar />
                  </div>
                  <div {...getRemoveFileProps()} className="info__remove">
                    <Remove color={"red"} />
                  </div>
                </div>
              </>
            ) : (
              <button>Upload file</button>
            )}
          </div>
          <table>
            <thead>
              <tr>
                {col.length > 0 &&
                  col.map((col: string, i: number) => <th key={i}>{col}</th>)}
              </tr>
            </thead>
            <tbody>
              {val.map((val: string[], i: number) => (
                <tr key={i}>
                  {val.map((v, i) => (
                    <td key={i}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </CSVReader>
  );
}
