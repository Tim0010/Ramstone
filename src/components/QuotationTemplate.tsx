import React from 'react';
import { QuotationData } from './QuotationForm';
import { BUSINESS_INFO } from '@/lib/constants';

interface QuotationTemplateProps {
  data: QuotationData;
  className?: string;
}

const QuotationTemplate: React.FC<QuotationTemplateProps> = ({ data, className = '' }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className={`bg-white p-8 max-w-4xl mx-auto ${className}`} id="quotation-template">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mr-4">
            <span className="text-white font-bold text-2xl">R</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{BUSINESS_INFO.name}</h1>
            <p className="text-sm text-gray-600">{BUSINESS_INFO.tagline}</p>
          </div>
        </div>
        
        <div className="text-right text-sm text-gray-600">
          <p className="font-semibold">{BUSINESS_INFO.name}</p>
          <p>{BUSINESS_INFO.address}</p>
          <p>Phone: {BUSINESS_INFO.phoneFormatted}</p>
          <p>Email: {BUSINESS_INFO.email}</p>
        </div>
      </div>

      {/* Document Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary uppercase tracking-wide">
          {data.type === 'quotation' ? 'Quotation' : 'Invoice'}
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto mt-2"></div>
      </div>

      {/* Document Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {data.type === 'quotation' ? 'Quotation' : 'Invoice'} Details
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex">
              <span className="font-medium w-24">Number:</span>
              <span>{data.quotationNumber}</span>
            </div>
            <div className="flex">
              <span className="font-medium w-24">Date:</span>
              <span>{formatDate(data.date)}</span>
            </div>
            {data.type === 'quotation' && (
              <div className="flex">
                <span className="font-medium w-24">Valid Until:</span>
                <span>{formatDate(data.validUntil)}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex">
              <span className="font-medium w-24">Name:</span>
              <span>{data.customerName}</span>
            </div>
            {data.customerPhone && (
              <div className="flex">
                <span className="font-medium w-24">Phone:</span>
                <span>{data.customerPhone}</span>
              </div>
            )}
            {data.customerEmail && (
              <div className="flex">
                <span className="font-medium w-24">Email:</span>
                <span>{data.customerEmail}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vehicle Information */}
      {(data.vehicleMake || data.vehicleModel || data.regNo || data.mileage) && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Information</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {data.vehicleMake && (
              <div>
                <span className="font-medium">Make:</span>
                <p>{data.vehicleMake}</p>
              </div>
            )}
            {data.vehicleModel && (
              <div>
                <span className="font-medium">Model:</span>
                <p>{data.vehicleModel}</p>
              </div>
            )}
            {data.regNo && (
              <div>
                <span className="font-medium">Reg No:</span>
                <p>{data.regNo}</p>
              </div>
            )}
            {data.mileage && (
              <div>
                <span className="font-medium">Mileage:</span>
                <p>{data.mileage}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Line Items Table */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {data.type === 'quotation' ? 'Services Quoted' : 'Services Provided'}
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Description</th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold w-20">Qty</th>
                <th className="border border-gray-300 px-4 py-3 text-right font-semibold w-32">Unit Price (K)</th>
                <th className="border border-gray-300 px-4 py-3 text-right font-semibold w-32">Amount (K)</th>
              </tr>
            </thead>
            <tbody>
              {data.lineItems.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}>
                  <td className="border border-gray-300 px-4 py-3">
                    <div className="whitespace-pre-wrap">{item.description}</div>
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">{item.quantity}</td>
                  <td className="border border-gray-300 px-4 py-3 text-right">{item.unitPrice.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-3 text-right font-medium">{item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-full max-w-sm">
          <div className="space-y-2">
            <div className="flex justify-between py-2">
              <span className="font-medium">Subtotal:</span>
              <span>K {data.subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between py-2">
              <span className="font-medium">VAT ({data.vatRate}%):</span>
              <span>K {data.vatAmount.toFixed(2)}</span>
            </div>
            
            <hr className="border-gray-300" />
            
            <div className="flex justify-between py-3 text-lg font-bold">
              <span>Total Amount:</span>
              <span className="text-primary">K {data.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      {data.notes && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {data.type === 'quotation' ? 'Terms & Conditions' : 'Notes'}
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm whitespace-pre-wrap">{data.notes}</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-gray-300 pt-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-600">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Payment Information</h4>
            <p>Bank: Standard Chartered Bank</p>
            <p>Account: 0100123456789</p>
            <p>Branch: Lusaka Main Branch</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
            <p>Phone: {BUSINESS_INFO.phoneFormatted}</p>
            <p>Email: {BUSINESS_INFO.email}</p>
            <p>Address: {BUSINESS_INFO.address}</p>
          </div>
        </div>
        
        <div className="text-center mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Thank you for choosing {BUSINESS_INFO.name} - {BUSINESS_INFO.tagline}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuotationTemplate;
