import { ResourceSearch } from "@/components/resource-search"
import { ResourceFilters } from "@/components/resource-filters"

export default function SearchPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <ResourceFilters />
      </div>
      <div className="md:col-span-3">
        <ResourceSearch />
      </div>
    </div>
  )
}