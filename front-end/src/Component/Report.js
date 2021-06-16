import { Grid, makeStyles, Paper } from '@material-ui/core'
import React from 'react'
import Deposits from './Deposits'
import Orders from './Orders'
import clsx from 'clsx';
import BarChart from './Report/BarChart';
const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));
export default function Report() {
    const classes = useStyles();
    return (
        <div>
            
                    <BarChart></BarChart>
            
        </div>
    )
}
