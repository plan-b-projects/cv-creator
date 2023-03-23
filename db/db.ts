import { MongoClient, ObjectId } from 'mongodb';

export type User = {
    email: string,
}

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