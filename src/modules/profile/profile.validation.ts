import { z } from "zod";

export const saveProfileProgressSchema = z.object({
  body: z.object({
    // --- Basic Details ---
    dateOfBirth: z.string().transform((val) => new Date(val)).optional(),
    gender: z.enum(["MALE", "FEMALE"]).optional(),
    district: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    height: z.number().positive().optional(),
    familyType: z.enum(["JOINT", "NUCLEAR", "NOT_SPECIFIED"]).optional(),
    aboutMe: z.string().optional(),
    workLocation: z.string().optional(),
    maritalStatus: z.enum(["UNMARRIED", "SEPARATED", "DIVORCED"]).optional(),

    // --- Cultural ---
    religion: z.enum(["HINDU", "MUSLIM", "SIKH", "CHRISTIAN", "OTHERS"]).optional(),
    caste: z.string().optional(),
    motherTongue: z.string().optional(),

    // --- Professional ---
    highestEducation: z.string().optional(),
    collegeUniversity: z.string().optional(),
    occupation: z.string().optional(),
    organization: z.string().optional(),
    annualIncome: z.enum(["UNDER_3L", "THREE_TO_SIX_L", "SIX_TO_TEN_L", "TEN_TO_FIFTEEN_L", "ABOVE_FIFTEEN_L"]).optional(),

    // --- Family ---
    familyValues: z.enum(["ORTHODOX", "TRADITIONAL", "MODERATE", "LIBERAL"]).optional(),
    fathersOccupation: z.string().optional(),
    mothersOccupation: z.string().optional(),
    siblings: z.number().int().nonnegative().optional(),
    siblingsMaritalStatus: z.enum(["UNMARRIED", "SEPARATED", "DIVORCED"]).optional(),

    // --- Lifestyle ---
    diet: z.enum(["VEGETARIAN", "NON_VEGETARIAN", "EGGITARIAN", "VEGAN"]).optional(),
    smoking: z.enum(["YES", "NO", "OCCASIONALLY"]).optional(),
    drinking: z.enum(["YES", "NO", "OCCASIONALLY"]).optional(),
    interests: z.array(z.string()).optional(),
  }),
});