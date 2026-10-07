import { shallow } from "enzyme";
import React from "react";
import { App, listNotificationsInitialState, mapStateToProps } from "./App";
import { StyleSheetTestUtils } from "aphrodite";
import { fromJS } from "immutable";

describe("<App />", () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("App renders without crashing", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toEqual(true);
  });
  it("should contain the Notifications component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("Notifications")).toHaveLength(1);
  });
  it("should contain the Header component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("Header")).toHaveLength(1);
  });
  it("should contain the Login component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("Login")).toHaveLength(1);
  });
  it("should contain the Footer component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("Footer")).toHaveLength(1);
  });
  it("CourseList is not displayed with isLoggedIn false by default", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("CourseList")).toHaveLength(0);
  });
  it("isLoggedIn is true", () => {
    const wrapper = shallow(<App isLoggedIn={true} />);

    expect(wrapper.find("Login")).toHaveLength(0);
    expect(wrapper.find("CourseList")).toHaveLength(1);
  });
});

describe("mapStateToProps", () => {
  it("verify that the function returns the right object when passing the state", () => {
    let state = {
      ui: fromJS({
        isUserLoggedIn: true,
        isNotificationDrawerVisible: false,
      }),
    };
    expect(mapStateToProps(state)).toEqual({ isLoggedIn: true, displayDrawer: false });
  });
});
