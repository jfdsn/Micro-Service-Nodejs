import {Request, Response, NextFunction, Router } from "express";
import userRepository from "../repositories/user.repository";


const usersRoute = Router();

//get para users
usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();
    res.status(200).send(users);
});

//get para users uuid
usersRoute.get('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const user = await userRepository.findById(uuid);
    res.status(200).send(user); 
});

//post para users
usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    const newId = await userRepository.addByUser(newUser);
    res.status(201).send(newId);
});

//put para users
usersRoute.put('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedUser = req.body;
    modifiedUser.uuid = uuid;

    await userRepository.updateById(modifiedUser);

    res.status(200).send();
});

//delete para users
usersRoute.delete('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    await userRepository.removeUser(uuid);
    res.sendStatus(200);
});

export default usersRoute;