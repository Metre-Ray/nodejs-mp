import USERS_ from '../data/users.json';
import { UserModel } from '../models/user.model';
import { sequelizeInstance } from './dbConnectionStart';

const initDBData = async () => {
    await sequelizeInstance.sync();
    console.log("All models were synchronized successfully.");
    const user = await UserModel.findOne();
    if (!user) {
        UserModel.bulkCreate(USERS_).then(() => {
            console.log('DB data initialized');
        });
    }
}

export { initDBData };
