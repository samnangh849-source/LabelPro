
import React from 'react';
import { LabelData, ThemeType } from '../types';
import FlexiLabel from './FlexiLabel';
import AccLabel from './AccLabel';

interface LabelContentProps {
  data: LabelData;
  theme: ThemeType;
  lineLeft: number;
  lineRight: number;
  qrValue: string;
  isDesignMode: boolean;
}

const LabelContent: React.FC<LabelContentProps> = ({ data, theme, qrValue, isDesignMode }) => {
  if (theme === ThemeType.FLEXI) {
    return <FlexiLabel data={data} qrValue={qrValue} isDesignMode={isDesignMode} />;
  }
  return <AccLabel data={data} qrValue={qrValue} isDesignMode={isDesignMode} />;
};

export default LabelContent;
