
import React from 'react';
import { LabelData } from '../types';
import { SmartText, SmartQR } from './SmartElements';

interface FlexiLabelProps {
  data: LabelData;
  qrValue: string;
  isDesignMode: boolean;
  lineLeft?: number;
  lineRight?: number;
}

const FlexiLabel: React.FC<FlexiLabelProps> = ({ data, qrValue, isDesignMode, lineRight = 2.5 }) => {
  const totalAmount = parseFloat(data.total);
  const paymentLower = data.payment.toLowerCase();
  
  const isPaid = paymentLower.includes('paid') && !paymentLower.includes('unpaid');
  const isCOD = !isPaid && totalAmount > 0;
  
  const getPaymentLabel = (text: string) => {
      if (isCOD && !text.toUpperCase().includes('COD')) {
          return `${text} (COD)`;
      }
      return text;
  };
  const paymentLabel = getPaymentLabel(data.payment);

  // Combined format for Design Mode
  const combinedLocationAddress = `${data.location}, ${data.address}`;

  return (
    <div 
        className="flex flex-col w-[60mm] h-[80mm] bg-white text-black font-sans overflow-hidden relative border-black box-border p-0"
        style={{ borderWidth: `${lineRight}px` }}
    >
        {/* Left Safety Margin Accent */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black z-20"></div>

        {/* 1. BRAND & IDENTITY HEADER */}
        <div className="h-[12mm] border-b-[2px] border-black flex items-center justify-between px-3 pl-5 shrink-0 relative z-10 bg-white">
            <div className="flex flex-col">
                <SmartText isDesignMode={isDesignMode} initialValue={data.store} baseSize={11} bold font="sans" className="leading-none" />
                <span className="text-[4.5pt] font-black tracking-[0.2em] opacity-30 mt-1 uppercase">Logistic Priority</span>
            </div>
            <div className="bg-black text-white px-2 py-1 rounded-[2px] flex flex-col items-center">
                <span className="text-[4pt] font-bold opacity-70 uppercase leading-none mb-0.5 tracking-tighter">ID TRACKING</span>
                <SmartText isDesignMode={isDesignMode} initialValue={data.id} baseSize={8} bold font="mono" className="text-white" />
            </div>
        </div>

        {/* 2. CONTACT SECTION */}
        <div className="bg-black text-white px-3 pl-5 py-3 shrink-0 relative z-10 flex flex-col gap-0.5 border-b-[2px] border-white/10">
            <span className="text-[5pt] font-black opacity-50 uppercase tracking-[0.2em] leading-none mb-1">Direct Contact</span>
            <SmartText isDesignMode={isDesignMode} initialValue={data.phone} baseSize={19} bold font="sans" className="text-white tracking-tighter leading-none" />
        </div>

        {/* 3. RECIPIENT & SHIPPING INFO */}
        <div className="px-3 pl-5 py-2.5 border-b border-black/10 shrink-0 relative z-10 grid grid-cols-2 gap-2 bg-white/50">
            <div className="flex flex-col">
                <span className="text-[5pt] font-black opacity-30 uppercase tracking-widest leading-none mb-1 block">Recipient</span>
                <SmartText isDesignMode={isDesignMode} initialValue={data.name} baseSize={11} bold font="sans" className="uppercase leading-tight" />
            </div>
            <div className="flex flex-col items-end text-right border-l border-black/5 pl-2">
                <span className="text-[5pt] font-black opacity-30 uppercase tracking-widest leading-none mb-1 block">Carrier</span>
                <SmartText isDesignMode={isDesignMode} initialValue={data.shipping} baseSize={10} bold font="sans" className="leading-tight" />
            </div>
        </div>

        {/* 4. COMBINED DESTINATION BLOCK (Labels removed, data shifted up) */}
        <div className="flex-1 px-3 pl-5 py-3 overflow-hidden relative z-10 flex flex-col justify-start">
            <div className="flex-1 overflow-hidden khmer-text leading-relaxed pt-1">
                {isDesignMode ? (
                   <SmartText 
                      isDesignMode={isDesignMode} 
                      initialValue={combinedLocationAddress} 
                      baseSize={11} 
                      font="sans" 
                      block 
                   />
                ) : (
                  <div style={{ fontSize: '11pt' }} className="text-black overflow-hidden break-words">
                    <span className="font-bold underline underline-offset-4 decoration-black/10">{data.location}</span>
                    <span>, {data.address}</span>
                  </div>
                )}
            </div>
        </div>

        {/* 5. LOGISTICS DATA & PAYMENT */}
        <div className="h-[25mm] border-t-[2.5px] border-black flex flex-col shrink-0 relative z-10 bg-white">
            <div className="flex-1 flex border-b border-black/5">
                <div className="flex-1 p-2.5 pl-5 flex flex-col justify-center border-r border-black/5">
                    <span className="text-[4.5pt] font-black opacity-40 uppercase mb-0.5">Collect Amount (USD)</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-[10pt] font-black">$</span>
                        <SmartText isDesignMode={isDesignMode} initialValue={data.total} baseSize={23} bold font="sans" className="tracking-tighter" />
                    </div>
                    <SmartText isDesignMode={isDesignMode} initialValue={paymentLabel} baseSize={6.5} bold font="sans" className="opacity-70 italic mt-1 leading-none" />
                </div>
                <div className="w-[22mm] flex items-center justify-center p-1 bg-white">
                    <SmartQR value={qrValue} baseSize={50} isDesignMode={isDesignMode} />
                </div>
            </div>
            
            {/* 6. SYSTEM FOOTER */}
            <div className="h-[7mm] flex items-center justify-between px-3 pl-5 bg-black text-white">
                <div className="flex items-center gap-2">
                    <SmartText isDesignMode={isDesignMode} initialValue={data.page || "SYSTEM"} baseSize={6} bold font="sans" className="text-white" />
                    <span className="opacity-30 text-[5pt]">|</span>
                    <SmartText isDesignMode={isDesignMode} initialValue={data.user} baseSize={5.5} font="sans" className="text-white/60" />
                </div>
                <div className="flex items-center gap-2">
                    <div className={`px-1.5 py-0.5 rounded-[1px] text-[4.5pt] font-black uppercase tracking-widest ${isPaid ? 'bg-white text-black' : 'border border-white/30 text-white'}`}>
                        {isPaid ? 'PAID' : 'COD DUE'}
                    </div>
                    <span className="text-[4pt] font-mono opacity-50">{data.date}</span>
                </div>
            </div>
        </div>

        {/* Technical Trace */}
        <div className="h-[3.5mm] bg-black/5 flex items-center justify-center shrink-0 relative z-20">
            <span className="text-[3.5pt] font-bold opacity-30 tracking-[0.4em] uppercase">V-PRECISION LOGISTICS 3.3 • MAX-SPACE FLOW</span>
        </div>
    </div>
  );
};

export default FlexiLabel;
