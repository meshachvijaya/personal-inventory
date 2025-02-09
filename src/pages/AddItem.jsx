import { Link } from "react-router-dom";

const AddItem = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="login">
                <h2>Add Item</h2>
                <form className="flex flex-col gap-4">
                    <input type="text" className="input" placeholder="Book of Success"/>
                    <textarea rows="3" className="input" placeholder="A book for remind myself"/>
                    <div className="flex flex-row gap-2">
                        <input type="number" className="input" placeholder="1"
                               aria-describedby="helper-text-explanation" required/>
                        <input type="text" className="input" placeholder="Bedroom"/>
                    </div>
                    <div className="flex flex-row justify-between">
                        <Link to="/">Go To Manage Items</Link>
                        <button type="submit" className="button">Add Item</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItem;
