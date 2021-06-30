import faker from "faker";
import mock from "src/utils/mock";
import { orderBy } from "lodash";
import { getCompanyAvatar } from "src/utils/getImages";

// -------------------------------------------

let jobs = [
  {
    id: faker.random.uuid(),
    title: "全栈高级工程师",
    company: {
      id: faker.random.uuid(),
      name: "Airbnb",
      avatar: getCompanyAvatar("company_avatar_1.jpg"),
      isStar: true,
      websiteUrl: "",
      country: "",
      city: "",
      province: "",
      numberOfActivePosts: 2,
    },
    saved: true,
    createdAt: new Date("2021-6-28 18:00:00"),
    location: "南京及周边",
    type: "全职",
  },
  {
    id: faker.random.uuid(),
    title: "资深React前后端工程师",
    company: {
      id: faker.random.uuid(),
      name: "Airbnb",
      avatar: getCompanyAvatar("company_avatar_1.jpg"),
      isStar: true,
      websiteUrl: "",
      country: "",
      city: "",
      province: "",
      numberOfActivePosts: 2,
    },
    createdAt: new Date("2021-6-28 18:10:00"),
    location: "北京及周边",
    type: "兼职",
    postContent: "",
  },
  {
    id: faker.random.uuid(),
    title: "创业合伙人",
    company: {
      id: faker.random.uuid(),
      name: "BitPay",
      avatar: getCompanyAvatar("company_avatar_2.jpg"),
      isStar: false,
      websiteUrl: "",
      country: "",
      city: "",
      province: "",
      numberOfActivePosts: 2,
    },
    createdAt: new Date("2021-6-4 18:00:00"),
    location: "全国范围",
    type: "全职兼职皆可",
  },
  {
    id: faker.random.uuid(),
    title: "Senior Front End Engineer",
    company: {
      id: faker.random.uuid(),
      name: "微软苏州",
      avatar: getCompanyAvatar("company_avatar_3.jpg"),
      isStar: false,
      websiteUrl: "",
      country: "",
      city: "",
      province: "",
      numberOfActivePosts: 2,
    },
    createdAt: new Date("2021-4-1 18:00:00"),
    location: "江浙沪/安徽",
    type: "兼职",
  },
  {
    id: faker.random.uuid(),
    title: "UI设计总监",
    company: {
      id: faker.random.uuid(),
      name: "PayStream",
      avatar: getCompanyAvatar("company_avatar_4.jpg"),
      isStar: false,
      websiteUrl: "",
      country: "",
      city: "",
      province: "",
      numberOfActivePosts: 2,
    },
    createdAt: new Date("2021-6-4 18:00:00"),
    location: "全国范围",
    type: "全职",
  },
  {
    id: faker.random.uuid(),
    title: "人力资源总监",
    company: {
      id: faker.random.uuid(),
      name: "HarmonyOS",
      avatar: getCompanyAvatar("company_avatar_5.jpg"),
      isStar: false,
      websiteUrl: "",
      country: "",
      city: "",
      province: "",
      numberOfActivePosts: 2,
    },
    createdAt: new Date("2021-6-10 18:00:00"),
    location: "全国范围",
    type: "全职",
  },
  {
    id: faker.random.uuid(),
    title: "QA小组总负责人",
    company: {
      id: faker.random.uuid(),
      name: "亚马逊",
      avatar: getCompanyAvatar("company_avatar_6.jpg"),
      isStar: true,
      websiteUrl: "",
      country: "",
      city: "",
      province: "",
      numberOfActivePosts: 2,
    },
    createdAt: new Date("2021-3-1 18:00:00"),
    location: "北京及周边",
    type: "兼职",
  },
];

// ------------------------------------------------------------------

mock.onGet("/api/jobs").reply(() => {
  jobs = orderBy(jobs, ["createdAt"], ["desc"]);

  return [200, { jobs: jobs }];
});

// ------------------------------------------------------------------
