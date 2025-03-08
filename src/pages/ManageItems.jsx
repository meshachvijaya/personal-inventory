import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../api/axios.js";
import ItemForm from "../components/ItemForm.jsx";

const ManageItems = () => {
    const [items, setItems] = useState([]); // store item
    const [selectedIds, setSelectedIds] = useState([]); // select item with checkbox
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);


    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await api.get("/items/");
            setItems(response.data);
        } catch (error) {
            console.log("Error when fetching items...", error);
        }
    }

    // handle checkbox
    const handleCheckboxChange = (id) => {
        setSelectedIds((prev) => prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]);
    };

    // handle bulk delete
    const handleBulkDelete = async () => {
        try {
            await api.delete("/items/bulk", {data: {ids: selectedIds}}); // bulk delete
            fetchItems(); // refresh the list
            setSelectedIds([]); // clear selected id
        } catch (error) {
            console.log("Error when deleting items...", error);
        }
    }

    // handle single delete
    const handleDelete = async (id) => {
        try {
            await api.delete(`/items/${id}`); // delete single item
            fetchItems();
        } catch (error) {
            console.log("Error when deleting selected items...", error);
        }
    }

    // Open form editor
    const handleEdit = async (item) => {
        setCurrentItem(item);
        setIsFormOpen(true);
    };

    // Handle form submit both for add or edit
    const handleFormSubmit = async (formData) => {
        try {
            if (currentItem) {
                // update existing item
                await api.put(`/items/${currentItem.id}`, formData);
            } else {
                // add new item
                await api.post("/items", formData);
            }
            fetchItems(); // refresh lsit
            setIsFormOpen(false); // close form popup
            setCurrentItem(null); // reset item field on form
        } catch (error) {
            console.log("Error saving items: ", error);
        }
    };

    // Close form popup
    const handleFormCancel = async () => {
        setIsFormOpen(false);
        setIsFormOpen(null);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-1/5 min-h-screen bg-gray-800 text-white p-6">
                <h2 className="text-xl font-semibold mb-6">Menu</h2>
                <nav className="flex flex-col space-y-4">
                    <Link to="/add-item" className="hover:bg-gray-700 p-2 rounded">Add Item</Link>
                    <Link to="/manage-items" className="hover:bg-gray-700 p-2 rounded">Manage Items</Link>
                </nav>
            </div>

            {/* Content */}
            <div className="w-4/5 p-6">
                <h2 className="text-2xl font-bold mb-4">Manage Items</h2>

                {/* Bulk Delete Button */}
                {selectedIds.length > 0 && (
                    <button onClick={handleBulkDelete}>
                        Delete Selected Items
                    </button>
                )}

                {/* Table */}
                <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-3">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.length === items.length}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedIds(items.map((item) => item.id));
                                        } else {
                                            setSelectedIds([])
                                        }
                                    }}
                                />
                            </th>
                            <th className="p-3">Item Name</th>
                            <th className="p-3">Description</th>
                            <th className="p-3">Quantity</th>
                            <th className="p-3">Location</th>
                            <th className="p-3">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className="border-b">
                                <td className="p-3">
                                    <input type="checkbox"
                                           checked={selectedIds.includes(item.id)}
                                           onChange={() => handleCheckboxChange(item.id)}
                                    />
                                </td>
                                <td className="p-3">{item.name}</td>
                                <td className="p-3">{item.description}</td>
                                <td className="p-3">{item.quantity}</td>
                                <td className="p-3">{item.location}</td>
                                <td className="p-3">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="text-blue-600 hover:underline mr-2">
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-red-600 hover:underline mr-2">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {/* Contoh Data (nanti diganti dengan data dari backend) */}
                        {/*<tr className="border-b">*/}
                        {/*    <td className="p-3"><input type="checkbox"/></td>*/}
                        {/*    <td className="p-3">Book of Success</td>*/}
                        {/*    <td className="p-3">Self-improvement book</td>*/}
                        {/*    <td className="p-3">1</td>*/}
                        {/*    <td className="p-3">Bedroom</td>*/}
                        {/*    <td className="p-3">*/}
                        {/*        <button className="text-blue-600 hover:underline mr-2">Edit</button>*/}
                        {/*        <button className="text-red-600 hover:underline">Delete</button>*/}
                        {/*    </td>*/}
                        {/*</tr>*/}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* form popup */}
            {isFormOpen && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                        <ItemForm
                            onSubmit={handleFormSubmit}
                            initialValues={currentItem}
                            onCancel={handleFormCancel}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageItems;
