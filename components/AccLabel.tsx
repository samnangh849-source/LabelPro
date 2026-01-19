
import React from 'react';
import { LabelData } from '../types';
import { SmartText, SmartQR } from './SmartElements';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface AccLabelProps {
  data: LabelData;
  qrValue: string;
  isDesignMode: boolean;
  lineLeft?: number;
  lineRight?: number;
}

const AccLabel: React.FC<AccLabelProps> = ({ data, qrValue, isDesignMode, lineLeft = 0, lineRight = 2.5 }) => {
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
    <div className="flex flex-col h-full bg-white text-black font-sans p-0.5 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <span className="text-[72pt] font-black uppercase rotate-[-25deg] opacity-[0.08] text-black">
                {isPaid ? 'PAID' : (isCOD ? 'C.O.D' : 'ORDER')}
            </span>
        </div>

        <div className="flex-1 border-black rounded-lg flex flex-col overflow-hidden relative z-10 bg-transparent" style={{ borderWeight: `${lineRight}px`, borderStyle: 'solid', borderWidth: `${lineRight}px` }}>
            <div className="bg-black text-white px-2 py-1 flex justify-between items-center shrink-0">
                <SmartText isDesignMode={isDesignMode} initialValue={data.store} baseSize={11} bold font="sans" className="text-white" />
                <div className="bg-white text-black px-1 py-0.5 rounded text-[6.5pt] font-mono font-bold">#{data.id}</div>
            </div>

            <div className="flex flex-1 min-h-0 overflow-hidden">
                <div className="flex-1 p-2 flex flex-col gap-0.5 min-w-0">
                    <span className="text-[5.5pt] uppercase tracking-wider text-black opacity-40 font-bold">Deliver To</span>
                    <SmartText isDesignMode={isDesignMode} initialValue={data.name} baseSize={11} bold font="sans" block />
                    <SmartText isDesignMode={isDesignMode} initialValue={data.phone} baseSize={10} bold font="sans" block />
                    <div className="mt-auto pt-1 border-t border-black/10">
                        <SmartText isDesignMode={isDesignMode} initialValue={data.location} baseSize={8} bold font="sans" />
                        <SmartText isDesignMode={isDesignMode} initialValue={data.address} baseSize={7.5} font="sans" block className="leading-tight" />
                    </div>
                </div>

                <div className="w-[30mm] border-l-[2px] border-black p-1 flex flex-col items-center text-center shrink-0 min-h-0 overflow-hidden">
                    <div className="bg-white p-0.5 rounded border border-black/10 mb-1">
                         <SmartQR value={qrValue} baseSize={52} isDesignMode={isDesignMode} />
                    </div>
                    <div className="w-full mb-1 flex justify-between items-center px-0.5 border-b border-black/10 pb-0.5">
                        <span className="text-[4.5pt] text-black opacity-40 font-bold">DATE:</span>
                        <SmartText isDesignMode={isDesignMode} initialValue={data.date} baseSize={5.5} font="mono" />
                    </div>
                    <div className="w-full mb-1 bg-black/5 px-1 py-0.5 rounded border border-black/10 flex flex-col items-start">
                        <span className="text-[4pt] text-black opacity-40 uppercase font-black">VIA:</span>
                        <SmartText isDesignMode={isDesignMode} initialValue={data.shipping} baseSize={7} bold font="sans" align="left" block />
                    </div>
                    <div className="w-full mt-auto flex flex-col gap-0.5">
                        {isPaid ? (
                            <div className="bg-white text-black rounded p-1 border-[1.5px] border-black">
                                <div className="flex items-center justify-center gap-0.5 mb-0.5 text-black">
                                    <CheckCircle2 size={8} className="text-black" /><span className="text-[5.5pt] font-black uppercase">PAID FULL</span>
                                </div>
                                <SmartText isDesignMode={isDesignMode} initialValue={`$${data.total}`} baseSize={11} bold font="sans" align="center" block className="opacity-30 line-through" />
                            </div>
                        ) : (isCOD ? (
                            <div className="bg-black text-white rounded p-1 border-[1.5px] border-black">
                                <div className="flex items-center justify-center gap-0.5 mb-0.5 bg-white text-black px-0.5 rounded-[1.5px]">
                                    <AlertTriangle size={6} strokeWidth={4} /><span className="text-[5.5pt] font-black uppercase">COD UNPAID</span>
                                </div>
                                <SmartText isDesignMode={isDesignMode} initialValue={`$${data.total}`} baseSize={14} bold font="sans" align="center" block className="text-white" />
                            </div>
                        ) : (
                            <div className="bg-white text-black rounded p-1 border border-black/20">
                                <span className="text-[6pt] font-bold">NO CHARGE</span>
                            </div>
                        ))}
                        <SmartText isDesignMode={isDesignMode} initialValue={paymentLabel} baseSize={6.5} bold font="sans" />
                    </div>
                </div>
            </div>
            <div className="bg-black/5 border-t-[1.5px] border-black py-0.5 text-center flex justify-between px-2 shrink-0">
                 <SmartText isDesignMode={isDesignMode} initialValue={data.page || "STORE"} baseSize={6.5} font="sans" bold />
                 <span className="text-[4.5pt] text-black opacity-40 font-bold uppercase">Professional Delivery</span>
            </div>
        </div>
    </div>
  );
};

export default AccLabel;
