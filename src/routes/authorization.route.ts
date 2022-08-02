import { Router, Response, Request, NextFunction } from "express";
import ForbiddenError from "../models/forbidden.model";
import userRepository from "../repositories/user.repository";
import JWT from "jsonwebtoken";
import { sign } from "crypto";
import basicAuthentication from "../middwares/basic.authentication.middleware";

const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthentication, async (req: Request, res: Response, next: NextFunction) => {

    try {
        
        const user = req.user;
        
        //Criação do token usando biblioteca JsonWebToken
        const jwt = JWT.sign({username: user?.username}, 'my_secret_key', {subject: user?.uuid});

        res.status(200).json({token: jwt});
        
    } catch (error) {
        next(error);
    }

})


export default authorizationRoute;