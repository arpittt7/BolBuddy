'use server';
/**
 * @fileOverview Converts an announcement text to speech.
 *
 * - announcementTts: A function that takes a text string and returns an audio data URI.
 * - AnnouncementTtsInput: The input type for the announcementTts function.
 * - AnnouncementTtsOutput: The return type for the announcementTts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';
import {googleAI} from '@genkit-ai/googleai';

const AnnouncementTtsInputSchema = z.object({
  text: z.string().describe('The text to convert to speech.'),
  language: z.string().describe('The language of the text (e.g., "en-US", "hi-IN").').optional(),
});
export type AnnouncementTtsInput = z.infer<typeof AnnouncementTtsInputSchema>;

const AnnouncementTtsOutputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      'The synthesized audio of the announcement, as a data URI.'
    ),
});
export type AnnouncementTtsOutput = z.infer<
  typeof AnnouncementTtsOutputSchema
>;

export async function announcementTts(
  input: AnnouncementTtsInput
): Promise<AnnouncementTtsOutput> {
  return announcementTtsFlow(input);
}

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

const announcementTtsFlow = ai.defineFlow(
  {
    name: 'announcementTtsFlow',
    inputSchema: AnnouncementTtsInputSchema,
    outputSchema: AnnouncementTtsOutputSchema,
  },
  async input => {
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
      prompt: input.text,
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
