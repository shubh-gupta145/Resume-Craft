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
    {
      role: "",
      company: "",
      year: "",
      description: "",
    },
  ],

  education: [
    {
      degree: "",
      school: "",
      year: "",
      description: "",
    },
  ],

  projects: [
    {
      title: "",
      description: "",
    },
  ],

  certifications: [
    {
      name: "",
      issuedBy: "",
      description: "",
    },
  ],
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

  setFormData((s) => ({
    ...s,
    experience: [...s.experience, newExp]
  }));

  setNewExp({ role: "", company: "", year: "", description: "" });
};
const removeExp = (i) => setFormData((s) => ({ ...s, experience: s.experience.filter((_, idx) => idx !== i) }));
const addEdu = () => {
  if (!newEdu.degree || !newEdu.school) return;

  setFormData((s) => ({
    ...s,
    education: [...s.education, newEdu]
  }));

  setNewEdu({ degree: "", school: "", year: "", description: "" });
};

  const removeEdu = (i) => setFormData((s) => ({ ...s, education: s.education.filter((_, idx) => idx !== i) }));
const addProject = () => {
  if (!newProject.title) return;

  setFormData((s) => ({
    ...s,
    projects: [...s.projects, newProject]
  }));

  setNewProject({ title: "", description: "", });
};

  const removeProject = (i) => setFormData((s) => ({ ...s, projects: s.projects.filter((_, idx) => idx !== i) }));
const addCert = () => {
  if (!newCert.name) return;

  setFormData((s) => ({
    ...s,
    certifications: [...s.certifications, newCert]
  }));

  setNewCert({ name: "", issuer: "", description: "" });
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

  {/* ABOUT SECTION */}
  <div className="mt-6">
    <h3 className="font-bold text-lg border-b pb-1">About Me</h3>
    <p className="mt-2 text-base">
      {formData.about || "A short introduction about yourself, your strengths, and career goals..."}
    </p>
  </div>

  <div className="mt-6 grid grid-cols-3 gap-4">

    {/* LEFT SIDE */}
    <div className="col-span-2">

      {/* EXPERIENCE */}
      <h3 className="font-bold border-b pb-1">Experience</h3>
      <div className="mt-2 text-sm space-y-2">

        {formData.experience.length > 0 ? (
          formData.experience.map((exp, i) => (
            <div key={i}>
              <div className="flex justify-between">
                <p className="font-semibold">{exp.role} — {exp.company}</p>
                <p className="text-xs text-gray-600">{exp.year}</p>
              </div>
              {exp.description && (
                <p className="text-sm mt-1">{exp.description}</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-base text-gray-500">
            Add your work experience such as job role, company, year and description...
          </p>
        )}

      </div>

      {/* EDUCATION */}
      <h3 className="font-bold border-b pb-1 mt-6">Education</h3>
      <div className="mt-2 text-sm space-y-2">
        {formData.education.length > 0 ? (
          formData.education.map((edu, i) => (
            <div key={i}>
              <div className="flex justify-between">
                <p className="font-semibold">{edu.degree} — {edu.school}</p>
                <p className="text-xs text-gray-600">{edu.year}</p>
              </div>
              {edu.description && (
                <p className="text-sm mt-1">{edu.description}</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-base text-gray-500">
            Add your education details like degree, school/college, year, and description...
          </p>
        )}
      </div>

      {/* PROJECTS */}
      <h3 className="font-bold border-b pb-1 mt-6">Projects</h3>
      <div className="mt-2 text-sm">
        {formData.projects?.length > 0 ? (
          formData.projects.map((pr, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold">{pr.title}</p>
              <p className="text-xs text-gray-700">{pr.description}</p>
            </div>
          ))
        ) : (
          <p className="text-base text-gray-500">
            Add your project title, tech stack, and description...
          </p>
        )}
      </div>

      {/* CERTIFICATIONS */}
      <h3 className="font-bold border-b pb-1 mt-6">Certifications</h3>
      <div className="mt-2 text-sm">
        {formData.certifications?.length > 0 ? (
          formData.certifications.map((ce, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between">
                <p className="font-semibold">{ce.name}</p>
                <p className="text-xs text-gray-600">{ce.issuer}</p>
              </div>
              {ce.description && (
                <p className="text-xs mt-1">{ce.description}</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-base text-gray-500">
            Add certifications, issuing authority, and description...
          </p>
        )}
      </div>
    </div>

    {/* RIGHT SIDEBAR */}
    <aside className="col-span-1 bg-white/60 p-3 rounded">

      <h4 className="font-bold">Contact</h4>
      <div className="text-xs mt-1 text-gray-700">
        {formData.contact || "Your email | Phone number | Location"}
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
<TemplateCard variant="light">
  {/* HEADER WITHOUT LOGO */}
  <div className="mb-4">
    <div className="text-4xl font-extrabold text-blue-700 uppercase tracking-wide">
      {formData.name || "HERMAN WALTON"}
    </div>
    <div className="text-xl font-semibold text-gray-800 mt-1">
      {formData.title || "FINANCIAL ANALYST"}
    </div>
    <div className="text-sm text-gray-600 mt-1">
      {formData.contact || "youremail@example.com | +91 99999 99999"}
    </div>
  </div>

  {/* SUMMARY */}
  <div className="mb-4 pt-2">
    <div className="text-base font-bold text-blue-700 border-b border-blue-700 pb-1 uppercase tracking-wider">
      Summary
    </div>
    <p className="mt-2 text-base text-gray-700 leading-snug">
      {formData.about ||
        "Experienced and driven Financial Analyst with expertise in financial reporting, budgeting, and business forecasting."}
    </p>
  </div>

  {/* EXPERIENCE */}
  <div className="mb-4 pt-2">
    <div className="text-base font-bold text-blue-700 border-b border-blue-700 pb-1 uppercase tracking-wider">
      Professional Experience
    </div>
    <div className="mt-2 space-y-4">
      {formData.experience.length > 0 ? (
        formData.experience.map((ex, i) => (
          <div key={i} className="text-sm">
            <div className="flex justify-between items-start">
              <div className="font-semibold text-gray-800">
                {ex.role || "Role"},{" "}
                <span className="text-gray-600">{ex.company || "Company"}</span>
              </div>
              <div className="text-sm font-semibold text-gray-600">{ex.year || "Year"}</div>
            </div>
            <ul className="list-disc ml-5 mt-1 text-gray-700 space-y-1 text-base">
              {ex.description ? (
                <li>{ex.description}</li>
              ) : (
                <>
                  <li>Created detailed financial budgets, reducing costs by 15%.</li>
                  <li>Prepared financial reports for strategic decision-making.</li>
                </>
              )}
            </ul>
          </div>
        ))
      ) : (
        <>
          <p className="text-base mt-2">• Created budgets and reduced material cost by 15%.</p>
          <p className="text-base">• Prepared financial reports for major projects.</p>
        </>
      )}
    </div>
  </div>

  {/* EDUCATION */}
  <div className="mb-4 pt-2">
    <div className="text-base font-bold text-blue-700 border-b border-blue-700 pb-1 uppercase tracking-wider">
      Education
    </div>
    <div className="mt-2 space-y-4">
      {formData.education.length > 0 ? (
        formData.education.map((ed, i) => (
          <div key={i} className="text-sm">
            <div className="flex justify-between items-start">
              <div className="font-semibold text-gray-800">{ed.degree || "Degree"}</div>
              <div className="text-sm font-semibold text-gray-600">{ed.year || "Year"}</div>
            </div>
            <p className="text-base text-gray-600 mt-1">
              {ed.school || "University"}  
              <br />
              {ed.description || "Completed coursework with excellent academic performance and practical experience."}
            </p>
          </div>
        ))
      ) : (
        <p className="text-base mt-2">Bachelor's Degree in Finance — Graduated with High Honors.</p>
      )}
    </div>
  </div>

  {/* SKILLS */}
  <div className="mb-4 pt-2">
    <div className="text-base font-bold text-blue-700 border-b border-blue-700 pb-1 uppercase tracking-wider">
      Skills
    </div>
    <ul className="mt-2 list-disc ml-5 text-gray-700 space-y-1 text-base">
      {formData.skills.length > 0 ? (
        formData.skills.map((skill, i) => <li key={i}>{skill}</li>)
      ) : (
        <>
          <li>Financial Analysis</li>
          <li>Budgeting</li>
          <li>Forecasting</li>
          <li>Excel & Python</li>
        </>
      )}
    </ul>
  </div>

  {/* PROJECTS */}
  <div className="mb-4 pt-2">
    <div className="text-base font-bold text-blue-700 border-b border-blue-700 pb-1 uppercase tracking-wider">
      Projects
    </div>
    <div className="mt-2 space-y-4">
      {formData.projects.length > 0 ? (
        formData.projects.map((pr, i) => (
          <div key={i} className="text-sm">
            <div className="font-semibold text-gray-800 text-base">{pr.title || "Project Title"}</div>
            <p className="text-base text-gray-600 mt-1">
              {pr.description || "Developed using modern technologies with focus on performance and clean architecture."}
            </p>
          </div>
        ))
      ) : (
        <>
          <div className="text-sm">
            <div className="font-semibold text-gray-800 text-base">Finance Report Automation System</div>
            <p className="text-base text-gray-600 mt-1">
              Built an automated reporting tool using Excel macros and Python that reduced report time by 40%.
            </p>
          </div>
          <div className="text-sm">
            <div className="font-semibold text-gray-800 text-base">Budget Tracker Dashboard</div>
            <p className="text-base text-gray-600 mt-1">
              Designed a dashboard to track departmental expenses and forecast spending.
            </p>
          </div>
        </>
      )}
    </div>
  </div>

  {/* CERTIFICATIONS */}
  <div className="mb-4 pt-2">
    <div className="text-base font-bold text-blue-700 border-b border-blue-700 pb-1 uppercase tracking-wider">
      Certifications
    </div>
    <div className="mt-2 space-y-3 text-base text-gray-700">
      {formData.certifications.length > 0 ? (
        formData.certifications.map((ce, i) => (
          <div key={i}>
            <div className="font-semibold text-base">{ce.name || "Certification Name"}</div>
            <div className="text-sm text-gray-600">
              {ce.issuer ? `Issued by ${ce.issuer}` : "Issued by Organization"}
              {ce.date ? ` | ${ce.date}` : ""}
            </div>
            {ce.description && <p className="text-base mt-1">{ce.description}</p>}
          </div>
        ))
      ) : (
        <p className="text-base">Financial Analyst License • Awarded by Global Finance Institute</p>
      )}
    </div>
  </div>
</TemplateCard>
),
    C : (
<TemplateCard variant="tealAccent">

  {/* HEADER SECTION */}
  <div className="border-b border-gray-300 pb-4 mb-6 relative"
    style={{
      backgroundImage: 'linear-gradient(to right bottom, #add8e6, #5f9ea0)',
      padding: '24px',
      margin: '-32px -32px 24px -32px',
      color: 'white'
    }}>

    <div className="flex items-center gap-6">
      
    <div className="relative w-32 h-32 flex-shrink-0">
    <div className="w-full h-full rounded-full bg-gray-200 border-4 border-white/50"></div>
        <span className="circle-text absolute inset-0 flex items-center justify-center text-4xl font-bold">
      {initials}
    </span>
  </div>

      <div>
        <div className="text-4xl font-extrabold tracking-wider">
          {formData.name || "HERMAN WALTON"}
        </div>

        <div className="text-lg font-semibold mt-1">
          {formData.title || "FINANCIAL ANALYST"}
        </div>

        <p className="mt-2 text-sm text-white/90">
          {formData.about || "Experienced and driven Financial Analyst with expertise in financial reporting, budgeting, and business forecasting."}
        </p>
      </div>

    </div>
  </div>

  {/* MAIN TWO-COLUMN LAYOUT */}
  <div className="grid grid-cols-[3fr_2fr] gap-8">

    {/* LEFT COLUMN */}
    <div className="space-y-7">

      {/* EXPERIENCE SECTION */}
      <div>
        <h3 className="font-bold text-lg border-b-2 pb-1 text-[#D4AF37] border-[#D4AF37]">
          Work Experiences
        </h3>

        <div className="mt-4 space-y-4 text-gray-800">

          {(formData.experience.length > 0 ? formData.experience : [{
            role: "Financial Analyst",
            company: "ABC Corp",
            year: "2022 - Present",
            description: "Prepared financial reports and analyzed business budgets."
          }]).map((exp, i) => (
            <div key={i}>
              <div className="flex justify-between items-start">
                <p className="font-semibold">{exp.role} — {exp.company}</p>
                <p className="text-sm text-gray-600 whitespace-nowrap">{exp.year}</p>
              </div>
              {exp.description && (
                <p className="text-sm mt-1">{exp.description}</p>
              )}
            </div>
          ))}

        </div>
      </div>

      {/* EDUCATION SECTION */}
      <div>
        <h3 className="font-bold text-lg border-b-2 pb-1 text-[#D4AF37] border-[#D4AF37]">
          Education
        </h3>

        <div className="mt-4 space-y-4 text-gray-800">

          {(formData.education.length > 0 ? formData.education : [{
            degree: "Bachelor's Degree in Finance",
            school: "XYZ University",
            year: "2020",
            description: "Graduated with High Honors."
          }]).map((edu, i) => (
            <div key={i}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{edu.degree}</p>
                  <p>{edu.school}</p>
                </div>
                <p className="text-sm text-gray-600 whitespace-nowrap">{edu.year}</p>
              </div>

              {edu.description && (
                <p className="text-sm mt-1">{edu.description}</p>
              )}
            </div>
          ))}

        </div>
      </div>

      {/* PROJECTS SECTION — YEAR REMOVED */}
      <div>
        <h3 className="font-bold text-lg border-b-2 pb-1 text-[#D4AF37] border-[#D4AF37]">
          Projects
        </h3>

        <div className="mt-4 space-y-4 text-gray-800">

          {(formData.projects.length > 0 ? formData.projects : [{
            title: "Finance Report Automation System",
            description: "Automated reporting tool using Excel macros and Python reducing time by 40%."
          }]).map((p, i) => (
            <div key={i}>
              <p className="font-semibold">{p.title}</p>
              <p className="text-sm">{p.description}</p>
              {p.details && <p className="text-sm mt-1">{p.details}</p>}
            </div>
          ))}

        </div>
      </div>

    </div>

    {/* RIGHT COLUMN */}
    <div className="space-y-7">

      {/* CONTACT */}
      <div>
        <h3 className="font-bold text-lg border-b-2 pb-1 text-[#D4AF37] border-[#D4AF37]">
          Contact
        </h3>

        <div className="mt-4 text-sm space-y-1 text-gray-700">

          <p>{(formData.contact && formData.contact.split(" | ")[1]) || "123-456-7890"}</p>
          <p>{(formData.contact && formData.contact.split(" | ")[0]) || "youremail@example.com"}</p>
        </div>
      </div>

      {/* SKILLS */}
      <div>
        <h3 className="font-bold text-lg border-b-2 pb-1 text-[#D4AF37] border-[#D4AF37]">
          Skills
        </h3>

        <ul className="mt-4 text-sm text-gray-700 space-y-1">
          {(formData.skills.length > 0 ? formData.skills : [
            "Financial Analysis",
            "Budgeting",
            "Forecasting",
            "Excel & Python"
          ]).map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      {/* CERTIFICATIONS — YEAR REMOVED */}
      <div>
        <h3 className="font-bold text-lg border-b-2 pb-1 text-[#D4AF37] border-[#D4AF37]">
          Certifications
        </h3>

        {(formData.certifications.length > 0 ? formData.certifications : [{
          name: "Financial Analyst License",
          issuer: "Global Finance Institute",
          description: "Certified for advanced financial reporting and budgeting."
        }]).map((c, i) => (
          <div key={i} className="mb-3">
            <p className="font-semibold">{c.name} – {c.issuer}</p>

            {c.description && (
              <p className="text-sm mt-1">{c.description}</p>
            )}
          </div>
        ))}

      </div>

    </div>

  </div>
</TemplateCard>

    ),
// ... Templates A, B, C ...

D: (
<TemplateCard variant="light">
  <div className="grid grid-cols-[1fr_3fr] h-full">
      
      {/* LEFT COLUMN: DARK SIDEBAR (Contact, Skills) */}
      <div className="bg-[#212836] text-white p-6 relative">
          
          {/* Profile Picture */}
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-white/50 bg-gray-600 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">
              {initials}
            </span>
          </div>    

          <div className="text-center mb-6">
              <div className="text-2xl font-bold">{formData.name || "HERMAN WALTON"}</div>
              <div className="text-sm text-gray-300">{formData.title || "FINANCIAL ANALYST"}</div>
          </div>

          {/* --- Contact --- */}
          <div className="mb-4">
              <h4 className="font-bold text-base border-b border-gray-500 pb-1 mb-2">CONTACT</h4>
              <div className="text-xs space-y-1 text-gray-300">
                  {formData.contact ? (
                    <>
                      <p>📞 {formData.contact.split(' | ')[1] || '91 99999 99999'}</p>
                      <p>📧 {formData.contact.split(' | ')[0] || 'youremail@example.com'}</p>
                    </>
                  ) : (
                    <>
                      <p>📞 91 99999 99999</p>
                      <p>📧 youremail@example.com</p>
                    </>
                  )}
              </div>
          </div>

          {/* --- Skills --- */}
          <div className="mb-4">
              <h4 className="font-bold text-base border-b border-gray-500 pb-1 mb-2">SKILLS</h4>
              <ul className="list-none text-sm space-y-1">
                {(formData.skills.length > 0 ? formData.skills : ["Financial Analysis", "Budgeting", "Forecasting", "Excel & Python"]).map((s, i) => <li key={i}>{s}</li>)}
              </ul>
          </div>
      </div>

      {/* RIGHT COLUMN: MAIN CONTENT */}
      <div className="p-6">       

          {/* --- Profile --- */}
          <div className="mb-6">
              <h3 className="text-lg font-bold border-b-2 border-gray-800 pb-1 mb-2">About me </h3>
              <p className="text-sm text-gray-700">{formData.about || "Experienced and driven Financial Analyst with expertise in financial reporting, budgeting, and business forecasting."}</p>
          </div>

          {/* --- Work Experience --- */}
          <div className="mb-6">
              <h3 className="text-lg font-bold border-b-2 border-gray-800 pb-1 mb-4">WORK EXPERIENCE</h3>

              {(formData.experience.length > 0 ? formData.experience : [{
                role: "Financial Analyst",
                company: "ABC Corp",
                year: "2022 - Present",
                description: "Prepared financial reports and analyzed business budgets."
              }]).map((exp, i) => (
                <div key={i} className="flex justify-between items-start">

                  <div>
                    <p className="font-semibold">{exp.role} — {exp.company}</p>
                    {exp.description && (
                      <p className="text-sm mt-1">{exp.description}</p>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 whitespace-nowrap">{exp.year}</p>
                </div>
              ))}

          </div>

          {/* --- Education --- */}
          <div className="mb-6">
              <h3 className="text-lg font-bold border-b-2 border-gray-800 pb-1 mb-4">EDUCATION</h3>

              {(formData.education.length > 0 ? formData.education : [{
                degree: "Bachelor's Degree in Finance",
                school: "XYZ University",
                year: "2020",
                description: "Graduated with High Honors."
              }]).map((edu, i) => (
                <div key={i} className="flex justify-between items-start">

                  <div>
                    <p className="font-semibold">{edu.degree}</p>
                    <p>{edu.school}</p>
                    {edu.description && (
                      <p className="text-sm mt-1">{edu.description}</p>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 whitespace-nowrap">{edu.year}</p>
                </div>
              ))}

          </div>
          
          {/* --- Projects (NO YEAR) --- */}
          <div className="mb-6">
              <h3 className="text-lg font-bold border-b-2 border-gray-800 pb-1 mb-4">PROJECTS</h3>
              {(formData.projects.length > 0 ? formData.projects : [{
                title: "Finance Report Automation System",
                description: "Built automated reporting tool using Excel macros and Python that reduced report time by 40%."
              }]).map((p, i) => (
                <div key={i}>
                  <p className="font-semibold">{p.title}</p>
                  <p className="text-sm">{p.description}</p>
                  {p.details && <p className="text-sm mt-1">{p.details}</p>}
                </div>
              ))}
          </div>

          {/* --- Certifications (NO YEAR) --- */}
          <div className="mb-6">
              <h3 className="text-lg font-bold border-b-2 border-gray-800 pb-1 mb-4">CERTIFICATIONS</h3>
              {(formData.certifications.length > 0 ? formData.certifications : [{
                name: "Financial Analyst License",
                issuer: "Global Finance Institute",
                description: "Certified for advanced financial reporting and budgeting."
              }]).map((c, i) => (
                <div key={i}>
                  <p className="font-semibold">{c.name} – {c.issuer}</p>
                  {c.description && <p className="text-sm mt-1">{c.description}</p>}
                </div>
              ))}
          </div>
          
      </div>
  </div>
</TemplateCard>

),
// ... Templates E, F, G, H, I, J ...
    E: (
<TemplateCard variant="light">
  <div className="grid grid-cols-[1fr_2.5fr] h-full font-sans">

    {/* LEFT COLUMN: MAROON SIDEBAR (Photo, Name, Contact, Skills) */}
    <div className="bg-[#800000] text-white p-6 space-y-6">

      {/* Profile Picture */}
      <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-white bg-gray-200 flex items-center justify-center mb-6">
        <div className="text-xl font-bold text-gray-600">{initials || "YN"}</div>
      </div>

      {/* Name */}
      <div className="text-center">
        <h1 className="text-3xl font-bold uppercase tracking-wide">{formData.name || "Your Name"}</h1>
      </div>

      {/* Contact Information */}
      <div className="text-sm space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📧</span>
          <div>
            <div className="font-semibold">Email:</div>
            <div className="text-white/90 break-all">{formData.contact?.split(' | ')[0] || 'yourname@example.com'}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl">📞</span>
          <div>
            <div className="font-semibold">Phone:</div>
            <div className="text-white/90">{formData.contact?.split(' | ')[1] || '(555) 555-5555'}</div>
          </div>
        </div>
      </div>

      {/* SKILLS / SOFT SKILLS */}
      <div>
        <h3 className="text-xl font-bold uppercase border-b border-white/30 pb-1 mb-2">Skills</h3>
        <ul className="list-disc ml-4 text-white/90 text-sm space-y-1">
          {(formData.skills?.length > 0 ? formData.skills : ["Hardworking and reliable", "Good communication skills", "Microsoft Office"]).map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>
    </div>

    {/* RIGHT COLUMN: MAIN CONTENT */}
    <div className="p-6 text-gray-800 space-y-8">

      {/* --- ABOUT ME --- */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl text-[#800000]">📝</span>
          <h3 className="text-xl font-bold uppercase">About Me</h3>
        </div>
        <p className="text-base">{formData.about || "Write a short summary about yourself..."}</p>
      </div>

      {/* --- EDUCATION --- */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl text-[#800000]">🎓</span>
          <h3 className="text-xl font-bold uppercase">Education</h3>
        </div>
        <ul className="list-none ml-0 text-base space-y-3">
          {(formData.education?.length > 0 ? formData.education : [{
            degree: "High School Diploma",
            school: "Virginia Valley High School",
            year: "2024",
            description: "Graduated with Honors."
          }]).map((edu, i) => (
            <li key={i} className="flex justify-between">
              <div>
                <span className="font-semibold">{edu.degree} - </span>
                <span>{edu.school}</span>
                {edu.description && <p className="text-sm text-gray-600 mt-1">{edu.description}</p>}
              </div>
              <div className="text-sm text-gray-600">{edu.year || "Year"}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* --- EXPERIENCE --- */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl text-[#800000]">💼</span>
          <h3 className="text-xl font-bold uppercase">Work Experience</h3>
        </div>
        <ul className="list-none ml-0 text-base space-y-3">
          {(formData.experience?.length > 0 ? formData.experience : [
            { role: "Office Assistant", company: "Hardware Supply", year: "2023", description: "Assisted with daily tasks." },
            { role: "Teaching Assistant", company: "XYZ School", year: "2022", description: "Supported classroom activities." }
          ]).map((ex, i) => (
            <li key={i} className="flex justify-between">
              <div>
                <p className="font-semibold">{ex.role}{ex.company ? `, ${ex.company}` : ""}</p>
                {ex.description && <p className="text-sm text-gray-600 mt-1">{ex.description}</p>}
              </div>
              <div className="text-sm text-gray-600">{ex.year || "Year"}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* --- PROJECTS --- */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl text-[#800000]">📂</span>
          <h3 className="text-xl font-bold uppercase">Projects</h3>
        </div>
        <ul className="list-disc ml-8 text-base space-y-2">
          {(formData.projects?.length > 0 ? formData.projects : [
            { projectName: "Science Fair Project", description: "Built a model volcano for the school science fair." },
            { projectName: "Community Garden", description: "Organized a student-led community garden project." }
          ]).map((pr, i) => (
            <li key={i}>
              <p className="font-semibold">{pr.title}</p>
              {pr.description && <p className="text-sm text-gray-600 mt-1">{pr.description}</p>}
            </li>
          ))}
        </ul>
      </div>

      {/* --- CERTIFICATIONS --- */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl text-[#800000]">📜</span>
          <h3 className="text-xl font-bold uppercase">Certifications</h3>
        </div>
        <ul className="list-disc ml-8 text-base space-y-2">
          {(formData.certifications?.length > 0 ? formData.certifications : [
            { name: "Google Analytics Certified", issuedBy: "Google", description: "Completed advanced analytics training." }
          ]).map((ce, i) => (
            <li key={i} className="flex justify-between">
              <div>
                <p className="font-semibold">{ce.name}</p>
                {ce.description && <p className="text-sm text-gray-600 mt-1">{ce.description}</p>}
              </div>
              <div className="text-sm text-gray-600 text-right">{ce.issuer}</div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  </div>
</TemplateCard>

    ),
 F: (
<TemplateCard variant="light">
  <div className="border-4 border-[#CDA248] p-4 bg-white shadow-xl">

    <div className="grid grid-cols-2 gap-8 p-4 text-gray-800 font-serif">

      {/* LEFT COLUMN */}
      <div className="space-y-6 border-r border-gray-200 pr-4">

        {/* NAME */}
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-[#3D7091] leading-none">
            {formData.name ? formData.name.split(" ")[0] : "Aminata"}
          </h1>
          <h1 className="text-4xl font-bold text-[#3D7091] leading-none">
            {formData.name ? formData.name.split(" ").slice(1).join(" ") : "Sow"}
          </h1>

          <p className="text-xl font-semibold text-gray-700 mt-1">
            {formData.title || "Commis Chef"}
          </p>
        </div>

        {/* CONTACT */}
        <div className="text-sm space-y-1">
          <div className="flex items-center gap-2">📧  
            <span>{formData.contact ? formData.contact.split(" | ")[0] : "yourname@example.com"}</span>
          </div>

          <div className="flex items-center gap-2">📞  
            <span>{formData.contact ? formData.contact.split(" | ")[1] : "(555) 555-5555"}</span>
          </div>

          <div className="flex items-center gap-2"></div>
        </div>

        {/* EXPERIENCE */}
        <div className="pt-2">
          <h3 className="text-xl font-semibold uppercase border-b border-gray-400 pb-1 mb-3">
            Professional Experience
          </h3>

          <div className="space-y-4 text-sm">
            {(formData.experience.length > 0 ? formData.experience : [
              { role: "Office Assistant", company: "Hardware Supply", year: "2022-2023", description: "Managed inventory and customer queries." },
              { role: "Teaching Assistant", company: "XYZ School", year: "2021-2022", description: "Assisted teachers in classroom management." }
            ]).map((ex, i) => (
              <div key={i}>
                <div className="flex justify-between font-semibold">
                  <div>{ex.role}, <span className="font-normal">{ex.company}</span></div>
                  <div className="text-xs text-gray-600">{ex.year}</div>
                </div>

                {ex.description && (
                  <p className="text-gray-700 mt-1">{ex.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SKILLS */}
        <div className="pt-2">
          <h3 className="text-xl font-semibold uppercase border-b border-gray-400 pb-1 mb-3">
            Core Competencies
          </h3>

          <ul className="list-disc ml-5 text-sm space-y-1 text-gray-700">
            {(formData.skills.length > 0 ? formData.skills : [
              "Financial Analysis", "Budgeting", "Forecasting", "Excel & Python"
            ]).map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="space-y-6 pl-4">

        {/* EDUCATION */}
        <div>
          <h3 className="text-xl font-semibold uppercase border-b border-gray-400 pb-1 mb-3 text-[#CDA248]">
            Education
          </h3>

          <div className="space-y-3 text-sm">
            {(formData.education.length > 0 ? formData.education : [
              { degree: "High School Diploma", school: "Virginia Valley High School", year: "2024", description: "Graduated with Honors." }
            ]).map((ed, i) => (
              <div key={i}>
                <div className="flex justify-between">
                  <div>
                    <div className="font-bold">{ed.degree}</div>
                    <div>{ed.school}</div>
                  </div>
                  <div className="text-xs text-gray-600">{ed.year}</div>
                </div>

                {ed.description && (
                  <p className="text-xs mt-1 text-gray-700">{ed.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* PROJECTS */}
        <div>
          <h3 className="text-xl font-semibold uppercase border-b pb-1 mb-3 text-[#CDA248]">
            Projects
          </h3>

          {(formData.projects.length > 0 ? formData.projects : [
            { title: "Finance Report Automation System", description: "Automated reporting using Excel macros and Python, reducing report time by 40%." }
          ]).map((p, i) => (
            <div key={i} className="mb-3">
              <div className="font-bold">{p.title}</div>
              <p className="text-sm text-gray-700">{p.description}</p>
            </div>
          ))}
        </div>

        {/* CERTIFICATIONS */}
        <div>
          <h3 className="text-xl font-semibold uppercase border-b pb-1 mb-3 text-[#CDA248]">
            Certifications
          </h3>

          {(formData.certifications.length > 0 ? formData.certifications : [
            { name: "Financial Analyst License", issuer: "Global Finance Institute" }
          ]).map((c, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between">
                <div className="font-bold">{c.name}</div>
                <div className="text-xs text-gray-600">Issued by: {c.issuer}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  </div>
</TemplateCard>

    ),

    G: (
<TemplateCard variant="light">
  <div className="font-sans text-gray-800">

    {/* HEADER */}
    <div className="text-center pb-6 border-b border-gray-300 mb-6">
      <h1 className="text-4xl font-bold text-[#2E4A6F] uppercase tracking-wide">
        {formData.name ? formData.name : "LAUREN CHEN"}
      </h1>
      <p className="text-xl text-gray-700 mt-2 font-light">
        {formData.title || "Digital Marketing Specialist"}
      </p>
    </div>

    <div className="grid grid-cols-3 gap-8">

      {/* LEFT COLUMN */}
      <div className="col-span-1 border-r border-gray-200 pr-8">

        {/* PROFILE PICTURE */}
        <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-2 border-gray-300 bg-gray-200 flex items-center justify-center">
          <div className="text-2xl font-bold text-gray-600">
            {formData.name
              ? formData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              : "LC"}
          </div>
        </div>

        {/* SUMMARY */}
        <div className="mb-6">
          <h3 className="text-base font-bold text-[#2E4A6F] uppercase border-b border-gray-300 pb-1 mb-3">
            SUMMARY
          </h3>
          <p className="text-sm leading-relaxed text-gray-700">
            {formData.about || "Experienced professional with a strong skill set in marketing and business management."}
          </p>
        </div>

        {/* EDUCATION */}
      {/* EDUCATION */}
<div className="mb-6">
  <h3 className="text-base font-bold text-[#2E4A6F] uppercase border-b border-gray-300 pb-1 mb-3">
    EDUCATION
  </h3>

  <div className="text-sm space-y-3">
    {(formData.education && formData.education.length > 0
      ? formData.education
      : [
          {
            degree: "Bachelor of Marketing",
            school: "University of XYZ",
            year: "2022",
            description: "Graduated with honors."
          }
        ]
    ).map((ed, i) => (
      <div key={i}>

        {/* Degree — School & Year */}
        <div className="flex justify-between items-start text-sm">
          <div className="font-semibold text-gray-800">
            {ed.degree}
            {ed.school && <span className="text-gray-700"> — {ed.school}</span>}
          </div>

          {/* Year (Right Side) */}
          <div className="text-xs text-gray-600">{ed.year || "—"}</div>
        </div>

        {/* Description */}
        {ed.description && (
          <p className="text-xs mt-1 text-gray-700">{ed.description}</p>
        )}
      </div>
    ))}
  </div>
</div>

        {/* SKILLS */}
        <div className="mb-6">
          <h3 className="text-base font-bold text-[#2E4A6F] uppercase border-b border-gray-300 pb-1 mb-3">
            SKILLS
          </h3>

          <ul className="list-disc ml-5 text-sm space-y-1 text-gray-700">
            {(formData.skills.length > 0 ? formData.skills : ["SEO", "Content Marketing", "Social Media Management"])
              .map((skill, i) => <li key={i}>{skill}</li>)
            }
          </ul>
        </div>

      </div>

      {/* RIGHT COLUMN */}
      <div className="col-span-2 pl-8">

        {/* CONTACT */}
        <div className="mb-6">
          <h3 className="text-base font-bold text-[#2E4A6F] uppercase border-b border-gray-300 pb-1 mb-3">
            CONTACT
          </h3>
          <div className="text-sm space-y-1.5 text-gray-700">
            <p><strong>Phone:</strong> {formData.contact ? formData.contact.split(" | ")[1] : "(555) 555-5555"}</p>
            <p><strong>Email:</strong> {formData.contact ? formData.contact.split(" | ")[0] : "yourname@example.com"}</p>
          </div>
        </div>

        {/* PROJECTS */}
        <div className="mb-6">
          <h3 className="text-base font-bold text-[#2E4A6F] uppercase border-b border-gray-300 pb-1 mb-3">
            PROJECTS
          </h3>
          <div className="text-sm space-y-3">
            {(formData.projects.length > 0 ? formData.projects : [
              { title: "Social Media Campaign", description: "Managed a successful campaign that increased engagement by 35%." }
            ]).map((p, i) => (
              <div key={i}>
                <div className="font-semibold">{p.title}</div>
                <p className="text-xs text-gray-700">{p.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CERTIFICATIONS */}
        <div className="mb-6">
          <h3 className="text-base font-bold text-[#2E4A6F] uppercase border-b border-gray-300 pb-1 mb-3">
            CERTIFICATIONS
          </h3>
          <div className="text-sm space-y-3">
            {(formData.certifications.length > 0 ? formData.certifications : [
              { name: "Google Analytics Certified", issuer: "Google", description: "Completed advanced analytics training." }
            ]).map((c, i) => (
              <div key={i}>
                <div className="font-semibold">{c.name}</div>
                <p className="text-xs text-gray-700">Issued by: {c.issuer}</p>
                {c.description && <p className="text-xs mt-1 text-gray-600">{c.description}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* EXPERIENCE */}
        <div className="mb-6">
          <h3 className="text-base font-bold text-[#2E4A6F] uppercase border-b border-gray-300 pb-1 mb-3">
            PROFESSIONAL EXPERIENCE
          </h3>
          <div className="space-y-6">
            {(formData.experience.length > 0 ? formData.experience : [
              { role: "Marketing Intern", company: "ABC Corp", year: "2022", description: "Assisted in content creation and campaigns." }
            ]).map((ex, i) => (
              <div key={i}>
                <div className="flex justify-between items-start text-sm">
                  
                  {/* Role & Company */}
                  <div className="font-bold text-gray-800">
                    {ex.role}
                    {ex.company && <span className="font-normal text-gray-600">, {ex.company}</span>}
                  </div>

                  {/* Year (Right Side) */}
                  <div className="text-xs text-gray-600">{ex.year || "—"}</div>
                </div>

                {/* Description */}
                {ex.description && <p className="text-sm mt-1 text-gray-700">{ex.description}</p>}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  </div>
</TemplateCard>

    ),

    I: (
 <TemplateCard variant="blue">
  <div className="flex gap-6">

    {/* LEFT COLUMN */}
    <div className="w-1/3 bg-white/20 p-4 rounded">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-white/30 text-white flex items-center justify-center text-xl font-bold">
          {initials || "JD"}
        </div>

        <div className="mt-2 text-xl font-extrabold text-white">
          {formData.name || "John Doe"}
        </div>
        <div className="text-xs text-white/80">
          {formData.title || "Professional"}
        </div>
      </div>

      {/* SKILLS */}
      <h4 className="font-bold mt-4 text-white/90">Skills</h4>
      <ul className="list-disc ml-4 mt-2 text-white/80 text-sm">
        {formData.skills?.length > 0
          ? formData.skills.map((s, i) => <li key={i}>{s}</li>)
          : ["Skill 1","Skill 2","Skill 3"].map((s, i) => <li key={i}>{s}</li>)}
      </ul>

      {/* EDUCATION */}
      <h4 className="font-bold mt-4 text-white/90">Education</h4>
      {formData.education?.length > 0
        ? formData.education.map((ed, i) => (
            <div key={i} className="text-white/80 text-sm mt-1">
              <div className="flex justify-between">
                <div>
                  {ed.degree || "Degree"} — {ed.school || "School"}
                </div>
                <div>{ed.year || "Year"}</div>
              </div>
              {ed.description && <p className="text-xs mt-1">{ed.description}</p>}
            </div>
          ))
        : (
            <div className="text-white/80 text-sm mt-1">
              <div className="flex justify-between">
                <div>Sample Degree — Sample School</div>
                <div>2023</div>
              </div>
              <p className="text-xs mt-1">Graduated with honors.</p>
            </div>
          )}
    </div>

    {/* RIGHT COLUMN */}
    <div className="flex-1 bg-white/10 p-4 rounded">

      {/* ABOUT ME */}
      <h3 className="font-bold text-white/90">About Me</h3>
      <p className="mt-2 text-white/80 text-sm">
        {formData.about || "Write a short summary about yourself…"}
      </p>

      {/* EXPERIENCE */}
      <h3 className="font-bold mt-4 text-white/90">Experience</h3>
      {formData.experience?.length > 0
        ? formData.experience.map((ex, i) => (
            <div key={i} className="mt-2 text-white/80 text-sm">
              <div className="flex justify-between">
                <div className="font-semibold">{ex.role || "Role"} -- {ex.company || "Company"}</div>
                <span className="text-xs">{ex.year}</span>
              </div>
              <p className="text-xs mt-1">{ex.description || "Description of your role…"}</p>
            </div>
          ))
        : (
            <div className="mt-2 text-white/80 text-sm">
              <div className="flex justify-between">
                <div className="font-semibold">Sample Role</div>
                <div className="text-xs">2023</div>
              </div>
              <div className="text-xs">Sample Company</div>
              <p className="text-xs mt-1">Description of your role…</p>
            </div>
          )}

      {/* PROJECTS */}
      <h3 className="font-bold mt-4 text-white/90">Projects</h3>
      {formData.projects?.length > 0
        ? formData.projects.map((pr, i) => (
            <div key={i} className="mt-2 text-white/80 text-sm">
              <div className="font-semibold">{pr.projectName || pr.title || "Project Name"}</div>
              <p className="text-xs mt-1">{pr.description || "Project description…"}</p>
            </div>
          ))
        : (
            <div className="mt-2 text-white/80 text-sm">
              <div className="font-semibold">Sample Project</div>
              <p className="text-xs mt-1">Project description…</p>
            </div>
          )}

      {/* CERTIFICATIONS */}
      <h3 className="font-bold mt-4 text-white/90">Certifications</h3>
      {formData.certifications?.length > 0
        ? formData.certifications.map((ce, i) => (
            <div key={i} className="mt-2 text-white/80 text-sm">
              <div className="font-semibold">{ce.name || "Certification Name"}</div>
              <div className="text-xs">Issued by: {ce.issuer || "Organization"}</div>
              <p className="text-xs mt-1">{ce.description || "Description…"}</p>
            </div>
          ))
        : (
            <div className="mt-2 text-white/80 text-sm">
              <div className="font-semibold">Sample Certification</div>
              <div className="text-xs">Issued by: Organization</div>
              <p className="text-xs mt-1">Description…</p>
            </div>
          )}

    </div>
  </div>
</TemplateCard>

    ),
    J: (
<TemplateCard variant="custom">
  <div className="min-h-full p-6 rounded-lg bg-gradient-to-br from-[#1e3c72] to-[#2a5298] text-white">

    {/* TOP SECTION */}
    <div className="flex items-center gap-4 pb-6 border-b border-white/20">
      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold backdrop-blur-md">
        {initials || "JD"}
      </div>
      <div>
        <h1 className="text-3xl font-extrabold">{formData.name || "John Doe"}</h1>
        <p className="text-sm text-white/80">{formData.title || "Professional Title"}</p>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-6 mt-6">

      {/* LEFT SIDEBAR */}
      <div className="col-span-1 space-y-6">

        {/* SKILLS */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold border-b border-white/20 pb-1">Skills</h3>
          <ul className="list-disc ml-4 mt-2 text-white/80 text-sm">
            {(formData.skills?.length > 0 ? formData.skills : ["Skill 1", "Skill 2", "Skill 3"]).map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        {/* EDUCATION */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold border-b border-white/20 pb-1">Education</h3>
          {(formData.education?.length > 0 ? formData.education : [{
            degree: "Sample Degree",
            school: "Sample School",
            year: "2023",
            description: "Description of your education..."
          }]).map((ed, i) => (
            <div key={i} className="mt-2 text-sm">
              <div className="flex justify-between">
                <div>
                  <div className="font-bold">{ed.degree}</div>
                  <div className="text-white/80">{ed.school}</div>
                </div>
                <div className="text-xs text-white/60">{ed.year}</div>
              </div>
              {ed.description && <p className="text-xs text-white/70 mt-1">{ed.description}</p>}
            </div>
          ))}
        </div>

      </div>

      {/* RIGHT SECTION */}
      <div className="col-span-2 space-y-6">

        {/* ABOUT */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold border-b border-white/20 pb-1">About Me</h3>
          <p className="text-sm text-white/80 mt-2">{formData.about || "Write a short summary about yourself..."}</p>
        </div>

        {/* EXPERIENCE */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold border-b border-white/20 pb-1">Experience</h3>
          {(formData.experience?.length > 0 ? formData.experience : [{
            role: "Sample Role",
            company: "Sample Company",
            year: "2023",
            description: "Description of your role..."
          }]).map((ex, i) => (
            <div key={i} className="mt-3 text-sm">
              <div className="flex justify-between">
                <div className="font-semibold">{ex.role}</div>
                <div className="text-xs text-white/60">{ex.year}</div>
              </div>
              <div className="text-white/70 text-xs">{ex.company}</div>
              <p className="text-white/80 mt-1">{ex.description}</p>
            </div>
          ))}
        </div>

        {/* PROJECTS */}
<div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow">
  <h3 className="text-lg font-semibold border-b border-white/20 pb-1">Projects</h3>
  {(formData.projects?.length > 0 ? formData.projects : [{
    name: "Sample Project",
    description: "Description of the project..."
  }]).map((pr, i) => (
    <div key={i} className="mt-3 text-sm">
      <div className="font-semibold">{pr.title}</div>
      <p className="text-white/80 mt-1">{pr.description}</p>
    </div>
  ))}
</div>


        {/* CERTIFICATIONS */}
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold border-b border-white/20 pb-1">Certifications</h3>
          {(formData.certifications?.length > 0 ? formData.certifications : [{
            name: "Sample Certification",
            issuedBy: "Organization",
            description: "Certification description..."
          }]).map((ce, i) => (
            <div key={i} className="mt-3 text-sm">
              <div className="font-semibold">{ce.name}</div>
              <p className="text-white/80 text-xs">{ce.issuedBy}</p>
              <p className="text-white/70 text-xs">{ce.description}</p>
            </div>
          ))}
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
            <label className="text-sm font-medium mt-3">Experience</label>
<textarea
  value={newExp.description}
  onChange={(e) =>
    setNewExp({ ...newExp, description: e.target.value })
  }
  placeholder="Describe your role or work"
  className="border p-2 rounded-lg w-full"
/>

            <button onClick={addExp} className="px-3 py-2 bg-blue-500 text-white rounded-lg mt-1">Add Experience</button>
            {formData.experience.map((e, i) => (
              <div key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded mt-1">
                <span>{e.role} — {e.company} ({e.year})</span>
                <button onClick={() => removeExp(i)} className="text-red-500">✕</button>
              </div>
            ))}
            <br/>
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
  className="border rounded-
  lg p-2 w-full mt-1"
/>
<textarea
  value={newEdu.description}
  onChange={(e) =>
    setNewEdu({ ...newEdu, description: e.target.value })
  }
  placeholder="Describe your education"
  className="border p-2 rounded-lg w-full"
/>
<button onClick={addEdu} className="px-3 py-2 bg-blue-500 text-white rounded-lg mt-1">Add Education</button>
{formData.education.map((ed, i) => (
  <div key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded mt-1">
    <span className="text-sm">{ed.degree} at {ed.school} ({ed.year})</span>
    <button onClick={() => removeEdu(i)} className="text-red-500 text-lg leading-none">✕</button>
  </div>
))}
{/* Projects */}
<br/>
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
<br/>
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
<textarea
  value={newCert.description}
  onChange={(e) =>
    setNewCert({ ...newCert, description: e.target.value })
  }
  placeholder="Describe this certificate"
  className="border p-2 rounded-lg w-full"
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
