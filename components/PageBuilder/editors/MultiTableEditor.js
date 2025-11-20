// components/PageBuilder/editors/MultiTableEditor.js
"use client";

import { useState } from 'react';
import { Trash2, Plus, ChevronUp, ChevronDown } from 'lucide-react';

const MultiTableEditor = ({ component, onUpdate }) => {
  const [expandedTables, setExpandedTables] = useState({});

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

  const handleRowChange = (tableIndex, rowIndex, cellIndex, value) => {
    const newTables = [...(component.content?.tables || [])];
    if (!newTables[tableIndex].rows) {
      newTables[tableIndex].rows = [];
    }
    if (!newTables[tableIndex].rows[rowIndex]) {
      newTables[tableIndex].rows[rowIndex] = [];
    }
    newTables[tableIndex].rows[rowIndex][cellIndex] = value;
    onUpdate(component.id, { tables: newTables });
  };

  const addTable = () => {
    const newTables = [...(component.content?.tables || []), {
      title: 'New Table',
      headers: ['Header 1', 'Header 2', 'Header 3'],
      rows: [
        ['Data 1', 'Data 2', 'Data 3'],
        ['Data 4', 'Data 5', 'Data 6']
      ]
    }];
    onUpdate(component.id, { tables: newTables });
  };

  const removeTable = (index) => {
    const newTables = (component.content?.tables || []).filter((_, i) => i !== index);
    onUpdate(component.id, { tables: newTables });
  };

  const addRow = (tableIndex) => {
    const newTables = [...(component.content?.tables || [])];
    const headersCount = newTables[tableIndex].headers?.length || 3;
    const newRow = Array(headersCount).fill('New Data');
    
    if (!newTables[tableIndex].rows) {
      newTables[tableIndex].rows = [];
    }
    newTables[tableIndex].rows.push(newRow);
    onUpdate(component.id, { tables: newTables });
  };

  const removeRow = (tableIndex, rowIndex) => {
    const newTables = [...(component.content?.tables || [])];
    newTables[tableIndex].rows = newTables[tableIndex].rows?.filter((_, i) => i !== rowIndex) || [];
    onUpdate(component.id, { tables: newTables });
  };

  const addColumn = (tableIndex) => {
    const newTables = [...(component.content?.tables || [])];
    
    // Add header
    if (!newTables[tableIndex].headers) {
      newTables[tableIndex].headers = [];
    }
    newTables[tableIndex].headers.push(`Header ${newTables[tableIndex].headers.length + 1}`);
    
    // Add column to each row
    if (newTables[tableIndex].rows) {
      newTables[tableIndex].rows = newTables[tableIndex].rows.map(row => 
        [...row, 'New Data']
      );
    } else {
      newTables[tableIndex].rows = [Array(newTables[tableIndex].headers.length).fill('New Data')];
    }
    
    onUpdate(component.id, { tables: newTables });
  };

  const removeColumn = (tableIndex, columnIndex) => {
    const newTables = [...(component.content?.tables || [])];
    
    // Remove header
    if (newTables[tableIndex].headers) {
      newTables[tableIndex].headers = newTables[tableIndex].headers.filter((_, i) => i !== columnIndex);
    }
    
    // Remove column from each row
    if (newTables[tableIndex].rows) {
      newTables[tableIndex].rows = newTables[tableIndex].rows.map(row => 
        row.filter((_, i) => i !== columnIndex)
      );
    }
    
    onUpdate(component.id, { tables: newTables });
  };

  const handleLayoutChange = (field, value) => {
    onUpdate(component.id, { 
      [field]: value 
    });
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
                <h4 className="font-medium text-gray-900">Table {tableIndex + 1}</h4>
              </div>
              <button
                type="button"
                onClick={() => removeTable(tableIndex)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete table"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* Table Content - Collapsible */}
            {expandedTables[tableIndex] !== false && (
              <div className="p-4 space-y-4">
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

                {/* Headers */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Headers</label>
                    <button
                      type="button"
                      onClick={() => addColumn(tableIndex)}
                      className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      <Plus size={14} />
                      Add Column
                    </button>
                  </div>
                  <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${table.headers?.length || 3}, 1fr) auto` }}>
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
                            className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                            title="Remove column"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rows */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Rows</label>
                    <button
                      type="button"
                      onClick={() => addRow(tableIndex)}
                      className="flex items-center gap-1 px-2 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                    >
                      <Plus size={14} />
                      Add Row
                    </button>
                  </div>
                  <div className="space-y-2">
                    {table.rows?.map((row, rowIndex) => (
                      <div key={rowIndex} className="flex items-center gap-2">
                        <div 
                          className="grid gap-2 flex-1"
                          style={{ gridTemplateColumns: `repeat(${table.headers?.length || 3}, 1fr)` }}
                        >
                          {row.map((cell, cellIndex) => (
                            <input
                              key={cellIndex}
                              type="text"
                              value={cell || ''}
                              onChange={(e) => handleRowChange(tableIndex, rowIndex, cellIndex, e.target.value)}
                              className="p-2 border border-gray-300 rounded text-sm"
                              placeholder={`Cell ${cellIndex + 1}`}
                            />
                          ))}
                        </div>
                        {table.rows.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeRow(tableIndex, rowIndex)}
                            className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors flex-shrink-0"
                            title="Remove row"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {(!table.rows || table.rows.length === 0) && (
                  <div className="text-center py-4 border-2 border-dashed border-gray-300 rounded-lg">
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