import {Request, Response, NextFunction, Router } from "express";
import userRepository from "../repositories/user.repository";


const usersRoute = Router();

//get para users
usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();
    res.status(200).send(users);
});

//get para users uuid
usersRoute.get('/users/:uuid', (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    res.status(200).send({uuid}); 
});

//post para users
usersRoute.post('/users', (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    res.status(201).send(newUser);
});

//put para users
usersRoute.put('/users/:uuid', (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedUser = req.body;

    modifiedUser.uuid = uuid;
    res.status(200).send({modifiedUser});
});

//delete para users
usersRoute.delete('/users/:uuid', (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    res.sendStatus(200);
});

export default usersRoute;