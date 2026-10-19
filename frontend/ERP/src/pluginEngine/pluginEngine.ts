import { type IPlugin } from "./Iplugin";

export class pluginEngine {
    private plugins: IPlugin[] = [];
    registerPlugin(plugin: IPlugin): void {
        this.plugins.push(plugin);
    }
}