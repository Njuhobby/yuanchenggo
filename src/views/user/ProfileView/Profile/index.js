import clsx from "clsx";
import React, { useState } from "react";
import PostCard from "./PostCard";
import PropTypes from "prop-types";
import AboutCard from "./AboutCard";
import FollowCard from "./FollowCard";
import SocialCard from "./SocialCard";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { QuillEditor } from "src/components/Editor";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  margin: {
    marginBottom: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

Profile.propTypes = {
  myProfile: PropTypes.object,
  posts: PropTypes.array,
  authUser: PropTypes.object,
  className: PropTypes.string,
};

function Profile({ myProfile, posts, authUser, className }) {
  const classes = useStyles();
  const [newPostValue, setNewPostValue] = useState("");
  const postNewPost = () => {
    console.log(newPostValue);
  };
  return (
    <Grid container spacing={3} className={clsx(classes.root, className)}>
      <Grid item xs={12} md={4}>
        <FollowCard profile={myProfile} className={classes.margin} />
        <AboutCard
          profile={myProfile}
          authUser={authUser}
          className={classes.margin}
        />
        <SocialCard profile={myProfile} />
      </Grid>

      <Grid item xs={12} md={8}>
        <QuillEditor
          id="newPostEditorToolbar"
          simple={true}
          onChange={setNewPostValue}
          value={newPostValue}
          className={classes.margin}
          placeholder="发布你的下一个帖子...."
          toolbarButtonClick={postNewPost}
        />
        {posts.map((post) => (
          <PostCard key={post.id} post={post} profile={myProfile} />
        ))}
      </Grid>
    </Grid>
  );
}

export default Profile;
