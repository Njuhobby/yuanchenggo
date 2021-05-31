import React from "react";
import { MLabel, MIcon } from "src/theme";
import { PATH_APP, PATH_PAGE } from "src/routes/paths";

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
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: "账号",
    items: [
      {
        title: "个人主页",
        icon: ICONS.user,
        href: PATH_APP.management.user.profile,
      },
      {
        title: "账户设置",
        icon: ICONS.user,
        href: PATH_APP.management.user.account,
      },

      // MANAGEMENT : E-COMMERCE
      // ----------------------------------------------------------------------
      {
        title: "e-commerce",
        icon: ICONS.cart,
        href: PATH_APP.management.eCommerce.root,
        items: [
          {
            title: "shop",
            href: PATH_APP.management.eCommerce.products,
          },
          {
            title: "product",
            href: PATH_APP.management.eCommerce.productById,
          },
          {
            title: "list",
            href: PATH_APP.management.eCommerce.list,
          },
          {
            title: "checkout",
            href: PATH_APP.management.eCommerce.checkout,
          },
          {
            title: "invoice",
            href: PATH_APP.management.eCommerce.invoice,
          },
        ],
      },

      // MANAGEMENT : BLOG
      // ----------------------------------------------------------------------
      {
        title: "blog",
        icon: ICONS.blog,
        href: PATH_APP.management.blog.root,
        items: [
          {
            title: "posts",
            href: PATH_APP.management.blog.root,
          },
          {
            title: "post",
            href: PATH_APP.management.blog.postById,
          },
          {
            title: "new post",
            href: PATH_APP.management.blog.newPost,
          },
        ],
      },
    ],
  },
  // APP
  // ----------------------------------------------------------------------
  {
    subheader: "消息",
    items: [
      {
        title: "通知",
        href: PATH_APP.app.mail.root,
        icon: ICONS.mail,
      },
      {
        title: "对话框",
        href: PATH_APP.app.chat.root,
        icon: ICONS.chat,
      },
      {
        title: "calendar",
        href: PATH_APP.app.calendar,
        icon: ICONS.calendar,
      },
    ],
  },
];

export default navConfig;
