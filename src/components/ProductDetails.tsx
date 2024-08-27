import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type Product } from '@/lib/utils';

interface ProductDetailsProps {
  product: Product | null;
  onSave: (product: Product) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onSave }) => {
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  if (!editedProduct) {
    return <div className="flex-1 min-h-40 flex items-center justify-center bg-white p-4 border">Select a product to view details</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({
      ...prev!,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSave = () => {
    if (editedProduct && editedProduct.name && editedProduct.description) {
      onSave(editedProduct);
    } else {
      // Handle validation error
    }
  };

  return (
    <div className="w-1/2 bg-white p-4 border">
      <h2 className="text-lg font-bold mb-4">{editedProduct.name} Details</h2>
      <img src={editedProduct.imageUrl} alt={editedProduct.name} className="w-full h-32 object-cover mb-4" />
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <Input
            id="name"
            name="name"
            value={editedProduct.name}
            onChange={handleChange}
            className="mt-1"
            maxLength={30}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <Textarea
            id="description"
            name="description"
            value={editedProduct.description}
            onChange={handleChange}
            className="mt-1"
            maxLength={200}
          />
        </div>
        <Button onClick={handleSave} className="bg-green-500 text-white">Save</Button>
      </div>
    </div>
  );
};