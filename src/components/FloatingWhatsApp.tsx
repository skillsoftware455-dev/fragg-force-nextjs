import React, { useState } from 'react';
import { MessageSquare, Phone, Mail, X, Sparkles, Send, ShieldCheck, HelpCircle, ChevronDown, ChevronUp, Compass, Truck } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab ] = useState<'concierge' | 'faq'>('concierge');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const contactName = "Waqas Shah";
  const contactEmail = "digitalnova516@gmail.com";
  const contactPhone = "+92 323 3260083";
  const formattedPhone = "923233260083";

  // Pre-filled message templates
  const supportMsg = encodeURIComponent("Hello Fragg Force,\n\nI am interested in exploring your luxury perfume collection. Please guide me through your signature scents.");
  const orderMsg = encodeURIComponent("Hello Fragg Force,\n\nI would like to make an inquiry regarding my order coordinates.");
  const productMsg = encodeURIComponent("Hello Fragg Force,\n\nI have a custom product inquiry regarding decant availability.");

  // FAQ items regarding Fragrance Families and Shipping Policies
  const faqs = [
    {
      category: 'Fragrance Families',
      icon: <Compass size={12} className="text-amber-500 flex-shrink-0" />,
      question: "What are the primary fragrance families?",
      answer: "We classify our signature scents into four core families: Woody (rich sandalwood, cedarwood & patchouli), Oriental (warm amber, sweet vanilla & exotic spices), Fresh (bright citrus, aquatic, ozonic & marine accords), and Floral (sweet botanical rose, jasmine & elegant white blossoms)."
    },
    {
      category: 'Fragrance Families',
      icon: <Compass size={12} className="text-amber-500 flex-shrink-0" />,
      question: "How do I choose the right decant volume?",
      answer: "Every blend comes in calibrated sizes: 50ml represents a lighter travel-size sampling, 150ml is tailored for a standard signature rotation, and 250ml provides the most supreme sillage volume for dedicated collectors."
    },
    {
      category: 'Shipping Policies',
      icon: <Truck size={12} className="text-amber-500 flex-shrink-0" />,
      question: "Where do you ship and what are the fees?",
      answer: "We offer worldwide premium tracked shipping. Delivery logistics are completely FREE for order values exceeding $400. Below that threshold, shipping is a flat conversion of $25 with an additional $8 transit insurance package for safe arrival."
    },
    {
      category: 'Shipping Policies',
      icon: <Truck size={12} className="text-amber-500 flex-shrink-0" />,
      question: "How fast is delivery and how do I track?",
      answer: "Domestic express courier takes 2-3 business days. International air cargo typically takes 5-7 business days. A dedicated real-time tracker and tracking code are provided on the Order Tracking page immediately upon fulfillment dispatch."
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 print:hidden font-sans">
      
      {/* EXPANDED LUXURY SUPPORT CARDS */}
      {isOpen ? (
        <div className="mb-4 w-76 sm:w-80 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 shadow-2xl relative overflow-hidden transition-all duration-300">
          
          {/* Accent Gold top strip */}
          <div className="h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-800"></div>

          {/* Header */}
          <div className="p-4 bg-neutral-950 text-white flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <div>
                <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-white">Maison Concierge</h4>
                <p className="text-[8px] font-mono uppercase text-amber-500 tracking-wider font-bold">Waqas Shah Concierge Lead</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 px-1.5 bg-white/10 hover:bg-white/20 text-neutral-400 hover:text-white transition-colors"
            >
              <X size={12} />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-neutral-200 dark:border-neutral-900 bg-stone-50 dark:bg-neutral-950">
            <button
              onClick={() => setActiveTab('concierge')}
              className={`flex-1 py-2 text-[10px] font-mono font-bold uppercase tracking-wider transition-colors flex items-center justify-center space-x-1.5 border-b-2 cursor-pointer ${
                activeTab === 'concierge'
                  ? 'border-amber-500 text-neutral-950 dark:text-amber-500 bg-white dark:bg-neutral-900/40 font-black'
                  : 'border-transparent text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-transparent'
              }`}
            >
              <MessageSquare size={10} />
              <span>Concierge</span>
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`flex-1 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider transition-colors flex items-center justify-center space-x-1.5 border-b-2 cursor-pointer ${
                activeTab === 'faq'
                  ? 'border-amber-500 text-neutral-950 dark:text-amber-500 bg-white dark:bg-neutral-900/40 font-black'
                  : 'border-transparent text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-transparent'
              }`}
            >
              <HelpCircle size={10} />
              <span>FAQ Desk</span>
            </button>
          </div>

          {activeTab === 'concierge' ? (
            <div className="p-4 space-y-4">
              
              {/* Direct Support Profile block */}
              <div className="flex items-start space-x-3 bg-stone-50 dark:bg-neutral-900/40 p-3 border border-neutral-150 dark:border-neutral-900">
                <div className="w-10 h-10 rounded-full border border-amber-500/30 bg-amber-500/10 flex items-center justify-center font-serif text-sm font-bold text-amber-500 flex-shrink-0">
                  WS
                </div>
                <div className="text-[11px] leading-snug text-neutral-600 dark:text-neutral-400">
                  <span className="font-serif font-bold text-neutral-900 dark:text-white block">{contactName}</span>
                  <p className="font-light">Ready to formulate your signature cologne, review order statuses, or guide decant sizes.</p>
                </div>
              </div>

              {/* Inquiries Action grid */}
              <div className="space-y-2 text-[10px] font-mono uppercase tracking-wider">
                
                <a 
                  href={`https://wa.me/${formattedPhone}?text=${supportMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 bg-neutral-950 dark:bg-neutral-900 hover:bg-amber-500 group transition-all text-white hover:text-neutral-950 border border-neutral-800 dark:border-neutral-800 cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:bg-neutral-950"></span>
                    <span className="font-bold">General Sillage Inquiry</span>
                  </div>
                  <Send size={11} className="text-amber-500 group-hover:text-neutral-950" />
                </a>

                <a 
                  href={`https://wa.me/${formattedPhone}?text=${orderMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 bg-neutral-950 dark:bg-neutral-900 hover:bg-amber-500 group transition-all text-white hover:text-neutral-950 border border-neutral-800 dark:border-neutral-800 cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:bg-neutral-950"></span>
                    <span className="font-bold">Order Tracking Help</span>
                  </div>
                  <Send size={11} className="text-amber-500 group-hover:text-neutral-950" />
                </a>

                <a 
                  href={`https://wa.me/${formattedPhone}?text=${productMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 bg-neutral-950 dark:bg-neutral-900 hover:bg-amber-500 group transition-all text-white hover:text-neutral-950 border border-neutral-800 dark:border-neutral-800 cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:bg-neutral-950"></span>
                    <span className="font-bold">Custom Product Advice</span>
                  </div>
                  <Send size={11} className="text-amber-500 group-hover:text-neutral-950" />
                </a>

              </div>

              <div className="w-full h-px bg-neutral-100 dark:bg-neutral-900"></div>

              {/* Email and Calling Links Column */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono uppercase font-bold text-center">
                
                <a 
                  href={`tel:${formattedPhone}`}
                  className="p-2 bg-stone-100 dark:bg-neutral-950 hover:bg-neutral-200 dark:hover:bg-neutral-900 text-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-850 flex items-center justify-center space-x-1.5 cursor-pointer"
                  title="Call phone dialer"
                >
                  <Phone size={11} className="text-amber-500" />
                  <span>Call Concierge</span>
                </a>

                <a 
                  href={`mailto:${contactEmail}`}
                  className="p-2 bg-stone-100 dark:bg-neutral-950 hover:bg-neutral-200 dark:hover:bg-neutral-900 text-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-850 flex items-center justify-center space-x-1.5 cursor-pointer"
                  title="Open default mail client"
                >
                  <Mail size={11} className="text-amber-500" />
                  <span>Mail Curator</span>
                </a>

              </div>

            </div>
          ) : (
            <div className="p-4 space-y-3.5 max-h-[300px] overflow-y-auto scrollbar-thin">
              <div className="text-[10px] font-mono uppercase text-neutral-400 dark:text-neutral-500 flex items-center justify-between font-bold border-b border-neutral-100 dark:border-neutral-900 pb-1.5">
                <span>Direct Support Desk FAQ</span>
                <Sparkles size={10} className="text-amber-500 animate-pulse" />
              </div>

              <div className="space-y-2">
                {faqs.map((faq, idx) => {
                  const isExpanded = openFaqIndex === idx;
                  return (
                    <div 
                      key={idx} 
                      className="border border-neutral-150 dark:border-neutral-900/60 transition-all font-sans rounded-lg overflow-hidden bg-neutral-50/50 dark:bg-neutral-950/20"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isExpanded ? null : idx)}
                        className="w-full p-2.5 flex items-center justify-between text-left hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="flex-shrink-0">{faq.icon}</span>
                          <div>
                            <span className="text-[8px] font-mono uppercase font-bold text-amber-600 dark:text-amber-500/80 block leading-none mb-0.5 tracking-wider">
                              {faq.category}
                            </span>
                            <span className="text-[11px] font-semibold text-neutral-800 dark:text-neutral-200 leading-snug">
                              {faq.question}
                            </span>
                          </div>
                        </div>
                        <span className="text-neutral-400 flex-shrink-0 pl-1">
                          {isExpanded ? <ChevronUp size={12} className="text-amber-500" /> : <ChevronDown size={12} />}
                        </span>
                      </button>
                      
                      {isExpanded && (
                        <div className="p-2.5 pt-1.5 text-[10.5px] leading-relaxed text-neutral-600 dark:text-neutral-400 font-light border-t border-dashed border-neutral-150 dark:border-neutral-900 bg-white dark:bg-neutral-950/80 animate-fade-in">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <p className="text-[9.5px] text-center text-neutral-450 dark:text-neutral-500 italic mt-2 leading-relaxed">
                Have individual queries? Switch back to the Concierge tab to initiate customized live guidance.
              </p>
            </div>
          )}

          {/* Footer security badge */}
          <div className="bg-neutral-50 dark:bg-neutral-950 p-2.5 px-4 text-[9px] font-mono text-neutral-400 dark:text-neutral-500 flex items-center gap-1 border-t border-neutral-150 dark:border-neutral-900">
            <ShieldCheck size={9} className="text-amber-500 flex-shrink-0" />
            <span>Antoine De Bary Cryptographic Support Secured</span>
          </div>

        </div>
      ) : null}

      {/* FLOATING SPHERICAL TRIGGER BUBBLE */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative group w-14 h-14 rounded-full bg-neutral-950 hover:bg-amber-500 text-amber-500 hover:text-neutral-950 shadow-2xl flex items-center justify-center border border-amber-500/30 transition-all duration-300 cursor-pointer active:scale-95"
        title="Open Support"
        aria-label="Open support panel"
      >
        {/* Pulsing ring waves effect */}
        <span className="absolute inset-0 rounded-full border border-amber-500/30 group-hover:border-neutral-950/30 animate-ping opacity-60"></span>
        <span className="absolute inset-0.5 rounded-full border-2 border-emerald-500 opacity-20"></span>
        
        {isOpen ? (
          <X size={20} className="transform rotate-0 group-hover:rotate-90 transition-transform" />
        ) : (
          <div className="relative">
            <MessageSquare size={20} />
            {/* Small active online badge green sphere */}
            <span className="absolute -top-1 -right-1 block w-2.5 h-2.5 rounded-full bg-emerald-500 border border-neutral-950 animate-pulse"></span>
          </div>
        )}
      </button>

    </div>
  );
};
