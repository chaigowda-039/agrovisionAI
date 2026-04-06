import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthPortal from './AuthPortal';
import LoginGate from './LoginGate';
import { 
  Leaf, 
  Droplets, 
  LayoutDashboard, 
  ShieldCheck, 
  Globe, 
  Microscope, 
  BarChart3, 
  ArrowRight, 
  ScanLine,
  Sprout,
  Navigation,
  Wind,
  Target,
  FlaskConical,
  Lock,
  ChevronRight,
  Menu,
  X,
  Cloud,
  Sun,
  CloudRain,
  Thermometer,
  RotateCcw,
  Search,
  MapPin,
  Download
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility for Tailwind class merging */
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const FarmingDataPoint = ({ top, left, label, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: [0.05, 0.2, 0.05] }}
    transition={{ delay, duration: 4, repeat: Infinity, ease: "easeInOut" }}
    style={{ top, left }}
    className="absolute pointer-events-none flex items-center gap-3"
  >
    <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
    <span className="text-[7px] font-black uppercase text-primary tracking-[0.4em]">{label}</span>
  </motion.div>
);

const SectionBackground = ({ grid = false, dots = false }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {grid && <div className="absolute inset-0 technical-overlay opacity-30" />}
    {dots && <div className="absolute inset-0 farming-grid opacity-40" />}
    <FarmingDataPoint top="15%" left="5%" label="Metabolic.Sync_01" delay={1} />
    <FarmingDataPoint top="45%" left="92%" label="Root.Depth:4.5m" delay={2} />
    <FarmingDataPoint top="85%" left="15%" label="Water.Ret_Opt" delay={1.5} />
    <FarmingDataPoint top="30%" left="80%" label="Temp_D8_Live" delay={0.5} />
  </div>
);

// --- SHARED COMPONENTS ---

const Badge = ({ children, className }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={cn(
      "inline-flex items-center px-4 py-2 rounded-full bg-primary/5 text-primary text-[9px] font-bold uppercase tracking-[0.3em] border border-primary/10 backdrop-blur-xl mb-8", 
      className
    )}
  >
    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3 animate-pulse" />
    {children}
  </motion.div>
);

const GlassCard = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -5, transition: { duration: 0.3 } }}
    className={cn("glass-card p-10 rounded-[2.5rem] relative group overflow-hidden", className)}
  >
    {children}
  </motion.div>
);

const SectionHeader = ({ badge, title, description, asymmetric = false }) => (
  <div className={cn("max-w-4xl mb-24", asymmetric ? "ml-auto text-right" : "")}>
    <Badge>{badge}</Badge>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-6xl md:text-8xl font-black text-on-surface leading-[0.9] mb-10 tracking-tight"
    >
      {title}
    </motion.h2>
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className={cn("text-xl text-on-surface-variant max-w-xl opacity-70 leading-relaxed font-medium", asymmetric ? "ml-auto" : "")}
    >
      {description}
    </motion.p>
  </div>
);

// --- NAVIGATIONAL ELEMENTS ---

const FloatingSidebar = () => {
  const sections = ['Welcome', 'Soil', 'Weather', 'Mapping', 'Water', 'Secure'];
  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-12 group">
      <div className="w-px h-24 bg-gradient-to-b from-transparent via-primary/40 to-primary/40 group-hover:h-32 transition-all duration-700" />
      {sections.map((sec, i) => (
        <a 
          key={sec} 
          href={`#${sec.toLowerCase()}`}
          className="relative flex items-center justify-center group/item"
        >
          <span className="text-[11px] font-black tracking-widest text-on-surface-variant opacity-50 group-hover/item:opacity-100 group-hover/item:text-primary transition-all">
            {sec === 'Mapping' ? '3.5' : i > 3 ? `0${i}` : `0${i + 1}`}
          </span>
          <div className="absolute -right-3 w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover/item:opacity-100 transition-all scale-0 group-hover/item:scale-100 shadow-[0_0_10px_rgba(13,99,27,0.5)]" />
        </a>
      ))}
      <div className="w-px h-24 bg-gradient-to-t from-transparent via-primary/40 to-primary/40 group-hover:h-32 transition-all duration-700" />
      
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 flex flex-col items-center gap-8">
        <div className="w-px h-32 bg-gradient-to-b from-primary/30 to-transparent" />
        <span className="[writing-mode:vertical-lr] text-[9px] font-black uppercase tracking-[0.6em] text-primary/40 animate-pulse">Scroll</span>
      </div>
    </div>
  );
};

const PhaseWelcome = () => {
  return (
    <section id="welcome" className="relative min-h-[110vh] flex items-center pt-32 pb-20 px-8 bg-surface overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop"
          className="w-full h-full object-cover opacity-60 grayscale-[0.1] brightness-[0.7]"
          alt="Agriculture Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-transparent to-surface z-10" />
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-0" />
      </div>
      
      {/* Decorative Large Wheat Icon */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 opacity-[0.03] rotate-12 pointer-events-none z-0">
        <Sprout size={1200} className="text-primary" strokeWidth={0.5} />
      </div>

      <SectionBackground grid dots />
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="animated-glow top-[-10%] right-[-5%] w-[800px] h-[800px] bg-primary/10"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="animated-glow bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#6499E9]/10"
        />
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="perspective">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Badge>Autonomous Agriculture 3.0</Badge>
            <h1 className="text-7xl md:text-[9rem] font-black text-on-surface leading-[0.8] mb-12 tracking-tighter">
              AI That <br/>
              <span className="text-glow">Speaks</span> <br/>
              <span className="text-primary italic">Land.</span>
            </h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-lg mb-16"
            >
              <p className="text-xl text-on-surface-variant leading-relaxed font-medium opacity-80">
                AgroVision orchestrates your farm's metabolic output through deep neural networks and root-level intelligence.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-8"
            >
              <a href="#secure" className="primary-btn flex items-center gap-4 group">
                Begin Deployment <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative group">
          {/* Main Hero Media */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border-8 border-white/40"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-white/10 mix-blend-overlay z-10" />
            <img 
              alt="Advanced Farming" 
              className="w-full aspect-[4/5] object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s]" 
              src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=2042&auto=format&fit=crop"
            />
            
            {/* Floating Data Card */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-10 left-10 right-10 glass-card p-10 !bg-white/80 border-none shadow-2xl backdrop-blur-2xl z-20"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2">Sync: Delta-8</p>
                  <p className="text-3xl font-black text-on-surface">Growth Optimized</p>
                </div>
                <div className="w-14 h-14 rounded-full signature-gradient flex items-center justify-center text-white shadow-xl">
                  <BarChart3 size={24} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <p className="text-[9px] font-black uppercase text-on-surface-variant opacity-60">Metabolic Rate</p>
                    <p className="text-sm font-black text-primary">98.4%</p>
                  </div>
                  <div className="h-1 bg-primary/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "98.4%" }}
                      transition={{ delay: 2, duration: 2 }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <p className="text-[9px] font-black uppercase text-on-surface-variant opacity-60">Hydration</p>
                    <p className="text-sm font-black text-primary">82%</p>
                  </div>
                  <div className="h-1 bg-primary/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "82%" }}
                      transition={{ delay: 2.2, duration: 2 }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Orbiting Elements */}
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 -left-12 glass-card px-8 py-6 rounded-3xl shadow-2xl skew-x-[-5deg] border-none !bg-primary text-white"
          >
             <div className="flex items-center gap-5">
               <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                 <Sprout size={24} />
               </div>
               <div>
                 <p className="text-[9px] font-bold uppercase tracking-widest leading-none mb-1 opacity-70">Status</p>
                 <p className="text-lg font-black leading-none">Synergy Active</p>
               </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PhaseSoilIntelligence = () => {
  const [scanActive, setScanActive] = useState(false);
  const [detectedSoil, setDetectedSoil] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mode, setMode] = useState('scan'); // 'scan' or 'manual'
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const soilCropMap = {
    'Sandy': {
      crops: ['Carrots', 'Potatoes', 'Peanuts', 'Watermelons'],
      details: { ph: '5.8 - 6.5', nitrogen: 'Low', organic: '1.2%', density: '1.6 g/cm³', waterCapacity: '15%' },
      description: 'Highly granular with rapid drainage. Rapidly loses moisture and nutrients, requiring frequent, micro-dosed irrigation.'
    },
    'Clay': {
      crops: ['Rice', 'Broccoli', 'Cabbage', 'Cauliflower'],
      details: { ph: '6.5 - 7.5', nitrogen: 'High', organic: '4.5%', density: '1.1 g/cm³', waterCapacity: '45%' },
      description: 'Dense microscopic particle structure. Excellent nutrient retention but highly prone to compaction and water-logging.'
    },
    'Loam': {
      crops: ['Wheat', 'Corn', 'Cotton', 'Tomatoes'],
      details: { ph: '6.0 - 7.0', nitrogen: 'Medium', organic: '3.0%', density: '1.3 g/cm³', waterCapacity: '30%' },
      description: 'The optimal agricultural balance of sand, silt, and clay. Sustains robust microbial life and perfect aeration.'
    },
    'Peat': {
      crops: ['Blueberries', 'Brassicas', 'Camellias'],
      details: { ph: '3.5 - 4.5', nitrogen: 'Very High', organic: '20%+', density: '0.5 g/cm³', waterCapacity: '80%' },
      description: 'Formed from decomposed organic matter. Highly acidic and naturally spongy, acting as a massive carbon and water sink.'
    },
    'Silt': {
      crops: ['Vines', 'Fruit Trees', 'Vegetables', 'Grains'],
      details: { ph: '6.0 - 7.5', nitrogen: 'Moderate', organic: '2.5%', density: '1.4 g/cm³', waterCapacity: '25%' },
      description: 'Fine, slippery particles often found near rivers. Highly fertile and retains moisture well, but easily compacted.'
    },
    'Chalky': {
      crops: ['Spinach', 'Beets', 'Corn', 'Vines'],
      details: { ph: '7.1 - 8.0', nitrogen: 'Low', organic: '1.5%', density: '1.5 g/cm³', waterCapacity: '20%' },
      description: 'Alkaline matrix typically sitting over limestone bedrock. Can cause nutrient lockout (iron/manganese deficiency) if unbuffered.'
    },
    'Alluvial': {
      crops: ['Sugarcane', 'Rice', 'Wheat', 'Jute'],
      details: { ph: '6.5 - 7.5', nitrogen: 'Medium', organic: 'Varies', density: '1.2 g/cm³', waterCapacity: '50%' },
      description: 'Deposited by running surface water. Structurally complex and continually renewed with downstream mineral deposits.'
    },
    'Black': {
      crops: ['Cotton', 'Soybeans', 'Sunflowers', 'Wheat'],
      details: { ph: '7.2 - 8.5', nitrogen: 'Low', organic: 'High', density: '1.4 g/cm³', waterCapacity: '60%' },
      description: 'Volcanic or basaltic origin. Exhibits extreme swelling when wet and severe deep-cracking sequence when dehydrated.'
    },
    'Red': {
      crops: ['Groundnut', 'Millets', 'Tobacco', 'Potatoes'],
      details: { ph: '5.5 - 6.5', nitrogen: 'Low', organic: 'Low', density: '1.3 g/cm³', waterCapacity: '25%' },
      description: 'Iron-oxide rich profiles common in warm climates. Generally nutrient-poor but responds incredibly well to targeted fertilization.'
    },
    'Arid': {
      crops: ['Millets', 'Barley', 'Maize', 'Dates'],
      details: { ph: '7.0 - 9.0', nitrogen: 'Very Low', organic: 'Trace', density: '1.5 g/cm³', waterCapacity: '10%' },
      description: 'Desert-condition soils with virtually zero organic matter. Highly susceptible to calcification without aggressive flushing.'
    }
  };

  const cropDetailsMap = {
    'Rice': { cycle: '120-150 days', yield: '4-6 tons/ha', nutrients: 'Nitrogen, Phosphorus', market: 'High Stability' },
    'Wheat': { cycle: '110-130 days', yield: '3-5 tons/ha', nutrients: 'Nitrogen, Potassium', market: 'Global Demand' },
    'Corn': { cycle: '90-120 days', yield: '8-10 tons/ha', nutrients: 'High Nitrogen', market: 'Industrial Growth' },
    'Carrots': { cycle: '70-80 days', yield: '20-40 tons/ha', nutrients: 'Potassium, Calcium', market: 'Direct Retail' },
    'Potatoes': { cycle: '90-120 days', yield: '15-25 tons/ha', nutrients: 'Phosphorus, Potassium', market: 'High Utility' },
    'Cotton': { cycle: '150-180 days', yield: '2-4 tons/ha', nutrients: 'Sulfur, Magnesium', market: 'Industrial Core' },
    'Tomatoes': { cycle: '60-80 days', yield: '60-100 tons/ha', nutrients: 'Calcium, Nitrogen', market: 'High Turnover' },
    'Blueberries': { cycle: 'Long-term (Perennial)', yield: '500-1000 kg/ha', nutrients: 'Acidic, Iron', market: 'Premium Value' },
    'Spinach': { cycle: '40-50 days', yield: '10-20 tons/ha', nutrients: 'Nitrogen, Boron', market: 'Local Organic' },
    'Broccoli': { cycle: '70-100 days', yield: '10-15 tons/ha', nutrients: 'Sulfur, Boron', market: 'Superfood Trend' },
    'Cabbage': { cycle: '80-120 days', yield: '20-30 tons/ha', nutrients: 'Nitrogen, Calcium', market: 'Bulk Wholesale' },
    'Cauliflower': { cycle: '90-120 days', yield: '15-20 tons/ha', nutrients: 'Boron, Molybdenum', market: 'Gourmet Sector' },
    'Peanuts': { cycle: '120-140 days', yield: '2-3 tons/ha', nutrients: 'Phosphorus, Calcium', market: 'Oil & Protein' },
    'Watermelons': { cycle: '70-90 days', yield: '30-50 tons/ha', nutrients: 'Potassium, Nitrogen', market: 'Seasonal Peak' },
    'Vines': { cycle: 'Perennial (Cycle 180d)', yield: '5-12 tons/ha', nutrients: 'Potassium, Zinc', market: 'Micro-Winery' },
    'Beets': { cycle: '55-70 days', yield: '15-25 tons/ha', nutrients: 'Boron, Sodium', market: 'Natural Dyes' },
    'Sugarcane': { cycle: '10-14 months', yield: '60-100 tons/ha', nutrients: 'Nitrogen, Potassium', market: 'Sugar & Biofuel' },
    'Jute': { cycle: '120-150 days', yield: '2-3 tons/ha', nutrients: 'Nitrogen', market: 'Textile Industry' },
    'Soybeans': { cycle: '80-120 days', yield: '2-4 tons/ha', nutrients: 'Phosphorus, Potassium', market: 'Protein & Oil' },
    'Sunflowers': { cycle: '90-120 days', yield: '1-3 tons/ha', nutrients: 'Nitrogen, Phosphorus', market: 'Oil Extraction' },
    'Groundnut': { cycle: '120-150 days', yield: '2-4 tons/ha', nutrients: 'Calcium, Sulfur', market: 'Snack & Oil' },
    'Millets': { cycle: '60-90 days', yield: '1-2 tons/ha', nutrients: 'Nitrogen', market: 'Drought Crops' },
    'Tobacco': { cycle: '90-120 days', yield: '1.5-2.5 tons/ha', nutrients: 'Potassium, Nitrogen', market: 'Commercial Focus' },
    'Barley': { cycle: '90-120 days', yield: '3-6 tons/ha', nutrients: 'Phosphorus, Potassium', market: 'Brewing & Feed' },
    'Maize': { cycle: '90-120 days', yield: '8-10 tons/ha', nutrients: 'High Nitrogen', market: 'Food & Fodder' },
    'Dates': { cycle: 'Perennial', yield: '40-80 kg/tree', nutrients: 'Potassium, Nitrogen', market: 'High Demand' }
  };

  const propertyDetailsMap = {
    'ph': { title: 'pH Balance', description: 'Acidity/Alkalinity level determining nutrient availability. Most crops thrive between 6.0 and 7.5.', action: 'Buffer with Lime or Sulfur to optimize metabolic intake.' },
    'nitrogen': { title: 'Nitrogen Profile', description: 'Primary driver for vegetative growth. High levels promote lush foliage; low levels stunt development.', action: 'Deploy fixed-nitrogen cover crops or precise synthetic dosing.' },
    'organic': { title: 'Organic Matter', description: 'Decomposed biological material that improves soil structure, moisture retention, and microbial life.', action: 'Integrate compost or maintain crop residue post-harvest.' },
    'density': { title: 'Bulk Density', description: 'Compaction metric affecting root penetration and aeration. Values above 1.6 g/cm³ restrict roots tightly.', action: 'Deep-rip or use deep-rooting cover crops to break compaction.' },
    'waterCapacity': { title: 'Water Capacity', description: 'Volumetric retention of moisture available to roots before drainage. Critical for drought resilience.', action: 'Enhance organic matter or adjust irrigation pulse duration.' }
  };

  const exportToCSV = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!detectedSoil) return;
    const details = soilCropMap[detectedSoil].details;
    const crops = soilCropMap[detectedSoil].crops.join('; ');
    
    let csvContent = "Metric,Value\n";
    csvContent += `Soil Type,${detectedSoil}\n`;
    Object.entries(details).forEach(([key, val]) => {
      csvContent += `${key.toUpperCase()},${val}\n`;
    });
    csvContent += `Recommended Crops,${crops}\n`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${detectedSoil}_Soil_Analysis.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e) => {
    setIsProcessing(true);
    setScanActive(true);
    setTimeout(() => {
      const types = Object.keys(soilCropMap);
      const randomType = types[Math.floor(Math.random() * types.length)];
      setDetectedSoil(randomType);
      setIsProcessing(false);
      setScanActive(false);
    }, 3000);
  };

  const handleManualSelection = (type) => {
    setIsProcessing(true);
    setTimeout(() => {
      setDetectedSoil(type);
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <section id="soil" className="py-40 px-8 bg-surface-container-low rounded-[5rem] relative overflow-hidden group">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?q=80&w=2070&auto=format&fit=crop"
          className="w-full h-full object-cover opacity-50 grayscale-[0.1] brightness-90"
          alt="Soil Strategy Background"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-surface-container-low/60 via-transparent to-surface-container-low/60 z-10" />
      </div>

      <div className="absolute left-[-5%] bottom-[-10%] opacity-[0.03] -rotate-12 pointer-events-none z-0">
        <Leaf size={800} className="text-primary" strokeWidth={0.5} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader 
          badge="Phase 2: Molecular Depth"
          title="Digital Soil Stratigraphy"
          description="Our neural scanners use multispectral imaging to identify every mineral and microbial pocket within your land's foundation."
        />
        
        <div className="grid lg:grid-cols-2 gap-32 items-center">
          <div className="perspective">
            <motion.div 
              className="aspect-square glass-card !rounded-[3rem] relative overflow-hidden border-2 border-primary/20 shadow-2xl group/scanner"
              whileHover={{ rotateY: 2, rotateX: -2 }}
            >
              {/* Soil Context Background */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=1500&auto=format&fit=crop" 
                  className="w-full h-full object-cover opacity-30 group-hover/scanner:scale-110 transition-transform duration-[10s]"
                  alt="Deep Soil Structure"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-surface border-4 border-dashed border-primary/20 rounded-[3rem] m-2 pointer-events-none" />
              </div>

              <AnimatePresence>
                {(scanActive || isProcessing) && (
                  <React.Fragment key="scanning-overlay">
                    <motion.div 
                      key="laser-line"
                      initial={{ top: "-100%" }}
                      animate={{ top: "100%" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-x-0 h-[3px] bg-primary shadow-[0_0_50px_#0D631B] z-30 pointer-events-none"
                    />
                    <motion.div 
                      key="blur-backdrop"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-[#050B08]/80 backdrop-blur-md z-20 flex flex-col items-center justify-center text-white"
                    >
                       <div className="w-20 h-20 border-4 border-white/20 border-t-primary rounded-full animate-spin mb-6" />
                       <p className="font-black uppercase tracking-[0.4em] text-xs text-primary animate-pulse">Neural Processing...</p>
                    </motion.div>
                  </React.Fragment>
                )}
              </AnimatePresence>
              
              <div className="absolute inset-0 flex items-center justify-center z-10">
                 {detectedSoil ? (
                     <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center px-12 py-16 glass-card !bg-white/95 !rounded-[3rem] border-none shadow-2xl relative w-full h-full overflow-y-auto custom-scrollbar"
                    >
                       <div className="absolute top-6 right-6 flex flex-col sm:flex-row items-center gap-3 z-50">
                         <button 
                           type="button"
                           onClick={exportToCSV}
                           className="px-6 py-4 flex items-center gap-3 bg-primary/10 text-primary border border-primary/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary hover:scale-105 active:scale-95 transition-all group shadow-sm bg-white/80 backdrop-blur-sm"
                         >
                           <Download size={16} className="group-hover:translate-y-1 transition-transform duration-300" />
                           Export
                         </button>
                         <button 
                           type="button"
                           onClick={(e) => { 
                             e.preventDefault();
                             e.stopPropagation();
                             setDetectedSoil(null); 
                             setSelectedCrop(null); 
                             setSelectedProperty(null);
                             setScanActive(false);
                             setIsProcessing(false);
                             setMode('scan');
                             const fileInput = document.getElementById('soil-file-upload');
                             if (fileInput) fileInput.value = '';
                           }}
                           className="px-6 py-4 flex items-center gap-3 bg-primary/10 text-primary border border-primary/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary hover:scale-105 active:scale-95 transition-all group shadow-sm"
                         >
                           <RotateCcw size={16} className="group-hover:-rotate-180 transition-transform duration-700" />
                           Reset
                         </button>
                       </div>

                       <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center mx-auto mt-12 mb-8 shadow-2xl">
                         <Target size={40} />
                       </div>
                       <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">Detection Result</h3>
                       <p className="text-6xl font-black text-on-surface tracking-tighter mb-4">{detectedSoil}</p>
                       <p className="text-sm font-medium text-on-surface-variant opacity-80 mb-10 max-w-sm mx-auto leading-relaxed">
                         {soilCropMap[detectedSoil].description}
                       </p>
                       
                       <div className="space-y-6">
                         <div className="grid grid-cols-2 gap-4 mb-8">
                           {Object.entries(soilCropMap[detectedSoil].details).map(([key, val]) => (
                             <button 
                               key={key} 
                               onClick={() => setSelectedProperty(selectedProperty === key ? null : key)}
                               className={cn(
                                 "p-4 rounded-2xl border text-left transition-all hover:scale-[1.02] active:scale-95 group",
                                 selectedProperty === key ? "bg-primary text-white border-primary shadow-lg" : "bg-primary/5 border-primary/10 hover:bg-primary/10"
                               )}
                             >
                               <p className={cn("text-[8px] font-black uppercase tracking-widest mb-1 opacity-60", selectedProperty === key ? "text-white" : "text-primary")}>
                                 {key === 'waterCapacity' ? 'Water Capacity' : key}
                               </p>
                               <p className={cn("text-sm font-bold", selectedProperty === key ? "text-white" : "text-on-surface")}>{val}</p>
                             </button>
                           ))}
                         </div>
                         
                         <AnimatePresence>
                            {selectedProperty && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                                className="mb-8 p-6 bg-surface-variant/30 border border-primary/10 rounded-3xl text-left overflow-hidden"
                              >
                                <div className="flex items-center gap-4 mb-4">
                                  <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                                    <ScanLine size={16} />
                                  </div>
                                  <p className="text-lg font-black text-on-surface uppercase tracking-tight">{propertyDetailsMap[selectedProperty]?.title}</p>
                                </div>
                                <p className="text-sm font-medium text-on-surface-variant opacity-80 leading-relaxed mb-4">
                                  {propertyDetailsMap[selectedProperty]?.description}
                                </p>
                                <div className="p-3 bg-primary/10 rounded-xl">
                                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary mb-1">Action Protocol</p>
                                  <p className="text-xs font-bold text-on-surface">{propertyDetailsMap[selectedProperty]?.action}</p>
                                </div>
                              </motion.div>
                            )}
                         </AnimatePresence>
                         
                         <p className="text-xs font-black uppercase tracking-widest text-on-surface-variant opacity-60">Optimal Ecosystem</p>
                         <div className="flex flex-wrap justify-center gap-3">
                           {soilCropMap[detectedSoil].crops.map(crop => (
                             <button 
                                key={crop} 
                                onClick={() => setSelectedCrop(selectedCrop === crop ? null : crop)}
                                className={cn(
                                  "px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all hover:scale-105 active:scale-95",
                                  selectedCrop === crop ? "bg-primary text-white border-primary shadow-lg" : "bg-primary/5 text-primary border-primary/10"
                                )}
                             >
                               {crop}
                             </button>
                           ))}
                         </div>

                         <AnimatePresence>
                            {selectedCrop && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0, y: 10 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: 10 }}
                                className="mt-8 pt-8 border-t border-primary/10 text-left overflow-hidden"
                              >
                                <div className="flex items-center gap-4 mb-6">
                                  <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center">
                                    <Globe size={18} />
                                  </div>
                                  <p className="text-xl font-black text-on-surface uppercase tracking-tight">{selectedCrop} Deep Insight</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  {[
                                    { label: 'Growth Cycle', val: cropDetailsMap[selectedCrop]?.cycle },
                                    { label: 'Avg Yield', val: cropDetailsMap[selectedCrop]?.yield },
                                    { label: 'Nutrient Focus', val: cropDetailsMap[selectedCrop]?.nutrients },
                                    { label: 'Market Logic', val: cropDetailsMap[selectedCrop]?.market }
                                  ].map((detail, i) => (
                                    <div key={i} className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                      <p className="text-[7px] font-black uppercase tracking-[0.2em] text-primary mb-1 opacity-50">{detail.label}</p>
                                      <p className="text-[11px] font-bold text-on-surface">{detail.val || 'Analyzing...'}</p>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                         </AnimatePresence>
                       </div>
                    </motion.div>
                 ) : (
                    <div className="text-center w-full max-w-sm max-h-[90%] overflow-y-auto custom-scrollbar px-8 py-10 lg:px-12 lg:py-16 glass-card !bg-white/90 !rounded-3xl border-none shadow-2xl">
                       <div className="flex bg-primary/10 rounded-2xl p-1 mb-8 shrink-0">
                         <button 
                           onClick={() => setMode('scan')}
                           className={cn("flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all", mode === 'scan' ? "bg-primary text-white shadow-lg" : "text-primary hover:bg-primary/5")}
                         >
                           AI Scan
                         </button>
                         <button 
                           onClick={() => setMode('manual')}
                           className={cn("flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all", mode === 'manual' ? "bg-primary text-white shadow-lg" : "text-primary hover:bg-primary/5")}
                         >
                           Manual
                         </button>
                       </div>

                       {mode === 'scan' ? (
                         <>
                           <Sprout className="mx-auto mb-8 text-primary" size={60} />
                           <h3 className="text-3xl font-extrabold mb-6 tracking-tight">Soil Diagnosis</h3>
                           <p className="text-on-surface-variant text-base font-medium opacity-70 mb-12">Upload an ultra-high-res image of your soil for real-time mineral analysis.</p>
                           
                           <label className="primary-btn !px-12 block cursor-pointer text-center">
                             Upload Image
                             <input type="file" id="soil-file-upload" className="hidden" onChange={handleFileUpload} accept="image/*" />
                           </label>
                         </>
                       ) : (
                         <div className="space-y-4">
                           <h3 className="text-2xl font-black mb-6 tracking-tight">Select Soil Type</h3>
                           <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                             {Object.keys(soilCropMap).map(type => (
                               <button 
                                 key={type}
                                 onClick={() => handleManualSelection(type)}
                                 className="p-3 bg-white/50 border border-primary/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white hover:scale-105 transition-all shadow-sm"
                               >
                                 {type}
                               </button>
                             ))}
                           </div>
                           <p className="text-[9px] font-bold text-on-surface-variant opacity-50 mt-8 uppercase tracking-widest">Select your local soil profile</p>
                         </div>
                       )}
                    </div>
                 )}
              </div>

              {!scanActive && !detectedSoil && [
                { top: '25%', left: '35%', label: '92% Accurate' },
                { top: '65%', left: '75%', label: 'Mineral Core' }
              ].map((pos, i) => (
                <div 
                  key={i}
                  className="absolute z-0 flex items-center gap-3 opacity-20"
                  style={{ top: pos.top, left: pos.left }}
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-[9px] font-bold uppercase text-primary tracking-widest">{pos.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="space-y-10">
            {[
              { icon: Microscope, title: 'Molecular Insights', text: 'Detecting 42 specific mineral signatures including trace Nitrogen levels with lab-grade precision.' },
              { icon: Target, title: 'Stratigraphy Mapping', text: 'Creating a 3D digital twin of your soil layers down to 4.5 meters for root-zone visibility.' },
              { icon: FlaskConical, title: 'Pathogen Forensics', text: 'Preventive detection of microbial threats before they impact crop metabolism.' }
            ].map((feature, idx) => (
              <GlassCard 
                key={idx}
                delay={idx * 0.15}
                className="flex gap-10 !p-12 hover:!bg-primary group transition-all"
              >
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:text-primary transition-all shadow-ambient">
                  <feature.icon size={32} />
                </div>
                <div>
                  <h4 className="font-extrabold text-3xl mb-4 group-hover:text-white transition-colors">{feature.title}</h4>
                  <p className="text-on-surface-variant text-base font-medium leading-relaxed opacity-70 group-hover:text-white/80 transition-colors">{feature.text}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const PhaseWeather = () => {
  const [weatherState, setWeatherState] = useState('loading');
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setWeatherState('active');
          setLocation({
            lat: position.coords.latitude.toFixed(2),
            lon: position.coords.longitude.toFixed(2)
          });
        },
        () => setWeatherState('denied')
      );
    }
  }, []);

  const alerts = [
    { type: 'Wind', severity: 'High', time: '14:00', desc: 'Gusts up to 45km/h' },
    { type: 'Rain', severity: 'Moderate', time: '18:30', desc: 'Precipitation 4.2mm/h' }
  ];

  return (
    <section id="weather" className="py-40 px-8 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1433360405326-e50f909805b3?q=80&w=2070&auto=format&fit=crop"
          className="w-full h-full object-cover opacity-50 brightness-[0.8]"
          alt="Atmospheric Intelligence Background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-surface z-10" />
      </div>
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          badge="Phase 3: atmospheric intelligence"
          title="Predictive Micro-Climate"
          description="AgroVision's quantum-mesh sensors track atmospheric pressure shifts to predict local precipitation with 94.2% accuracy."
          asymmetric
        />
        
        <div className="grid lg:grid-cols-5 gap-8">
          <motion.div 
            className="lg:col-span-3 glass-card !p-16 relative overflow-hidden bg-gradient-to-br from-white via-primary/5 to-transparent flex flex-col justify-between"
            whileHover={{ y: -5 }}
          >
            <div>
              <div className="flex justify-between items-start relative z-10 mb-16">
                <div>
                  <Badge className="mb-6">
                    {weatherState === 'active' ? `LIVE: ${location.lat}N, ${location.lon}E` : 'LIVE TELEMETRY'}
                  </Badge>
                  <h3 className="text-9xl font-black text-on-surface tracking-tighter mb-4">24.5°</h3>
                  <p className="text-2xl font-bold text-on-surface-variant flex items-center gap-3">
                    Partly Cloudly <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  </p>
                </div>
                <motion.div 
                  animate={{ 
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="text-primary"
                >
                  <Cloud size={140} strokeWidth={1} className="drop-shadow-2xl" />
                </motion.div>
              </div>
              
              <div className="grid grid-cols-3 gap-12 pt-16 border-t border-primary/10">
                {[
                  { icon: Thermometer, label: 'High / Low', val: '28° / 19°' },
                  { icon: Droplets, label: 'Humidity', val: '62%' },
                  { icon: Wind, label: 'Velocity', val: '14km/h' }
                ].map((stat, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <stat.icon size={18} className="text-primary" />
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-50">{stat.label}</p>
                    </div>
                    <p className="text-3xl font-black text-on-surface">{stat.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Alerts */}
            <div className="mt-16 pt-16 border-t border-primary/10">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-8">Atmospheric Alerts</p>
              <div className="grid md:grid-cols-2 gap-6">
                {alerts.map((alert, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-primary/5 border border-primary/10 flex items-center gap-6 group hover:bg-primary/10 transition-colors">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-lg">
                      {alert.type === 'Wind' ? <Wind size={24} /> : <CloudRain size={24} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">{alert.type} Alert</span>
                        <span className="w-1 h-1 rounded-full bg-primary/40" />
                        <span className="text-[9px] font-bold text-on-surface-variant opacity-60">{alert.time}</span>
                      </div>
                      <p className="text-sm font-black text-on-surface">{alert.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-2 space-y-4">
            {[
              { day: 'MON', temp: '26°', icon: Sun, label: 'Optimal Sun' },
              { day: 'TUE', temp: '22°', icon: CloudRain, label: 'Natural Rain' },
              { day: 'WED', temp: '25°', icon: Cloud, label: 'Cloud Cover' },
              { day: 'THU', temp: '27°', icon: Sun, label: 'Peak UV' },
              { day: 'FRI', temp: '24°', icon: Cloud, label: 'Mild Humidity' }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between p-8 glass-card !border-none !bg-white/60 hover:!bg-primary group transition-all cursor-default"
              >
                <div className="flex items-center gap-10">
                  <p className="text-lg font-black text-on-surface-variant group-hover:text-white/60 w-12">{item.day}</p>
                  <item.icon size={32} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-on-surface group-hover:text-white">{item.temp}</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest opacity-50 group-hover:text-white/60">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const PhaseFieldMapping = () => {
  const [address, setAddress] = useState('Kansas Wheat Fields');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setAddress(searchQuery);
    }
  };

  return (
    <section id="mapping" className="py-40 px-8 relative overflow-hidden bg-[#050B08] rounded-[5rem] mb-20 group text-white">
      <div className="absolute inset-0 z-0">
        <img 
          src="/satellite-bg.png"
          className="w-full h-full object-cover opacity-80 transition-transform duration-[20s] group-hover:scale-105"
          alt="Aerial Farm Land Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050B08]/90 via-transparent to-[#050B08]/90 z-10" />
      </div>
      
      <SectionBackground dots grid />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-24">
          <div className="max-w-2xl">
            <Badge className="bg-white/10 text-white border-white/20">Phase 3.5: Geospatial Core</Badge>
            <h2 className="text-6xl md:text-8xl font-black mb-10 tracking-tight leading-none text-white drop-shadow-2xl">Global <br/><span className="text-primary italic">Satellite</span> Sync</h2>
            <p className="text-2xl text-white/70 font-medium drop-shadow-md">Visualize your land from orbit. Integrate real-time satellite telemetry to track soil moisture and vegetation health across any coordinate.</p>
          </div>
          
          <form onSubmit={handleSearch} className="w-full max-w-md relative group">
            <input 
              type="text" 
              placeholder="Enter coordinates or farm location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-10 py-6 rounded-3xl bg-white shadow-2xl border border-primary/20 text-on-surface placeholder:text-on-surface/30 focus:border-primary outline-none transition-all font-bold text-lg"
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg shadow-primary/20">
              <Search size={20} />
            </button>
          </form>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="aspect-video w-full rounded-[4rem] overflow-hidden border-[12px] border-white shadow-2xl relative bg-black/10 backdrop-blur-3xl"
        >
          <iframe 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            style={{ border: 0, opacity: 0.9 }}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=k&z=16&ie=UTF8&iwloc=&output=embed`}
            allowFullScreen
          />
          <div className="absolute top-10 left-10 glass-card !p-6 flex items-center gap-5 pointer-events-none">
            <div className="w-4 h-4 rounded-full bg-red-500 animate-ping" />
            <div className="flex flex-col">
              <p className="text-[8px] font-black uppercase text-primary tracking-widest opacity-60">High-Res Uplink</p>
              <p className="text-sm font-black text-on-surface">{address}</p>
            </div>
          </div>
          <div className="absolute bottom-10 right-10 flex gap-4 pointer-events-none">
            <div className="p-4 glass-card !rounded-2xl text-[9px] font-black uppercase tracking-widest text-primary">Lat: 38.627N</div>
            <div className="p-4 glass-card !rounded-2xl text-[9px] font-black uppercase tracking-widest text-primary">Lon: 90.199W</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PhaseWaterMaster = () => {
  const [activeSoil, setActiveSoil] = useState('Loam');
  
  const soilData = {
    'Sandy': { usage: 'High', retention: 'Low', recommendation: '14L/m²', weekly: '98L' },
    'Loam': { usage: 'Medium', retention: 'High', recommendation: '8L/m²', weekly: '56L' },
    'Clay': { usage: 'Low', retention: 'Peak', recommendation: '5L/m²', weekly: '35L' },
    'Silt': { usage: 'Medium-High', retention: 'Moderate', recommendation: '10L/m²', weekly: '70L' },
    'Peat': { usage: 'Very High', retention: 'Ultra', recommendation: '18L/m²', weekly: '126L' },
    'Chalky': { usage: 'Moderate', retention: 'High', recommendation: '9L/m²', weekly: '63L' }
  };

  return (
    <section id="water" className="py-40 px-8 bg-surface overflow-hidden relative">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1590682680695-43b964a3ae17?q=80&w=2070&auto=format&fit=crop"
          className="w-full h-full object-cover opacity-50 brightness-[0.9]"
          alt="Smart Hydration Background"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-surface/80 via-transparent to-surface/80 z-10" />
      </div>
      <SectionBackground grid dots />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-32 items-start">
          <div className="w-full lg:w-1/2 sticky top-40">
            <Badge>Phase 4: Smart Hydration</Badge>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-black leading-[0.9] mb-12 tracking-tight"
            >
              Orchestrating <br/><span className="text-primary italic underline decoration-primary/20">The Flow.</span>
            </motion.h2>
            
            <GlassCard className="!p-12 mb-10 border-primary/20 bg-primary/5">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h4 className="font-black text-on-surface uppercase tracking-[0.2em] text-[10px] mb-2">Recommended Intake</h4>
                  <p className="text-4xl font-black text-primary">{soilData[activeSoil].recommendation}</p>
                </div>
                <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-xl">
                  <Droplets className="text-primary animate-bounce" size={32} />
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                   <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Soil Hydration Status</p>
                   <p className="text-sm font-black text-on-surface">{soilData[activeSoil].retention} Retention</p>
                </div>
                <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: 
                      activeSoil === 'Peat' ? "100%" : 
                      activeSoil === 'Clay' ? "85%" : 
                      activeSoil === 'Silt' || activeSoil === 'Chalky' ? "70%" : 
                      activeSoil === 'Loam' ? "60%" : "30%" 
                    }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>
            </GlassCard>

            <div className="grid grid-cols-2 gap-8">
               <div className="p-8 glass-card !rounded-3xl border-none">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-3">Weekly Forecast</p>
                  <p className="text-3xl font-black text-on-surface">{soilData[activeSoil].weekly}</p>
               </div>
               <div className="p-8 glass-card !rounded-3xl border-none">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-3">Monthly Pulse</p>
                  <p className="text-3xl font-black text-primary">{(parseInt(soilData[activeSoil].weekly) * 4.2).toFixed(0)}L</p>
               </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 space-y-12">
            <div className="glass-card !p-12 bg-white/60">
              <h3 className="text-3xl font-black mb-8">Soil Hydration Index</h3>
              <div className="flex flex-wrap gap-4 mb-10">
                {Object.keys(soilData).map(type => (
                  <button 
                    key={type}
                    onClick={() => setActiveSoil(type)}
                    className={cn(
                      "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all mb-2",
                      activeSoil === type ? "bg-primary text-white shadow-xl shadow-primary/30 scale-105" : "bg-white text-on-surface-variant hover:bg-white/80"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
              
              <div className="space-y-8">
                {[
                  { label: 'Avg Hourly Flow', val: activeSoil === 'Sandy' ? '12.4L' : activeSoil === 'Loam' ? '8.2L' : '4.5L' },
                  { label: 'Absorption Rate', val: activeSoil === 'Sandy' ? 'High' : 'Moderate', color: 'text-primary' },
                  { label: 'Ideal Ph Level', val: '6.5 - 7.2' }
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center py-6 border-b border-primary/5">
                    <p className="text-sm font-bold text-on-surface-variant opacity-60 uppercase tracking-widest">{row.label}</p>
                    <p className={cn("text-xl font-black", row.color || "text-on-surface")}>{row.val}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group perspective">
              <motion.div 
                className="rounded-[4rem] overflow-hidden shadow-2xl relative border-[12px] border-white/60 backdrop-blur-3xl"
                whileHover={{ rotateY: -5, scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 via-transparent to-white/20 z-10" />
                <img 
                  alt="Irrigation Technology" 
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-[2s]" 
                  src="https://images.unsplash.com/photo-1590682680695-43b964a3ae17?q=80&w=2000&auto=format&fit=crop"
                />
                <div className="absolute inset-x-10 bottom-10 p-10 glass-card !bg-white/95 border-none shadow-2xl z-20">
                  <div className="flex justify-between items-end">
                    <div>
                      <Badge className="mb-4">Live Hub: Delta-8</Badge>
                      <p className="text-3xl font-black text-on-surface leading-none mb-2">Weekly Usage</p>
                      <p className="text-xs font-bold text-primary uppercase tracking-widest">Optimized for {activeSoil}</p>
                    </div>
                    
                    {/* Tiny Chart */}
                    <div className="flex gap-2 items-end">
                      {[40, 70, 55, 90, 65, 85, 100].map((h, i) => (
                        <motion.div 
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: i * 0.1, duration: 1 }}
                          className="w-2 bg-primary rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PhaseSecureAccess = () => (
  <section id="secure" className="py-40 px-8 bg-surface-container-low rounded-[5rem] mb-20 relative overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=2070&auto=format&fit=crop"
        className="w-full h-full object-cover opacity-40 grayscale brightness-75"
        alt="Security Background"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-surface-container-low/80 via-transparent to-surface-container-low/80 z-10" />
    </div>
    <div className="max-w-7xl mx-auto flex flex-col items-center">
       <div className="text-center mb-32 max-w-3xl">
         <Badge>Phase 5: Secure Integration</Badge>
         <h2 className="text-6xl md:text-9xl font-black mb-10 tracking-tighter leading-none">Your Data, <br/><span className="text-primary italic">Protected.</span></h2>
         <p className="text-2xl text-on-surface-variant font-medium opacity-60">Industrial-grade encryption for proprietary soil recipes and farm metabolic data.</p>
       </div>
       
       <div className="w-full max-w-5xl grid md:grid-cols-2 gap-16 items-stretch">
         <GlassCard className="flex flex-col justify-between !p-16 !bg-white/80 border-none shadow-2xl">
           <div>
             <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-12 shadow-inner">
               <ShieldCheck className="text-primary" size={36} />
             </div>
             <h3 className="text-4xl font-extrabold mb-8 tracking-tight">Enterprise Shield</h3>
             <p className="text-lg text-on-surface-variant font-medium leading-relaxed mb-12 opacity-80">Full ecosystem security with 256-bit encryption. Your agricultural IP remains strictly confidential.</p>
           </div>
           <ul className="space-y-6">
             {['Biometric Access', 'Hardware Keys', 'Real-time Breach Detection'].map(item => (
               <li key={item} className="flex items-center gap-5 text-[11px] font-black uppercase text-on-surface tracking-[0.2em]">
                 <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_#0D631B]" />
                 {item}
               </li>
             ))}
           </ul>
         </GlassCard>
         
         <div className="signature-gradient rounded-[4rem] p-16 text-white shadow-2xl relative overflow-hidden group perspective">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <Lock className="mb-10 opacity-70" size={48} />
                <h3 className="text-5xl font-black mb-10 leading-[1.1]">Initialize <br/>Executive Access</h3>
                <form 
                  className="space-y-6" 
                  action="https://formsubmit.co/chaigowda057@gmail.com" 
                  method="POST"
                >
                  {/* Honeypot to prevent spam */}
                  <input type="text" name="_honey" style={{ display: 'none' }} />
                  {/* Disable captcha for a smoother experience */}
                  <input type="hidden" name="_captcha" value="false" />
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60 ml-2">Neural ID / Email</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="executive@agrovision.ai"
                      className="w-full px-8 py-6 rounded-3xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:bg-white/20 focus:border-white/40 outline-none transition-all font-medium text-lg backdrop-blur-md"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60 ml-2">Secure Message</label>
                    <textarea 
                      name="message"
                      required
                      placeholder="Transmit your credentials or inquiry..."
                      className="w-full px-8 py-6 rounded-3xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:bg-white/20 focus:border-white/40 outline-none transition-all font-medium text-lg backdrop-blur-md min-h-[120px] resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full bg-white text-primary font-black py-6 rounded-3xl text-sm uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:scale-[1.02] active:scale-95 transition-all mt-6">
                    Authenticate & Send
                  </button>
                </form>
              </div>
              <div className="mt-16 flex items-center justify-center gap-3 opacity-40">
                <div className="w-1 h-1 rounded-full bg-white" />
                <p className="text-[9px] font-bold uppercase tracking-[0.5em]">Secured by AgroVision Core OS</p>
                <div className="w-1 h-1 rounded-full bg-white" />
              </div>
            </div>
            {/* Background motion graphic */}
            <motion.div 
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] border border-white/5 rounded-full z-0"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0A2E12]/80 to-transparent z-0 pointer-events-none" />
         </div>
       </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-surface pt-48 pb-20 px-8 relative overflow-hidden">
    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-24 mb-40">
        <div className="col-span-2">
          <div className="text-4xl font-black tracking-tighter text-on-surface mb-12 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
              <Sprout size={20} />
            </div>
            AgroVision <span className="text-primary italic">AI</span>
          </div>
          <p className="text-on-surface-variant max-w-sm text-xl font-medium leading-relaxed mb-16 opacity-70">
            Pioneering the era of Technological Symbiosis in global agriculture. From root health to satellite insight.
          </p>
          <div className="flex gap-10">
            {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
              <a key={social} href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant hover:text-primary transition-colors">{social}</a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.4em] text-primary mb-12">Ecosystem</h4>
          <ul className="space-y-8">
            {['Soil Intelligence', 'Smart Irrigation', 'Metabolic Dashboard', 'API Access'].map(link => (
              <li key={link}><a href="#" className="text-base font-semibold text-on-surface-variant hover:text-primary transition-colors">{link}</a></li>
            ))}
          </ul>
        </div>
        <div>
           <h4 className="text-[11px] font-bold uppercase tracking-[0.4em] text-primary mb-12">Legal</h4>
           <ul className="space-y-8">
            {['Data Governance', 'Soil Privacy', 'Global Ethics', 'Security Standards'].map(link => (
              <li key={link}><a href="#" className="text-base font-semibold text-on-surface-variant hover:text-primary transition-colors">{link}</a></li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-12 border-t border-primary/10 text-[10px] font-bold uppercase tracking-[0.5em] text-on-surface-variant opacity-40">
        <p>© 2024 AGROVISION AI GLOBAL CORE. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-16">
          <span>Metabolic Service: v4.2.0</span>
          <span>Latency: 14ms (Optic Flow)</span>
        </div>
      </div>
    </div>
  </footer>
);

const Navbar = ({ isOpen, setIsOpen, openAuth }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-6 inset-x-6 z-[100] h-20 max-w-7xl mx-auto flex justify-between items-center px-12 transition-all duration-500 rounded-[2rem]",
        scrolled ? "bg-white/90 backdrop-blur-3xl shadow-2xl border border-white/20 py-4" : "bg-transparent py-8"
      )}
    >
      <div className="text-2xl font-black tracking-tighter text-on-surface flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
          <Leaf size={16} fill="white" />
        </div>
        AgroVision <span className="text-primary italic">AI</span>
      </div>
      
      <div className="hidden lg:flex items-center gap-14">
        {['Welcome', 'Soil', 'Weather', 'Mapping', 'Water', 'Secure'].map(link => (
          <a key={link} href={`#${link.toLowerCase()}`} className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant hover:text-primary transition-all hover:scale-110">
            {link}
          </a>
        ))}
      </div>
      
      <div className="flex items-center gap-8">
         <button onClick={openAuth} className="primary-btn !px-8 !py-4 !rounded-2xl !text-[9px] shadow-primary/10 flex items-center justify-center">Get Access</button>
         <button 
          className="lg:hidden p-3 text-on-surface glass-card !rounded-2xl border-none"
          onClick={() => setIsOpen(!isOpen)}
         >
           {isOpen ? <X size={24} /> : <Menu size={24} />}
         </button>
      </div>
    </motion.nav>
  );
};

const StartupSequence = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2.5, duration: 1 }}
      className="fixed inset-0 z-[999] bg-[#050B08] flex items-center justify-center overflow-hidden pointer-events-none"
    >
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 4, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop"
          className="w-full h-full object-cover opacity-40 mix-blend-screen brightness-75 grayscale-[0.2]"
          alt="Intro Farm Background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B08] via-transparent to-[#050B08] opacity-90" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-primary/10 opacity-60 z-0" />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-6 relative z-10"
      >
        <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center text-white shadow-[0_0_80px_rgba(13,99,27,0.8)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/20 -translate-x-[100%] group-animate-shimmer" />
          <Leaf size={40} className="animate-pulse" strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
            AgroVision <span className="text-primary italic">AI</span>
          </h1>
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
            className="h-px bg-gradient-to-r from-transparent via-primary to-transparent w-full"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mt-6"
          >
            Core Initialization Segment
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const App = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <>
    {/* Phase 1: Startup Animation */}
    {!introComplete && <StartupSequence onComplete={() => setIntroComplete(true)} />}

    {/* Phase 2: Login Gate (shown after intro, before main site) */}
    <AnimatePresence>
      {introComplete && !isAuthenticated && (
        <LoginGate onAuthenticated={handleLogin} />
      )}
    </AnimatePresence>

    {/* Phase 3: Main Website (only after authentication) */}
    <AuthPortal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    <AnimatePresence>
      {isAuthenticated && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="bg-surface font-outfit text-on-surface selection:bg-primary selection:text-white"
        >
          <FloatingSidebar />
          <Navbar isOpen={navOpen} setIsOpen={setNavOpen} openAuth={() => setAuthOpen(true)} currentUser={currentUser} onLogout={handleLogout} />
          
          {/* Mobile Nav Overlay */}
          <AnimatePresence>
            {navOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="fixed inset-0 z-[90] bg-surface/95 backdrop-blur-3xl flex flex-col p-16 lg:hidden"
              >
                <div className="flex flex-col gap-12 mt-32">
                  {['Welcome', 'Soil', 'Weather', 'Mapping', 'Water', 'Secure'].map(link => (
                    <motion.a 
                      key={link} 
                      href={`#${link.toLowerCase()}`} 
                      onClick={() => setNavOpen(false)}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-6xl font-black tracking-tighter text-on-surface hover:text-primary transition-colors"
                    >
                      {link}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <main>
            <PhaseWelcome />
            <PhaseSoilIntelligence />
            <PhaseWeather />
            <PhaseFieldMapping />
            
            {/* Transitional Section: Metabolic Dashboard Stats (Marquee) */}
            <section className="py-24 px-8 bg-surface overflow-hidden border-y border-primary/5 relative">
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface to-transparent z-10" />
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface to-transparent z-10" />
              
              <motion.div 
                className="flex gap-40 items-center whitespace-nowrap"
                animate={{ x: [0, -1500] }}
                whileHover={{ transition: { duration: 60 } }}
                transition={{ 
                  duration: 25, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                {[...Array(4)].map((_, i) => (
                  <React.Fragment key={i}>
                    {[
                      { val: '2.4k', label: 'Monitored Fields' },
                      { val: '64%', label: 'Water Recovery' },
                      { val: '18t', label: 'Yield Increase' },
                      { val: '0.2s', label: 'Analysis Speed' },
                      { val: '98', label: 'Tech Synergy' },
                      { val: '4.5m', label: 'Soil Depth' }
                    ].map((stat, idx) => (
                      <div key={idx} className="flex flex-col items-center group">
                        <h3 className="text-8xl md:text-9xl font-black text-on-surface group-hover:text-primary transition-all tracking-tighter leading-none mb-4">{stat.val}</h3>
                        <p className="text-[11px] font-bold uppercase text-on-surface-variant tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity">{stat.label}</p>
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </motion.div>
            </section>

            <PhaseWaterMaster />
            <PhaseSecureAccess />
          </main>
          
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export default App;
