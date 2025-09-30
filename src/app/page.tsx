"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [title, setTitle] = useState("PDF-lib Example");
  const [content, setContent] = useState(
    "This is editable content that updates the PDF in real-time using PDF-lib. PDF-lib offers more advanced features like colors, fonts, and better text handling.",
  );
  const [fontSize, setFontSize] = useState(12);

  const generatePDFBlob = async () => {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Add a page
    const page = pdfDoc.addPage([595, 842]); // A4 size
    const { width, height } = page.getSize();

    // Embed a font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Add title
    const titleFontSize = 24;
    const titleWidth = helveticaBoldFont.widthOfTextAtSize(title, titleFontSize);
    page.drawText(title, {
      x: (width - titleWidth) / 2, // Center the title
      y: height - 100,
      size: titleFontSize,
      font: helveticaBoldFont,
      color: rgb(0.2, 0.2, 0.8), // Blue color
    });

    // Add content with better text wrapping
    const words = content.split(" ");
    const lines: string[] = [];
    let currentLine = "";
    const maxWidth = width - 100; // 50px margin on each side

    for (const word of words) {
      const testLine = currentLine + (currentLine ? " " : "") + word;
      const lineWidth = helveticaFont.widthOfTextAtSize(testLine, fontSize);

      if (lineWidth > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    // Draw the content lines
    let yPosition = height - 150;
    const lineHeight = fontSize * 1.2;

    for (const line of lines) {
      if (yPosition < 50) break; // Stop if we're too close to the bottom

      page.drawText(line, {
        x: 50,
        y: yPosition,
        size: fontSize,
        font: helveticaFont,
        color: rgb(0.1, 0.1, 0.1),
      });

      yPosition -= lineHeight;
    }

    // Add a colored rectangle as decoration
    page.drawRectangle({
      x: 50,
      y: height - 80,
      width: width - 100,
      height: 2,
      color: rgb(0.2, 0.2, 0.8),
    });

    // Convert to blob URL for inline display
    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
    const url = URL.createObjectURL(pdfBlob);

    // Clean up previous URL to prevent memory leaks
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }

    setPdfUrl(url);
    return pdfBytes;
  };

  const downloadPDF = async () => {
    const pdfDoc = await PDFDocument.create();

    // Add a page
    const page = pdfDoc.addPage([595, 842]); // A4 size
    const { width, height } = page.getSize();

    // Embed a font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Add title
    const titleFontSize = 24;
    const titleWidth = helveticaBoldFont.widthOfTextAtSize(title, titleFontSize);
    page.drawText(title, {
      x: (width - titleWidth) / 2, // Center the title
      y: height - 100,
      size: titleFontSize,
      font: helveticaBoldFont,
      color: rgb(0.2, 0.2, 0.8), // Blue color
    });

    // Add content with better text wrapping
    const words = content.split(" ");
    const lines: string[] = [];
    let currentLine = "";
    const maxWidth = width - 100; // 50px margin on each side

    for (const word of words) {
      const testLine = currentLine + (currentLine ? " " : "") + word;
      const lineWidth = helveticaFont.widthOfTextAtSize(testLine, fontSize);

      if (lineWidth > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    // Draw the content lines
    let yPosition = height - 150;
    const lineHeight = fontSize * 1.2;

    for (const line of lines) {
      if (yPosition < 50) break; // Stop if we're too close to the bottom

      page.drawText(line, {
        x: 50,
        y: yPosition,
        size: fontSize,
        font: helveticaFont,
        color: rgb(0.1, 0.1, 0.1),
      });

      yPosition -= lineHeight;
    }

    // Add a colored rectangle as decoration
    page.drawRectangle({
      x: 50,
      y: height - 80,
      width: width - 100,
      height: 2,
      color: rgb(0.2, 0.2, 0.8),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "pdf-lib-document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Update PDF preview when content changes
  useEffect(() => {
    generatePDFBlob();
  }, [title, content, fontSize]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  return (
    <div className="min-h-screen p-4">
      {/* Navigation */}
      <div className="mb-6 flex gap-4">
        <Link href="/jspdf-example" className="text-blue-600 underline hover:text-blue-800">
          → View jsPDF Example
        </Link>
      </div>

      <div className="grid h-[calc(100vh-120px)] grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Editor Panel */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">PDF-lib Editor & Live Preview</h1>
          <p className="text-gray-600">This example uses PDF-lib for advanced PDF manipulation</p>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Title:</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter PDF title"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Content:</label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter PDF content"
                rows={8}
                className="resize-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Font Size:</label>
              <Input
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                min="8"
                max="24"
                placeholder="Font size"
              />
            </div>

            <Button onClick={downloadPDF} className="w-full">
              Download PDF
            </Button>
          </div>
        </div>

        {/* PDF Preview Panel */}
        <div className="overflow-hidden rounded-lg border">
          <div className="border-b bg-gray-100 p-2">
            <h3 className="font-medium">Live PDF Preview (PDF-lib)</h3>
          </div>
          {pdfUrl ? (
            <iframe src={pdfUrl} className="h-full min-h-[600px] w-full" title="PDF Preview" />
          ) : (
            <div className="flex h-64 items-center justify-center text-gray-500">
              Loading PDF preview...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
