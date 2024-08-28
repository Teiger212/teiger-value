import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { productSchema } from "@/lib/utils";

interface AddProductDialogProps {
	onAddProduct: (product: {
		name: string;
		imageUrl?: string;
		description: string;
	}) => void;
}

export const AddProductDialog: React.FC<AddProductDialogProps> = ({
	onAddProduct,
}) => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		imageUrl: "",
		description: "",
	});
	const [isValid, setIsValid] = useState(false);
	const [open, setOpen] = useState(false);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		const updatedProduct = { ...newProduct, [name]: value };
		setNewProduct(updatedProduct);

		const validationResult = productSchema.safeParse(updatedProduct);
		setIsValid(validationResult.success);
	};

	const handleAdd = () => {
		const validationResult = productSchema.safeParse(newProduct);
		if (validationResult.success) {
			onAddProduct(newProduct);
			setNewProduct({ name: "", imageUrl: "", description: "" });
			setOpen(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Add Product</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New Product</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input
							id="name"
							name="name"
							value={newProduct.name}
							onChange={handleInputChange}
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="imageUrl" className="text-right">
							Image URL
						</Label>
						<Input
							id="imageUrl"
							name="imageUrl"
							value={newProduct.imageUrl}
							onChange={handleInputChange}
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="description" className="text-right">
							Description
						</Label>
						<Textarea
							id="description"
							name="description"
							value={newProduct.description}
							onChange={handleInputChange}
							className="col-span-3 overflow-hidden rounded-md border resize-none border-input hyphens-auto min-h-20 field-sizing-content"
						/>
					</div>
				</div>
				<Button onClick={handleAdd} disabled={!isValid}>
					Add Product
				</Button>
			</DialogContent>
		</Dialog>
	);
};
