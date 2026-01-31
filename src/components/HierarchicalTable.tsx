import { useState, useCallback, useMemo } from 'react'
import type { HierarchyRow } from '../types'
import {
  applyAllocationPercent,
  applyAllocationValue,
  buildOriginalsMap,
  flattenForDisplay,
  getGrandTotal,
  roundToTwoDecimals,
} from '../utils/hierarchyUtils'
import { TableRow } from './TableRow'

interface HierarchicalTableProps {
  initialRows: HierarchyRow[]
  searchTerm?: string
}

export function HierarchicalTable({
  initialRows,
  searchTerm = '',
}: HierarchicalTableProps) {
  const [rows, setRows] = useState<HierarchyRow[]>(() =>
    JSON.parse(JSON.stringify(initialRows))
  )
  const [inputValues, setInputValues] = useState<Record<string, string>>({})

  const originals = useMemo(
    () => buildOriginalsMap(initialRows),
    [initialRows]
  )

  const flatRows = useMemo(() => {
    const all = flattenForDisplay(rows, originals)
    if (!searchTerm.trim()) return all
    const term = searchTerm.trim().toLowerCase()
    return all.filter((r) => r.label.toLowerCase().includes(term))
  }, [rows, originals, searchTerm])

  const grandTotal = useMemo(() => getGrandTotal(rows), [rows])
  const grandTotalOriginal = useMemo(
    () => initialRows.reduce((s, r) => s + r.value, 0),
    [initialRows]
  )

  const handleInputChange = useCallback((rowId: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [rowId]: value }))
  }, [])

  const handleAllocationPercent = useCallback(
    (rowId: string) => {
      const raw = inputValues[rowId]?.trim()
      if (!raw) return
      const num = parseFloat(raw.replace('%', ''))
      if (Number.isNaN(num)) return
      setRows((prev) => applyAllocationPercent(prev, rowId, num))
      setInputValues((prev) => ({ ...prev, [rowId]: '' }))
    },
    [inputValues]
  )

  const handleAllocationValue = useCallback(
    (rowId: string) => {
      const raw = inputValues[rowId]?.trim()
      if (!raw) return
      const num = parseFloat(raw)
      if (Number.isNaN(num) || num < 0) return
      setRows((prev) => applyAllocationValue(prev, rowId, num))
      setInputValues((prev) => ({ ...prev, [rowId]: '' }))
    },
    [inputValues]
  )

  const grandVariance =
    grandTotalOriginal === 0
      ? 0
      : roundToTwoDecimals(
          ((grandTotal - grandTotalOriginal) / grandTotalOriginal) * 100
        )

  return (
    <div className="table-container">
      <table className="hierarchical-table">
        <thead>
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th>Input</th>
            <th>Allocation %</th>
            <th>Allocation Val</th>
            <th>Variance %</th>
          </tr>
        </thead>
        <tbody>
          {flatRows.map((row) => (
            <TableRow
              key={row.id}
              row={row}
              inputValue={inputValues[row.id] ?? ''}
              onInputChange={(v) => handleInputChange(row.id, v)}
              onAllocationPercent={() => handleAllocationPercent(row.id)}
              onAllocationValue={() => handleAllocationValue(row.id)}
            />
          ))}
          <tr className="grand-total-row">
            <td className="label-cell">Grand Total</td>
            <td className="value-cell">{grandTotal.toFixed(2)}</td>
            <td className="input-cell" />
            <td className="button-cell" />
            <td className="button-cell" />
            <td className="variance-cell">{grandVariance}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
