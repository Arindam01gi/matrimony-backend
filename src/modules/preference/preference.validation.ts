import { z } from 'zod';

export const savePreferenceSchema = z.object({
  body: z.object({
    minAge: z.number().int().positive().optional(),
    maxAge: z.number().int().positive().optional(),
    minHeight: z.number().positive().optional(),
    maxHeight: z.number().positive().optional(),
    gender: z.enum(["MALE", "FEMALE"]).optional(),
    maritalStatus: z.array(z.enum(["UNMARRIED", "SEPARATED", "DIVORCED"])).optional(),
    religion: z.array(z.enum(["HINDU", "MUSLIM", "SIKH", "CHRISTIAN", "OTHERS"])).optional(),
    caste: z.array(z.string()).optional(),
    motherTongue: z.array(z.string()).optional(),
    highestEducation: z.array(z.string()).optional(),
    occupation: z.array(z.string()).optional(),
    annualIncome: z.array(z.enum(["UNDER_3L", "THREE_TO_SIX_L", "SIX_TO_TEN_L", "TEN_TO_FIFTEEN_L", "ABOVE_FIFTEEN_L"])).optional(),
    familyType: z.array(z.enum(["JOINT", "NUCLEAR", "NOT_SPECIFIED"])).optional(),
    familyValues: z.array(z.enum(["ORTHODOX", "TRADITIONAL", "MODERATE", "LIBERAL"])).optional(),
    district: z.array(z.string()).optional(),
    state: z.array(z.string()).optional(),
    country: z.array(z.string()).optional(),
    diet: z.array(z.enum(["VEGETARIAN", "NON_VEGETARIAN", "EGGITARIAN", "VEGAN"])).optional(),
    smoking: z.array(z.enum(["YES", "NO", "OCCASIONALLY"])).optional(),
    drinking: z.array(z.enum(["YES", "NO", "OCCASIONALLY"])).optional(),
  }),
});