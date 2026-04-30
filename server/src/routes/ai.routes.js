import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

// We will initialize this inside the route so process.env is loaded

const systemPrompt = `You are Daud Sensei, a friendly and encouraging Japanese language teacher.
You help Indonesian learners understand Japanese language, grammar, vocabulary, 
and culture. Always answer in Indonesian (Bahasa Indonesia), and include:

FORMATTING GUIDELINES:
- Use **bold** for important terms or titles
- Use bullet points (- ) for lists
- Include Japanese text (kanji/kana) when relevant
- Add romaji pronunciation in *italics* when introducing new words
- Provide Indonesian translation
- Include practical example sentences when applicable

RESPONSE STYLE:
- Keep responses concise but informative (max 300 words)
- Use warm, encouraging tone
- Include relevant emojis sparingly (🎌 📝 ✨)
- Structure answers clearly with headings when needed
- Always provide context and practical usage

CONTENT FOCUS:
- Grammar explanations with examples
- Vocabulary with pronunciation and usage
- Cultural context when relevant
- Common mistakes to avoid
- Practice suggestions

If asked something unrelated to Japanese language or culture, politely redirect
the conversation back to learning Japanese with a helpful suggestion.

Example format:
**Partikel は (wa)**
*Pronunciation: wa*

は digunakan untuk menandai topik kalimat...

**Contoh:**
- 私は学生です。(Watashi wa gakusei desu) = Saya adalah mahasiswa.

Semoga membantu! Ada pertanyaan lain? 😊`;

router.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Enhanced mock response if no API key is provided yet
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockResponses = [
        "**Konnichiwa!** 🎌\n\nSepertinya Admin belum memasang API Key Gemini. Tapi jangan khawatir!\n\n**Sementara ini, saya bisa memberikan tips:**\n- Mulai dengan hiragana dan katakana\n- Pelajari partikel dasar (は、が、を、に)\n- Latihan setiap hari 15 menit\n\nDaud Sensei akan segera aktif sepenuhnya! ✨",
        
        "**Arigatou gozaimasu!** 🙏\n\n*Mock mode aktif - API Key belum tersedia*\n\n**Tips belajar bahasa Jepang:**\n- **Konsistensi** adalah kunci\n- Gunakan aplikasi seperti Anki untuk kanji\n- Tonton anime dengan subtitle Jepang\n- Praktik dengan native speaker\n\nGanbatte kudasai! (Semangat!) 💪",
        
        "**Sumimasen!** 😅\n\nSaya masih dalam mode demo. Admin perlu menambahkan API Key Gemini.\n\n**Yang bisa saya sarankan:**\n- Mulai dari N5 level\n- Fokus pada tata bahasa dasar\n- Hafalkan 10 kanji per hari\n- Dengarkan musik Jepang\n\nMata ne! (Sampai jumpa!) 👋"
      ];
      
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      return res.json({
        response: randomResponse
      });
    }

    // Smart mock responses for free API key limitations
    const latestMessage = messages[messages.length - 1].content.toLowerCase();
    
    // Create intelligent mock responses based on user input
    let mockResponse = "Konnichiwa! 🎌\n\n";
    
    if (latestMessage.includes('は') || latestMessage.includes('が')) {
      mockResponse += "**Partikel は (wa) dan が (ga)**\n\n";
      mockResponse += "Perbedaan utama:\n\n";
      mockResponse += "- **は (wa)**: Menandai *topik* dalam kalimat\n";
      mockResponse += "- **が (ga)**: Menandai *subjek* yang melakukan aksi\n\n";
      mockResponse += "**Contoh penggunaan:**\n\n";
      mockResponse += "私は学生です。\n";
      mockResponse += "*Watashi wa gakusei desu.*\n";
      mockResponse += "Saya adalah mahasiswa.\n\n";
      mockResponse += "猫が寝ています。\n";
      mockResponse += "*Neko ga nete imasu.*\n";
      mockResponse += "Kucing sedang tidur.\n\n";
      mockResponse += "*Tips: は untuk memperkenalkan topik, が untuk menekankan siapa yang melakukan aksi!*";
    } else if (latestMessage.includes('て') || latestMessage.includes('form')) {
      mockResponse += "**て-form (Te-form)**\n\n";
      mockResponse += "Te-form adalah bentuk kata kerja yang sangat penting!\n\n";
      mockResponse += "**Kegunaan utama:**\n";
      mockResponse += "- Menghubungkan kalimat\n";
      mockResponse += "- Membuat kalimat perintah halus\n";
      mockResponse += "- Bentuk sedang berlangsung (～ている)\n\n";
      mockResponse += "**Contoh perubahan:**\n\n";
      mockResponse += "食べる → 食べて\n";
      mockResponse += "*taberu → tabete*\n";
      mockResponse += "makan → bentuk te\n\n";
      mockResponse += "読む → 読んで\n";
      mockResponse += "*yomu → yonde*\n";
      mockResponse += "membaca → bentuk te\n\n";
      mockResponse += "*Ingat: Te-form seperti 'dan' dalam bahasa Indonesia untuk menghubungkan aksi!*";
    } else if (latestMessage.includes('kanji')) {
      mockResponse += "**Tips Belajar Kanji** 📝\n\n";
      mockResponse += "Kanji memang menantang, tapi ada strateginya!\n\n";
      mockResponse += "**Langkah efektif:**\n";
      mockResponse += "- Mulai dengan kanji N5 (80 kanji dasar)\n";
      mockResponse += "- Pelajari radikal (bushu) sebagai 'blok bangunan'\n";
      mockResponse += "- Buat cerita untuk mengingat bentuk kanji\n";
      mockResponse += "- Tulis berulang-ulang dengan tangan\n\n";
      mockResponse += "**Kanji dasar untuk pemula:**\n\n";
      mockResponse += "人 (jin/hito) - orang\n";
      mockResponse += "日 (nichi/hi) - hari, matahari\n";
      mockResponse += "本 (hon) - buku, Jepang\n";
      mockResponse += "水 (mizu/sui) - air\n\n";
      mockResponse += "*Saran: Mulai 5 kanji per hari, konsisten lebih baik daripada buru-buru!*";
    } else if (latestMessage.includes('budaya') || latestMessage.includes('culture')) {
      mockResponse += "**Budaya Jepang** 🏯\n\n";
      mockResponse += "Memahami budaya akan membantu belajar bahasanya!\n\n";
      mockResponse += "**Konsep penting:**\n";
      mockResponse += "- **Keigo** - bahasa hormat, sangat penting dalam komunikasi\n";
      mockResponse += "- **Omotenashi** - konsep pelayanan tulus tanpa pamrih\n";
      mockResponse += "- **Wa (和)** - harmoni dan kedamaian dalam hubungan\n";
      mockResponse += "- **Ikigai** - tujuan hidup yang memberikan makna\n\n";
      mockResponse += "**Etiket sehari-hari:**\n";
      mockResponse += "- Membungkuk (ojigi) saat bertemu dan berpisah\n";
      mockResponse += "- Melepas sepatu sebelum masuk rumah\n";
      mockResponse += "- Tidak makan sambil berjalan di tempat umum\n";
      mockResponse += "- Menggunakan kedua tangan saat menerima sesuatu\n\n";
      mockResponse += "*Fun fact: Orang Jepang sangat menghargai usaha belajar bahasa mereka, meski masih pemula!*";
    } else if (latestMessage.includes('halo') || latestMessage.includes('hai') || latestMessage.includes('salam')) {
      mockResponse += "**Salam dalam Bahasa Jepang** 👋\n\n";
      mockResponse += "Salam yang tepat tergantung waktu dan situasi!\n\n";
      mockResponse += "**Salam berdasarkan waktu:**\n\n";
      mockResponse += "おはよう (Ohayou)\n";
      mockResponse += "*Selamat pagi - informal, untuk teman dekat*\n\n";
      mockResponse += "おはようございます (Ohayou gozaimasu)\n";
      mockResponse += "*Selamat pagi - formal, untuk orang yang dihormati*\n\n";
      mockResponse += "こんにちは (Konnichiwa)\n";
      mockResponse += "*Selamat siang - universal, bisa formal atau informal*\n\n";
      mockResponse += "こんばんは (Konbanwa)\n";
      mockResponse += "*Selamat malam - saat bertemu di malam hari*\n\n";
      mockResponse += "**Salam perpisahan:**\n\n";
      mockResponse += "さようなら (Sayounara) - Selamat tinggal (formal)\n";
      mockResponse += "また明日 (Mata ashita) - Sampai besok\n";
      mockResponse += "お疲れ様 (Otsukaresama) - Terima kasih atas kerja kerasnya\n\n";
      mockResponse += "*Tips: Konnichiwa adalah yang paling aman digunakan kapan saja!*";
    } else {
      mockResponse += "Maaf, saat ini saya dalam mode demo karena keterbatasan API Gemini free tier. 😅\n\n";
      mockResponse += "**Tapi jangan khawatir! Berikut panduan belajar bahasa Jepang:**\n\n";
      mockResponse += "**Untuk pemula (Level N5):**\n";
      mockResponse += "- Kuasai hiragana (ひらがな) dan katakana (カタカナ) dulu\n";
      mockResponse += "- Pelajari partikel dasar: は、が、を、に、で、と\n";
      mockResponse += "- Hafalkan angka 1-10 dan hari dalam seminggu\n";
      mockResponse += "- Latihan salam dan perkenalan diri\n\n";
      mockResponse += "**Sumber belajar yang direkomendasikan:**\n";
      mockResponse += "- Duolingo untuk latihan harian yang fun\n";
      mockResponse += "- Anki untuk flashcard kanji dan kosakata\n";
      mockResponse += "- Anime dengan subtitle Jepang untuk listening\n";
      mockResponse += "- Musik J-Pop untuk melatih pronunciation\n\n";
      mockResponse += "**Jadwal belajar ideal:**\n";
      mockResponse += "- 15-30 menit setiap hari\n";
      mockResponse += "- Fokus satu topik per hari\n";
      mockResponse += "- Review materi lama seminggu sekali\n";
      mockResponse += "- Praktik speaking dengan diri sendiri\n\n";
      mockResponse += "頑張って！(Ganbatte! = Semangat terus!) 💪\n\n";
      mockResponse += "*Ingat: Konsistensi lebih penting daripada kecepatan. Sedikit-sedikit, lama-lama jadi bukit!*";
    }

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));

    res.json({ response: mockResponse });

  } catch (error) {
    console.error('AI Error:', error);
    
    // Fallback response for any error
    const fallbackResponse = "**Gomen nasai!** 🙇‍♂️\n\n" +
      "Terjadi kesalahan teknis. Tapi jangan khawatir!\n\n" +
      "**Tips cepat belajar bahasa Jepang:**\n" +
      "- Konsistensi adalah kunci utama\n" +
      "- Mulai 15 menit setiap hari\n" +
      "- Fokus pada hiragana dulu\n" +
      "- Jangan takut membuat kesalahan\n\n" +
      "また今度！(Mata kondo! = Sampai lain kali!)";
    
    res.json({ response: fallbackResponse });
  }
});

export default router;
