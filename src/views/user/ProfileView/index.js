import Friend from "./Friend";
import Profile from "./Profile";
import Gallery from "./Gallery";
import Follower from "./Follower";
import { Icon } from "@iconify/react";
import Page from "src/components/Page";
import useAuth from "src/hooks/useAuth";
import ProfileCover from "./ProfileCover";
import { capitalCase } from "change-case";
import { PATH_APP } from "src/routes/paths";
import React, { useEffect, useState } from "react";
import { HeaderDashboard } from "src/layouts/Common";
import heartFill from "@iconify-icons/eva/heart-fill";
import { useDispatch, useSelector } from "react-redux";
import peopleFill from "@iconify-icons/eva/people-fill";
import roundPermMedia from "@iconify-icons/ic/round-perm-media";
import roundAccountBox from "@iconify-icons/ic/round-account-box";
import {
  getPosts,
  getGallery,
  getFriends,
  getProfile,
  getFollowers,
  onToggleFollow,
} from "src/redux/slices/user";
import { makeStyles } from "@material-ui/core/styles";
import { Tab, Box, Card, Tabs, Container } from "@material-ui/core";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  tabBar: {
    zIndex: 9,
    bottom: 0,
    width: "100%",
    display: "flex",
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up("sm")]: {
      justifyContent: "center",
    },
    [theme.breakpoints.up("md")]: {
      justifyContent: "flex-end",
      paddingRight: theme.spacing(3),
    },
  },
}));

// ----------------------------------------------------------------------

function ProfileView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { myProfile, posts, followers, friends, gallery } = useSelector(
    (state) => state.user
  );
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState("profile");
  const [findFriends, setFindFriends] = useState("");

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getPosts());
    dispatch(getFollowers());
    dispatch(getFriends());
    dispatch(getGallery());
  }, [dispatch]);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleToggleFollow = (followerId) => {
    dispatch(onToggleFollow(followerId));
  };

  const handleFindFriends = (event) => {
    setFindFriends(event.target.value);
  };

  if (!myProfile) {
    return null;
  }

  const PROFILE_TABS = [
    {
      value: "profile",
      name: "主页",
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: (
        <Profile myProfile={myProfile} posts={posts} authUser={user} />
      ),
    },
    {
      value: "followers",
      name: "粉丝",
      icon: <Icon icon={heartFill} width={20} height={20} />,
      component: (
        <Follower followers={followers} onToggleFollow={handleToggleFollow} />
      ),
    },
    {
      value: "friends",
      name: "关注",
      icon: <Icon icon={peopleFill} width={20} height={20} />,
      component: (
        <Friend
          friends={friends}
          findFriends={findFriends}
          onFindFriends={handleFindFriends}
        />
      ),
    },
    {
      value: "gallery",
      name: "相册",
      icon: <Icon icon={roundPermMedia} width={20} height={20} />,
      component: <Gallery gallery={gallery} />,
    },
  ];

  return (
    <Page title="我的主页 | 远程狗" className={classes.root}>
      <Container>
        <HeaderDashboard
          heading=""
          links={[
            { name: "账号", href: PATH_APP.account.root },
            { name: "个人主页" },
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: "relative",
          }}
        >
          <ProfileCover myProfile={myProfile} authUser={user} />

          <div className={classes.tabBar}>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={handleChangeTab}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  label={tab.name}
                />
              ))}
            </Tabs>
          </div>
        </Card>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}

export default ProfileView;
