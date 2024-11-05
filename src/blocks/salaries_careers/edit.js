import { useState, useEffect } from '@wordpress/element';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
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

const SalariesCareersEdit = ({ attributes, setAttributes }) => {
    const [tables, setTables] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isLoadingTables, setIsLoadingTables] = useState(true);
    const [isLoadingColumns, setIsLoadingColumns] = useState(false);
    const [error, setError] = useState(null);

    const {
        selectedTable,
        selectedColumns = [],
        tableTitle,
        showTitle,
        pinUnitedStates,
        showSource = true,
        sourceText = '',
        sourceLink = '',
    } = attributes;

    const blockProps = useBlockProps({
        className: 'p-4 bg-white rounded-lg shadow-md',
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
                    setError('No tables found or invalid response format');
                }
            })
            .catch((error) => {
                console.error('Error fetching tables:', error);
                setError(
                    'Failed to fetch tables. Please check the console for more details.'
                );
            })
            .finally(() => {
                setIsLoadingTables(false);
            });
    }, []);

    // Obtener las columnas cuando se selecciona una tabla
    useEffect(() => {
        if (selectedTable) {
            setIsLoadingColumns(true);
            apiFetch({
                path: `/salaries-careers/v1/columns?table=${selectedTable}`,
            })
                .then((response) => {
                    if (Array.isArray(response)) {
                        setColumns(response);

                        // Si hay configuración por defecto para esta tabla, establecerla
                        if (defaultColumnsConfig[selectedTable]) {
                            setAttributes({
                                selectedColumns: defaultColumnsConfig[selectedTable],
                            });
                        } else {
                            setAttributes({ selectedColumns: [] });
                        }
                    } else {
                        setError('Invalid column data received');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching columns:', error);
                    setError(
                        'Failed to fetch columns. Please check the console for more details.'
                    );
                })
                .finally(() => {
                    setIsLoadingColumns(false);
                });
        }
    }, [selectedTable]);

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
                    ) : error ? (
                        <p style={{ color: 'red' }}>{error}</p>
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

            <div className="salaries-careers p-1 border-2 border-purple-600 ">
                
                <h2 className="text-2xl font-bold mb-4 text-purple-600">Table Grid</h2>
               
                <h2 className="text-2xl font-bold mb-4 text-[#5c44b8]">
                    {selectedTable}
                </h2>
                
                <p>
                    Table title {tableTitle} selected with{' '}
                    {selectedColumns.length} column(s).
                </p>
                
            </div>
        </div>
    );
};

export default SalariesCareersEdit;
