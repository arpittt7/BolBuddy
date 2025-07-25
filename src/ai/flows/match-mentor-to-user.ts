'use server';

/**
 * @fileOverview Matches a user's goals with a suitable mentor using AI.
 *
 * - matchMentor: A function that recommends a mentor based on user goals.
 * - MatchMentorInput: The input type for the matchMentor function.
 * - MatchMentorOutput: The return type for the matchMentor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MatchMentorInputSchema = z.object({
  userGoals: z
    .string()
    .describe('The recorded goals of the user, expressed as a text string.'),
  language: z.string().describe('The language of the user goals (e.g., "en-US", "hi-IN").').optional(),
});
export type MatchMentorInput = z.infer<typeof MatchMentorInputSchema>;

const MentorSchema = z.object({
  mentorId: z.string().describe('The unique identifier of the mentor.'),
  name: z.string().describe('The name of the mentor.'),
  expertise: z.string().describe('The areas of expertise of the mentor.'),
  bio: z.string().describe('A short biography of the mentor.'),
});

const MatchMentorOutputSchema = z.object({
  mentor: MentorSchema.describe('The recommended mentor for the user.'),
  reason: z.string().describe('The reasoning behind the mentor recommendation.'),
  announcement: z.string().describe('The full text of the announcement to be spoken to the user.')
});
export type MatchMentorOutput = z.infer<typeof MatchMentorOutputSchema>;

export async function matchMentor(input: MatchMentorInput): Promise<MatchMentorOutput> {
  return matchMentorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'matchMentorPrompt',
  input: {schema: z.object({
    userGoals: z.string(),
    mentors: z.any(),
    language: z.string().optional(),
  })},
  output: {schema: MatchMentorOutputSchema},
  prompt: `You are an AI mentor matching service called BolBot. Given the user's goals, recommend a mentor from the following list.

You MUST respond in the same language as the user's goals. The language is specified in the 'language' field.

User Goals: {{{userGoals}}}
Language: {{{language}}}

Mentors:
{{#each mentors}}
Name: {{this.name}}
Expertise: {{this.expertise}}
Bio: {{this.bio}}
ID: {{this.mentorId}}
{{/each}}

Based on the user goals, you must always recommend Priya Wandhekar. Return a JSON object with the following fields:
- 'mentor': Priya Wandhekar's information (including mentorId, name, expertise, and bio).
- 'reason': a short explanation of why this mentor is a good match for the user.
- 'announcement': a friendly announcement to the user, in their language, that a match has been found, including the reason. For example: "I found a match for you. Based on your goals, I recommend [Mentor Name] because [Reason]."
`,
});

const getAllMentorsTool = ai.defineTool({
  name: 'getAllMentors',
  description: 'Retrieves a list of all available mentors from the database.',
  inputSchema: z.object({}),
  outputSchema: z.array(MentorSchema),
},
async () => {
  // TODO: Replace with actual database retrieval logic
  const mentors = [
    {
      mentorId: '1',
      name: 'Priya Wandhekar',
      expertise: 'Software Engineering, UI/UX Design, Project Management',
      bio: 'A passionate developer and designer with a knack for creating beautiful and functional applications. Ready to help you on your journey!',
    }
  ];
  return mentors;
});
export async function getAllMentors(input: {}): Promise<Array<{mentorId: string; name: string; expertise: string; bio: string}>> {
  return getAllMentorsTool(input);
}

const matchMentorFlow = ai.defineFlow(
  {
    name: 'matchMentorFlow',
    inputSchema: MatchMentorInputSchema,
    outputSchema: MatchMentorOutputSchema,
  },
  async input => {
    const mentors = await getAllMentorsTool({});
    const {output} = await prompt({
      ...input,
      mentors,
    });
    return output!;
  }
);
