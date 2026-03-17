import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Briefcase, 
  Award, 
  Code, 
  Mail, 
  Linkedin, 
  Instagram,
  ChevronDown, 
  Building2, 
  BarChart3, 
  PieChart, 
  ShieldCheck, 
  Globe,
  ArrowRight,
  Menu,
  X,
  ArrowUp,
  Monitor,
  Bot
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'py-4 bg-black/80 backdrop-blur-lg border-b border-white/5' : 'py-8 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="group relative">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-serif italic text-2xl tracking-tighter text-emerald-500 block"
            >
              AV.
            </motion.span>
            <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-emerald-500 transition-all duration-300 group-hover:w-full" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.3em] font-semibold text-white/50">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="hover:text-emerald-400 transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-emerald-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-black flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-serif italic text-white hover:text-emerald-400 transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020202] perspective-container">
      
      {/* Ambient Lighting & Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Ambient Lighting */}
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-emerald-500/15 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-blue-500/10 rounded-full blur-[150px] mix-blend-screen" />
        
        {/* Noise & Vignette */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#050505]" />
      </div>

      <motion.div style={{ y, opacity }} className="z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative inline-block"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-white/50 mb-6"
          >
            12th June | Gemini | 2002
          </motion.div>
          <motion.h1 
            className="text-5xl sm:text-7xl md:text-9xl font-serif italic mb-8 tracking-tighter leading-none drop-shadow-2xl flex flex-wrap justify-center gap-x-4 sm:gap-x-8 gap-y-2 overflow-hidden text-emerald-500"
          >
            {"AARSH VERMA".split(" ").map((word, wordIndex) => (
              <span key={wordIndex} className="flex gap-[0.1em]">
                {word.split("").map((char, index) => {
                  const globalIndex = wordIndex * 10 + index;
                  return (
                    <motion.span
                      key={globalIndex}
                      initial={{ opacity: 0, y: 100, rotateX: -90, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                      transition={{ 
                        duration: 1, 
                        delay: 0.4 + globalIndex * 0.08, 
                        type: "spring", 
                        bounce: 0.4 
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </motion.h1>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-8"
        >
          <p 
            className="max-w-xl text-white/80 text-base md:text-xl leading-relaxed px-4 drop-shadow-md"
            style={{ fontFamily: 'Rockwell, "Courier Bold", Courier, Georgia, Times, "Times New Roman", serif' }}
          >
            Loyalty is a two-way street. If I am asking it from you, then you're getting it from me
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 mt-4">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact" 
              className="px-8 py-4 bg-emerald-500 text-white rounded-full font-semibold tracking-wide hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
            >
              Get in Touch
            </motion.a>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-8"
          >
            <ChevronDown className="text-white/40" size={32} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const Summary = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="scroll-section bg-white text-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div ref={ref} className="max-w-5xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          className="text-[10px] font-mono uppercase tracking-[0.5em] mb-16 text-black/30 font-bold"
        >
          Personal Summary
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-2xl sm:text-4xl md:text-5xl font-serif leading-[1.2] tracking-tight text-center border-2 md:border-4 border-black p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl bg-white"
        >
          Master of Business Administration (MBA) in Finance with a strong focus on <span className="italic text-emerald-600 underline decoration-emerald-600/20 underline-offset-8">Website Development</span>, 
          AI Automation, and Agentic AI systems. Combines expertise in Investment Banking, Financial Modelling, Valuation, and Capital Markets 
          with a data-driven approach to transform complex insights into <span className="italic text-black/60">strategic decisions</span> and build scalable, high-impact digital solutions.
        </motion.p>
      </div>
    </section>
  );
};

const InternshipCard = ({ internship, index }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-10% 0px -10% 0px" });
  const [imgError, setImgError] = React.useState(false);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.1, y: 50 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col mb-32 last:mb-0"
    >
      <div className="w-full">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-emerald-500 font-mono text-xs font-bold">0{index + 1}</span>
          <div className="h-[1px] w-12 bg-emerald-500/30" />
          <span className="text-white/30 uppercase tracking-[0.3em] text-[10px] font-bold">{internship.location}</span>
        </div>
        <h3 className="text-4xl md:text-6xl font-serif italic mb-4 leading-tight">{internship.company}</h3>
        <p className="text-lg md:text-xl text-emerald-400/80 mb-8 font-mono tracking-tight">{internship.role}</p>
        <ul className="space-y-5 mb-10">
          {internship.points.map((point: string, i: number) => (
            <motion.li 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + (i * 0.1) }}
              className="flex gap-4 text-white/50 leading-relaxed text-sm md:text-base font-light"
            >
              <ArrowRight size={16} className="mt-1 flex-shrink-0 text-emerald-500/40" />
              {point}
            </motion.li>
          ))}
        </ul>
        {internship.project && (
          <div className="p-6 glass-card inline-block w-full md:w-auto">
            <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.2em] mb-2 font-bold">Key Project</p>
            <p className="text-sm text-white/80 italic font-serif">{internship.project}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const internships = [
    {
      company: "Larsen & Toubro Ltd.",
      location: "Mumbai, India",
      role: "Project Accountant & Planning",
      image: "/lt-logo.png",
      photo: "/photo1.jpg",
      project: "L&T const. MMRDC site, Mumbai Metro Track Project",
      points: [
        "Processed and validated daily site transactions, vendor invoices, and wage statements using EIP, ensuring complete accuracy and compliance.",
        "Coordinated with project engineers and store officers to cross-check billing quantities and prevent duplicate or inaccurate payments.",
        "Processed and maintained GST and TDS compliance documentation for 150+ vendor invoices monthly, achieving 100% adherence."
      ]
    },
    {
      company: "AZUL Research Advisory",
      location: "Chennai, India",
      role: "Financial Research Intern",
      image: "https://www.google.com/s2/favicons?domain=azulresearch.com&sz=128",
      photo: "/photo2.jpg",
      project: "Feasibility Study on Social Recreational Clubs, Chennai",
      points: [
        "Assisted in financial feasibility studies and market research for new investment projects.",
        "Conducted data analysis, financial modelling, and industry benchmarking.",
        "Supported client reporting with insights on budgeting, forecasting, and risk assessment.",
        "Gained hands-on experience in financial strategy, business valuation, and advisory services."
      ]
    },
    {
      company: "TATA Capital Ltd.",
      location: "Thane, India",
      role: "Finance Intern",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/256px-Tata_logo.svg.png",
      photo: "/photo3.jpg",
      project: "Cleantech Finance Department, Thane",
      points: [
        "Supported the finance team in credit appraisal, financial analysis, and project evaluation for clean energy and infrastructure projects.",
        "Assisted in the assessment of financial models, conducted industry research, and contributed to due diligence processes.",
        "Generated qualified lead list exceeding target by 20%, supporting green financing initiatives."
      ]
    },
    {
      company: "Kotak Education Foundation",
      location: "Govandi, Mumbai",
      role: "Training & Development Intern",
      image: "https://www.google.com/s2/favicons?domain=kotakeducation.org&sz=128",
      photo: "/photo4.jpg",
      project: "UNNATI programme's Training and Development department",
      points: [
        "Created and digitised content for training materials and wrote scripts for various training modules.",
        "Coordinated tasks by delegating responsibilities to fellow workers.",
        "Interned as part of the UNNATI programme's Training and Development department."
      ]
    },
    {
      company: "Larsen & Toubro Ltd.",
      location: "Mughalsarai, UP",
      role: "Project Planning Executive",
      image: "/lt-logo.png",
      photo: "/photo5.jpg",
      project: "DFCCIL project in Mughalsarai, Uttar Pradesh",
      points: [
        "Managed budgeting and forecasting for project finances.",
        "Handled revenue recognition, billing, procurement, and payments.",
        "Oversaw resource allocation and tracked project progress."
      ]
    }
  ];

  return (
    <>
      <section id="certifications" className="py-32 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="mb-16">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] mb-6 text-white/30 font-bold">Technical Qualifications & Certifications</h2>
          <ul className="space-y-4 text-white/70 font-light text-lg md:text-xl">
            <li className="flex gap-4">
              <span className="text-emerald-500">•</span>
              <span>The Role of Global Capital Market, Coursera, 06/2024</span>
            </li>
            <li className="flex gap-4">
              <span className="text-emerald-500">•</span>
              <span>Investment Banking: M&A and Initial Public Offerings, Coursera, 06/2024</span>
            </li>
            <li className="flex gap-4">
              <span className="text-emerald-500">•</span>
              <span>Recognised by the Indian Institute of Banking & Finance (IBF) with a certification in Anti-Money Laundering and KYC with 87/100 score, 02/2026</span>
            </li>
          </ul>
        </div>
      </section>

      <section id="experience" className="py-32 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="mb-32">
        <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] mb-6 text-white/30 font-bold">Professional Journey</h2>
        <h3 className="text-5xl md:text-8xl font-serif italic tracking-tighter">Internships & Impact</h3>
      </div>
      <div className="relative">
        {internships.map((internship, index) => (
          <InternshipCard key={index} internship={internship} index={index} />
        ))}
      </div>
    </section>
    </>
  );
};

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const Skills = () => {
  const skills = [
    { name: "Financial Analysis", icon: <BarChart3 size={24} />, proficiency: 90, desc: "Evaluating businesses, projects, and budgets to determine performance and suitability." },
    { name: "Portfolio Management", icon: <PieChart size={24} />, proficiency: 85, desc: "Strategically selecting and overseeing a group of investments to meet long-term financial objectives." },
    { name: "Asset Management", icon: <TrendingUp size={24} />, proficiency: 80, desc: "Cost-effectively managing assets to maximize value and investment returns." },
    { name: "Project Management", icon: <Briefcase size={24} />, proficiency: 85, desc: "Planning and organizing resources to move a specific task, event, or duty towards completion." },
    { name: "Tax Planning", icon: <ShieldCheck size={24} />, proficiency: 75, desc: "Analyzing financial situations from a tax perspective to ensure maximum tax efficiency." },
    { name: "Critical Thinking", icon: <Award size={24} />, proficiency: 90, desc: "Objectively analyzing and evaluating complex issues to form well-reasoned judgments." },
    { name: "Problem Solving", icon: <Code size={24} />, proficiency: 85, desc: "Identifying complex problems and reviewing related information to develop and evaluate options." },
    { name: "Written Communication", icon: <Globe size={24} />, proficiency: 95, desc: "Conveying complex financial concepts clearly and effectively through written reports and documentation." },
    { name: "Web Development", icon: <Monitor size={24} />, proficiency: 85, desc: "Building responsive, scalable web applications using modern frameworks and best practices." },
    { name: "AI Automation", icon: <Bot size={24} />, proficiency: 80, desc: "Implementing AI-driven solutions to optimize workflows, reduce manual tasks, and improve efficiency." },
  ];

  return (
    <section id="skills" className="scroll-section bg-black relative py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent h-64 pointer-events-none" />
      <div className="max-w-6xl w-full mx-auto relative z-10 px-6">
        <div className="text-center mb-24">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] mb-6 text-emerald-500 font-bold">Expertise</h2>
          <h3 className="text-5xl md:text-7xl font-serif italic tracking-tighter">Core Competencies</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div 
                key={index}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1, transition: { delay: index * 0.05, duration: 0.4 } },
                  hover: { scale: 1.05, y: -5, boxShadow: "0px 10px 30px rgba(16,185,129,0.3)", transition: { duration: 0.3, ease: "easeOut" } }
                }}
                className="p-6 glass-card flex flex-col items-center text-center gap-4 relative overflow-hidden cursor-pointer bg-white/5 border border-white/10 rounded-2xl"
              >
                <motion.div 
                  variants={{
                    hidden: { scale: 1, backgroundColor: "rgba(16,185,129,0.1)" },
                    visible: { scale: 1, backgroundColor: "rgba(16,185,129,0.1)" },
                    hover: { scale: 1.1, backgroundColor: "rgba(16,185,129,0.2)" }
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-emerald-500"
                >
                  {skill.icon}
                </motion.div>
                <motion.span 
                  variants={{
                    hidden: { color: "rgba(255,255,255,0.7)" },
                    visible: { color: "rgba(255,255,255,0.7)" },
                    hover: { color: "#34d399" }
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-xs font-semibold tracking-widest uppercase"
                >
                  {skill.name}
                </motion.span>
                
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 0, y: 20 },
                    hover: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute inset-0 bg-black/95 p-6 flex flex-col items-center justify-center backdrop-blur-md"
                >
                  <span className="text-emerald-400 font-bold mb-2 text-[10px] uppercase tracking-widest">{skill.name}</span>
                  <p className="text-[10px] sm:text-xs text-white/90 leading-relaxed font-medium text-center">
                    {skill.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          <div className="h-[400px] w-full glass-card p-6">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skills}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Proficiency"
                  dataKey="proficiency"
                  stroke="#10B981"
                  strokeWidth={2}
                  fill="#10B981"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-10% 0px -10% 0px" });

  const education = [
    {
      degree: "Master of Business Administration (MBA) - Finance",
      year: "2024 - 2026",
      details: "Specialized in Investment Banking, Financial Modeling, and Capital Markets."
    },
    {
      degree: "Bachelor of Commerce (B.Com)",
      year: "2020 - 2023",
      details: "Graduated with distinction. Core subjects included Accounting, Economics, and Business Law."
    }
  ];

  return (
    <section id="education" className="scroll-section bg-white text-black relative py-32 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 px-6">
        <div className="text-center mb-24">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] mb-6 text-black/30 font-bold">Academic Background</h2>
          <h3 className="text-5xl md:text-7xl font-serif italic tracking-tighter">Education</h3>
        </div>
        
        <div ref={ref} className="relative border-l border-black/10 ml-4 md:ml-0">
          {education.map((edu, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.1, x: -50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="mb-16 pl-8 relative"
            >
              <div className="absolute w-4 h-4 bg-emerald-500 rounded-full -left-[8.5px] top-1.5 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                <h4 className="text-2xl md:text-3xl font-bold font-serif">{edu.degree}</h4>
                <span className="text-emerald-600 font-mono text-sm mt-2 md:mt-0 bg-emerald-50 px-3 py-1 rounded-full">{edu.year}</span>
              </div>
              <p className="text-black/70 leading-relaxed max-w-2xl text-lg mt-4">{edu.details}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [showEmail, setShowEmail] = useState(false);

  return (
    <footer id="contact" className="py-40 px-6 bg-white text-black text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] mb-12 text-black/30 font-bold">Get in Touch</h2>
        <motion.h3 
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-mono font-bold mb-20 tracking-tighter leading-[1.2] uppercase"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Building at the intersection of <br className="hidden sm:block" />
          <span className="inline-block hover:text-emerald-500 transition-colors duration-300 cursor-default">Finance</span> 
          <span className="text-emerald-500 mx-2 md:mx-4">×</span> 
          <span className="inline-block hover:text-blue-500 transition-colors duration-300 cursor-default">Tech</span> 
          <span className="text-emerald-500 mx-2 md:mx-4">×</span> 
          <span className="inline-block hover:text-purple-500 transition-colors duration-300 cursor-default">AI</span>
        </motion.h3>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:aarshv.co@gmail.com" 
            onClick={(e) => {
              if (!showEmail) {
                e.preventDefault();
                setShowEmail(true);
              }
            }}
            className="flex items-center gap-4 px-10 py-5 bg-black text-white rounded-full hover:bg-emerald-600 transition-all duration-500 shadow-2xl shadow-black/20"
          >
            <Mail size={20} />
            <span className="font-semibold tracking-wide">
              {showEmail ? "aarshv.co@gmail.com" : "Email Me"}
            </span>
          </motion.a>
          <div className="flex gap-6">
            <motion.a 
              whileHover={{ y: -5 }}
              href="https://www.linkedin.com/in/aarsh-verma-11ab71262" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 flex items-center justify-center bg-[#0077B5] text-white rounded-full shadow-xl shadow-[#0077B5]/20"
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a 
              whileHover={{ y: -5 }}
              href="https://www.instagram.com/aarshverma._.12/" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 flex items-center justify-center bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white rounded-full shadow-xl shadow-[#ee2a7b]/20"
            >
              <Instagram size={24} />
            </motion.a>
          </div>
        </div>
        <div className="mt-32 pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono text-black/20 uppercase tracking-[0.3em] font-bold">
          <span>© 2026 Aarsh Verma</span>
          <div className="flex gap-8">
            <span>MBA Finance Portfolio</span>
            <span className="hidden sm:inline">Built with Precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-10 right-10 z-[100] w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:bg-emerald-400 transition-colors"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="antialiased selection:bg-emerald-500 selection:text-white bg-[#050505]">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 z-[110] origin-left"
        style={{ scaleX }}
      />
      <Navbar />
      <Hero />
      <Summary />
      <Experience />
      <Education />
      <Skills />
      <Contact />
      <BackToTop />
    </div>
  );
}
