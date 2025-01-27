import { Request, Response } from "express";
import { createProductWithUser } from "../services/product.service";

export const createProductWithNonRegisteredUser = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const product = await createProductWithUser(body);
        res.status(200).json({ product })
    } catch (error) {
        res.status(500).json({ error })
    }
}