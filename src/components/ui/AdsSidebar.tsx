"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const ADS_DATA = [
  {
    title: "Quizken AI",
    desc: "Tạo bài kiểm tra thông minh với AI",
    link: "https://quizken.vercel.app",
    img: "/ads-quizken.png",
    type: "Sponsor",
    color: "bg-mecha-accent",
    borderColor: "hover:border-mecha-accent/40"
  },
  {
    title: "Connect CG",
    desc: "Mạng xã hội kết nối cơ hội mới",
    link: "https://connect-cg.vercel.app",
    img: "/ads-connect.png",
    type: "Partner",
    color: "bg-emerald-500",
    borderColor: "hover:border-emerald-500/40"
  }
];


export function AdsSidebar() {
  return (
    <div className="flex flex-col gap-4 mt-6 lg:mt-0">
      <div className="flex items-center gap-2 mb-1 px-1">
        <span className="w-1 h-3 bg-mecha-accent rounded-full" />
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Tài trợ & Đối tác</h3>
      </div>
          { ADS_DATA.map((ad, index) => (
            <motion.div
              key={ad.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                href={ad.link} 
                target="_blank" 
                className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/10 group shadow-xl transition-all duration-500 hover:border-mecha-accent/40 block"
              >
                <Image 
                  src={ad.img} 
                  alt={ad.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute bottom-3 left-4 z-10 flex flex-col items-start">
                  <span className="bg-mecha-accent text-mecha-dark text-[8px] font-black px-1.5 py-0.5 rounded tracking-tighter uppercase mb-1 inline-block">Sponsor</span>
                  <p className="text-white font-bold text-sm drop-shadow-lg flex items-center gap-1">
                              { ad.desc} <ExternalLink className="w-3 h-3" />
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
      


    </div>
  );
}
