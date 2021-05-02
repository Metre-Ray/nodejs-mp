import { UserGroupType } from "../models/user-group.interface";
import { UserGroupModel, UsersToGroupMap } from "../models/user-group.model";
import { v4 as uuidv4 } from 'uuid';

export class UserGroupService {
    public static async getGroup(userFields: Partial<UserGroupType>): Promise<UserGroupModel | null> {
        const oldUser = await UserGroupModel.findOne({
            where: {
                ...userFields
            },
        });
        return oldUser;
    }

    public static async getGroups(userFields: Partial<UserGroupType>): Promise<UserGroupModel[] | null> {
        const oldUser = await UserGroupModel.findAll({
            where: {
                ...userFields
            },
        });
        return oldUser;
    }

    public static async createGroup(group): Promise<UserGroupModel | null> {
        const newGroup = { ...group, id: uuidv4() };
        const newGroupFromDB = await UserGroupModel.create(newGroup);
        return newGroupFromDB;
    }

    public static async updateGroup(id: string, groupFields: Partial<UserGroupType>): Promise<UserGroupModel | null> {
        const newGroup = await UserGroupModel.update(groupFields, {
            where: {
                id,
            },
            returning: true,
        });
        return newGroup[1][0];
    }

    public static async deleteGroup(id: string): Promise<UserGroupModel | null> {
        const group = await UserGroupModel.findOne({
            where: {
                id,
            },
        });
        group?.destroy();
        return group;
    }

    public static async getUsersToGroupMap(): Promise<any> {
        const map = await UsersToGroupMap.findAll();
        return map;
    }
}
