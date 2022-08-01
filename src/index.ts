import express from "express";
import errorHandler from "./middwares/error.handler.middware";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.route";


const app = express();

//Configuração da aplicação
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Configuração das rotas
app.use(usersRoute);
app.use(statusRoute);

//Configuração middwares de erro
app.use(errorHandler);

//Inicialização servidor
app.listen(3000, () => {
    console.log("Aplicação executando na porta 3000")
});