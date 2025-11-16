const AtsInfoSection = () => {
  return (
    <div className="bg-[#e4e6eb] py-24 px-6 flex flex-col items-center"> 
      {/* Outer Background Slightly Grey for Separation */}
      <div className="bg-white shadow-2xl rounded-3xl p-10 md:p-16 w-[95%] md:w-[80%] lg:w-[70%] border border-gray-200">
        
        {/* Section 1 */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
          What is ATS ?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
In the context of a resume, ATS stands for Applicant Tracking System, which is software that companies use to automatically scan and filter job applications. An ATS parses resumes for keywords, skills, and experience that match the job description to rank candidates, with only the highest-scoring resumes advancing to a human recruiter. For a resume to be considered "ATS-friendly," it must be formatted and written to be easily parsed by this software, ensuring it isn't filtered out during the initial automated screening. 
          </p>
<div className="max-w-md p-6 bg-white shadow-lg rounded-xl border border-gray-200">
    <h2 className="text-2xl font-bold text-gray-800 mb-5 border-b border-gray-200 pb-3">
        How an ATS Affects Your Resume
    </h2>

    <ul className="space-y-5">
        <li className="flex items-start">
            <span className="text-blue-600 text-xl mr-3 mt-1">♦</span>
            <p className="text-gray-600 leading-relaxed">
                <strong className="text-gray-800">Keyword scanning:</strong> The ATS is programmed to look for specific keywords from the job description, such as skills, job titles, and qualifications.
            </p>
        </li>

        <li className="flex items-start">
            <span className="text-blue-600 text-xl mr-3 mt-1">♦</span>
            <p className="text-gray-600 leading-relaxed">
                <strong className="text-gray-800">Ranking and scoring:</strong> It ranks your resume based on how well it matches the job requirements, assigning a score that determines if it passes the initial screening.
            </p>
        </li>

        <li className="flex items-start">
            <span className="text-blue-600 text-xl mr-3 mt-1">♦</span>
            <p className="text-gray-600 leading-relaxed">
                <strong className="text-gray-800">Automated filtering:</strong> If your resume lacks the necessary keywords or has formatting issues, it may be rejected by the ATS before a human ever sees it.
            </p>
        </li>

        <li className="flex items-start">
            <span className="text-blue-600 text-xl mr-3 mt-1">♦</span>
            <p className="text-gray-600 leading-relaxed">
                <strong className="text-gray-800">Data extraction:</strong> The system reads and extracts information like your contact details, work experience, and education to categorize it.
            </p>
        </li>
    </ul>
</div>
<div className="max-w-md ml-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
    <h2 className="text-2xl font-bold text-gray-800 mb-5 border-b border-gray-200 pb-3">
        How to make your resume "ATS-friendly"
    </h2>

    <ul className="space-y-5">
        <li className="flex items-start">
            <span className="text-blue-600 text-xl mr-3 mt-1">♦</span>
            <p className="text-gray-600 leading-relaxed">
                <strong className="text-gray-800">Use relevant keywords:</strong> Include keywords and phrases directly from the job description, using variations if appropriate (e.g., "data analysis" and "data insights").
            </p>
        </li>

        <li className="flex items-start">
            <span className="text-blue-600 text-xl mr-3 mt-1">♦</span>
            <p className="text-gray-600 leading-relaxed">
                <strong className="text-gray-800">Choose a clean format:</strong> Avoid using complex formatting like tables, columns, or graphics, which can confuse the software and cause information to be lost.
            </p>
        </li>

        <li className="flex items-start">
            <span className="text-blue-600 text-xl mr-3 mt-1">♦</span>
            <p className="text-gray-600 leading-relaxed">
                <strong className="text-gray-800">Use standard headings:</strong> Employ standard section titles like "Work Experience," "Skills," and "Education".
            </p>
        </li>

        <li className="flex items-start">
            <span className="text-blue-600 text-xl mr-3 mt-1">♦</span>
            <p className="text-gray-600 leading-relaxed">
                <strong className="text-gray-800">Use standard fonts:</strong> Use common, easy-to-read fonts that ATS software can recognize.
            </p>
        </li>
    </ul>
</div>
        </div>
<div className="flex flex-col md:flex-row items-center gap-10">
    <div className="flex-1">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 text-center">
            How our ATS work
        </h2>
        <div className="space-y-4"> 
            <div className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1 text-lg flex-shrink-0">◆</span>
                <p className="text-gray-700 text-lg leading-relaxed">
                    Our **ATS first asks for your job title or profession.** Then, it takes your resume and checks whether the given **ATS keywords are present.**
                </p>
            </div>
            <div className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1 text-lg flex-shrink-0">◆</span>
                <p className="text-gray-700 text-lg leading-relaxed">
                    Based on the keywords found in your resume, it **assigns you an ATS score.** The score depends on the relevance and weight of the keywords — some keywords give you a higher score, while others contribute less.
                </p>
            </div>
            <div className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1 text-lg flex-shrink-0">◆</span>
                <p className="text-gray-700 text-lg leading-relaxed">
                    For each candidate, you’ll receive a **detailed ranking and keyword match score**, making it easy to shortlist the best-fit profiles for your organization.
                </p>
            </div>
            
        </div>

    </div>
</div>
      </div>
    </div>
  );
};

export default AtsInfoSection;
