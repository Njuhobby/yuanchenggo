import { apiConfig } from "src/config";
import mockChatApis from "./chat";
import mockMailApis from "./mail";
import mockBlogApis from "./blog";
import mockUserApis from "./user";
import mockAccountApis from "./account";
import mockCalendarApis from "./calendar";
import mockProductApis from "./products";
import mockNotificationApis from "./notifications";
import mockJobApis from "./job";

if (apiConfig.useMockApi) {
  mockChatApis();
  mockAccountApis();
  mockMailApis();
  mockUserApis();
  mockNotificationApis();
  mockJobApis();
  mockProductApis();
  mockCalendarApis();
  mockBlogApis();
}
