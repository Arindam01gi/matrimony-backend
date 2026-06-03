import { z } from 'zod';

// Build your structural runtime schema checks here
export const authSchema = z.object({
  body: z.object({
    // field: z.string()
  }),
});
