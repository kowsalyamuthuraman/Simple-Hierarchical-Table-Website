import type { FlatRow } from '../utils/hierarchyUtils'
import { calculateVariance } from '../utils/hierarchyUtils'

interface TableRowProps {
  row: FlatRow
  inputValue: string
  onInputChange: (value: string) => void
  onAllocationPercent: () => void
  onAllocationValue: () => void
}

export function TableRow({
  row,
  inputValue,
  onInputChange,
  onAllocationPercent,
  onAllocationValue,
}: TableRowProps) {
  const variance = calculateVariance(row.value, row.originalValue)
  const labelPrefix = row.depth > 0 ? '— '.repeat(row.depth) : ''

  return (
    <tr className="table-row">
      <td className="label-cell">
        <span className="label-text">{labelPrefix}{row.label}</span>
      </td>
      <td className="value-cell">{row.value.toFixed(2)}</td>
      <td className="input-cell">
        <input
          type="text"
          className="value-input"
          placeholder="Enter value"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
        />
      </td>
      <td className="button-cell">
        <button
          type="button"
          className="btn btn-allocation"
          onClick={onAllocationPercent}
        >
          Allocation %
        </button>
      </td>
      <td className="button-cell">
        <button
          type="button"
          className="btn btn-allocation"
          onClick={onAllocationValue}
        >
          Allocation Val
        </button>
      </td>
      <td className="variance-cell">{variance}%</td>
    </tr>
  )
}
