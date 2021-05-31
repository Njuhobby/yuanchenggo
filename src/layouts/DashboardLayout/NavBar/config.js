import React from "react";
import { MLabel, MIcon } from "src/theme";
import { PATH_APP, PATH_HOME, PATH_PAGE } from "src/routes/paths";

// ----------------------------------------------------------------------

const path = (name) => `/static/icons/navbar/${name}.svg`;

const ICONS = {
  authenticator: <MIcon src={path("ic_authenticator")} />,
  blog: <MIcon src={path("ic_blog")} />,
  calendar: <MIcon src={path("ic_calendar")} />,
  cart: <MIcon src={path("ic_cart")} />,
  charts: <MIcon src={path("ic_charts")} />,
  chat: <MIcon src={path("ic_chat")} />,
  components: <MIcon src={path("ic_components")} />,
  dashboard: <MIcon src={path("ic_dashboard")} />,
  editor: <MIcon src={path("ic_editor")} />,
  elements: <MIcon src={path("ic_elements")} />,
  error: <MIcon src={path("ic_error")} />,
  mail: <MIcon src={path("ic_mail")} />,
  map: <MIcon src={path("ic_map")} />,
  page: <MIcon src={path("ic_page")} />,
  user: <MIcon src={path("ic_user")} />,
  upload: <MIcon src={path("ic_upload")} />,
  copy: <MIcon src={path("ic_copy")} />,
  carousel: <MIcon src={path("ic_carousel")} />,
  language: <MIcon src={path("ic_language")} />,
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "",
    items: [
      {
        title: "控制台",
        icon: ICONS.dashboard,
        href: PATH_APP.general.root,
      },
    ],
  },
  // User account
  // ----------------------------------------------------------------------
  {
    subheader: "账号",
    items: [
      {
        title: "个人主页",
        icon: ICONS.user,
        href: PATH_APP.account.root,
      },
      {
        title: "账户设置",
        icon: ICONS.user,
        href: PATH_APP.account.settings,
      },
      {
        title: "通知",
        href: PATH_APP.account.notifications,
        icon: ICONS.mail,
      },
    ],
  },

  // Jobs
  // ---------------------------------------------------------------------------
  {
    subheader: "工作信息",
    items: [
      {
        title: "求职列表",
        icon: ICONS.elements,
        href: PATH_APP.jobs.root,
      },
      {
        title: "金主信息",
        icon: ICONS.elements,
        href: PATH_APP.jobs.companies,
      },
    ],
  },

  // ----------------------------------------------------------------------
  {
    subheader: "社区",
    items: [
      {
        title: "约起来",
        href: PATH_APP.community.meetups,
        icon: ICONS.chat,
      },
      {
        title: "去哪里最棒",
        href: PATH_APP.community.cities,
        icon: ICONS.blog,
      },
      {
        title: "其他小伙伴",
        href: PATH_APP.community.root,
        icon: ICONS.blog,
      },
      {
        title: "大家的帖子",
        href: PATH_APP.community.posts,
        icon: ICONS.chat,
      },
      {
        title: "我的计划",
        href: PATH_APP.community.plans,
        icon: ICONS.calendar,
      },
    ],
  },
];

export default navConfig;
