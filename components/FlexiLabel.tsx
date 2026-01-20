
import React from 'react';
import { LabelData } from '../types';
import { SmartText, SmartQR } from './SmartElements';
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
  
  // Logic 1: Auto-scale Location (Province)
  const getLocationBaseSize = (text: string) => {
    const len = text.length;
    if (len <= 3) return 34; // Ultra Large (e.g. KHM)
    if (len <= 5) return 29; 
    if (len <= 8) return 25; 
    if (len <= 11) return 21; 
    if (len <= 14) return 18; 
    if (len <= 18) return 15;
    if (len <= 24) return 13;
    return 11; 
  };

  // Logic 2: Address fits STRICTLY 1 or 2 lines
  const getAddressBaseSize = (text: string) => {
    const len = text.length;
    if (len > 130) return 6;   
    if (len > 100) return 7;   
    if (len > 75) return 8;    
    if (len > 50) return 9;    
    if (len > 35) return 10;   
    return 11;                 
  };

  // Logic 3: Auto-scale Shipping Method to prevent overflow
  const getShippingBaseSize = (text: string) => {
    const len = text.length;
    if (len <= 6) return 10;   // Short names (e.g. VET, J&T) - Large & Bold
    if (len <= 10) return 9;   // Standard length
    if (len <= 15) return 8;   // Medium length
    if (len <= 20) return 7;   // Long names
    return 6;                  // Very long names
  };

  return (
    <div className="flex flex-col w-[60mm] h-[80mm] bg-white text-black font-sans relative box-border overflow-hidden">
        
        {/* 1. HEADER & STORE IDENTITY */}
        <div className="px-3 pt-1.5 pb-0 flex justify-between items-start shrink-0">
            <div className="flex flex-col">
                <div className="flex items-center gap-1.5 mb-0"> 
                    <div className="w-5 h-5 bg-black rounded-md flex items-center justify-center text-white">
                        <Box size={10} strokeWidth={3} />
                    </div>
                    <SmartText isDesignMode={isDesignMode} initialValue={data.store} baseSize={10} bold font="sans" className="uppercase tracking-tight leading-none" />
                </div>
                <div className="pl-1 -mt-[1px]"> 
                     <SmartText isDesignMode={isDesignMode} initialValue={data.id} baseSize={8} font="mono" className="text-black font-bold" />
                </div>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[5pt] font-bold text-black uppercase tracking-wider">Created</span>
                <SmartText isDesignMode={isDesignMode} initialValue={data.date} baseSize={6.5} font="mono" bold className="text-black" />
            </div>
        </div>

        {/* 2. MAIN LOGISTICS CARD (LOCATION & ADDRESS) */}
        <div className="mx-1 mt-0.5 bg-black rounded-2xl p-3 flex flex-col justify-center relative overflow-hidden group grow min-h-0 text-white">
            {/* Background decoration */}
            <div className="absolute -right-2 -top-2 text-white/10 pointer-events-none">
                <MapPin size={48} strokeWidth={1.5} />
            </div>

            <div className="relative z-10 flex flex-col h-full justify-center">
                <div className="mb-auto pt-0.5"> 
                    <SmartText 
                        isDesignMode={isDesignMode} 
                        initialValue={data.location} 
                        baseSize={getLocationBaseSize(data.location)} 
                        bold 
                        font="sans" 
                        className="uppercase leading-[0.85] tracking-tight text-white mb-0.5 whitespace-nowrap" 
                    />
                </div>
                
                {/* Address Section */}
                <div className="relative z-10 pt-1 border-t border-white/20 mt-0.5">
                    <div className="flex items-start gap-1">
                        <ArrowDownRight size={10} className="text-white/50 mt-[3px] shrink-0" />
                        <SmartText 
                            isDesignMode={isDesignMode} 
                            initialValue={data.address} 
                            baseSize={getAddressBaseSize(data.address)} 
                            font="sans" 
                            bold
                            block 
                            className="text-white/90 leading-[1.15] line-clamp-2" 
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* 3. RECIPIENT INFO & COD INDICATOR */}
        <div className="px-2 py-1 flex justify-between items-center shrink-0">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                        <User size={8} className="text-black" />
                    </div>
                    <SmartText isDesignMode={isDesignMode} initialValue={data.name} baseSize={10} bold font="sans" className="uppercase text-black" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                        <Phone size={8} className="text-black" />
                    </div>
                    <SmartText isDesignMode={isDesignMode} initialValue={data.phone} baseSize={11} bold font="sans" className="text-black" />
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
        <div className="mx-2 mb-2 mt-0.5 h-[28mm] grid grid-cols-[1fr_1.3fr] gap-2 shrink-0">
            
            {/* QR MODULE */}
            <div className="bg-white border border-black rounded-xl flex flex-col items-center justify-center relative overflow-hidden pt-1 pb-0.5">
                <div className="grow flex items-center justify-center -mt-1">
                   <SmartQR value={qrValue} baseSize={72} isDesignMode={isDesignMode} />
                </div>
                <span className="text-[4.5pt] font-bold uppercase tracking-wider text-black leading-none pb-0.5">(Driver Scan)</span>
            </div>

            {/* PRICE & STATUS MODULE */}
            <div className="bg-white border border-black text-black rounded-xl flex flex-col relative overflow-hidden transition-colors duration-200">
                
                {/* Method Header - DYNAMIC SIZED */}
                <div className="px-3 py-1.5 flex items-center gap-2 border-b border-dashed border-black/10">
                    <Truck size={12} className="text-black shrink-0" />
                    <SmartText 
                        isDesignMode={isDesignMode} 
                        initialValue={data.shipping} 
                        baseSize={getShippingBaseSize(data.shipping)} 
                        bold 
                        font="sans" 
                        className="uppercase text-black whitespace-nowrap" 
                    />
                </div>

                {/* Main Price Area */}
                <div className="flex-1 flex flex-col items-center justify-center pb-1">
                    <span className="text-[4.5pt] font-bold uppercase tracking-[0.2em] mb-0.5 text-black">
                        {isCOD ? 'Collect Amount' : 'Total Amount'}
                    </span>
                    
                    <div className="flex items-baseline gap-0.5">
                        <span className="text-[10pt] font-bold text-black">$</span>
                        <SmartText isDesignMode={isDesignMode} initialValue={data.total} baseSize={20} bold font="sans" className="tracking-tighter leading-none text-black" />
                    </div>

                    {/* STATUS BADGE - MOVED UP SLIGHTLY via mt-0.5 */}
                    <div className="mt-0.5 px-3 py-1 rounded-full flex items-center gap-1.5 border bg-white border-black text-black">
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
