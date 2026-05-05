import React from 'react';
import { motion } from 'motion/react';
import { Heart, FastForward, Wallet, Sparkles, ArrowRight, ShieldCheck, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutSection() {
  const features = [
    {
      icon: <FastForward className="text-brand w-6 h-6" />,
      title: 'Ultimate Convenience',
      description: 'Grab your scheduled order between classes. No standing in long lines, no wasted time.',
      color: 'bg-brand/10',
      border: 'border-brand/20'
    },
    {
      icon: <Heart className="text-rose-500 w-6 h-6" />,
      title: 'Unmatched Taste',
      description: 'Prepared fresh daily by expert chefs using the finest ingredients. Every bite is a vibe.',
      color: 'bg-rose-50',
      border: 'border-rose-100'
    },
    {
      icon: <Wallet className="text-emerald-500 w-6 h-6" />,
      title: 'Student Budget',
      description: 'Premium quality food that respects your pocket. We price with students in mind always.',
      color: 'bg-emerald-50',
      border: 'border-emerald-100'
    },
    {
      icon: <ShieldCheck className="text-blue-500 w-6 h-6" />,
      title: 'Safe & Hygienic',
      description: 'Prepared in a commercial-grade, health-certified kitchen. Cleanliness is our top priority.',
      color: 'bg-blue-50',
      border: 'border-blue-100'
    },
    {
      icon: <Star className="text-amber-500 w-6 h-6" />,
      title: 'Exclusive Menus',
      description: 'Experience limited-edition meals specifically crafted for campus trade fairs and special events.',
      color: 'bg-amber-50',
      border: 'border-amber-100'
    },
    {
      icon: <Users className="text-purple-500 w-6 h-6" />,
      title: 'Community First',
      description: 'Built by students, for students. We understand the campus culture and deliver what you love.',
      color: 'bg-purple-50',
      border: 'border-purple-100'
    }
  ];

  return (
    <section id="about" className="py-32 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-[500px] bg-gradient-to-br from-brand/5 to-transparent rounded-bl-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-yellow-100/40 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/5 border border-brand/10 text-brand-dark font-bold text-sm mb-6"
          >
            <Sparkles size={16} className="text-brand" />
            <span>Campus Food Revolution</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-display font-black text-gray-950 mb-6 leading-[1.1] tracking-tighter"
          >
            Why Choose <span className="text-brand inline-block">Item 7?</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-500 leading-relaxed font-medium"
          >
            Item 7 is not just food; it's a campus movement. We bring restaurant-quality 
            meals directly to your school, making sure you stay fueled for your studies without breaking the bank.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-24">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5, type: 'spring', damping: 20, stiffness: 100 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 transition-all group"
            >
              <div className={`w-14 h-14 ${feature.color} border ${feature.border} rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                {feature.icon}
              </div>
              
              <h3 className="text-2xl font-black text-gray-950 mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Big CTA Area */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="bg-gray-950 rounded-[3rem] min-h-[500px] p-10 md:p-20 relative overflow-hidden flex flex-col items-center justify-center text-center gap-10 shadow-2xl mx-auto mt-16"
        >
          {/* Background pattern inside CTA */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/20 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="absolute -left-20 top-10 w-64 h-64 opacity-20 blur-sm mix-blend-screen pointer-events-none hidden md:block">
            <img src="/images/chicken-shawarma.png" alt="" className="w-full h-full object-contain -rotate-12"/>
          </div>
          <div className="absolute -right-20 bottom-10 w-72 h-72 opacity-20 blur-sm mix-blend-screen pointer-events-none hidden md:block">
             <img src="/images/rice-chicken.png" alt="" className="w-full h-full object-contain rotate-12"/>
          </div>

          <div className="relative z-10 max-w-3xl">
            <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-6 tracking-tighter leading-[1.1]">
              Skip the line.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-rose-400">Secure your spot.</span>
            </h2>
            <p className="text-gray-300 text-xl font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
              Don't leave your cravings to chance. Pre-order now and guarantee your meal for the biggest popup on campus.
            </p>
            
            <Link 
              to="/shop" 
              className="inline-flex bg-brand hover:bg-white text-gray-950 px-10 py-5 rounded-full font-black text-xl transition-all hover:scale-105 active:scale-95 items-center justify-center gap-3 shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] w-full sm:w-auto"
            >
              Order Now <ArrowRight size={24} className="text-gray-950" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
