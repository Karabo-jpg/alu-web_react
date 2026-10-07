import { shallow } from "enzyme";
import React from "react";
import { NotificationsContainer } from "./NotificationsContainer";

describe("<NotificationsContainer />", () => {
  it("verify that the component is calling fetchNotifications on mount", () => {
    const fetchNotifications = jest.fn();
    shallow(<NotificationsContainer fetchNotifications={fetchNotifications} />);
    expect(fetchNotifications).toHaveBeenCalled();
  });
});
