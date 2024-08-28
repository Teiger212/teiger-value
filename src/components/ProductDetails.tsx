import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Product } from "@/lib/utils";

interface ProductDetailsProps {
	product: Product | null;
	onSave: (product: Product) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
	product,
	onSave,
}) => {
	const [editedProduct, setEditedProduct] = useState<Product | null>(null);

	useEffect(() => {
		setEditedProduct(product);
	}, [product]);

	if (!product || !editedProduct) {
		return (
			<div className="flex-1 min-h-40 flex items-center justify-center bg-white p-4 border">
				Select a product to view details
			</div>
		);
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setEditedProduct((prev) => {
			if (!prev) return product; // Fallback to original product if prev is null
			return { ...prev, [name]: value };
		});
	};

	return (
		<div className="flex-1 bg-white p-4 border">
			<h2 className="text-lg font-bold mb-4">{editedProduct.name} Details</h2>
			<img
				src={editedProduct.imageUrl}
				alt={editedProduct.name}
				className="w-full h-fit-content object-cover mb-4"
			/>
			<div className="space-y-4">
				<div>
					<label
						htmlFor="name"
						className="block text-sm font-medium text-gray-700"
					>
						Name
					</label>
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
					<label
						htmlFor="description"
						className="block text-sm font-medium text-gray-700"
					>
						Description
					</label>
					<Textarea
						id="description"
						name="description"
						value={editedProduct.description}
						onChange={handleChange}
						className="mt-1"
						maxLength={200}
					/>
				</div>
				<div>
					<label
						htmlFor="imageUrl"
						className="block text-sm font-medium text-gray-700"
					>
						Image URL
					</label>
					<Input
						id="imageUrl"
						name="imageUrl"
						value={editedProduct.imageUrl}
						onChange={handleChange}
						className="mt-1"
						required
					/>
				</div>
				<Button
					onClick={() => onSave(editedProduct)}
					className="w-full text-white"
				>
					Save
				</Button>
			</div>
		</div>
	);
};
