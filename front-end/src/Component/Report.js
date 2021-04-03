import { Grid, makeStyles, Paper } from '@material-ui/core'
import React from 'react'
import Deposits from './Deposits'
import Orders from './Orders'
import clsx from 'clsx';
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
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                    <Paper className={classes.fixedHeight}>
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={classes.fixedHeight}>
                        <Deposits />
                    </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Orders />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
