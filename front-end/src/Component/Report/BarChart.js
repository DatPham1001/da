import { Box, Button, Grid } from '@material-ui/core';
import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import "./Report.css";
export default function BarChart() {
    const [random, setrandom] = useState([Math.floor(Math.random() * 11) + 4, Math.floor(Math.random() * 5) + 5, Math.floor(Math.random() * 14) + 6,
    Math.floor(Math.random() * 7) + 5, Math.floor(Math.random() * 20) + 2, Math.floor(Math.random() * 6) + 3])
    const [applyData, setapplyData] = useState([15, 10, 20, 23, 22, 19]);
    const [series, setseries] = useState([
        {
            name: 'Ứng viên ứng tuyển',
            data: applyData
        }, {
            name: 'Ứng viên đạt yêu cầu',
            data: random
        }])
    const [option, setoption] = useState({
        chart: {
            height: 600,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                borderRadius: 0,
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val;
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },

        xaxis: {
            min: 1000,
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            position: 'top',
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            },
            tooltip: {
                enabled: true,
            }
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                    return val + "%";
                }
            }, title: {
                text: 'Báo cáo ứng viên theo tháng'
            }

        },
    })
    const [optionPie, setoptionPie] = useState({
        chart: {
            type: 'donut',
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 400
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        labels: ['Ứng viên ứng tuyển', 'Ứng viên đạt'],
        title: {
            text: 'Tổng tỉ lệ ứng viên theo tháng',
            align: 'center',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                fontFamily: undefined,
                color: '#263238'
            },
        }


    })
    const [seriesPie, setseriesPie] = useState([applyData.reduce((a, b) => a + b, 0), random.reduce((a, b) => a + b, 0)])
    return (
        <div>
            <Box display='flex'>
                <Button
                    className="product-btn"
                    variant="contained"
                    color="primary"
                    style={{ marginBottom: 20, marginRight: 10 }}
                // onClick={() => setimportCvModel(true)}
                >
                    Báo cáo tháng
                      </Button>
                <Button
                    className="product-btn"
                    variant="contained"
                    color="primary"
                    style={{ marginBottom: 20 }}
                // onClick={handleClickOpen}
                >
                    Báo cáo tuần
                      </Button>
            </Box>
            <Grid container spacing={3} style={{ marginTop: 10 }}>
                <Grid lg={5} style={{ marginTop: 25 }}>
                    <ReactApexChart options={optionPie} series={seriesPie} type="donut" />
                </Grid>
                <Grid lg={7}>
                    <ReactApexChart options={option} series={series} type="bar" height={350} />
                </Grid>

            </Grid>
        </div>
    )
}
