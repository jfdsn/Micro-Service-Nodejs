import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "pg";
import ForbiddenError from "../models/forbidden.model";

function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    if (error instanceof DatabaseError) {
        res.sendStatus(400);
    } else if (error instanceof ForbiddenError) {
        res.sendStatus(403);
    }else {
        res.sendStatus(500);
    }
}


export default errorHandler;