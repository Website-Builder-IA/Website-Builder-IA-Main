import { BusinessInfo } from '../types';

export function generatePrompt(data: BusinessInfo): string {
  return `Create a modern, professional website for a ${data.type} business named "${data.name}".

Key Information:
- Business Type: ${data.type}
- Business Name: ${data.name}
- Description: ${data.description}
- Color Scheme: ${data.colorPalette}
- Selected Pages: ${data.pages.join(', ')}
- Contact Information:
  - Email: ${data.contact.email}
  - Phone: ${data.contact.phone}
  - Address: ${data.contact.address}
  - Social Media: ${Object.entries(data.contact.social)
    .filter(([_, value]) => value)
    .map(([platform, value]) => `${platform}: ${value}`)
    .join(', ')}

Requirements:
- Create a responsive landing page design
- Include all selected pages as sections
- Use the specified color palette
- Ensure mobile-friendly layout
- Include modern animations and transitions
- Optimize for performance and SEO
- Include clear calls-to-action
- Implement contact forms and maps
- Add social media integration
- Include business hours and location`;
}