
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

const FlexiLabel: React.FC<FlexiLabelProps> = ({ data, qrValue, isDesignMode, lineLeft = 0, lineRight = 3 }) => {
  const totalAmount = parseFloat(data.total);
  const paymentLower = data.payment.toLowerCase();
  
  // Logic អាជីព៖ ប្រសិនបើមានពាក្យ "paid" ហើយគ្មានពាក្យ "unpaid" នោះមានន័យថាបានបង់រួច
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
    <div className="flex flex-col h-full bg-white text-black font-mono overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                <div className="rotate-[-15deg] border-[8px] border-black px-6 py-2 flex flex-col items-center opacity-[0.1]">
                    <span className="text-[58pt] font-black uppercase tracking-[-0.05em] leading-none">
                        {isPaid ? 'PAID' : (isCOD ? 'C.O.D' : 'ORDER')}
                    </span>
                </div>
            </div>

            <div className="flex border-black h-[10mm] shrink-0 relative z-10 bg-white" style={{ borderBottomWidth: `${lineRight}px` }}>
                <div className="w-[12mm] bg-[repeating-linear-gradient(45deg,#000,#000_2px,#fff_2px,#fff_4px)] border-black flex items-center justify-center" style={{ borderRightWidth: `${lineRight}px` }}>
                    <div className="bg-white px-1 border-2 border-black rotate-90 text-[7pt] font-black tracking-widest">PRTY</div>
                </div>
                <div className="flex-1 flex flex-col justify-center px-2 min-w-0">
                    <SmartText isDesignMode={isDesignMode} initialValue={data.store} baseSize={12} bold font="mono" />
                    <SmartText isDesignMode={isDesignMode} initialValue="LOGISTICS" baseSize={5} font="mono" className="tracking-[0.2em]" />
                </div>
                <div className="w-[28mm] bg-black text-white flex flex-col items-center justify-center p-1 shrink-0">
                    <span className="text-[5pt] uppercase opacity-75">Order ID</span>
                    <SmartText isDesignMode={isDesignMode} initialValue={data.id} baseSize={10} bold font="mono" className="text-white" />
                </div>
            </div>
            
            <div className="flex flex-1 min-h-0 overflow-hidden relative z-10 bg-transparent">
                <div className="flex-1 p-2.5 flex flex-col border-black relative min-w-0" style={{ borderRightWidth: `${lineRight}px` }}>
                    <div className="absolute top-0 left-0 bg-black text-white px-1 text-[5pt] font-bold">RECIPIENT</div>
                    <div className="mt-2.5">
                        <SmartText isDesignMode={isDesignMode} initialValue={data.name} baseSize={11} bold font="mono" block />
                        <div className="my-0.5 border-b border-black border-dashed w-full opacity-30"></div>
                        <SmartText isDesignMode={isDesignMode} initialValue={data.phone} baseSize={10} bold font="mono" block />
                    </div>
                    <div className="mt-auto mb-1">
                        <SmartText isDesignMode={isDesignMode} initialValue={data.location} baseSize={8.5} bold font="mono" block />
                        <SmartText isDesignMode={isDesignMode} initialValue={data.address} baseSize={7.5} font="mono" block className="leading-tight mt-0.5" />
                    </div>
                </div>

                <div className="w-[28mm] flex flex-col shrink-0 overflow-hidden">
                    <div className="h-[20mm] border-black p-1 flex items-center justify-center bg-white shrink-0" style={{ borderBottomWidth: `${lineRight}px` }}>
                        <SmartQR value={qrValue} baseSize={55} isDesignMode={isDesignMode} />
                    </div>
                    <div className="flex-1 flex flex-col p-1 gap-0.5 min-h-0 overflow-hidden">
                        <div className="space-y-0.5 border-b border-black/10 pb-1">
                            <div className="flex flex-col"><span className="text-[4.5pt] font-bold opacity-60">VIA:</span><SmartText isDesignMode={isDesignMode} initialValue={data.shipping} baseSize={6.5} bold font="mono" /></div>
                            <div className="flex justify-between items-center pt-0.5"><span className="text-[4.5pt] font-bold">PAY:</span><SmartText isDesignMode={isDesignMode} initialValue={paymentLabel} baseSize={5.5} font="mono" align="right" /></div>
                        </div>
                        <div className={`flex-1 border-black w-full relative flex flex-col items-center justify-center ${isPaid ? 'bg-white text-black' : 'bg-black text-white'}`} style={{ borderWidth: `${lineRight}px` }}>
                            {isPaid ? (
                                <div className="relative z-10 flex flex-col items-center justify-center px-1">
                                    <div className="text-[5.5pt] font-black mb-0.5 border border-black px-1">PREPAID</div>
                                    <SmartText isDesignMode={isDesignMode} initialValue={`$${data.total}`} baseSize={10} bold font="mono" className="text-black/30 line-through mb-0.5" />
                                    <span className="text-[8pt] font-black tracking-widest leading-none bg-black text-white px-1">PAID</span>
                                </div>
                            ) : (
                                <div className="relative z-10 flex flex-col items-center justify-center w-full px-1">
                                    <div className="bg-white text-black text-[6.5pt] font-black uppercase px-1 mb-0.5 border border-black">COD DUE</div>
                                    <SmartText isDesignMode={isDesignMode} initialValue={`$${data.total}`} baseSize={14} bold font="mono" className="text-white" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-[4mm] bg-black text-white flex items-center justify-center overflow-hidden relative z-20 shrink-0">
                <SmartText isDesignMode={isDesignMode} initialValue={data.page || "FLEXI GEAR"} baseSize={6.5} bold font="mono" className="text-white" />
            </div>
    </div>
  );
};

export default FlexiLabel;
