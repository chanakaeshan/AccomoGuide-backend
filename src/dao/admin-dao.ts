import { Types } from "mongoose";
import { ApplicationError } from "../common/application-error";
import { DUser, IUser } from "../models/user-model";
import User from "../schemas/user-schema";
import UserType from "../enums/UserType";
import Articles from "../schemas/article-schema";

export namespace AdminDao {
  export async function registerAnUser(data: DUser): Promise<IUser> {
    const saveUser = new User(data);
    let userSaved = await saveUser.save();
    return userSaved;
  }

  export async function doesUserIdExists(userId: Types.ObjectId) {
    const userFound = await User.findById(userId);
    return userFound;
  }

  export async function blockOrUnBlockUser(
    userId: Types.ObjectId,
    status: string
  ): Promise<IUser> {
    let updateUser: IUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          userStatus: status,
        },
      },
      { new: true }
    );

    return updateUser;
  }
  export async function verifyUser(
    userId: Types.ObjectId,
    status: string,
    isVerified: boolean,
    verificationToken: string
  ): Promise<IUser> {
    let updateUser: IUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          userStatus: status,
          isVerified: isVerified,
          verificationToken: verificationToken,
        },
      },
      { new: true }
    );

    return updateUser;
  }
  export async function updatePayLink(
    userId: Types.ObjectId,
    link: string
  ): Promise<IUser> {
    let updateUser: IUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          paymentLink: link,
        },
      },
      { new: true }
    );

    return updateUser;
  }

  export async function getUsers(limit: number, offset: number) {
    const userFound = await User.find({
      userType: { $ne: UserType.SUPER_ADMIN },
    })
      .skip(limit * (offset - 1))
      .limit(limit);
    return userFound;
  }
  export async function getArticles() {
    try {
      const allArticles = await Articles.find();
      return allArticles;
    } catch (error) {
      // Handle any errors that occur during the database operation
      throw error;
    }
  }
  
  
  export async function getUsersAll() {
    const userFound = await User.find({
      userType: { $ne: UserType.SUPER_ADMIN },
    });
    return userFound;
  }

  export async function createArticle(articleData:any){
    //create article and save it to the database

    console.log("article data from dao",articleData)
    const newArticle=new Articles(articleData);
    newArticle.save();
    return newArticle;
  }
}
