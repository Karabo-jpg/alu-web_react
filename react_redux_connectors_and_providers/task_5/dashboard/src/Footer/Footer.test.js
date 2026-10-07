import { shallow } from "enzyme";
import React from "react";
import { Footer } from "./Footer";

describe("<Footer />", () => {
  it("Footer renders without crashing", () => {
    const wrapper = shallow(<Footer user={null} />);
    expect(wrapper.exists()).toEqual(true);
  });
  it("Verify that the components at the very least render the text 'Copyright'", () => {
    const wrapper = shallow(<Footer user={null} />);
    expect(wrapper.text()).toContain("Copyright");
  });
  it("Verify that the contact us link is not displayed when user is not logged in", () => {
    const wrapper = shallow(<Footer user={null} />);
    expect(wrapper.find("a")).toHaveLength(0);
  });
  it("Verify that the contact us link is displayed when user is logged in", () => {
    const wrapper = shallow(<Footer user={{ isLoggedIn: true }} />);
    expect(wrapper.find("a")).toHaveLength(1);
    expect(wrapper.find("a").text()).toEqual("Contact us");
  });
});
