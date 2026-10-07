import { Map, fromJS } from "immutable";
import {
  filterTypeSelected,
  getNotifications,
  getUnreadNotifications,
} from "./notificationSelector";

describe("notification selectors", () => {
  const state = fromJS({
    filter: "DEFAULT",
    notifications: {
      "1": { id: 1, isRead: false, type: "default", value: "New course available" },
      "2": { id: 2, isRead: true, type: "urgent", value: "New resume available" },
      "3": { id: 3, isRead: false, type: "urgent", value: "New data available" },
    },
  });

  it("filterTypeSelected works as expected", () => {
    expect(filterTypeSelected(state)).toEqual("DEFAULT");
  });

  it("getNotifications returns a list of the message entities within the reducer", () => {
    expect(getNotifications(state).toJS()).toEqual({
      "1": { id: 1, isRead: false, type: "default", value: "New course available" },
      "2": { id: 2, isRead: true, type: "urgent", value: "New resume available" },
      "3": { id: 3, isRead: false, type: "urgent", value: "New data available" },
    });
  });

  it("getUnreadNotifications return a list of the message entities within the reducer", () => {
    expect(getUnreadNotifications(state).toJS()).toEqual({
      "1": { id: 1, isRead: false, type: "default", value: "New course available" },
      "3": { id: 3, isRead: false, type: "urgent", value: "New data available" },
    });
  });
});
