import {Sequelize} from "sequelize";

export default new Sequelize({
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    database: "transit",
    username: "api_tranzit",
    password: "M*N1u(n*jEZp5!XW",
    logging: false
});