import TwoListPage from '../components/TwoListPage'
import { differenceOp } from '../operations/difference'

export default function DifferencePage() {
  return (
    <TwoListPage
      title="Difference (A − B)"
      description="Remove from List A all values that appear in List B. The removed values are shown below."
      compute={differenceOp}
    />
  )
}
