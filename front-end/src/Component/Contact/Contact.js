
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
import { Alert, Button, Menu, MenuItem, Snackbar, TextField } from '@material-ui/core';
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
import "./Contact.css";
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
import ContactDetail from './ContactDetail';

import RefreshIcon from '@material-ui/icons/Refresh';
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
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
export default function Contact() {
    const classes = useStyles();
    const tableRef = React.createRef();
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const [alertCreated, setalertCreated] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [dateTime, setdatetime] = useState(null)
    useEffect(() => {
        axiosGet(Auth.token, "job")
            .then((res) => {
                setlistJob(res.data);
                // console.log(res.data)
            });
    }, []);
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setcontact((prevState) => ({
            ...prevState,
            bod: moment(date).format('YYYY-MM-DD')
        }));
    };
    const handleMeetDateChange = (date) => {
        setdatetime(date)
        setcontact((prevState) => ({
            ...prevState,
            meetDate: moment(date).format('YYYY-MM-DD HH:mm:ss')
        }));
    };
    const [desOpen, setdesOpen] = useState(false);
    const [hideDes, sethideDes] = useState(true);
    const [contact, setcontact] = useState({ name: "", phone: "", email: "", address: "", bod: "", meetDate: "", jobId: "", experience: "", cvUrl: "", takecareStatus: "" })
    const handleClose = () => {
        setOpen(false);
        setdatetime(null)
        setSelectedDate(null)
        setcontact({ name: "", phone: "", email: "", address: "", bod: "", meetDate: "", jobId: "", experience: "", cvUrl: "" })
        setfile({})
    };
    const handleCreateContact = (event) => {
        setcontact((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value
        }));
    }
    const handleUpload2 = (e) => {
        const image = e.target.files[0];
        console.log(image)
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url);
                        setcontact((prevState) => ({
                            ...prevState,
                            cvUrl: url
                        }));
                    });
            }
        );
    };
    const handleSubmit = () => {
        axiosPost(Auth.token, "contact", contact)
            .then((res) => {
                tableRef.current && tableRef.current.onQueryChange()
                handleClose()
                setalertCreated(true)

            }).catch((e) => {
                console.log(e)
            });
    }
    const [errorText, seterrorText] = useState("")
    const [error, seterror] = useState(false)
    const [listJob, setlistJob] = useState([]);
    const [file, setfile] = useState({});
    //Detail
    const [contactDetailDialog, setcontactDetailDialog] = useState(false);
    const [contactId, setcontactId] = useState()
    const handleContactDetail = (contactId) => {
        setcontactDetailDialog(true)
        setcontactId(contactId);
    }
    const contactDetailCallback = (dataFromChild) => {
        setcontactDetailDialog(false)
    };
    const [importCvModel, setimportCvModel] = useState(false)
    const [sheetLink, setsheetLink] = useState("")
    const handleImportcv = () => {
        console.log(sheetLink);
        axiosPost(Auth.token, "contact/import", sheetLink)
            .then((res) => {
                tableRef.current && tableRef.current.onQueryChange()
                setimportCvModel(false)
                setsheetLink("");
                setalertCreated(true)
            }).catch((e) => {
                console.log(e)
            });
    }
    return (
        <div className={classes.root}>
            <MenuBar title="Quản lý ứng viên"></MenuBar>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Snackbar open={alertCreated} autoHideDuration={1000}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        onClose={() => setalertCreated(false)}
                    >
                        <Alert variant="filled" severity="success">
                            Tạo ứng viên thành công!
                        </Alert>
                    </Snackbar>
                    <Box display='flex' justifyContent='flex-end'>
                        <Button
                            className="product-btn"
                            variant="contained"
                            color="primary"
                            style={{ marginBottom: 20, marginRight: 10 }}
                            onClick={() => setimportCvModel(true)}
                        >
                            Import ứng viên
                        </Button>
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
                    <ContactDetail open={contactDetailDialog} contactDetailCallback={contactDetailCallback} contactId={contactId}></ContactDetail>
                    <MaterialTable
                        title="Danh sách ứng viên"
                        icons={tableIcons}
                        tableRef={tableRef}
                        columns={[
                            {
                                title: 'STT', field: "stt", width: '2%',
                                headerStyle: {
                                    textAlign: 'center',
                                    paddingLeft: 11,
                                },
                                cellStyle: {
                                    paddingRight: 11,
                                    textAlign: 'center'
                                },
                            },

                            {
                                title: 'Tên', width: '17%', field: 'name',
                                headerStyle: {
                                    paddingLeft: 20,
                                },
                                cellStyle: {
                                    paddingLeft: 22,
                                },
                            },
                            {
                                title: 'Ngày sinh', field: 'bod',
                                headerStyle: {
                                    paddingLeft: 20,
                                },
                                cellStyle: {
                                    paddingLeft: 22,
                                },
                            },
                            {
                                title: 'Điện thoại', field: 'phone',
                                headerStyle: {
                                    paddingLeft: 20,
                                },
                                cellStyle: {
                                    paddingLeft: 22,
                                },
                            },
                            {
                                title: 'Email', field: 'email',
                                headerStyle: {
                                    paddingLeft: 20,
                                },
                                cellStyle: {
                                    paddingLeft: 22,
                                },
                            },
                            {
                                title: 'Vị trí ứng tuyển', field: 'jobName',
                                headerStyle: {
                                    paddingLeft: 20,
                                },
                                cellStyle: {
                                    paddingLeft: 22,
                                },
                            },
                            {
                                title: 'Ngày hẹn gặp', field: 'meetDate',
                                headerStyle: {
                                    paddingLeft: 20,
                                },
                                cellStyle: {
                                    paddingLeft: 22,
                                },
                            }, {
                                title: 'Ghi chú', field: 'note',
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
                                let url = 'contact?input=' + query.search;
                                // url += '&limit=' + query.pageSize
                                // url += '&page=' + (query.page + 1)
                                axiosGet(Auth.token, url)
                                    .then(result => {
                                        console.log(result)
                                        let datas = result.data.map((item, index) => {
                                            let tmp = Object.assign({}, item,
                                                { stt: (index + 1) },
                                                { bod: (Moment(item.bod).format('DD-MM-YYYY')) }
                                            );
                                            return tmp;
                                        })
                                        resolve({
                                            data: datas,
                                            page: 1,
                                            totalCount: result.data.length,
                                        })
                                    })
                            })
                        } actions={[
                            {
                                icon: RefreshIcon,
                                tooltip: 'Refresh Data',
                                isFreeAction: true,
                                onClick: () => tableRef.current && tableRef.current.onQueryChange(),
                            }
                        ]}
                        onRowClick={((e, rowData) =>
                            handleContactDetail(rowData.id)
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
                    />

                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        fullWidth={true}
                        maxWidth={'lg'}
                    >
                        <DialogTitle id="alert-dialog-title">Thêm mới ứng viên</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Thông tin
                                    </Typography>
                                    <TextField
                                        error={false}
                                        className="text-input"
                                        id="name"
                                        style={{ marginBottom: 20 }}
                                        label="Họ và tên"
                                        size="small"
                                        defaultValue=""
                                        helperText={errorText}
                                        required
                                        onChange={(e) => handleCreateContact(e)}
                                    />
                                    <TextField
                                        className="text-input"
                                        error={false}
                                        id="phone"
                                        style={{ marginBottom: 20 }}
                                        label="Điện thoại"
                                        size="small"
                                        defaultValue=""
                                        helperText={errorText}
                                        onChange={(e) => handleCreateContact(e)}
                                        required
                                    /> <TextField
                                        className="text-input"
                                        error={false}
                                        id="email"
                                        style={{ marginBottom: 20 }}
                                        label="Email"
                                        size="small"
                                        defaultValue=""
                                        helperText={errorText}
                                        required
                                        onChange={(e) => handleCreateContact(e)}

                                    /> <TextField
                                        className="text-input"
                                        error={false}
                                        id="address"
                                        style={{ marginBottom: 20 }}
                                        label="Địa chỉ"
                                        name="name"
                                        size="small"
                                        defaultValue=""
                                        required
                                        helperText={errorText}
                                        onChange={(e) => handleCreateContact(e)}
                                    />
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            size="small"
                                            disableToolbar
                                            className="text-input"
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            style={{ marginBottom: 20 }}
                                            margin="normal"
                                            id="bod"
                                            label="Ngày sinh"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                    <TextField
                                        size="small"
                                        id="takecareStatus"
                                        style={{ marginBottom: 20 }}
                                        className="text-input"
                                        select
                                        label="Trạng thái"
                                        required
                                        onChange={(event) => {
                                            setcontact((prevState) => ({
                                                ...prevState,
                                                takecareStatus: event.target.value
                                            }));
                                        }}
                                    >
                                        <MenuItem id="experience" value={"Chưa có kinh nghiệm"}>Chờ hẹn gặp</MenuItem>
                                        <MenuItem id="experience" value={"1 năm"}>Đã phỏng vấn</MenuItem>
                                        <MenuItem id="experience" value={"2 năm"}>Đạt</MenuItem>
                                        <MenuItem id="experience" value={"3 năm"}>Không Đạt</MenuItem>

                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Chuyên môn
                                    </Typography>
                                    <TextField
                                        size="small"
                                        id="experience"
                                        style={{ marginBottom: 20 }}
                                        className="text-input"
                                        select
                                        label="Năm kinh nghiệm"
                                        required
                                        onChange={(event) => {
                                            setcontact((prevState) => ({
                                                ...prevState,
                                                experience: event.target.value
                                            }));
                                        }}
                                    >
                                        <MenuItem id="experience" value={"Chưa có kinh nghiệm"}>Chưa có kinh nghiệm</MenuItem>
                                        <MenuItem id="experience" value={"1 năm"}>1 năm</MenuItem>
                                        <MenuItem id="experience" value={"2 năm"}>2 năm</MenuItem>
                                        <MenuItem id="experience" value={"3 năm"}>3 năm</MenuItem>
                                        <MenuItem id="experience" value={"Trên 3 năm"}>Trên 3 năm</MenuItem>

                                    </TextField>
                                    <TextField
                                        size="small"
                                        id="jobId"
                                        style={{ marginBottom: 2 }}
                                        className="text-input"
                                        select
                                        label="Vị trí ứng tuyển"
                                        onChange={(event) => {
                                            setcontact((prevState) => ({
                                                ...prevState,
                                                jobId: event.target.value
                                            }));
                                        }}
                                    >
                                        {listJob.map((job, index) => (
                                            <MenuItem id="jobId" key={index} value={job.id}>
                                                {job.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <p className="des-btn" onClick={() => { history.push("/jobs") }}>Thêm vị trí mới</p>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDateTimePicker
                                            style={{ marginBottom: 20 }}
                                            size="small"
                                            id="meetDate"
                                            className="text-input"
                                            format="dd/MM/yyyy hh:mm a"
                                            label="Ngày hẹn gặp"
                                            value={dateTime}
                                            onChange={(e) => handleMeetDateChange(e)}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change time',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                    <TextField
                                        size="small"
                                        id="note"
                                        className="text-input"
                                        style={{ marginBottom: 20 }}
                                        label="Ghi chú"
                                        multiline
                                        rows={2}
                                        onChange={(e) => handleCreateContact(e)}
                                    />
                                    <Typography gutterBottom>
                                        {file.name}
                                    </Typography>
                                    <Button
                                        className="upload-btn"
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        component="label"
                                    >
                                        Tải cv lên
                                        <input
                                            type="file"
                                            accept="application/pdf"
                                            style={{ display: "none" }}
                                            onChange={handleUpload2}
                                        />
                                    </Button>
                                    {hideDes &&
                                        <p className="des-btn" onClick={() => { setdesOpen(true); sethideDes(false) }}>Thêm Link CV</p>
                                    }

                                    {desOpen && (
                                        <div>
                                            <p className="des-btn" onClick={() => { setdesOpen(false); sethideDes(true) }}>Ẩn</p>
                                            <TextField
                                                className="text-input"
                                                error={false}
                                                id="cvUrl"
                                                style={{ marginBottom: 20 }}
                                                label="Link cv"
                                                name="name"
                                                size="small"
                                                value={contact.cvUrl}
                                                helperText={errorText}
                                                onChange={(e) => handleCreateContact(e)}
                                            />
                                        </div>
                                    )}
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} variant="contained" color="secondary">
                                Hủy
                            </Button>
                            <Button onClick={handleSubmit} variant="contained" c color="primary" autoFocus>
                                Chấp nhận
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={importCvModel}
                        onClose={() => setimportCvModel(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        fullWidth={true}
                        maxWidth={'lg'}
                    >
                        <DialogTitle id="alert-dialog-title">Điền vào link googlesheet</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Lưu ý : Google worksheet cần được public link
                            </DialogContentText>
                            <TextField
                                className="text-input"
                                error={false}
                                id="sheeturl"
                                style={{ marginBottom: 20 }}
                                label="Sheet url"
                                size="small"
                                defaultValue=""
                                helperText={errorText}
                                fullWidth
                                onChange={(e) => setsheetLink(e.target.value)}
                                required
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setimportCvModel(false)} variant="contained" color="secondary">
                                Hủy
                            </Button>
                            <Button onClick={handleImportcv} variant="contained" color="primary" autoFocus>
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

