import React from 'react';

const SearchHistory = ({ history, onSelect }) => {
    if (!history || history.length === 0) return null;

    return (
        <div className="search-history" style={{ maxWidth: 1200, margin: '16px auto 0', padding: '0 32px' }}>
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: 4 }}>Recent Searches:</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {history.map((city, idx) => (
                    <span
                        key={idx}
                        onClick={() => onSelect(city)}
                        style={{
                            background: '#fff',
                            padding: '4px 12px',
                            borderRadius: 12,
                            cursor: 'pointer',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            fontSize: '0.9rem'
                        }}
                    >
                        {city}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default SearchHistory;
