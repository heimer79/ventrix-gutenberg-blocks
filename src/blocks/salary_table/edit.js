import { __ } from "@wordpress/i18n";
import { useEffect, useState } from "@wordpress/element";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import {
	SelectControl,
	PanelBody,
	Spinner,
	Button,
} from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";
import "./style.scss";


const Edit = ({ attributes, setAttributes }) => {
	const { selectedState, tableData } = attributes;
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
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

	const fetchTableData = async (state) => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await apiFetch({
				path: `/cafeto/v1/salary-data?state=${state}`,
			});
			setAttributes({ tableData: response });
		} catch (err) {
			setError(err.message || "Error loading data");
		} finally {
			setIsLoading(false);
		}
	};

	const refreshData = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await apiFetch({
				path: "/cafeto/v1/salary-data/refresh",
				method: "POST",
				data: { state: selectedState },
			});
			setAttributes({ tableData: response });
		} catch (err) {
			setError(err.message || "Error updating data");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (selectedState) {
			fetchTableData(selectedState);
		}
	}, [selectedState]);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Salary Table Settings", "cafeto")}>
					<SelectControl
						label={__("Select State", "cafeto")}
						value={selectedState}
						options={states}
						onChange={(value) => setAttributes({ selectedState: value })}
					/>
					{selectedState && (
						<Button
							variant="secondary"
							onClick={refreshData}
							isBusy={isLoading}
							style={{ marginTop: "10px" }}
						>
							{__("Update Data", "cafeto")}
						</Button>
					)}
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				{isLoading ? (
					<div className="salary-table-loading">Loading data...</div>
				) : error ? (
					<div className="salary-table-error">{error}</div>
				) : !selectedState ? (
					<div className="salary-table-empty">
						Please select a state to view salary data.
					</div>
				) : tableData && tableData.length > 0 ? (
					<div
						className="salary-table-container"
						style={{
							backgroundColor: "#ffffff",
							padding: "10px",
							margin: "20px 0",
							borderTop: "5px solid #6d57c3",
							borderBottom: "1px solid #6d57c3",
							borderRight: "1px solid #6d57c3",
							borderLeft: "1px solid #6d57c3",
						}}
					>
						<figure className="wp-block-table bordered-table customTable mobile-friendly-table-type1 singlerow-header">
							<table className="has-fixed-layout">
								<thead>
									<tr>
										<th>
											<strong>Area</strong>
										</th>
										<th>
											<strong>Occupation</strong>
										</th>
										<th>
											<strong>10th Percentile</strong>
										</th>
										<th>
											<strong>Median</strong>
										</th>
										<th>
											<strong>90th Percentile</strong>
										</th>
									</tr>
								</thead>
								<tbody>
									{tableData.map((row, index) => (
										<tr key={index}>
											<td>
												{row.area}
											</td>
											<td>
												{row.occupation}
											</td>
											<td>
												{row.n_10th_percentile}
											</td>
											<td>
												{row.median}
											</td>
											<td>
												{row.n_90th_percentile}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</figure>
					</div>
				) : (
					<div className="salary-table-empty">
						No data available for this state.
					</div>
				)}
			</div>
		</>
	);
};

export default Edit;
