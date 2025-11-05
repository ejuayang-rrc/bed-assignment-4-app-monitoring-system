import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";

export const createLoan = async (req: Request, res: Response) => {
    res.status(HTTP_STATUS.CREATED).send(
        successResponse({}, `Loan created`)
    );
};

export const reviewLoan = async (
    req: Request, 
    res: Response
) => {
    const { id } = req.params;
    res.status(HTTP_STATUS.OK).send(
        successResponse({}, `reviewed Loan ${id}`)
    );
};

export const getLoan = async (
    req: Request, 
    res: Response
) => {
    res.status(HTTP_STATUS.OK).send(
        successResponse({}, `Loan got!`)
    );
};

export const approveLoan = async (
    req: Request, 
    res: Response
) => {
    const { id } = req.params;
    res.status(HTTP_STATUS.OK).send(
        successResponse({}, `approved Loan ${id}`)
    );
};
