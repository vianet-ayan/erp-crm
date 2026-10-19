// src/plugins/testplugin.tsx
import React, { useState } from 'react';

export default {
    name: "TestPlugin",
    
    install() {
        console.log("TestPlugin installed!");
    },

    execute() {
        console.log("TestPlugin executed!");
    },

    terminate() {
        console.log("TestPlugin terminated!");
    },

    // UI Component rendered when the plugin is active
    UIComponent: () => {
        const [count, setCount] = useState(0);

        return (
            <div className="p-4 border border-blue-400 bg-blue-50 rounded-lg mt-4">
                <h3 className="font-bold text-blue-700">🔌 Hello from TestPlugin UI!</h3>
                <p className="text-sm text-gray-600 mb-2">This UI was brought by the plugin module.</p>
                <button 
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    onClick={() => setCount(count + 1)}
                >
                    Plugin Button Clicked: {count} times
                </button>
            </div>
        );
    }
};