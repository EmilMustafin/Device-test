<script setup lang="ts">
import { ref } from 'vue';
import { Device, Node } from '@/entities/device/model/types';
import NodeList from '@/entities/device/node-list/node-list.vue';

const props = defineProps<{
    devices: Device[];
}>();

const emit = defineEmits<{
    update_device: [deviceId: number, name: string];
    delete_device: [deviceId: number];
    add_node: [deviceId: number, name: string];
    update_node: [deviceId: number, nodeId: number, name: string];
    delete_node: [deviceId: number, nodeId: number];
    reorder_nodes: [deviceId: number, nodes: Node[]];
}>();

const editingDevice = ref<number | null>(null);
const newDeviceName = ref('');

const startEditing = (deviceId: number) => {
    editingDevice.value = deviceId;
    newDeviceName.value = props.devices.find((d) => d.id === deviceId)?.name || '';
};

const saveDevice = (deviceId: number) => {
    if (newDeviceName.value.trim()) {
        emit('update_device', deviceId, newDeviceName.value);
        editingDevice.value = null;
    }
};

const addNewNode = (deviceId: number) => {
    const name = prompt('Введите название нового узла:');
    if (name?.trim()) {
        emit('add_node', deviceId, name);
    }
};
</script>

<template>
    <div class="device-list">
        <div v-for="device in devices" :key="device.id" class="device">
            <div class="device-header">
                <template v-if="editingDevice === device.id">
                    <input v-model="newDeviceName" class="edit-input" @keyup.enter="saveDevice(device.id)" />
                    <button class="btn save" @click="saveDevice(device.id)">Сохранить</button>
                    <button class="btn cancel" @click="editingDevice = null">Отмена</button>
                </template>
                <template v-else>
                    <h3>{{ device.name }}</h3>
                    <div class="device-actions">
                        <button class="btn edit" @click="startEditing(device.id)">Изменить</button>
                        <button class="btn delete" @click="emit('delete_device', device.id)">Удалить</button>
                        <button class="btn add" @click="addNewNode(device.id)">Добавить узел</button>
                    </div>
                </template>
            </div>

            <NodeList
                :device
                :devices
                @add_node="(deviceId, name) => emit('add_node', deviceId, name)"
                @update_node="(deviceId, nodeId, name) => emit('update_node', deviceId, nodeId, name)"
                @delete_node="(deviceId, nodeId) => emit('delete_node', deviceId, nodeId)"
                @reorder_nodes="(deviceId, nodes) => emit('reorder_nodes', deviceId, nodes)"
            />
        </div>
    </div>
</template>

<style scoped>
.device-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 16px;
}

.device {
    padding: 20px;
    background: linear-gradient(to bottom, #fff, #f8f9fa);
    border: 1px solid #e9ecef;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 5%);
}

.device:hover {
    box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
}

.device-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 12px;
    margin-bottom: 20px;
    border-bottom: 2px solid #f0f0f0;
}

.device-header h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #2c3e50;
}

.device-actions {
    display: flex;
    gap: 10px;
}

.nodes {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.node {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px;
    cursor: move;
    background: white;
    border: 1px solid #e9ecef;
    border-radius: 8px;
}

.node:hover {
    background-color: #f8f9fa;
    box-shadow: 0 2px 6px rgb(0 0 0 / 5%);
    transform: translateX(4px);
}

.node-name {
    flex-grow: 1;
    font-size: 1rem;
    color: #4a5568;
}

.node-actions {
    display: flex;
    gap: 6px;
    opacity: 0.7;
}

.node:hover .node-actions {
    opacity: 1;
}

.edit-input {
    width: 250px;
    padding: 8px 12px;
    font-size: 0.95rem;
    border: 2px solid #e2e8f0;
    border-radius: 6px;
}

.edit-input:focus {
    border-color: #4299e1;
    outline: none;
    box-shadow: 0 0 0 3px rgb(66 153 225 / 15%);
}

.btn {
    padding: 6px 12px;
    font-size: 0.9rem;
    font-weight: 500;
    border: none;
    border-radius: 6px;
}

.btn.edit {
    color: white;
    background-color: #4299e1;
}

.btn.edit:hover {
    background-color: #3182ce;
}

.btn.delete {
    color: white;
    background-color: #f56565;
}

.btn.delete:hover {
    background-color: #e53e3e;
}

.btn.save {
    color: white;
    background-color: #48bb78;
}

.btn.save:hover {
    background-color: #38a169;
}

.btn.cancel {
    color: white;
    background-color: #a0aec0;
}

.btn.cancel:hover {
    background-color: #718096;
}

.btn.add {
    color: white;
    background-color: #667eea;
}

.btn.add:hover {
    background-color: #5a67d8;
}

@media (width <= 768px) {
    .device {
        padding: 15px;
    }

    .device-header {
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
    }

    .device-actions {
        justify-content: flex-start;
        width: 100%;
    }
}
</style>
