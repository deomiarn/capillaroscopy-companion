"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { jsPDF } from "jspdf";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function JsPDFExample() {
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [title, setTitle] = useState("Hello world!");
  const [content, setContent] = useState(
    "This is editable content that updates the PDF in real-time using jsPDF.",
  );

  const generatePDFBlob = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(20);
    doc.text(title, 20, 30);

    // Add content with text wrapping
    doc.setFontSize(12);
    const splitContent = doc.splitTextToSize(content, 170);
    doc.text(splitContent, 20, 50);

    // Convert to blob URL for inline display
    const pdfBlob = doc.output("blob");
    const url = URL.createObjectURL(pdfBlob);

    // Clean up previous URL to prevent memory leaks
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }

    setPdfUrl(url);
    return doc;
  };

  const downloadPDF = () => {
    const doc = generatePDFBlob();
    doc.save("jspdf-document.pdf");
  };

  // Update PDF preview when content changes
  useEffect(() => {
    generatePDFBlob();
  }, [title, content]);

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
      <div className="mb-6">
        <Link href="/" className="text-blue-600 underline hover:text-blue-800">
          ← Back to Home
        </Link>
      </div>

      <div className="grid h-[calc(100vh-120px)] grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Editor Panel */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">jsPDF Editor & Live Preview</h1>
          <p className="text-gray-600">This example uses jsPDF for PDF generation</p>

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
                rows={10}
                className="resize-none"
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
            <h3 className="font-medium">Live PDF Preview (jsPDF)</h3>
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
