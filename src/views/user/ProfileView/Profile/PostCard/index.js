import clsx from "clsx";
import Comments from "./Comments";
import PropTypes from "prop-types";
import ActionBar from "./ActionBar";
import { Icon, InlineIcon } from "@iconify/react";
import CommentInput from "./CommentInput";
import { fDate } from "src/utils/formatTime";
import MyAvatar from "src/components/MyAvatar";
import React, { useState, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import moreVerticalFill from "@iconify-icons/eva/more-vertical-fill";
import roundPushpin from "@iconify-icons/noto/round-pushpin";
import { makeStyles } from "@material-ui/core/styles";
import parse from "html-react-parser";
import parseHtmlToReactOptions from "src/utils/parseHtmlToReactOptions";
import {
  Link,
  Card,
  Typography,
  CardHeader,
  IconButton,
  CardContent,
} from "@material-ui/core";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  locationIcon: {
    fontSize: "1rem",
    position: "relative",
    top: 2,
  },
}));

// ----------------------------------------------------------------------

PostCard.propTypes = {
  post: PropTypes.object,
  authUser: PropTypes.object,
  className: PropTypes.string,
};

function PostCard({ post, className }) {
  const classes = useStyles();
  const commentInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isLiked, setLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.personLikes.length);
  const [message, setMessage] = useState("");
  const hasComments = post.comments.length > 0;

  const handleLike = () => {
    setLiked(true);
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikes((prevLikes) => prevLikes - 1);
  };

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleClickAttach = () => {
    fileInputRef.current.click();
  };

  const handleClickComment = () => {
    commentInputRef.current.focus();
  };

  return (
    <Card className={clsx(classes.root, className)}>
      <CardHeader
        disableTypography
        avatar={<MyAvatar />}
        title={
          <Link
            to="#"
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
          >
            <InlineIcon icon={roundPushpin} className={classes.locationIcon} />
            {post.location}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{
              display: "block",
              color: "text.secondary",
            }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <IconButton>
            <Icon icon={moreVerticalFill} width={20} height={20} />
          </IconButton>
        }
      />

      <CardContent>
        {parse(post.message, parseHtmlToReactOptions)}

        <ActionBar
          post={post}
          likes={likes}
          isLiked={isLiked}
          onClickLike={handleLike}
          onClickUnlike={handleUnlike}
          onClickComment={handleClickComment}
        />

        {hasComments && <Comments post={post} />}

        <CommentInput
          message={message}
          onSetMessage={setMessage}
          fileInputRef={fileInputRef}
          commentInputRef={commentInputRef}
          onClickAttach={handleClickAttach}
          onChangeMessage={handleChangeMessage}
        />
      </CardContent>
    </Card>
  );
}

export default PostCard;
