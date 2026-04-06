import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const exportResumeToPDF = async (element, title = "resume") => {
  const canvas = await html2canvas(element, { scale: 2, useCORS: true });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "pt", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = (canvas.height * pageWidth) / canvas.width;
  pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
  pdf.save(`${title.replace(/\s+/g, "-").toLowerCase()}.pdf`);
};