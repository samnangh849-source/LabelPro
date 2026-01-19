
import React from 'react';
import { 
  Printer, RefreshCw, Layout, Smartphone, MousePointer2, Type, Move, 
  Settings2, Trash2, Plus, GripVertical, Save, Download, Zap, Undo2, 
  Redo2, ChevronUp, ChevronLeft, ChevronRight, ChevronDown, Minus, 
  RotateCcw, Sliders 
} from 'lucide-react';
import { Margins, ThemeType } from '../types';

interface ControlsProps {
  margins: Margins;
  onMarginChange: (key: keyof Margins, value: number) => void;
  currentTheme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
  isDesignMode: boolean;
  onDesignModeToggle: (val: boolean) => void;
}

const Controls: React.FC<ControlsProps> = ({
  margins,
  onMarginChange,
  currentTheme,
  onThemeChange,
  isDesignMode,
  onDesignModeToggle
}) => {
  const emitDesignAction = (type: string, payload: any) => {
    window.dispatchEvent(new CustomEvent('design-action', { detail: { type, payload } }));
  };

  const InputField = ({ label, prop }: { label: string, prop: keyof Margins }) => (
    <div className="group">
      <label className="text-[10px] uppercase font-bold text-slate-500 mb-1.5 block group-hover:text-brand-cyan transition-colors">{label}</label>
      <div className="relative">
        <input 
          type="number" 
          step={0.5}
          value={margins[prop]}
          onChange={(e) => onMarginChange(prop, parseFloat(e.target.value) || 0)}
          className="w-full bg-black/40 border border-white/10 text-slate-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-brand-cyan/50 transition-all font-mono"
        />
        <span className="absolute right-3 top-2.5 text-xs text-slate-600 pointer-events-none">mm</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-slate-300 font-display font-bold text-sm tracking-wide mb-3">
            <Layout className="w-4 h-4 text-brand-purple" />
            <h3>VISUAL THEME</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
            {Object.values(ThemeType).map((theme) => (
                <button
                    key={theme}
                    onClick={() => onThemeChange(theme)}
                    className={`relative px-3 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all duration-300 ${currentTheme === theme ? 'bg-brand-purple/10 border-brand-purple/50 text-brand-purple' : 'bg-white/5 border-transparent text-slate-500 hover:text-slate-300'}`}
                >
                    {theme}
                </button>
            ))}
        </div>
      </div>

      <div>
        <label className="flex items-center justify-between p-3.5 border border-white/10 rounded-xl bg-gradient-to-r from-white/5 to-transparent cursor-pointer hover:border-brand-cyan/30 transition-all group">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg transition-colors ${isDesignMode ? 'bg-brand-cyan/20 text-brand-cyan' : 'bg-white/5 text-slate-500'}`}><Zap className="w-4 h-4" /></div>
                <div>
                    <span className="block text-sm font-bold text-slate-200 font-display tracking-wide">Live Edit</span>
                    <span className="block text-[10px] text-slate-500 uppercase tracking-widest">Manual Override</span>
                </div>
            </div>
            <div className="relative">
                <input type="checkbox" checked={isDesignMode} onChange={(e) => onDesignModeToggle(e.target.checked)} className="sr-only peer" />
                <div className="w-9 h-5 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-cyan/30 peer-checked:after:bg-brand-cyan"></div>
            </div>
        </label>

        {isDesignMode && (
          <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-brand-cyan/20 shadow-inner">
              <div className="flex items-center justify-between mb-3 border-b border-brand-cyan/10 pb-2">
                  <div className="flex items-center gap-2 text-brand-cyan font-bold text-[10px] uppercase tracking-wider"><Move className="w-3 h-3" /> Precision Tuner</div>
                  <div className="flex gap-1.5">
                      <button onClick={() => emitDesignAction('undo', {})} className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"><Undo2 size={12} /></button>
                      <button onClick={() => emitDesignAction('redo', {})} className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"><Redo2 size={12} /></button>
                  </div>
              </div>
              
              <div className="flex gap-3">
                   <div className="grid grid-cols-3 gap-1 w-[72px] shrink-0">
                      <div /><button onClick={() => emitDesignAction('move', {y: -1})} className="h-6 bg-slate-800 rounded hover:bg-brand-cyan flex items-center justify-center"><ChevronUp size={12}/></button><div />
                      <button onClick={() => emitDesignAction('move', {x: -1})} className="h-6 bg-slate-800 rounded hover:bg-brand-cyan flex items-center justify-center"><ChevronLeft size={12}/></button>
                      <div className="flex items-center justify-center"><MousePointer2 size={10} className="text-slate-600"/></div>
                      <button onClick={() => emitDesignAction('move', {x: 1})} className="h-6 bg-slate-800 rounded hover:bg-brand-cyan flex items-center justify-center"><ChevronRight size={12}/></button>
                      <div /><button onClick={() => emitDesignAction('move', {y: 1})} className="h-6 bg-slate-800 rounded hover:bg-brand-cyan flex items-center justify-center"><ChevronDown size={12}/></button><div />
                   </div>
                   <div className="flex-1 flex flex-col justify-between">
                       <div className="flex items-center justify-between bg-slate-950 p-1 rounded border border-white/10">
                          <button onClick={() => emitDesignAction('size', -1)} className="w-6 h-6 flex items-center justify-center hover:bg-slate-800 rounded text-slate-400"><Minus size={12}/></button>
                          <span className="text-[9px] font-bold text-slate-500 uppercase">Size</span>
                          <button onClick={() => emitDesignAction('size', 1)} className="w-6 h-6 flex items-center justify-center hover:bg-slate-800 rounded text-slate-400"><Plus size={12}/></button>
                       </div>
                       <button onClick={() => emitDesignAction('reset', {})} className="w-full py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded text-[9px] font-bold flex items-center justify-center gap-1.5 mt-2"><RotateCcw size={10} /> RESET</button>
                   </div>
              </div>
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-slate-300 font-display font-bold text-sm tracking-wide"><Sliders className="w-4 h-4 text-brand-cyan" /><h3>AXIS CONTROL</h3></div>
            <button onClick={() => { if(confirm('Restore defaults?')) { localStorage.clear(); window.location.reload(); } }} className="p-1.5 rounded-md hover:bg-red-500/10 text-slate-600 hover:text-red-400"><RotateCcw className="w-3.5 h-3.5" /></button>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/5 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-4 mb-4">
                <InputField label="Top (Y+)" prop="top" /><InputField label="Right (X+)" prop="right" />
                <InputField label="Bottom (Y-)" prop="bottom" /><InputField label="Left (X-)" prop="left" />
            </div>
            <div className="pt-4 border-t border-white/10">
                <div className="grid grid-cols-2 gap-4"><InputField label="Split Left" prop="lineLeft" /><InputField label="Split Right" prop="lineRight" /></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
