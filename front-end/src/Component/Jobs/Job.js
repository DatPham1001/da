
import React, { useEffect, useState } from 'react'
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Alert, Button, Collapse, Grow, Menu, MenuItem, Snackbar, TextField } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import BarChartIcon from '@material-ui/icons/BarChart';
import WorkIcon from '@material-ui/icons/Work';
import { useHistory } from 'react-router';
import MenuBar from '../MenuBar';
import { axiosGet, axiosPost, axiosPut } from '../../Api';
import Auth from '../../Auth';
import MaterialTable from 'material-table';
import "../Contact/Contact.css";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import Moment from 'moment';
import { KeyboardDatePicker, KeyboardDateTimePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { storage } from "../Contact/firebase"
import { setDate } from 'date-fns';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import EditIcon from '@material-ui/icons/Edit';
import AddBoxIcon from '@material-ui/icons/AddBox';
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                DatPham - Thesis
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        paddingLeft: theme.spacing(35)
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
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

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
export default function Job(props) {
    const classes = useStyles();
    const tableRef = React.createRef();
    const history = useHistory();
    const [alertCreated, setalertCreated] = useState(false);
    const [open, setOpen] = React.useState(false);

    const [checked, setchecked] = useState(true)
    const [tableGrid, settableGrid] = useState(12)
    const [tableGrid2, settableGrid2] = useState(8)
    const handleClickOpen = (e) => {
        settableGrid2(tableGrid)
        settableGrid(tableGrid2)
        setchecked((prev) => !prev);
    };
    const [job, setjob] = useState({ name: "", description: "", recuitmentStatus: true,id : "" })
    const handleCreateJob = (event) => {
        setjob((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value
        }));
    }
    const handleSubmit = () => {
        console.log(job)
        axiosPost(Auth.token, "job", job)
            .then((res) => {
                setalertCreated(true)
                tableRef.current && tableRef.current.onQueryChange()
            }).catch((e) => {
                console.log(e)
            });
    }
    const [openU, setOpenU] = React.useState(false);
  
    const handleCloseU = () => {
      setOpenU(false);

    };
    const handleUpdate = ()=>{
        console.log(job)
        axiosPut(Auth.token, "job/" +job.id, job)
            .then((res) => {
                setalertCreated(true)
                tableRef.current && tableRef.current.onQueryChange()
            }).catch((e) => {
                console.log(e)
            });
    }
    return (
        <div className={classes.root}>
            <MenuBar title="Quản lý vị trí công việc"></MenuBar>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Snackbar open={alertCreated} autoHideDuration={1000}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        onClose={() => setalertCreated(false)}
                    >
                        <Alert variant="filled" severity="success">
                            Tạo vị trí thành công!
                        </Alert>

                    </Snackbar>
                    <Box display='flex' justifyContent='flex-end'>
                        <Button
                            className="product-btn"
                            variant="contained"
                            color="primary"
                            style={{ marginBottom: 20 }}
                            // onClick={() => history.push("/contact/create")}
                            onClick={handleClickOpen}
                        >
                            Thêm mới
                        </Button>
                    </Box>
                    <Grid container >
                        <Grid sm={tableGrid}>
                            <MaterialTable
                                title="Danh sách vị trí"
                                icons={tableIcons}
                                tableRef={tableRef}
                                columns={[
                                    {
                                        title: 'STT', field: "stt", width: '2%',
                                        headerStyle: {
                                            textAlign: 'center',
                                            paddingLeft: 40,
                                        },
                                        cellStyle: {
                                            textAlign: 'center'
                                        },
                                    },
                                    {
                                        title: 'Vị trí', width: '17%', field: 'name',
                                        headerStyle: {
                                            paddingLeft: 20,
                                        },
                                        cellStyle: {
                                            paddingLeft: 22,
                                        },
                                    },
                                    {
                                        title: 'Mô tả', field: 'description',
                                        headerStyle: {
                                            paddingLeft: 20,
                                        },
                                        cellStyle: {
                                            paddingLeft: 22,
                                        },
                                    },
                                    {
                                        title: 'Trạng thái', field: 'recuitmentStatus',
                                        headerStyle: {
                                            paddingLeft: 20,
                                        },
                                        cellStyle: {
                                            paddingLeft: 22,
                                        },
                                    },
                                    {
                                        title: 'Ngày tạo', field: 'createdDate',
                                        headerStyle: {
                                            paddingLeft: 20,
                                        },
                                        cellStyle: {
                                            paddingLeft: 22,
                                        },
                                    },
                                ]}
                                data={query =>
                                    new Promise((resolve, reject) => {
                                        let url = 'job'
                                        // + query.search;
                                        axiosGet(Auth.token, url)
                                            .then(result => {
                                                console.log(result.data)
                                                let datas = result.data.map((item, index) => {
                                                    let tmp = Object.assign({}, item,
                                                        { stt: (index + 1) },
                                                        { createdDate: (Moment(item.createdDate).format('DD-MM-YYYY')) },
                                                    );
                                                    return tmp;
                                                })
                                                resolve({
                                                    data: datas,
                                                    page: 0,
                                                    totalCount: result.data.length,
                                                })
                                            })
                                    })
                                }
                                onRowClick={((e, rowData) =>
                                    console.log(rowData.id)
                                )}

                                options={{
                                    debounceInterval: 500,
                                    // selection: true,
                                    headerStyle: { backgroundColor: '#a5c3f2' },
                                    cellStyle: {},
                                    rowStyle: {
                                        textAlign: 'left',
                                    },
                                }}
                                actions={[
                                    {
                                        icon: RefreshIcon,
                                        tooltip: 'Refresh Data',
                                        isFreeAction: true,
                                        onClick: () => tableRef.current && tableRef.current.onQueryChange(),
                                    },
                                    {
                                        icon: EditIcon,
                                        tooltip: 'Sửa',
                                        onClick: (event, rowData) => {
                                            setjob(rowData)
                                            setOpenU(true);
                                        }
                                    },
                                    {
                                        icon: DeleteIcon,
                                        tooltip: 'Xóa',
                                        onClick: (event, rowData) => {
                                            console.log(rowData)
                                        }

                                    }
                                ]}
                            />
                        </Grid>
                        <Grid sm={4} spacing={4}>
                            {!checked && <Paper style={{ marginLeft: 10 }} elevation={4} className={classes.paper}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Tạo vị trí mới
                                </Typography>
                                <TextField
                                    error={false}
                                    className="text-input"
                                    id="name"
                                    style={{ marginBottom: 20 }}
                                    label="Tên vị trí"
                                    size="small"
                                    defaultValue={job.name}
                                    required
                                    onChange={(e) => handleCreateJob(e)}
                                /> <TextField
                                    error={false}
                                    className="text-input"
                                    id="description"
                                    style={{ marginBottom: 20 }}
                                    label="Mô tả "
                                    size="small"
                                    defaultValue={job.description}
                                    required
                                    onChange={(e) => handleCreateJob(e)}
                                />
                                <TextField
                                    size="small"
                                    id="recuitmentStatus"
                                    style={{ marginBottom: 20 }}
                                    className="text-input"
                                    select
                                    label="Trạng thái tuyển dụng"
                                    required
                                    defaultValue={job.recuitmentStatus}
                                    onChange={(event) => {
                                        setjob((prevState) => ({
                                            ...prevState,
                                            recuitmentStatus: event.target.value
                                        }));
                                    }}
                                >
                                    <MenuItem id="recuitmentStatus" value={false}>false</MenuItem>
                                    <MenuItem id="recuitmentStatus" value={true}>true</MenuItem>

                                </TextField>
                                <Button onClick={handleSubmit} variant="contained" c color="primary" autoFocus>
                                    Chấp nhận
                                </Button>
                            </Paper>}
                        </Grid>
                    </Grid>
                    <Dialog
                        open={openU}
                        onClose={handleCloseU}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{" Cập nhật vị trí"}</DialogTitle>
                        <DialogContent>
                                <TextField
                                    error={false}
                                    className="text-input"
                                    id="name"
                                    style={{ marginBottom: 20 }}
                                    label="Tên vị trí"
                                    size="small"
                                    defaultValue={job.name}
                                    required
                                    onChange={(e) => handleCreateJob(e)}
                                /> <TextField
                                    error={false}
                                    className="text-input"
                                    id="description"
                                    style={{ marginBottom: 20 }}
                                    label="Mô tả "
                                    size="small"
                                    defaultValue={job.description}
                                    required
                                    onChange={(e) => handleCreateJob(e)}
                                />
                                <TextField
                                    size="small"
                                    id="recuitmentStatus"
                                    style={{ marginBottom: 20 }}
                                    className="text-input"
                                    select
                                    label="Trạng thái tuyển dụng"
                                    required
                                    defaultValue={job.recuitmentStatus}
                                    onChange={(event) => {
                                        setjob((prevState) => ({
                                            ...prevState,
                                            recuitmentStatus: event.target.value
                                        }));
                                    }}
                                >
                                    <MenuItem id="recuitmentStatus" value={false}>false</MenuItem>
                                    <MenuItem id="recuitmentStatus" value={true}>true</MenuItem>

                                </TextField>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseU} variant="contained" color="secondary">
                                Hủy
                            </Button>
                            <Button onClick={handleUpdate} variant="contained" c color="primary" autoFocus>
                                Chấp nhận
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    )
}

