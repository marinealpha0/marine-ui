// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// import { AuthContext } from './AuthContext';
// import { getAccessToken } from './useAuthStore';

// const SocketContext = createContext(null);

// export const useSocket = () => useContext(SocketContext);

// export const SocketProvider = ({ children }) => {
//     const { isAuthenticated } = useContext(AuthContext);
//     const [socket, setSocket] = useState(null);
//     const [isConnected, setIsConnected] = useState(false);

//     useEffect(() => {
//         if (isAuthenticated) {
//             // Initialize socket connection
//             const token = getAccessToken();
//             if (!token) console.warn('SocketContext: Warning - Token is null/undefined');

//             const socketUrl = process.env.REACT_APP_UDYOG_VRIKSH_API || 'http://localhost:4000';

//             const newSocket = io(socketUrl, {
//                 withCredentials: true,
//                 transports: ['websocket', 'polling'], // Fallback sequence
//                 auth: { token: getAccessToken() }
//             });

//             newSocket.on('connect', () => {
//                 console.log('Socket connected:', newSocket.id);
//                 setIsConnected(true);
//             });

//             newSocket.on('disconnect', () => {
//                 console.log('Socket disconnected');
//                 setIsConnected(false);
//             });

//             newSocket.on('connect_error', (err) => {
//                 console.error('Socket connection error:', err);
//             });

//             setSocket(newSocket);

//             return () => {
//                 newSocket.close();
//             };
//         } else {
//             if (socket) {
//                 socket.close();
//                 setSocket(null);
//                 setIsConnected(false);
//             }
//         }
//     }, [isAuthenticated]);

//     return (
//         <SocketContext.Provider value={{ socket, isConnected }}>
//             {children}
//         </SocketContext.Provider>
//     );
// };
