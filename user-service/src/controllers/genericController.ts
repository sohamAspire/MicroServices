import { Request, Response } from "express";
import mongoose from "mongoose";

const genericController = (Model: mongoose.Model<any>) => ({
    create: async (req : Request, res : Response) => {
        try {
            const data = await Model.create(req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    findAll: async (_req : Request, res : Response) => {
        try {
            const data = await Model.find();
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    findOne: async (req : Request, res : Response) => {
        try {
            const data = await Model.findById(req.params.id);
            if (!data) return res.status(404).json({ message: 'Not Found' });
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    update: async (req : Request, res : Response) => {
        try {
            const data = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!data) return res.status(404).json({ message: 'Not Found' });
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    delete: async (req : Request, res : Response) => {
        try {
            const data = await Model.findByIdAndDelete(req.params.id);
            if (!data) return res.status(404).json({ message: 'Not Found' });
            res.status(200).json({ message: 'Deleted successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
});


export default genericController