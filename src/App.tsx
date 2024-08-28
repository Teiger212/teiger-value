import React from "react";
import { useLocalStorage, useDebounceValue } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { CustomSelect } from "@/components/ui/customSelect";
import { AddProductDialog } from "@/components/AddProductDialog";
import { ProductsDisplaySection } from "@/components/ProductsDisplaySection";
import { type Product, initialProducts, sortOptions } from "@/lib/utils";

const App: React.FC = () => {
	const [products, setProducts] = useLocalStorage<Product[]>(
		"products",
		initialProducts,
	);
	const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
		null,
	);
	const [searchTerm, setSearchTerm] = React.useState("");
	const debouncedSearchTerm = useDebounceValue<string>(searchTerm, 300);
	const [sortKey, setSortKey] = React.useState<"name" | "creationDate">("name");
	const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
		"asc",
	);

	const sortedAndFilteredProducts = React.useMemo(() => {
		return products
			.map((product) => ({
				...product,
				creationDate:
					product.creationDate instanceof Date
						? product.creationDate
						: new Date(product.creationDate),
			}))
			.filter((product) =>
				product.name
					.toLowerCase()
					.includes(debouncedSearchTerm[0].toLowerCase()),
			)
			.sort((a, b) => {
				if (sortKey === "name") {
					return sortDirection === "asc"
						? a.name.localeCompare(b.name)
						: b.name.localeCompare(a.name);
				}
				return sortDirection === "asc"
					? a.creationDate.getTime() - b.creationDate.getTime()
					: b.creationDate.getTime() - a.creationDate.getTime();
			});
	}, [products, debouncedSearchTerm, sortKey, sortDirection]);

	const handleDelete = (id: number) => {
		setProducts(products.filter((product) => product.id !== id));
		if (selectedProduct && selectedProduct.id === id) {
			setSelectedProduct(null);
		}
	};

	const handleSave = (updatedProduct: Product) => {
		if (updatedProduct.id) {
			setProducts(
				products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
			);
		} else {
			const newProduct = {
				...updatedProduct,
				id: Date.now(),
				creationDate: new Date(),
			};
			setProducts([...products, newProduct]);
		}
		setSelectedProduct(null);
	};

	const handleAdd = (newProduct: { name: string; imageUrl?: string }) => {
		const productToAdd: Product = {
			id: Date.now(),
			...newProduct,
			creationDate: new Date(),
			imageUrl: newProduct.imageUrl || "https://via.placeholder.com/150",
		};
		setProducts([...products, productToAdd]);
	};

	const handleSort = (value: string) => {
		if (value === sortKey) {
			setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
		} else {
			setSortKey(value as "name" | "creationDate");
			setSortDirection("asc");
		}
	};

	return (
		<div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
			<div className="py-8 border-b shadow-sm bg-white">
				<h1 className="text-2xl font-bold text-center font-mono tracking-widest">
					TEIGER VALUE STORE
				</h1>
			</div>
			<div className="flex-1 max-w-5xl mx-auto w-full p-4">
				<div className="flex justify-between mb-4">
					<div className="flex gap-2">
						<AddProductDialog onAddProduct={handleAdd} />
						<Input
							placeholder="Search products..."
							value={searchTerm}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setSearchTerm(e.target.value)
							}
							className="max-w-sm bg-white"
						/>
					</div>
					<CustomSelect
						sortDirection={sortDirection}
						options={sortOptions}
						onSelect={handleSort}
						placeholder="Sort by"
					/>
				</div>
				<ProductsDisplaySection
					products={sortedAndFilteredProducts}
					selectedProduct={selectedProduct}
					onSelectProduct={(id) =>
						setSelectedProduct(products.find((p) => p.id === id) || null)
					}
					onDeleteProduct={handleDelete}
					onSaveProduct={handleSave}
				/>
			</div>
		</div>
	);
};

export default App;
