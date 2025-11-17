import {
  getAllTestimonials,
  addTestimonial,
} from "../models/TestimonialModel.js";

export const fetchTestimonials = (req, res) => {
  const testimonials = getAllTestimonials();
  res.json(testimonials);
};

export const createTestimonial = (req, res) => {
  const newTestimonial = addTestimonial(req.body);
  res.status(201).json(newTestimonial);
};
