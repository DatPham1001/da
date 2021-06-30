import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, MenuItem, TextField, Tooltip, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Auth from '../../Auth';
import { axiosGet, axiosPost, axiosPut } from '../../Api';
import "./Contact.css";
import moment from 'moment';
import { storage } from "../Contact/firebase"
import CloseIcon from '@material-ui/icons/Close';
import { KeyboardDatePicker, KeyboardDateTimePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useHistory } from 'react-router';
import DateFnsUtils from '@date-io/date-fns';
function ContactDetail(props) {
    const handleClose = () => {
        props.contactDetailCallback();
        setisUpdate(false)
        setcontactDetail({ name: "", phone: "", email: "", address: "", bod: "", meetDate: "", jobId: "", experience: "", cvUrl: "" ,status : "" })
        setfile({})
        console.log(props.contactId);
    };
    const [contactDetail, setcontactDetail] = useState({})
    const [contactId, setcontactId] = useState()
    const [isUpdate, setisUpdate] = useState(false)
    useEffect(() => {
        axiosGet(Auth.token, "contact/" + props.contactId).then(e => {
            console.log(e)
            setcontactDetail(e.data)
        })
    }, [props.contactId])
    const handleUpdate = (e) => {
        setisUpdate(false)
    }
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
                console.log(res.data)
            });
    }, []);
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setcontactDetail((prevState) => ({
            ...prevState,
            bod: moment(date).format('DD-MM-YYYY')
        }));
    };
    const handleMeetDateChange = (date) => {
        setdatetime(date)
        setcontactDetail((prevState) => ({
            ...prevState,
            meetDate: moment(date).format('DD-MM-YYYY HH:mm:ss')
        }));
    };
    const [contact, setcontact] = useState({})
    const handleCreateContact = (event) => {
        setcontactDetail((prevState) => ({
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
    const [desOpen, setdesOpen] = useState(false);
    const [hideDes, sethideDes] = useState(true);
    const [errorText, seterrorText] = useState("")
    const [error, seterror] = useState(false)
    const [listJob, setlistJob] = useState([]);
    const [file, setfile] = useState({});
    const handleSubmit = () => {
        console.log(contactDetail)
        console.log(Auth.token);
        // setcontact((prevState) => ({
        //     ...prevState,
        //     [event.target.id]: event.target.value
        // }));
        // axiosPut(Auth.token, "contact/" + contactDetail.id, contactDetail)
        //     .then((res) => {
        //         // setalertCreated(true)

        //         setTimeout(() => {
        //             // history.push("/contacts");
        //         }, 1000);

        //     }).catch((e) => {
        //         console.log(e)
        //     });
    }
    return (
        <div >
            <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth={'lg'}
                style={{padding:50}}>
                <Box display='flex' justifyContent='flex-end'>
                    <Tooltip title="Close " arrow>
                        <IconButton onClick={() => handleClose()} style=
                            {{ paddingTop: 10, paddingRight: 10 }}>
                            <CloseIcon  ></CloseIcon>
                        </IconButton>
                    </Tooltip>
                </Box>
                <DialogTitle id="form-dialog-title">{!isUpdate && 'Chi tiết ứng viên'}{isUpdate && 'Cập nhật ứng viên'}
                    {!isUpdate &&
                        <Box display='flex' justifyContent='flex-end'>
                            <Button
                                className="product-btn"
                                variant="contained"
                                color="primary"
                                onClick={() => setisUpdate(true)}
                            >
                                Cập nhật
                      </Button>
                        </Box>}

                </DialogTitle>
                <DialogContent>
                    {!isUpdate &&
                        <div style={{ paddingLeft: 70, paddingRight: 70 }}>
                            <Grid container spacing={3}>
                                <h3 className="product-title">Tên ứng viên : {contactDetail.name}</h3>
                                <Grid md={6}>
                                    <div className="product-detail">
                                        Ngày sinh : {(moment(contactDetail.bod).format('DD-MM-YYYY'))}
                                    </div>
                                    <div className="product-detail">
                                        Điện thoại : {contactDetail.phone}
                                    </div>
                                    <div className="product-detail">
                                        Vị trí ứng tuyển : {contactDetail.jobName}
                                    </div>
                                    <div className="product-detail">
                                        Kinh nghiệm : {contactDetail.experience}
                                    </div>
                                    <div className="product-detail">
                                        Link cv : <a href={contactDetail.cvUrl}>link cv</a>
                                    </div>
                                </Grid>

                                <Grid md={6}>
                                    <div className="product-detail">
                                        Ngày hẹn gặp : {(moment(contactDetail.meetDate).format('DD-MM-YYYY:HH-mm-ss'))}
                                    </div>
                                    <div className="product-detail">
                                        Ngày khởi tạo: {(moment(contactDetail.createdDate).format('DD-MM-YYYY'))}
                                    </div>
                                    <div className="product-detail">
                                        Ngày cập nhật: {(moment(contactDetail.lastModified).format('DD-MM-YYYY'))}
                                    </div>
                                    <div className="product-detail">
                                        Ghi chú :
                </div>
                                    <div className="product-detail">
                                        {contactDetail.note}
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    }
                    {isUpdate &&
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
                                    defaultValue={contactDetail.name}
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
                                    defaultValue={contactDetail.phone}
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
                                    defaultValue={contactDetail.email}
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
                                    defaultValue={contactDetail.address}
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
                                        defaultValue={(moment(contactDetail.bod).format('DD-MM-YYYY'))}
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
                                        id="status"
                                        style={{ marginBottom: 20 }}
                                        className="text-input"
                                        select
                                        label="Trạng thái"
                                        required
                                        defaultValue={contactDetail.status}
                                        onChange={(event) => {
                                            setcontactDetail((prevState) => ({
                                                ...prevState,
                                                status: event.target.value
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
                                    defaultValue={contactDetail.experience}
                                    select
                                    label="Năm kinh nghiệm"
                                    required
                                    onChange={(event) => {
                                        setcontactDetail((prevState) => ({
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
                                    defaultValue={contactDetail.jobName}
                                    label="Vị trí ứng tuyển"
                                    onChange={(event) => {
                                        console.log(event.target.value)
                                        setcontactDetail((prevState) => ({
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
                                        defaultValue={contactDetail.meetDate}
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
                                    defaultValue={contactDetail.note}
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
                                            defaultValue={contactDetail.cvUrl}
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
                    }
                </DialogContent>
                <DialogActions>
                    {isUpdate &&
                        <div>
                            <Button onClick={() => setisUpdate(false)} style = {{marginRight : 5}} variant="contained" color="secondary">
                                Hủy
                    </Button>

                            <Button onClick={handleSubmit} variant="contained" color="primary">
                                Lưu
                </Button></div>}
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ContactDetail;