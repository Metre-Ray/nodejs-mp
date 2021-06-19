import { Sequelize } from 'sequelize';

const sequelizeInstance = new Sequelize(process.env.DB_NAME as string, process.env.DB_USERNAME as string, process.env.DB_PASSWORD, {
    host: 'localhost',
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    logging: false,
});

export { sequelizeInstance };
