"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    // AnimationSpec,
} from "chart.js";

// Styles
import Bstyle from "./BarChart.module.scss";

const BarChart = () => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        BarElement,
        Title,
        Tooltip,
        Legend,
        Filler
    );

    const beneficios = [72, 56, 20, 36, 80, 40, 30, 50, 25, 30, 12, 60];
    const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];

    const misOptions = {
        responsive: true,
        animation: {
            duration: 1000, // Duración de la animación en milisegundos
            easing: "easeInOutQuart", // Tipo de animación (opcional)
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                align: "start",
                text: "Gráfico de Beneficios", // Título de la gráfica
                color: "#3b6c7f", // Color del título
                font: {
                    size: 18, // Tamaño de la fuente del título
                    weight: "bold", // Peso de la fuente del título
                },
            },
        },
        scales: {
            y: {
                min: 0,
                max: 100,
                grid: {
                  display: true // Desactivar la malla de fondo en el eje x
              }
            },
            x: {
                ticks: { color: "#1a2932" },
                grid: {
                  display: false // Desactivar la malla de fondo en el eje x
              }
            },
        },
    };

    const miData = {
        labels: meses,
        datasets: [
            {
                label: "Beneficios",
                data: beneficios,
                backgroundColor: "#93c1cd",
                borderRadius: 7,
                barThickness: 70,
            },
        ],
    };

    return (
        <Bar data={miData} options={misOptions} className={Bstyle.BarChart} />
    );
};

export default BarChart;
