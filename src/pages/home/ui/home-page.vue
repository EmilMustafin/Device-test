<script setup lang="ts">
import { ref } from 'vue';
import { useDeviceStore } from '@/entities/device/model/deviceStore';
import { Node } from '@/entities/device/model/types';
import DeviceList from '@/features/device-list/device-list.vue';

const store = useDeviceStore();
const { devices } = store;

const newDeviceName = ref('');

const addDevice = () => {
    if (newDeviceName.value.trim()) {
        store.addDevice(newDeviceName.value);
        newDeviceName.value = '';
    }
};

const updateDevice = (deviceId: number, name: string) => {
    store.updateDevice(deviceId, name);
};

const deleteDevice = (deviceId: number) => {
    store.deleteDevice(deviceId);
};

const addNode = (deviceId: number, name: string) => {
    store.addNode(deviceId, name);
};

const updateNode = (deviceId: number, nodeId: number, name: string) => {
    store.updateNode(deviceId, nodeId, name);
};

const deleteNode = (deviceId: number, nodeId: number) => {
    store.deleteNode(deviceId, nodeId);
};
const reorderNodes = (deviceId: number, nodes: Node[]) => {
    store.updateDeviceNodes(deviceId, nodes);
};
</script>

<template>
    <div class="app">
        <h1>Редактор устройств</h1>

        <DeviceList
            :devices="devices"
            @update_device="updateDevice"
            @delete_device="deleteDevice"
            @add_node="addNode"
            @update_node="updateNode"
            @delete_node="deleteNode"
            @reorder_nodes="reorderNodes"
        />

        <div class="add-device">
            <input
                v-model="newDeviceName"
                placeholder="Название нового устройства"
                class="add input"
                @keyup.enter="addDevice"
            />
            <button class="btn add" @click="addDevice">Добавить устройство</button>
        </div>
    </div>
</template>

<style scoped>
.app {
    max-width: 800px;
    padding: 20px;
    margin: 0 auto;
}

.add-device {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-top: 15px;
}

.add.input {
    padding: 6px;
    margin-right: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

h1 {
    margin: 0 0 20px;
    color: #333;
}

.btn {
    padding: 6px 12px;
    font-size: 14px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
}

.btn.add {
    color: white;
    background-color: #4caf50;
}
</style>
