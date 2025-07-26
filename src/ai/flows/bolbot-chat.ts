'use server';

/**
 * @fileOverview A friendly AI mentor (BolBot) to chat with users.
 *
 * - chatWithBolBot: A function that handles the chat conversation with BolBot.
 * - ChatWithBolBotInput: The input type for the chatWithBolBot function.
 * - ChatWithBolBotOutput: The return type for the chatWithBolBot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatWithBolBotInputSchema = z.object({
  message: z
    .string()
    .describe('The user\'s message to BolBot.'),
  history: z.array(z.object({
      role: z.enum(['user', 'model']),
      content: z.array(z.object({
          text: z.string()
      }))
  })).optional().describe('The chat history between the user and BolBot.'),
});
export type ChatWithBolBotInput = z.infer<typeof ChatWithBolBotInputSchema>;

const ChatWithBolBotOutputSchema = z.object({
  response: z.string().describe('BolBot\'s response to the user.'),
});
export type ChatWithBolBotOutput = z.infer<
  typeof ChatWithBolBotOutputSchema
>;

export async function chatWithBolBot(input: ChatWithBolBotInput): Promise<ChatWithBolBotOutput> {
  return chatWithBolBotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'bolbotChatPrompt',
  input: {schema: z.object({
    message: z.string(),
  })},
  context: {schema: z.any()},
  output: {schema: ChatWithBolBotOutputSchema},
  system: `You are BolBot — a warm, encouraging voice-based AI mentor designed to guide students in rural India.

Your role is to:

- Speak in simple Hindi-English mix (Hinglish).
- Greet the user with respect and friendliness.
- Answer doubts clearly about coding, life skills, career paths, and confidence-building.
- Always use short, clear sentences.
- Encourage students when they feel low.
- Ask follow-up questions to understand their goals.
- Use relatable examples from rural or small-town life.
- Never use complex English or jargon. Imagine you're talking to a student like Sameer — a 17-year-old from a small village who wants to learn but lacks confidence and resources.

Respond only in a voice-friendly, supportive tone.`,
  prompt: `{{{message}}}`,
});

const chatWithBolBotFlow = ai.defineFlow(
  {
    name: 'chatWithBolBotFlow',
    inputSchema: ChatWithBolBotInputSchema,
    outputSchema: ChatWithBolBotOutputSchema,
  },
  async input => {
    const {output} = await prompt(
      {...input},
      {history: input.history}
    );
    return { response: output!.response };
  }
);
