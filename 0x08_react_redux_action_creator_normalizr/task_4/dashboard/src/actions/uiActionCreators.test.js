import {
  login,
  logout,
  displayNotificationDrawer,
  hideNotificationDrawer,
} from "./uiActionCreators";
import {
  LOGIN,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
} from "./uiActionTypes";

describe("uiActionCreators", () => {
  it("login should return the right action", () => {
    const expected = { type: LOGIN, user: { email: "test@test.com", password: "password123" } };
    expect(login("test@test.com", "password123")).toEqual(expected);
  });

  it("logout should return the right action", () => {
    const expected = { type: LOGOUT };
    expect(logout()).toEqual(expected);
  });

  it("displayNotificationDrawer should return the right action", () => {
    const expected = { type: DISPLAY_NOTIFICATION_DRAWER };
    expect(displayNotificationDrawer()).toEqual(expected);
  });

  it("hideNotificationDrawer should return the right action", () => {
    const expected = { type: HIDE_NOTIFICATION_DRAWER };
    expect(hideNotificationDrawer()).toEqual(expected);
  });
});
