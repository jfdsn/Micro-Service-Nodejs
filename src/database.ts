import { Pool } from "pg";

//Arquivo de conexão com o banco de dados.

const connectionString = 'postgres://wekkayqm:hEL_jbtYQ6IRrS6NfYJE71gZ_XBC3K2Y@kesavan.db.elephantsql.com/wekkayqm';

const database = new Pool({connectionString});

export default database;