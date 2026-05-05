import React from 'react';
import { motion } from 'motion/react';
import { MousePointerClick, CookingPot, ShoppingBag } from 'lucide-react';

export default function StepsSection() {
  const steps = [
    {
      num: '01',
      icon: <MousePointerClick className="w-8 h-8 text-orange-500" />,
      title: 'Pre-Order Online',
      desc: 'Browse our menu, select your meals, and secure your spot ahead of time before we sell out.',
    },
    {
      num: '02',
      icon: <CookingPot className="w-8 h-8 text-rose-500" />,
      title: 'We Prepare',
      desc: 'Our chefs cook up your meal fresh on the day of the Trade Fair, sealing in the flavor.',
    },
    {
      num: '03',
      icon: <ShoppingBag className="w-8 h-8 text-emerald-500" />,
      title: 'Trade Fair Pick Up',
      desc: 'Swing by our booth at the Student Trade Fair at the scheduled time, grab your bag, and taste the magic.',
    }
  ];

  return (
    <section className="py-32 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '32px 32px' }} />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-display font-black text-gray-950 mb-6 tracking-tighter"
          >
            How It <span className="text-brand">Works</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 font-medium leading-relaxed"
          >
            Experience premium campus food in three simple steps.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10 relative">
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gradient-to-r from-white via-gray-300 to-white -z-10" />
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px border-t border-dashed border-gray-400/60 -z-10" />
          
          {steps.map((step, idx) => {
            return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.15, type: 'spring', stiffness: 100, damping: 20 }}
              className="relative bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 border border-gray-100 group flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center shadow-inner mb-8 relative z-10 group-hover:scale-110 group-hover:bg-brand/5 transition-all duration-500 border border-gray-100 ring-8 ring-white">
                <div className="transform group-hover:-rotate-6 group-hover:scale-110 transition-transform duration-500">
                  {step.icon}
                </div>
                <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gray-950 text-white text-sm font-black flex items-center justify-center shadow-lg border-2 border-white group-hover:bg-brand transition-colors">
                  {step.num}
                </div>
              </div>
              <h3 className="text-2xl font-black font-display text-gray-950 mb-4 tracking-tight group-hover:text-brand transition-colors">{step.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed text-[17px]">
                {step.desc}
              </p>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
}
