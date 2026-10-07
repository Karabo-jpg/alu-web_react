import { createSelector } from "reselect";

const getCourses = (state) => state.courses;

export const getListCourses = createSelector(
  getCourses,
  (courses) => courses.valueSeq()
);
