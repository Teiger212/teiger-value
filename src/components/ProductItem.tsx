import type React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "./ui/card";
import type { Product } from "@/lib/utils";

interface ProductItemProps extends Product {
	onSelect: (id: number) => void;
	onDelete: (id: number) => void;
}

export const ProductItem: React.FC<ProductItemProps> = ({
	id,
	name,
	description,
	imageUrl,
	onSelect,
	onDelete,
}) => {
	return (
		<Card key={id} className="overflow-hidden">
			<CardHeader className="p-0">
				<img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
			</CardHeader>
			<CardContent className="p-4">
				<h3 className="font-bold text-lg">{name}</h3>
				<p className="text-sm text-gray-600 mt-2">{description}</p>
			</CardContent>
			<CardFooter className="flex justify-between p-4">
				<Button onClick={() => onSelect(id)}>View</Button>
				<Button
					variant="destructive"
					onClick={(e) => {
						e.stopPropagation();
						onDelete(id);
					}}
				>
					Delete
				</Button>
			</CardFooter>
		</Card>
	);
};
