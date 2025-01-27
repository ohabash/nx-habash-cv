import { contactInfo } from '@/data/data-contact';
import { education } from '@/data/data-education';
import { experience } from '@/data/data-experience';
import { questions } from '@/data/data-questions';
import { rules } from '@/data/data-rules';
import { skills } from '@/data/data-skills';
import { expectations } from './data-expectations';

export * from '@/data/data-experience';
export * from '@/data/data-skills';
export * from '@/data/data-questions';
export * from '@/data/data-rules';
export * from '@/data/data-education';
export * from '@/data/data-contact';
export * from '@/data/data-expectations';

export const allData = {
  experience,
  skills,
  questions,
  rules,
  education,
  contactInfo,
  expectations
};