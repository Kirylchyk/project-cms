import React, { useState, useEffect } from 'react';
import styles from './ContentList.module.css';

function ContentList() {
    const [contentItems, setContentItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [newName, setNewName] = useState('');

    useEffect(() => {
        fetch('http://localhost:5001/api/cms_cards')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setContentItems(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    }

    const saveNameChange = async (id) => {
        const response = await fetch(`http://localhost:5001/api/cms_cards/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newName })
        });

        if (response.ok) {
            const updatedItem = await response.json();
            setContentItems(prevItems => prevItems.map(item => item._id === id ? updatedItem : item));
            setEditingId(null);
            setNewName('');
        } else {
            setError(new Error('Failed to save changes'));
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className={styles.container}>
            <h2>Content List</h2>
            <ul className={styles.list}>
                {contentItems.map(item => (
                    <li key={item._id} className={styles.listItem}>
                        {(() => {
                            if (editingId === item._id) {
                                return (
                                    <>
                                        <input value={newName} onChange={handleNameChange} />
                                        <button className={styles.button} onClick={() => saveNameChange(item._id)}>Save</button>
                                    </>
                                );
                            } else {
                                return (
                                    <>
                                        <h3 className={styles.title} onClick={() => {
                                            setEditingId(item._id);
                                            setNewName(item.name);
                                        }}>
                                            {item.name}
                                        </h3>
                                        <p>{item.description}</p>
                                    </>
                                );
                            }
                        })()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ContentList;

