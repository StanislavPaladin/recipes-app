import { NotificationManager } from "react-notifications";

export const createNotification = (type, title, message, delay) => {
	switch (type) {
		case "error":
			NotificationManager.info(message, title, delay);
			break;
		case "success":
			NotificationManager.success(message, title, delay);
			break;
		case "warning":
			NotificationManager.warning(message, title, delay);
			break;
		default:
			return;
	}
};
