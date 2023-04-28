import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import UseAxiosGet from '../../../hooks/UseAxiosGet';
import { Chart } from 'primereact/chart';
import { Button } from 'primereact/button';

export default function CategoryChart() {
    const navigate = useNavigate();
    const documentStyle = getComputedStyle(document.documentElement);
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const [chartKeys, setChartKeys] = useState({});
    const [chartValues, setChartValues] = useState({});

    const {data:categories,loading,refetch,error}=UseAxiosGet("manager/categories/");

    useEffect(()=>{
        if(categories){
            console.log("categories ",categories);
            console.log(Object.keys(categories));
            setChartKeys(Object.keys(categories));
            console.log(Object.values(categories));
            setChartValues(Object.values(categories));
            // console.log(documentStyle.getPropertyValue('--blue-400'));
        }
    },[categories])

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

    const categoriesNavigate=()=>{
        navigate("/categories")
    }

    return (
        <>
        <div className="card flex justify-content-center">
            <h2>categories</h2>
            <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
            <br></br>
            <Button onClick={categoriesNavigate}>add category from another</Button>
        </div>
        </>
    )
}