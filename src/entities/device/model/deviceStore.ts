import { ref } from 'vue';
import { mockDevices } from './constants';
import { Device, Node } from './types';

export const useDeviceStore = () => {
    const devices = ref<Device[]>(mockDevices);
    const nextNodeId = ref(1);

    const addDevice = (name: string) => {
        devices.value.push({
            id: devices.value.length + 1,
            name,
            nodes: [],
        });
    };

    const updateDevice = (id: number, name: string) => {
        const device = devices.value.find((d) => d.id === id);
        if (device) {
            device.name = name;
        }
    };
    const updateDeviceNodes = (deviceId: number, nodes: Node[]) => {
        const device = devices.value.find((d) => d.id === deviceId);
        if (device) {
            device.nodes = nodes;
        }
    };

    const deleteDevice = (id: number) => {
        devices.value = devices.value.filter((d) => d.id !== id);
    };

    const addNode = (deviceId: number, name: string) => {
        const device = devices.value.find((d) => d.id === deviceId);
        if (device) {
            device.nodes.push({
                id: nextNodeId.value++,
                name,
            });
        }
    };

    const updateNode = (deviceId: number, nodeId: number, name: string) => {
        const device = devices.value.find((d) => d.id === deviceId);
        if (device) {
            const node = device.nodes.find((n) => n.id === nodeId);
            if (node) {
                node.name = name;
            }
        }
    };

    const deleteNode = (deviceId: number, nodeId: number) => {
        const device = devices.value.find((d) => d.id === deviceId);
        if (device) {
            device.nodes = device.nodes.filter((n) => n.id !== nodeId);
        }
    };

    return {
        devices,
        addDevice,
        updateDevice,
        deleteDevice,
        addNode,
        updateNode,
        deleteNode,
        updateDeviceNodes,
    };
};
