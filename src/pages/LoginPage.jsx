import { Helmet } from "react-helmet";

const LoginPage = () => {
    return (
        <>
            <Helmet>
                <title>Login Page</title>
            </Helmet>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="login">
                    <h2 className="text-center">Login</h2>
                    <form>
                        <div className="each-input">
                            <label className="mr-4">Username</label>
                            <br/>
                            <input type="text" className="input"/>
                        </div>
                        <div className="each-input">
                            <label className="mr-4">Password</label>
                            <br/>
                            <input type="password" className="input"/>
                        </div>
                        <button type="submit" className="button">Login</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
