import { useBlockProps } from "@wordpress/block-editor";

const Save = ({ attributes }) => {
	const { selectedState, tableData } = attributes;
	const blockProps = useBlockProps.save();

	return (
		<div {...blockProps}>
			<div
				className="salary-table-container"
				data-state={selectedState}
				data-table-data={JSON.stringify(tableData)}
			/>
		</div>
	);
};

export default Save;
