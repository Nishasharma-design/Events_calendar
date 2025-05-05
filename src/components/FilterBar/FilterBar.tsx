import classes from './FilterBar.module.scss';

type FilterBarProps = {
    labels: string[];
    locations: string[];
    selectedLabel: string | null;
    selectedLocation: string | null;
    onLabelChange: (label: string | null) => void;
    onLocationChange: (location: string | null) => void;
    onClearFilters: () => void;
};

function FilterBar({
    labels,
    locations,
    selectedLabel,
    selectedLocation,
    onLabelChange,
    onLocationChange,
    onClearFilters,
}: FilterBarProps) {
    return (
        <div className={classes.filter_bar}>
            <select value={selectedLabel || ''} onChange={(e) => onLabelChange(e.target.value || null)}>
                <option value="">All Labels</option>
                {labels.map((label) => (
                    <option key={label} value={label}>{label}</option>
                ))}
            </select>

            <select value={selectedLocation || ''} onChange={(e) => onLocationChange(e.target.value || null)}>
                <option value="">All Locations</option>
                {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                ))}
            </select>
            <button onClick={onClearFilters} className={classes.clear_btn}>Clear Filters</button>
        </div>
    )
}
export default FilterBar;