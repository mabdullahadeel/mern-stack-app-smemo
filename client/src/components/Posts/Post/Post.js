import React from 'react'
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, likePost } from '../../../redux/actions/posts';

function Post({ post, setCurrentId }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                {user.username === post.creator &&
                    <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize="default" />
                    </Button>
                }
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => ` #${tag}`)}</Typography>
            </div>
            <div className={classes.details}>
                <Typography color="textSecondary">{`Posted By: ${post.creator}`}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="h6" style={{ fontSize: 15 }} gutterBottom color="textSecondary">{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
                    <ThumbUpIcon fontSize="small" />
                    &nbsp; Like &nbsp;
                    {post.likeCount}
                </Button>
                {user.username === post.creator &&
                    <Button size="small" variant="outlined" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteForeverIcon fontSize="small" />
                    &nbsp; Delete
                    </Button>
                }
            </CardActions>
        </Card>
    )
}

export default Post;
