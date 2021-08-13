import faker from "faker";
import mock from "src/utils/mock";
import { orderBy } from "lodash";
import { getCompanyAvatar } from "src/utils/getImages";
import _ from "lodash";

// -------------------------------------------

let jobs = [
  {
    id: 1,
    title: "全栈高级工程师",
    company: {
      id: faker.random.uuid(),
      name: "Airbnb",
      avatar: getCompanyAvatar("company_avatar_1.jpg"),
      isStar: true,
      websiteUrl: "",
      country: "中国",
      city: "上海",
      province: "",
      numberOfTotalPosts: 2,
    },
    saved: true,
    salary: "12k-15k/月",
    createdAt: new Date("2021-8-2 18:00:00"),
    location: "南京及周边",
    type: "全职",
    jobCategory: "全栈软件开发",
    postContent:
      "<p><strong>职位详情</strong></p><p><br></p><p>我们是一个出海APP团队，全球用户过百万，团队成员有着丰富的全球移动互联网产品和运营经验。 团队以远程办公为主。</p><p><br></p><p>工作职责：</p><p>1. 研究各种竞品，分析产品细节，给出产品功能的改善建议</p><p>2. 收集整理海外用户的建议和反馈，为产品运营和开发提供参考。</p><p>3. 负责产品问题的分析和排查</p><p><br></p><p>岗位要求：</p><p>1. 有较多可自由支配时间的或在校学生，可以在家或在学校远程办公。</p><p>2. 英语4级，或同等英语读写能力。</p><p>3. 吃苦耐劳，做事情有耐心，认真负责</p><p>4. 喜欢手机APP，踏实细心，有良好的沟通能力和服务意识</p><p>5. 对移动互联网的工作充满热情，能及时响应同事和客户的需求</p>",
  },
  {
    id: 2,
    title: "资深React前后端工程师",
    company: {
      id: faker.random.uuid(),
      name: "Airbnb",
      avatar: getCompanyAvatar("company_avatar_1.jpg"),
      isStar: true,
      websiteUrl: "",
      country: "中国",
      city: "北京",
      province: "",
      numberOfTotalPosts: 2,
    },
    salary: "12k-40k/月",
    createdAt: new Date("2021-6-28 18:10:00"),
    location: "北京及周边",
    type: "兼职",
    jobCategory: "全栈软件开发",
    postContent:
      "<p><strong>Sound like you?</strong></p><ul><li>You have 4+ years of experience maintaining complicated web applications</li><li>You're curious to learn and demonstrate the ability to do so very quickly</li><li>You communicate with clarity and precision, whether with teammates or users</li><li>You thrive in a collaborative environment involving different stakeholders and subject-matter experts</li><li>You are self-motivated, possess a strong work ethic, and work well independently</li><li>You identify with Slab's mission and values</li></ul><p><br></p><p><strong>What we value</strong></p><ul><li><strong>Stay lean</strong> - We strive for the greatest possible impact with the fewest number of employees. We empower our teammates with the most leveraged tools and efficient processes.</li><li><strong>Default to open</strong> - We encourage and nurture open exchanges of knowledge and ideas — while acting with respect and regard for each other.</li><li><strong>Think rigorously</strong> - We act and execute after careful thought and examination of known information, while acknowledging the risks we accept in its absence.</li><li><strong>Say no</strong> - We aim to deliver exceptionally high value in a small set of focus areas. We willingly abstain from good ideas to give only the most promising paths the attention they deserve.</li><li><strong>The best prevails</strong> - Whether an idea or an individual, the best will rise to the top at Slab. Ideas we pursue can come from anywhere, and individuals gain responsibilities due to outperformance.</li><li><strong>Global optimization</strong> - We believe that our mission — to make the workplace a source of learning and purpose — is the ultimate priority, above any single project, team, or individual.</li></ul><p><br></p><p><strong>Technologies we use</strong></p><ul><li>TypeScript + React</li><li>GraphQL + Apollo + Absinthe</li><li>Phoenix + Elixir</li><li>Postgres</li><li>Docker + Kubernetes</li><li>Google Cloud Platform</li></ul><p><br></p><p>We are looking for either depth in one part of the stack or breadth across a wide portion.</p><p><br></p><p><strong>Benefits</strong></p><ul><li>Flexible work arrangements</li><li>Medical, dental, and vision insurance</li><li>Generous equity offer</li><li>7-year option exercise window</li><li>$5k desk setup of your choice</li></ul><p><br></p>",
  },
  {
    id: 3,
    title: "创业合伙人",
    company: {
      id: faker.random.uuid(),
      name: "BitPay",
      avatar: getCompanyAvatar("company_avatar_2.jpg"),
      isStar: false,
      websiteUrl: "",
      country: "中国",
      city: "北京",
      province: "",
      numberOfTotalPosts: 2,
    },
    salary: "2k-10k/月",
    createdAt: new Date("2021-6-4 18:00:00"),
    location: "全国范围",
    type: "全职兼职皆可",
    jobCategory: "高级管理",
    postContent:
      "<p><strong>职位详情</strong></p><p><br></p><p>我们是一个出海APP团队，全球用户过百万，团队成员有着丰富的全球移动互联网产品和运营经验。 团队以远程办公为主。</p><p><br></p><p>工作职责：</p><p>1. 研究各种竞品，分析产品细节，给出产品功能的改善建议</p><p>2. 收集整理海外用户的建议和反馈，为产品运营和开发提供参考。</p><p>3. 负责产品问题的分析和排查</p><p><br></p><p>岗位要求：</p><p>1. 有较多可自由支配时间的或在校学生，可以在家或在学校远程办公。</p><p>2. 英语4级，或同等英语读写能力。</p><p>3. 吃苦耐劳，做事情有耐心，认真负责</p><p>4. 喜欢手机APP，踏实细心，有良好的沟通能力和服务意识</p><p>5. 对移动互联网的工作充满热情，能及时响应同事和客户的需求</p>",
  },
  {
    id: 4,
    title: "Senior Front End Engineer",
    company: {
      id: faker.random.uuid(),
      name: "微软苏州",
      avatar: getCompanyAvatar("company_avatar_3.jpg"),
      isStar: false,
      websiteUrl: "",
      country: "中国",
      city: "苏州",
      province: "",
      numberOfTotalPosts: 2,
    },
    salary: "2k-5k/月",
    createdAt: new Date("2021-4-1 18:00:00"),
    location: "江浙沪/安徽",
    type: "兼职",
    jobCategory: "前端软件开发",
    postContent:
      "<p><strong>Sound like you?</strong></p><ul><li>You have 4+ years of experience maintaining complicated web applications</li><li>You're curious to learn and demonstrate the ability to do so very quickly</li><li>You communicate with clarity and precision, whether with teammates or users</li><li>You thrive in a collaborative environment involving different stakeholders and subject-matter experts</li><li>You are self-motivated, possess a strong work ethic, and work well independently</li><li>You identify with Slab's mission and values</li></ul><p><br></p><p><strong>What we value</strong></p><ul><li><strong>Stay lean</strong> - We strive for the greatest possible impact with the fewest number of employees. We empower our teammates with the most leveraged tools and efficient processes.</li><li><strong>Default to open</strong> - We encourage and nurture open exchanges of knowledge and ideas — while acting with respect and regard for each other.</li><li><strong>Think rigorously</strong> - We act and execute after careful thought and examination of known information, while acknowledging the risks we accept in its absence.</li><li><strong>Say no</strong> - We aim to deliver exceptionally high value in a small set of focus areas. We willingly abstain from good ideas to give only the most promising paths the attention they deserve.</li><li><strong>The best prevails</strong> - Whether an idea or an individual, the best will rise to the top at Slab. Ideas we pursue can come from anywhere, and individuals gain responsibilities due to outperformance.</li><li><strong>Global optimization</strong> - We believe that our mission — to make the workplace a source of learning and purpose — is the ultimate priority, above any single project, team, or individual.</li></ul><p><br></p><p><strong>Technologies we use</strong></p><ul><li>TypeScript + React</li><li>GraphQL + Apollo + Absinthe</li><li>Phoenix + Elixir</li><li>Postgres</li><li>Docker + Kubernetes</li><li>Google Cloud Platform</li></ul><p><br></p><p>We are looking for either depth in one part of the stack or breadth across a wide portion.</p><p><br></p><p><strong>Benefits</strong></p><ul><li>Flexible work arrangements</li><li>Medical, dental, and vision insurance</li><li>Generous equity offer</li><li>7-year option exercise window</li><li>$5k desk setup of your choice</li></ul><p><br></p>",
  },
  {
    id: 5,
    title: "UI设计总监",
    company: {
      id: faker.random.uuid(),
      name: "PayStream",
      avatar: getCompanyAvatar("company_avatar_4.jpg"),
      isStar: false,
      websiteUrl: "",
      country: "中国",
      city: "广州",
      province: "",
      numberOfTotalPosts: 2,
    },
    salary: "2k-10k/月",
    createdAt: new Date("2021-6-4 18:00:00"),
    location: "全国范围",
    type: "全职",
    jobCategory: "软件UI设计",
    postContent: "",
  },
  {
    id: 6,
    title: "人力资源总监",
    company: {
      id: faker.random.uuid(),
      name: "HarmonyOS",
      avatar: getCompanyAvatar("company_avatar_5.jpg"),
      isStar: false,
      websiteUrl: "",
      country: "中国",
      city: "深圳",
      province: "",
      numberOfTotalPosts: 2,
    },
    salary: "面议",
    createdAt: new Date("2021-6-10 18:00:00"),
    location: "全国范围",
    type: "全职",
    jobCategory: "人力资源相关",
    postContent: "",
  },
  {
    id: 7,
    title: "QA小组总负责人",
    company: {
      id: faker.random.uuid(),
      name: "亚马逊",
      avatar: getCompanyAvatar("company_avatar_6.jpg"),
      isStar: true,
      websiteUrl: "",
      country: "中国",
      city: "深圳",
      province: "",
      numberOfTotalPosts: 2,
    },
    salary: "面议",
    createdAt: new Date("2021-3-1 18:00:00"),
    location: "北京及周边",
    type: "兼职",
    jobCategory: "软件测试QA",
    postContent: "",
  },
];

// ------------------------------------------------------------------

export default function () {
  mock.onGet("/api/jobs").reply(() => {
    jobs = orderBy(jobs, ["createdAt"], ["desc"]);

    return [200, { jobs: jobs }];
  });

  mock.onGet("/api/jobs/jobDetail").reply((config) => {
    const found = _.filter(jobs, function (o) {
      return o.id === parseInt(config.params.id);
    });

    if (found.length === 1) {
      const foundJob = found[0];
      foundJob.relatedJobs = _.cloneDeep(jobs).slice(1, 4);
      return [200, { job: foundJob }];
    } else return [400, { job: null }];
  });
}
