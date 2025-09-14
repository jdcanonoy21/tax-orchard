import React from "react";
import { motion } from "framer-motion";

const AboutSection = () => (
  <section className="py-16 bg-gray-50 text-center">
    <motion.h2
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-2xl font-semibold mb-6"
    >
      About Us
    </motion.h2>
    <p className="max-w-xl mx-auto text-base">
      We are a team passionate about building modern web experiences. This
      section tells a bit about us and our mission.
    </p>
  </section>
);

export default AboutSection;
