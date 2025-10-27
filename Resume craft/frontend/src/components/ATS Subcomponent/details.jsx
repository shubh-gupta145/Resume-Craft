import React from "react";

const AtsInfoSection = () => {
  return (
    <div className="bg-[#e4e6eb] py-24 px-6 flex flex-col items-center"> 
      {/* Outer Background Slightly Grey for Separation */}
      <div className="bg-white shadow-2xl rounded-3xl p-10 md:p-16 w-[95%] md:w-[80%] lg:w-[70%] border border-gray-200">
        
        {/* Section 1 */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
            Save time on resume analysis
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Our ATS system helps you quickly analyze resumes without spending
            hours reviewing each application manually. Simply upload resumes,
            and our intelligent algorithm will extract key skills, experience,
            and qualifications automatically.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Whether you are hiring for a single role or hundreds of positions,
            our ATS ensures consistent evaluation, helping you identify the most
            qualified candidates in minutes.
          </p>
        </div>

        {/* Section 2 (Text + Image Side by Side) */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
              Create job-specific ranking
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              The ATS allows you to select a specific profession—like software
              developer, data analyst, or designer—and automatically evaluates
              resumes based on the keywords and skills most relevant to that role.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              For each candidate, you’ll receive a detailed ranking and keyword
              match score, making it easy to shortlist the best-fit profiles for
              your organization.
            </p>
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src="https://cdn.pixabay.com/photo/2016/11/19/14/00/job-1839191_1280.jpg"
              alt="ATS Illustration"
              className="rounded-2xl shadow-lg w-[80%] md:w-[85%] hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtsInfoSection;
