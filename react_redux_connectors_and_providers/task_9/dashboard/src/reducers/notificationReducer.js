import { Map, fromJS } from "immutable";
import { notificationsNormalizer } from "../schema/notifications";
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
} from "../actions/notificationActionTypes";

const initialState = Map({
  notifications: {},
  filter: "DEFAULT",
});

export default function notificationReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      const normalizedData = notificationsNormalizer(action.data);
      const notifications = normalizedData.entities.notifications || {};
      Object.keys(notifications).forEach((key) => {
        notifications[key].isRead = false;
      });
      return state.merge({
        notifications: fromJS(notifications),
      });
    case MARK_AS_READ:
      return state.setIn(["notifications", action.index.toString(), "isRead"], true);
    case SET_TYPE_FILTER:
      return state.set("filter", action.filter);
    default:
      return state;
  }
}
