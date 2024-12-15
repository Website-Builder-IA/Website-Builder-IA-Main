import { create } from 'zustand';

export interface WebsiteStore {
  businessName: string;
  businessType: string;
  businessDescription: string;
  targetAudience: string;
  websiteGoals: string;
  colorPreferences: string;
  selectedSections: string[];
  contactEmail: string;
  contactPhone: string;
  businessAddress: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  businessHours: string;
  competitiveAdvantages: string;
  specialOffers: string;
  
  setBusinessName: (name: string) => void;
  setBusinessType: (type: string) => void;
  setBusinessDescription: (description: string) => void;
  setTargetAudience: (audience: string) => void;
  setWebsiteGoals: (goals: string) => void;
  setColorPreferences: (colors: string) => void;
  setSelectedSections: (sections: string) => void;
  setContactEmail: (email: string) => void;
  setContactPhone: (phone: string) => void;
  setBusinessAddress: (address: string) => void;
  setSocialMedia: (social: string) => void;
  setBusinessHours: (hours: string) => void;
  setCompetitiveAdvantages: (advantages: string) => void;
  setSpecialOffers: (offers: string) => void;
}

export const useWebsiteStore = create<WebsiteStore>((set) => ({
  businessName: '',
  businessType: '',
  businessDescription: '',
  targetAudience: '',
  websiteGoals: '',
  colorPreferences: '',
  selectedSections: [],
  contactEmail: '',
  contactPhone: '',
  businessAddress: '',
  socialMedia: {},
  businessHours: '',
  competitiveAdvantages: '',
  specialOffers: '',
  
  setBusinessName: (name) => set({ businessName: name }),
  setBusinessType: (type) => set({ businessType: type }),
  setBusinessDescription: (description) => set({ businessDescription: description }),
  setTargetAudience: (audience) => set({ targetAudience: audience }),
  setWebsiteGoals: (goals) => set({ websiteGoals: goals }),
  setColorPreferences: (colors) => set({ colorPreferences: colors }),
  setSelectedSections: (sections) => set({ selectedSections: sections.split(',').map(s => s.trim()) }),
  setContactEmail: (email) => set({ contactEmail: email }),
  setContactPhone: (phone) => set({ contactPhone: phone }),
  setBusinessAddress: (address) => set({ businessAddress: address }),
  setSocialMedia: (social) => {
    const socialMedia: Record<string, string> = {};
    const links = social.split(',').map(s => s.trim());
    links.forEach(link => {
      if (link.includes('facebook')) socialMedia.facebook = link;
      if (link.includes('instagram')) socialMedia.instagram = link;
      if (link.includes('twitter')) socialMedia.twitter = link;
    });
    set({ socialMedia });
  },
  setBusinessHours: (hours) => set({ businessHours: hours }),
  setCompetitiveAdvantages: (advantages) => set({ competitiveAdvantages: advantages }),
  setSpecialOffers: (offers) => set({ specialOffers: offers })
}));