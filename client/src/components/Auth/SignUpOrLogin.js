import React, { useState } from 'react';
import { CircularProgress } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from "./signInStyles";
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { logInUserAuthentication, registerUserAuthentication } from '../../redux/actions/user';

export default function SignUpOrLogin() {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loginTrack, setLoginTrack] = useState(true);
    const dispatch = useDispatch();

    const register = (e) => {
        e.preventDefault();
        console.log("Register");
        dispatch(registerUserAuthentication(username, password));
    };
    const login = (e) => {
        e.preventDefault();
        console.log("Login");
        dispatch(logInUserAuthentication(username, password))
    };
    const getUser = (e) => {
        e.preventDefault();
        Axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:5000/user/getUser",
        }).then((res) => {
            console.log(res.data);
        })
            .catch(err => console.log(err.message));
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={!loginTrack ? classes.avatar : classes.avatar_green}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {loginTrack ? "Log In" : "Sign Up"}
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
                        autoFocus
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={loginTrack ? login : register}
                        disabled={false}
                    >
                        {/* <CircularProgress style={{ color: "green" }} /> */}
                        {loginTrack ? "Log In" : "Create An Account"}
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => setLoginTrack(!loginTrack)}
                            // style={{ color: "green" }}
                            >
                                {!loginTrack ? "Have an account? LogIn" : "Create Account Instead"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}