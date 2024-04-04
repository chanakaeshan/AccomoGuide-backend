import { Express } from "express";
import { StudentEp } from "../end-points/student-ep";
import { Authentication } from "../middleware/authentication";

export function initStudentRoutes(app: Express) {
  /* PUBLIC ROUTES */
  app.get("/api/auth/view/properties",Authentication.studentUserVerification, StudentEp.getApprovedPropertyPosts);
  app.post("/api/auth/send/property/request/:studentId/:propertyId",Authentication.studentUserVerification, StudentEp.sendPropertyRequest);
}
