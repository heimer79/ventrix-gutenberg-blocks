import { useState, useEffect } from '@wordpress/element';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import {
    PanelBody,
    SelectControl,
    CheckboxControl,
    Spinner,
    TextControl,
    ToggleControl,
} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './editor.scss';

const getNoticeTitle = (code) => {
    const titles = {
        invalid_column: 'Salaries & Careers — Configuration Error',
        invalid_table: 'Salaries & Careers — Configuration Error',
        table_not_exist: 'Salaries & Careers — Configuration Error',
        no_data: 'Salaries & Careers — No Data',
    };

    return titles[code] || 'Salaries & Careers — Error';
};

const templateOptions = [
    { label: 'Salary Basic Desktop', value: 'salary-basic-table-desktop' },
    { label: 'Salary Double Row Desktop', value: 'salary-double-row-table-desktop' },
    { label: 'Career Basic Desktop', value: 'career-basic-table-desktop' },
    { label: 'Career Double Row Desktop', value: 'career-double-row-table-desktop' },
    { label: 'Salary Basic Mobile', value: 'salary-basic-table-mobile' },
    { label: 'Salary Double Row Mobile', value: 'salary-double-row-table-mobile' },
    { label: 'Career Basic Mobile', value: 'career-basic-table-mobile' },
    { label: 'Career Double Row Mobile', value: 'career-double-row-table-mobile' },
    { label: 'Salary Geo Desktop', value: 'salary-table-geo-desktop' },
    { label: 'Salary Geo Mobile', value: 'salary-table-geo-mobile' },
];

const EditorNotice = ({ title, message }) => (
    <div className="salaries-careers-editor__notice" role="alert">
        <span className="salaries-careers-editor__notice-icon" aria-hidden="true">
            ⚠
        </span>
        <div>
            <strong className="salaries-careers-editor__notice-title">{title}</strong>
            <span className="salaries-careers-editor__notice-text">{message}</span>
        </div>
    </div>
);

const SalariesCareersEdit = ({ attributes, setAttributes }) => {
    const [tables, setTables] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isLoadingTables, setIsLoadingTables] = useState(true);
    const [isLoadingColumns, setIsLoadingColumns] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const [blockNotice, setBlockNotice] = useState(null);

    const postId = useSelect(
        (select) => select('core/editor').getCurrentPost()?.id ?? null
    );

    const {
        selectedTable,
        selectedColumns = [],
        desktopTemplate = 'salary-basic-table-desktop',
        mobileTemplate = 'salary-basic-table-mobile',
        tableTitle,
        showTitle,
        pinUnitedStates,
        showSource = true,
        sourceText = '',
        sourceLink = '',
    } = attributes;

    const blockProps = useBlockProps({
        className: 'salaries-careers-editor',
    });


// Default configuration of columns and names based on the selected table
    const defaultColumnsConfig = {
        'ha5kws7pyb_salarybls': [
            { name: 'area', displayName: 'Area' },
            { name: 'n_10th_percentile', displayName: '10th Percentile' },
            { name: 'median', displayName: 'Median' },
            { name: 'n_90th_percentile', displayName: '90th Percentile' },
        ],
        'ha5kws7pyb_careerpc': [
            { name: 'area', displayName: 'Area' },
            { name: 'curr_jobs', displayName: 'Curr. Jobs' },
            { name: 'proj_jobs', displayName: 'Proj. Jobs' },
            { name: 'new_jobs', displayName: 'New Jobs' },
            { name: 'job_growth_rate', displayName: 'Growth %' },
            { name: 'avg_ann_opening', displayName: 'Avg. Ann. Openings' },
        ],
        'ha5kws7pyb_salary_standard': [
            { name: 'area', displayName: 'Area' },
            { name: 'n_10th_percentile', displayName: '10th Percentile' },
            { name: 'median', displayName: 'Median' },
            { name: 'n_90th_percentile', displayName: '90th Percentile' },
        ],
        'ha5kws7pyb_salary_bridge': [
            { name: 'occupation', displayName: 'Occupation' },
            { name: 'area', displayName: 'Area' },
            { name: 'n_10th_percentile', displayName: '10th Percentile' },
            { name: 'median', displayName: 'Median' },
            { name: 'n_90th_percentile', displayName: '90th Percentile' },
        ],
        'ha5kws7pyb_career_standard': [
            { name: 'area', displayName: 'Area' },
            { name: 'curr_jobs', displayName: 'Curr. Jobs' },
            { name: 'proj_jobs', displayName: 'Proj. Jobs' },
            { name: 'new_jobs', displayName: 'New Jobs' },
            { name: 'job_growth_rate', displayName: 'Growth %' },
            { name: 'avg_ann_opening', displayName: 'Avg. Ann. Openings' },
        ],
        'ha5kws7pyb_career_bridge': [
            { name: 'occupation', displayName: 'Occupation' },
            { name: 'area', displayName: 'Area' },
            { name: 'curr_jobs', displayName: 'Curr. Jobs' },
            { name: 'proj_jobs', displayName: 'Proj. Jobs' },
            { name: 'new_jobs', displayName: 'New Jobs' },
            { name: 'job_growth_rate', displayName: 'Growth %' },
            { name: 'avg_ann_opening', displayName: 'Avg. Ann. Openings' },
        ],
    };

    // Al montar el componente, obtener la lista de tablas
    useEffect(() => {
        setIsLoadingTables(true);
        apiFetch({ path: '/salaries-careers/v1/tables' })
            .then((response) => {
                if (Array.isArray(response) && response.length > 0) {
                    setTables(
                        response.map((table) => ({ label: table, value: table }))
                    );
                } else {
                    setBlockNotice({
                        title: 'Salaries & Careers — Error',
                        message: 'No tables found or invalid response format.',
                    });
                }
            })
            .catch((fetchError) => {
                console.error('Error fetching tables:', fetchError);
                setBlockNotice({
                    title: 'Salaries & Careers — Error',
                    message:
                        'Failed to fetch tables. Please check the console for more details.',
                });
            })
            .finally(() => {
                setIsLoadingTables(false);
            });
    }, []);

    // Load table columns for the inspector UI only — do not call setAttributes here.
    // Writing attributes on mount marks the post dirty when the block is merely selected.
    useEffect(() => {
        if (!selectedTable) {
            setColumns([]);
            return;
        }

        setIsLoadingColumns(true);
        apiFetch({
            path: `/salaries-careers/v1/columns?table=${selectedTable}`,
        })
                .then((response) => {
                    if (Array.isArray(response)) {
                        setColumns(response);
                    } else {
                        setBlockNotice({
                            title: 'Salaries & Careers — Error',
                            message: 'Invalid column data received.',
                        });
                    }
                })
                .catch((fetchError) => {
                    console.error('Error fetching columns:', fetchError);
                    setBlockNotice({
                        title: 'Salaries & Careers — Error',
                        message:
                            'Failed to fetch columns. Please check the console for more details.',
                    });
                })
                .finally(() => {
                    setIsLoadingColumns(false);
                });
    }, [selectedTable]);

    // Validate block configuration (same checks as frontend render).
    useEffect(() => {
        if (!selectedTable) {
            setBlockNotice(null);
            return;
        }

        setIsValidating(true);

        apiFetch({
            path: '/salaries-careers/v1/validate',
            method: 'POST',
            data: {
                table: selectedTable,
                columns: selectedColumns,
                post_id: postId,
                table_title: tableTitle,
                show_title: showTitle,
                pin_united_states: pinUnitedStates,
            },
        })
            .then((response) => {
                if (response.valid) {
                    setBlockNotice(null);
                    return;
                }

                let message = response.message || 'The block configuration is invalid.';

                if (response.code === 'no_data') {
                    message +=
                        ' The block will render empty on the frontend.';
                }

                setBlockNotice({
                    title: getNoticeTitle(response.code),
                    message,
                });
            })
            .catch((fetchError) => {
                console.error('Error validating block:', fetchError);
                setBlockNotice({
                    title: 'Salaries & Careers — Error',
                    message: 'Could not validate block configuration.',
                });
            })
            .finally(() => {
                setIsValidating(false);
            });
    }, [
        selectedTable,
        selectedColumns,
        postId,
        tableTitle,
        showTitle,
        pinUnitedStates,
    ]);

    // Función para manejar la selección de tabla
    const onTableSelect = (newSelectedTable) => {
        setAttributes({ selectedTable: newSelectedTable });

        // Si hay configuración por defecto, establecerla
        if (defaultColumnsConfig[newSelectedTable]) {
            setAttributes({ selectedColumns: defaultColumnsConfig[newSelectedTable] });
        } else {
            setAttributes({ selectedColumns: [] });
        }
    };

    // Función para manejar el cambio en las columnas seleccionadas
    const onColumnToggle = (columnName, isChecked) => {
        let newSelectedColumns;
        if (isChecked) {
            // Agregar columna con nombre de visualización por defecto
            newSelectedColumns = [
                ...selectedColumns,
                { name: columnName, displayName: columnName },
            ];
        } else {
            // Eliminar columna
            newSelectedColumns = selectedColumns.filter(
                (col) => col.name !== columnName
            );
        }
        setAttributes({ selectedColumns: newSelectedColumns });
    };

    // Función para manejar el reordenamiento de columnas
    const onDragEnd = (result) => {
        if (!result.destination) return;

        const newSelectedColumns = Array.from(selectedColumns);
        const [movedColumn] = newSelectedColumns.splice(result.source.index, 1);
        newSelectedColumns.splice(result.destination.index, 0, movedColumn);

        setAttributes({ selectedColumns: newSelectedColumns });
    };

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title="Table Settings">
                    {isLoadingTables ? (
                        <Spinner />
                    ) : (
                        <>
                            <SelectControl
                                label="Select MySQL Table"
                                value={selectedTable}
                                options={[
                                    { label: 'Select a table', value: '' },
                                    ...tables,
                                ]}
                                onChange={onTableSelect}
                            />
                            <SelectControl
                                label="Desktop Template"
                                value={desktopTemplate}
                                options={templateOptions}
                                onChange={(value) =>
                                    setAttributes({ desktopTemplate: value })
                                }
                            />
                            <SelectControl
                                label="Mobile Template"
                                value={mobileTemplate}
                                options={templateOptions}
                                onChange={(value) =>
                                    setAttributes({ mobileTemplate: value })
                                }
                            />
                            <ToggleControl
                                label="Show Table Title"
                                checked={showTitle}
                                onChange={(value) => setAttributes({ showTitle: value })}
                            />
                            {showTitle && (
                                <TextControl
                                    label="Table Title"
                                    value={tableTitle}
                                    onChange={(newTitle) =>
                                        setAttributes({ tableTitle: newTitle })
                                    }
                                />
                            )}
                            <ToggleControl
                                label="Show Source"
                                checked={showSource}
                                onChange={(value) => setAttributes({ showSource: value })}
                                />
                                {showSource && (
                                <>
                                    <TextControl
                                    label="Source Text"
                                    value={sourceText}
                                    onChange={(newText) => setAttributes({ sourceText: newText })}
                                    />
                                    <TextControl
                                    label="Source Link"
                                    value={sourceLink}
                                    onChange={(newLink) => setAttributes({ sourceLink: newLink })}
                                    />
                                </>
                                )}
                            <ToggleControl
                                label="Pin 'United States' Row at Top"
                                checked={pinUnitedStates}
                                onChange={(value) => setAttributes({ pinUnitedStates: value })}
                            />
                            {isLoadingColumns ? (
                                <Spinner />
                            ) : (
                                selectedTable &&
                                columns.length > 0 &&
                                !defaultColumnsConfig[selectedTable] && (
                                    <PanelBody
                                        title="Select and Arrange Columns"
                                        initialOpen={true}
                                    >
                                        {columns.map((column) => (
                                            <CheckboxControl
                                                key={column}
                                                label={column}
                                                checked={selectedColumns.some(
                                                    (col) => col.name === column
                                                )}
                                                onChange={(isChecked) =>
                                                    onColumnToggle(column, isChecked)
                                                }
                                            />
                                        ))}

                                        {selectedColumns.length > 0 && (
                                            <>
                                                <h4>Arrange and Rename Columns:</h4>
                                                <DragDropContext onDragEnd={onDragEnd}>
                                                    <Droppable droppableId="columns">
                                                        {(provided) => (
                                                            <div
                                                                {...provided.droppableProps}
                                                                ref={provided.innerRef}
                                                            >
                                                                {selectedColumns.map(
                                                                    (column, index) => (
                                                                        <Draggable
                                                                            key={column.name}
                                                                            draggableId={column.name}
                                                                            index={index}
                                                                        >
                                                                            {(
                                                                                provided
                                                                            ) => (
                                                                                <div
                                                                                    ref={
                                                                                        provided.innerRef
                                                                                    }
                                                                                    {...provided.draggableProps}
                                                                                    style={{
                                                                                        ...provided
                                                                                            .draggableProps
                                                                                            .style,
                                                                                        border:
                                                                                            '1px solid #ddd',
                                                                                        padding:
                                                                                            '8px',
                                                                                        marginBottom:
                                                                                            '4px',
                                                                                        backgroundColor:
                                                                                            '#f9f9f9',
                                                                                    }}
                                                                                >
                                                                                    <div
                                                                                        {...provided.dragHandleProps}
                                                                                        style={{
                                                                                            cursor:
                                                                                                'move',
                                                                                            marginBottom:
                                                                                                '4px',
                                                                                        }}
                                                                                    >
                                                                                        <strong>
                                                                                            {
                                                                                                column.name
                                                                                            }
                                                                                        </strong>
                                                                                    </div>
                                                                                    <TextControl
                                                                                        label="Display Name"
                                                                                        value={
                                                                                            column.displayName
                                                                                        }
                                                                                        onChange={(
                                                                                            newDisplayName
                                                                                        ) => {
                                                                                            const newSelectedColumns = [
                                                                                                ...selectedColumns,
                                                                                            ];
                                                                                            newSelectedColumns[
                                                                                                index
                                                                                            ] = {
                                                                                                ...newSelectedColumns[
                                                                                                    index
                                                                                                ],
                                                                                                displayName: newDisplayName,
                                                                                            };
                                                                                            setAttributes(
                                                                                                {
                                                                                                    selectedColumns:
                                                                                                        newSelectedColumns,
                                                                                                }
                                                                                            );
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            )}
                                                                        </Draggable>
                                                                    )
                                                                )}
                                                                {provided.placeholder}
                                                            </div>
                                                        )}
                                                    </Droppable>
                                                </DragDropContext>
                                            </>
                                        )}
                                    </PanelBody>
                                )
                            )}
                        </>
                    )}
                </PanelBody>
            </InspectorControls>

            <div className="salaries-careers-editor__preview">
                <h2>Table Grid</h2>

                <h2 className="salaries-careers-editor__table-name">
                    {selectedTable}
                </h2>

                <p className="salaries-careers-editor__meta">
                    Table title {tableTitle} selected with{' '}
                    {selectedColumns.length} column(s).
                </p>

                {isValidating && <Spinner />}

                {blockNotice && (
                    <EditorNotice
                        title={blockNotice.title}
                        message={blockNotice.message}
                    />
                )}
            </div>
        </div>
    );
};

export default SalariesCareersEdit;
