import { Express } from "express";
import { LandLordEp } from "../end-points/landlord-ep";
import multer from "multer";
import { Authentication } from "../middleware/authentication";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});


const upload = multer({ storage: storage });


export function initLandLordRoutes(app: Express) {
  /* PUBLIC ROUTES */
  app.post("/api/auth/create/landlord/post/:userId",Authentication.landLordUserVerification,upload.single('image'), LandLordEp.createPost);
  app.post(
    "/api/auth/update/property/:postId/:userId",
    Authentication.landLordUserVerification,
    upload.single('image'),
    LandLordEp.updatePublishedProperty
  );

  app.get(
    "/api/auth/view/properties/:userId",
    Authentication.landLordUserVerification,
    LandLordEp.viewPublishedProperties
  );
  app.get(
    "/api/auth/view/properties/student/requests/:userId",
    Authentication.landLordUserVerification,
    LandLordEp.viewPropertiesWithRequests
  );
  app.post(
    "/api/auth/delete/property/:postId/:userId",
    Authentication.landLordUserVerification,
    LandLordEp.deletePublishedProperty
  );

  app.post(
    "/api/auth/accept/student/request/:postId/:landlordId",
    Authentication.landLordUserVerification,
    LandLordEp.acceptStudentRequest
  );
  app.post(
    "/api/auth/reject/student/request/:postId/:landlordId",
    Authentication.landLordUserVerification,
    LandLordEp.rejectStudentRequest
  );
}
