'use client'
import React, { useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
  Highcharts.setOptions({
    credits: {
      enabled: false
    },
  });
}

const ProductionBarchart = ({ data }) => {
  const chartComponentRef = useRef(null);

  // Filter and process the data
  const processedData = data
    .filter(item => item.Date.includes('Total') && item.Date !== 'Grand Total')
    .map(item => ({
      Date: item.Date.replace('Total', '').trim(),
      production: item.production
    }));

  const options = {
    chart: {
      backgroundColor: "#162637",
      type: "column",
    },
    title: {
      text: "Date vs Production",
      style: {
        color: "white",
        fontSize: "16px",
        fontWeight: "semibold",
      },
    },
    xAxis: {
      categories: processedData.map(item => item.Date),
      title: {
        text: "Date",
        style: {
          color: "white",
          fontSize: "16px",
          fontWeight: "semibold",
        },
      },
      labels: {
        style: {
          color: "white", // Color for x-axis labels
        },
      },
      gridLineWidth: 0,
    },
    yAxis: {
      title: {
        text: "Production",
        style: {
          color: "white",
          fontSize: "16px",
          fontWeight: "semibold",
        },
      },
      labels: {
        style: {
          color: "white", // Color for y-axis labels
        },
      },
    },
    legend: {
      itemStyle: {
        color: "white", // Set the desired color for the legend item
      },
    },
    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          menuItems: [
            'viewFullscreen',
            "downloadPNG",
            "downloadJPEG",
            "downloadPDF",
            "downloadSVG",
          ],
        },
      },
    },
    navigation: {
      buttonOptions: {
        enabled: true,
      },
    },
    series: [
      {
        name: "Production",
        data: processedData.map(item => item.production),
      },
    ],
  };

  return (
    <div className="border-2 rounded-md ">
      <HighchartsReact highcharts={Highcharts} options={options} ref={chartComponentRef} containerProps={{ className: 'rounded-md overflow-hidden' }}/>
    </div>
  );
};

export default ProductionBarchart;
