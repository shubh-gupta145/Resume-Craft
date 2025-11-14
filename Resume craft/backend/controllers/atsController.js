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
    const { jobProfile } = req.body;
    const resumeFile = req.file;

    if (!resumeFile) {
      return res.status(400).json({ success: false, message: "No resume uploaded" });
    }

    if (!jobProfile) {
      return res.status(400).json({ success: false, message: "No job profile provided" });
    }

  
    const resumeTextRaw = await extractTextFromPDF(resumeFile.path);
    const resumeText = resumeTextRaw.toLowerCase();


    fs.unlinkSync(resumeFile.path);


    const emailMatch = resumeText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/);
    const phoneMatch = resumeText.match(/(\+?\d{1,3}[\s-]?)?\(?\d{3,5}\)?[\s-]?\d{3,5}[\s-]?\d{3,5}/);

    const email = emailMatch ? emailMatch[0] : "Not found";
    const phone = phoneMatch ? phoneMatch[0] : "Not found";

 
    const lines = resumeText.split("\n").map(l => l.trim()).filter(Boolean);
    let name = "Not found";

    for (let line of lines) {
      if (line.includes("@") || line.match(/\d{3}/)) break;
      if (line.length > 3 && line.split(" ").length <= 5) {
        name = line
          .replace(/[^a-zA-Z\s]/g, "")
          .split(" ")
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
        break;
      }
    }

    const keywordSets = {
      "web developer": [
        "html", "css", "javascript", "react", "node", "express", "frontend",
        "backend", "api", "git", "bootstrap", "typescript"
      ],
      "software developer": [
        "python", "java", "c++", "algorithms", "data structures", "oop",
        "git", "sql", "debugging", "testing"
      ],
      "data analyst": [
        "excel", "sql", "python", "pandas", "data visualization",
        "powerbi", "tableau", "statistics", "analytics"
      ],
      "ui ux designer": [
        "figma", "adobe xd", "wireframe", "prototype", "user research",
        "design system", "ux", "ui", "accessibility"
      ],
      "mobile developer": [
        "react native", "flutter", "kotlin", "swift", "android", "ios",
        "mobile app", "api integration"
      ]
    };

    const jdTokens = keywordSets[jobProfile.toLowerCase()] || [];

    const tokenizer = new natural.WordTokenizer();
    const resumeTokens = tokenizer.tokenize(resumeText);


    let totalScore = 0;

  
    const maxSkillScore = 40;
    let matchedSkills = [];

    jdTokens.forEach(skill => {
      if (resumeTokens.includes(skill)) matchedSkills.push(skill);
    });

    const skillScore = Math.round((matchedSkills.length / jdTokens.length) * maxSkillScore);
    totalScore += skillScore;

  
    const projectKeywords = ["project", "built", "developed", "created", "implemented"];
    let projectScore = projectKeywords.some(kw => resumeText.includes(kw)) ? 20 : 0;
    totalScore += projectScore;

    const certificationKeywords = ["certificate", "certification", "course", "training"];
    let certificateScore = certificationKeywords.some(kw => resumeText.includes(kw)) ? 15 : 0;
    totalScore += certificateScore;

    
    const experienceKeywords = ["experience", "internship", "worked", "position", "role"];
    let experienceScore = experienceKeywords.some(kw => resumeText.includes(kw)) ? 15 : 0;
    totalScore += experienceScore;


    const educationKeywords = ["education", "bachelor", "master", "degree", "university", "college"];
    let educationScore = educationKeywords.some(kw => resumeText.includes(kw)) ? 10 : 0;
    totalScore += educationScore;

    const atsFinalScore = totalScore;

   
    res.status(200).json({
      success: true,
      jobProfile,
      name,
      email,
      phone,
      atsScore: atsFinalScore,
      breakdown: {
        skillScore,
        projectScore,
        certificateScore,
        experienceScore,
        educationScore,
      },
      matchedSkills,
      matchedKeywords: matchedSkills.length,
      totalKeywords: jdTokens.length
    });

  } catch (error) {
    console.error("ATS error:", error);
    res.status(500).json({
      success: false,
      message: "Error analyzing resume",
      error: error.message,
    });
  }
}

module.exports = analyzeResume;
