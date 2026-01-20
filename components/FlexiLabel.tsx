
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
  
  // Logic 1: Auto-scale Location (Province) based on text length
  const getLocationBaseSize = (text: string) => {
    const len = text.length;
    if (len <= 3) return 28; // Very short (e.g. KEP) -> Huge
    if (len <= 6) return 24; // Short (e.g. Takeo) -> Big
    if (len <= 10) return 18; // Medium (e.g. Phnom Penh)
    return 14; // Long -> Standard
  };

  // Logic 2: Address fits 1 or 2 lines
  const getAddressBaseSize = (text: string) => {
    const len = text.length;
    if (len > 100) return 7;
    if (len > 60) return 8; // Likely 2 lines
    if (len > 30) return 9; // Likely 1-2 lines
    return 10; // 1 line
  };

  return (
    <div className="flex flex-col w-[60mm] h-[80mm] bg-white text-black font-sans relative box-border overflow-hidden">
        
        {/* TOP DECORATIVE BAR */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-black z-10"></div>

        {/* 1. HEADER & STORE IDENTITY - Highly compressed to give max space to Zone BG */}
        <div className="px-3 pt-2 pb-0.5 flex justify-between items-start shrink-0">
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
        {/* Changed from bg-gray-100 to bg-black for bolder look per request */}
        <div className="mx-1 bg-black rounded-2xl p-3 flex flex-col justify-center relative overflow-hidden group grow min-h-0 text-white">
            {/* Background decoration */}
            <div className="absolute -right-2 -top-2 text-white/10 pointer-events-none">
                <MapPin size={48} strokeWidth={1.5} />
            </div>

            <div className="relative z-10 flex flex-col">
                <span className="text-[5pt] font-black uppercase text-white/50 tracking-widest mb-0.5 block">Zone / Location</span>
                {/* Auto-scaling Location */}
                <SmartText 
                    isDesignMode={isDesignMode} 
                    initialValue={data.location} 
                    baseSize={getLocationBaseSize(data.location)} 
                    bold 
                    font="sans" 
                    className="uppercase leading-[0.85] tracking-tight text-white mb-0.5" 
                />
            </div>
            
            <div className="relative z-10 pt-0.5 border-t border-white/20">
                <div className="flex items-start gap-1">
                    <ArrowDownRight size={10} className="text-white/50 mt-1 shrink-0" />
                    {/* Address handles 1 or 2 lines naturally via standard flow and line-height */}
                    {/* Added BOLD as requested */}
                    <SmartText 
                        isDesignMode={isDesignMode} 
                        initialValue={data.address} 
                        baseSize={getAddressBaseSize(data.address)} 
                        font="sans" 
                        bold
                        block 
                        className="text-white/90 leading-tight" 
                    />
                </div>
            </div>
        </div>

        {/* 3. RECIPIENT INFO & COD INDICATOR */}
        {/* Reduced px-4 to px-2 to move content left */}
        <div className="px-2 py-1.5 flex justify-between items-center shrink-0">
            <div className="flex flex-col gap-1">
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
            
            {/* LARGE COD SIGN (Only if Unpaid) */}
            {isCOD && (
                 <div className="flex items-center justify-center pr-1">
                    <SmartText 
                        isDesignMode={isDesignMode} 
                        initialValue="(COD)" 
                        baseSize={16} 
                        bold 
                        font="sans" 
                        className="font-black tracking-tighter text-black"
                    />
                </div>
            )}
        </div>

        {/* 4. FOOTER GRID (QR & PAYMENT) */}
        <div className="mt-auto m-2 h-[28mm] grid grid-cols-[1fr_1.3fr] gap-2 shrink-0">
            
            {/* QR MODULE - Custom Border & Text */}
            <div className="bg-white border border-black rounded-xl flex flex-col items-center justify-center relative overflow-hidden pt-1 pb-0.5">
                {/* Maximized QR Size */}
                <div className="grow flex items-center justify-center -mt-1">
                   <SmartQR value={qrValue} baseSize={72} isDesignMode={isDesignMode} />
                </div>
                {/* Driver Scan Text */}
                <span className="text-[4.5pt] font-bold uppercase tracking-wider text-black leading-none pb-0.5">(Driver Scan)</span>
            </div>

            {/* PRICE & STATUS MODULE */}
            <div className={`rounded-xl border flex flex-col relative overflow-hidden transition-colors duration-200 
                ${isCOD 
                    ? 'bg-black border-black text-white' 
                    : 'bg-white border-black text-black'
                }`}>
                
                {/* Method Header */}
                <div className={`px-2 py-1 flex items-center gap-1.5 border-b border-dashed ${isCOD ? 'border-white/20' : 'border-black/10'}`}>
                    <Truck size={10} className={isCOD ? 'text-white/60' : 'text-black/60'} />
                    <SmartText isDesignMode={isDesignMode} initialValue={data.shipping} baseSize={7} bold font="sans" className={`uppercase truncate ${isCOD ? 'text-white/80' : 'text-black/80'}`} />
                </div>

                {/* Main Price Area */}
                <div className="flex-1 flex flex-col items-center justify-center pb-1">
                    <span className={`text-[4.5pt] font-bold uppercase tracking-[0.2em] mb-0.5 ${isCOD ? 'text-white/50' : 'text-black/40'}`}>
                        {isCOD ? 'Collect Amount' : 'Total Amount'}
                    </span>
                    
                    <div className="flex items-baseline gap-0.5">
                        <span className={`text-[10pt] font-bold ${isCOD ? 'text-white' : 'text-black'}`}>$</span>
                        <SmartText isDesignMode={isDesignMode} initialValue={data.total} baseSize={20} bold font="sans" className="tracking-tighter leading-none" />
                    </div>

                    {/* STATUS BADGE - REMOVED COLORS, STRICTLY B&W */}
                    <div className={`mt-1 px-3 py-1 rounded-full flex items-center gap-1.5 border ${
                        isCOD 
                            ? 'bg-white border-white text-black' 
                            : 'bg-white border-black text-black'
                    }`}>
                        {isCOD ? <AlertTriangle size={12} fill="currentColor" className="text-black" /> : <CheckCircle2 size={12} className="text-black" />}
                        <span className="text-[9pt] font-black uppercase tracking-wider leading-none">
                            {isCOD ? 'UNPAID' : 'PAID'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default FlexiLabel;
