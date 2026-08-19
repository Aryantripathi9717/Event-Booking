import express from "express"
import { Router } from "express"
import { createEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from "../controllers/eventController.js"
import { admin, protect } from "../middlewares/auth.middlewares.js";

const eventRouter = express.Router()


eventRouter.get('/', getAllEvents);

eventRouter.get('/:id', getEventById);

//Admin only
eventRouter.post('/', protect, admin, createEvent);

// Admin only
eventRouter.put('/:id', protect,admin, updateEvent);

// Admin only
eventRouter.delete('/:id', protect,admin, deleteEvent);

export default eventRouter;