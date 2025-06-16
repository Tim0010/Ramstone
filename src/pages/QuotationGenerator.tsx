import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  Share2, 
  Printer, 
  MessageCircle, 
  Mail,
  ArrowLeft,
  Eye
} from 'lucide-react';
import QuotationForm, { QuotationData } from '@/components/QuotationForm';
import QuotationTemplate from '@/components/QuotationTemplate';
import SEO from '@/components/SEO';
import { openWhatsApp, openEmailClient } from '@/lib/utils/whatsapp';
import { BUSINESS_INFO } from '@/lib/constants';

const QuotationGenerator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'form' | 'preview'>('form');
  const [quotationData, setQuotationData] = useState<QuotationData | null>(null);
  const templateRef = useRef<HTMLDivElement>(null);

  const handleGenerateQuotation = (data: QuotationData) => {
    setQuotationData(data);
    setCurrentStep('preview');
  };

  const handleBackToForm = () => {
    setCurrentStep('form');
  };

  const handlePrint = () => {
    if (templateRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${quotationData?.type === 'quotation' ? 'Quotation' : 'Invoice'} - ${quotationData?.quotationNumber}</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                .bg-primary { background-color: #dc2626; }
                .text-primary { color: #dc2626; }
                .text-white { color: white; }
                .font-bold { font-weight: bold; }
                .text-center { text-align: center; }
                .text-right { text-align: right; }
                .text-left { text-align: left; }
                .mb-8 { margin-bottom: 2rem; }
                .mb-4 { margin-bottom: 1rem; }
                .mb-2 { margin-bottom: 0.5rem; }
                .mt-2 { margin-top: 0.5rem; }
                .mt-6 { margin-top: 1.5rem; }
                .pt-6 { padding-top: 1.5rem; }
                .pt-4 { padding-top: 1rem; }
                .p-4 { padding: 1rem; }
                .px-4 { padding-left: 1rem; padding-right: 1rem; }
                .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
                .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
                .border { border: 1px solid #d1d5db; }
                .border-t { border-top: 1px solid #d1d5db; }
                .border-gray-300 { border-color: #d1d5db; }
                .bg-gray-50 { background-color: #f9fafb; }
                .bg-gray-25 { background-color: #fefefe; }
                .rounded-lg { border-radius: 0.5rem; }
                .space-y-2 > * + * { margin-top: 0.5rem; }
                .grid { display: grid; }
                .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                .grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
                .gap-4 { gap: 1rem; }
                .gap-8 { gap: 2rem; }
                .flex { display: flex; }
                .justify-between { justify-content: space-between; }
                .justify-end { justify-content: flex-end; }
                .items-center { align-items: center; }
                .items-start { align-items: flex-start; }
                .w-16 { width: 4rem; }
                .h-16 { height: 4rem; }
                .w-24 { width: 6rem; }
                .h-1 { height: 0.25rem; }
                .w-20 { width: 5rem; }
                .w-32 { width: 8rem; }
                .max-w-sm { max-width: 24rem; }
                .mx-auto { margin-left: auto; margin-right: auto; }
                .mr-4 { margin-right: 1rem; }
                .text-2xl { font-size: 1.5rem; }
                .text-3xl { font-size: 1.875rem; }
                .text-lg { font-size: 1.125rem; }
                .text-sm { font-size: 0.875rem; }
                .text-xs { font-size: 0.75rem; }
                .uppercase { text-transform: uppercase; }
                .tracking-wide { letter-spacing: 0.025em; }
                .whitespace-pre-wrap { white-space: pre-wrap; }
                .overflow-x-auto { overflow-x: auto; }
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid #d1d5db; padding: 0.75rem; }
                th { background-color: #f9fafb; font-weight: 600; }
                .text-gray-900 { color: #111827; }
                .text-gray-600 { color: #4b5563; }
                .text-gray-500 { color: #6b7280; }
                @media print {
                  body { margin: 0; }
                  .no-print { display: none; }
                }
              </style>
            </head>
            <body>
              ${templateRef.current.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const handleDownloadPDF = async () => {
    if (!templateRef.current || !quotationData) return;

    try {
      // Dynamic import for html2pdf
      const html2pdf = (await import('html2pdf.js')).default;
      
      const element = templateRef.current;
      const opt = {
        margin: 10,
        filename: `${quotationData.type}-${quotationData.quotationNumber}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try printing instead.');
    }
  };

  const handleShareWhatsApp = () => {
    if (!quotationData) return;
    
    const message = `Hello ${quotationData.customerName},\n\nPlease find your ${quotationData.type} (${quotationData.quotationNumber}) attached.\n\nTotal Amount: K ${quotationData.total.toFixed(2)}\n\nThank you for choosing ${BUSINESS_INFO.name}!`;
    
    openWhatsApp(message, quotationData.customerPhone?.replace(/[^\d]/g, '') || '');
  };

  const handleShareEmail = () => {
    if (!quotationData) return;
    
    const subject = `${quotationData.type === 'quotation' ? 'Quotation' : 'Invoice'} ${quotationData.quotationNumber} - ${BUSINESS_INFO.name}`;
    const body = `Dear ${quotationData.customerName},\n\nPlease find your ${quotationData.type} attached.\n\nQuotation Number: ${quotationData.quotationNumber}\nTotal Amount: K ${quotationData.total.toFixed(2)}\n\nThank you for choosing ${BUSINESS_INFO.name}.\n\nBest regards,\n${BUSINESS_INFO.name}\n${BUSINESS_INFO.phoneFormatted}`;
    
    openEmailClient(quotationData.customerEmail || '', subject);
  };

  return (
    <>
      <SEO 
        title={`${quotationData?.type === 'quotation' ? 'Quotation' : 'Invoice'} Generator - Ramstone Creative Solutions`}
        description="Generate professional quotations and invoices for auto repair and general supply services"
      />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {currentStep === 'preview' && (
                  <Button
                    onClick={handleBackToForm}
                    variant="outline"
                    size="sm"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Form
                  </Button>
                )}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {currentStep === 'form' ? 'Create Document' : 'Document Preview'}
                  </h1>
                  <p className="text-gray-600">
                    {currentStep === 'form' 
                      ? 'Generate professional quotations and invoices'
                      : `${quotationData?.type === 'quotation' ? 'Quotation' : 'Invoice'} ${quotationData?.quotationNumber}`
                    }
                  </p>
                </div>
              </div>

              {currentStep === 'preview' && quotationData && (
                <div className="flex items-center gap-2">
                  <Button onClick={handlePrint} variant="outline" size="sm">
                    <Printer className="w-4 h-4 mr-2" />
                    Print
                  </Button>
                  
                  <Button onClick={handleDownloadPDF} variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  
                  <Button onClick={handleShareWhatsApp} variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                  
                  <Button onClick={handleShareEmail} variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          {currentStep === 'form' ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Document Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <QuotationForm 
                  onGenerate={handleGenerateQuotation}
                  initialData={quotationData || undefined}
                />
              </CardContent>
            </Card>
          ) : (
            quotationData && (
              <div className="space-y-6">
                {/* Preview Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Document Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div ref={templateRef}>
                      <QuotationTemplate data={quotationData} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default QuotationGenerator;
