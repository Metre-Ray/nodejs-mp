import { Model, DataTypes } from 'sequelize';
import { IUser } from './user.interface';
import { sequelizeInstance } from '../database/dbConnectionStart';

class UserModel extends Model<IUser> {
    login!: string;
}

UserModel.init({
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
    },
}, {
    sequelize: sequelizeInstance,
    modelName: 'users',
    timestamps: false,
});

export { UserModel };
