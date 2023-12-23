import { API_ENDPOINT_CMS_CARDS } from './utils';

const fetchData = async () => {
    try {
        const response = await fetch(API_ENDPOINT_CMS_CARDS);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        throw error;
    }
};

const updateData = async (id, newName) => {
    try {
        const response = await fetch(`${API_ENDPOINT_CMS_CARDS}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newName })
        });

        if (!response.ok) {
            throw new Error('Failed to save changes');
        }
        return response.json();
    } catch (error) {
        throw error;
    }
};

export { fetchData, updateData };
