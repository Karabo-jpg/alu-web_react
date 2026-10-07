import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from "./courseActionTypes";

export function selectCourse(index) {
  return {
    type: SELECT_COURSE,
    index,
  };
}

export const boundSelectCourse = (index) => dispatch(selectCourse(index));

export function unSelectCourse(index) {
  return {
    type: UNSELECT_COURSE,
    index,
  };
}

export const boundUnSelectCourse = (index) => dispatch(unSelectCourse(index));

export function fetchCourseSuccess(data) {
  return {
    type: FETCH_COURSE_SUCCESS,
    data,
  };
}

export function fetchCourses() {
  return (dispatch) => {
    return fetch("/courses.json")
      .then((res) => res.json())
      .then((data) => dispatch(fetchCourseSuccess(data)))
      .catch((error) => {});
  };
}
