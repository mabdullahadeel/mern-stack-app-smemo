import React, { useState, useEffect } from 'react'
import useStyles from './styles';
import { Paper, TextField, Button, Typography } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../redux/actions/posts';

function Forms({ currentId, setCurrentId }) {
    const [postData, setPostDate] = useState({
        creator: '', title: '', message: '', tags: [], selectedFile: ''
    });
    const dispatch = useDispatch();
    const classes = useStyles();
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const user = useSelector((state) => state.user)
    useEffect(() => {
        if (post) setPostDate(post)
    }, [post])

    const formValidation = () => {
        if (postData.title && postData.message && postData.tags) return true
        return false
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(postData);
        console.log(formValidation())
        // if (formValidation) {
        //     if (currentId) {
        //         dispatch(updatePost(currentId, postData));
        //     } else {
        //         dispatch(createPost({ ...postData, creator: user.username }));
        //     }
        //     clear();
        // } else {
        //     console.log("Form Data not complete");
        // }

    };

    const clear = () => {
        if (postData) {
            setPostDate({
                creator: '', title: '', message: '', tags: '', selectedFile: ''
            });
            setCurrentId('');
        }
    }

    return (
        <Paper className={classes.paper}>
            <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? "Edit" : "Create"} Memory</Typography>
                <TextField
                    name="creator" variant="outlined" label="Creator" fullWidth className={classes.inputs}
                    value={user.username}
                    disabled={true}

                />
                <TextField
                    name="title" variant="outlined" label="Title" fullWidth className={classes.inputs}
                    value={postData.title}
                    onChange={(e) => setPostDate({ ...postData, title: e.target.value })} />
                <TextField
                    name="message" variant="outlined" label="Message" fullWidth className={classes.inputs}
                    value={postData.message}
                    onChange={(e) => setPostDate({ ...postData, message: e.target.value })} />
                <TextField
                    name="tags" variant="outlined" label="Tags" fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostDate({ ...postData, tags: e.target.value.split(",") })} />
                <div className={classes.fileInput}>
                    <FileBase
                        type='file'
                        multiple={false}
                        onDone={({ base64 }) => setPostDate({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color='primary' size='large' type="submit" fullWidth>Post</Button>
                <Button variant="contained" color='secondary' size='small' onClick={clear} fullWidth>Cancel</Button>
            </form>
        </Paper>
    )
}

export default Forms
