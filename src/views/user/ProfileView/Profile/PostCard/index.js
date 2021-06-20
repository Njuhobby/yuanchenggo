import clsx from "clsx";
import Comments from "./Comments";
import PropTypes from "prop-types";
import ActionBar from "./ActionBar";
import { map } from "lodash";
import { Icon, InlineIcon } from "@iconify/react";
import CommentInput from "./CommentInput";
import { fDate } from "src/utils/formatTime";
import LazySize from "src/components/LazySize";
import MyAvatar from "src/components/MyAvatar";
import React, { useState, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import moreVerticalFill from "@iconify-icons/eva/more-vertical-fill";
import roundPushpin from "@iconify-icons/noto/round-pushpin";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
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

  const paragraphs = [];
  let startIndex = 0;
  let foundIndex = -1;
  while ((foundIndex = post.message.indexOf("\n", startIndex)) >= 0) {
    paragraphs.push(post.message.substring(startIndex, foundIndex));
    startIndex = foundIndex + 1;
  }
  if (startIndex < post.message.length) {
    paragraphs.push(post.message.substring(startIndex));
  }

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
        {map(paragraphs, function (paragraph, index) {
          return (
            <Typography key={`paragraph_${index}`} variant="body1">
              {paragraph}
            </Typography>
          );
        })}
        <Box
          sx={{
            mt: 3,
            position: "relative",
            pt: "calc(100% / 16 * 9)",
          }}
        >
          <LazySize
            alt="post media"
            src={post.media}
            sx={{
              top: 0,
              width: "100%",
              height: "100%",
              borderRadius: 1,
              position: "absolute",
            }}
          />
        </Box>

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
