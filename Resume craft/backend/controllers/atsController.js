const pdf=require("pdf-parse");
const natural= require("natural");
const fs=require("fs");

async function analyzeResume(req,res) {
    try {
        const {jobDescription}=req.body
        const resumeFile= req.file
        const dataBuffer = fs.readFileSync(resumeFile.path);
        const data = await pdf(dataBuffer);
        fs.unlinkSync(resumeFile.path);
        const resumeText = data.text.toLowerCase();

        const tokenizer = new natural.WordTokenizer();
        const jdTokens = tokenizer.tokenize(jobDescription.toLowerCase());
        const resumeTokens = tokenizer.tokenize(resumeText);
        let matchCount = 0;
        jdTokens.forEach((token) => {
            if (resumeTokens.includes(token)) {
                matchCount++;
            }
        });
        const matchPercentage = Math.round((matchCount / jdTokens.length) * 100);

        return res.status(200).json({
        success: true,
        atsScore: matchPercentage,
        totalKeywords: jdTokens.length,
        matchedKeywords: matchCount,
        });
    } catch (error) {
        console.error("ATS error:", error);
        res.status(500).json({ success: false, message: "Error analyzing resume" });
    }
}
module.exports=analyzeResume;