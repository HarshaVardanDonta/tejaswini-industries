import { createContext, useContext } from 'react'

import { commissionRows } from '../data/projects'

const CommissionRowsContext = createContext(commissionRows)

export function ProjectsPageProvider({
  commissionRows: rows,
  children,
}: {
  commissionRows: typeof commissionRows
  children: React.ReactNode
}) {
  return <CommissionRowsContext.Provider value={rows}>{children}</CommissionRowsContext.Provider>
}

export function useCommissionRows() {
  return useContext(CommissionRowsContext)
}
