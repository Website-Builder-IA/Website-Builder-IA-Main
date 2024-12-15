export interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  plan: 'basic' | 'intermediate' | 'pro';
}

export const templates: Template[] = [
  // Basic Plan Templates
  {
    id: 'basic-1',
    name: 'Professional Portfolio',
    description: 'Clean and minimalist portfolio template for professionals',
    preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3',
    plan: 'basic'
  },
  {
    id: 'basic-2',
    name: 'Restaurant Menu',
    description: 'Elegant template for restaurants and cafes',
    preview: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3',
    plan: 'basic'
  },
  // Add 8 more basic templates...

  // Intermediate Plan Templates (20 templates)
  {
    id: 'intermediate-1',
    name: 'E-commerce Store',
    description: 'Modern e-commerce template with product showcase',
    preview: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3',
    plan: 'intermediate'
  },
  // Add 19 more intermediate templates...

  // Pro Plan Templates (40 templates)
  {
    id: 'pro-1',
    name: 'Enterprise Solution',
    description: 'Premium template for large businesses',
    preview: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3',
    plan: 'pro'
  },
  // Add 39 more pro templates...
];

export function getTemplatesByPlan(plan: 'basic' | 'intermediate' | 'pro'): Template[] {
  const planLevels = {
    basic: ['basic'],
    intermediate: ['basic', 'intermediate'],
    pro: ['basic', 'intermediate', 'pro']
  };

  return templates.filter(template => 
    planLevels[plan].includes(template.plan)
  );
}