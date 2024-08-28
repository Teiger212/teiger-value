import type React from "react";
import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface CustomSelectProps {
	options: { value: string; label: string }[];
	onSelect: (value: string) => void;
	placeholder?: string;
	sortDirection?: "asc" | "desc";
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
	options,
	onSelect,
	placeholder,
	sortDirection,
}) => {
	const [selectedValue, setSelectedValue] = useState<string | undefined>(
		undefined,
	);

	const handleValueChange = (value: string) => {
		setSelectedValue(value);
		onSelect(value);
	};

	const handleOpenChange = (open: boolean) => {
		if (!open && selectedValue) {
			// When the select closes, trigger the onSelect again
			onSelect(selectedValue);
		}
	};

	return (
		<Select onValueChange={handleValueChange} onOpenChange={handleOpenChange}>
			<SelectTrigger className="w-44 bg-white">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem
						key={option.value}
						value={option.value}
						className="flex items-center justify-between"
					>
						<div className="flex items-center justify-between">
							{option.label}
							{sortDirection && option.value === selectedValue && (
								<span className="ml-2 text-neutral-500">
									{sortDirection === "asc" ? (
										<ChevronUp className="h-4 w-4" />
									) : (
										<ChevronDown className="h-4 w-4" />
									)}
								</span>
							)}
						</div>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
