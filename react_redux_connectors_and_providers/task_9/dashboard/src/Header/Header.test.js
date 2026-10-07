import { shallow } from "enzyme";
import React from "react";
import { Header } from "./Header";
import { StyleSheetTestUtils } from "aphrodite";

describe("<Header />", () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("Header renders without crashing", () => {
    const wrapper = shallow(<Header user={null} logout={() => {}} />);
    expect(wrapper.exists()).toEqual(true);
  });
  it("Verify that the components render img", () => {
    const wrapper = shallow(<Header user={null} logout={() => {}} />);
    expect(wrapper.find("div img")).toHaveLength(1);
  });
  it("Verify that the components render h1", () => {
    const wrapper = shallow(<Header user={null} logout={() => {}} />);
    expect(wrapper.find("div h1")).toHaveLength(1);
  });

  it("mounts the Header component with a default context value. The logoutSection is not created", () => {
    const wrapper = shallow(<Header user={null} logout={() => {}} />);
    expect(wrapper.find("#logoutSection")).toHaveLength(0);
  });

  it("mounts the Header component with a user defined (isLoggedIn is true and an email is set). The logoutSection is created", () => {
    const wrapper = shallow(<Header user={{ isLoggedIn: true, email: "test@test.com" }} logout={() => {}} />);
    expect(wrapper.find("#logoutSection")).toHaveLength(1);
  });

  it("mounts the Header component with a user defined (isLoggedIn is true and an email is set) and the logOut is linked to a spy. Verify that clicking on the link is calling the spy", () => {
    const logOutSpy = jest.fn();
    const wrapper = shallow(<Header user={{ isLoggedIn: true, email: "test@test.com" }} logout={logOutSpy} />);
    expect(wrapper.find("#logoutSection")).toHaveLength(1);
    wrapper.find("#logoutSection span").simulate("click");
    expect(logOutSpy).toHaveBeenCalled();
  });
});
