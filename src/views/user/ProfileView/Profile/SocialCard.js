import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import doubanFill from "@iconify-icons/ri/douban-fill";
import zhihuFill from "@iconify-icons/ri/zhihu-fill";
import linkedinFill from "@iconify-icons/eva/linkedin-fill";
import weiboLine from "@iconify-icons/ri/weibo-line";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Card, CardHeader, CardContent } from "@material-ui/core";

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

SocialCard.propTypes = {
  profile: PropTypes.object,
  className: PropTypes.string,
};

function SocialCard({ profile, className }) {
  const classes = useStyles();
  const { doubanLink, zhihuLink, weiboLink, linkedinLink } = profile;

  const SOCIALS = [
    {
      name: "Linkedin",
      icon: (
        <Icon icon={linkedinFill} className={classes.icon} color="#006097" />
      ),
      href: linkedinLink,
    },
    {
      name: "Douban",
      icon: <Icon icon={doubanFill} className={classes.icon} color="#00B51D" />,
      href: doubanLink,
    },
    {
      name: "Weibo",
      icon: <Icon icon={weiboLine} className={classes.icon} color="#fa2f2f" />,
      href: weiboLink,
    },
    {
      name: "Zhihu",
      icon: <Icon icon={zhihuFill} className={classes.icon} color="#06f" />,
      href: zhihuLink,
    },
  ];

  return (
    <Card className={clsx(classes.root, className)}>
      <CardHeader title="社交账号" />
      <CardContent>
        {SOCIALS.map((link) => (
          <div key={link.name} className={classes.line}>
            {link.icon}
            <Link component="span" variant="body2" color="text.primary" noWrap>
              {link.href}
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default SocialCard;
