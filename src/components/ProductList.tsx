import React, { useState } from 'react';
import { Product } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProductListProps {
  products: Product[];
  onSelectProduct: (id: number) => void;
  onDeleteProduct: (id: number) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, onSelectProduct, onDeleteProduct }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div>
      <div className="space-y-2">
        {currentProducts.map((product) => (
          <Card key={product.id}>
            <CardContent className="flex items-center justify-between p-2">
              <div onClick={() => onSelectProduct(product.id)} className="cursor-pointer">
                <span className="font-bold">{product.name}</span>
              </div>
              <Button variant="destructive" onClick={() => onDeleteProduct(product.id)}>Delete</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button 
          variant="outline" 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt; Prev Page
        </Button>
        <span>{currentPage} of {totalPages}</span>
        <Button 
          variant="outline" 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next Page &gt;
        </Button>
      </div>
    </div>
  );
};