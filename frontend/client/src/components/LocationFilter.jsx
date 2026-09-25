function LocationFilter({ selectedLocation, setSelectedLocation }) {
    const locations = [
        "All Locations",
        "Malmö",
        "Stockholm",
        "Gothenburg",
        "Remote"
    ];

    return (
        <div>
            <label htmlFor="location">Location:</label>

            <select
                id="location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
            >
                {locations.map((loc) => (
                    <option key={loc} value={loc}>
                        {loc}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default LocationFilter;
