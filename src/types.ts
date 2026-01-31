export interface HierarchyRow {
  id: string
  label: string
  value: number
  children?: HierarchyRow[]
}

export interface FlatRowWithOriginal extends HierarchyRow {
  originalValue: number
  depth: number
  parentId?: string
  isLeaf: boolean
}
