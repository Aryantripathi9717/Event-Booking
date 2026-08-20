import { Event } from "../models/Event.js"

export const getAllEvents = async (req,res)=>{
    try {

        const filters = {};

        if(req.query.category) {
            filters.category = req.query.category;
        }
        if(req.query.ticketPrice){
            filters.ticketPrice = req.query.ticketPrice;
        }

        const events = await Event.find();
        res.json(events)
    } catch (error) {
        return res.status(500).json({error : error.message});
    }
}

export const getEventById = async (req,res) => {
    try {
        const event = await Event.findById(req.params.id);

        if(!event){
            return res.status(404).json({error : "Event not found"});
        }
        return res.json(event);
    } catch (error) {
        return res.status(500).json({error : error.message});
    }
}


export const createEvent = async (req,res) => {
    const {title, description, date, location, category, totalSeats, ticketPrice, imageUrl} = req.body;

    try{
        const event = await Event.create({
            title,
            description, 
            date, 
            location, 
            category,
            totalSeats,
            ticketPrice, 
            imageUrl
        });

        return res.status(201).json(event);
    }catch(error){
        return res.status(500).json({error : error.message});
    }
}


export const updateEvent = async (req,res) => {
    const {title, description, date, location, category, totalSeats, ticketPrice, imageUrl} = req.body;

    try {
        const event = await Event.findByIdAndUpdate(req.params.id, {
            title,
            description,
            date,
            location,
            category,
            totalSeats,
            ticketPrice,
            imageUrl
        }, {new : true});

        if(!event){
            return res.status(404).json({error : "Event not found"})
        }
        res.json(event);

    } catch (error) {
        return res.status(500).json({error : error.message});
    }
}


export const deleteEvent = async (req,res) =>{
    try {
        const event = await Event.findByIdAndDelete(req.params.id);

        if(!event){
            return res.status(404).json({error : 'Event not found'});
        }
        return res.json({message : 'Event deleted successfully'});
        
    } catch (error) {
        return res.status(500).json({error : error.message});
    }
};