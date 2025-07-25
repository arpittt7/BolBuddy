'use server';
/**
 * @fileOverview Converts a mentor's introduction text to speech.
 *
 * - mentorIntroductionTts: A function that takes a mentor's name and bio and returns an audio data URI.
 * - MentorIntroductionTtsInput: The input type for the mentorIntroductionTts function.
 * - MentorIntroductionTtsOutput: The return type for the mentorIntroductionTts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';
import {googleAI} from '@genkit-ai/googleai';

const MentorIntroductionTtsInputSchema = z.object({
  name: z.string().describe("The mentor's name."),
  bio: z.string().describe("The mentor's biography."),
  language: z.string().describe('The language of the text (e.g., "en-US", "hi-IN").').optional(),
});
export type MentorIntroductionTtsInput = z.infer<
  typeof MentorIntroductionTtsInputSchema
>;

const MentorIntroductionTtsOutputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "The synthesized audio of the mentor's introduction, as a data URI."
    ),
});
export type MentorIntroductionTtsOutput = z.infer<
  typeof MentorIntroductionTtsOutputSchema
>;

export async function mentorIntroductionTts(
  input: MentorIntroductionTtsInput
): Promise<MentorIntroductionTtsOutput> {
  return mentorIntroductionTtsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'mentorIntroductionTtsPrompt',
  input: {schema: MentorIntroductionTtsInputSchema},
  prompt: `Hi, my name is {{{name}}}. {{{bio}}}`,
});

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const mentorIntroductionTtsFlow = ai.defineFlow(
  {
    name: 'mentorIntroductionTtsFlow',
    inputSchema: MentorIntroductionTtsInputSchema,
    outputSchema: MentorIntroductionTtsOutputSchema,
  },
  async input => {
    const promptText = await prompt.render(input);
    const {media} = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {voiceName: 'Algenib'},
          },
          languageCode: input.language,
        },
      },
      prompt: promptText.prompt,
    });

    if (!media) {
      throw new Error('no media returned');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );

    const wavBase64 = await toWav(audioBuffer);

    return {
      audioDataUri: 'data:audio/wav;base64,' + wavBase64,
    };
  }
);
