import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Compass, 
  ExternalLink, 
  Send, 
  CheckCircle2, 
  Award, 
  Clock, 
  MessageSquare 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Inquiry & Restock Match');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Generate reference number for submissions
  const submissionRef = `MSG-${Math.floor(100000 + Math.random() * 900000)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
    }, 1200);
  };

  const mapLink = "https://maps.app.goo.gl/3MeQJXf7FiRrtY2Q8";

  return (
    <div className="w-full bg-white dark:bg-black transition-colors duration-300 py-12 md:py-20 px-4 sm:px-6 lg:px-8" id="contact-view">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex justify-center">
            {/* Established Member Couture Badge */}
            <span className="inline-flex items-center space-x-2 px-4 py-2 bg-neutral-950 dark:bg-neutral-900 border border-amber-500/30 text-amber-500 rounded-full text-[10px] font-mono tracking-[0.25em] uppercase font-black shadow-md">
              <Award size={12} className="text-amber-500 animate-pulse" />
              <span>Established Member Couture</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black italic tracking-tight text-neutral-950 dark:text-white mt-4">
            Contact Waqas Shah <span className="text-amber-500 font-extrabold not-italic">Perfumes</span>
          </h1>
          
          <p className="text-xs sm:text-sm text-neutral-510 dark:text-neutral-400 font-sans font-light leading-relaxed max-w-2xl mx-auto">
            Experience absolute sensory excellence. Visit our couture commercial hub in Karachi, Pakistan, or reach out to our lead curator for customized fragrance consultations.
          </p>
        </div>

        {/* Main 2-Column Information & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LHS Column: Contact Information Cards & Interactive Map Section */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="bg-neutral-50 dark:bg-neutral-955/30 border border-neutral-100 dark:border-neutral-900 p-6 sm:p-8 rounded-3xl space-y-6">
              <h3 className="font-serif text-lg font-bold text-neutral-950 dark:text-white tracking-tight border-b border-neutral-200/50 dark:border-neutral-850 pb-3">
                Concierge Contact Desk
              </h3>

              {/* Informational Cards */}
              <div className="space-y-4">
                
                {/* 1. Location */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-mono text-neutral-400 block">Atelier Location</span>
                    <span className="text-xs font-sans font-semibold text-neutral-800 dark:text-neutral-200 mt-1 block">
                      Karachi, Pakistan
                    </span>
                    <p className="text-[11px] text-neutral-450 dark:text-neutral-500 mt-0.5 leading-relaxed">
                      Main Commercial Hub / Flagship Boutique
                    </p>
                  </div>
                </div>

                {/* 2. Direct Mail */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-mono text-neutral-400 block">Email Support</span>
                    <a 
                      href="mailto:digitalnova516@gmail.com"
                      className="text-xs font-mono font-bold text-neutral-850 dark:text-neutral-100 hover:text-amber-500 transition-colors mt-1 block"
                    >
                      digitalnova516@gmail.com
                    </a>
                    <p className="text-[11px] text-neutral-450 dark:text-neutral-500 mt-0.5 leading-relaxed">
                      Sillage match, complaints & wholesale inquiries
                    </p>
                  </div>
                </div>

                {/* 3. Phone */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-mono text-neutral-400 block">Direct Concierge Call</span>
                    <a 
                      href="tel:+923233260083" 
                      className="text-xs font-mono font-bold text-neutral-850 dark:text-neutral-100 hover:text-amber-500 transition-colors mt-1 block"
                    >
                      +92 323 3260083
                    </a>
                    <p className="text-[11px] text-neutral-450 dark:text-neutral-500 mt-0.5">
                      Mon &ndash; Sat, 10:00 AM &ndash; 8:00 PM (GMT+5)
                    </p>
                  </div>
                </div>

                {/* 4. WhatsApp Support */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-mono text-neutral-400 block">WhatsApp Sillage Support</span>
                    <a 
                      href="https://wa.me/923233260083"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 hover:underline mt-1 block"
                    >
                      +92 323 3260083
                    </a>
                    <p className="text-[11px] text-neutral-450 dark:text-neutral-500 mt-0.5 leading-relaxed">
                      Instant stock updates & dispatch confirmations
                    </p>
                  </div>
                </div>

              </div>

              {/* Consultation Hours banner */}
              <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl flex items-start space-x-3 text-xs leading-relaxed">
                <Clock size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <div className="text-neutral-600 dark:text-neutral-400">
                  <p className="font-bold text-neutral-850 dark:text-neutral-200">Guaranteed Boutique Response</p>
                  <p className="text-[11px] mt-0.5">Physical showrooms and shipping warehouses operated under precise lead supervision of founder Waqas Shah.</p>
                </div>
              </div>
            </div>

          </div>

          {/* RHS Column: Luxury Contact Form with complete visual feedback */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-neutral-950/40 border border-neutral-150 dark:border-neutral-900 p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm">
              <div className="border-b border-neutral-100 dark:border-neutral-900 pb-4">
                <h3 className="font-serif text-lg font-bold text-neutral-950 dark:text-white">Send Sillage Message</h3>
                <p className="text-xs text-neutral-500 mt-1">Our customer experience agents review every boutique inquiry within 3 hours.</p>
              </div>

              {formSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 text-center bg-emerald-500/5 border border-emerald-500/20 rounded-2xl space-y-4"
                >
                  <div className="w-12 h-12 bg-emerald-500 text-neutral-950 rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 size={24} className="stroke-[2.5]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-base font-bold text-neutral-900 dark:text-white">Message Dispatched Seamlessly!</h4>
                    <p className="text-xs text-neutral-500">Subject: <span className="font-mono text-neutral-800 dark:text-neutral-200">{subject}</span></p>
                    <p className="text-xs mt-3 max-w-md mx-auto text-neutral-500 leading-relaxed">
                      Thank you for contacting Waqas Shah Perfumes, <span className="font-bold text-neutral-900 dark:text-white">{name}</span>. We successfully queued your request. Standard response timeline is 3 business hours.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-200/50 dark:border-neutral-900/60 max-w-xs mx-auto text-[10px] font-mono text-neutral-400">
                    <p>INQUIRY REFERENCE CODE</p>
                    <p className="font-bold text-amber-500 text-xs mt-1 tracking-widest">{submissionRef}</p>
                  </div>

                  <button 
                    onClick={() => {
                      setFormSubmitted(false);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="mt-4 px-4 py-2 border border-neutral-200 dark:border-neutral-850 hover:border-amber-500/30 text-neutral-60s dark:text-neutral-300 text-xs font-mono font-bold uppercase tracking-wider rounded cursor-pointer transition"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 font-sans">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider font-bold block">
                        Your Noble Name
                      </label>
                      <input 
                        type="text" 
                        id="contact-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Lady Seraphina"
                        className="w-full text-xs p-3 bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-850 rounded text-neutral-950 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider font-bold block">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        id="contact-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. digitalnova516@gmail.com"
                        className="w-full text-xs p-3 bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-850 rounded text-neutral-950 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-phone" className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider font-bold block">
                        Contact Phone (Optional)
                      </label>
                      <input 
                        type="tel" 
                        id="contact-phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +92 323 3260083"
                        className="w-full text-xs p-3 bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-850 rounded text-neutral-950 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-subject" className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider font-bold block">
                        Support Option / Department
                      </label>
                      <select 
                        id="contact-subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full text-xs p-3 bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-850 rounded text-neutral-955 dark:text-white focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
                      >
                        <option value="Sillage Restock Match">Sillage Restock Match</option>
                        <option value="Bespoke Order Assistance">Bespoke Order Assistance</option>
                        <option value="Custom Scent Consultations">Custom Scent Consultations</option>
                        <option value="Complaints & Returns Bureau">Complaints & Returns Bureau</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider font-bold block">
                      Fragrance Query Message
                    </label>
                    <textarea 
                      id="contact-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      placeholder="Please note down questions regarding specific aromatic batches, tracking status anomalies, or packaging customizations..."
                      className="w-full text-xs p-3 bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-850 rounded text-neutral-950 dark:text-white focus:outline-none focus:border-amber-500 transition-colors font-sans leading-relaxed"
                      required
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-3.5 bg-neutral-950 hover:bg-amber-500 border border-neutral-900/10 hover:text-neutral-950 text-white font-mono text-xs uppercase font-extrabold tracking-[0.2em] transition-all duration-300 flex items-center justify-center space-x-2 rounded cursor-pointer select-none"
                  >
                    {loading ? (
                      <span className="animate-pulse">Broadcasting coordinates...</span>
                    ) : (
                      <>
                        <Send size={13} />
                        <span>Dispatch Message</span>
                      </>
                    )}
                  </button>

                </form>
              )}
            </div>
          </div>

        </div>

        {/* Fully Interactive Maps Section containing required locational triggers */}
        <div className="bg-neutral-50 dark:bg-neutral-955/20 border border-neutral-100 dark:border-neutral-900 rounded-3xl overflow-hidden shadow-sm" id="maps-module-section">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* LHS: Scent Location Card Details */}
            <div className="p-6 sm:p-8 lg:p-12 lg:col-span-4 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-amber-500 font-bold block">COUTURE SHOWROOM</span>
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-black italic text-neutral-950 dark:text-white">
                    Karachi, Pakistan
                  </h3>
                  <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest font-semibold flex items-center space-x-1.5">
                    <span>Maison Flagship Boutique</span>
                  </p>
                </div>

                <div className="text-xs text-neutral-510 dark:text-neutral-450 space-y-3 leading-relaxed pt-2">
                  <p>Our main operations and sensory consulting halls are established within Karachi, Pakistan, distributing Dior-grade sillage verified perfume cases internationally.</p>
                  <p className="italic font-light">"Providing bespoke sillage customisation on-site with manager Waqas Shah."</p>
                </div>
              </div>

              {/* Action buttons matching exact user instructions */}
              <div className="space-y-2.5 pt-4 border-t border-neutral-250/60 dark:border-neutral-850">
                <a 
                  href={mapLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full flex items-center justify-between p-3 bg-neutral-950 hover:bg-neutral-900 text-white hover:scale-[1.01] rounded text-[10px] transition-all font-mono uppercase font-black tracking-widest text-center shadow-md cursor-pointer"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink size={13} className="text-amber-500" />
                </a>

                <a 
                  href={`https://maps.google.com/?daddr=${encodeURIComponent("Karachi, Pakistan")}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full flex items-center justify-between p-3 bg-white hover:bg-stone-50 border border-neutral-200 hover:border-neutral-400 dark:bg-black dark:hover:bg-neutral-900 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:scale-[1.01] rounded text-[10px] transition-all font-mono uppercase font-black tracking-widest text-center cursor-pointer"
                >
                  <span>Get Directions</span>
                  <Compass size={13} className="text-amber-500" />
                </a>
              </div>
            </div>

            {/* RHS: Interactive Google Map panel */}
            <div className="lg:col-span-8 min-h-[350px] sm:min-h-[450px] relative border-t lg:border-t-0 lg:border-l border-neutral-200/60 dark:border-neutral-900">
              
              <div className="absolute inset-0 z-0 bg-neutral-100 dark:bg-neutral-900">
                {/* Embedded Map iFrame mapping Karachi, Pakistan seamlessly without requiring Google Maps paid billing credits */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115807.56417726526!2d67.001136!3d24.860716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06a12af3b1%3A0x340ac1bb72825a04!2sKarachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1714080182412!5m2!1sen!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true}
                  loading="lazy" 
                  referrerPolicy="no-referrer"
                  title="Waqas Shah Perfume - Karachi Location"
                ></iframe>
              </div>

              {/* Floating location banner overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-neutral-950/90 text-white p-3 border border-amber-500/10 rounded-xl space-y-1 backdrop-blur-md shadow-lg z-10 font-mono text-[10px]">
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping"></span>
                  <p className="font-bold uppercase tracking-wider text-neutral-100">Live Coordinate Verified</p>
                </div>
                <p className="text-[9px] text-neutral-400">Karachi, Pakistan Region &bull; 24.8607° N, 67.0011° E</p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
