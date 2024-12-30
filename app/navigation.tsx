// app/navigation.js
export default function Navigation() {
    return (
        <nav className="main-container bg-white shadow fixed bottom-0 left-0 right-0 flex justify-around items-center p-2 rounded-t-lg">
            <div className="nav-wrapper">
                <a href="#" className="flex flex-col items-center text-blue-600">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 10l1.664-1.668A2 2 0 016.672 8h10.656a2 2 0 011.408.668L21 10m0 0V19a2 2 0 01-2 2H5a2 2 0 01-2-2V10z"
                        />
                    </svg>
                    <span className="text-xs">Home</span>
                </a>
                <a href="#" className="flex flex-col items-center text-gray-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 9V7a4 4 0 10-8 0v2m10 0v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9h12z"
                        />
                    </svg>
                    <span className="text-xs">Profile</span>
                </a>
                <a href="#" className="flex flex-col items-center text-gray-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 7V6a4 4 0 118 0v1m-3 7h-2m-4 0a4 4 0 008 0v-2a2 2 0 00-2-2h-4a2 2 0 00-2 2v2z"
                        />
                    </svg>
                    <span className="text-xs">Settings</span>
                </a>
            </div>
        </nav>
    );
}
