const SectionHeading = ({ children, color }) => (
  <h3 className="mb-2 border-b pb-1 text-sm font-bold uppercase tracking-wide" style={{ borderColor: color, color }}>
    {children}
  </h3>
);

const TemplateAurora = ({ resume }) => {
  const color = resume.accentColor || "#0ea5e9";
  return (
    <div className="min-h-[1120px] bg-white p-8 text-slate-900">
      <header className="mb-6 border-b pb-4" style={{ borderColor: color }}>
        <h1 className="text-3xl font-black" style={{ color }}>
          {resume.personalInfo?.fullName || "Your Name"}
        </h1>
        <p className="text-sm text-slate-600">
          {resume.personalInfo?.email} | {resume.personalInfo?.phone} | {resume.personalInfo?.location}
        </p>
      </header>

      <section className="mb-5">
        <SectionHeading color={color}>Professional Summary</SectionHeading>
        <p className="text-sm leading-6">{resume.summary || "Your professional summary appears here."}</p>
      </section>

      <section className="mb-5">
        <SectionHeading color={color}>Experience</SectionHeading>
        {resume.experience?.map((item, i) => (
          <article key={i} className="mb-3 text-sm">
            <div className="font-semibold">{item.role} - {item.company}</div>
            <div className="text-xs text-slate-500">{item.startDate} - {item.endDate}</div>
            <p className="mt-1">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="mb-5">
        <SectionHeading color={color}>Education</SectionHeading>
        {resume.education?.map((item, i) => (
          <article key={i} className="mb-2 text-sm">
            <div className="font-semibold">{item.degree} - {item.institution}</div>
            <div className="text-xs text-slate-500">{item.startDate} - {item.endDate}</div>
          </article>
        ))}
      </section>

      <section className="mb-5">
        <SectionHeading color={color}>Projects</SectionHeading>
        {resume.projects?.map((item, i) => (
          <article key={i} className="mb-2 text-sm">
            <div className="font-semibold">{item.name}</div>
            <p>{item.description}</p>
          </article>
        ))}
      </section>

      <section>
        <SectionHeading color={color}>Skills</SectionHeading>
        <p className="text-sm">{resume.skills?.join(", ")}</p>
      </section>
    </div>
  );
};

export default TemplateAurora;