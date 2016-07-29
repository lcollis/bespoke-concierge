const defaultUpdateDelay = 5 * 60 * 1000; //5 minutes

export class ApiInfo {
    name: string;
    url: string;
    lastUpdate: Date;
    updateDelay: number;

    data: any;
    selectedObject: any;

    constructor(name: string, url: string, data: any = null) {
        this.name = name;
        this.url = url;
        this.lastUpdate = new Date(0);
        this.updateDelay = defaultUpdateDelay;

        this.data = data;
    }
}