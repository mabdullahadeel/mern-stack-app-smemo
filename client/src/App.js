import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Forms';
import SignInOrLogout from './components/Auth/SignUpOrLogin';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from './redux/actions/posts';

function App() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState('');
    const user = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch])

    console.log(user);
    return (
        !user ?
            <SignInOrLogout />
            :
            <Container maxWidth='lg'>
                <AppBar className={classes.AppBar} position="static" color="primary">
                    <Typography className={classes.heading} variant="h2" align="center">SMEMO</Typography>
                </AppBar>
                <Grow in>
                    <Container>
                        <Grid container justify='space-between' alignItems="stretch" spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <Form currentId={currentId} setCurrentId={setCurrentId} />
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <Posts setCurrentId={setCurrentId} />
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>
            </Container>
    )
}

export default App
