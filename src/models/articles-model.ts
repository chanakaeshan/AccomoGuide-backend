import * as mongoose from "mongoose";

interface Common {
  title: string;
  content: string;


  userId: mongoose.Types.ObjectId;


}

export interface DArticles extends Common {}
export interface IArticles extends Common, mongoose.Document {}
