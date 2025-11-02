import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export const createLoan = async (req: Request, res: Response) => {
    res.status(HTTP_STATUS.CREATED).send(`Loan created`);
};

export const reviewLoan = async (
    req: Request, 
    res: Response
) => {
    const { id } = req.params;
    res.status(HTTP_STATUS.OK).send(`reviewed Loan ${id}`);
};

export const getLoan = async (
    req: Request, 
    res: Response
) => {
    res.status(HTTP_STATUS.OK).send(`Loan got!`);
};

export const approveLoan = async (
    req: Request, 
    res: Response
) => {
    const { id } = req.params;
    res.status(HTTP_STATUS.OK).send(`approved Loan ${id}`);
};
