import { useCallback, useState } from "react";
import SearchBar from "../../../components/SearchBar";
import ResourceFilterModal from "../../../components/ResourceFilterModal";

export default function ResourceSearchControls({ search, filters, filterCount, changeSearch, applyFilters }) {
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <div className="mt-6">
        <SearchBar variant="resources" value={search} onChange={changeSearch}
          onFilterClick={() => setModalOpen(true)} filterCount={filterCount} placeholder="Axtar" />
      </div>
      {modalOpen && <ResourceFilterModal initialFilters={filters} onApply={applyFilters} onClose={closeModal} />}
    </>
  );
}
