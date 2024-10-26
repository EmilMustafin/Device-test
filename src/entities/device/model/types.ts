export interface Node {
    id: number;
    name: string;
}

export interface Device {
    id: number;
    name: string;
    nodes: Node[];
}
