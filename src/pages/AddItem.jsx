import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import api from "../api/axios.js";

const AddItem = () => {
    const navigate = useNavigate();

    // state to store form data
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        quantity: 1,
        location: ""
    });

    // handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // send data to backend
            await api.post("/items", formData);
            alert("Item added successfully.");
            navigate("/manage-items");
        } catch (error) {
            console.log("Error when adding item", error);
            alert("Error when adding item");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="login">
                <h2>Add Item</h2>
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
                            Add Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItem;
