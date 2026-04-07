import dummyProfile from "../assets/dummy_profile.png";

export const mapResumeToImportedTemplateData = (resume) => {
  const personalInfo = resume?.personalInfo || {};

  return {
    personal_info: {
      full_name: personalInfo.fullName || "",
      email: personalInfo.email || "",
      phone: personalInfo.phone || "",
      location: personalInfo.location || "",
      linkedin: personalInfo.linkedin || "",
      website: personalInfo.website || "",
      profession: resume?.experience?.[0]?.role || "Professional",
      image: personalInfo.imageUrl || dummyProfile
    },
    professional_summary: resume?.summary || "",
    skills: resume?.skills || [],
    experience: (resume?.experience || []).map((exp) => ({
      company: exp.company || "",
      position: exp.role || "",
      start_date: exp.startDate || "",
      end_date: exp.endDate || "",
      description: exp.description || "",
      is_current: !exp.endDate || /present/i.test(exp.endDate)
    })),
    education: (resume?.education || []).map((edu) => ({
      institution: edu.institution || "",
      degree: edu.degree || "",
      field: edu.field || "",
      graduation_date: edu.endDate || edu.graduationDate || "",
      gpa: edu.gpa || ""
    })),
    project: (resume?.projects || []).map((project) => ({
      name: project.name || "",
      type: project.techStack || "",
      description: project.description || ""
    }))
  };
};