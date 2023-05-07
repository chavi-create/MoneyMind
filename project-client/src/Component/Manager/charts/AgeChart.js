import React, { useState, useEffect } from "react";
import UseAxiosGet from "../../../hooks/UseAxiosGet";
import { Chart } from "primereact/chart";
import ChartDataLabels from "chartjs-plugin-datalabels";

export default function AgeChart() {
  const documentStyle = getComputedStyle(document.documentElement);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const [chartKeys, setChartKeys] = useState({});
  const [chartValues, setChartValues] = useState({});

  const { data: ages, loading, refetch, error } = UseAxiosGet("manager/ages/");

  useEffect(() => {
    if (ages) {
      console.log("ages ", ages);
      console.log(Object.keys(ages));
      setChartKeys(Object.keys(ages));
      console.log(Object.values(ages));
      setChartValues(Object.values(ages));
      // console.log(documentStyle.getPropertyValue('--blue-400'));
    }
  }, [ages]);

  useEffect(() => {
    // let arr=[]

    // var randomColor = Math.floor(Math.random()*16777215).toString(16);
    
    // chartKeys.forEach(element => {
    //     arr.push(documentStyle.getPropertyValue())
    // });
    // const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: chartKeys,
      datasets: [
        {
          data: chartValues,
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--green-500"),
            documentStyle.getPropertyValue("--red-500"),
            documentStyle.getPropertyValue("--pink-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--green-400"),
            documentStyle.getPropertyValue("--red-400"),
            documentStyle.getPropertyValue("--pink-400"),
          ],
        },
      ],
    };
    const options = {
      // tooltips: {
      //     enabled: true
      //   },
      plugins: {
        datalabels: {
          //show the percentage:
          formatter: (value, ctx) => {
            let sum = 0;
            let dataArr = ctx.chart.data.datasets[0].data;
            dataArr.map((data) => {
              sum += data;
            });
            let percentage = ((value * 100) / sum).toFixed(2) + "%";
            return percentage;
          },
          color: "#fff",
        },

        //show the labels:
        // formatter: function (value, context) {
        //     return context.chart.data.labels[
        //         context.dataIndex
        //     ];},

        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [chartKeys, chartValues]);
  return (
    <>
      <div className="card flex justify-content-center">
        <h2>ages</h2>
        <Chart
          type="pie"
          data={chartData}
          options={chartOptions}
          plugins={[ChartDataLabels]}
          className="w-full md:w-30rem"
        />
        <br></br>
      </div>
    </>
  );
}
