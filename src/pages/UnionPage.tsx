import TwoListPage from '../components/TwoListPage'
import { unionOp } from '../operations/union'

export default function UnionPage() {
  return (
    <TwoListPage
      title="Union"
      description="Merge two lists into one, keeping only unique values."
      compute={unionOp}
    />
  )
}
