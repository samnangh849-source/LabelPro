
import React from 'react';
import { LabelData, Margins, ThemeType } from '../types';
import LabelContent from './LabelContent';
import QRCode from './QRCode';
import { Eye, Printer, MousePointer2, User, Phone, MapPin } from 'lucide-react';

interface LabelPreviewProps {
  data: LabelData;
  theme: ThemeType;
  margins: Margins;
  isDesignMode: boolean;
}

const LabelPreview: React.FC<LabelPreviewProps> = ({ data, theme, margins, isDesignMode }) => {
  const baseUrl = "https://oder-backend-2.onrender.com/CustomerAction.html";
  const mapParam = data.mapLink ? encodeURIComponent(data.mapLink) : "";
  const qrValue = `${baseUrl}?id=${encodeURIComponent(data.id)}&name=${encodeURIComponent(data.name)}&phone=${encodeURIComponent(data.phone)}&map=${mapParam}`;

  const getQrFooter = () => {
    const features = [];
    if (data.mapLink) features.push("Map");
    if (data.phone) { features.push("Tel"); features.push("Tele"); }
    return features.length > 0 ? `Links: ${features.join(" / ")}` : "Scan for Info";
  };

  const isFlexi = theme === ThemeType.FLEXI;
  const sheetStyle: React.CSSProperties = {
    width: isFlexi ? '60mm' : '80mm',
    height: isFlexi ? '80mm' : '60mm',
    paddingTop: `${margins.top}mm`,
    paddingRight: `${margins.right}mm`,
    paddingBottom: `${margins.bottom}mm`,
    paddingLeft: `${margins.left}mm`,
  };

  const renderDriverCardContent = () => {
    if (isFlexi) {
        // VERTICAL LAYOUT (60mm x 80mm) - Flexi Style
        return (
            <div className="w-full h-full flex flex-col bg-white border border-black/5 box-border">
                {/* Header */}
                <div className="flex justify-between items-start px-3 pt-4 pb-2 border-b-2 border-black">
                    <div>
                        <div className="text-[7pt] text-gray-500 font-bold uppercase tracking-wider">Store</div>
                        <div className="text-[10pt] font-black uppercase leading-none">{data.store}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[7pt] text-gray-500 font-bold uppercase tracking-wider">Order</div>
                        <div className="text-[10pt] font-mono font-bold leading-none">{data.id}</div>
                    </div>
                </div>

                {/* Customer Info */}
                <div className="px-4 py-3 bg-gray-50 border-b border-black/5">
                    <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                             <User size={8} />
                        </div>
                        <span className="text-[9pt] font-bold uppercase truncate leading-none">{data.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                             <Phone size={8} />
                        </div>
                        <span className="text-[10pt] font-mono font-bold leading-none">{data.phone}</span>
                    </div>
                </div>

                {/* QR Code */}
                <div className="flex-1 flex flex-col items-center justify-center p-2 relative bg-white">
                     <div className="border-[3px] border-black p-2 rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
                        <QRCode value={qrValue} size={120} />
                     </div>
                </div>

                {/* Footer */}
                <div className="bg-black text-white p-2.5 text-center">
                     <div className="flex items-center justify-center gap-1.5 mb-0.5">
                        <MapPin size={14} className="text-brand-cyan animate-pulse" />
                        <span className="text-[10pt] font-black uppercase tracking-[0.2em]">Driver Scan</span>
                     </div>
                     <div className="text-[6pt] text-white/60 font-mono uppercase tracking-wider">{getQrFooter()}</div>
                </div>
            </div>
        );
    } else {
        // LANDSCAPE LAYOUT (80mm x 60mm) - Acc Style
        return (
            <div className="w-full h-full flex bg-white p-3 gap-3 box-border">
                 {/* Left Column: Info */}
                 <div className="w-[32mm] flex flex-col justify-between shrink-0">
                     <div className="border-l-[3px] border-black pl-2 pt-1 pb-2">
                        <div className="text-[6pt] text-gray-400 font-bold uppercase tracking-wider">Store Identity</div>
                        <div className="text-[9pt] font-black uppercase leading-none mb-1">{data.store}</div>
                        <div className="text-[10pt] font-mono font-bold text-gray-800 leading-none">#{data.id}</div>
                     </div>
                     
                     <div className="space-y-2">
                        <div>
                            <span className="text-[6pt] text-gray-400 font-bold uppercase block mb-0.5">Delivery To</span>
                            <div className="flex items-center gap-1.5">
                                <User size={12} className="text-black" />
                                <span className="text-[9pt] font-bold uppercase leading-tight truncate block w-full">{data.name}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Phone size={12} className="text-black" />
                            <span className="text-[10pt] font-mono font-bold leading-none">{data.phone}</span>
                        </div>
                     </div>

                     <div className="mt-1 flex gap-1">
                        <span className="bg-black text-white px-2 py-1 rounded text-[6pt] font-bold uppercase tracking-wider">Map</span>
                        <span className="bg-black text-white px-2 py-1 rounded text-[6pt] font-bold uppercase tracking-wider">Call</span>
                     </div>
                 </div>

                 {/* Right Column: QR */}
                 <div className="flex-1 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-2 relative">
                      <QRCode value={qrValue} size={110} />
                      <div className="absolute bottom-1 right-2 flex items-center gap-1 opacity-50">
                        <MapPin size={10} />
                        <span className="text-[6pt] font-bold uppercase">Scan</span>
                      </div>
                 </div>
            </div>
        );
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-12 items-center justify-center w-full min-h-[600px]">
      <div className="flex flex-col gap-6 items-center label-preview-container flex-1 w-full max-w-[420px]">
        <div className={`relative group transition-all duration-300 w-full flex justify-center ${isDesignMode ? 'scale-100' : 'hover:scale-[1.02]'}`}>
            <div className={`absolute -inset-1 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500 ${isFlexi ? 'bg-gradient-to-r from-amber-500 to-orange-600' : 'bg-gradient-to-r from-brand-cyan to-brand-purple'}`}></div>
            <div className="relative w-full bg-slate-900 border border-white/10 p-6 rounded-xl flex flex-col items-center shadow-2xl overflow-hidden">
                 {isDesignMode && (
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-2 z-20 animate-pulse">
                        <MousePointer2 className="w-3 h-3" /> Click to Edit
                    </div>
                 )}
                 <div className={`relative bg-white transition-all duration-300 ${isDesignMode ? 'ring-2 ring-brand-cyan ring-offset-4 ring-offset-slate-900 cursor-text shadow-none' : 'shadow-[0_0_30px_rgba(255,255,255,0.1)]'}`}>
                    <div className={`printable-label overflow-hidden bg-white text-black ${isFlexi ? 'theme-flexi-gear' : 'theme-acc-store'}`} style={sheetStyle}>
                        <LabelContent data={data} theme={theme} lineLeft={margins.lineLeft} lineRight={margins.lineRight} qrValue={qrValue} isDesignMode={isDesignMode} />
                    </div>
                 </div>
                 <div className="mt-6 w-full flex justify-between items-center text-xs font-mono text-slate-500 no-print">
                    <div className="flex items-center gap-1"><Printer className="w-3 h-3" /><span>{isFlexi ? '60x80mm' : '80x60mm'}</span></div>
                    <div className={isFlexi ? 'text-amber-500' : 'text-brand-cyan'}>{isFlexi ? 'VERTICAL' : 'LANDSCAPE'}</div>
                 </div>
            </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 items-center qr-preview-container flex-1 w-full max-w-[420px]">
        <div className={`relative group transition-all duration-300 w-full flex justify-center ${isDesignMode ? 'scale-100' : 'hover:scale-[1.02]'}`}>
             <div className="absolute -inset-1 bg-gradient-to-r from-brand-purple to-brand-pink rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative w-full bg-slate-900 border border-white/10 p-6 rounded-xl flex flex-col items-center shadow-2xl">
                <div className={`relative bg-white transition-all duration-300 ${isDesignMode ? 'ring-2 ring-brand-purple ring-offset-4 ring-offset-slate-900' : 'shadow-[0_0_30px_rgba(255,255,255,0.1)]'}`}>
                    <div className={`printable-label bg-white text-black overflow-hidden flex flex-col ${isFlexi ? 'theme-flexi-gear' : 'theme-acc-store'}`} style={sheetStyle}>
                        {renderDriverCardContent()}
                    </div>
                </div>
                 <div className="mt-6 w-full flex justify-between items-center text-xs font-mono text-slate-500 no-print">
                    <div className="flex items-center gap-1"><Eye className="w-3 h-3" /><span>Driver Card</span></div>
                    <div className="text-brand-purple">ACTIVE</div>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LabelPreview;
