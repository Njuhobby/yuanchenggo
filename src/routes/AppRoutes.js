import { PATH_APP } from "./paths";
import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import AuthProtect from "src/components/Auth/AuthProtect";
import DashboardLayout from "src/layouts/DashboardLayout";

// ----------------------------------------------------------------------

const AppRoutes = {
  path: PATH_APP.root,
  guard: AuthProtect,
  layout: DashboardLayout,
  routes: [
    // GENERAL
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_APP.general.root,
      component: lazy(() => import("src/views/general/DashboardAppView")),
    },
    {
      exact: true,
      path: PATH_APP.root,
      component: () => <Redirect to={PATH_APP.general.root} />,
    },

    // MANAGEMENT : USER
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_APP.account.settings,
      component: lazy(() => import("src/views/user/AccountView")),
    },
    {
      exact: true,
      path: PATH_APP.account.notifications,
      component: lazy(() => import("src/views/app/MailView")),
    },
    {
      exact: true,
      path: PATH_APP.account.root,
      component: lazy(() => import("src/views/user/ProfileView")),
    },

    // APP : CHAT
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_APP.community.meetups,
      component: lazy(() => import("src/views/app/ChatView")),
    },
    {
      exact: true,
      path: PATH_APP.community.cities,
      component: lazy(() => import("src/views/pages/ComingSoonView")),
    },
    {
      exact: true,
      path: PATH_APP.community.posts,
      component: lazy(() => import("src/views/pages/ComingSoonView")),
    },
    {
      exact: true,
      path: PATH_APP.community.plans,
      component: lazy(() => import("src/views/app/CalendarView")),
    },
    {
      exact: true,
      path: PATH_APP.community.root,
      component: lazy(() => import("src/views/pages/ComingSoonView")),
    },

    // ----------------------------------------------------------------------
    {
      component: () => <Redirect to="/404" />,
    },
  ],
};

export default AppRoutes;
