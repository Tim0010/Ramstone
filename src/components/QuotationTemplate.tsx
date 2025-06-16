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
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <div className="w-12 h-12 bg-red-600 rounded-md flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">Ramstone</h1>
              <p className="text-sm text-gray-600 leading-tight">Creative Solutions</p>
            </div>
          </div>
        </div>

        <div className="text-right text-xs text-gray-700">
          <p className="font-semibold text-sm">Specialized in:</p>
          {BUSINESS_INFO.services.map((service, index) => (
            <p key={index}>{service}</p>
          ))}
          <p className="mt-2 font-semibold">TPIN: {BUSINESS_INFO.tpin}</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <div>
          <div className="space-y-1 text-sm">
            <div className="flex">
              <span className="font-medium w-20">Date:</span>
              <span className="border-b border-dotted border-gray-400 flex-1 ml-2">{formatDate(data.date)}</span>
            </div>
            <div className="flex">
              <span className="font-medium w-20">Name:</span>
              <span className="border-b border-dotted border-gray-400 flex-1 ml-2">{data.customerName}</span>
            </div>
            <div className="flex">
              <span className="font-medium w-20">Address:</span>
              <span className="border-b border-dotted border-gray-400 flex-1 ml-2">{data.customerAddress}</span>
            </div>
            <div className="flex">
              <span className="font-medium w-20">Cell No.:</span>
              <span className="border-b border-dotted border-gray-400 flex-1 ml-2">{data.customerPhone}</span>
            </div>
            {data.tpinNo && (
              <div className="flex">
                <span className="font-medium w-20">TPIN No.:</span>
                <span className="border-b border-dotted border-gray-400 flex-1 ml-2">{data.tpinNo}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="space-y-1 text-sm">
            <div className="flex">
              <span className="font-medium w-24">Vehicle Make:</span>
              <span className="border-b border-dotted border-gray-400 flex-1 ml-2">{data.vehicleMake}</span>
            </div>
            <div className="flex">
              <span className="font-medium w-24">Reg No.:</span>
              <span className="border-b border-dotted border-gray-400 flex-1 ml-2">{data.regNo}</span>
            </div>
            <div className="flex">
              <span className="font-medium w-24">Chassis No.:</span>
              <span className="border-b border-dotted border-gray-400 flex-1 ml-2">{data.chassisNo}</span>
            </div>
            <div className="flex">
              <span className="font-medium w-24">Colour:</span>
              <span className="border-b border-dotted border-gray-400 flex-1 ml-2">{data.colour}</span>
            </div>
            <div className="flex">
              <span className="font-medium w-24">Vehicle Number:</span>
              <span className="border-b border-dotted border-gray-400 flex-1 ml-2">{data.vehicleNumber}</span>
            </div>
          </div>
        </div>
      </div>



      {/* Line Items Table */}
      <div className="mb-6">
        {data.type === 'quotation' ? (
          // Quotation format with REPAIRS and SPARES columns
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-black">
              <thead>
                <tr>
                  <th className="border border-black px-2 py-2 text-center font-bold bg-gray-100 w-1/2">REPAIRS</th>
                  <th className="border border-black px-2 py-2 text-center font-bold bg-gray-100 w-20">AMOUNT</th>
                  <th className="border border-black px-2 py-2 text-center font-bold bg-gray-100 w-1/2">SPARES</th>
                  <th className="border border-black px-2 py-2 text-center font-bold bg-gray-100 w-20">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: Math.max(12, Math.ceil(data.lineItems.length / 2)) }).map((_, index) => {
                  const repairItem = data.lineItems.filter(item => item.category === 'repair')[index];
                  const spareItem = data.lineItems.filter(item => item.category === 'spare')[index];

                  return (
                    <tr key={index} style={{ height: '30px' }}>
                      <td className="border border-black px-2 py-1 text-sm">
                        {repairItem ? repairItem.description : ''}
                      </td>
                      <td className="border border-black px-2 py-1 text-center text-sm">
                        {repairItem ? `K ${repairItem.amount.toFixed(2)}` : ''}
                      </td>
                      <td className="border border-black px-2 py-1 text-sm">
                        {spareItem ? spareItem.description : ''}
                      </td>
                      <td className="border border-black px-2 py-1 text-center text-sm">
                        {spareItem ? `K ${spareItem.amount.toFixed(2)}` : ''}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          // Invoice format with S/No, DESCRIPTION, QTY, UNIT PRICE, AMOUNT
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-black">
              <thead>
                <tr>
                  <th className="border border-black px-2 py-2 text-center font-bold bg-gray-100 w-12">S/No</th>
                  <th className="border border-black px-2 py-2 text-center font-bold bg-gray-100">DESCRIPTION</th>
                  <th className="border border-black px-2 py-2 text-center font-bold bg-gray-100 w-16">QTY</th>
                  <th className="border border-black px-2 py-2 text-center font-bold bg-gray-100 w-24">UNIT PRICE</th>
                  <th className="border border-black px-2 py-2 text-center font-bold bg-gray-100 w-24">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: Math.max(15, data.lineItems.length) }).map((_, index) => {
                  const item = data.lineItems[index];

                  return (
                    <tr key={index} style={{ height: '25px' }}>
                      <td className="border border-black px-2 py-1 text-center text-sm">
                        {item ? item.sNo : ''}
                      </td>
                      <td className="border border-black px-2 py-1 text-sm">
                        {item ? item.description : ''}
                      </td>
                      <td className="border border-black px-2 py-1 text-center text-sm">
                        {item ? item.quantity : ''}
                      </td>
                      <td className="border border-black px-2 py-1 text-center text-sm">
                        {item ? `K ${item.unitPrice.toFixed(2)}` : ''}
                      </td>
                      <td className="border border-black px-2 py-1 text-center text-sm">
                        {item ? `K ${item.amount.toFixed(2)}` : ''}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-6">
        <div className="w-full max-w-xs">
          {data.type === 'quotation' ? (
            // Quotation totals format
            <div className="space-y-1 text-sm">
              <div className="flex justify-between border-b border-dotted">
                <span className="font-medium">PAINTS AND MATERIAL:</span>
                <span>K {data.paintsAndMaterial.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b border-dotted">
                <span className="font-medium">SPARES:</span>
                <span>K {data.spares.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b border-dotted">
                <span className="font-medium">LABOUR:</span>
                <span>K {data.labour.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b border-dotted">
                <span className="font-medium">CONSUMABLES:</span>
                <span>K {data.consumables.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b border-dotted">
                <span className="font-medium">VAT:</span>
                <span>K {data.vatAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 text-base font-bold border-2 border-black">
                <span>GRAND TOTAL:</span>
                <span>K {data.total.toFixed(2)}</span>
              </div>
            </div>
          ) : (
            // Invoice totals format
            <div className="border-2 border-black p-2">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>K {data.total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Terms & Conditions */}
      {data.notes && (
        <div className="mb-6">
          <div className="text-xs">
            <p className="whitespace-pre-wrap">{data.notes}</p>
          </div>
        </div>
      )}

      {/* Signature Section */}
      <div className="mt-8">
        {data.type === 'quotation' ? (
          // Quotation signature format
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div>
              <div className="flex mb-4">
                <span className="font-medium w-24">Prepared By:</span>
                <span className="border-b border-dotted border-gray-400 flex-1 ml-2">{data.preparedBy}</span>
              </div>
              <div className="flex">
                <span className="font-medium w-24">Signature:</span>
                <span className="border-b border-dotted border-gray-400 flex-1 ml-2">{data.signature}</span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs">
                This Quotation is Valid for 14 Days.
              </p>
            </div>
          </div>
        ) : (
          // Invoice signature format
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div>
              <div className="flex mb-4">
                <span className="font-medium w-24">Prepared By:</span>
                <span className="border-b border-dotted border-gray-400 flex-1 ml-2">{data.preparedBy}</span>
              </div>
              <div className="flex">
                <span className="font-medium w-24">Signature:</span>
                <span className="border-b border-dotted border-gray-400 flex-1 ml-2">{data.signature}</span>
              </div>
            </div>

            <div>
              <div className="flex mb-4">
                <span className="font-medium w-24">Received By:</span>
                <span className="border-b border-dotted border-gray-400 flex-1 ml-2">{data.receivedBy}</span>
              </div>
              <div className="flex">
                <span className="font-medium w-24">Signature:</span>
                <span className="border-b border-dotted border-gray-400 flex-1 ml-2">{data.receivedSignature}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotationTemplate;
