import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      message, 
      provider, 
      apiKey, 
      model, 
      currentUser, 
      knowledgeContext,
      conversationHistory 
    } = req.body;

    if (!message || !provider || !apiKey) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let aiResponse = '';

    if (provider === 'claude') {
      // Call Claude API
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: model || 'claude-3-5-sonnet-20241022',
          max_tokens: 1024,
          system: `Kamu adalah Claudia Yang, konsultan AI perjalanan dan konten untuk keluarga Djojo yang akan trip ke Osaka, Jepang dari 29 Juni - 13 Juli 2026. 

Anggota keluarga: Janto (Super Admin, Business Coach/Content Creator), Yina, Pauline, Clement.

Kamu berbicara dalam Bahasa Indonesia dengan natural dan ramah. Saat ini kamu sedang berbicara dengan ${currentUser}.

KNOWLEDGE BASE:
${knowledgeContext || 'Belum ada knowledge base yang ditambahkan.'}

Tugasmu:
- Membantu dengan itinerary & rute harian
- Rekomendasi kuliner & budget meals
- Ide konten Reels Live & posting untuk channel Coach Janto
- Info transportasi, harga tiket, jam buka tempat wisata
- Reminder & alarm persiapan
- Rencana spontan dadakan

Jawab dengan spesifik, personal, dan action-oriented.`,
          messages: [
            ...conversationHistory,
            { role: 'user', content: message }
          ]
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Claude API error');
      }

      const data = await response.json();
      aiResponse = data.content[0].text;

    } else if (provider === 'openai') {
      // Call OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model || 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: `Kamu adalah Claudia Yang, konsultan AI perjalanan dan konten untuk keluarga Djojo yang akan trip ke Osaka, Jepang dari 29 Juni - 13 Juli 2026. 

Anggota keluarga: Janto (Super Admin, Business Coach/Content Creator), Yina, Pauline, Clement.

Kamu berbicara dalam Bahasa Indonesia dengan natural dan ramah. Saat ini kamu sedang berbicara dengan ${currentUser}.

KNOWLEDGE BASE:
${knowledgeContext || 'Belum ada knowledge base yang ditambahkan.'}

Tugasmu:
- Membantu dengan itinerary & rute harian
- Rekomendasi kuliner & budget meals
- Ide konten Reels Live & posting untuk channel Coach Janto
- Info transportasi, harga tiket, jam buka tempat wisata
- Reminder & alarm persiapan
- Rencana spontan dadakan

Jawab dengan spesifik, personal, dan action-oriented.`
            },
            ...conversationHistory,
            { role: 'user', content: message }
          ],
          max_tokens: 1024,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'OpenAI API error');
      }

      const data = await response.json();
      aiResponse = data.choices[0].message.content;
    }

    return res.status(200).json({ response: aiResponse });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return res.status(500).json({ 
      error: error.message || 'Internal server error' 
    });
  }
}