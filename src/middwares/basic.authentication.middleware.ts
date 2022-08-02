import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/forbidden.model";
import userRepository from "../repositories/user.repository";


async function basicAuthentication(req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers['authorization'];
    
        if (!authorizationHeader) {
            throw new ForbiddenError('Credenciais não informadas');
        } 
        
        const [authenticationType, token] = authorizationHeader.split(" ");

        if(authenticationType !== 'Basic' || !token) {
            throw new ForbiddenError('Tipo de autenticação errado')
        }

        const tokenContent = Buffer.from(token, 'base64').toString("utf-8");

        const [username, password] = tokenContent.split(':');

        if(!username || !password) {
            throw new ForbiddenError('Credenciais não preenchidas');
        }

        const user = await userRepository.FindByUsernameAndPassword(username, password);
      
        if(!user) {
            throw new ForbiddenError('Usuário ou senha invalidos');
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

export default basicAuthentication;