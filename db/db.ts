import { MongoClient } from 'mongodb';
import { JobData } from '../components/job-search/job';
import { CvFormValues } from '../shared-types';

export type User = {
  email: string;
  cv?: CvFormValues;
  CVs: [];
};

export const mongoClient: MongoClient = new MongoClient(
  `${process.env.MONGO_INITDB_URL}`,
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

export const saveTemplateToCv = (email: string, cv: CvFormValues) =>
  mongoClient
    .db('cvDb')
    .collection('users')
    .updateOne({ email }, { $set: { cv } });

export const updateUser = (email: string, cv: CvFormValues) => {
  mongoClient
    .db('cvDb')
    .collection('users')
    .updateOne(
      { email: email },
      {
        $push: {
          CVs: cv,
        },
      },
    );
};
export const addFavJob = (email: string, job: JobData) =>
  mongoClient
    .db('cvDb')
    .collection('users')
    .updateOne({ email }, { $push: { favJobs: job } });

export const delFavJob = (email: string, job_id: string) =>
  mongoClient
    .db('cvDb')
    .collection('users')
    .updateOne(
      { email },
      {
        $pull: {
          favJobs: { job_id: job_id },
        },
      },
    );
