import { MongoClient } from 'mongodb';
import { CvFormValues } from '../shared-types';

export type User = {
  email: string;
  cv?: CvFormValues;
};

export const mongoClient: MongoClient = new MongoClient(
  `${process.env.MONGO_INITDB_URL}`
);

export const createUser = (user: User) =>
  mongoClient.db('cvDb').collection('users').insertOne(user);

export const findUser = (email: string) =>
  mongoClient.db('cvDb').collection('users').findOne<User>({ email });

export const updateCvForm = (email: string, cv: CvFormValues) =>
  mongoClient
    .db('cvDb')
    .collection('users')
    .updateOne({ email }, { $set: { cv } });

export const saveTemplateToCv = (email: string, cvTemplate: string) =>
  mongoClient
    .db('cvDb')
    .collection('users')
    .updateOne({ email }, { $set: { cvTemplate: { cvTemplate } } });

// export const updateUser = (email: string, cv: CV) => {
//     mongoClient
//     .db('cvDb').collection('users').updateOne({email: email},
//         {$push:
//             {
//                 CVs: cv
//             }
//         })
// }
