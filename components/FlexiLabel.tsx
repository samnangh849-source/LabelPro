
import React from 'react';
import { LabelData } from '../types.ts';
import { SmartText, SmartQR } from './SmartElements.tsx';
import { MapPin, Phone, User, Box, ArrowDownRight, Truck, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface FlexiLabelProps {
  data: LabelData;
  qrValue: string;
  isDesignMode: boolean;
}

const FlexiLabel: React.FC<FlexiLabelProps> = ({ data, qrValue, isDesignMode }) => {
  const totalAmount = parseFloat(data.total);
  const paymentLower = data.payment.toLowerCase();
  
  const isPaid = paymentLower.includes('paid') && !paymentLower.includes('unpaid');
  const isCOD = !isPaid && totalAmount > 0;
  
  // Dynamic Font Size logic for Address
  const getAddressBaseSize = (text: string) => {
    const len = text.length;
    if (len > 120) return 7;
    if (len > 80) return 8;
    if (len > 40) return 9;
    return 10;
  };

  return (
    <div className="flex flex-col w-[60mm] h-[80mm] bg-white text-black font-sans relative box-border overflow-hidden">
        
        {/* TOP DECORATIVE BAR */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-black z-10"></div>

        {/* 1. HEADER & STORE IDENTITY */}
        <div className="px-3 pt-3.5 pb-2 flex justify-between items-start shrink-0">
            <div className="flex flex-col">
                <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-5 h-5 bg-black rounded-md flex items-center justify-center text-white">
                        <Box size={10} strokeWidth={3} />
                    </div>
                    <SmartText isDesignMode={isDesignMode} initialValue={data.store} baseSize={10} bold font="sans" className="uppercase tracking-tight leading-none" />
                </div>
                <div className="pl-1">
                     <SmartText isDesignMode={isDesignMode} initialValue={data.id} baseSize={8} font="mono" className="text-black/50 font-bold" />
                </div>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[5pt] font-bold text-black/30 uppercase tracking-wider">Created</span>
                <SmartText isDesignMode={isDesignMode} initialValue={data.date} baseSize={6.5} font="mono" bold />
            </div>
        </div>

        {/* 2. MAIN LOGISTICS CARD (LOCATION & ADDRESS) */}
        <div className="mx-2 bg-gray-100 rounded-2xl p-3 flex flex-col gap-1 relative overflow-hidden group grow-0">
            {/* Background decoration */}
            <div className="absolute -right-2 -top-2 text-gray-200 pointer-events-none">
                <MapPin size={48} strokeWidth={1.5} />
            </div>

            <div className="relative z-10">
                <span className="text-[5pt] font-black uppercase text-black/40 tracking-widest mb-0.5 block">Zone / Location</span>
                <SmartText 
                    isDesignMode={isDesignMode} 
                    initialValue={data.location} 
                    baseSize={16} 
                    bold 
                    font="sans" 
                    className="uppercase leading-[0.9] tracking-tight text-black" 
                />
            </div>
            
            <div className="relative z-10 mt-1 pt-1.5 border-t border-black/5">
                <div className="flex items-start gap-1">
                    <ArrowDownRight size={10} className="text-black/40 mt-0.5 shrink-0" />
                    <SmartText 
                        isDesignMode={isDesignMode} 
                        initialValue={data.address} 
                        baseSize={getAddressBaseSize(data.address)} 
                        font="sans" 
                        block 
                        className="text-black/70 leading-snug font-medium" 
                    />
                </div>
            </div>
        </div>

        {/* 3. RECIPIENT INFO */}
        <div className="px-4 py-1.5 flex flex-col gap-1 shrink-0">
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                    <User size={8} className="text-black/60" />
                </div>
                <SmartText isDesignMode={isDesignMode} initialValue={data.name} baseSize={10} bold font="sans" className="uppercase" />
            </div>
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                    <Phone size={8} className="text-black/60" />
                </div>
                <SmartText isDesignMode={isDesignMode} initialValue={data.phone} baseSize={11} bold font="sans" />
            </div>
        </div>

        {/* 4. FOOTER GRID (QR & PAYMENT) */}
        <div className="mt-auto m-2 h-[26mm] grid grid-cols-[1fr_1.1fr] gap-2 shrink-0">
            
            {/* QR MODULE - MAXIMIZED */}
            <div className="bg-white border-2 border-black rounded-xl flex items-center justify-center relative overflow-hidden p-0.5">
                <SmartQR value={qrValue} baseSize={58} isDesignMode={isDesignMode} />
            </div>

            {/* PRICE & LOGISTICS MODULE */}
            <div className="flex flex-col justify-between h-full">
                
                {/* Shipping Method Row */}
                <div className="flex items-center gap-1.5 px-1 pt-1">
                    <Truck size={12} className="text-black/60" />
                    <div className="flex flex-col leading-none">
                        <span className="text-[4pt] font-bold uppercase text-black/40 tracking-wider">Method</span>
                        <SmartText isDesignMode={isDesignMode} initialValue={data.shipping} baseSize={8} bold font="sans" className="uppercase truncate w-[24mm]" />
                    </div>
                </div>

                {/* Status Box */}
                <div className={`rounded-xl p-2 flex flex-col justify-center relative overflow-hidden border ${isCOD ? 'bg-black text-white border-black' : (isPaid ? 'bg-white text-black border-black' : 'bg-gray-50 border-gray-200')}`}>
                    
                    {/* COD / STATUS INDICATOR */}
                    <div className="absolute top-1.5 right-1.5">
                         {isCOD && <AlertTriangle size={14} className="text-white animate-pulse" strokeWidth={3} />}
                         {isPaid && <CheckCircle2 size={14} className="text-green-600" strokeWidth={3} />}
                    </div>

                    <div className="flex flex-col">
                        <span className={`text-[4.5pt] font-bold uppercase tracking-widest ${isCOD ? 'text-white/60' : 'text-black/40'}`}>
                            {isCOD ? 'COD Amount' : 'Total Value'}
                        </span>
                        <div className="flex items-baseline gap-0.5">
                            <span className={`text-[9pt] font-medium ${isCOD ? 'text-white/60' : 'text-black/40'}`}>$</span>
                            <SmartText isDesignMode={isDesignMode} initialValue={data.total} baseSize={22} bold font="sans" className="tracking-tighter leading-none" />
                        </div>
                    </div>
                    
                    {/* COD Label Text */}
                    {isCOD && (
                        <div className="absolute bottom-1 right-2 bg-white text-black text-[5pt] font-black px-1 rounded uppercase tracking-wider">
                            Collect
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default FlexiLabel;
