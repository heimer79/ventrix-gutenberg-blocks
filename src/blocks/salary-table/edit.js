import { __ } from "@wordpress/i18n";
import { useEffect, useState } from "@wordpress/element";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { SelectControl, PanelBody, Spinner } from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";
import "./editor.scss";

// Lista de estados de EE.UU.
const US_STATES = [
	{ label: "Select a state", value: "" },
	{ label: "Alaska", value: "AK" },
	{ label: "Alabama", value: "Alabama" },
	{ label: "Arkansas", value: "AR" },
	{ label: "Arizona", value: "AZ" },
	{ label: "California", value: "CA" },
	{ label: "Colorado", value: "CO" },
	{ label: "Connecticut", value: "CT" },
	{ label: "Delaware", value: "DE" },
	{ label: "Florida", value: "FL" },
	{ label: "Georgia", value: "GA" },
	{ label: "Hawaii", value: "HI" },
	{ label: "Iowa", value: "IA" },
	{ label: "Idaho", value: "ID" },
	{ label: "Illinois", value: "IL" },
	{ label: "Indiana", value: "IN" },
	{ label: "Kansas", value: "KS" },
	{ label: "Kentucky", value: "KY" },
	{ label: "Louisiana", value: "LA" },
	{ label: "Massachusetts", value: "MA" },
	{ label: "Maryland", value: "MD" },
	{ label: "Maine", value: "ME" },
	{ label: "Michigan", value: "MI" },
	{ label: "Minnesota", value: "MN" },
	{ label: "Missouri", value: "MO" },
	{ label: "Mississippi", value: "MS" },
	{ label: "Montana", value: "MT" },
	{ label: "North Carolina", value: "NC" },
	{ label: "North Dakota", value: "ND" },
	{ label: "Nebraska", value: "NE" },
	{ label: "New Hampshire", value: "NH" },
	{ label: "New Jersey", value: "NJ" },
	{ label: "New Mexico", value: "NM" },
	{ label: "Nevada", value: "NV" },
	{ label: "New York", value: "NY" },
	{ label: "Ohio", value: "OH" },
	{ label: "Oklahoma", value: "OK" },
	{ label: "Oregon", value: "OR" },
	{ label: "Pennsylvania", value: "PA" },
	{ label: "Rhode Island", value: "RI" },
	{ label: "South Carolina", value: "SC" },
	{ label: "South Dakota", value: "SD" },
	{ label: "Tennessee", value: "TN" },
	{ label: "Texas", value: "TX" },
	{ label: "Utah", value: "UT" },
	{ label: "Virginia", value: "VA" },
	{ label: "Vermont", value: "VT" },
	{ label: "Washington", value: "WA" },
	{ label: "Wisconsin", value: "WI" },
	{ label: "West Virginia", value: "WV" },
	{ label: "Wyoming", value: "WY" },
];

const Edit = ({ attributes, setAttributes }) => {
	const { selectedState, tableData, isLoading, error } = attributes;
	const blockProps = useBlockProps();

	// Función para cargar los datos de la tabla
	const fetchTableData = async () => {
		if (!selectedState) return;

		setAttributes({ isLoading: true, error: null });

		try {
			const response = await apiFetch({
				path: `/cafeto/v1/salary-data?state=${selectedState}`,
				method: "GET",
			});

			if (response) {
				setAttributes({ tableData: response });
			}
		} catch (error) {
			console.error("Error fetching salary data:", error);
			setAttributes({
				error: "Failed to load salary data. Please try again.",
				isLoading: false,
			});
		}
	};

	// Efecto para cargar datos cuando cambia el estado
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
						options={US_STATES}
						onChange={(value) => setAttributes({ selectedState: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				{isLoading ? (
					<div className="salary-table-loading">
						<Spinner />
						<p>Loading salary data...</p>
					</div>
				) : error ? (
					<div className="salary-table-error">
						<p>{error}</p>
					</div>
				) : tableData.length > 0 ? (
					<figure className="wp-block-table bordered-table customTable mobile-friendly-table-type1 singlerow-header">
						<table className="has-fixed-layout">
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
										<td>
											<span className="m-heading_label">Area</span>
											{row.area}
										</td>
										<td>
											<span className="m-heading_label">Occupation</span>
											{row.occupation}
										</td>
										<td>
											<span className="m-heading_label">10th Percentile</span>
											{row.n_10th_percentile}
										</td>
										<td>
											<span className="m-heading_label">Median</span>
											{row.median}
										</td>
										<td>
											<span className="m-heading_label">90th Percentile</span>
											{row.n_90th_percentile}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</figure>
				) : (
					<div className="salary-table-empty">
						<p>Please select a state to view salary data.</p>
					</div>
				)}
			</div>
		</>
	);
};

export default Edit;
