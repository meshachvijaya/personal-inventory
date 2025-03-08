import {useEffect, useState} from "react";

// eslint-disable-next-line react/prop-types
const ItemForm = ({ onSubmit, initialData, onCancel}) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        quantity: 1,
        location: ""
    });

    // if initial data is provide (for edit), populate the form

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="login">
                <h2>{initialData ? "Edit Item" : "Add Item"}</h2>
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
                        <button type="button" onClick={onCancel} className="button">Cancel</button>
                        <button type="submit" className="button">{initialData ? "Save Changes" : "Add Item"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ItemForm;
