const TemplateMinimal = ({ resume }) => {
  const color = resume.accentColor || "#0f766e";
  return (
    <div className="min-h-[1120px] bg-white p-10 text-slate-900">
      <div className="mb-7 grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <h1 className="text-4xl font-extrabold">{resume.personalInfo?.fullName || "Your Name"}</h1>
          <p className="text-sm text-slate-600">{resume.summary || "Professional summary"}</p>
        </div>
        <div className="rounded-xl p-3 text-xs text-white" style={{ backgroundColor: color }}>
          <p>{resume.personalInfo?.email}</p>
          <p>{resume.personalInfo?.phone}</p>
          <p>{resume.personalInfo?.location}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-5">
          <section>
            <h3 className="mb-2 text-sm font-bold uppercase" style={{ color }}>Experience</h3>
            {resume.experience?.map((item, i) => (
              <div key={i} className="mb-2 text-sm">
                <p className="font-semibold">{item.role} - {item.company}</p>
                <p className="text-xs text-slate-500">{item.startDate} - {item.endDate}</p>
                <p>{item.description}</p>
              </div>
            ))}
          </section>

          <section>
            <h3 className="mb-2 text-sm font-bold uppercase" style={{ color }}>Projects</h3>
            {resume.projects?.map((item, i) => (
              <div key={i} className="mb-2 text-sm">
                <p className="font-semibold">{item.name}</p>
                <p>{item.description}</p>
              </div>
            ))}
          </section>
        </div>

        <div className="space-y-5">
          <section>
            <h3 className="mb-2 text-sm font-bold uppercase" style={{ color }}>Education</h3>
            {resume.education?.map((item, i) => (
              <div key={i} className="mb-2 text-sm">
                <p className="font-semibold">{item.degree}</p>
                <p className="text-xs">{item.institution}</p>
              </div>
            ))}
          </section>

          <section>
            <h3 className="mb-2 text-sm font-bold uppercase" style={{ color }}>Skills</h3>
            <ul className="list-inside list-disc text-sm">
              {resume.skills?.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TemplateMinimal;