import React, { useState, useRef, useEffect } from 'react';
import AuthForms from './components/auth';
import { HomePage } from './components/HomePage';




// --- Main App Components ---

const LoginScreen = ({ onLogin }) => {
    // const [username, setUsername] = useState('');
    // const handleLogin = (e) => {
    //     e.preventDefault();
    //     if (username.trim()) onLogin({ username: username.trim() });
    // };

    // return (
    //     <div className="flex items-center justify-center h-screen bg-gray-900">
    //         <div className="text-center p-8 bg-gray-800 rounded-lg shadow-xl">
    //             <h1 className="text-5xl font-bold text-cyan-400 mb-4">Melody Music</h1>
    //             <p className="text-gray-400 mb-8">Your Personal Music Recommendation System</p>
    //             <form onSubmit={handleLogin}>
    //                 <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Login Name" className="w-full bg-gray-700 p-3 rounded-md mb-4 text-center text-white focus:outline-none focus:ring-2 focus:ring-cyan-400" />
    //                 <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold py-3 px-8 rounded-full transition-colors">Login</button>
    //             </form>
    //         </div>
    //     </div>
    // );
    return (<div className="flex items-center justify-center h-screen bg-gray-900">

     <AuthForms/>
     </div>)
};


export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        function handleLoggedInUser(){
            const loggedInUser = sessionStorage.getItem('melody-user');
            if (loggedInUser) setUser(JSON.parse(loggedInUser));

        }
        handleLoggedInUser()
        window.addEventListener("storage",handleLoggedInUser)
    }, []);

    const handleLogin = (newUser) => {
        sessionStorage.setItem('melody-user', JSON.stringify(newUser));
        setUser(newUser);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('melody-user');
        setUser(null);
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen font-sans">
            {!user ? <LoginScreen onLogin={handleLogin} /> : <HomePage user={user} onLogout={handleLogout} />}
        </div>
    );
}
