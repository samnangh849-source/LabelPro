
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

const FlexiLabel: React.FC<FlexiLabelProps> = ({ data, qrValue, isDesignMode }) => {
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

  return (
    <div className="flex flex-col w-[80mm] h-[60mm] bg-white text-black font-mono overflow-hidden relative border-[3px] border-black box-border p-0">
            {/* Background Texture/Watermark */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.03]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-black rotate-45 translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black rotate-45 -translate-x-16 translate-y-16"></div>
                <div className="flex flex-wrap gap-4 p-4">
                    {Array.from({length: 20}).map((_, i) => (
                        <span key={i} className="text-[10pt] font-black uppercase tracking-widest select-none">FLEXI</span>
                    ))}
                </div>
            </div>

            {/* Precision Header */}
            <div className="flex h-[11mm] border-b-[3px] border-black shrink-0 relative z-10 bg-white">
                <div className="w-[18mm] bg-black text-white flex flex-col items-center justify-center shrink-0 border-r-[2px] border-black">
                    <span className="text-[5pt] font-black tracking-[0.2em] mb-0.5 opacity-60">GEAR</span>
                    <span className="text-[10pt] font-black tracking-tighter leading-none">FLEXI</span>
                </div>
                <div className="flex-1 flex flex-col justify-center px-3 min-w-0">
                    <div className="flex items-center gap-2">
                        <SmartText isDesignMode={isDesignMode} initialValue={data.store} baseSize={11} bold font="mono" className="tracking-tight" />
                        <div className="h-1 flex-1 bg-black/10 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <span className="text-[4.5pt] font-bold opacity-40">CARRIER:</span>
                            <SmartText isDesignMode={isDesignMode} initialValue={data.shipping} baseSize={6.5} bold font="mono" />
                        </div>
                    </div>
                </div>
                <div className="w-[22mm] border-l-[2.5px] border-black flex flex-col items-center justify-center bg-black/[0.03] shrink-0">
                    <span className="text-[4.5pt] font-black opacity-40 uppercase mb-0.5">Order ID</span>
                    <SmartText isDesignMode={isDesignMode} initialValue={data.id} baseSize={8.5} bold font="mono" />
                </div>
            </div>
            
            <div className="flex-1 flex flex-col relative z-10 bg-transparent min-h-0">
                {/* Recipient Section Header */}
                <div className="px-3 pt-2 pb-1 border-b-[1.5px] border-black/10 flex justify-between items-end shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-4 bg-black"></div>
                        <span className="text-[5pt] font-black uppercase tracking-widest text-black/60">Delivery Profile</span>
                    </div>
                    <div className="flex items-center gap-1 bg-black/[0.05] px-1.5 py-0.5 rounded-sm">
                        <span className="text-[4pt] font-black opacity-40">TIMESTAMP:</span>
                        <SmartText isDesignMode={isDesignMode} initialValue={data.date} baseSize={5.5} font="mono" />
                    </div>
                </div>

                {/* Primary Identity Row */}
                <div className="px-4 py-2 shrink-0">
                    <div className="flex items-baseline gap-4">
                        <SmartText isDesignMode={isDesignMode} initialValue={data.name} baseSize={13.5} bold font="mono" className="uppercase" />
                        <div className="h-4 w-[2px] bg-black/20 self-center"></div>
                        <SmartText isDesignMode={isDesignMode} initialValue={data.phone} baseSize={13.5} bold font="mono" />
                    </div>
                </div>

                {/* Technical Address Layout */}
                <div className="flex-1 px-4 py-1 overflow-hidden">
                    <div className="leading-snug flex flex-col gap-1.5">
                        <div className="flex items-start gap-2">
                            <div className="bg-black text-white px-2 py-0.5 rounded-[1px] shrink-0 mt-0.5">
                                <SmartText isDesignMode={isDesignMode} initialValue={data.location} baseSize={11} bold font="mono" />
                            </div>
                            <div className="flex-1">
                                <SmartText isDesignMode={isDesignMode} initialValue={data.address} baseSize={10} font="mono" className="leading-[1.5]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Financial & Tracking Block */}
            <div className="h-[19mm] border-t-[3px] border-black flex bg-transparent shrink-0 relative z-10">
                <div className="flex-1 flex flex-col border-r-[2.5px] border-black bg-white">
                    <div className="flex items-center gap-1.5 px-3 py-1 border-b border-black/5">
                        <div className="w-1 h-1 bg-black rounded-full animate-pulse"></div>
                        <span className="text-[4.5pt] font-black uppercase tracking-tighter opacity-40">Financial Verification</span>
                    </div>
                    
                    <div className="flex-1 flex items-center justify-between px-4">
                        <div className="flex flex-col">
                            <span className="text-[4.5pt] font-bold opacity-30 uppercase mb-0.5">Status</span>
                            <div className={`text-[8pt] font-black px-1.5 py-0.5 border rounded-sm ${isPaid ? 'border-black bg-black text-white' : 'border-black/20 bg-transparent text-black'}`}>
                                {isPaid ? 'VERIFIED' : 'PENDING'}
                            </div>
                        </div>

                        <div className="flex flex-col items-end">
                            {isPaid ? (
                                <div className="text-right">
                                    <span className="text-[4.5pt] font-black opacity-30 uppercase block">Total Due</span>
                                    <span className="text-[12pt] font-black tracking-tighter line-through opacity-40">$ {data.total}</span>
                                </div>
                            ) : (
                                <div className="text-right">
                                    <span className="text-[4.5pt] font-black opacity-40 uppercase block mb-0.5">COD Amount</span>
                                    <div className="flex items-baseline justify-end gap-1">
                                        <span className="text-[8pt] font-bold">$</span>
                                        <SmartText isDesignMode={isDesignMode} initialValue={data.total} baseSize={19} bold font="mono" className="tracking-tighter" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="px-3 py-0.5 bg-black/[0.02] border-t border-black/5">
                        <SmartText isDesignMode={isDesignMode} initialValue={paymentLabel} baseSize={6} bold font="mono" className="opacity-60 text-center italic" block />
                    </div>
                </div>

                <div className="w-[28mm] flex flex-col items-center justify-center p-2 bg-white relative shrink-0">
                    <div className="border border-black/5 p-1 rounded-sm bg-black/[0.02]">
                        <SmartQR value={qrValue} baseSize={48} isDesignMode={isDesignMode} />
                    </div>
                    {/* Visual metadata corner accents */}
                    <div className="absolute top-1 right-1 w-1 h-1 border-t border-r border-black/20"></div>
                    <div className="absolute bottom-1 left-1 w-1 h-1 border-b border-l border-black/20"></div>
                </div>
            </div>

            {/* Footer Status Bar */}
            <div className="h-[4.5mm] bg-black text-white flex items-center justify-between px-3 shrink-0 relative z-20 overflow-hidden">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-brand-cyan rounded-full"></div>
                        <SmartText isDesignMode={isDesignMode} initialValue={data.page || "SYSTEM"} baseSize={6.5} bold font="mono" className="text-white" />
                    </div>
                    <div className="w-[1px] h-3 bg-white/20"></div>
                    <div className="flex items-center gap-1.5">
                         <span className="text-[4pt] opacity-40 font-black">OPID:</span>
                         <SmartText isDesignMode={isDesignMode} initialValue={data.user} baseSize={6} font="mono" className="text-white/80" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[4.5pt] font-black tracking-[0.25em] opacity-40 uppercase">PRECISION LOGISTICS</span>
                    <div className="flex gap-[1px]">
                        <div className="w-1 h-2 bg-white/10"></div><div className="w-[2px] h-2 bg-white/30"></div><div className="w-1 h-2 bg-white/10"></div>
                    </div>
                </div>
            </div>
    </div>
  );
};

export default FlexiLabel;
