import type React from "react";
import { useState } from "react";
import type { Product } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProductItem } from "./ProductItem";

interface ProductListProps {
	products: Product[];
	onSelectProduct: (id: number) => void;
	onDeleteProduct: (id: number) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
	products,
	onSelectProduct,
	onDeleteProduct,
}) => {
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 4;

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = products.slice(
		indexOfFirstProduct,
		indexOfLastProduct,
	);

	const totalPages = Math.ceil(products.length / productsPerPage);

	return (
		<div>
			<div className="space-y-2">
				{currentProducts.map((product) => (
					<ProductItem
						key={product.id}
						{...product}
						onSelect={onSelectProduct}
						onDelete={onDeleteProduct}
					/>
				))}
			</div>
			<div className="flex justify-between items-center mt-4">
				<Button
					variant="outline"
					onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
					disabled={currentPage === 1}
				>
					&lt; Prev Page
				</Button>
				<span>
					{currentPage} of {totalPages}
				</span>
				<Button
					variant="outline"
					onClick={() =>
						setCurrentPage((prev) => Math.min(prev + 1, totalPages))
					}
					disabled={currentPage === totalPages}
				>
					Next Page &gt;
				</Button>
			</div>
		</div>
	);
};
