import { Map, fromJS } from "immutable";
import { coursesNormalizer } from "../schema/courses";
import {
  FETCH_COURSE_SUCCESS,
  SELECT_COURSE,
  UNSELECT_COURSE,
} from "../actions/courseActionTypes";

const initialState = Map();

export default function courseReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_COURSE_SUCCESS:
      const normalizedData = coursesNormalizer(action.data);
      const courses = normalizedData.entities.courses || {};
      Object.keys(courses).forEach((key) => {
        courses[key].isSelected = false;
      });
      return state.merge(fromJS(courses));
    case SELECT_COURSE:
      return state.setIn([action.index.toString(), "isSelected"], true);
    case UNSELECT_COURSE:
      return state.setIn([action.index.toString(), "isSelected"], false);
    default:
      return state;
  }
}
