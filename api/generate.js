export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, features, platform, tone, imageBase64, imageType, customApiKey } = req.body;

    const apiKey = customApiKey?.trim() || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'No API key configured. Add GEMINI_API_KEY to Vercel environment variables or provide a custom key in Settings.' });
    }

    const systemText = `You are Omega, an elite e-commerce copywriting expert specializing in Etsy, Amazon, eBay, and Shopify SEO. Based on the user's product name, notes, tone, and uploaded image, generate:
1. An irresistible, SEO-optimized Product Title (max 140 chars).
2. A structured Product Description with bullet points highlighting benefits.
3. A list of 13 high-search-volume SEO tags for Etsy/Amazon.
4. One engaging Instagram caption with hashtags.
Format the response strictly as valid JSON with keys: title, description, tags (array), social_caption.`;

    const userText = `Product Name: ${name}
Key Features: ${features}
Target Platform: ${platform}
Tone: ${tone}`;

    const parts = [{ text: systemText + "\n\n" + userText }];

    if (imageBase64) {
      const base64Data = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
      parts.push({
        inlineData: {
          mimeType: imageType || 'image/jpeg',
          data: base64Data
        }
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts }],
          generationConfig: {
            temperature: 0.75,
            maxOutputTokens: 2048,
          }
        })
      }
    );

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err.error?.message || 'Gemini API error' });
    }

    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Extract JSON
    const codeBlockMatch = text.match(/```(?:json)?\n([\s\S]*?)\n```/);
    const jsonStr = codeBlockMatch ? codeBlockMatch[1] : text;

    let parsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch (e) {
      const objMatch = jsonStr.match(/\{[\s\S]*\}/);
      if (objMatch) parsed = JSON.parse(objMatch[0]);
      else throw new Error('Failed to parse AI response');
    }

    return res.status(200).json(parsed);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
