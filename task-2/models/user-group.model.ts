import { Model, DataTypes } from 'sequelize';
import { UserGroupType } from './user-group.interface';
import { sequelizeInstance } from '../database/dbConnectionStart';
import { UserModel } from './user.model';

class UserGroupModel extends Model<UserGroupType> {
    addUserModels?: Function;
};

UserGroupModel.init({
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
}, {
    sequelize: sequelizeInstance,
    modelName: 'groups',
    timestamps: false,
});

const UsersToGroupMap = sequelizeInstance.define('users_to_group_map', {}, { timestamps: false });
UserModel.belongsToMany(UserGroupModel, { through: UsersToGroupMap });
UserGroupModel.belongsToMany(UserModel, { through: UsersToGroupMap });

export { UserGroupModel , UsersToGroupMap };
