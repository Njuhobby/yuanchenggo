import faker from "faker";
import mock from "src/utils/mock";
import { orderBy } from "lodash";
import { getCompanyAvatar } from "src/utils/getImages";

// -------------------------------------------

let jobs = [
  {
    id: faker.random.uuid(),
    title: "高级前端工程师",
    company: {
      id: faker.random.uuid(),
      name: "BitPay",
      avatar: getCompanyAvatar("company_avatar.jpg"),
    },
    createdAt: new Date("2021-3-1 18:00:00"),
    location: "全国范围",
  },
  {
    id: faker.random.uuid(),
    title: "Senior Front End Engineer",
    company: {
      id: faker.random.uuid(),
      name: "微软苏州",
      avatar: getCompanyAvatar("company_avatar_2.jpg"),
    },
    createdAt: new Date("2021-4-1 18:00:00"),
    location: "北京及周边",
  },
];

// ------------------------------------------------------------------

mock.onGet("/api/jobs").reply(() => {
  jobs = orderBy(jobs, ["createdAt"], ["desc"]);

  return [200, { jobs }];
});

// ------------------------------------------------------------------
