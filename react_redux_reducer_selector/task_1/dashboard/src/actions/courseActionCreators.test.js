import { selectCourse, unSelectCourse } from "./courseActionCreators";
import { SELECT_COURSE, UNSELECT_COURSE } from "./courseActionTypes";

describe("courseActionCreators", () => {
  it("selectCourse should return the right action", () => {
    const expected = { type: SELECT_COURSE, index: 1 };
    expect(selectCourse(1)).toEqual(expected);
  });

  it("unSelectCourse should return the right action", () => {
    const expected = { type: UNSELECT_COURSE, index: 1 };
    expect(unSelectCourse(1)).toEqual(expected);
  });
});
