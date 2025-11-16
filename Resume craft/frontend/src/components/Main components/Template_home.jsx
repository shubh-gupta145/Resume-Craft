import React, { useState, useMemo } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function ResumeBuilderPro() {
  const [selectedTemplate, setSelectedTemplate] = useState("A");

  const [formData, setFormData] = useState({
    name: "S Gupta",
    title: "Software Developer",
    contact: "youremail@example.com | +91 99999 99999",
    about: "I build delightful interfaces and resume tools.",
    skills: ["JavaScript", "React", "Node.js"],
    experience: [
  { role: "", company: "", year: "", description: "" }],
    education: [{ degree: "", school: "", year: "",description:"" }],
    projects: [],
    certifications: [],
  });

  const [newSkill, setNewSkill] = useState("");
  const [newExp, setNewExp] = useState({
  role: "",
  company: "",
  year: "",
  description: ""
});
const [newEdu, setNewEdu] = useState({
  degree: "",
  school: "",
  year: "",
  description: ""
});

  const [newProject, setNewProject] = useState({ title: "", description: "" });
  const [newCert, setNewCert] = useState({ name: "", issuer: "" });

  const initials = useMemo(() => {
    if (!formData.name) return "";
    return formData.name
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }, [formData.name]);

  const updateField = (k, v) => setFormData((s) => ({ ...s, [k]: v }));

  const addSkill = () => {
    const v = newSkill.trim();
    if (!v) return;
    setFormData((s) => ({ ...s, skills: [...s.skills, v] }));
    setNewSkill("");
  };
  const removeSkill = (i) => setFormData((s) => ({ ...s, skills: s.skills.filter((_, idx) => idx !== i) }));

  const addExp = () => {
    if (!newExp.role || !newExp.company) return;
    setFormData((s) => ({ ...s, experience: [...s.experience, newExp] }));
    setNewExp({ role: "", company: "", year: "" });
  };
  const removeExp = (i) => setFormData((s) => ({ ...s, experience: s.experience.filter((_, idx) => idx !== i) }));

  const addEdu = () => {
    if (!newEdu.degree || !newEdu.school) return;
    setFormData((s) => ({ ...s, education: [...s.education, newEdu] }));
    setNewEdu({ degree: "", school: "", year: "" });
  };
  const removeEdu = (i) => setFormData((s) => ({ ...s, education: s.education.filter((_, idx) => idx !== i) }));

  const addProject = () => {
    if (!newProject.title) return;
    setFormData((s) => ({ ...s, projects: [...s.projects, newProject] }));
    setNewProject({ title: "", description: "" });
  };
  const removeProject = (i) => setFormData((s) => ({ ...s, projects: s.projects.filter((_, idx) => idx !== i) }));

  const addCert = () => {
    if (!newCert.name) return;
    setFormData((s) => ({ ...s, certifications: [...s.certifications, newCert] }));
    setNewCert({ name: "", issuer: "" });
  };
  const removeCert = (i) => setFormData((s) => ({ ...s, certifications: s.certifications.filter((_, idx) => idx !== i) }));
  const downloadPDF = async () => {
  const el = document.getElementById("resume-preview");
  if (!el) return;

  // 🧩 Step 1: Sanitize all elements for unsupported color functions
  const elements = el.querySelectorAll("*");
  elements.forEach((elem) => {
    const style = getComputedStyle(elem);
    const bg = style.backgroundColor;
    const color = style.color;
    const borderColor = style.borderColor;

    // Replace oklch() or oklab() color values with safe fallbacks
    const hasBadColor = (v) => /oklch|oklab/i.test(v);
    if (hasBadColor(bg)) elem.style.backgroundColor = "#ffffff";
    if (hasBadColor(color)) elem.style.color = "#000000";
    if (hasBadColor(borderColor)) elem.style.borderColor = "#000000";
  });

  // 🧩 Step 2: Temporarily set PDF-friendly styles
  const prevBackground = el.style.background;
  const prevColor = el.style.color;
  el.className = "";
  el.setAttribute(
    "style",
    "background:#ffffff; color:#000000; width:794px; min-height:1123px; padding:2rem;"
  );

  try {
    // 🖼 Step 3: Generate high-res canvas
    const canvas = await html2canvas(el, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
      scrollX: 0,
      scrollY: 0,
      windowWidth: el.scrollWidth,
      windowHeight: el.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const pxToMm = 0.264583;
    const imgWidthMm = canvas.width * pxToMm;
    const imgHeightMm = canvas.height * pxToMm;

    let renderWidth = pageWidth;
    let renderHeight = (imgHeightMm * pageWidth) / imgWidthMm;
    let position = 0;

    if (renderHeight > pageHeight) {
    const scale = pageHeight / renderHeight;
    const newWidth = renderWidth * scale;
    const newHeight = renderHeight * scale;
    const x = (pageWidth - newWidth) / 2;
    pdf.addImage(imgData, "PNG", x, 0, newWidth, newHeight);
    } else {
    pdf.addImage(imgData, "PNG", 0, 0, renderWidth, renderHeight);
    }

    pdf.save(`${formData.name.replace(/\s+/g, "_") || "resume"}.pdf`);
  } catch (e) {
    console.error("PDF generation error:", e);
    alert("Failed to generate PDF. Check console for details.");
  } finally {
    // ♻️ Step 4: Restore styles
    el.style.background = prevBackground;
    el.style.color = prevColor;
  }
};

    const downloadATSPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const lineGap = 7;
    let y = 10;

    const addLine = (text) => {
        pdf.text(text, 10, y);
        y += lineGap;
    };

    addLine(`Name: ${formData.name}`);
    addLine(`Title: ${formData.title}`);
    addLine(`Contact: ${formData.contact}`);
    addLine("");
    addLine("About:");
    addLine(formData.about);
    addLine("");

    addLine("Skills:");
    formData.skills.forEach((s) => addLine("- " + s));
    addLine("");

    addLine("Experience:");
    formData.experience.forEach((e) =>
        addLine(`- ${e.role} at ${e.company} (${e.year})`)
    );
    addLine("");

    addLine("Education:");
    formData.education.forEach((ed) =>
        addLine(`- ${ed.degree} at ${ed.school} (${ed.year})`)
    );
    addLine("");

    if (formData.projects.length > 0) {
        addLine("Projects:");
        formData.projects.forEach((p) =>
        addLine(`- ${p.title}: ${p.description}`)
        );
        addLine("");
    }

    if (formData.certifications.length > 0) {
        addLine("Certifications:");
        formData.certifications.forEach((c) =>
        addLine(`- ${c.name} (${c.issuer})`)
        );
    }

    pdf.save(`${formData.name.replace(/\s+/g, "_")}_ATS.pdf`);
    };


  const TemplateCard = ({ children, variant }) => {
    const base = "w-[794px] min-h-[1123px] p-8 rounded shadow-inner overflow-hidden";
    if (variant === "blue") return <div className={`${base} bg-gradient-to-br from-blue-700 to-blue-900 text-white`}>{children}</div>;
    if (variant === "green") return <div className={`${base} bg-gradient-to-br from-green-700 to-green-900 text-white`}>{children}</div>;
    if (variant === "red") return <div className={`${base} bg-gradient-to-br from-red-700 to-red-900 text-white`}>{children}</div>;
    if (variant === "purple") return <div className={`${base} bg-gradient-to-br from-purple-700 to-purple-900 text-white`}>{children}</div>;
    if (variant === "orange") return <div className={`${base} bg-gradient-to-br from-orange-700 to-orange-900 text-white`}>{children}</div>;
    return <div className={`${base} bg-gray-50 text-black`}>{children}</div>;
  };

  const renderProjects = () =>
    formData.projects.length > 0 && (
      <div className="mt-4">
        <h3 className="font-bold border-b pb-1">Projects</h3>
        <div className="mt-2 text-sm space-y-1">
          {formData.projects.map((p, i) => (
            <div key={i}>
              <div className="font-semibold">{p.title}</div>
              <div className="text-xs text-gray-600">{p.description}</div>
            </div>
          ))}
        </div>
      </div>
    );

  const renderCertifications = () =>
    formData.certifications.length > 0 && (
      <div className="mt-4">
        <h3 className="font-bold border-b pb-1">Certifications</h3>
        <div className="mt-2 text-sm space-y-1">
          {formData.certifications.map((c, i) => (
            <div key={i}>
              <div className="font-semibold">{c.name}</div>
              <div className="text-xs text-gray-600">{c.issuer}</div>
            </div>
          ))}
        </div>
      </div>
    );
     const templates = {
    A: (
<TemplateCard variant="light">
  {/* Header */}
  <div className="flex items-center gap-4">
    <div className="w-14 h-14 rounded-full bg-gray-800 text-white flex items-center justify-center text-lg font-semibold">
      {initials}
    </div>
    <div>
      <div className="text-3xl font-extrabold">
        {formData.name || "Your Name Here"}
      </div>
      <div className="text-sm text-gray-700 mt-1">
        {formData.title || "Your Job Title"}
      </div>
    </div>
  </div>

  {/* About */}
  <div className="mt-6">
    <h3 className="font-bold text-lg border-b pb-1">About Me</h3>
    <p className="mt-2 text-sm">
      {formData.about || "Write a short introduction about yourself..."}
    </p>
  </div>

  <div className="mt-6 grid grid-cols-3 gap-4">

    {/* LEFT SECTION */}
    <div className="col-span-2">

      {/* Experience */}
      <h3 className="font-bold border-b pb-1">Experience</h3>
      <div className="mt-2 text-sm space-y-2">
        {formData.experience.length > 0 ? (
          formData.experience.map((ex, i) => (
            <div key={i}>
              <div className="font-semibold">{ex.role}</div>
              <div className="text-xs text-gray-600">{ex.company} • {ex.year}</div>
              <p className="text-xs text-gray-700">{ex.description || ""}</p>
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-500">Add your work experience here...</p>
        )}
      </div>

      {/* Education */}
      <div className="mt-6">
        <h3 className="font-bold border-b pb-1">Education</h3>
        <div className="mt-2 text-sm">
          {formData.education.length > 0 ? (
            formData.education.map((ed, i) => (
              <div key={i} className="mb-2">
                <div className="font-semibold">{ed.degree}</div>
                <div className="text-xs text-gray-600">{ed.school} • {ed.year}</div>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500">Add your educational details...</p>
          )}
        </div>
      </div>

      {/* Projects */}
      <div className="mt-6">
        <h3 className="font-bold border-b pb-1">Projects</h3>
        <div className="mt-2 text-sm">
          {formData.projects?.length > 0 ? (
            formData.projects.map((pr, i) => (
              <div key={i} className="mb-2">
                <div className="font-semibold">{pr.title}</div>
                <p className="text-xs text-gray-700">{pr.description}</p>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500">List your projects here...</p>
          )}
        </div>
      </div>

      {/* Certifications */}
      <div className="mt-6">
        <h3 className="font-bold border-b pb-1">Certifications</h3>
        <div className="mt-2 text-sm">
          {formData.certifications?.length > 0 ? (
            formData.certifications.map((ce, i) => (
              <div key={i} className="mb-2">
                <div className="font-semibold">{ce.name}</div>
                <div className="text-xs text-gray-600">Issued by {ce.issuedBy}</div>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500">Add your certifications...</p>
          )}
        </div>
      </div>

    </div>

    {/* RIGHT SIDEBAR */}
    <aside className="col-span-1 bg-white/60 p-3 rounded">
      <h4 className="font-bold">Contact</h4>
      <div className="text-xs mt-1 text-gray-700">
        {formData.contact || "Your email | Phone number"}
      </div>

      <h4 className="font-bold mt-4">Skills</h4>
      <ul className="mt-2 list-disc ml-4 text-sm space-y-1">
        {formData.skills.length > 0 ? (
          formData.skills.map((s, i) => <li key={i}>{s}</li>)
        ) : (
          <p className="text-xs text-gray-500">Add your top skills...</p>
        )}
      </ul>
    </aside>

  </div>
</TemplateCard>

    ),
    B: (
// **********************************************
        <TemplateCard variant="light">
            <div className="flex justify-between items-center mb-4">
                {/* Left Header - Name, Title, Contact */}
                <div>
                    <div className="text-4xl font-extrabold text-blue-700 uppercase tracking-wide">
                        {formData.name || "HERMAN WALTON"}
                    </div>
                    <div className="text-xl font-semibold text-gray-800 mt-1">
                        {formData.title || "FINANCIAL ANALYST"}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                        {formData.contact.replace(' | ', ' | ')} | Market Street 12, New York, 1021, The USA 
                    </div>
                </div>
                {/* Right Header - Image Placeholder */}
                <div className="w-20 h-24 bg-gray-200 border-2 border-blue-500 overflow-hidden flex items-center justify-center flex-shrink-0">
                    {/*  - Placeholder for image tag */}
                    <div className="text-sm text-gray-500">{initials}</div>
                </div>
            </div>

            {/* --- SUMMARY --- */}
            <div className="mb-4 pt-2">
                <div className="text-base font-bold text-blue-700 border-b border-blue-700 pb-1 uppercase tracking-wider">
                    Summary
                </div>
                <p className="mt-2 text-sm text-gray-700 leading-snug">
                    {formData.about || "Experienced and driven Financial Analyst with an impressive background of managing multi-million dollar budgets while providing analysis and account support within product development departments. Worked to reduce business expenses and develop logical and advantageous operating plan budgets. Experience creating quarterly accruals based on trends and forecasted expenses."}
                </p>
            </div>

            {/* --- PROFESSIONAL EXPERIENCE --- */}
            <div className="mb-4 pt-2">
                <div className="text-base font-bold text-blue-700 border-b border-blue-700 pb-1 uppercase tracking-wider">
                    Professional Experience
                </div>
                <div className="mt-2 space-y-4">
                    {formData.experience.map((ex, i) => (
                        <div key={i} className="text-sm">
                            <div className="flex justify-between items-start">
                                <div className="font-semibold text-gray-800">{ex.role} <span className="text-gray-600 font-normal">, {ex.company}</span></div>
                                <div className="text-xs font-semibold text-gray-600">{ex.year}</div>
                            </div>
                            <ul className="list-disc ml-5 mt-1 text-gray-700 space-y-0.5">
                                <li>Created budgets and ensured that labor and material costs were decreased by 15 percent.</li>
                                <li>Created financial reports on completed projects, indicating advantage results.</li>
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- EDUCATION --- */}
            <div className="mb-4 pt-2">
                <div className="text-base font-bold text-blue-700 border-b border-blue-700 pb-1 uppercase tracking-wider">
                    Education
                </div>
                <div className="mt-2 space-y-4">
                    {formData.education.map((ed, i) => (
                        <div key={i} className="text-sm">
                            <div className="flex justify-between items-start">
                                <div className="font-semibold text-gray-800">{ed.degree}</div>
                                <div className="text-xs font-semibold text-gray-600">{ed.year}</div>
                            </div>
                            <div className="text-xs text-gray-600">{ed.school} | Graduated with High Honors.</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- TECHNICAL SKILLS --- */}
            <div className="mb-4 pt-2">
                <div className="text-base font-bold text-blue-700 border-b border-blue-700 pb-1 uppercase tracking-wider">
                    Technical Skills
                </div>
                <div className="mt-2 text-sm text-gray-700 grid grid-cols-4 gap-x-4 gap-y-1">
                    {formData.skills.map((s, i) => <div key={i}>{s}</div>)}
                    {/* Adding placeholder skills for the multi-column effect */}
                    <div>Analytical Thinker</div>
                    <div>Innovation</div>
                    <div>Agile Methodologies</div>
                    <div>Creative Problem Solving</div>
                    <div>Networking</div>
                </div>
            </div>
            
            {/* --- ADDITIONAL INFORMATION (Languages/Certificates) --- */}
            <div className="mb-4 pt-2">
                <div className="text-base font-bold text-blue-700 border-b border-blue-700 pb-1 uppercase tracking-wider">
                    Additional Information
                </div>
                <div className="mt-2 text-sm text-gray-700 space-y-1">
                    <p>• **Languages:** English, French</p>
                    <p>• **Certificates:** Financial Analyst License</p>
                    <p>• **Awards/Activities:** Most Innovate Employer of the Year (2011), Overall Best Employee Division Two (2009)</p>
                    {renderCertifications()}

                </div>
            </div>
        </TemplateCard>
    ),
    C : (
<TemplateCard variant="tealAccent"> {/* या variant="light" */}
            {/* Header Section with Blue/Teal background accent */}
            <div className="border-b border-gray-300 pb-4 mb-6 relative" style={{ 
              backgroundImage: 'linear-gradient(to right bottom, #add8e6, #5f9ea0)',
              padding: '24px',
              margin: '-32px -32px 24px -32px',
              color: 'white'
            }}>
                <div className="flex items-center gap-6">
                    {/* Profile Picture Placeholder */}
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 border-4 border-white/50">
                        {/*  */}
                    </div>
                    <div>
                        <div className="text-4xl font-extrabold tracking-wider">{formData.name}</div>
                        <div className="text-lg font-semibold mt-1">{formData.title}</div>
                        <p className="mt-2 text-sm text-white/90">{formData.about}</p>
                    </div>
                </div>
            </div>
            
            {/* Main Two-Column Content Area */}
            <div className="grid grid-cols-[3fr_2fr] gap-8">
                
                {/* LEFT COLUMN: Experience and Education (Chronological) */}
                <div className="space-y-6">
                    
                    {/* Work Experiences */}
                    <div className="pt-2">
                        <h3 className="font-bold text-lg border-b-2 pb-1 text-[#D4AF37] border-[#D4AF37]">Work Experiences</h3>
                        <div className="mt-3 space-y-4 text-gray-800">
                            {formData.experience.map((ex, i) => (
                                <div key={i}>
                                    <div className="text-sm font-bold">{ex.company} | {ex.year}</div>
                                    <div className="text-xs text-gray-500 mt-1">{ex.role}</div>
                                    <p className="text-sm mt-1">{formData.about}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Educations */}
                    <div className="pt-2">
                        <h3 className="font-bold text-lg border-b-2 pb-1 text-[#D4AF37] border-[#D4AF37]">Educations</h3>
                        <div className="mt-3 space-y-4 text-gray-800">
                            {formData.education.map((ed, i) => (
                                <div key={i}>
                                    <div className="text-sm font-bold">{ed.school}</div>
                                    <div className="text-xs text-gray-500 mt-1">{ed.degree} {ed.year}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Projects */}
                    {renderProjects()}

                </div>

                {/* RIGHT COLUMN: Contact, Expertise, Certificates */}
                <div className="space-y-6">
                    
                    {/* Contact */}
                    <div className="pt-2">
                        <h3 className="font-bold text-lg border-b-2 pb-1 text-[#D4AF37] border-[#D4AF37]">Contact</h3>
                        <div className="mt-3 text-sm space-y-1 text-gray-700">
                            <p>{formData.contact.split(' | ')[1] || '123-456-7890'}</p>
                            <p>{formData.contact.split(' | ')[0] || 'youremail@example.com'}</p>
                            <p>108 N Platinum Ave Deming, NY 88030</p>
                        </div>
                    </div>
                    
                    {/* Expertise/Skills */}
                    <div className="pt-2">
                        <h3 className="font-bold text-lg border-b-2 pb-1 text-[#D4AF37] border-[#D4AF37]">Expertise</h3>
                        <ul className="mt-3 text-sm list-none space-y-1 text-gray-700">
                            {formData.skills.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>
                    
                    {/* Certificates */}
                    <div className="pt-2">
                        <h3 className="font-bold text-lg border-b-2 pb-1 text-[#D4AF37] border-[#D4AF37]">Certificates</h3>
                        {renderCertifications()}
                    </div>
                </div>
            </div>
        </TemplateCard>
    ),
// ... Templates A, B, C ...

D: (
    <TemplateCard variant="light">
        <div className="grid grid-cols-[1fr_3fr] h-full">
            
            {/* LEFT COLUMN: DARK SIDEBAR (Contact, Skills, Languages, Hobbies) */}
            <div className="bg-[#212836] text-white p-6 relative">
                
                {/* Profile Picture */}
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-white/50 bg-gray-600">
                    {/* Placeholder for future image upload */}
                </div>
                
                <div className="text-center mb-6">
                    <div className="text-2xl font-bold">{formData.name}</div>
                    <div className="text-sm text-gray-300">{formData.title}</div>
                </div>

                {/* --- Contact --- */}
                <div className="mb-4">
                    <h4 className="font-bold text-base border-b border-gray-500 pb-1 mb-2">CONTACT</h4>
                    <div className="text-xs space-y-1 text-gray-300">
                        {/* Splitting contact field into email and phone for better display */}
                        <p>📞 {formData.contact.split(' | ')[1] || '91 99999 99999'}</p>
                        <p>📧 {formData.contact.split(' | ')[0] || 'youremail@example.com'}</p>
                        {/* Hardcoded Address Placeholder */}
                        <p>📍 123 Main St, City, Country</p>
                    </div>
                </div>

                {/* --- Skills --- */}
                <div className="mb-4">
                    <h4 className="font-bold text-base border-b border-gray-500 pb-1 mb-2">SKILLS</h4>
                    <ul className="list-none text-sm space-y-1">
                        {formData.skills.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                </div>

                {/* --- Languages (Placeholder) --- */}
                <div className="mb-4">
                    <h4 className="font-bold text-base border-b border-gray-500 pb-1 mb-2">LANGUAGES</h4>
                    <div className="text-sm space-y-1">
                        <p>English: **Fluent**</p>
                        <p>Hindi: **Native**</p>
                    </div>
                </div>
                
                {/* --- Hobbies (Placeholder) --- */}
                <div>
                    <h4 className="font-bold text-base border-b border-gray-500 pb-1 mb-2">HOBBIES</h4>
                    <div className="text-sm space-y-1">
                        <p>Writing, Cricket, Music</p>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: MAIN CONTENT (Profile, Experience, Education) */}
            <div className="p-6">
                
                {/* --- Profile --- */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold border-b-2 border-gray-800 pb-1 mb-2">PROFILE</h3>
                    <p className="text-sm text-gray-700">{formData.about}</p>
                </div>

                {/* --- Work Experience --- */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold border-b-2 border-gray-800 pb-1 mb-4">WORK EXPERIENCE</h3>
                    {formData.experience.map((ex, i) => (
                        <div key={i} className="mb-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="font-bold text-sm">{ex.role}</div>
                                    <div className="text-xs text-gray-600">{ex.company} • Country</div>
                                </div>
                                <div className="text-xs text-gray-500">{ex.year}</div>
                            </div>
                            <ul className="mt-1 ml-4 list-disc text-sm text-gray-700 space-y-1">
                                {/* Using placeholder text for bullet points */}
                                <li>Developed and maintained software using languages like Python and C++.</li>
                                <li>Led cross-functional teams to deliver successful software projects.</li>
                            </ul>
                        </div>
                    ))}
                </div>

                {/* --- Education --- */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold border-b-2 border-gray-800 pb-1 mb-4">EDUCATION</h3>
                    {formData.education.map((ed, i) => (
                        <div key={i} className="mb-4">
                            <div className="flex justify-between items-start">
                                <div className="font-bold text-sm">{ed.degree}</div>
                                <div className="text-xs text-gray-500">{ed.year}</div>
                            </div>
                            <div className="text-sm text-gray-700">{ed.school}</div>
                        </div>
                    ))}
                </div>
                
                {/* Projects and Certifications */}
                {renderProjects()}
                {renderCertifications()}
                
            </div>
        </div>
    </TemplateCard>
),

// ... Templates E, F, G, H, I, J ...
    E: (
<TemplateCard variant="light">
        <div className="grid grid-cols-[1fr_2.5fr] h-full font-sans">
            
            {/* LEFT COLUMN: MAROON SIDEBAR (Photo, Name, Contact) */}
            <div className="bg-[#800000] text-white p-6 space-y-6">
                
                {/* Profile Picture */}
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-white bg-gray-200 flex items-center justify-center mb-6">
                    {/*  */}
                    <div className="text-xl font-bold text-gray-600">{initials}</div>
                </div>

                {/* Name */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold uppercase tracking-wide">{formData.name || "Your Name"}</h1>
                </div>

                {/* Contact Information */}
                <div className="text-sm space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🏫</span>
                        <div>
                            <div className="font-semibold">School:</div>
                            <div className="text-white/90">Virginia Valley High School</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🏛️</span>
                        <div>
                            <div className="font-semibold">City:</div>
                            <div className="text-white/90">Richmond</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">📧</span>
                        <div>
                            <div className="font-semibold">Email:</div>
                            <div className="text-white/90 break-all">{formData.contact.split(' | ')[0] || 'yourname@student.vhs.org'}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">📍</span>
                        <div>
                            <div className="font-semibold">State:</div>
                            <div className="text-white/90">Virginia</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">📞</span>
                        <div>
                            <div className="font-semibold">Phone:</div>
                            <div className="text-white/90">{formData.contact.split(' | ')[1] || '(555) 555-5555'}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: MAIN CONTENT (Education, Achievements, Skills, Experience) */}
            <div className="p-6 text-gray-800">
                
                {/* --- EDUCATION --- */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl text-[#800000]">🎓</span>
                        <h3 className="text-xl font-bold uppercase">EDUCATION</h3>
                    </div>
                    <ul className="list-disc ml-8 text-base space-y-1">
                        {formData.education.map((ed, i) => (
                            <li key={i} className="text-gray-700">
                                <span className="font-semibold">{ed.year} - {ed.school}</span>
                            </li>
                        ))}
                        {/* Placeholder Education */}
                        <li>2022-2022 - Red Valley MS</li>
                        <li>2014-2020 - Red Valley Elementary</li>
                    </ul>
                </div>

                {/* --- MAJOR ACHIEVEMENTS --- */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl text-[#800000]">🏆</span>
                        <h3 className="text-xl font-bold uppercase">MAJOR ACHIEVEMENTS</h3>
                    </div>
                    <ul className="list-disc ml-8 text-base space-y-2">
                        <li>Winner of the State Math Competition (2024).</li>
                        <li>Received municipal scholarship for academic excellence (2023).</li>
                        <li>Completed a science and technology program for high school students (2022).</li>
                        {/* Placeholder for certifications if needed */}
                        {renderCertifications()} 
                    </ul>
                </div>

                {/* --- SOFT SKILLS --- */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl text-[#800000]">⚙️</span>
                        <h3 className="text-xl font-bold uppercase">SOFT SKILLS</h3>
                    </div>
                    <ul className="list-disc ml-8 text-base space-y-1">
                        {formData.skills.map((s, i) => <li key={i}>{s}</li>)}
                        {/* Placeholder skills */}
                        <li>Hardworking and reliable</li>
                        <li>Good communication skills</li>
                        <li>Microsoft Office</li>
                    </ul>
                </div>

                {/* --- WORK EXPERIENCE --- */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl text-[#800000]">💼</span>
                        <h3 className="text-xl font-bold uppercase">WORK EXPERIENCE</h3>
                    </div>
                    <ul className="list-disc ml-8 text-base space-y-1">
                        {formData.experience.map((ex, i) => <li key={i}><span className="font-semibold">{ex.role}</span>, {ex.company}</li>)}
                         {/* Placeholder Experience */}
                        <li>Office Assistant, Hardware Supply</li>
                        <li>Teaching Assistant</li>
                    </ul>
                </div>
                
            </div>
        </div>
    </TemplateCard>
    ),
 F: (
<TemplateCard variant="light">
        {/* Outer container with a placeholder for the ornate border effect */}
        <div className="border-4 border-[#CDA248] p-4 bg-white shadow-xl">
            
            <div className="grid grid-cols-2 gap-8 p-4 text-gray-800 font-serif">
                
                {/* LEFT COLUMN: Name, Contact, Experience, Competencies (Wider Column) */}
                <div className="space-y-6 border-r border-gray-200 pr-4">
                    
                    {/* Name and Title Header */}
                    <div className="mb-4">
                        <h1 className="text-4xl font-bold text-[#3D7091] leading-none">{formData.name.split(' ')[0] || "Aminata"}</h1>
                        <h1 className="text-4xl font-bold text-[#3D7091] leading-none">{formData.name.split(' ').slice(1).join(' ') || "Sow"}</h1>
                        <p className="text-xl font-semibold text-gray-700 mt-1">{formData.title || "Commis Chef"}</p>
                    </div>
                    
                    {/* Contact Information */}
                    <div className="text-sm space-y-1">
                        <div className="flex items-center gap-2">
                            📧
                            <span className="break-all">{formData.contact.split(' | ')[0] || 'aminata.sow.kitchen@email.com'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            📞
                            <span>{formData.contact.split(' | ')[1] || '+32 488 11 22 33'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            📍
                            <span>Rue du Bailli 75, 1050 Ixelles, Belgium</span>
                        </div>
                    </div>

                    {/* --- PROFESSIONAL EXPERIENCE --- */}
                    <div className="pt-2">
                        <h3 className="text-xl font-semibold uppercase border-b border-gray-400 pb-1 mb-3">
                            Professional Experience
                        </h3>
                        <div className="space-y-4 text-sm">
                            {formData.experience.map((ex, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-start font-semibold">
                                        <div className="text-gray-800">{ex.role}, <span className="font-normal">{ex.company}</span></div>
                                        <div className="text-xs text-gray-600 font-normal">{ex.year}</div>
                                    </div>
                                    <div className="text-xs text-gray-600 mt-0.5">01/03/2024 – 01/04/2024 | Brussels</div>
                                    <p className="text-gray-700 mt-1">Managed a station in a high-volume kitchen during peak hours, ensuring all mise en place was accurate and timely.</p>
                                </div>
                            ))}
                            {/* Placeholder experience */}
                            <div>
                                <div className="flex justify-between items-start font-semibold">
                                    <div className="text-gray-800">Commis Chef, <span className="font-normal">Tempo Hospitality</span></div>
                                    <div className="text-xs text-gray-600 font-normal">01/03/2024 – 01/04/2024</div>
                                </div>
                                <div className="text-xs text-gray-600 mt-0.5">Brussels</div>
                            </div>
                            <div>
                                <div className="flex justify-between items-start font-semibold">
                                    <div className="text-gray-800">Trainee Commis Chef, <span className="font-normal">The Apprentice's Table (Training Restaurant)</span></div>
                                    <div className="text-xs text-gray-600 font-normal">01/05/2023 – 01/12/2023</div>
                                </div>
                                <div className="text-xs text-gray-600 mt-0.5">Brussels</div>
                            </div>
                        </div>
                    </div>

                    {/* --- CORE COMPETENCIES --- */}
                    <div className="pt-2">
                        <h3 className="text-xl font-semibold uppercase border-b border-gray-400 pb-1 mb-3">
                            Core Competencies
                        </h3>
                        <ul className="list-disc ml-5 text-sm space-y-1 text-gray-700">
                            <li>Assisting with mise en place for both hot and cold stations</li>
                            <li>Receiving and correctly storing kitchen supplies and deliveries</li>
                            <li>Peeling, washing, chopping, and cooking fruits and vegetables</li>
                            <li>Preparing a variety of garnishes and side dishes</li>
                            <li>Performing end-of-service cleaning of equipment, kitchen, and service areas</li>
                            {/* Placeholder for skills */}
                            {formData.skills.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>
                </div>

                {/* RIGHT COLUMN: Education, Languages, Qualities, Interests */}
                <div className="space-y-6 pl-4">

                    {/* --- EDUCATION --- */}
                    <div>
                        <h3 className="text-xl font-semibold uppercase border-b border-gray-400 pb-1 mb-3 text-[#CDA248]">
                            Education
                        </h3>
                        <div className="space-y-3 text-sm">
                            {formData.education.map((ed, i) => (
                                <div key={i}>
                                    <div className="font-bold text-gray-800">{ed.degree}</div>
                                    <div className="text-gray-700">{ed.school}</div>
                                    <div className="text-xs text-gray-600">{ed.year}</div>
                                </div>
                            ))}
                            {/* Placeholder Education */}
                            <div>
                                <div className="font-bold text-gray-800">Food Safety & Hygiene (HACCP) Certificate</div>
                                <div className="text-gray-700">Gastronomy Pro Center</div>
                                <div className="text-xs text-gray-600">2024 – 2024 | Brussels</div>
                            </div>
                            <div>
                                <div className="font-bold text-gray-800">Diploma in Hairdressing</div>
                                <div className="text-gray-700">Saint-Louis Technical College</div>
                                <div className="text-xs text-gray-600">2014 – 2017 | Saint-Louis, Senegal</div>
                            </div>
                        </div>
                    </div>

                    {/* --- LANGUAGES --- */}
                    <div>
                        <h3 className="text-xl font-semibold uppercase border-b border-gray-400 pb-1 mb-3 text-[#CDA248]">
                            Languages
                        </h3>
                        <div className="text-sm space-y-2 text-gray-700">
                            <p>**French:** Professional working proficiency</p>
                            <p>**Wolof:** Native language</p>
                            <p>**English:** Basic proficiency</p>
                        </div>
                    </div>
                    
                    {/* --- QUALITIES --- */}
                    <div>
                        <h3 className="text-xl font-semibold uppercase border-b border-gray-400 pb-1 mb-3 text-[#CDA248]">
                            Qualities
                        </h3>
                        <ul className="list-disc ml-5 text-sm space-y-1 text-gray-700">
                            <li>Proactive</li>
                            <li>Team Player</li>
                            <li>Well-organized</li>
                            {/* Placeholder for soft skills */}
                            {addSkill()}
                        </ul>
                    </div>

                    {/* --- INTERESTS --- */}
                    <div>
                        <h3 className="text-xl font-semibold uppercase border-b border-gray-400 pb-1 mb-3 text-[#CDA248]">
                            Interests
                        </h3>
                        <ul className="list-disc ml-5 text-sm space-y-1 text-gray-700">
                            <li>Baking</li>
                            <li>Documentaries</li>
                            <li>Visiting local markets</li>
                            <li>Jogging</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </TemplateCard>
    ),

    G: (
     <TemplateCard variant="light">
        <div className="font-sans text-gray-800">
            {/* Header Section */}
            <div className="text-center pb-6 border-b border-gray-300 mb-6">
                <h1 className="text-4xl font-bold text-[#2E4A6F] uppercase tracking-wide">
                    {formData.name || "LAUREN CHEN"}
                </h1>
                <p className="text-xl text-gray-700 mt-2 font-light">
                    {formData.title || "DIGITAL MARKETING SPECIALIST"}
                </p>
            </div>

            <div className="grid grid-cols-3 gap-8">
                {/* LEFT COLUMN: Summary, Education, Relevant Skills */}
                <div className="col-span-1 border-r border-gray-200 pr-8">
                    {/* Profile Picture */}
                    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-2 border-gray-300 bg-gray-200 flex items-center justify-center">
                         {/* */}
                         <div className="text-2xl font-bold text-gray-600">{initials}</div>
                    </div>

                    {/* --- SUMMARY --- */}
                    <div className="mb-6">
                        <h3 className="text-base font-bold text-[#2E4A6F] uppercase border-b border-gray-300 pb-1 mb-3">
                            SUMMARY
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-700">
                            {formData.about || "Digital Marketing Specialist with 6+ years of experience in online marketing, branding, and business strategy across music, media, and entertainment industries. Skilled in evaluating financial needs and implementing multi-pronged digital strategies that increase revenue and drive brand growth."}
                        </p>
                    </div>

                    {/* --- EDUCATION --- */}
                    <div className="mb-6">
                        <h3 className="text-base font-bold text-[#2E4A6F] uppercase border-b border-gray-300 pb-1 mb-3">
                            EDUCATION
                        </h3>
                        <div className="text-sm space-y-3">
                            {formData.education.map((ed, i) => (
                                <div key={i}>
                                    <div className="font-semibold text-gray-800">Expected Graduation {ed.year}</div>
                                    <div className="text-gray-700">{ed.degree}</div>
                                    <div className="text-xs text-gray-600">Honors: cum laude (GPA: 3.6/4.0)</div>
                                    <div className="text-xs text-gray-600">{ed.school} University, New York, NY</div>
                                </div>
                            ))}
                            {/* Placeholder for additional education/coursework */}
                            <div className="mt-2 text-gray-700">
                                <div className="font-semibold">Relevant Coursework</div>
                                <ul className="list-disc ml-5 text-xs text-gray-600 space-y-0.5">
                                    <li>Course 1</li>
                                </ul>
                            </div>
                            <div className="mt-2 text-gray-700">
                                <div className="font-semibold">Awards and Honors</div>
                                <ul className="list-disc ml-5 text-xs text-gray-600 space-y-0.5">
                                    <li>Award 1</li>
                                </ul>
                            </div>
                            <div className="mt-2 text-gray-700">
                                <div className="font-semibold">Extracurricular Activities</div>
                                <ul className="list-disc ml-5 text-xs text-gray-600 space-y-0.5">
                                    <li>College Activity 1</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* --- RELEVANT SKILLS (with progress bars) --- */}
                    <div className="mb-6">
                        <h3 className="text-base font-bold text-[#2E4A6F] uppercase border-b border-gray-300 pb-1 mb-3">
                            RELEVANT SKILLS
                        </h3>
                        <div className="space-y-3 text-sm">
                            {/* Custom mapping for skills with percentage if available, otherwise just list */}
                            {formData.skills.map((skill, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-gray-700">{skill}</span>
                                        {/* Assuming skill is "SkillName: 80%" or similar */}
                                        {skill.includes(':') && (
                                            <span className="text-xs text-gray-600">{skill.split(':')[1]}</span>
                                        )}
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                        <div 
                                            className="bg-[#2E4A6F] h-1.5 rounded-full" 
                                            style={{ width: `${skill.includes(':') ? parseInt(skill.split(':')[1]) : 80}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                            {/* Placeholder for more skills with bars */}
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-gray-700">Adobe Photoshop</span>
                                    <span className="text-xs text-gray-600">70%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div className="bg-[#2E4A6F] h-1.5 rounded-full" style={{ width: '70%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-gray-700">Rhinoceros</span>
                                    <span className="text-xs text-gray-600">80%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div className="bg-[#2E4A6F] h-1.5 rounded-full" style={{ width: '80%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Contact, Professional Experience */}
                <div className="col-span-2 pl-8">
                    {/* --- CONTACT --- */}
                    <div className="mb-6">
                        <h3 className="text-base font-bold text-[#2E4A6F] uppercase border-b border-gray-300 pb-1 mb-3">
                            CONTACT
                        </h3>
                        <div className="text-sm space-y-1.5 text-gray-700">
                            <p><strong>phone</strong> (123) 456-7890</p>
                            <p><strong>email</strong> {formData.contact.split(' | ')[0] || 'lauren.chen@mail.com'}</p>
                            <p><strong>address</strong> 47 W 13th St, New York, NY 10011</p>
                            <p><strong>website</strong> laurenchen.com</p>
                            <p><strong>linkedin</strong> linkedin.com/in/lauren.chen</p>
                        </div>
                    </div>

                    {/* --- PROFESSIONAL EXPERIENCE --- */}
                    <div className="mb-6">
                        <h3 className="text-base font-bold text-[#2E4A6F] uppercase border-b border-gray-300 pb-1 mb-3">
                            PROFESSIONAL EXPERIENCE
                        </h3>
                        <div className="space-y-6">
                            {formData.experience.map((ex, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-start text-sm">
                                        <div className="font-bold text-gray-800">
                                            {ex.role} <span className="font-normal text-gray-600">{ex.company && `, ${ex.company}`}</span>
                                        </div>
                                        <div className="text-xs text-gray-600 font-semibold">{ex.year} - Present</div>
                                    </div>
                                    <div className="text-xs text-gray-600 mt-0.5">BCG, New York, NY</div>
                                    <ul className="list-disc ml-5 mt-2 text-sm text-gray-700 space-y-0.5">
                                        <li>Manage digital sales and streaming accounts to improve brand positioning and growth</li>
                                        <li>Source and develop new strategic partnerships, social engagements, and advertising opportunities that generate new revenue streams</li>
                                        <li>Collaborate with internal departments to execute national advertising campaigns, plan global digital distribution, and co-develop a 1M+ consumer sales and marketing database</li>
                                    </ul>
                                </div>
                            ))}
                            {/* Placeholder for more experience */}
                            <div>
                                <div className="flex justify-between items-start text-sm">
                                    <div className="font-bold text-gray-800">Dig Digital Marketing Associate</div>
                                    <div className="text-xs text-gray-600 font-semibold">May 20XX - January 20XX</div>
                                </div>
                                <div className="text-xs text-gray-600 mt-0.5">BCG, New York, NY</div>
                                <ul className="list-disc ml-5 mt-2 text-sm text-gray-700 space-y-0.5">
                                    <li>Worked with management to develop and apply digital marketing plans with a focus on driving acquisition and conversion</li>
                                    <li>Increased conversions by 15% from paid sources (PPC, Grant, Display, and VOD)</li>
                                </ul>
                            </div>
                            <div>
                                <div className="flex justify-between items-start text-sm">
                                    <div className="font-bold text-gray-800">Marketing Intern</div>
                                    <div className="text-xs text-gray-600 font-semibold">January 20XX - May 20XX</div>
                                </div>
                                <div className="text-xs text-gray-600 mt-0.5">BCG, New York, NY</div>
                                <ul className="list-disc ml-5 mt-2 text-sm text-gray-700 space-y-0.5">
                                    <li>Helped research, write, and edit blog posts for Kingston's website</li>
                                    <li>Determined relevant keywords and entities for pages using Semrush, Ahrefs, and Page Optimizer Pro</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </TemplateCard>
    ),

    H: (
      <TemplateCard variant="light">
        <div className="grid grid-cols-[3fr_2fr] h-full font-sans text-gray-800">
            
            {/* LEFT COLUMN: Name, Title, Objective, Experience, Education (Wide Column) */}
            <div className="pt-4 pr-8">
                
                {/* Name and Title Section (Mimicking the alignment) */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 leading-tight">{formData.name || "Nick Koe"}</h1>
                    <p className="text-xl font-semibold text-[#3D7091] mt-1">{formData.title || "Event Photographer"}</p>
                </div>

                {/* --- Objective/Summary (Placed here for context) --- */}
                <div className="mb-8">
                    <p className="text-sm leading-relaxed text-gray-700">
                        {formData.about || "Creative Event photographer interested in joining Nick Koe, Inc. Event Photography & Management. 5+ years of experience in event photography, specializing in corporate and private events, with mastery of natural lighting techniques and candid photography."}
                    </p>
                </div>
                
                {/* --- WORK EXPERIENCE --- */}
                <div className="mb-6">
                    <h3 className="text-base font-bold uppercase border-b-2 border-gray-400 pb-1 mb-4">
                        WORK EXPERIENCE
                    </h3>
                    <div className="space-y-6">
                        {formData.experience.map((ex, i) => (
                            <div key={i}>
                                <div className="font-bold text-base text-gray-800">{ex.role}</div>
                                <div className="text-sm text-gray-600 mb-2">{ex.company} | {ex.year}</div>
                                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-0.5">
                                    <li>Produced over 200 premium-quality photographs, showcasing diverse wedding styles, trends, and venues for editorial features.</li>
                                    <li>Created unique bridal portraits for 50 brides, adding depth to the magazine’s storytelling and visual appeal.</li>
                                </ul>
                            </div>
                        ))}
                        {/* Placeholder for more experience */}
                        <div>
                            <div className="font-bold text-base text-gray-800">Event Photographer</div>
                            <div className="text-sm text-gray-600 mb-2">Freelance | 04/20XX - 09/20XX</div>
                            <ul className="list-disc ml-5 text-sm text-gray-700 space-y-0.5">
                                <li>Conducted pre-event consultations to understand clients’ photography needs and explanations and negotiated pricing.</li>
                                <li>Achieved a 5-star rating on multiple freelancer platforms for two consecutive years, leading to a steady 20% increase in bookings.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* --- EDUCATION --- */}
                <div className="mb-6">
                    <h3 className="text-base font-bold uppercase border-b-2 border-gray-400 pb-1 mb-4">
                        EDUCATION
                    </h3>
                    <div className="space-y-3">
                        {formData.education.map((ed, i) => (
                            <div key={i} className="text-sm">
                                <div className="font-bold">{ed.degree}</div>
                                <div className="text-gray-700">{ed.school}</div>
                                <div className="text-xs text-gray-600">{ed.year}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* RIGHT COLUMN: Contact, Skills, Portfolio, Certificates (Narrow Column) */}
            <div className="space-y-6 pt-4 pl-6 border-l border-gray-200">
                
                {/* Contact Block (Top right) */}
                <div className="text-sm space-y-1 text-right pb-4 border-b border-gray-300">
                    <div className="w-24 h-24 rounded-full overflow-hidden ml-auto mb-2 border-2 border-[#3D7091] bg-gray-200 flex items-center justify-center">
                        {/*  */}
                        <div className="text-xl font-bold text-gray-600">{initials}</div>
                    </div>
                    <p>{formData.contact.split(' | ')[0] || 'nick@novaresume.com'}</p>
                    <p>{formData.contact.split(' | ')[1] || '123 444 5555'}</p>
                    <p>San Francisco, CA</p>
                    <p>nick-koe.com</p>
                    <p>linkedin.com/in/nick.koe</p>
                    <p>instagram.com/nick.koe</p>
                </div>

                {/* --- HARD SKILLS --- */}
                <div className="mb-6">
                    <h3 className="text-base font-bold uppercase border-b-2 border-gray-400 pb-1 mb-3">
                        HARD SKILLS
                    </h3>
                    <div className="flex flex-wrap gap-2 text-xs">
                        {formData.skills.map((s, i) => (
                            <span key={i} className="bg-gray-200 text-gray-700 px-2 py-1 rounded">
                                {s}
                            </span>
                        ))}
                        {/* Placeholder skills */}
                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">Photo Editing</span>
                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">Time-Lapse Photography</span>
                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">Event Photography</span>
                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">Adobe Photoshop</span>
                    </div>
                </div>

                {/* --- SOFT SKILLS --- */}
                <div className="mb-6">
                    <h3 className="text-base font-bold uppercase border-b-2 border-gray-400 pb-1 mb-3">
                        SOFT SKILLS
                    </h3>
                    <div className="flex flex-wrap gap-2 text-xs">
                        {/* Placeholder skills */}
                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">Creativity</span>
                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">Attention to Detail</span>
                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">Teamwork</span>
                    </div>
                </div>

                {/* --- PORTFOLIO --- */}
                <div className="mb-6">
                    <h3 className="text-base font-bold uppercase border-b-2 border-gray-400 pb-1 mb-3">
                        PORTFOLIO
                    </h3>
                    <div className="text-sm space-y-4">
                        <div className="font-bold">Tiffany-Jones-Photography.com</div>
                        <p className="text-gray-700">Wedding Photography - Captured both candid and posed images, using natural and artificial lighting setups for over 50+ high-budget weddings...</p>
                        <p className="text-gray-700">Corporate Photography - Shot over 17+ corporate events including product launches, charity galas, and award ceremonies...</p>
                    </div>
                </div>
                
                {/* --- CERTIFICATES --- */}
                <div className="mb-6">
                    <h3 className="text-base font-bold uppercase border-b-2 border-gray-400 pb-1 mb-3">
                        CERTIFICATES
                    </h3>
                    <div className="text-xs space-y-2">
                        {renderCertifications()}
                        <p>Adobe Lightroom: Advanced Techniques - 2022</p>
                        <p>Adobe Photoshop: Advanced Techniques - 2020</p>
                        <p>Capture One Pro: Mastering Workflow and Editing - 2020</p>
                    </div>
                </div>

            </div>
        </div>
    </TemplateCard>
    ),

    I: (
      <TemplateCard variant="blue">
        <div className="flex gap-6">
          <div className="w-1/3 bg-white/20 p-4 rounded">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/30 text-white flex items-center justify-center text-xl font-bold">{initials}</div>
              <div className="mt-2 text-xl font-extrabold text-white">{formData.name}</div>
              <div className="text-xs text-white/80">{formData.title}</div>
            </div>
            <h4 className="font-bold mt-4 text-white/90">Skills</h4>
            <ul className="list-disc ml-4 mt-2 text-white/80 text-sm">{formData.skills.map((s,i)=><li key={i}>{s}</li>)}</ul>
            <h4 className="font-bold mt-4 text-white/90">Education</h4>
            {formData.education.map((ed,i)=><div key={i} className="text-white/80 text-sm mt-1">{ed.degree} — {ed.school} ({ed.year})</div>)}
          </div>
          <div className="flex-1 bg-white/10 p-4 rounded">
            <h3 className="font-bold text-white/90">About Me</h3>
            <p className="mt-2 text-white/80 text-sm">{formData.about}</p>
            <h3 className="font-bold mt-4 text-white/90">Experience</h3>
            {formData.experience.map((ex,i)=><div key={i} className="mt-2 text-white/80 text-sm"><div className="font-semibold">{ex.role}</div><div className="text-xs">{ex.company} • {ex.year}</div></div>)}
            {renderProjects()}
            {renderCertifications()}
          </div>
        </div>
      </TemplateCard>
    ),

    J: (
<TemplateCard variant="light">
        <div className="grid grid-cols-[1fr_2fr] h-full text-gray-800">
            
            {/* LEFT COLUMN: SIDEBAR (About Me, Contact, Objective, Education, Language) */}
            <div className="space-y-6 pt-4 pr-6">
                
                {/* Profile Picture Placeholder (Adjust margin to move it higher) */}
                <div className="w-full relative -mt-8 mb-4">
                    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto bg-gray-200 flex items-center justify-center border-4 border-white shadow-md">
                        {/*  */}
                        <div className="text-xl font-bold text-gray-600">{initials}</div>
                    </div>
                </div>

                {/* --- About Me --- */}
                <div className="mt-8">
                    <h3 className="text-xl font-bold uppercase mb-2">About Me</h3>
                    <p className="text-sm text-gray-600 leading-snug">
                        {/* Using placeholder text as formData.about is usually the Objective */}
                        Donec in nunc elementum, posuere nisi sit amet, tincidunt nulla. Duis nec commodo leo.
                    </p>
                </div>

                {/* --- Contact Details --- */}
                <div className="text-sm space-y-2 text-gray-700">
                    <p className="font-semibold text-base mb-1">CONTACT</p>
                    <div className="flex items-start gap-2">
                        📍
                        <span className="text-sm">450 Sunrise Avenue, Solaris City, Mars</span>
                    </div>
                    <div className="flex items-start gap-2">
                        📞
                        <span className="text-sm">{formData.contact.split(' | ')[1] || '+1 234 567 8900'}</span>
                    </div>
                    <div className="flex items-start gap-2">
                        📧
                        <span className="text-sm break-all">{formData.contact.split(' | ')[0] || 'emily.carter@futuremail.com'}</span>
                    </div>
                    <div className="flex items-start gap-2">
                        🔗
                        <span className="text-sm break-all">linkedin.com/in/emily-carter</span>
                    </div>
                </div>

                {/* --- Objective --- */}
                <div>
                    <h3 className="text-xl font-bold uppercase mb-2">Objective</h3>
                    <p className="text-sm text-gray-700 leading-snug">
                        {formData.about || "A highly motivated and forward-thinking software engineer with a strong background in AI development seeking to leverage my expertise in a dynamic tech environment. Passionate about pioneering innovative solutions that make a real-world impact."}
                    </p>
                </div>

                {/* --- Education --- */}
<label className="text-sm font-medium mt-3">Education</label>

<input 
  value={newEdu.degree} 
  onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })} 
  placeholder="Degree/Qualification" 
  className="border rounded-lg p-2 w-full mt-1" 
/>

<input 
  value={newEdu.school} 
  onChange={(e) => setNewEdu({ ...newEdu, school: e.target.value })} 
  placeholder="School/University" 
  className="border rounded-lg p-2 w-full mt-1" 
/>

<input 
  value={newEdu.year} 
  onChange={(e) => setNewEdu({ ...newEdu, year: e.target.value })} 
  placeholder="Year of Completion" 
  className="border rounded-lg p-2 w-full mt-1" 
/>

<textarea
  value={newEdu.description}
  onChange={(e) => setNewEdu({ ...newEdu, description: e.target.value })}
  placeholder="Description (Achievements, coursework, grade...)"
  className="border rounded-lg p-2 w-full mt-1 h-20"
/>

<button 
  onClick={addEdu} 
  className="px-3 py-2 bg-blue-500 text-white rounded-lg mt-1"
>
  Add Education
</button>


                {/* --- Language --- */}
                <div>
                    <h3 className="text-xl font-bold uppercase mb-2">Language</h3>
                    <div className="text-sm text-gray-700 space-y-1">
                        <p>Fluent in English and Spanish.</p>
                        <p>Basic proficiency in Martian Standard Language.</p>
                    </div>
                </div>

                {/* --- Reference --- */}
                <div>
                    <h3 className="text-xl font-bold uppercase mb-2">Reference</h3>
                    <p className="text-sm text-gray-700">Available upon request.</p>
                    <div className="text-xs text-gray-400 mt-4">© highfile.com</div>
                </div>

            </div>

            {/* RIGHT COLUMN: MAIN CONTENT (Experience, Skills, Projects, Certifications, Interests) */}
            <div className="pl-6 border-l border-gray-200">
                
                {/* Name and Title (Large and Bold) */}
                <div className="relative mb-8">
                    <div className="text-6xl font-extralight text-black leading-none uppercase">{formData.name.split(' ')[0] || "EMILY"}</div>
                    <div className="text-6xl font-extralight text-black leading-none uppercase">{formData.name.split(' ').slice(1).join(' ') || "CARTER"}</div>
                    <div className="text-2xl font-normal text-gray-700 mt-2">{formData.title || "Software Engineer"}</div>
                </div>

                {/* --- Experience --- */}
            <label className="text-sm font-medium mt-3">Experience</label>

<input 
  value={newExp.role} 
  onChange={(e) => setNewExp({ ...newExp, role: e.target.value })} 
  placeholder="Role" 
  className="border rounded-lg p-2 w-full mt-1" 
/>

<input 
  value={newExp.company} 
  onChange={(e) => setNewExp({ ...newExp, company: e.target.value })} 
  placeholder="Company" 
  className="border rounded-lg p-2 w-full mt-1" 
/>

<input 
  value={newExp.year} 
  onChange={(e) => setNewExp({ ...newExp, year: e.target.value })} 
  placeholder="Year" 
  className="border rounded-lg p-2 w-full mt-1" 
/>

<textarea
  value={newExp.description}
  onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
  placeholder="Description (Responsibilities, achievements, tools used...)"
  className="border rounded-lg p-2 w-full mt-1 h-20"
/>

<button 
  onClick={addExp} 
  className="px-3 py-2 bg-blue-500 text-white rounded-lg mt-1"
>
  Add Experience
</button>

                {/* --- Skills --- */}
                <div className="mb-6">
                    <h3 className="text-2xl font-normal mb-4">Skills</h3>
                    <div className="text-sm space-y-2">
                        <p>• **Programming Languages:** Proficient in Python, Java, and C++.</p>
                        <p>• **Technologies:** Experienced in AI, Machine Learning, Quantum Computing.</p>
                        <p>• **Soft Skills:** Strong leadership abilities, excellent communication skills, creative problem-solving.</p>
                    </div>
                </div>

                {/* --- Projects --- */}
                <div className="mb-6">
                    <h3 className="text-2xl font-normal mb-4">Projects</h3>
                    <div className="space-y-4">
                        {renderProjects()}
                        {/* Placeholder for projects */}
                        <div>
                            <div className="font-bold text-sm">Martian Weather Prediction Model</div>
                            <div className="text-sm text-gray-700">Developed a highly accurate weather prediction model for Mars using machine learning techniques, which is now used by the Martian Weather Service.</div>
                        </div>
                        <div>
                            <div className="font-bold text-sm">Quantum Encryption Algorithm</div>
                            <div className="text-sm text-gray-700">Created a quantum-resistant encryption algorithm, enhancing data security for interplanetary communications.</div>
                        </div>
                    </div>
                </div>
                
                {/* --- Certifications --- */}
                <div className="mb-6">
                    <h3 className="text-2xl font-normal mb-4">Certifications</h3>
                    <div className="text-sm space-y-2">
                        {renderCertifications()}
                        {/* Placeholder for certifications */}
                        <p>Certified AI Professional, AI Institute, Earth (2066)</p>
                        <p>Quantum Computing Fundamentals, Quantum Tech Academy (2065)</p>
                    </div>
                </div>

                {/* --- Interests --- */}
                <div className="mb-6">
                    <h3 className="text-2xl font-normal mb-4">Interests</h3>
                    <div className="text-sm text-gray-700 space-y-1">
                        <p>Participating in hackathons and tech talks.</p>
                        <p>Volunteering in STEM education programs for young Martians.</p>
                        <p>Exploring virtual reality art and Martian landscapes.</p>
                    </div>
                </div>

            </div>
        </div>
    </TemplateCard>
    ),
  };
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6">
        {/* Form */}
        <div className="col-span-1 bg-white rounded-2xl shadow-md p-6 sticky top-6">
          <h2 className="text-xl font-bold">Edit Resume</h2>
          <div className="mt-4 space-y-3">
            {/* Name, Title, Contact, About */}
            <label className="text-sm font-medium">Full name</label>
            <input value={formData.name} onChange={(e) => updateField("name", e.target.value)} className="border rounded-lg p-2 w-full" />

            <label className="text-sm font-medium">Title</label>
            <input value={formData.title} onChange={(e) => updateField("title", e.target.value)} className="border rounded-lg p-2 w-full" />

            <label className="text-sm font-medium">Contact</label>
            <input value={formData.contact} onChange={(e) => updateField("contact", e.target.value)} className="border rounded-lg p-2 w-full" />

            <label className="text-sm font-medium">About</label>
            <textarea value={formData.about} onChange={(e) => updateField("about", e.target.value)} className="border rounded-lg p-2 w-full" rows={3}></textarea>

            {/* Skills */}
            <label className="text-sm font-medium mt-3">Skills</label>
            <div className="flex gap-2 mt-1">
              <input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Skill" className="border rounded-lg p-2 flex-1" />
              <button onClick={addSkill} className="px-3 py-2 bg-blue-500 text-white rounded-lg">Add</button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skills.map((s, i) => (
                <span key={i} className="bg-gray-200 px-2 py-1 rounded cursor-pointer" onClick={() => removeSkill(i)}>{s} ✕</span>
              ))}
            </div>

            {/* Experience */}
            <label className="text-sm font-medium mt-3">Experience</label>
            <input value={newExp.role} onChange={(e) => setNewExp({ ...newExp, role: e.target.value })} placeholder="Role" className="border rounded-lg p-2 w-full mt-1" />
            <input value={newExp.company} onChange={(e) => setNewExp({ ...newExp, company: e.target.value })} placeholder="Company" className="border rounded-lg p-2 w-full mt-1" />
            <input value={newExp.year} onChange={(e) => setNewExp({ ...newExp, year: e.target.value })} placeholder="Year" className="border rounded-lg p-2 w-full mt-1" />
            <button onClick={addExp} className="px-3 py-2 bg-blue-500 text-white rounded-lg mt-1">Add Experience</button>
            {formData.experience.map((e, i) => (
              <div key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded mt-1">
                <span>{e.role} — {e.company} ({e.year})</span>
                <button onClick={() => removeExp(i)} className="text-red-500">✕</button>
              </div>
            ))}
            {/* Education - शिक्षा */}
<label className="text-sm font-medium mt-3">Education</label>
<input
  value={newEdu.degree}
  onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
  placeholder="Degree/Qualification (जैसे B.Tech, M.A.)"
  className="border rounded-lg p-2 w-full mt-1"
/>
<input
  value={newEdu.school}
  onChange={(e) => setNewEdu({ ...newEdu, school: e.target.value })}
  placeholder="School/University (जैसे Delhi University)"
  className="border rounded-lg p-2 w-full mt-1"
/>
<input
  value={newEdu.year}
  onChange={(e) => setNewEdu({ ...newEdu, year: e.target.value })}
  placeholder="Completion Year (e.g., 2020)"
  className="border rounded-lg p-2 w-full mt-1"
/>
<button onClick={addEdu} className="px-3 py-2 bg-blue-500 text-white rounded-lg mt-1">Add Education</button>

{/* Added Education Entries - जोड़ी गई शिक्षा प्रविष्टियाँ */}
{formData.education.map((ed, i) => (
  <div key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded mt-1">
    <span className="text-sm">{ed.degree} at {ed.school} ({ed.year})</span>
    <button onClick={() => removeEdu(i)} className="text-red-500 text-lg leading-none">✕</button>
  </div>
))}
{/* Projects */}
            <label className="text-sm font-medium mt-3">Projects</label>
            <input
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              placeholder="Project Title"
              className="border rounded-lg p-2 w-full mt-1"
            />
            <textarea
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              placeholder="Project Description"
              className="border rounded-lg p-2 w-full mt-1"
              rows={2}
            />
            <button onClick={addProject} className="px-3 py-2 bg-blue-500 text-white rounded-lg mt-1">Add Project</button>
            {formData.projects.map((p, i) => (
              <div key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded mt-1">
                <span>{p.title} — {p.description}</span>
                <button onClick={() => removeProject(i)} className="text-red-500">✕</button>
              </div>
            ))}

            {/* Certifications */}
            <label className="text-sm font-medium mt-3">Certifications</label>
            <input
              value={newCert.name}
              onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
              placeholder="Certification Name"
              className="border rounded-lg p-2 w-full mt-1"
            />
            <input
              value={newCert.issuer}
              onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
              placeholder="Issued By"
              className="border rounded-lg p-2 w-full mt-1"
            />
            <button onClick={addCert} className="px-3 py-2 bg-blue-500 text-white rounded-lg mt-1">Add Certification</button>
            {formData.certifications.map((c, i) => (
              <div key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded mt-1">
                <span>{c.name} — {c.issuer}</span>
                <button onClick={() => removeCert(i)} className="text-red-500">✕</button>
              </div>
            ))}

          </div>
        </div>

        {/* Template Preview */}
        <div className="col-span-2 flex flex-col gap-4">
          <div className="flex gap-2 flex-wrap">
            {Object.keys(templates).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTemplate(t)}
                className={`px-3 py-2 rounded ${selectedTemplate === t ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
              >
                Template {t}
              </button>
            ))}
          </div>

          
           <div id="resume-preview"
                className="mx-auto mt-4 shadow-lg"
                style={{
                    width: "794px",
                    minHeight: "1123px",
                    backgroundColor: "#fff",
                    color: "#000",
                    padding: "2rem",
                }}
                >
                {templates[selectedTemplate]}
            </div>
<div className="flex space-x-4 mt-4 justify-end"> {/* justify-end to align to the right */}
          <button onClick={downloadPDF} className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg self-start">Download PDF</button>
            <button
                onClick={downloadATSPDF}
                className="mt-4 px-4 py-2 left-0 bg-purple-600 text-white rounded-lg self-start inline-block"
                >
                Download ATS-Friendly PDF
            </button>
</div>
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilderPro;
