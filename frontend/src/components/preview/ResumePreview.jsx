import TemplateAurora from "../templates/TemplateAurora";
import TemplateMinimal from "../templates/TemplateMinimal";
import ModernTemplate from "../templates/imported/ModernTemplate";
import ClassicTemplate from "../templates/imported/ClassicTemplate";
import MinimalTemplateImported from "../templates/imported/MinimalTemplate";
import MinimalImageTemplate from "../templates/imported/MinimalImageTemplate";
import { mapResumeToImportedTemplateData } from "../../utils/templateMapper";

const ResumePreview = ({ resume }) => {
  const mappedData = mapResumeToImportedTemplateData(resume);
  const accentColor = resume?.accentColor || "#0ea5e9";

  switch (resume.template) {
    case "minimal-edge":
    case "minimal":
      return <TemplateMinimal resume={resume} />;
    case "modern":
      return <ModernTemplate data={mappedData} accentColor={accentColor} />;
    case "classic":
      return <ClassicTemplate data={mappedData} accentColor={accentColor} />;
    case "minimal-pro":
      return <MinimalTemplateImported data={mappedData} accentColor={accentColor} />;
    case "minimal-image":
      return <MinimalImageTemplate data={mappedData} accentColor={accentColor} />;
    case "aurora":
    default:
      return <TemplateAurora resume={resume} />;
  }
};

export default ResumePreview;
