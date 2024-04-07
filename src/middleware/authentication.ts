const passport = require("passport");
import { NextFunction, Request, Response } from "express";
import UserType from "../enums/UserType";

export class Authentication {
  public static verifyToken(req: Request, res: Response, next: NextFunction) {
    // console.log("inside verifyToken")
    return passport.authenticate(
      "jwt",
      { session: false },
      (err: any, user: any, info: any) => {
        // console.log("inside passport.authenticate callback",user)
        if (err || !user) {
          // AppLogger.error(`Login Failed. reason: ${info}`);
          console.log(`Login Failed. reason: ${info}`);
          return res.sendError(info);
        }

        req.user = user;
        // console.log("req.user from auth.ts", req.user)
        req.body.user = user._id;

        //console.log(req.user);
        return next();
      }
    )(req, res, next);
  }

  //Admin user validation
  public static superAdminUserVerification(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const userData: any = req.user;
    if (userData.userType === UserType.WEB_MASTER) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "No authorization to access this route!",
      });
    }
  }

  //level01 user validation
  public static studentUserVerification(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const userData: any = req.user;
    if (
      userData.userType === UserType.STUDENT

    ) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "No authorization to access this route!",
      });
    }
  }
  //level02 user validation
  public static wardenUserVerification(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const userData: any = req.user;
    if (
      userData.userType === UserType.WARDEN
    ) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "No authorization to access this route!",
      });
    }
  }
  //level02 user validation
  public static landLordUserVerification(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const userData: any = req.user;
    if (
      userData.userType === UserType.LANDLORD
    ) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "No authorization to access this route!",
      });
    }
  }
}
