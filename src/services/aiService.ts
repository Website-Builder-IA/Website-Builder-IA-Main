import { BusinessInfo } from '../types';
import { generatePrompt } from '../utils/promptGenerator';

export async function generateWebsite(data: BusinessInfo): Promise<string> {
  // Simulate AI response time
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate the website based on the data
  // In a real implementation, this would make an API call to bolt.new
  const prompt = generatePrompt(data);
  
  // For now, return a placeholder response
  return prompt;
}

export async function updateWebsite(currentPrompt: string, feedback: string): Promise<string> {
  // Simulate AI response time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real implementation, this would send the feedback to bolt.new
  // and get back an updated website
  return `${currentPrompt}\n\nUpdated based on feedback: ${feedback}`;
}