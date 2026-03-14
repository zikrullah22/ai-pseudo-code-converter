require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Groq client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Translation endpoint
app.post('/api/translate', async (req, res) => {
  const { pseudo, language } = req.body;
  
  if (!pseudo || !language) {
    return res.status(400).json({ 
      success: false, 
      error: 'Missing pseudo code or language' 
    });
  }

  const prompt = `Translate the following pseudo code into ${language}. 
Output only the code, no explanations, no backticks, no markdown.

Pseudo code:
${pseudo}

${language} code:`;

  try {
    console.log(`⏳ Converting to ${language}...`);
    
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',  // ✅ WORKING MODEL
      temperature: 0.2,
      max_tokens: 1000,
    });
    
    const code = completion.choices[0]?.message?.content || '';
    console.log(`✅ Success (${code.length} chars)`);
    res.json({ success: true, code });
    
  } catch (error) {
    console.error('❌ Groq API error:', error);
    
    // Helpful error messages
    if (error.status === 400) {
      res.status(400).json({ 
        success: false, 
        error: 'Model error: ' + (error.error?.error?.message || 'Invalid request')
      });
    } else if (error.status === 401) {
      res.status(401).json({ 
        success: false, 
        error: 'API key invalid. Check your GROQ_API_KEY in .env' 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: error.message || 'Translation failed'
      });
    }
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'running', 
    model: 'llama-3.3-70b-versatile',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`
🚀 Server running at http://localhost:${PORT}
✅ Model: llama-3.3-70b-versatile (working)
🔧 Press Ctrl+C to stop
  `);
});