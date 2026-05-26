import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, provider, apiKey, model, currentUser, knowledgeContext, conversationHistory } = req.body;

  // Validate required fields
  if (!message || !provider || !apiKey) {
    return res.status(400).json({ error: 'Missing required fields: message, provider, apiKey' });
  }

  try {
    let aiResponse = '';

    if (provider === 'claude') {
      // Claude API call
      const claudeMessages = [
        ...conversationHistory,
        { role: 'user', content: message }
      ];

      const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: model || 'claude-3-5-sonnet-20240620',
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
          messages: claudeMessages
        })
      });

      if (!claudeResponse.ok) {
        const errorData = await claudeResponse.json();
        console.error('Claude API Error:', errorData);
        throw new Error(errorData.error?.message || `Claude API error: ${claudeResponse.status}`);
      }

      const data = await claudeResponse.json();
      aiResponse = data.content[0].text;

    } else if (provider === 'openai') {
      // OpenAI API call
      const openaiMessages = [
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
      ];

      const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model || 'gpt-4o',
          messages: openaiMessages,
          max_tokens: 1024,
          temperature: 0.7
        })
      });

      if (!openaiResponse.ok) {
        const errorData = await openaiResponse.json();
        console.error('OpenAI API Error:', errorData);
        throw new Error(errorData.error?.message || `OpenAI API error: ${openaiResponse.status}`);
      }

      const data = await openaiResponse.json();
      aiResponse = data.choices[0].message.content;

    } else {
      throw new Error('Invalid provider. Must be "claude" or "openai"');
    }

    return res.status(200).json({ response: aiResponse });

  } catch (error: any) {
    console.error('API Handler Error:', error);
    return res.status(500).json({ 
      error: error.message || 'Internal server error' 
    });
  }
}