import TemplateAurora from "../templates/TemplateAurora";
import TemplateMinimal from "../templates/TemplateMinimal";

const ResumePreview = ({ resume }) => {
  switch (resume.template) {
    case "minimal":
      return <TemplateMinimal resume={resume} />;
    case "aurora":
    default:
      return <TemplateAurora resume={resume} />;
  }
};

export default ResumePreview;