const { Pool }= require("pg");
const pool= new Pool({
    user: "postgres",
    host: "localhost",
    database: "ecovia",
    password: "Laasya@254386",
    port: 5432
});
module.exports =pool;