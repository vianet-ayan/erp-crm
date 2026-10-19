// src/pages/aboutUs.tsx
import { useState } from 'react';
import React from 'react';

interface PluginModule {
    name: string;
    install: () => void;
    execute: () => void;
    terminate: () => void;
    UIComponent: React.ComponentType;
}

export function About() {
    const [pluginModule, setPluginModule] = useState<PluginModule | null>(null);
    const [isInstalled, setIsInstalled] = useState<boolean>(false);

    async function installPlugin() {
        try {
            console.log("Fetching plugin...");
            
            // Tell Vite to bundle all plugins inside the plugins folder dynamically
            const plugins = import.meta.glob<{ default: PluginModule }>('../plugins/*.tsx');
            
            // Find our specific testplugin
            const matchPath = '../plugins/testplugin.tsx';
            
            if (!plugins[matchPath]) {
                throw new Error("Plugin not found!");
            }

            // Load the module chunk
            const mod = await plugins[matchPath]();
            const plugin = mod.default;

            setPluginModule(plugin);

            if (plugin && typeof plugin.install === 'function') {
                plugin.install();
                setIsInstalled(true);
            }
        } catch (error) {
            console.error("Failed to install plugin:", error);
        }
    }

    function executePlugin() {
        if (pluginModule && typeof pluginModule.execute === 'function') {
            pluginModule.execute();
        }
    }

    function terminatePlugin() {
        if (pluginModule && typeof pluginModule.terminate === 'function') {
            pluginModule.terminate();
        }

        setPluginModule(null);
        setIsInstalled(false);
    }
    
    const PluginUI = pluginModule?.UIComponent;

    return (
        <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-xl font-bold">React Plugin System</h1>
            
            <div className="flex gap-2">
                <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50" 
                    onClick={installPlugin}
                    disabled={isInstalled}
                >
                    {isInstalled ? 'Installed' : 'Install Plugin'}
                </button>

                <button 
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50" 
                    onClick={executePlugin}
                    disabled={!isInstalled}
                >
                    Execute Plugin
                </button>

                <button 
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50" 
                    onClick={terminatePlugin}
                    disabled={!isInstalled}
                >
                    Terminate Plugin
                </button>
            </div>

            {/* Render Plugin UI */}
            {PluginUI && (
                <div className="mt-6 border-t pt-4">
                    <h2 className="text-md font-semibold text-gray-700 mb-2">Active Plugin UI Area:</h2>
                    <PluginUI />
                </div>
            )}
        </div>
    );
}