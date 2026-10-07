import rootReducer from "./rootReducer";
import { Map } from "immutable";

describe("rootReducer", () => {
  it("initial state is the expected object", () => {
    const expectedState = {
      courses: Map({}),
      notifications: Map({
        notifications: {},
        filter: "DEFAULT",
      }),
      ui: Map({
        isNotificationDrawerVisible: false,
        isUserLoggedIn: false,
        user: null,
      }),
    };
    const state = rootReducer(undefined, { type: "RANDOM_ACTION" });
    expect(state).toEqual(expectedState);
  });
});
