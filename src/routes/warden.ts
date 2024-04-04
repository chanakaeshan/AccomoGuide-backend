import { Express } from "express";
import { WardenEp } from "../end-points/warden-ep";
import { Authentication } from "../middleware/authentication";

export function initWardenRoutes(app: Express) {
  /* PUBLIC ROUTES */
  app.get("/api/auth/view-all/properties",Authentication.wardenUserVerification, WardenEp.viewPropertiesToApprove);
  app.post(
    "/api/auth/approve/property/:postId/:wardenId",
    Authentication.wardenUserVerification,
    WardenEp.approveProperty
  );
  app.post(
    "/api/auth/reject/property/:postId/:wardenId",
    Authentication.wardenUserVerification,
    WardenEp.rejectProperty
  );
}
