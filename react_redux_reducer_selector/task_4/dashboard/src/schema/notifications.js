import * as notificationItem from "../../notifications.json";
import { normalize, schema } from 'normalizr';

const user = new schema.Entity("users");
const message = new schema.Entity("messages", {}, { idAttribute: 'guid' });
const notification = new schema.Entity("notifications", {
  author: user,
  context: message
});

export const normalizedData = normalize(notificationItem.default, [notification]);

export function notificationsNormalizer(data) {
  return normalize(data, [notification]);
}

export default function getAllNotificationsByUser(userId) {
  const result = [];
  const notifications = normalizedData.entities.notifications;
  const messages = normalizedData.entities.messages;

  for (const id in notifications) {
    if (notifications[id].author === userId) {
      result.push(messages[notifications[id].context]);
    }
  }

  return result;
}
