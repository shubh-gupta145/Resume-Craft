const fs = require("fs");
const pdf = require("pdf-parse");
const natural = require("natural");

async function extractTextFromPDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  return data.text; 
}


async function analyzeResume(req, res) {
  try {
    const { jobDescription } = req.body;
    const resumeFile = req.file;

    if (!resumeFile) {
      return res.status(400).json({ success: false, message: "No resume uploaded" });
    }

    if (!jobDescription) {
      return res.status(400).json({ success: false, message: "No job description provided" });
    }

    const resumeText = (await extractTextFromPDF(resumeFile.path)).toLowerCase();
    fs.unlinkSync(resumeFile.path);

    console.log(" JD:", jobDescription);

    const tokenizer = new natural.WordTokenizer();
    const jdTokens = tokenizer.tokenize(jobDescription.toLowerCase());
    const resumeTokens = tokenizer.tokenize(resumeText);

    let matchCount = 0;
    jdTokens.forEach(token => {
      if (resumeTokens.includes(token)) matchCount++;
    });

    const matchPercentage = jdTokens.length > 0
      ? Math.round((matchCount / jdTokens.length) * 100)
      : 0;

    res.status(200).json({
      success: true,
      atsScore: matchPercentage,
      totalKeywords: jdTokens.length,
      matchedKeywords: matchCount,
    });

  } catch (error) {
    console.error("ATS error:", error);
    res.status(500).json({ success: false, message: "Error analyzing resume", error: error.message });
  }
}

module.exports = analyzeResume;
