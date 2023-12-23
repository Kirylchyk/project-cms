import React, { useState, useEffect } from 'react';
import styles from './ContentList.module.css';
import { fetchData, updateData } from '../../utils/Api';

function ContentList() {
    const [contentItems, setContentItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [newName, setNewName] = useState('');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = contentItems.slice(indexOfFirstItem, indexOfLastItem);


    useEffect(() => {
        fetchData()
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
        updateData(id, newName)
            .then(updatedItem => {
                setContentItems(prevItems => prevItems.map(item => item._id === id ? updatedItem : item));
                setEditingId(null);
                setNewName('');
            })
            .catch(error => {
                setError(error);
            });
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className={styles.container}>
            <h2>Content List</h2>
            <ul className={styles.list}>
                {currentItems.map(item => (
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
                                        <img src={item.imageUrl} alt={item.name} className={styles.image} />
                                    </>
                                );
                            }
                        })()}
                    </li>
                ))}
            </ul>
            <div className={styles.pagination}>
                {currentPage > 1 && (
                    <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                )}
                {contentItems.length > indexOfLastItem && (
                    <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                )}
            </div>

        </div>
    );
}

export default ContentList;

