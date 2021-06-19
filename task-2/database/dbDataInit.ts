import USERS_ from '../data/users.json';
import GROUPS_ from '../data/groups.json';
import { UserGroupModel } from '../models/user-group.model';
import { UserModel } from '../models/user.model';
import { sequelizeInstance } from './dbConnectionStart';

const initDBData = async () => {
    const isTest = process.env.DB_TEST;
    await sequelizeInstance.sync();
    console.log("All models were synchronized successfully.");

    const user = await UserModel.findOne();

    if (user && isTest) {
        await UserModel.sync({ force: true });
        await UserGroupModel.sync({ force: true });
        console.log('Tables cleaned');
    }

    if (!user || isTest) {
        UserModel.bulkCreate(USERS_).then(() => {
            console.log('DB users data initialized');
        });
    }

    const group = await UserGroupModel.findOne();
    if (!group || isTest) {
        UserGroupModel.bulkCreate(GROUPS_).then(() => {
            console.log('Table with user groups initialized');
        });
    }
}

export { initDBData };
