import { selectCourse, unSelectCourse, setCourses, fetchCourses } from "./courseActionCreators";
import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from "./courseActionTypes";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("courseActionCreators", () => {
  it("selectCourse should return the right action", () => {
    const expected = { type: SELECT_COURSE, index: 1 };
    expect(selectCourse(1)).toEqual(expected);
  });

  it("unSelectCourse should return the right action", () => {
    const expected = { type: UNSELECT_COURSE, index: 1 };
    expect(unSelectCourse(1)).toEqual(expected);
  });

  it("verify that the fetch is working correctly", () => {
    const store = mockStore({});
    fetchMock.restore();

    fetchMock.getOnce("/courses.json", {
      body: [{ id: 1, name: "ES6", credit: 60 }],
      headers: { "content-type": "application/json" },
    });

    const expectedActions = [
      {
        type: FETCH_COURSE_SUCCESS,
        data: [{ id: 1, name: "ES6", credit: 60 }],
      },
    ];

    return store.dispatch(fetchCourses()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
