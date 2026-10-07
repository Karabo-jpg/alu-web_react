export const getListCourses = (state) => {
  const courses = state.courses;
  return courses.valueSeq();
};
