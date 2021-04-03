import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import React, { useState } from 'react';
import axios from 'axios';
import Auth from '../Auth';
import { useHistory } from 'react-router';
import { axiosPostLogin } from '../Api';
const api = axios.create({
  baseURL: 'http://192.168.1.199:8081/api'
})
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        DatPham Thesis
        </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const [login, setLogin] = useState({ username: "", password: "" }); // new State (var) userName
  const classes = useStyles();
  const history = useHistory();
  const handleChange = (event) => {
    setLogin((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value
    }));
  }
  const [alertLogin, setalertLogin] = useState({ type: "error", message: "" })
  const [errorText, seterrorText] = useState("")
  const [error, seterror] = useState(false)
  const [isLogin, setisLogin] = useState(false);
  const handleSubmit = (e) => {
    console.log(login);
    axiosPostLogin('login', login)
      // api.post('login', login)
      .then(
        (res) => {
          console.log(res)
          if (res.status === 200) {
            localStorage.setItem('token', res.data);
            Auth.login(res.data);
            history.push("/");
          }
        }
      ).catch((e) => {
        let res = e.response.data;
        console.log(res);
        seterrorText("Sai tài khoản hoặc mật khẩu")
        seterror(true)

      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            error={error}
            helperText={errorText}
            autoFocus
            onChange={(e) => handleChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            onChange={(e) => handleChange(e)}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            error={error}
            helperText={errorText}
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Login;