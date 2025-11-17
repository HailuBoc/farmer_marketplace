let testimonials = [
  {
    id: 1,
    name: "Sara Kebede",
    quote:
      "The produce is always so fresh, and I love supporting local farmers!",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 2,
    name: "Mekonnen Tesfaye",
    quote:
      "Finally a platform that connects us directly to customers — no middlemen!",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
  },
];

export const getAllTestimonials = () => testimonials;

export const addTestimonial = (testimonial) => {
  const newTestimonial = { id: testimonials.length + 1, ...testimonial };
  testimonials.push(newTestimonial);
  return newTestimonial;
};
