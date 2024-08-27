import React from 'react';
import { useLocalStorage, useDebounceValue } from 'usehooks-ts';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddProductDialog } from '@/components/AddProductDialog';
import { ProductsDisplaySection } from '@/components/ProductsDisplaySection';
import { Product, initialProducts } from '@/lib/utils';

const App: React.FC = () => {
  const [products, setProducts] = useLocalStorage<Product[]>('products', initialProducts);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearchTerm = useDebounceValue<string>(searchTerm, 300);
  const [sortKey, setSortKey] = React.useState<'name' | 'creationDate'>('name');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

  const sortedAndFilteredProducts = React.useMemo(() => {
    return !debouncedSearchTerm[0] ? products : products
      .filter(product => 
        product.name.toLowerCase().includes(debouncedSearchTerm[0].toLowerCase())
      )
      .sort((a, b) => {
        if (sortKey === 'name') {
          return sortDirection === 'asc' 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else {
          return sortDirection === 'asc'
            ? a.creationDate.getTime() - b.creationDate.getTime()
            : b.creationDate.getTime() - a.creationDate.getTime();
        }
      });
  }, [products, debouncedSearchTerm, sortKey, sortDirection]);

  const handleDelete = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
    if (selectedProduct && selectedProduct.id === id) {
      setSelectedProduct(null);
    }
  };

  const handleSave = (updatedProduct: Product) => {
    if (updatedProduct.id) {
      setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    } else {
      const newProduct = { ...updatedProduct, id: Date.now(), creationDate: new Date() };
      setProducts([...products, newProduct]);
    }
    setSelectedProduct(null);
  };

  const handleAdd = (newProduct: { name: string; imageUrl?: string }) => {
    const productToAdd: Product = { 
      id: Date.now(), 
      ...newProduct, 
      creationDate: new Date(), 
      imageUrl: newProduct.imageUrl || 'https://via.placeholder.com/150' 
    };
    setProducts([...products, productToAdd]);
  };

  const handleSort = (value: 'name' | 'creationDate') => {
    if (value === sortKey) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(value);
      setSortDirection('asc');
    }
  };

  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100'>
      <div className="py-8 border-b shadow-sm bg-white">
        <h1 className="text-2xl font-bold text-center font-mono tracking-widest">TEIGER VALUE STORE</h1>
      </div>
      <div className="flex-1 max-w-5xl mx-auto w-full p-4">
        <div className="flex justify-between mb-4">
          <div className="flex gap-2">
            <AddProductDialog onAddProduct={handleAdd} />
            <Input 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="max-w-sm bg-white"
            />
          </div>
          <Select onValueChange={handleSort}>
            <SelectTrigger className="w-44 bg-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="creationDate">Recently Added</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ProductsDisplaySection
          products={sortedAndFilteredProducts}
          selectedProduct={selectedProduct}
          onSelectProduct={(id) => setSelectedProduct(products.find(p => p.id === id) || null)}
          onDeleteProduct={handleDelete}
          onSaveProduct={handleSave}
        />
      </div>
    </div>
  );
};

export default App;