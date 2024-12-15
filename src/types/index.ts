export interface BusinessInfo {
  name: string;
  type: string;
  colorPalette: string;
  pages: string[];
  contact: {
    email: string;
    phone: string;
    address: string;
    social: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
    };
  };
}

export interface Step {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<StepProps>;
}

export interface StepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  data: any;
}

export type ColorPalette = {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
};