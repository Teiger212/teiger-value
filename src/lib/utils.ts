import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const productSchema = z.object({
	name: z.string().min(1, "Name is required"),
	description: z.string(),
	imageUrl: z.string().url("Invalid URL").optional(),
	creationDate: z
		.date()
		.optional()
		.default(() => new Date()),
});

export interface Product {
	id: number;
	name: string;
	description?: string;
	creationDate: Date;
	imageUrl: string;
}

export const initialProducts: Product[] = [
	{
		id: 1,
		name: "Shirt",
		description: "A comfortable cotton shirt",
		creationDate: new Date(Date.now() - 86400000),
		imageUrl: "https://via.placeholder.com/150",
	},
	{
		id: 2,
		name: "Trousers",
		description: "Stylish denim trousers",
		creationDate: new Date(),
		imageUrl: "https://via.placeholder.com/150",
	},
];

export const sortOptions = [
	{ value: "name", label: "Name" },
	{ value: "creationDate", label: "Recently Added" },
];
