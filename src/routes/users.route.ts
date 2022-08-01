import {Request, Response, NextFunction, Router } from "express";
import userRepository from "../repositories/user.repository";


const usersRoute = Router();

//get para users
usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userRepository.findAllUsers();
        res.status(200).send(users);  
    } catch (error) {
        next(error);
    }
});

//get para users uuid
usersRoute.get('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid;
        const user = await userRepository.findById(uuid);
        res.status(200).send(user); 
    } catch (error) {
        next(error);
    }
});

//post para users
usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = req.body;
        const newId = await userRepository.addByUser(newUser);
        res.status(201).send(newId);
    } catch (error) {
        next(error);
    }
});

//put para users
usersRoute.put('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid;
        const modifiedUser = req.body;
        modifiedUser.uuid = uuid;
    
        await userRepository.updateById(modifiedUser);
    
        res.status(200).send();
    } catch (error) {
        next(error);
    }
});

//delete para users
usersRoute.delete('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid;
        await userRepository.removeUser(uuid);
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

export default usersRoute;