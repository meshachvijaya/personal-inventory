import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../api/axios.js";

const ManageItems = () => {
    const [items, setItems] = useState([]); // store item
    const [selectedIds, setSelectedIds] = useState([]); // select item with checkbox

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
            console.log("Error when deleteing items...", error);
        }
    }

    // handle single delete
    const handleDelete = async (id) => {
        try {
            await api.delete(`/items/${id}`); // delete single item
            fetchItems();
        } catch (error) {
            console.log("Error when deleteing selected items...", error);
        }
    }

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
                            <th className="p-3"><input type="checkbox" checked={selectedIds.length === items.length}
                                                       onChange={(e) => {
                                                           if (e.target.checked) {
                                                               setSelectedIds(items.map((item) => item.id));
                                                           } else {
                                                               setSelectedIds([])
                                                           }
                                                       }}/>
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
                                <td>
                                    <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => handleCheckboxChange(item.id)} />
                                </td>
                                <td className="p-3">{item.name}</td>
                                <td className="p-3">{item.description}</td>
                                <td className="p-3">{item.quantity}</td>
                                <td className="p-3">{item.location}</td>
                                <td className="p-3">
                                    <Link to={`/edit-items/${item.id}`} className="text-blue-600 hover:underline mr-2">
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline mr-2">
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
        </div>
    );
};

export default ManageItems;
