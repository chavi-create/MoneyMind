import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';
import axios from 'axios'

export default function CurrentWatch() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [date, setDate] = useState(new Date());
    const [incomes, setIncomes] = useState(null);
    const [expenses, setExpenses] = useState(null);
    const [charity, setCharity] = useState(null);
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

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

    // useEffect(()=>{if (date) },[date]);
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

    useEffect(() => {
       getData();
    }, [date]);

    return (        
        <div className="card">
            <Card title="Watching 🕶" style={{ width: '370px' }}>
                <p className="m-0">
                    <Calendar value={date} onChange={(e) => setDate(e.value)} view="month" dateFormat="mm/yy" />
                    <br /><br /><br />
                    <Chart type="bar" data={data} options={options} />
                </p>
            </Card>
        </div>
    )
}
     




//🥱פה ניסיתי לעשות שההוצאות והמעשרות יהיו מגובבים באותו באר גררררררררררר
// import React, { useState, useEffect } from 'react';
// import { Chart } from 'primereact/chart';
// import { Card } from 'primereact/card';
// import { Calendar } from 'primereact/calendar';

// export default function VerticalBarDemo() {
//     const [chartDataI, setChartDataI] = useState({});
//     const [chartDataE, setChartDataE] = useState({});
//     const [chartOptionsI, setChartOptionsI] = useState({});
//     const [chartOptionsE, setChartOptionsE] = useState({});
//     const [date, setDate] = useState(null);

//     useEffect(() => {
//         const documentStyle = getComputedStyle(document.documentElement);
//         const textColor = documentStyle.getPropertyValue('--text-color');
//         const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
//         const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
//         const dataI = {
//             // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//             labels: ['January'],
//             datasets: [
//                 {
//                     label: 'Incomes',
//                     backgroundColor: documentStyle.getPropertyValue('--red-600'),
//                     borderColor: documentStyle.getPropertyValue('--red-500'),
//                     data: [65, 59, 80, 81, 56, 55, 40]
//                 }
//             ]
//         };
//         const dataE = {
//             // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//             labels: ['January'],
//             datasets: [                
//                 {
//                     label: 'Charity',
//                     backgroundColor: documentStyle.getPropertyValue('--green-800'),
//                     borderColor: documentStyle.getPropertyValue('--green-800'),
//                     data: [20, 48, 40, 19, 86, 27, 90]
//                 },
//                 {
//                     label: 'Expenses',
//                     backgroundColor: documentStyle.getPropertyValue('--green-600'),
//                     borderColor: documentStyle.getPropertyValue('--green-600'),
//                     data: [70, 48, 40, 19, 86, 27, 90]
//                 }
//             ]
//         };
//         const optionsI = {
//             maintainAspectRatio: false,
//             aspectRatio: 0.8,
//             plugins: {
//                 // tooltips: {
//                 //     mode: 'index',
//                 //     intersect: false
//                 // },
//                 legend: {
//                     labels: {
//                         fontColor: textColor
//                     }
//                 }
//             },
//             scales: {
//                 x: {
//                     // stacked: true,
//                     ticks: {
//                         color: textColorSecondary,
//                         font: {
//                             weight: 500
//                         }
//                     },
//                     grid: {
//                         display: false,
//                         drawBorder: false
//                     }
//                 },
//                 y: {
//                     // stacked: true,
//                     ticks: {
//                         color: textColorSecondary
//                     },
//                     grid: {
//                         color: surfaceBorder,
//                         drawBorder: false
//                     }
//                 }
//             }
//         };
//         const optionsE = {
//             maintainAspectRatio: false,
//             aspectRatio: 0.8,
//             plugins: {
//                 // tooltips: {
//                 //     mode: 'index',
//                 //     intersect: false
//                 // },
//                 legend: {
//                     labels: {
//                         fontColor: textColor
//                     }
//                 }
//             },
//             scales: {
//                 x: {
//                     stacked: true,
//                     ticks: {
//                         color: textColorSecondary,
//                         font: {
//                             weight: 500
//                         }
//                     },
//                     grid: {
//                         display: false,
//                         drawBorder: false
//                     }
//                 },
//                 y: {
//                     stacked: true,
//                     ticks: {
//                         color: textColorSecondary
//                     },
//                     grid: {
//                         color: surfaceBorder,
//                         drawBorder: false
//                     }
//                 }
//             }
//         };

//         setChartDataI(dataI);
//         setChartDataE(dataE);
//         setChartOptionsI(optionsI);
//         setChartOptionsE(optionsE);
//     }, []);

//     return (
        
//         <div className="card">
//             <Card title="Watching" style={{ width: '370px' }}>
//             <p className="m-0">
//             <Calendar value={date} onChange={(e) => setDate(e.value)} view="month" dateFormat="mm/yy" />
//             <br /><br /><br />
//             <Chart type="bar" data={chartDataI} options={chartOptionsI} />
//             <Chart type="bar" data={chartDataE} options={chartOptionsE} />
//             </p>
//             </Card>
//         </div>
        


//     )
// }
        