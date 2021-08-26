// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS = {
  auth: "/auth",
  app: "/app",
  docs: "/docs",
};

export const PATH_PAGE = {
  auth: {
    root: ROOTS.auth,
    login: path(ROOTS.auth, "/login"),
    loginUnprotected: path(ROOTS.auth, "/login-unprotected"),
    register: path(ROOTS.auth, "/register"),
    registerUnprotected: path(ROOTS.auth, "/register-unprotected"),
    resetPassword: path(ROOTS.auth, "/reset-password"),
    verify: path(ROOTS.auth, "/verify"),
  },
  comingSoon: "/coming-soon",
  maintenance: "/maintenance",
  pricing: "/pricing",
  payment: "/payment",
};

export const PATH_HOME = {
  components: "/components",
  cloud: "https://www.sketch.com/s/0fa4699d-a3ff-4cd5-a3a7-d851eb7e17f0",
  purchase: "https://material-ui.com/store/items/minimal-dashboard/",
  dashboard: ROOTS.app,
};

export const PATH_APP = {
  root: ROOTS.app,
  general: {
    root: path(ROOTS.app, "/general"),
    dashboard: path(ROOTS.app, "/general/dashboard"),
  },
  community: {
    root: path(ROOTS.app, "/community"),
    people: path(ROOTS.app, "/community/people"),
    meetups: path(ROOTS.app, "/community/meetups"),
    cities: path(ROOTS.app, "/community/cities"),
    posts: path(ROOTS.app, "/community/posts"),
    plans: path(ROOTS.app, "/community/plans"),
  },
  jobs: {
    root: path(ROOTS.app, "/jobs"),
    list: path(ROOTS.app, "/jobs/list"),
    jobDetail: path(ROOTS.app, "/jobs/jobDetail/:id"),
    companyDetail: path(ROOTS.app, "jobs/companyDetail/:id"),
  },
  companies: {
    root: path(ROOTS.app, "/companies"),
  },
  account: {
    root: path(ROOTS.app, "/account"),
    profile: path(ROOTS.app, "/account/profile"),
    settings: path(ROOTS.app, "/account/settings"),
    notifications: path(ROOTS.app, "/account/notifications"),
  },
};

export const PATH_DOCS = {
  root: ROOTS.docs,
  introduction: path(ROOTS.docs, "/introduction"),
  started: path(ROOTS.docs, "/getting-started"),
  // Theme UI
  color: path(ROOTS.docs, "/color"),
  typography: path(ROOTS.docs, "/typography"),
  icon: path(ROOTS.docs, "/icon"),
  shadows: path(ROOTS.docs, "/shadows"),
  components: path(ROOTS.docs, "/components"),
  tips: path(ROOTS.docs, "/tips"),

  // Development
  routing: path(ROOTS.docs, "/routing"),
  environmentVariables: path(ROOTS.docs, "/environment-variables"),
  stateManagement: path(ROOTS.docs, "/state-management"),
  apiCalls: path(ROOTS.docs, "/api-calls"),
  analytics: path(ROOTS.docs, "/analytics"),
  authentication: path(ROOTS.docs, "/authentication"),
  multiLanguage: path(ROOTS.docs, "/multi-language"),
  lazyload: path(ROOTS.docs, "/lazyload-image"),
  formHelper: path(ROOTS.docs, "/form-helper"),

  // Changelog
  support: path(ROOTS.docs, "/support"),
  changelog: path(ROOTS.docs, "/changelog"),
};
