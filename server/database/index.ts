import { Sequelize } from 'sequelize';
import LOGIN from './login.json';

const sequelize = new Sequelize(LOGIN.name, LOGIN.username, LOGIN.password, {
  host: LOGIN.host,
  dialect: 'mysql',
  define: {
    freezeTableName: true,
  },
});

export default sequelize;
