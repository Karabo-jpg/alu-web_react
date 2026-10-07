import { Map, fromJS } from "immutable";
import {
  filterTypeSelected,
  getNotifications,
  getUnreadNotificationsByType,
} from "./notificationSelector";

describe("notification selectors", () => {
  const state = {
    notifications: fromJS({
      filter: "DEFAULT",
      notifications: {
        "1": { id: 1, isRead: false, type: "default", value: "New course available" },
        "2": { id: 2, isRead: true, type: "urgent", value: "New resume available" },
        "3": { id: 3, isRead: false, type: "urgent", value: "New data available" },
      },
    }),
  };

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

  it("getUnreadNotificationsByType return a list of the unread message entities when filter is DEFAULT", () => {
    const expected = [
      { id: 1, isRead: false, type: "default", value: "New course available" },
      { id: 3, isRead: false, type: "urgent", value: "New data available" },
    ];
    expect(getUnreadNotificationsByType(state).toJS()).toEqual(expected);
  });

  it("getUnreadNotificationsByType return a list of the unread urgent message entities when filter is URGENT", () => {
    const urgentState = {
      notifications: fromJS({
        filter: "URGENT",
        notifications: {
          "1": { id: 1, isRead: false, type: "default", value: "New course available" },
          "2": { id: 2, isRead: true, type: "urgent", value: "New resume available" },
          "3": { id: 3, isRead: false, type: "urgent", value: "New data available" },
        },
      }),
    };
    const expected = [
      { id: 3, isRead: false, type: "urgent", value: "New data available" },
    ];
    expect(getUnreadNotificationsByType(urgentState).toJS()).toEqual(expected);
  });
});
