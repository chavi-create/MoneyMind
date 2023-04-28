import React, { useState, useEffect } from 'react';
import UseAxiosGet from '../../../hooks/UseAxiosGet';
import { Chart } from 'primereact/chart';

export default function CityChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const [chartKeys, setChartKeys] = useState({});
    const [chartValues, setChartValues] = useState({});

    const {data:cities,loading,refetch,error}=UseAxiosGet("manager/cities/");

    useEffect(()=>{
        if(cities){
            console.log("cities ",cities);
            console.log(Object.keys(cities));
            setChartKeys(Object.keys(cities));
            console.log(Object.values(cities));
            setChartValues(Object.values(cities));
            // console.log(documentStyle.getPropertyValue('--blue-400'));
        }
    },[cities])

    useEffect(() => {
        // let arr=[]
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
                        documentStyle.getPropertyValue('--blue-500'), 
                        documentStyle.getPropertyValue('--yellow-500'), 
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--red-500'),                        
                        documentStyle.getPropertyValue('--pink-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'), 
                        documentStyle.getPropertyValue('--yellow-400'), 
                        documentStyle.getPropertyValue('--green-400'),
                        documentStyle.getPropertyValue('--red-400'),                        
                        documentStyle.getPropertyValue('--pink-400')
                    ]
                }
            ]
        }
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [chartKeys,chartValues]);

    return (
        <>
        <div className="card flex justify-content-center">
            <h2>cities</h2>
            <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
        </div>
        </>
    )
}