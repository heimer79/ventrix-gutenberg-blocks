document.addEventListener("DOMContentLoaded", function () {
	const salaryTables = document.querySelectorAll(".salary-table-container");

	salaryTables.forEach((container) => {
		const state = container.dataset.state;
		const tableData = JSON.parse(container.dataset.tableData || "[]");

		if (tableData.length > 0) {
			const tableHTML = `
                <figure class="wp-block-table bordered-table customTable mobile-friendly-table-type1 singlerow-header">
                    <table class="has-fixed-layout">
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
                            ${tableData
															.map(
																(row) => `
                                <tr>
                                    <td>
                                        <span class="m-heading_label">Area</span>
                                        ${row.area}
                                    </td>
                                    <td>
                                        <span class="m-heading_label">Occupation</span>
                                        ${row.occupation}
                                    </td>
                                    <td>
                                        <span class="m-heading_label">10th Percentile</span>
                                        ${row.n_10th_percentile}
                                    </td>
                                    <td>
                                        <span class="m-heading_label">Median</span>
                                        ${row.median}
                                    </td>
                                    <td>
                                        <span class="m-heading_label">90th Percentile</span>
                                        ${row.n_90th_percentile}
                                    </td>
                                </tr>
                            `,
															)
															.join("")}
                        </tbody>
                    </table>
                </figure>
            `;

			container.innerHTML = tableHTML;
		}
	});
});
