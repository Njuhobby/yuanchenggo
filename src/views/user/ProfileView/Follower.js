import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import pinFill from "@iconify-icons/eva/pin-fill";
import checkmarkFill from "@iconify-icons/eva/checkmark-fill";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Card, Button, Avatar, Typography } from "@material-ui/core";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
  },
  card: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

function FollowerCard({ follower, onToggle }) {
  const classes = useStyles();
  const { name, country, avatarUrl, isFollowed } = follower;

  return (
    <Card className={clsx(classes.card)}>
      <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            component={Icon}
            icon={pinFill}
            sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }}
          />
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {country}
          </Typography>
        </Box>
      </Box>
      <Button
        size="small"
        onClick={onToggle}
        variant={isFollowed ? "text" : "outlined"}
        color={isFollowed ? "primary" : "inherit"}
        startIcon={isFollowed && <Icon icon={checkmarkFill} />}
      >
        {isFollowed ? "已关注" : "关注"}
      </Button>
    </Card>
  );
}

FollowerCards.propTypes = {
  followers: PropTypes.array.isRequired,
  onToggleFollow: PropTypes.func,
  className: PropTypes.string,
};

function FollowerCards({ followers, onToggleFollow, className }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <Grid container spacing={3}>
        {followers.map((follower) => (
          <Grid key={follower.id} item xs={12} md={4}>
            <FollowerCard
              follower={follower}
              onToggle={() => onToggleFollow(follower.id)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default FollowerCards;
