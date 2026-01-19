
import React from 'react';
import { LabelData } from '../types.ts';
import { SmartText, SmartQR } from './SmartElements.tsx';

interface FlexiLabelProps {
  data: LabelData;
  qrValue: string;
  isDesignMode: boolean;
}

const FlexiLabel: React.FC<FlexiLabelProps> = ({ data, qrValue, isDesignMode }) => {
  const totalAmount = parseFloat(data.total);
  const paymentLower = data.payment.toLowerCase();
  
  // Professional logic: Check for "paid" status
  const isPaid = paymentLower.includes('paid') && !paymentLower.includes('unpaid');
  const isCOD = !isPaid && totalAmount > 0;
  
  const getPaymentLabel = (text: string) => {
      if (isCOD && !text.toUpperCase().includes('COD')) {
          return `${text} (COD)`;
      }
      return text;
  };
  const paymentLabel = getPaymentLabel(data.payment);

  return (
    <div className="flex flex-col w-[80mm] h-[60mm] bg-white text-black font-mono overflow-hidden relative border-black box-border">
            {/* Background Watermark - High Visibility Layer 0 */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                <div className="rotate-[-15deg] border-[6px] border-black px-4 py-1 flex flex-col items-center opacity-[0.12]">
                    <span className="text-[54pt] font-black uppercase tracking-[-0.05em] leading-none text-center">
                        {isPaid ? 'PAID' : (isCOD ? 'C.O.D' : 'ORDER')}
                    </span>
                </div>
            </div>

            {/* Header Area (10mm) - Layer 10 */}
            <div className="flex border-b-[3px] border-black h-[10mm] shrink-0 relative z-10 bg-transparent">
                <div className="w-[12mm] bg-[repeating-linear-gradient(45deg,#000,#000_2px,#fff_2px,#fff_4px)] border-r-[3px] border-black flex items-center justify-center shrink-0">
                    <div className="bg-white px-1 border-2 border-black rotate-90 text-[7pt] font-black tracking-widest whitespace-nowrap">FLEXI</div>
                </div>
                <div className="flex-1 flex flex-col justify-center px-3 min-w-0">
                    <SmartText isDesignMode={isDesignMode} initialValue={data.store} baseSize={12} bold font="mono" />
                    <SmartText isDesignMode={isDesignMode} initialValue="LOGISTICS SERVICE" baseSize={5} font="mono" className="tracking-[0.15em]" />
                </div>
                <div className="w-[28mm] border-l-[3px] border-black flex flex-col items-center justify-center p-1 shrink-0 bg-transparent">
                    <span className="text-[5pt] uppercase opacity-60 font-bold leading-none mb-0.5">Order ID</span>
                    <SmartText isDesignMode={isDesignMode} initialValue={data.id} baseSize={9} bold font="mono" />
                </div>
            </div>
            
            {/* Middle Section (Recipient Info) - Layer 10 */}
            <div className="flex-1 flex flex-col relative z-10 bg-transparent px-3 py-1.5 min-h-0">
                <div className="flex justify-between items-center mb-1 shrink-0">
                    <div className="bg-black text-white px-1.5 py-0.5 text-[5pt] font-bold uppercase tracking-wider">Recipient Information</div>
                    <div className="flex items-center gap-1">
                        <span className="text-[4.5pt] font-bold opacity-60">VIA:</span>
                        <SmartText isDesignMode={isDesignMode} initialValue={data.shipping} baseSize={7} bold font="mono" align="right" />
                    </div>
                </div>
                
                <div className="flex flex-col flex-1 min-h-0 gap-0.5">
                    {/* Primary Customer Info */}
                    <div className="flex items-baseline gap-2 shrink-0">
                        <SmartText isDesignMode={isDesignMode} initialValue={data.name} baseSize={11} bold font="mono" />
                        <span className="text-black/30 text-[8pt]">|</span>
                        <SmartText isDesignMode={isDesignMode} initialValue={data.phone} baseSize={12} bold font="mono" />
                    </div>
                    
                    <div className="border-b border-black/10 w-full shrink-0"></div>
                    
                    {/* Location & Address - This area now takes the remaining space to prevent cutoff */}
                    <div className="flex-1 flex flex-col justify-center overflow-hidden">
                        <div className="mb-0.5">
                            <span className="text-[5pt] font-black opacity-40 uppercase block leading-none mb-0.5">Location</span>
                            <SmartText isDesignMode={isDesignMode} initialValue={data.location} baseSize={15} bold font="mono" block className="leading-tight text-brand-black" />
                        </div>
                        <div className="mt-1">
                            <span className="text-[5pt] font-black opacity-40 uppercase block leading-none mb-0.5">Address Detail</span>
                            <SmartText isDesignMode={isDesignMode} initialValue={data.address} baseSize={9} font="mono" block className="leading-tight opacity-90 italic" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section (22mm: QR & Pricing) - Layer 10 */}
            <div className="h-[21mm] border-t-[3px] border-black flex bg-transparent shrink-0 relative z-10">
                <div className="flex-1 flex flex-col p-2 gap-1 border-r-[3px] border-black bg-transparent">
                    <div className="flex justify-between items-center border-b border-black/10 pb-0.5">
                         <div className="flex flex-col">
                            <span className="text-[5pt] font-bold opacity-50 uppercase">Payment:</span>
                            <SmartText isDesignMode={isDesignMode} initialValue={paymentLabel} baseSize={6.5} bold font="mono" />
                         </div>
                         <div className="text-right flex flex-col">
                            <span className="text-[4.5pt] font-bold opacity-40 uppercase">Date</span>
                            <SmartText isDesignMode={isDesignMode} initialValue={data.date} baseSize={6} font="mono" align="right" />
                         </div>
                    </div>
                    
                    <div className="flex-1 flex items-center justify-center">
                        {isPaid ? (
                            <div className="flex flex-col items-center">
                                <span className="text-[6pt] font-bold opacity-40 line-through mb-0.5">${data.total}</span>
                                <div className="border-[2px] border-black px-4 py-0.5 bg-white">
                                    <span className="text-[11pt] font-black tracking-widest leading-none">PAID</span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <span className="text-[5pt] font-black uppercase tracking-tight opacity-50 mb-0.5">COD Amount</span>
                                <SmartText isDesignMode={isDesignMode} initialValue={`$${data.total}`} baseSize={17} bold font="mono" />
                            </div>
                        )}
                    </div>
                </div>

                {/* QR Code Area - Moved to Bottom Right as requested */}
                <div className="w-[26mm] flex items-center justify-center p-1 bg-transparent shrink-0">
                    <SmartQR value={qrValue} baseSize={52} isDesignMode={isDesignMode} />
                </div>
            </div>

            {/* Final Footer Bar (4mm) - Layer 20 */}
            <div className="h-[4mm] bg-black text-white flex items-center justify-between px-3 overflow-hidden relative z-20 shrink-0">
                <SmartText isDesignMode={isDesignMode} initialValue={data.page || "FLEXI GEAR"} baseSize={6.5} bold font="mono" className="text-white" />
                <span className="text-[4pt] font-black tracking-[0.2em] opacity-80 uppercase">Secured Logistics</span>
            </div>
    </div>
  );
};

export default FlexiLabel;
