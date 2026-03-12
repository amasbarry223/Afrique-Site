"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  organization: string;
  index?: number;
}

export default function TestimonialCard({ quote, author, role, organization, index = 0 }: TestimonialCardProps) {
  const initials = author.split(" ").map((n) => n[0]).join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative bg-[#161b22] border border-[#30363d] rounded-xl p-6 lg:p-8"
    >
      {/* Quote Icon */}
      <Quote className="absolute top-6 right-6 text-[#C9A227]/20" size={40} />
      
      {/* Quote Text */}
      <blockquote className="text-white/90 text-base lg:text-lg leading-relaxed mb-6 relative z-10">
        &ldquo;{quote}&rdquo;
      </blockquote>
      
      {/* Author Info */}
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12 border-2 border-[#C9A227]/30">
          <AvatarFallback className="bg-[#1A7A8A] text-white font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="text-white font-semibold">{author}</div>
          <div className="text-white/60 text-sm">{role}</div>
          <div className="text-[#C9A227] text-sm font-medium">{organization}</div>
        </div>
      </div>
    </motion.div>
  );
}
