import 'animate.css';
import React, { useEffect, useCallback } from 'react';
import ReactDOM from "react-dom/client";
import { motion, AnimatePresence } from 'framer-motion';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Dashboard from './Home/home.jsx';
import AddAccount from './Pop Up Window/Add/addAccount.jsx';

const FadeTransition = ({ children }) => {
  const transition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div variants={transition} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
};

function NavigationWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  const handler = useCallback((route) => {
    navigate(route);
  }, [navigate]);

  useEffect(() => {
    window.electron.onNavigateTo(handler);
    return () => {
      window.electron.off('navigateTo', handler);
    };
  }, [handler]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/dashboard" element={<FadeTransition><Dashboard /></FadeTransition>} />
        <Route path="/add-account" element={<FadeTransition><AddAccount /></FadeTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <ReactNotifications />
      <NavigationWrapper />
    </HashRouter>
  </React.StrictMode>
);