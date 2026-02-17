export const EvaluationExportButtons = ({ tenderId, api }) => {
  const download = (blob, filename) => {
    const url = window.URL.createObjectURL(new Blob([blob]));
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  };

  const exportPdf = async () => {
    const res = await api.downloadPdf(tenderId);
    download(res.data, `tender-${tenderId}-consolidated.pdf`);
  };

  const exportExcel = async () => {
    const res = await api.downloadExcel(tenderId);
    download(res.data, `tender-${tenderId}-consolidated.xlsx`);
  };

  return (
    <div className="space-x-2">
      <button className="px-3 py-1 bg-gray-700 text-white rounded" onClick={exportPdf}>
        Export PDF
      </button>
      <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={exportExcel}>
        Export Excel
      </button>
    </div>
  );
};
