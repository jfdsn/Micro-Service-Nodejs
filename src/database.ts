import { Pool } from "pg";

//Arquivo de conexão com o banco de dados.

const connectionString = '';

const database = new Pool({connectionString});

export default database;
