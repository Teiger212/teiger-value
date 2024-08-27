import React from 'react';
import { Button } from "@/components/ui/button";

interface ProductItemProps {
  id: number;
  name: string;
  description: string;
  image: string;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
}

export const ProductItem: React.FC<ProductItemProps> = ({ id, name, description, image, onSelect, onDelete }) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-2 mb-2">
      <div className="flex items-center cursor-pointer" onClick={() => onSelect(id)}>
        <img src={image} alt={name} className="w-12 h-12 object-cover mr-2" />
        <div>
          <h3 className="font-bold">{name}</h3>
          <p className="text-sm">{description}</p>
        </div>
      </div>
      <Button variant="destructive" onClick={() => onDelete(id)}>Delete</Button>
    </div>
  );
};