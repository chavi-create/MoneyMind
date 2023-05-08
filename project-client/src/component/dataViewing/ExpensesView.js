import React, { useState, useEffect, useContext } from "react";
import { Chart } from "primereact/chart";
import ChartDataLabels from "chartjs-plugin-datalabels";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import { Card } from "primereact/card";
import UserContext from "../user/UserContext";

export default function ExpensesView() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [date, setDate] = useState(new Date());
  const [expenses, setExpenses] = useState();
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [chartKeys, setChartKeys] = useState({});
  const [chartValues, setChartValues] = useState({});

  useEffect(() => {
    console.log("===", { user });
    if (user.familyId) {
      axios
        .get(`http://localhost:8000/expenses/getexpense/${user.familyId}`, {
          params: { month: date.getMonth() + 1, year: date.getFullYear() },
        })
        .then((data) => {
          console.log({ data });
          setExpenses(data.data);
        });
    }
  }, [date, user.familyId]);

  useEffect(() => {
    if (expenses) {
      console.log("expenses ", expenses);
      console.log(Object.keys(expenses));
      setChartKeys(Object.keys(expenses));
      console.log(Object.values(expenses));
      setChartValues(Object.values(expenses));
    }
  }, [expenses]);
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
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
      plugins: {
        datalabels: {
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
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
      onClick: function (evt, element) {
        if (element.length > 0) {
          let index = element[0].index;
          // console.log("onclick: ",index);
          // console.log(chartKeys[index]);
          fetchTable(index);
        }
      },
    };
    setChartData(data);
    setChartOptions(options);
  }, [chartKeys, chartValues]);

  const fetchTable = (index) => {
    axios
      .get(
        `http://localhost:8000/expenses/expense_category/${user?.familyId}`,
        {
          params: {
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            categoryName: chartKeys[index],
          },
        }
      )
      .then((data) => {
        console.log(data.data);
        navigate("/expensesTable", { state: data.data });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="card flex justify-content-center">
      <Card className="md:w-25rem">
        <h2>expenses</h2>
        <div className="card flex justify-content-center">
          <Calendar
            value={date}
            onChange={(e) => setDate(e.value)}
            view="month"
            dateFormat="mm/yy"
          />
        </div>
        {date && (
          <Chart
            type="pie"
            data={chartData}
            options={chartOptions}
            plugins={[ChartDataLabels]}
            className="w-full md:w-30rem"
          />
        )}
      </Card>
    </div>
  );
}
