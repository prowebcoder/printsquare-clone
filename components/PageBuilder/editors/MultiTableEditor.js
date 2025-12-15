// components/PageBuilder/editors/MultiTableEditor.js
"use client";

import { useState } from 'react';
import { Trash2, Plus, ChevronUp, ChevronDown, Rows, Columns, Link } from 'lucide-react';

const MultiTableEditor = ({ component, onUpdate }) => {
  const [expandedTables, setExpandedTables] = useState({});
  const [bulkAddRows, setBulkAddRows] = useState({});
  const [bulkAddColumns, setBulkAddColumns] = useState({});

  const toggleTableExpansion = (index) => {
    setExpandedTables(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleTableChange = (tableIndex, field, value) => {
    const newTables = [...(component.content?.tables || [])];
    newTables[tableIndex] = { ...newTables[tableIndex], [field]: value };
    onUpdate(component.id, { tables: newTables });
  };

  const handleHeaderChange = (tableIndex, headerIndex, value) => {
    const newTables = [...(component.content?.tables || [])];
    if (!newTables[tableIndex].headers) {
      newTables[tableIndex].headers = [];
    }
    newTables[tableIndex].headers[headerIndex] = value;
    onUpdate(component.id, { tables: newTables });
  };

  // Handle cell change
  const handleCellChange = (tableIndex, rowIndex, cellIndex, value) => {
    const newTables = [...(component.content?.tables || [])];
    if (!newTables[tableIndex].rows) {
      newTables[tableIndex].rows = [];
    }
    if (!newTables[tableIndex].rows[rowIndex]) {
      // Initialize as object if it's not
      newTables[tableIndex].rows[rowIndex] = { cells: [], url: '' };
    }
    
    // Ensure cells array exists
    if (!newTables[tableIndex].rows[rowIndex].cells) {
      newTables[tableIndex].rows[rowIndex].cells = [];
    }
    
    newTables[tableIndex].rows[rowIndex].cells[cellIndex] = value;
    onUpdate(component.id, { tables: newTables });
  };

  // Handle URL change for a row
  const handleUrlChange = (tableIndex, rowIndex, value) => {
    const newTables = [...(component.content?.tables || [])];
    if (!newTables[tableIndex].rows) {
      newTables[tableIndex].rows = [];
    }
    if (!newTables[tableIndex].rows[rowIndex]) {
      newTables[tableIndex].rows[rowIndex] = { cells: [], url: '' };
    }
    
    // Ensure it's an object with url property
    if (typeof newTables[tableIndex].rows[rowIndex] === 'object') {
      newTables[tableIndex].rows[rowIndex].url = value;
    } else {
      // Convert from array to object
      newTables[tableIndex].rows[rowIndex] = {
        cells: newTables[tableIndex].rows[rowIndex],
        url: value
      };
    }
    
    onUpdate(component.id, { tables: newTables });
  };

  const addTable = () => {
    const newTables = [...(component.content?.tables || []), {
      title: 'New Table',
      headers: ['Header 1', 'Header 2', 'Header 3'],
      rows: [
        { cells: ['Data 1', 'Data 2', 'Data 3'], url: '' },
        { cells: ['Data 4', 'Data 5', 'Data 6'], url: '' }
      ]
    }];
    onUpdate(component.id, { tables: newTables });
  };

  const removeTable = (index) => {
    const newTables = (component.content?.tables || []).filter((_, i) => i !== index);
    onUpdate(component.id, { tables: newTables });
  };

  const addRow = (tableIndex, count = 1) => {
    const newTables = [...(component.content?.tables || [])];
    const headersCount = newTables[tableIndex].headers?.length || 3;
    
    if (!newTables[tableIndex].rows) {
      newTables[tableIndex].rows = [];
    }
    
    for (let i = 0; i < count; i++) {
      const newRow = {
        cells: Array(headersCount).fill('New Data'),
        url: ''
      };
      newTables[tableIndex].rows.push(newRow);
    }
    
    onUpdate(component.id, { tables: newTables });
    setBulkAddRows(prev => ({ ...prev, [tableIndex]: '' }));
  };

  const removeRow = (tableIndex, rowIndex) => {
    const newTables = [...(component.content?.tables || [])];
    newTables[tableIndex].rows = newTables[tableIndex].rows?.filter((_, i) => i !== rowIndex) || [];
    onUpdate(component.id, { tables: newTables });
  };

  const addColumn = (tableIndex, count = 1) => {
    const newTables = [...(component.content?.tables || [])];
    
    // Add headers
    if (!newTables[tableIndex].headers) {
      newTables[tableIndex].headers = [];
    }
    
    const currentHeadersCount = newTables[tableIndex].headers.length;
    for (let i = 0; i < count; i++) {
      newTables[tableIndex].headers.push(`Header ${currentHeadersCount + i + 1}`);
    }
    
    // Add columns to each row
    if (newTables[tableIndex].rows) {
      newTables[tableIndex].rows = newTables[tableIndex].rows.map(row => {
        // Handle both old array format and new object format
        if (Array.isArray(row)) {
          return {
            cells: [...row, ...Array(count).fill('New Data')],
            url: ''
          };
        } else {
          return {
            ...row,
            cells: [...(row.cells || []), ...Array(count).fill('New Data')]
          };
        }
      });
    } else {
      newTables[tableIndex].rows = [{
        cells: Array(newTables[tableIndex].headers.length).fill('New Data'),
        url: ''
      }];
    }
    
    onUpdate(component.id, { tables: newTables });
    setBulkAddColumns(prev => ({ ...prev, [tableIndex]: '' }));
  };

  const removeColumn = (tableIndex, columnIndex) => {
    const newTables = [...(component.content?.tables || [])];
    
    // Remove header
    if (newTables[tableIndex].headers) {
      newTables[tableIndex].headers = newTables[tableIndex].headers.filter((_, i) => i !== columnIndex);
    }
    
    // Remove column from each row
    if (newTables[tableIndex].rows) {
      newTables[tableIndex].rows = newTables[tableIndex].rows.map(row => {
        if (Array.isArray(row)) {
          return row.filter((_, i) => i !== columnIndex);
        } else {
          return {
            ...row,
            cells: row.cells?.filter((_, i) => i !== columnIndex) || []
          };
        }
      });
    }
    
    onUpdate(component.id, { tables: newTables });
  };

  const handleLayoutChange = (field, value) => {
    onUpdate(component.id, { 
      [field]: value 
    });
  };

  const clearTable = (tableIndex) => {
    const newTables = [...(component.content?.tables || [])];
    newTables[tableIndex].rows = [];
    onUpdate(component.id, { tables: newTables });
  };

  const duplicateRow = (tableIndex, rowIndex) => {
    const newTables = [...(component.content?.tables || [])];
    const rowToDuplicate = newTables[tableIndex].rows[rowIndex];
    
    // Handle both formats
    let duplicatedRow;
    if (Array.isArray(rowToDuplicate)) {
      duplicatedRow = [...rowToDuplicate];
    } else {
      duplicatedRow = {
        cells: [...(rowToDuplicate.cells || [])],
        url: rowToDuplicate.url || ''
      };
    }
    
    // Insert as object
    if (Array.isArray(duplicatedRow)) {
      duplicatedRow = { cells: duplicatedRow, url: '' };
    }
    
    newTables[tableIndex].rows.splice(rowIndex + 1, 0, duplicatedRow);
    onUpdate(component.id, { tables: newTables });
  };

  const moveRow = (tableIndex, fromIndex, toIndex) => {
    const newTables = [...(component.content?.tables || [])];
    const rows = newTables[tableIndex].rows;
    const [movedRow] = rows.splice(fromIndex, 1);
    rows.splice(toIndex, 0, movedRow);
    onUpdate(component.id, { tables: newTables });
  };

  // Get row data with backward compatibility
  const getRowData = (row, cellIndex) => {
    if (Array.isArray(row)) {
      return row[cellIndex] || '';
    } else {
      return row.cells?.[cellIndex] || '';
    }
  };

  // Get row URL with backward compatibility
  const getRowUrl = (row) => {
    if (Array.isArray(row)) {
      return '';
    } else {
      return row.url || '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Layout Settings */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Table Layout Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tables per Row (Desktop)
            </label>
            <select
              value={component.content?.tablesPerRowDesktop || 1}
              onChange={(e) => handleLayoutChange('tablesPerRowDesktop', parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              <option value={1}>1 Table</option>
              <option value={2}>2 Tables</option>
              <option value={3}>3 Tables</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tables per Row (Mobile)
            </label>
            <select
              value={component.content?.tablesPerRowMobile || 1}
              onChange={(e) => handleLayoutChange('tablesPerRowMobile', parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              <option value={1}>1 Table</option>
              <option value={2}>2 Tables</option>
            </select>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Configure how many tables display per row on different screen sizes.
        </p>
      </div>

      {/* Tables Management */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-gray-700">Tables</label>
          <button
            type="button"
            onClick={addTable}
            className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus size={16} />
            Add Table
          </button>
        </div>

        {component.content?.tables?.map((table, tableIndex) => (
          <div key={tableIndex} className="border border-gray-300 rounded-lg mb-4 bg-white overflow-hidden">
            {/* Table Header */}
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-300 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleTableExpansion(tableIndex)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  {expandedTables[tableIndex] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <div>
                  <h4 className="font-medium text-gray-900">Table {tableIndex + 1}</h4>
                  <div className="text-xs text-gray-500">
                    {table.headers?.length || 0} columns × {table.rows?.length || 0} rows
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => clearTable(tableIndex)}
                  className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                  title="Clear all rows"
                >
                  Clear Rows
                </button>
                <button
                  type="button"
                  onClick={() => removeTable(tableIndex)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete table"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Table Content - Collapsible */}
            {expandedTables[tableIndex] !== false && (
              <div className="p-4 space-y-6">
                {/* Table Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Table Title</label>
                  <input
                    type="text"
                    value={table.title || ''}
                    onChange={(e) => handleTableChange(tableIndex, 'title', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Table title"
                  />
                </div>

                {/* Bulk Actions */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Bulk Add Rows */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Rows size={16} />
                      Add Multiple Rows
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={bulkAddRows[tableIndex] || ''}
                        onChange={(e) => setBulkAddRows(prev => ({ ...prev, [tableIndex]: e.target.value }))}
                        className="flex-1 p-2 border border-gray-300 rounded text-sm"
                        placeholder="Number of rows"
                      />
                      <button
                        type="button"
                        onClick={() => addRow(tableIndex, parseInt(bulkAddRows[tableIndex]) || 1)}
                        className="px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Add multiple rows at once (max 50)
                    </p>
                  </div>

                  {/* Bulk Add Columns */}
                  <div className="bg-green-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Columns size={16} />
                      Add Multiple Columns
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={bulkAddColumns[tableIndex] || ''}
                        onChange={(e) => setBulkAddColumns(prev => ({ ...prev, [tableIndex]: e.target.value }))}
                        className="flex-1 p-2 border border-gray-300 rounded text-sm"
                        placeholder="Number of columns"
                      />
                      <button
                        type="button"
                        onClick={() => addColumn(tableIndex, parseInt(bulkAddColumns[tableIndex]) || 1)}
                        className="px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Add multiple columns at once (max 20)
                    </p>
                  </div>
                </div>

                {/* Headers */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Headers</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => addColumn(tableIndex)}
                        className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        <Plus size={14} />
                        Add Column
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <div className="grid gap-2 min-w-max" style={{ gridTemplateColumns: `repeat(${table.headers?.length || 3}, minmax(120px, 1fr)) auto` }}>
                      {table.headers?.map((header, headerIndex) => (
                        <div key={headerIndex} className="flex gap-1">
                          <input
                            type="text"
                            value={header || ''}
                            onChange={(e) => handleHeaderChange(tableIndex, headerIndex, e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded text-sm"
                            placeholder={`Header ${headerIndex + 1}`}
                          />
                          {table.headers.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeColumn(tableIndex, headerIndex)}
                              className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors flex-shrink-0"
                              title="Remove column"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Rows with URL Support */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Rows ({table.rows?.length || 0})
                      <span className="text-xs text-gray-500 ml-2">
                        Add URL to make row clickable
                      </span>
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => addRow(tableIndex)}
                        className="flex items-center gap-1 px-2 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                      >
                        <Plus size={14} />
                        Add Row
                      </button>
                    </div>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
                    <div className="space-y-3 p-2">
                      {table.rows?.map((row, rowIndex) => (
                        <div key={rowIndex} className="p-3 bg-white border border-gray-200 rounded-lg">
                          <div className="flex items-start gap-4">
                            {/* Row Controls */}
                            <div className="flex flex-col gap-2 flex-shrink-0">
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-500 w-6 text-center">{rowIndex + 1}</span>
                                <button
                                  type="button"
                                  onClick={() => duplicateRow(tableIndex, rowIndex)}
                                  className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
                                  title="Duplicate row"
                                >
                                  Copy
                                </button>
                              </div>
                              <div className="flex flex-col gap-1">
                                {rowIndex > 0 && (
                                  <button
                                    type="button"
                                    onClick={() => moveRow(tableIndex, rowIndex, rowIndex - 1)}
                                    className="px-2 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600 transition-colors"
                                    title="Move up"
                                  >
                                    ↑
                                  </button>
                                )}
                                {rowIndex < table.rows.length - 1 && (
                                  <button
                                    type="button"
                                    onClick={() => moveRow(tableIndex, rowIndex, rowIndex + 1)}
                                    className="px-2 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600 transition-colors"
                                    title="Move down"
                                  >
                                    ↓
                                  </button>
                                )}
                              </div>
                            </div>
                            
                            {/* Cells */}
                            <div className="flex-1">
                              <div className="mb-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <Link size={14} className="text-blue-600" />
                                  <span className="text-xs font-medium text-gray-700">Row Link (Optional)</span>
                                </div>
                                <input
                                  type="text"
                                  value={getRowUrl(row)}
                                  onChange={(e) => handleUrlChange(tableIndex, rowIndex, e.target.value)}
                                  className="w-full p-2 border border-blue-300 rounded text-sm"
                                  placeholder="https://example.com (Leave empty for no link)"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                  Add URL to make entire row clickable
                                </p>
                              </div>
                              
                              <div className="overflow-x-auto">
                                <div 
                                  className="grid gap-2 min-w-max"
                                  style={{ gridTemplateColumns: `repeat(${table.headers?.length || 3}, minmax(120px, 1fr))` }}
                                >
                                  {Array.from({ length: table.headers?.length || 3 }).map((_, cellIndex) => (
                                    <div key={cellIndex} className="flex flex-col">
                                      <span className="text-xs text-gray-500 mb-1">
                                        {table.headers?.[cellIndex] || `Col ${cellIndex + 1}`}
                                      </span>
                                      <input
                                        type="text"
                                        value={getRowData(row, cellIndex)}
                                        onChange={(e) => handleCellChange(tableIndex, rowIndex, cellIndex, e.target.value)}
                                        className="p-2 border border-gray-300 rounded text-sm min-w-0"
                                        placeholder={`Cell ${cellIndex + 1}`}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            {/* Remove Row Button */}
                            {table.rows.length > 1 && (
                              <div className="flex-shrink-0">
                                <button
                                  type="button"
                                  onClick={() => removeRow(tableIndex, rowIndex)}
                                  className="px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                                  title="Remove row"
                                >
                                  ×
                                </button>
                              </div>
                            )}
                          </div>
                          
                          {/* URL Preview */}
                          {getRowUrl(row) && (
                            <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
                              <span className="font-medium text-blue-700">Link Preview:</span>
                              <a 
                                href={getRowUrl(row)} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="ml-2 text-blue-600 hover:underline truncate block"
                              >
                                {getRowUrl(row)}
                              </a>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {(!table.rows || table.rows.length === 0) && (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500 mb-2">No rows added yet</p>
                    <button
                      type="button"
                      onClick={() => addRow(tableIndex)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      Add First Row
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {(!component.content?.tables || component.content.tables.length === 0) && (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 mb-3">No tables added yet</p>
            <button
              type="button"
              onClick={addTable}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Your First Table
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiTableEditor;