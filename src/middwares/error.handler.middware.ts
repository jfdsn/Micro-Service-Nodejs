import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "pg";

function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    if (error instanceof DatabaseError) {
        res.sendStatus(400);
    }else {
        res.sendStatus(500);
    }
}


export default errorHandler;