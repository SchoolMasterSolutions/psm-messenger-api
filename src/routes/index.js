import {userRoutes} from "./userRoutes";
import {schoolRoutes} from "./schoolRoutes";
import {articleRoutes} from "./articleRoutes";
import {eventRoutes} from "./eventRoutes";
import {notificationRoutes} from "./notificationRoutes";
import {resultsRoutes} from "./resultsRoutes";
import {studentRoutes} from "./studentRoutes";
import {notificationRoutes} from "./notificationRoutes";

export const router = (app) => {
  userRoutes(app)
  schoolRoutes(app)
  articleRoutes(app)
  eventRoutes(app)
  notificationRoutes(app)
  resultsRoutes(app)
  studentRoutes(app)
}