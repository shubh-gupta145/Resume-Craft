import React, { useState, useMemo } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ResumeBuilderPro() {
  const [selectedTemplate, setSelectedTemplate] = useState("A");

  const [formData, setFormData] = useState({
    name: "S Gupta",
    title: "Software Developer",
    contact: "youremail@example.com | +91 99999 99999",
    about: "I build delightful interfaces and resume tools.",
    skills: ["JavaScript", "React", "Node.js"],
    experience: [{ role: "Frontend Developer", company: "ABC Pvt Ltd", year: "2022 - Present" }],
    education: [{ degree: "B.Tech CSE", school: "XYZ University", year: "2020" }],
    projects: [],
    certifications: [],
  });

  const [newSkill, setNewSkill] = useState("");
  const [newExp, setNewExp] = useState({ role: "", company: "", year: "" });
  const [newEdu, setNewEdu] = useState({ degree: "", school: "", year: "" });
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

  try {
    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      onclone: (doc) => {
        const style = doc.createElement("style");
        style.innerHTML = `
          * {
            color: black !important;
            background-color: white !important;
          }
        `;
        doc.head.appendChild(style);
      },
    });


    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${formData.name.replace(/\s+/g, "_") || "resume"}.pdf`);
  } catch (e) {
    console.error("PDF generation error:", e);
    alert("Failed to generate PDF. Check console for details.");
  }
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
        {/* Existing template A content */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gray-800 text-white flex items-center justify-center text-lg font-semibold">{initials}</div>
          <div>
            <div className="text-2xl font-extrabold">{formData.name}</div>
            <div className="text-sm text-gray-700 mt-1">{formData.title}</div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-bold text-lg border-b pb-1">About Me</h3>
          <p className="mt-2 text-sm">{formData.about}</p>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <h3 className="font-bold border-b pb-1">Experience</h3>
            <div className="mt-2 text-sm space-y-2">
              {formData.experience.map((ex, i) => (
                <div key={i}>
                  <div className="font-semibold">{ex.role}</div>
                  <div className="text-xs text-gray-600">{ex.company} • {ex.year}</div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <h3 className="font-bold border-b pb-1">Education</h3>
              <div className="mt-2 text-sm">
                {formData.education.map((ed, i) => (
                  <div key={i} className="mb-2">
                    <div className="font-semibold">{ed.degree}</div>
                    <div className="text-xs text-gray-600">{ed.school} • {ed.year}</div>
                  </div>
                ))}
              </div>
            </div>
            {renderProjects()}
            {renderCertifications()}
          </div>
          <aside className="col-span-1 bg-white/60 p-3 rounded">
            <h4 className="font-bold">Contact</h4>
            <div className="text-xs mt-1 text-gray-700">{formData.contact}</div>
            <h4 className="font-bold mt-4">Skills</h4>
            <ul className="mt-2 list-disc ml-4 text-sm space-y-1">
              {formData.skills.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </aside>
        </div>
      </TemplateCard>
    ),
    B: (
      <TemplateCard variant="light">
        {/* Existing template B content */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gray-900 text-white mx-auto flex items-center justify-center text-xl font-semibold">{initials}</div>
          <div className="text-2xl font-extrabold mt-2">{formData.name}</div>
          <div className="text-sm text-gray-700 mt-1">{formData.title}</div>
          <div className="text-xs text-gray-600 mt-1">{formData.contact}</div>
        </div>
        <div className="mt-6">
          <h3 className="font-bold border-b pb-1">About Me</h3>
          <p className="mt-2 text-sm">{formData.about}</p>
        </div>
        <div className="mt-6">
          <h3 className="font-bold border-b pb-1">Skills</h3>
          <div className="mt-2 text-sm">{formData.skills.join(", ")}</div>
        </div>
        <div className="mt-6">
          <h3 className="font-bold border-b pb-1">Experience</h3>
          <div className="mt-2 text-sm space-y-2">
            {formData.experience.map((ex, i) => <div key={i}>{ex.role} — <span className="text-xs text-gray-600">{ex.company} • {ex.year}</span></div>)}
          </div>
          {renderProjects()}
          {renderCertifications()}
        </div>
      </TemplateCard>
    ),
    C: (
      <TemplateCard variant="blue">
        {/* Existing template C content */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/20 text-white flex items-center justify-center text-lg font-semibold">{initials}</div>
          <div>
            <div className="text-3xl font-extrabold">{formData.name}</div>
            <div className="text-sm text-white/90 mt-1">{formData.title}</div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-bold text-blue-200/90 pb-1">About Me</h3>
          <p className="mt-2 text-sm text-white/90">{formData.about}</p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold text-blue-200/90">Experience</h3>
            <div className="mt-2 text-sm text-white/90 space-y-2">
              {formData.experience.map((ex, i) => <div key={i}><div className="font-semibold">{ex.role}</div><div className="text-xs">{ex.company} • {ex.year}</div></div>)}
            </div>
            {renderProjects()}
          </div>
          <div>
            <h3 className="font-bold text-blue-200/90">Skills</h3>
            <ul className="mt-2 list-disc ml-4 text-sm text-white/90">{formData.skills.map((s, i) => <li key={i}>{s}</li>)}</ul>
            <h3 className="font-bold text-blue-200/90 mt-4">Education</h3>
            <div className="mt-2 text-sm text-white/90">{formData.education.map((ed, i) => <div key={i}>{ed.degree} — {ed.school} ({ed.year})</div>)}</div>
            {renderCertifications()}
          </div>
        </div>
      </TemplateCard>
    ),
    D: (
      <TemplateCard variant="light">
        {/* Existing template D content */}
        <div className="flex justify-between items-start">
          <div>
            <div className="text-2xl font-extrabold">{formData.name}</div>
            <div className="text-sm text-gray-700">{formData.title}</div>
          </div>
          <div className="text-xs text-gray-600">{formData.contact}</div>
        </div>
        <div className="mt-6">
          <h3 className="font-bold border-b pb-1">About Me</h3>
          <p className="mt-2 text-sm">{formData.about}</p>
        </div>
        <div className="mt-6 flex gap-6">
          <div className="flex-1">
            <h3 className="font-bold border-b pb-1">Experience</h3>
            <div className="mt-2 text-sm space-y-2">
              {formData.experience.map((ex, i) => <div key={i}><div className="font-semibold">{ex.role}</div><div className="text-xs text-gray-600">{ex.company} • {ex.year}</div></div>)}
            </div>
            {renderProjects()}
            {renderCertifications()}
          </div>
          <aside className="w-48 bg-white/60 p-3 rounded">
            <h4 className="font-bold">Skills</h4>
            <ul className="mt-2 list-disc ml-4 text-sm text-gray-800">{formData.skills.map((s, i) => <li key={i}>{s}</li>)}</ul>
            <h4 className="font-bold mt-4">Education</h4>
            <div className="text-sm mt-2">{formData.education.map((ed, i) => <div key={i}>{ed.degree} • {ed.school} ({ed.year})</div>)}</div>
          </aside>
        </div>
      </TemplateCard>
    ),
    E: (
      <TemplateCard variant="green">
        {/* Existing template E content */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/20 text-white flex items-center justify-center text-lg font-semibold">{initials}</div>
          <div>
            <div className="text-3xl font-extrabold">{formData.name}</div>
            <div className="text-sm text-white/90 mt-1">{formData.title}</div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-bold text-green-200/90">About Me</h3>
          <p className="mt-2 text-white/90">{formData.about}</p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold text-green-200/90">Experience</h3>
            <div className="mt-2 text-sm text-white/90 space-y-2">{formData.experience.map((ex, i) => <div key={i}><div className="font-semibold">{ex.role}</div><div className="text-xs">{ex.company} • {ex.year}</div></div>)}</div>
            {renderProjects()}
          </div>
          <div>
            <h3 className="font-bold text-green-200/90">Skills</h3>
            <ul className="mt-2 list-disc ml-4 text-sm text-white/90">{formData.skills.map((s, i) => <li key={i}>{s}</li>)}</ul>
            <h3 className="font-bold text-green-200/90 mt-4">Education</h3>
            <div className="mt-2 text-sm text-white/90">{formData.education.map((ed, i) => <div key={i}>{ed.degree} — {ed.school} ({ed.year})</div>)}</div>
            {renderCertifications()}
          </div>
        </div>
      </TemplateCard>
    ),
 F: (
      <TemplateCard variant="purple">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-white/30 text-white mx-auto flex items-center justify-center text-2xl font-bold">{initials}</div>
          <div className="text-3xl font-extrabold mt-2">{formData.name}</div>
          <div className="text-sm text-white/80 mt-1">{formData.title}</div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-white/90 border-b pb-1">Experience</h3>
            {formData.experience.map((ex, i) => (
              <div key={i} className="mt-2 text-white/80 text-sm">
                <div className="font-semibold">{ex.role}</div>
                <div className="text-xs">{ex.company} • {ex.year}</div>
              </div>
            ))}
            {renderProjects()}
          </div>
          <div>
            <h3 className="font-bold text-white/90 border-b pb-1">Skills</h3>
            <ul className="list-disc ml-4 mt-2 text-white/80 text-sm">
              {formData.skills.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
            <h3 className="font-bold text-white/90 mt-4 border-b pb-1">Education</h3>
            {formData.education.map((ed, i) => (
              <div key={i} className="mt-2 text-white/80 text-sm">{ed.degree} — {ed.school} ({ed.year})</div>
            ))}
            {renderCertifications()}
          </div>
        </div>
      </TemplateCard>
    ),

    G: (
      <TemplateCard variant="pink">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-3xl font-extrabold">{formData.name}</div>
            <div className="text-sm text-white/90">{formData.title}</div>
          </div>
          <div className="text-xs text-white/80">{formData.contact}</div>
        </div>
        <div className="mt-6">
          <h3 className="font-bold text-white/90 border-b pb-1">About Me</h3>
          <p className="mt-2 text-white/80 text-sm">{formData.about}</p>
        </div>
        <div className="mt-6 flex gap-6">
          <div className="flex-1">
            <h3 className="font-bold text-white/90 border-b pb-1">Experience</h3>
            {formData.experience.map((ex, i) => (
              <div key={i} className="mt-2 text-white/80 text-sm">
                <div className="font-semibold">{ex.role}</div>
                <div className="text-xs">{ex.company} • {ex.year}</div>
              </div>
            ))}
            {renderProjects()}
          </div>
          <aside className="w-52 bg-white/20 p-3 rounded">
            <h4 className="font-bold text-white/90">Skills</h4>
            <ul className="mt-2 list-disc ml-4 text-white/80 text-sm">{formData.skills.map((s,i)=><li key={i}>{s}</li>)}</ul>
            <h4 className="font-bold text-white/90 mt-4">Education</h4>
            <div className="text-white/80 text-sm mt-2">{formData.education.map((ed,i)=><div key={i}>{ed.degree} • {ed.school} ({ed.year})</div>)}</div>
            {renderCertifications()}
          </aside>
        </div>
      </TemplateCard>
    ),

    H: (
      <TemplateCard variant="yellow">
        <div className="flex justify-center">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-black text-yellow-400 mx-auto flex items-center justify-center text-2xl font-bold">{initials}</div>
            <div className="text-3xl font-extrabold mt-2">{formData.name}</div>
            <div className="text-sm text-black/70 mt-1">{formData.title}</div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-bold border-b pb-1">About Me</h3>
          <p className="mt-2 text-sm">{formData.about}</p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold border-b pb-1">Experience</h3>
            {formData.experience.map((ex,i)=><div key={i} className="mt-2 text-sm"><div className="font-semibold">{ex.role}</div><div className="text-xs">{ex.company} • {ex.year}</div></div>)}
            {renderProjects()}
          </div>
          <div>
            <h3 className="font-bold border-b pb-1">Skills</h3>
            <ul className="list-disc ml-4 mt-2 text-sm">{formData.skills.map((s,i)=><li key={i}>{s}</li>)}</ul>
            <h3 className="font-bold border-b pb-1 mt-4">Education</h3>
            {formData.education.map((ed,i)=><div key={i} className="mt-2 text-sm">{ed.degree} — {ed.school} ({ed.year})</div>)}
            {renderCertifications()}
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
      <TemplateCard variant="green">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-white/20 text-white mx-auto flex items-center justify-center text-2xl font-bold">{initials}</div>
          <div className="text-3xl font-extrabold mt-2">{formData.name}</div>
          <div className="text-sm text-white/80 mt-1">{formData.title}</div>
        </div>
        <div className="mt-6">
          <h3 className="font-bold text-white/90 border-b pb-1">About Me</h3>
          <p className="mt-2 text-white/80 text-sm">{formData.about}</p>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <h3 className="font-bold text-white/90 border-b pb-1">Experience</h3>
            {formData.experience.map((ex,i)=><div key={i} className="mt-2 text-white/80 text-sm"><div className="font-semibold">{ex.role}</div><div className="text-xs">{ex.company} • {ex.year}</div></div>)}
            {renderProjects()}
            {renderCertifications()}
          </div>
          <aside className="col-span-1 bg-white/20 p-3 rounded">
            <h4 className="font-bold text-white/90">Skills</h4>
            <ul className="list-disc ml-4 mt-2 text-white/80 text-sm">{formData.skills.map((s,i)=><li key={i}>{s}</li>)}</ul>
            <h4 className="font-bold text-white/90 mt-4">Education</h4>
            {formData.education.map((ed,i)=><div key={i} className="mt-2 text-white/80 text-sm">{ed.degree} — {ed.school} ({ed.year})</div>)}
          </aside>
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

          <div id="resume-preview" style={{
                backgroundColor: "#16a34a", 
                color: "#ffffff",           
                }} className="bg-white text-black shadow-none print:bg-white">{templates[selectedTemplate]}
          </div>

          <button onClick={downloadPDF} className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg self-start">Download PDF</button>
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilderPro;
