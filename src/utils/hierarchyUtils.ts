import type { HierarchyRow } from '../types'

export interface FlatRow {
  id: string
  label: string
  value: number
  originalValue: number
  depth: number
  parentId?: string
  isLeaf: boolean
}

function getDeepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

export function flattenWithOriginals(
  rows: HierarchyRow[],
  originals: Map<string, number>
): FlatRow[] {
  const result: FlatRow[] = []
  function traverse(r: HierarchyRow[], depth: number, parentId?: string) {
    for (const row of r) {
      const isLeaf = !row.children || row.children.length === 0
      result.push({
        id: row.id,
        label: row.label,
        value: row.value,
        originalValue: originals.get(row.id) ?? row.value,
        depth,
        parentId,
        isLeaf,
      })
      if (row.children?.length) {
        traverse(row.children, depth + 1, row.id)
      }
    }
  }
  traverse(rows, 0)
  return result
}

export function buildOriginalsMap(rows: HierarchyRow[]): Map<string, number> {
  const map = new Map<string, number>()
  function traverse(r: HierarchyRow[]) {
    for (const row of r) {
      map.set(row.id, row.value)
      if (row.children?.length) traverse(row.children)
    }
  }
  traverse(rows)
  return map
}

export function calculateVariance(current: number, original: number): number {
  if (original === 0) return 0
  return Number((((current - original) / original) * 100).toFixed(2))
}

export function roundToTwoDecimals(value: number): number {
  return Math.round(value * 100) / 100
}

export function applyAllocationPercent(
  rows: HierarchyRow[],
  targetId: string,
  percent: number
): HierarchyRow[] {
  const data = getDeepClone(rows)

  function updateValue(nodes: HierarchyRow[]): boolean {
    for (const node of nodes) {
      if (node.id === targetId) {
        node.value = roundToTwoDecimals(
          node.value * (1 + percent / 100)
        )
        return true
      }
      if (node.children && updateValue(node.children)) {
        node.value = node.children.reduce((s, c) => s + c.value, 0)
        return true
      }
    }
    return false
  }

  updateValue(data)
  propagateParentTotals(data)
  return data
}

export function applyAllocationValue(
  rows: HierarchyRow[],
  targetId: string,
  newValue: number
): HierarchyRow[] {
  const data = getDeepClone(rows)
  const rounded = roundToTwoDecimals(newValue)

  function updateNode(nodes: HierarchyRow[]): HierarchyRow | null {
    for (const node of nodes) {
      if (node.id === targetId) return node
      if (node.children) {
        const found = updateNode(node.children)
        if (found) return found
      }
    }
    return null
  }

  const target = updateNode(data)
  if (!target) return data

  const isLeaf = !target.children || target.children.length === 0

  if (isLeaf) {
    target.value = rounded
    propagateParentTotals(data)
  } else {
    const children = target.children!
    const totalBefore = children.reduce((s, c) => s + c.value, 0)
    if (totalBefore === 0) {
      const perChild = rounded / children.length
      children.forEach((c) => (c.value = roundToTwoDecimals(perChild)))
    } else {
      children.forEach((c) => {
        const ratio = c.value / totalBefore
        c.value = roundToTwoDecimals(rounded * ratio)
      })
    }
    target.value = rounded
    propagateParentTotals(data)
  }

  return data
}

function propagateParentTotals(rows: HierarchyRow[]) {
  function updateParents(nodes: HierarchyRow[]) {
    for (const node of nodes) {
      if (node.children && node.children.length > 0) {
        updateParents(node.children)
        node.value = roundToTwoDecimals(
          node.children.reduce((s, c) => s + c.value, 0)
        )
      }
    }
  }
  updateParents(rows)
}

export function getGrandTotal(rows: HierarchyRow[]): number {
  return rows.reduce((sum, r) => sum + r.value, 0)
}

export function flattenForDisplay(
  rows: HierarchyRow[],
  originals: Map<string, number>
): FlatRow[] {
  return flattenWithOriginals(rows, originals)
}
