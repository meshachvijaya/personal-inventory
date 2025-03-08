import {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import api from "../api/axios.js"

const EditItemPage = () => {
    const { id } = useParams(); // get item id from url
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        quantity: 1,
        location: ""
    });

    // fetch item data when component mount
    useEffect(() => {
        const fetchItem = async () => {
            try {
                console.log(`Fetching item with ID: ${id}`);
                const response = await api.get(`/items/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching item:", error);
                alert("Failed to fetch item. Please try again.");
            }
        };
        fetchItem();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/items/${id}`, formData); // update item
            alert("Updated successfully");
            navigate("/manage-items");
        } catch (error) {
            console.error("Error updating item:", error);
            alert("Failed to update item");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="login">
                <h2>Edit Item</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="name"
                        className="input"
                        placeholder="Item Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <textarea
                        rows="3"
                        name="description"
                        className="input"
                        placeholder="Item Description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                    <div className="flex flex-row gap-2">
                        <input
                            type="number"
                            name="quantity"
                            className="input"
                            placeholder="1"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            min="1"
                            aria-describedby="helper-text-explanation"
                            required
                        />
                        <input
                            type="text"
                            name="location"
                            className="input"
                            placeholder="Bedroom"
                            value={formData.location}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="flex flex-row justify-between">
                        <Link to="/manage-items">
                            Go To Manage Items
                        </Link>
                        <button
                            type="submit"
                            className="button"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditItemPage;
