import { useState } from "react";

const faqs = [
  { question: "What should I include in my resume?", answer: "Contact details, professional summary, work experience, education, and skills." },
  { question: "How long should my resume be?", answer: "Preferably one page, two pages if you have more experience." },
  { question: "Should I add a photo to my resume?", answer: "Generally no, unless specifically asked." },
  { question: "What is the best resume format?", answer: "Reverse-chronological format is most commonly used." },
  { question: "How do I make my resume ATS-friendly?", answer: "Use simple fonts, avoid heavy graphics, and add keywords from job description." },
  { question: "Should I mention hobbies?", answer: "Only if they are relevant to the job or showcase useful skills." },
  { question: "How far back should work experience go?", answer: "Last 10 years or 3–4 most recent jobs are enough." },
  { question: "Should I customize my resume?", answer: "Yes, always tailor it to the job description." },
  { question: "Are templates okay?", answer: "Yes, but make sure they are ATS-friendly." },
  { question: "Should I include references?", answer: "No, just write 'Available on request'." },
  { question: "Do I need a cover letter?", answer: "Yes, it adds more value to your application." },
  { question: "Should I include GPA?", answer: "Only if you are a fresher or if GPA is good." },
  { question: "How do I explain gaps?", answer: "Be honest. Mention upskilling or freelancing." },
  { question: "Can I use color?", answer: "Yes, but minimal and professional only." },
  { question: "Which font is best?", answer: "Clean fonts like Arial, Calibri, Times New Roman." },
];

 function FAQSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [openIndex, setOpenIndex] = useState(null);
  const itemsPerPage = 5;

  const startIndex = currentPage * itemsPerPage;
  const currentFAQs = faqs.slice(startIndex, startIndex + itemsPerPage);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleRefresh = () => {
    setCurrentPage((prev) => (prev + 1) % Math.ceil(faqs.length / itemsPerPage));
    setOpenIndex(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-2xl bg-white shadow-sm rounded-md p-6">
        <h2 className="text-3xl font-bold text-center mb-6">FAQ</h2>

        <div className="divide-y">
          {currentFAQs.map((faq, index) => (
            <div key={index} className="py-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center font-semibold text-gray-800 text-left"
              >
                <span>{faq.question}</span>
                <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <p className="mt-2 text-gray-600 text-sm pl-2">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={handleRefresh}
            className="bg-black text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition"
          >
            Refresh FAQs
          </button>
        </div>
      </div>
    </div>
  );
}
export default FAQSection;