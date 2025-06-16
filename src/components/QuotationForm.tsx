import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, FileText, Receipt } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/constants';

export interface LineItem {
  id: string;
  sNo: number;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  category?: 'repair' | 'spare' | 'paint' | 'labour' | 'consumable';
}

export interface QuotationData {
  type: 'quotation' | 'invoice';
  quotationNumber: string;
  date: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  customerEmail: string;
  tpinNo: string;
  vehicleMake: string;
  vehicleModel: string;
  regNo: string;
  chassisNo: string;
  colour: string;
  vehicleNumber: string;
  lineItems: LineItem[];
  repairItems: LineItem[];
  spareItems: LineItem[];
  paintsAndMaterial: number;
  spares: number;
  labour: number;
  consumables: number;
  subtotal: number;
  vatRate: number;
  vatAmount: number;
  total: number;
  notes: string;
  validUntil: string;
  preparedBy: string;
  signature: string;
  receivedBy: string;
  receivedSignature: string;
}

interface QuotationFormProps {
  onGenerate: (data: QuotationData) => void;
  initialData?: Partial<QuotationData>;
}

const QuotationForm: React.FC<QuotationFormProps> = ({ onGenerate, initialData }) => {
  const [formData, setFormData] = useState<QuotationData>({
    type: 'quotation',
    quotationNumber: `${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString().split('T')[0],
    customerName: '',
    customerAddress: '',
    customerPhone: '',
    customerEmail: '',
    tpinNo: '',
    vehicleMake: '',
    vehicleModel: '',
    regNo: '',
    chassisNo: '',
    colour: '',
    vehicleNumber: '',
    lineItems: [
      {
        id: '1',
        sNo: 1,
        description: '',
        quantity: 1,
        unitPrice: 0,
        amount: 0,
        category: 'repair'
      }
    ],
    repairItems: [],
    spareItems: [],
    paintsAndMaterial: 0,
    spares: 0,
    labour: 0,
    consumables: 0,
    subtotal: 0,
    vatRate: 16, // 16% VAT for Zambia
    vatAmount: 0,
    total: 0,
    notes: 'Terms & Conditions:\n• All work carried out according to working standards.\n• All parts supplied are guaranteed for 6 months.\n• No responsibility for personal effects left in vehicle.\n• All vehicles must be collected within 7 days.\n• This Quotation is Valid for 14 Days.',
    validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
    preparedBy: '',
    signature: '',
    receivedBy: '',
    receivedSignature: '',
    ...initialData
  });

  const updateFormData = (field: keyof QuotationData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      sNo: formData.lineItems.length + 1,
      description: '',
      quantity: 1,
      unitPrice: 0,
      amount: 0,
      category: 'repair'
    };

    setFormData(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, newItem]
    }));
  };

  const removeLineItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter(item => item.id !== id)
    }));
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      lineItems: prev.lineItems.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          // Calculate amount when quantity or unitPrice changes
          if (field === 'quantity' || field === 'unitPrice') {
            updatedItem.amount = updatedItem.quantity * updatedItem.unitPrice;
          }
          return updatedItem;
        }
        return item;
      })
    }));
  };

  // Calculate totals whenever line items or manual totals change
  React.useEffect(() => {
    const lineItemsTotal = formData.lineItems.reduce((sum, item) => sum + item.amount, 0);
    const manualTotalsSum = formData.paintsAndMaterial + formData.spares + formData.labour + formData.consumables;
    const subtotal = lineItemsTotal + manualTotalsSum;
    const vatAmount = (subtotal * formData.vatRate) / 100;
    const total = subtotal + vatAmount;

    setFormData(prev => ({
      ...prev,
      subtotal,
      vatAmount,
      total
    }));
  }, [formData.lineItems, formData.vatRate, formData.paintsAndMaterial, formData.spares, formData.labour, formData.consumables]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Document Type and Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {formData.type === 'quotation' ? (
              <FileText className="w-5 h-5" />
            ) : (
              <Receipt className="w-5 h-5" />
            )}
            Document Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="type">Document Type</Label>
              <Select value={formData.type} onValueChange={(value: 'quotation' | 'invoice') => updateFormData('type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quotation">Quotation</SelectItem>
                  <SelectItem value="invoice">Invoice</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="quotationNumber">
                {formData.type === 'quotation' ? 'Quotation' : 'Invoice'} Number
              </Label>
              <Input
                id="quotationNumber"
                value={formData.quotationNumber}
                onChange={(e) => updateFormData('quotationNumber', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => updateFormData('date', e.target.value)}
                required
              />
            </div>
          </div>

          {formData.type === 'quotation' && (
            <div>
              <Label htmlFor="validUntil">Valid Until</Label>
              <Input
                id="validUntil"
                type="date"
                value={formData.validUntil}
                onChange={(e) => updateFormData('validUntil', e.target.value)}
                required
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customerName">Name *</Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => updateFormData('customerName', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="customerPhone">Cell No.</Label>
              <Input
                id="customerPhone"
                value={formData.customerPhone}
                onChange={(e) => updateFormData('customerPhone', e.target.value)}
                placeholder="+260 XXX XXX XXX"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="customerAddress">Address</Label>
              <Textarea
                id="customerAddress"
                value={formData.customerAddress}
                onChange={(e) => updateFormData('customerAddress', e.target.value)}
                placeholder="Customer address"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="customerEmail">Email Address</Label>
              <Input
                id="customerEmail"
                type="email"
                value={formData.customerEmail}
                onChange={(e) => updateFormData('customerEmail', e.target.value)}
                placeholder="customer@example.com"
              />
            </div>

            <div>
              <Label htmlFor="tpinNo">TPIN No.</Label>
              <Input
                id="tpinNo"
                value={formData.tpinNo}
                onChange={(e) => updateFormData('tpinNo', e.target.value)}
                placeholder="TPIN Number"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Information */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="vehicleMake">Vehicle Make</Label>
              <Input
                id="vehicleMake"
                value={formData.vehicleMake}
                onChange={(e) => updateFormData('vehicleMake', e.target.value)}
                placeholder="Toyota"
              />
            </div>

            <div>
              <Label htmlFor="regNo">Reg No.</Label>
              <Input
                id="regNo"
                value={formData.regNo}
                onChange={(e) => updateFormData('regNo', e.target.value)}
                placeholder="ABC 123 GP"
              />
            </div>

            <div>
              <Label htmlFor="chassisNo">Chassis No.</Label>
              <Input
                id="chassisNo"
                value={formData.chassisNo}
                onChange={(e) => updateFormData('chassisNo', e.target.value)}
                placeholder="Chassis Number"
              />
            </div>

            <div>
              <Label htmlFor="colour">Colour</Label>
              <Input
                id="colour"
                value={formData.colour}
                onChange={(e) => updateFormData('colour', e.target.value)}
                placeholder="White"
              />
            </div>

            <div>
              <Label htmlFor="vehicleNumber">Vehicle Number</Label>
              <Input
                id="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={(e) => updateFormData('vehicleNumber', e.target.value)}
                placeholder="Vehicle Number"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Line Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Services / Items
            <Button type="button" onClick={addLineItem} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {formData.lineItems.map((item, index) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end p-4 border rounded-lg">
                <div className="md:col-span-1">
                  <Label>S/No</Label>
                  <Input
                    type="number"
                    value={item.sNo}
                    onChange={(e) => updateLineItem(item.id, 'sNo', parseInt(e.target.value) || index + 1)}
                    className="bg-gray-50"
                  />
                </div>

                <div className="md:col-span-4">
                  <Label>Description</Label>
                  <Textarea
                    value={item.description}
                    onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                    placeholder="Service or item description"
                    rows={2}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Category</Label>
                  <Select value={item.category} onValueChange={(value: 'repair' | 'spare' | 'paint' | 'labour' | 'consumable') => updateLineItem(item.id, 'category', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="repair">Repairs</SelectItem>
                      <SelectItem value="spare">Spares</SelectItem>
                      <SelectItem value="paint">Paints & Material</SelectItem>
                      <SelectItem value="labour">Labour</SelectItem>
                      <SelectItem value="consumable">Consumables</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-1">
                  <Label>Qty</Label>
                  <Input
                    type="number"
                    min="1"
                    step="1"
                    value={item.quantity}
                    onChange={(e) => updateLineItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Unit Price (K)</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => updateLineItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                  />
                </div>

                <div className="md:col-span-1">
                  <Label>Amount (K)</Label>
                  <Input
                    type="number"
                    value={item.amount.toFixed(2)}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>

                <div className="md:col-span-1">
                  {formData.lineItems.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeLineItem(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Totals */}
      <Card>
        <CardHeader>
          <CardTitle>Summary Totals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="paintsAndMaterial">Paints and Material (K)</Label>
                <Input
                  id="paintsAndMaterial"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.paintsAndMaterial}
                  onChange={(e) => updateFormData('paintsAndMaterial', parseFloat(e.target.value) || 0)}
                />
              </div>

              <div>
                <Label htmlFor="spares">Spares (K)</Label>
                <Input
                  id="spares"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.spares}
                  onChange={(e) => updateFormData('spares', parseFloat(e.target.value) || 0)}
                />
              </div>

              <div>
                <Label htmlFor="labour">Labour (K)</Label>
                <Input
                  id="labour"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.labour}
                  onChange={(e) => updateFormData('labour', parseFloat(e.target.value) || 0)}
                />
              </div>

              <div>
                <Label htmlFor="consumables">Consumables (K)</Label>
                <Input
                  id="consumables"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.consumables}
                  onChange={(e) => updateFormData('consumables', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">K {formData.subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span>VAT ({formData.vatRate}%):</span>
                <span className="font-medium">K {formData.vatAmount.toFixed(2)}</span>
              </div>

              <hr />

              <div className="flex justify-between text-lg font-bold">
                <span>GRAND TOTAL:</span>
                <span>K {formData.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms & Conditions and Signatures */}
      <Card>
        <CardHeader>
          <CardTitle>Terms & Conditions and Signatures</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="notes">Terms & Conditions</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => updateFormData('notes', e.target.value)}
              rows={6}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="preparedBy">Prepared By</Label>
                <Input
                  id="preparedBy"
                  value={formData.preparedBy}
                  onChange={(e) => updateFormData('preparedBy', e.target.value)}
                  placeholder="Name of person preparing document"
                />
              </div>

              <div>
                <Label htmlFor="signature">Signature</Label>
                <Input
                  id="signature"
                  value={formData.signature}
                  onChange={(e) => updateFormData('signature', e.target.value)}
                  placeholder="Signature or initials"
                />
              </div>
            </div>

            {formData.type === 'invoice' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="receivedBy">Received By</Label>
                  <Input
                    id="receivedBy"
                    value={formData.receivedBy}
                    onChange={(e) => updateFormData('receivedBy', e.target.value)}
                    placeholder="Customer name"
                  />
                </div>

                <div>
                  <Label htmlFor="receivedSignature">Customer Signature</Label>
                  <Input
                    id="receivedSignature"
                    value={formData.receivedSignature}
                    onChange={(e) => updateFormData('receivedSignature', e.target.value)}
                    placeholder="Customer signature"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit" size="lg" className="min-w-[200px]">
          Generate {formData.type === 'quotation' ? 'Quotation' : 'Invoice'}
        </Button>
      </div>
    </form>
  );
};

export default QuotationForm;
