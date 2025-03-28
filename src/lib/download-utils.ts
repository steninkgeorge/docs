import { Editor } from "@tiptap/react";

class DownloadUtils {
  static downloadFile(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  static async downloadAsPDF(editor: Editor | null, title: string) {
    if (!editor) return;
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    doc.text(editor.getText(), 10, 10);
    doc.save(`${title}.pdf`);
  }

  static async downloadAsDocx(editor: Editor | null, title: string) {
    if (!editor) return;
    const { Document, Packer, Paragraph } = await import("docx");
    const doc = new Document({
      sections: [{ children: [new Paragraph(editor.getText())] }],
    });
    const blob = await Packer.toBlob(doc);
    this.downloadFile(blob, `${title}.docx`);
  }

  static async downloadAsMarkdown(editor: Editor | null, title: string) {
    if (!editor) return;
    const { default: TurndownService } = await import("turndown");
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(editor.getHTML());
    const blob = new Blob([markdown], { type: "text/markdown" });
    this.downloadFile(blob, `${title}.md`);
  }

  static downloadAsJson(editor: Editor | null, title: string) {
    if (!editor) return;
    const content = editor.getJSON();

    const json = JSON.stringify(content, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    this.downloadFile(blob, `${title}.json`);
  }

  static downloadHTML(editor: Editor | null , title : string){
    if (!editor) return;
    const content = editor.getHTML();
    const htmlDocument = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${title}</title>
          <style>
            body { font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            pre { background-color: #f5f5f5; padding: 10px; border-radius: 4px; overflow-x: auto; }
            blockquote { border-left: 4px solid #ddd; margin-left: 0; padding-left: 16px; }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          ${content}
        </body>
      </html>
    `;
    const blob = new Blob([htmlDocument], { type: "text/html" });
    this.downloadFile(blob, `${title}.html`);
  }
}

export default DownloadUtils;

