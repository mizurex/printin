import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Kim Jack-Riley",
    title: "Excellent print service",
    content: "Fast, great quality, easy pick up and fair price. This is saving me a mint...",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b589?w=150&h=150&fit=crop&crop=face",
    date: "May 14, 2024",
    rating: 5
  },
  {
    id: 2,
    name: "John",
    title: "Uploaded files on Saturday evening &...",
    content: "Uploaded files on Saturday evening & collected Sunday mid-morning...",
    avatar: null,
    date: "April 22, 2024",
    rating: 5,
    initials: "J"
  },
  {
    id: 3,
    name: "AS",
    title: "Outstanding customer support",
    content: "Very fast delivery and outstanding customer support when I had an...",
    avatar: null,
    date: "April 11, 2024",
    rating: 5,
    initials: "AS"
  },
  {
    id: 4,
    name: "Yaashiniy Ganesh",
    title: "I was assisted by Marina",
    content: "I was assisted by Marina. She was so helpful and friendly. She...",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    date: "March 29, 2024",
    rating: 5
  },
  {
    id: 5,
    name: "Conner",
    title: "Excellent service with fast shipping...",
    content: "Excellent service with fast shipping and great support team :)",
    avatar: null,
    date: "March 25, 2024",
    rating: 5,
    initials: "C"
  }
];

const Testimonials = () => {
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div className="py-16 overflow-hidden ">
      <div className="relative">
        <motion.div
          className="flex"
          animate={{
            x: [0, -100 * testimonials.length]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.id}-${Math.floor(index / testimonials.length)}`}
              className="flex-shrink-0 w-80 mx-4"
              whileHover={{ scale: 1.03, y: -8 }}
            >
              <div className="bg-white p-8 shadow-lg border border-gray-100 h-full">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-green-400 text-green-400" />
                  ))}
                </div>

                <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                  {testimonial.title}
                </h3>

                <div className="text-gray-600 mb-8">
                  <p>{testimonial.content}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {testimonial.avatar ? (
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                        {testimonial.initials}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.date}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;