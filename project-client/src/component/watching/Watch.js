import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';
import axios from 'axios'

export default function Watch() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [date, setDate] = useState(null);
    const [incomes, setIncomes] = useState(null);
    const [expenses, setExpenses] = useState(null);
    const [charity, setCharity] = useState(null);
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    async function getData() {
        try {
          const incomes = await axios.get('http://localhost:8000/incomes/totalsum/1', {
            params: {
              //month: 1,//dt.getMonth(),
              month: date.getMonth()+1,
              year: date.getFullYear()
            }   
          }); 
          const expenses = await axios.get('http://localhost:8000/expenses/totalprice/1', {
            params: {
              month: date.getMonth()+1,
              year: date.getFullYear()
            }    
          });
          const charity = await axios.get('http://localhost:8000/expenses/charity/1', {
        params: {
          month: date.getMonth()+1,
          year: date.getFullYear()
        }
      });

          console.log("incomes", incomes.data.totalSum);
          setIncomes((incomes.data.totalSum));
          console.log("expenses", expenses.data.totalPrice);
          setExpenses((expenses.data.totalPrice));
          console.log("charity", (charity.data)[charity.data.length - 1].totalCharity);
          setCharity((charity.data)[charity.data.length - 1].totalCharity);
          console.log("date",date.getMonth()+1);
          console.log("date",date.getFullYear());
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        getData();
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: [month[date.getMonth()]+"😁"],
            datasets: [
                {
                    label: 'Incomes',
                    backgroundColor: documentStyle.getPropertyValue('--red-600'),
                    borderColor: documentStyle.getPropertyValue('--red-500'),
                    data: [incomes]
                },
                {
                    label: 'Expenses',
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    data: [expenses]
                },
                {
                    label: 'Charity',
                    backgroundColor: documentStyle.getPropertyValue('--green-800'),
                    borderColor: documentStyle.getPropertyValue('--green-800'),
                    data: [charity]
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (        
        <div className="card">
            <Card title="Watching 🕶" style={{ width: '370px' }}>
                <p className="m-0">
                    <Calendar value={date} onChange={(e) => setDate(e.value)} view="month" dateFormat="mm/yy" />
                    <br /><br /><br />
                    <Chart type="bar" data={chartData} options={chartOptions} />
                </p>
            </Card>
        </div>
    )
}