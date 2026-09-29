import configureMockStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import fetchMock from "fetch-mock";
import {
  login,
  logout,
  displayNotificationDrawer,
  hideNotificationDrawer,
  loginRequest,
} from "./uiActionCreators";
import {
  LOGIN,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "./uiActionTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("uiActionCreators", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("login should return the right action", () => {
    const expected = {
      type: LOGIN,
      user: { email: "test@test.com", password: "password123" },
    };
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

  it("loginRequest should dispatch LOGIN and LOGIN_SUCCESS when API succeeds", () => {
    fetchMock.getOnce("/login-success.json", {
      body: { first_name: "Johann" },
      headers: { "content-type": "application/json" },
    });

    const expectedActions = [
      { type: LOGIN, user: { email: "test@test.com", password: "password123" } },
      { type: LOGIN_SUCCESS },
    ];

    const store = mockStore({});

    return store.dispatch(loginRequest("test@test.com", "password123")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("loginRequest should dispatch LOGIN and LOGIN_FAILURE when API fails", () => {
    fetchMock.getOnce("/login-success.json", 500);

    const expectedActions = [
      { type: LOGIN, user: { email: "test@test.com", password: "password123" } },
      { type: LOGIN_FAILURE },
    ];

    const store = mockStore({});

    return store.dispatch(loginRequest("test@test.com", "password123")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
