import { IUser } from "../models/user.interface";
import { UserModel } from "../models/user.model";
import { v4 as uuidv4 } from 'uuid';
import { Op } from "sequelize";
import { UserGroupModel } from "../models/user-group.model";
import { IUsersToGroupMap } from "../models/user-group.interface";

export class UserService {
    public static async getUser(userFields: Partial<IUser>): Promise<UserModel | null> {
        const oldUser = await UserModel.findOne({
            where: {
                ...userFields
            },
        });
        return oldUser;
    }

    public static async createUser(user): Promise<UserModel | null> {
        const newUser = { ...user, id: uuidv4(), isDeleted: false };
        const newUserFromDB = await UserModel.create(newUser);
        return newUserFromDB;
    }

    public static async updateUser(id: string, userFields: Partial<IUser>): Promise<UserModel | null> {
        const newUser = await UserModel.update(userFields, {
            where: {
                id,
            },
            returning: true,
        });
        return newUser[1][0];
    }

    public static async getUsersWithLogin(loginSubstring: string, limit: number): Promise<UserModel[]> {
        const users = await UserModel.findAll({
            limit,
            order: [
                ['login', 'ASC'],
            ],
            where: {
                login: {
                    [Op.substring]: loginSubstring,
                },
            },
        });
        return users;
    }

    public static async addUsersToGroup(groupId: string, userIds: string[]): Promise<IUsersToGroupMap | null> {
        const group: any = await UserGroupModel.findByPk(groupId);
        let users;
        if (!group) {
            return null;
        }
        try {
            users = await group?.addUsers(userIds);
        } catch {
            return null;
        }
        return users;
    }
}
