import type React from "react";
import { ProductList } from "@/components/ProductList";
import { ProductDetails } from "@/components/ProductDetails";
import type { Product } from "@/lib/utils";

interface ProductsDisplaySectionProps {
	products: Product[];
	selectedProduct: Product | null;
	onSelectProduct: (id: number) => void;
	onDeleteProduct: (id: number) => void;
	onSaveProduct: (product: Product) => void;
}

export const ProductsDisplaySection: React.FC<ProductsDisplaySectionProps> = ({
	products,
	selectedProduct,
	onSelectProduct,
	onDeleteProduct,
	onSaveProduct,
}) => {
	return (
		<div className="flex gap-x-4 h-full">
			<div className="w-1/2">
				<ProductList
					products={products}
					onSelectProduct={onSelectProduct}
					onDeleteProduct={onDeleteProduct}
				/>
			</div>
			<div className="w-1/2">
				<ProductDetails product={selectedProduct} onSave={onSaveProduct} />
			</div>
		</div>
	);
};
