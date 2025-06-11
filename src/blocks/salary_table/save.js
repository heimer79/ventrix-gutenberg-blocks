import { useBlockProps } from "@wordpress/block-editor";

export default function Save({ attributes }) {
	const { selectedState, tableData } = attributes;
	const blockProps = useBlockProps.save();

	return (
		<div
			{...blockProps}
			data-state={selectedState}
			data-table-data={JSON.stringify(tableData)}
		>
			{/* El contenido se renderizará en PHP */}
		</div>
	);
}
