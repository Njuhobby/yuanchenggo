import faker from "faker";
import mock from "src/utils/mock";
import { set, sub } from "date-fns";
import { orderBy } from "lodash";
import { getImgAvatar } from "src/utils/getImages";

// -------------------------------------------

let jobs = [
  {
    id: faker.random.uuid(),
    title: "高级前端工程师",
    company: {
      id: faker.random.uuid(),
      name: "BitPay",
      avatar: getImgAvatar("company_avatar.png"),
    },
    createdAt: set(new Date(), { hours: 10, minutes: 20 }),
    location: "全国范围",
  },
  {
    id: faker.random.uuid(),
    title: "Senior Front End Engineer",
    company: {
      id: faker.random.uuid(),
      name: "微软苏州",
      avatar: getImgAvatar("company_avatar_2.png"),
    },
    createdAt: set(new Date(), { hours: 10, minutes: 30 }),
    location: "北京及周边",
  },
];

// ------------------------------------------------------------------

mock.onGet("/api/jobs").reply(() => {
  jobs = orderBy(jobs, ["createdAt"], ["desc"]);

  return [200, { jobs }];
});

// ------------------------------------------------------------------
