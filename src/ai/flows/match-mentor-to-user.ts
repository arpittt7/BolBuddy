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
});
export type MatchMentorOutput = z.infer<typeof MatchMentorOutputSchema>;

export async function matchMentor(input: MatchMentorInput): Promise<MatchMentorOutput> {
  return matchMentorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'matchMentorPrompt',
  input: {schema: z.object({
    userGoals: z.string(),
    mentors: z.any()
  })},
  output: {schema: MatchMentorOutputSchema},
  prompt: `You are an AI mentor matching service called BolBot. Given the user's goals, recommend a mentor from the following list. Explain the reasoning behind your choice, citing the mentor's expertise and bio.

User Goals: {{{userGoals}}}

Mentors:
{{#each mentors}}
Name: {{this.name}}
Expertise: {{this.expertise}}
Bio: {{this.bio}}
ID: {{this.mentorId}}
{{/each}}

Based on the user goals, return a JSON object with the 'mentor' field containing the mentor's information and a 'reason' field explaining why this mentor is a good match for the user. The mentor object must contain the mentorId, name, expertise, and bio fields.
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
      name: 'Alice Johnson',
      expertise: 'Software Development, JavaScript, React',
      bio: 'Experienced software engineer with a passion for teaching. Specializes in web development technologies.',
    },
    {
      mentorId: '2',
      name: 'Bob Williams',
      expertise: 'Data Science, Python, Machine Learning',
      bio: 'Data scientist with expertise in machine learning and data analysis. Enjoys helping others learn data science.',
    },
    {
      mentorId: '3',
      name: 'Charlie Brown',
      expertise: 'Mobile Development, Swift, iOS',
      bio: 'Mobile app developer specializing in iOS development. Passionate about building mobile apps and sharing knowledge.',
    },
     {
      mentorId: '4',
      name: 'Rahul Kumar',
      expertise: 'Python, Hindi',
      bio: 'A software developer from Delhi who is fluent in Hindi and specializes in Python.',
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
