import React from 'react';
import { generateCsv, download, mkConfig } from 'export-to-csv';

const preprocessData = (data) => {
  return data.map(item => {
    if (item.runTime && typeof item.runTime === 'object') {
      item.runTime = `${item.runTime.hours}H ${item.runTime.minutes}M`;
    }
    if (item.stopTime && typeof item.stopTime === 'object') {
      item.stopTime = `${item.stopTime.hours}H ${item.stopTime.minutes}M`;
    }
    return item;
  });
};

const SaveAsCSVButton = ({ data, fileName }) => {
  const saveAsCSV = (e) => {
    e.preventDefault();
    const preprocessedData = preprocessData(data);
    const csvConfig = mkConfig({ 
      useKeysAsHeaders: true, 
      filename: fileName // Set filename dynamically
    });
    const csv = generateCsv(csvConfig)(preprocessedData);
    download(csvConfig)(csv);
  };

  return (
    <button
      className="w-full px-2 py-1 lg:mt-1 bg-[#19DAAD] hover:bg-[#19DABF] rounded font-semibold text-[#162637]"
      onClick={saveAsCSV}
    >
      <span>Save As CSV</span>
    </button>
  );
};

export default SaveAsCSVButton;
