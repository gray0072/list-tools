import TwoListPage from '../components/TwoListPage'
import { intersectionOp } from '../operations/intersection'

export default function IntersectionPage() {
  return (
    <TwoListPage
      title="Intersection"
      description="Keep only values that appear in both lists."
      compute={intersectionOp}
    />
  )
}
