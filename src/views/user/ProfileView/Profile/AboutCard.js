import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import pinFill from "@iconify-icons/eva/pin-fill";
import emailFill from "@iconify-icons/eva/email-fill";
import roundBusinessCenter from "@iconify-icons/ic/round-business-center";
import { makeStyles } from "@material-ui/core/styles";
import {
  Link,
  Card,
  Typography,
  CardHeader,
  CardContent,
} from "@material-ui/core";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  line: {
    display: "flex",
    "&:not(:first-child)": {
      marginTop: theme.spacing(2),
    },
  },
  icon: {
    width: 20,
    height: 20,
    marginTop: 1,
    flexShrink: 0,
    marginRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

AboutCard.propTypes = {
  profile: PropTypes.object,
  className: PropTypes.string,
};

function AboutCard({ profile, className }) {
  const classes = useStyles();
  const { quote, country, email, position, company, school } = profile;

  return (
    <Card className={clsx(classes.root, className)}>
      <CardHeader title="简介" />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {quote}
        </Typography>

        <div className={classes.line}>
          <Icon icon={pinFill} className={classes.icon} />
          <Typography variant="body2" color="text.secondary">
            常驻在 &nbsp;
          </Typography>
          <Typography variant="subtitle2" color="text.primary">
            {country}
          </Typography>
        </div>

        <div className={classes.line}>
          <Icon icon={emailFill} className={classes.icon} />
          <Typography variant="subtitle2" color="text.primary">
            {email}
          </Typography>
        </div>

        <div className={classes.line}>
          <Icon icon={roundBusinessCenter} className={classes.icon} />
          <Typography variant="body2" color="text.secondary">
            是一名 &nbsp;
          </Typography>
          <Typography variant="subtitle2" color="text.primary">
            {position}
          </Typography>
        </div>

        <div className={classes.line}>
          <Icon icon={roundBusinessCenter} className={classes.icon} />
          <Typography variant="body2" color="text.secondary">
            目前供职于 &nbsp;
          </Typography>
          <Typography variant="subtitle2" color="text.primary">
            {company}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

export default AboutCard;
