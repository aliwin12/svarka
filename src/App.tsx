import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Hammer, 
  Flame, 
  Construction, 
  CheckCircle2, 
  Phone, 
  ArrowRight,
  Menu,
  X,
  Send
} from 'lucide-react';

// --- Constants ---
const PROJECTS = [
  { id: "tMMYSnmB", direct: "https://i.ibb.co/7JJrHBYv/D-Pv9-DOy-Uu4-Q7-N2-Ng-Yl-KBUSwz-Zszw-Bx-E1-LKA9-ACR4l-OGxnv-Xzcldxt-Y-Zt1-JBz-GZ-INNvg-GRFjkd-R5-Bj-NIa-Yzs.jpg" },
  { id: "Mk0c48JS", direct: "https://i.ibb.co/HT8tsN94/By-VLo-Twjbc-Rhrq05-UHAWVIOl-PMw-RRSFmw-ZGjpdpe5hevy-Fvsero-Cw-Vr-Yuv81-D0-x-Da-Px-Cgb-GX2v1ha-5g-Wn5-J.jpg" },
  { id: "nMJBb8TF", direct: "https://i.ibb.co/F4TXKq9F/h-Ww-MD4a-ELWDO-PMn-Rj-XRwlu-W-SD9tqsq5g-O0k-Lv-GKHr47e-Na5-Vc5-YLRAIco3jr-Zfn-Aolhuc-N9o-Xmn8-Kpc1a-Ew.jpg" },
  { id: "9HxqH2m8", direct: "https://i.ibb.co/tp0bpcwm/zpvgf-j-VLx-SKVPr-Cv11-Mv-Ebfmxz-U0l6-VSW7-X718zq-H6l-Gg-BHDEB14px6v-Sm-Gp-FUnw-JIAr-Gry-Sr-Ji-YNilpah.jpg" },
  { id: "1Yxjddf8", direct: "https://i.ibb.co/LDfHJJzn/CRkv-Sg-AMICh5l-N9d-RVE0-QDUq-EDxk-Ei9h-Rd-Q9-SUz97-Sg-H3-TN6w-Fm-IGxys-Os-Dks1hla-SXC9hb-KEKEN6kxtt-Fb.jpg" },
  { id: "chNmMsbV", direct: "https://i.ibb.co/F4BPNdsC/I3-Hlhfv-Mcq-Pr-n-Y-Gh-Xc4-Apjd-Td-H6g-R4r-MNe9i-JC33g-CTg3-N4-OUX1v-Nq-Lr8-m-RJTg-Gg-Lr-IVq-XEJeuf-Npdf.jpg" },
  { id: "QF2Lqy3C", direct: "https://i.ibb.co/C5kgXR3M/8xs-GFm-Mi1-Hj-Sj-Xz-L70lx-Dhm-JL-l-Sb-OKB3zfp-D2-YN4-DAFW3o-OOw-Zs-U-OGz-Idu-S32-Kmdy-Zmzyo7gv2-U0u-Tl-P.jpg" },
  { id: "6RS1Rbbj", direct: "https://i.ibb.co/vxWQxmm0/FKEa-Yoq-Ytb-SXse-QPd-Xvi-An08-Q-V5-2-Ehf14ia-Ky-OHIg-RCy-Qu-Rf9g0-V8ue-ZYUTj7arx-N1-NOVQztio-S0ryp-IBYL.jpg" },
  { id: "ksKzTgm9", direct: "https://i.ibb.co/nNr4ysPn/i-SF8c-IM9v3-F-m-Rlse-UOh-Heq-LI0-KLzz51-Fs-Ck4ktb-Zo-Us5-Qa-EBl-G7r7-PDt-Pd34-C2w-Qa0e-Lp-Fg-Q-e-Y0q-Htys.jpg" },
  { id: "gMfHMTgq", direct: "https://i.ibb.co/jvQBvM40/gve4-BCrpk-Pyb-7u3dd-NJr-V8-Lu-Guw-PS9-MMIk-FP7c8b-Xa5y-H9-CCDg-KFy-D3-Cmk-LTs-Dp-Bb-Dn-FIDqf35t-Abo-Ymn.jpg" },
  { id: "nNk6v17r", direct: "https://i.ibb.co/Kpybks26/D7-UK93-IYvmjql73-ODh-OUGv-Dg-M7-K9iq-R34mhjke-DYb-Mo-BPHoqhby-V-Ft-Kp-O-JZ36-Mo-A08-GF-Tuvbs-Vq-EJUhvejc.jpg" }
];

const PRIMARY_IMAGES = [
  PROJECTS[6].direct, // Photo #7
  PROJECTS[3].direct, // Photo #4
  PROJECTS[2].direct,
];

const SERVICES = [
  {
    icon: <Flame className="w-8 h-8 text-orange-500" />,
    title: "Сварочные работы",
    description: "Профессиональная сварка любых металлоконструкций, ремонт и монтаж.",
    features: ["Холодная ковка", "Электродуговая сварка"]
  },
  {
    icon: <Hammer className="w-8 h-8 text-orange-500" />,
    title: "Художественная ковка",
    description: "Изготовление эксклюзивных кованых изделий: ворота, заборы, ограждения.",
    features: ["Индивидуальный дизайн", "Ручная работа", "Долговечность"]
  },
  {
    icon: <Construction className="w-8 h-8 text-orange-500" />,
    title: "Металлоконструкции",
    description: "Проектирование и изготовление лестниц, навесов, каркасов зданий.",
    features: ["Высокая прочность", "Точный расчет"]
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0F1115]/95 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="p-2 bg-orange-600 rounded-lg group-hover:rotate-12 transition-transform">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs md:text-xl font-bold tracking-tighter text-white uppercase leading-none">Услуги по Сварке и Ковке металла</span>
            <span className="text-[9px] md:text-xs text-orange-500 font-medium tracking-widest uppercase mt-1">пгт. Троицко-Печорск</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#services" className="hover:text-orange-500 transition-colors">Услуги</a>
          <a href="#portfolio" className="hover:text-orange-500 transition-colors">Портфолио</a>
          <a href="#about" className="hover:text-orange-500 transition-colors">О нас</a>
          <a href="#contact" className="px-5 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors">Контакты</a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#0F1115] border-t border-gray-800 p-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center py-8">
              <a href="#services" className="text-xl font-bold text-gray-300 uppercase tracking-tighter" onClick={() => setIsMobileMenuOpen(false)}>Услуги</a>
              <a href="#portfolio" className="text-xl font-bold text-gray-300 uppercase tracking-tighter" onClick={() => setIsMobileMenuOpen(false)}>Портфолио</a>
              <a href="#about" className="text-xl font-bold text-gray-300 uppercase tracking-tighter" onClick={() => setIsMobileMenuOpen(false)}>О нас</a>
              <a href="#contact" className="bg-orange-600 text-white py-4 rounded-2xl font-black uppercase tracking-tighter" onClick={() => setIsMobileMenuOpen(false)}>Контакты</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Carousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PRIMARY_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img 
            src={PRIMARY_IMAGES[index]} 
            alt="Work showcase" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-3xl"
        >
          <span className="inline-block px-3 py-1 bg-orange-600 text-white text-xs font-bold uppercase tracking-widest rounded mb-6">
            Мастерство в каждой детали
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black text-white leading-[0.9] mb-8 uppercase">
            Искусство <br /> <span className="text-orange-500">Металла</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl">
            От простых сварочных швов до изысканных кованых шедевров. Создаем надежность и красоту из металла.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#services" 
              className="px-8 py-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-all flex items-center gap-2 group"
            >
              Наши Услуги <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#portfolio" 
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              Галерея работ
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {PRIMARY_IMAGES.map((_, i) => (
          <button 
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1 transition-all duration-500 ${index === i ? 'w-12 bg-orange-500' : 'w-4 bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectCarousel = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="relative aspect-square md:aspect-[16/6] w-full bg-black rounded-3xl overflow-hidden mb-8 border border-white/10">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="absolute inset-0"
        >
          <img 
            src={PROJECTS[index].direct}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/20 to-transparent p-8 md:p-12 flex flex-col justify-end">
            <span className="text-orange-500 font-bold mb-2 uppercase tracking-widest text-[10px] md:text-xs">Наши работы</span>
            <h3 className="text-xl md:text-4xl font-black text-white uppercase leading-tight">Фото #{index + 1}</h3>
            <div className="mt-6 flex gap-4">
              <a 
                href={PROJECTS[index].direct} 
                target="_blank"
                className="px-6 py-2 bg-white text-black font-bold rounded-lg text-sm"
              >
                Подробнее
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-6 right-6 flex gap-2">
        <button 
          onClick={() => setIndex((i) => (i - 1 + PROJECTS.length) % PROJECTS.length)}
          className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
        >
          <ArrowRight className="rotate-180 w-4 h-4" />
        </button>
        <button 
          onClick={() => setIndex((i) => (i + 1) % PROJECTS.length)}
          className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

const PhotoGallery = () => {
  return (
    <section id="portfolio" className="py-24 bg-[#0F1115]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-4">Наше <span className="text-orange-500">Портфолио</span></h2>
            <p className="text-gray-400">Взгляните на результаты нашей работы: от ограждений до сложных металлических конструкций.</p>
          </div>
          <div className="flex gap-2">
            <div className="w-12 h-[1px] bg-orange-500 mt-4 rounded-full" />
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Галерея работ</span>
          </div>
        </div>

        <ProjectCarousel />

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {PROJECTS.map((project, i) => (
            <motion.a
                key={project.id}
                href={project.direct}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative aspect-square bg-gray-900 rounded-2xl overflow-hidden hover:ring-2 hover:ring-orange-500 transition-all"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 z-10">
                    <span className="text-[10px] text-orange-400 uppercase font-bold tracking-tighter">Фото #{i + 1}</span>
                    <span className="text-white text-xs font-bold">Увеличить</span>
                </div>
                <img 
                  src={project.direct}
                  alt={`Work ${i + 1}`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="text-white w-6 h-6 -rotate-45" />
                </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="bg-[#0F1115] min-h-screen text-gray-100 font-sans selection:bg-orange-500 selection:text-white">
      <Navbar />
      <Carousel />
      
      <section id="services" className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-600/5 blur-3xl rounded-full translate-x-1/2" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-orange-500/50 transition-all group"
              >
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4 uppercase">{service.title}</h3>
                <p className="text-gray-400 mb-8 leading-relaxed">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-orange-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PhotoGallery />

      <section id="contact" className="py-32 bg-orange-600 overflow-hidden relative">
        <div className="absolute top-1/2 left-0 w-full h-[500px] bg-black/10 -skew-y-6 -translate-y-1/2" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center justify-center text-white text-center">
            <h2 className="text-4xl md:text-8xl font-black uppercase mb-8 leading-none">Контакты</h2>
            
            <a href="tel:+79121125472" className="flex flex-col items-center gap-6 group">
              <div className="flex items-center gap-4 text-2xl sm:text-4xl md:text-7xl font-black transition-transform group-hover:scale-105">
                <Phone className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 group-hover:rotate-12 transition-transform" />
                +7 (912) 112 54-72
              </div>
              <div className="h-[2px] w-32 md:w-48 bg-white/30" />
              <span className="text-white text-[10px] sm:text-sm md:text-xl uppercase font-black tracking-[0.3em] opacity-80">Нажмите, чтобы позвонить</span>
            </a>

            <p className="mt-12 text-base md:text-2xl font-medium opacity-90 max-w-2xl mx-auto leading-relaxed px-4">
              Принимаем заказы на все виды сварочных и ковочных работ в <span className="font-black">пгт. Троицко-Печорск</span> и окрестностях.
            </p>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-black border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 font-bold text-lg uppercase tracking-tighter">
            <Flame className="w-5 h-5 text-orange-500" />
            <div className="flex flex-col">
              <span className="leading-none">Услуги по Сварке и Ковке металла</span>
              <span className="text-[8px] text-gray-500 uppercase mt-1 tracking-widest">пгт. Троицко-Печорск</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-400 text-lg font-black tracking-widest uppercase">Токарев П.Е</p>
            <div className="flex gap-4">
               <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors group overflow-hidden"
                title="ВКонтакте"
               >
                 <img 
                   src="https://i.ibb.co/rRgjVjc0/images.png" 
                   alt="VK" 
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                   referrerPolicy="no-referrer"
                 />
               </a>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
            Металлообработка • 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
