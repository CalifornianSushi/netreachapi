// netreachapi/pages/api/chat.ts
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }]
    });

    const reply = completion.choices[0]?.message?.content || '';

    res.status(200).json({ reply });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}