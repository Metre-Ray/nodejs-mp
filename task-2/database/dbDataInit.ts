import USERS_ from '../data/users.json';
import GROUPS_ from '../data/groups.json';
import { UserGroupModel } from '../models/user-group.model';
import { UserModel } from '../models/user.model';
import { sequelizeInstance } from './dbConnectionStart';

const initDBData = async () => {
    await sequelizeInstance.sync();
    console.log("All models were synchronized successfully.");
    const user = await UserModel.findOne();
    if (!user) {
        UserModel.bulkCreate(USERS_).then(() => {
            console.log('DB users data initialized');
        });
    }
    const group = await UserGroupModel.findOne();
    if (!group) {
        UserGroupModel.bulkCreate(GROUPS_).then(() => {
            console.log('Table with user groups initialized');
        });
    }
}

export { initDBData };
