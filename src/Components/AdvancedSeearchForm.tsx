import React, {useState} from "react";

interface AdvancedSearchFormProps {
    onSearch: (title: string, artistDisplayName: string, accessionYear: string) => void;
}


const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = ({ onSearch }) => {
    const [title, setTitle] = useState<string>("");
    const [artistDisplayName, setArtistDisplayName] = useState<string>("");
    const [accessionYear, setAccessionYear] = useState<string>("");

    const handleSearch = ()=> {
        onSearch(title, artistDisplayName, accessionYear);

    };

    return (
        <div className="advanced-search-container">
            <h1 className="advanced-search-title">Advanced Search</h1>
            <div className="search-bar advanced-search-bar">
                <input 
                type="text"
                placeholder="Title"
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                />
                <input 
                type="text"
                placeholder="Artist Name"
                value={artistDisplayName}
                onChange={(e) => setArtistDisplayName(e.target.value)}
                />
                <input
                type="text"
                placeholder="Accession Year"
                value={accessionYear}
                onChange={(e) => setAccessionYear(e.target.value)}
                />
                <button className="search-button" onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
};

export default AdvancedSearchForm;