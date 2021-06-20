import faker from "faker";
import { sample } from "lodash";
import mock from "src/utils/mock";
import {
  getImgCover,
  getImgFeed,
  getImgAvatar,
  getProfileCover,
} from "src/utils/getImages";

// ----------------------------------------------------------------------

const createId = (index) => `fc68bad5-d430-4033-b8f8-4bc069dc0ba0-${index}`;

// ----------------------------------------------------------------------

mock.onGet("/api/user/profile").reply(() => {
  const profile = {
    id: createId(1),
    cover: {
      small: getProfileCover(720, 1),
      medium: getProfileCover(1200, 1),
    },
    position: "UI Designer",
    follower: faker.random.number(),
    following: faker.random.number(),
    quote:
      "躺平而不内卷的普通苏州IT人，第一次来到远程狗，第一次接触远程工作，希望能在这里找到志同道合的小伙伴，一起工作而不上班",
    country: faker.address.country(),
    email: faker.internet.email(),
    company: faker.company.companyName(),
    school: faker.company.companyName(),
    facebookLink: `https://www.facebook.com/caitlyn.kerluke`,
    instagramLink: `https://www.instagram.com/caitlyn.kerluke`,
    linkedinLink: `https://www.linkedin.com/in/caitlyn.kerluke`,
    twitterLink: `https://www.twitter.com/caitlyn.kerluke`,
  };

  return [200, { profile }];
});

// ----------------------------------------------------------------------

mock.onGet("/api/user/all").reply(() => {
  const users = [...Array(24)].map((user, index) => {
    const setIndex = index + 1;
    return {
      id: createId(setIndex),
      avatarUrl: getImgAvatar(setIndex),
      cover: {
        small: getImgCover(600, setIndex),
        medium: getImgCover(960, setIndex),
      },
      name: faker.name.findName(),
      follower: faker.random.number(),
      following: faker.random.number(),
      totalPost: faker.random.number(),
      position: sample([
        "Leader",
        "Hr Manager",
        "UI Designer",
        "UX Designer",
        "UI/UX Designer",
        "Project Manager",
        "Backend Developer",
        "Full Stack Designer",
        "Front End Developer",
        "Full Stack Developer",
      ]),
    };
  });

  return [200, { users }];
});

// ----------------------------------------------------------------------

mock.onGet("/api/user/manage-users").reply(() => {
  const users = [...Array(24)].map((user, index) => {
    const setIndex = index + 1;
    return {
      id: createId(setIndex),
      avatarUrl: getImgAvatar(setIndex),
      name: faker.name.findName(),
      company: faker.company.companyName(),
      isVerified: faker.random.boolean(),
      status: sample(["active", "banned"]),
      role: sample([
        "Leader",
        "Hr Manager",
        "UI Designer",
        "UX Designer",
        "UI/UX Designer",
        "Project Manager",
        "Backend Developer",
        "Full Stack Designer",
        "Front End Developer",
        "Full Stack Developer",
      ]),
    };
  });

  return [200, { users }];
});

// ----------------------------------------------------------------------

mock.onGet("/api/user/social/followers").reply(() => {
  const followers = [...Array(18)].map((item, index) => {
    const setIndex = index + 2;
    return {
      id: createId(setIndex),
      avatarUrl: getImgAvatar(setIndex),
      name: faker.name.findName(),
      country: faker.address.country(),
      isFollowed: faker.random.boolean(),
    };
  });

  return [200, { followers }];
});

// ----------------------------------------------------------------------

mock.onGet("/api/user/social/friends").reply(() => {
  const friends = [...Array(18)].map((item, index) => {
    const setIndex = index + 2;
    return {
      id: createId(setIndex),
      avatarUrl: getImgAvatar(setIndex),
      name: faker.name.findName(),
      role: sample([
        "Leader",
        "Hr Manager",
        "UI Designer",
        "UX Designer",
        "UI/UX Designer",
        "Project Manager",
        "Backend Developer",
        "Full Stack Designer",
        "Front End Developer",
        "Full Stack Developer",
      ]),
    };
  });

  return [200, { friends }];
});

// ----------------------------------------------------------------------

mock.onGet("/api/user/social/gallery").reply(() => {
  const gallery = [...Array(18)].map((image, index) => {
    const setIndex = index + 2;
    return {
      id: createId(setIndex),
      title: faker.name.title(),
      postAt: faker.date.past(),
      imageUrl: {
        small: getImgCover(600, setIndex),
        medium: getImgCover(960, setIndex),
        large: getImgCover(1920, setIndex),
      },
    };
  });

  return [200, { gallery }];
});

// ----------------------------------------------------------------------

mock.onGet("/api/user/account/cards").reply(() => {
  const cards = [...Array(2)].map((card, index) => {
    return {
      id: faker.random.uuid(),
      cardNumber:
        (index === 0 && "**** **** **** 1234") ||
        (index === 1 && "**** **** **** 5678"),
      cardType: (index === 0 && "master_card") || (index === 1 && "visa"),
    };
  });

  return [200, { cards }];
});

// ----------------------------------------------------------------------

mock.onGet("/api/user/account/address-book").reply(() => {
  const addressBook = [...Array(4)].map((address, index) => {
    return {
      id: faker.random.uuid(),
      name: faker.name.findName(),
      phone: faker.phone.phoneNumber(),
      country: faker.address.country(),
      state: faker.address.state(),
      city: faker.address.city(),
      street: faker.address.streetAddress(),
      zipCode: faker.address.zipCode(),
    };
  });

  return [200, { addressBook }];
});

// ----------------------------------------------------------------------

mock.onGet("/api/user/account/invoices").reply(() => {
  const invoices = [...Array(10)].map((invoice, index) => {
    return {
      id: faker.random.uuid(),
      createdAt: faker.date.past(),
      price: faker.random.number({ min: 4, max: 99, precision: 0.01 }),
    };
  });

  return [200, { invoices }];
});

// ----------------------------------------------------------------------

mock.onGet("/api/user/account/notifications-settings").reply(() => {
  const notifications = {
    activityComments: true,
    activityAnswers: true,
    activityFollows: false,
    applicationNews: true,
    applicationProduct: false,
    applicationBlog: false,
  };

  return [200, { notifications }];
});

// ----------------------------------------------------------------------

mock.onGet("/api/user/posts").reply(() => {
  const posts = [
    {
      id: faker.random.uuid(),
      author: {
        id: createId(1),
        avatarUrl: getImgAvatar(1),
        name: "Caitlyn Kerluke",
      },
      isLiked: true,
      createdAt: faker.date.past(),
      location: "苏州昆山",
      media: "/static/images/posts/coffee_sf.jpg",
      message:
        "刚刚在法国接受了一个月高温洗礼的我，回国后第一件事就是“找地方避暑”，约上闺蜜溜到安顺待了四日。\n" +
        "安顺,就是著名的黄果树瀑布所在地，距离贵阳坐动车只需要半小时。这里的气候以凉爽、湿润、清新、太阳辐射低和舒适期长，适宜居住、避暑和旅游为主要特点，全年舒适期长达9个月，夏季7月平均气温只有21℃，且多云多雨，紫外线也不强，是极佳的避暑度假胜地，获评“中国最佳避暑旅游城市”。可能很多人对这里了解不多，其实安顺除了黄果树瀑布还有很多人少舒适的景点可以去，先po一段vlog预告，还有我镜头里捕捉的山山水水。",
      personLikes: [...Array(50)].map((person, index) => {
        return {
          name: faker.name.findName(),
          avatarUrl: getImgAvatar(index + 2),
        };
      }),
      comments: [
        {
          id: faker.random.uuid(),
          author: {
            id: createId(2),
            avatarUrl: getImgAvatar(sample([2, 3, 4, 5, 6])),
            name: "杨旭游记",
          },
          createdAt: faker.date.past(),
          message: "为这种生活方式点赞！下次再来SF请一定来找我",
        },
        {
          id: faker.random.uuid(),
          author: {
            id: createId(3),
            avatarUrl: getImgAvatar(sample([7, 8, 9, 10, 11])),
            name: "Craig Tomas",
          },
          createdAt: faker.date.past(),
          message:
            "very cool article man! hope we can talk to each other in person someday in the future!",
        },
      ],
    },
    {
      id: faker.random.uuid(),
      author: {
        id: createId(1),
        avatarUrl: getImgAvatar(1),
        name: "Caitlyn Kerluke",
      },
      isLiked: true,
      createdAt: faker.date.past(),
      location: "杭州手语咖啡",
      media: "/static/images/posts/lv.jpg",
      message:
        "来新疆20日有余，捡起了久违的青旅住宿，但大部分的时间还是自己一个人在路上。有在三个国家相邻的边境线上自驾遇到过塔吉族的姑娘搭车；也有被军哥哥请到军队去检查；有在沙漠里陷车；也有顶着正午的大太阳在路边换胎。逛过景区也热衷于寻找不要门票的野景点，但这些都不是我这篇游记想主要写的。\n" +
        "情绪这个东西，有点道不清，它好像一种很柔软又飘忽不定的东西，经常因为自然界的风花雪月或人世间的阴晴冷暖，剧烈波动着，蛛丝般震颤飘荡，无所寻迹……在路上的这么多天，情绪这个朋友可是变着花样的来看我。\n" +
        "\n" +
        "有看到了惊艳的场景，忍不住肆意的奔跑；\n" +
        "有眼望八方，感到四处无助；\n" +
        "有在车上开着开着就突然的泪流；\n" +
        "有突然的很想回家也有突然的很想TA…",
      personLikes: [...Array(50)].map((person, index) => {
        return {
          name: faker.name.findName(),
          avatarUrl: getImgAvatar(index + 2),
        };
      }),
      comments: [
        {
          id: faker.random.uuid(),
          author: {
            id: createId(2),
            avatarUrl: getImgAvatar(sample([2, 3, 4, 5, 6])),
            name: "朱亚伟",
          },
          createdAt: faker.date.past(),
          message: "新疆天山南北，纵马奔驰，何其快哉",
        },
        {
          id: faker.random.uuid(),
          author: {
            id: createId(3),
            avatarUrl: getImgAvatar(sample([7, 8, 9, 10, 11])),
            name: "彭建霖",
          },
          createdAt: faker.date.past(),
          message: "新疆远程工作安全吗，wifi怎么样",
        },
      ],
    },
    {
      id: faker.random.uuid(),
      author: {
        id: createId(1),
        avatarUrl: getImgAvatar(1),
        name: "Caitlyn Kerluke",
      },
      isLiked: true,
      createdAt: faker.date.past(),
      location: "长沙IFS",
      media: "/static/images/posts/xinjiang.jpeg",
      message:
        "我想，你也许或多或少会跟我一样，在旅途中也会和某种情绪不期而遇，这在我看来反倒是一件特别珍贵的经历，毕竟在职场或日常里，生活这个老师已经把人弄的越发的麻木。\n" +
        "我可不希望自己成为那种看似波澜不惊，实则已经对生活失去了感知，希望自己一直都能做个哭笑不打折的人。",
      personLikes: [...Array(50)].map((person, index) => {
        return {
          name: faker.name.findName(),
          avatarUrl: getImgAvatar(index + 2),
        };
      }),
      comments: [
        {
          id: faker.random.uuid(),
          author: {
            id: createId(2),
            avatarUrl: getImgAvatar(sample([2, 3, 4, 5, 6])),
            name: "远程鸭亲友会",
          },
          createdAt: faker.date.past(),
          message: "为这种生活方式点赞！下次一起组织一波",
        },
        {
          id: faker.random.uuid(),
          author: {
            id: createId(3),
            avatarUrl: getImgAvatar(sample([7, 8, 9, 10, 11])),
            name: "OHO2",
          },
          createdAt: faker.date.past(),
          message:
            "very cool article man! hope we can talk to each other in person someday in the future!",
        },
      ],
    },
  ];

  return [200, { posts }];
});
