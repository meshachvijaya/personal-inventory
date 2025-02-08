import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const ChoosePage = () => {
    return (
        <>
            <Helmet>
                <title>Choose Page</title>
            </Helmet>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="choose">
                    <div className="item-container">
                        <h2 className="h2-choose">Add Item</h2>
                        <p className="mb-4">Add your current item to your keep</p>
                        <Link to="/" className="button">Add</Link>
                    </div>
                    <h3>OR</h3>
                    <div className="item-container">
                        <h2 className="h2-choose">Manage Items</h2>
                        <p className="mb-4">Manage your existing items in keep</p>
                        <Link to="/" className="button">Manage</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChoosePage;
