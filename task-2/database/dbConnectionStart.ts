import { Sequelize } from 'sequelize';

const sequelizeInstance = new Sequelize('postgres', 'postgres', '123', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false,
});

export { sequelizeInstance };
