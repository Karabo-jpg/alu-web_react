import { Map, fromJS } from "immutable";
import { getListCourses } from "./courseSelector";

describe("courseSelector", () => {
  it("verify that getListCourses returns the list of courses as a List", () => {
    const state = {
      courses: fromJS({
        1: { id: 1, name: "ES6", credit: 60 },
        2: { id: 2, name: "Webpack", credit: 20 },
        3: { id: 3, name: "React", credit: 40 },
      }),
    };
    const expected = fromJS([
      { id: 1, name: "ES6", credit: 60 },
      { id: 2, name: "Webpack", credit: 20 },
      { id: 3, name: "React", credit: 40 },
    ]);
    const result = getListCourses(state);
    expect(result.toJS()).toEqual(expected.toJS());
  });
});
