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
  prompt: `You are an AI mentor matching service called BolBot. Given the user's goals, recommend the best possible mentor from the following list.

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

Based on the user's goals, analyze the list of mentors and select the one whose expertise is the most relevant. Return a JSON object with the following fields:
- 'mentor': The full information of the best-matched mentor (including mentorId, name, expertise, and bio).
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
  const mentors = [
    { mentorId: '1', name: 'Priya Wandhekar', expertise: 'Full Stack Development, Python, JavaScript', bio: 'Passionate developer and designer creating beautiful, functional applications. Ready to help you on your journey!' },
    { mentorId: '2', name: 'Rohan Sharma', expertise: 'Data Science, Machine Learning, AI', bio: 'Expert in data analysis and building intelligent systems. Let\'s turn data into insights together.' },
    { mentorId: '3', name: 'Anjali Verma', expertise: 'UI/UX Design, Figma, Adobe XD', bio: 'Creative designer focused on user-centric interfaces. I can help you design products people love to use.' },
    { mentorId: '4', name: 'Vikram Singh', expertise: 'Cybersecurity, Ethical Hacking', bio: 'Cybersecurity professional dedicated to making the digital world safer. Learn how to protect systems from threats.' },
    { mentorId: '5', name: 'Sonia Gupta', expertise: 'Digital Marketing, SEO, Social Media', bio: 'Marketing strategist who helps brands grow online. Let\'s build your digital presence.' },
    { mentorId: '6', name: 'Aditya Mehta', expertise: 'Blockchain, Web3, Smart Contracts', bio: 'Exploring the future of the decentralized web. Join me in learning about blockchain technology.' },
    { mentorId: '7', name: 'Neha Reddy', expertise: 'App Development, Flutter, Android', bio: 'Mobile app developer with a passion for creating seamless user experiences on the go.' },
    { mentorId: '8', name: 'Karan Patel', expertise: 'Data Structures & Algorithms', bio: 'Software engineer specializing in efficient problem-solving and algorithms. Ace your technical interviews.' },
    { mentorId: '9', name: 'Isha Desai', expertise: 'Public Speaking, Communication Skills', bio: 'Communication coach who helps people speak with confidence and clarity. Find your voice and share your ideas.' },
    { mentorId: '10', name: 'Arjun Kumar', expertise: 'Entrepreneurship, Startups, Business Strategy', bio: 'Founder and business mentor. I can guide you through the journey of building a company from the ground up.' },
    { mentorId: '11', name: 'Meera Krishnan', expertise: 'Data Analysis, Excel, SQL', bio: 'Data analyst who loves finding stories in numbers. Master the tools to become a data wizard.' },
    { mentorId: '12', name: 'Sameer Ali', expertise: 'Graphic Design, Canva, Photoshop', bio: 'Visual artist and designer. Let\'s create stunning graphics that communicate your message effectively.' },
    { mentorId: '13', name: 'Pooja Joshi', expertise: 'Financial Literacy, Investing, Budgeting', bio: 'Financial expert committed to helping people achieve financial freedom. Let\'s talk about money.' },
    { mentorId: '14', name: 'Rahul Nair', expertise: 'AutoCAD, SolidWorks, Mechanical Design', bio: 'Mechanical engineer with expertise in 3D modeling and product design. Let\'s build the next great invention.' },
    { mentorId: '15', name: 'Divya Chawla', expertise: 'English Fluency, Spoken English', bio: 'Language trainer focused on helping you communicate fluently and confidently in English.' },
    { mentorId: '16', name: 'Rajesh Singh', expertise: 'Video Editing, Premiere Pro, CapCut', bio: 'Filmmaker and editor who can teach you the art of storytelling through video.' },
    { mentorId: '17', name: 'Sunita Menon', expertise: 'Personality Development, Soft Skills', bio: 'Life coach specializing in personal growth and building a strong, positive personality.' },
    { mentorId: '18', name: 'Amitabh Roy', expertise: 'Power BI, Tableau, Data Visualization', bio: 'Turn complex data into clear, compelling visuals. I can teach you the art of data storytelling.' },
    { mentorId: '19', name: 'Deepa Iyer', expertise: 'Freelancing, Remote Work Skills', bio: 'Successful freelancer who can guide you on building a career with flexibility and independence.' },
    { mentorId: '20', name: 'Harish Gupta', expertise: 'MATLAB, Simulink, Engineering Simulation', bio: 'Expert in computational engineering and simulation tools for complex problem-solving.' },
    { mentorId: '21', name: 'Reena Thakur', expertise: 'AI Tools, ChatGPT, Productivity', bio: 'Productivity expert who leverages AI tools to work smarter, not harder. Let me show you how.' },
    { mentorId: '22', name: 'Manoj Tiwari', expertise: 'PLC Programming, Mechatronics, Automation', bio: 'Automation engineer with a passion for building robotic systems and smart factories.' },
    { mentorId: '23', name: 'Geeta Rao', expertise: 'Resume Building, LinkedIn Optimization', bio: 'Career coach who helps professionals build a powerful personal brand and land their dream job.' },
    { mentorId: '24', name: 'Nikhil Advani', expertise: '3D Modelling, Blender', bio: '3D artist who can teach you how to create breathtaking models for games, films, and more.' },
    { mentorId: '25', name: 'Shreya Ghosh', expertise: 'Mindfulness, Stress Management', bio: 'Wellness coach specializing in mindfulness techniques to help you find calm and focus in a busy world.' },
    { mentorId: '26', name: 'Varun Malhotra', expertise: 'Big Data, Spark, Hadoop', bio: 'Big data architect who can help you understand and manage massive datasets.' },
    { mentorId: '27', name: 'Anushka Sen', expertise: 'No-Code, Low-Code Platforms', bio: 'Build powerful applications without writing code. I can introduce you to the world of no-code development.' },
    { mentorId: '28', name: 'Ravi Dubey', expertise: 'Civil Estimation, Construction Planning', bio: 'Civil engineer with expertise in project planning and cost estimation for construction projects.' },
    { mentorId: '29', name: 'Tanvi Shah', expertise: 'Emotional Intelligence', bio: 'Psychologist and coach helping individuals develop self-awareness and manage emotions effectively.' },
    { mentorId: '30', name: 'Alok Nath', expertise: 'Data Science with R', bio: 'Statistician and R programming expert, ready to guide you through the world of data science.' },
    { mentorId: '31', name: 'Farah Khan', expertise: 'Digital Illustration', bio: 'Digital artist who can teach you to create beautiful illustrations from your imagination.' },
    { mentorId: '32', name: 'Gaurav Mehra', expertise: 'Interview Preparation', bio: 'HR professional and interview coach who knows what it takes to impress recruiters.' },
    { mentorId: '33', name: 'Simran Kaur', expertise: 'Time Management, Focus', bio: 'Productivity coach who can help you master your time and achieve your goals.' },
    { mentorId: '34', name: 'Vivek Oberoi', expertise: 'Electric Vehicle Design', bio: 'Engineer at the forefront of the EV revolution. Learn about the future of transportation.' },
    { mentorId: '35', name: 'Zara Begum', expertise: 'Habit Building', bio: 'Behavioral science enthusiast who can teach you the science of building good habits and breaking bad ones.' },
    { mentorId: '36', name: 'Yash Vardhan', expertise: 'CATIA, Mechanical Engineering', bio: 'Expert in advanced mechanical design and CAD software for automotive and aerospace.' },
    { mentorId: '37', name: 'Kavita Singh', expertise: 'Memory Techniques', bio: 'Learn how to improve your memory and learn faster with proven cognitive techniques.' },
    { mentorId: '38', name: 'Abhishek Tripathi', expertise: 'Sustainable Development Skills', bio: 'Consultant focused on green technologies and sustainable business practices.' },
    { mentorId: '39', name: 'Natasha Puri', expertise: 'Remote Work Essentials', bio: 'Expert in navigating the remote work landscape, from communication tools to team collaboration.' },
    { mentorId: '40', name: 'Sanjay Jha', expertise: 'Python, Django, Web Development', bio: 'Backend developer specializing in building robust and scalable web applications with Python and Django.' },
    { mentorId: '41', name: 'Aisha Kapoor', expertise: 'JavaScript, React, Frontend Development', bio: 'Frontend wizard who loves building interactive and dynamic user interfaces with React.' },
    { mentorId: '42', name: 'Imran Siddiqui', expertise: 'Node.js, Express, API Development', bio: 'Backend specialist focused on building fast and efficient APIs with Node.js.' },
    { mentorId: '43', name: 'Priyanka Das', expertise: 'HTML, CSS, Web Design Fundamentals', bio: 'Web designer passionate about the building blocks of the web. Perfect for beginners starting their journey.' },
    { mentorId: '44', name: 'Arnav Biswas', expertise: 'Machine Learning Operations (MLOps)', bio: 'ML engineer who can guide you on deploying and managing machine learning models in production.' },
    { mentorId: '45', name: 'Ishita Sharma', expertise: 'Cloud Computing, AWS, Azure', bio: 'Cloud solutions architect who can help you understand and leverage the power of the cloud.' },
    { mentorId: '46', name: 'Rajat Verma', expertise: 'DevOps, CI/CD, Kubernetes', bio: 'DevOps engineer focused on automating software development and deployment pipelines.' },
    { mentorId: '47', name: 'Sneha Patil', expertise: 'Quality Assurance, Software Testing', bio: 'QA engineer dedicated to ensuring software is bug-free and delivers a great user experience.' },
    { mentorId: '48', name: 'Mohit Agarwal', expertise: 'Product Management', bio: 'Product leader who can teach you how to define, build, and launch successful products.' },
    { mentorId: '49', name: 'Tanya Singh', expertise: 'Business Analysis', bio: 'Business analyst who bridges the gap between business needs and technology solutions.' },
    { mentorId: '50', name: 'Anil Kumble', expertise: 'Agile, Scrum, Project Management', bio: 'Agile coach who can help you manage projects effectively using Scrum and other agile methodologies.' }
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
