import { MongoClient, ObjectId } from 'mongodb';
import { Education } from '../components/cv-form/education';
import { Lang } from '../components/cv-form/lang';

export type CV = {
  picUrl: string;
  name: string;
  profileIntro: string;
  location: string;
  email: string;
  tel: string;
  linkedIn: string;
  gitHub: string;
  website: string;
  frontend: string[];
  backend: string[];
  tools: string[];
  general: string[];
  lang: Lang[];
  edu: Education[];
  exp: Education[];
};

export type User = {
  email: string;
  CVs?: CV[];
};

export const mongoClient: MongoClient = new MongoClient(
    `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@127.0.0.1:27017`
);

export const createUser = (user: User) =>
    mongoClient.db('cvDb').collection('users').insertOne(user);

export const findUser = (email: string) =>
    mongoClient
        .db('cvDb')
        .collection('users')
        .findOne<User>({ email });

// export const updateUser = (email: string, cv: CV) => {
//     mongoClient
//     .db('cvDb').collection('users').updateOne({email: email}, 
//         {$push:
//             {
//                 CVs: cv
//             }
//         })
// }