import { __ } from "@wordpress/i18n";
import { useEffect, useState } from "@wordpress/element";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { SelectControl, PanelBody, Spinner } from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";
import "./editor.scss";

const Edit = ({ attributes, setAttributes }) => {
	const { selectedState, tableData, isLoading, error } = attributes;
	const blockProps = useBlockProps();

	const states = [
		{ label: "Select a state", value: "" },
		{ label: "Alaska", value: "Alaska" },
		{ label: "Alabama", value: "Alabama" },
		{ label: "Arkansas", value: "Arkansas" },
		{ label: "Arizona", value: "Arizona" },
		{ label: "California", value: "California" },
		{ label: "Colorado", value: "Colorado" },
		{ label: "Connecticut", value: "Connecticut" },
		{ label: "Delaware", value: "Delaware" },
		{ label: "Florida", value: "Florida" },
		{ label: "Georgia", value: "Georgia" },
		{ label: "Hawaii", value: "Hawaii" },
		{ label: "Iowa", value: "Iowa" },
		{ label: "Idaho", value: "Idaho" },
		{ label: "Illinois", value: "Illinois" },
		{ label: "Indiana", value: "Indiana" },
		{ label: "Kansas", value: "Kansas" },
		{ label: "Kentucky", value: "Kentucky" },
		{ label: "Louisiana", value: "Louisiana" },
		{ label: "Massachusetts", value: "Massachusetts" },
		{ label: "Maryland", value: "Maryland" },
		{ label: "Maine", value: "Maine" },
		{ label: "Michigan", value: "Michigan" },
		{ label: "Minnesota", value: "Minnesota" },
		{ label: "Missouri", value: "Missouri" },
		{ label: "Mississippi", value: "Mississippi" },
		{ label: "Montana", value: "Montana" },
		{ label: "North Carolina", value: "North Carolina" },
		{ label: "North Dakota", value: "North Dakota" },
		{ label: "Nebraska", value: "Nebraska" },
		{ label: "New Hampshire", value: "New Hampshire" },
		{ label: "New Jersey", value: "New Jersey" },
		{ label: "New Mexico", value: "New Mexico" },
		{ label: "Nevada", value: "Nevada" },
		{ label: "New York", value: "New York" },
		{ label: "Ohio", value: "Ohio" },
		{ label: "Oklahoma", value: "Oklahoma" },
		{ label: "Oregon", value: "Oregon" },
		{ label: "Pennsylvania", value: "Pennsylvania" },
		{ label: "Rhode Island", value: "Rhode Island" },
		{ label: "South Carolina", value: "South Carolina" },
		{ label: "South Dakota", value: "South Dakota" },
		{ label: "Tennessee", value: "Tennessee" },
		{ label: "Texas", value: "Texas" },
		{ label: "Utah", value: "Utah" },
		{ label: "Virginia", value: "Virginia" },
		{ label: "Vermont", value: "Vermont" },
		{ label: "Washington", value: "Washington" },
		{ label: "Wisconsin", value: "Wisconsin" },
		{ label: "West Virginia", value: "West Virginia" },
		{ label: "Wyoming", value: "Wyoming" },
	];

	const fetchTableData = async () => {
		if (!selectedState) return;

		setAttributes({ isLoading: true, error: null });

		try {
			const response = await apiFetch({
				path: `/cafeto/v1/salary-data?state=${selectedState}`,
				method: "GET",
			});

			console.log("API Response:", response); // Debug log

			if (response && Array.isArray(response)) {
				setAttributes({
					tableData: response,
					isLoading: false,
					error: null,
				});
			} else {
				throw new Error("Invalid response format");
			}
		} catch (error) {
			console.error("Error fetching salary data:", error);
			setAttributes({
				error: "Failed to load salary data. Please try again.",
				isLoading: false,
				tableData: [],
			});
		}
	};

	useEffect(() => {
		if (selectedState) {
			fetchTableData();
		}
	}, [selectedState]);

	return (
		<>
			<InspectorControls>
				<PanelBody title="Table Settings" initialOpen={true}>
					<SelectControl
						label="Select State"
						value={selectedState}
						options={states}
						onChange={(value) => setAttributes({ selectedState: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="salary-table-container">
					<div className="salary-table-controls">
						<SelectControl
							label="Select State"
							value={selectedState}
							options={states}
							onChange={(value) => setAttributes({ selectedState: value })}
						/>
					</div>

					{isLoading && (
						<div className="salary-table-loading">Loading salary data...</div>
					)}

					{error && <div className="salary-table-error">{error}</div>}

					{!isLoading && !error && tableData && tableData.length > 0 && (
						<table className="bordered-table">
							<thead>
								<tr>
									<th>Area</th>
									<th>Occupation</th>
									<th>10th Percentile</th>
									<th>Median</th>
									<th>90th Percentile</th>
								</tr>
							</thead>
							<tbody>
								{tableData.map((row, index) => (
									<tr key={index}>
										<td>{row.area}</td>
										<td>{row.occupation}</td>
										<td>{row.n_10th_percentile}</td>
										<td>{row.median}</td>
										<td>{row.n_90th_percentile}</td>
									</tr>
								))}
							</tbody>
						</table>
					)}

					{!isLoading && !error && (!tableData || tableData.length === 0) && (
						<div className="salary-table-empty">
							No data available for the selected state.
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Edit;
