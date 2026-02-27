"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const ADS_DATA = [
  {
    title: "Quizken AI",
    desc: "Tạo bài kiểm tra thông minh với AI.",
    link: "https://quizken.vercel.app",
    img: "/ads-quizken.png",
    type: "Sponsor",
    color: "bg-mecha-accent",
    borderColor: "hover:border-mecha-accent/40"
  },
  {
    title: "Connect CG",
    desc: "Mạng xã hội kết nối cơ hội mới.",
    link: "https://connect-cg.vercel.app",
    img: "/ads-connect.png",
    type: "Partner",
    color: "bg-emerald-500",
    borderColor: "hover:border-emerald-500/40"
  }
];

export function AdsSidebar() {
  return (
    <div className="flex flex-col gap-3 mt-4">
      <div className="flex items-center gap-2 mb-1 px-1">
        <span className="w-1 h-3 bg-mecha-accent rounded-full" />
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Tài trợ & Đối tác</h3>
      </div>
      
      {ADS_DATA.map((ad, index) => (
        <motion.div
          key={ad.link}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Link 
            href={ad.link} 
            target="_blank" 
            className={`flex items-center gap-3 p-2 bg-mecha-surface border border-white/5 rounded-lg transition-all duration-300 ${ad.borderColor} group relative overflow-hidden`}
          >
            <div className="relative w-16 h-12 shrink-0 rounded overflow-hidden border border-white/10">
              <Image 
                src={`${ad.img}?v=3`} 
                alt={ad.title} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                unoptimized
              />
            </div>
            
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`${ad.color} text-mecha-dark text-[7px] font-black px-1 rounded uppercase tracking-tighter`}>
                  {ad.type}
                </span>
                <h4 className="text-mecha-light font-bold text-[13px] truncate group-hover:text-mecha-accent transition-colors">
                  {ad.title}
                </h4>
              </div>
              <p className="text-gray-500 text-[10px] line-clamp-1 leading-tight">{ad.desc}</p>
            </div>

            <ExternalLink className="w-3 h-3 text-gray-700 group-hover:text-mecha-accent transition-colors shrink-0 mr-1" />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
