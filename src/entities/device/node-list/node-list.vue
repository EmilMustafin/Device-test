<script setup lang="ts">
import { ref } from 'vue';
import type { Device, Node } from '@/entities/device/model/types';

const props = defineProps<{
    devices: Device[];
    device: Device;
}>();

const emit = defineEmits<{
    add_node: [deviceId: number, name: string];
    update_node: [deviceId: number, nodeId: number, name: string];
    delete_node: [deviceId: number, nodeId: number];
    reorder_nodes: [deviceId: number, nodes: Node[]];
}>();

const editingNode = ref<{ deviceId: number; nodeId: number } | null>(null);
const newNodeName = ref('');
const draggedNode = ref<{ deviceId: number; nodeId: number } | null>(null);

const startEditingNode = (deviceId: number, nodeId: number, currentName: string) => {
    editingNode.value = { deviceId, nodeId };
    newNodeName.value = currentName;
};

const saveNode = (deviceId: number, nodeId: number) => {
    if (newNodeName.value.trim()) {
        emit('update_node', deviceId, nodeId, newNodeName.value);
        editingNode.value = null;
    }
};

const moveNode = (deviceId: number, nodeId: number, direction: 'up' | 'down') => {
    const device = props.devices.find((d) => d.id === deviceId);
    if (!device) return;

    const nodes = [...device.nodes];
    const currentIndex = nodes.findIndex((n) => n.id === nodeId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= nodes.length) return;

    [nodes[currentIndex], nodes[newIndex]] = [nodes[newIndex], nodes[currentIndex]];
    emit('reorder_nodes', deviceId, nodes);
};

const onDragStart = (deviceId: number, nodeId: number) => {
    draggedNode.value = { deviceId, nodeId };
};

const onDragOver = (e: DragEvent) => {
    e.preventDefault();
};

const onDrop = (deviceId: number, targetNodeId: number) => {
    if (!draggedNode.value || draggedNode.value.deviceId !== deviceId) return;

    const device = props.devices.find((d) => d.id === deviceId);
    if (!device) return;

    const nodes = [...device.nodes];
    const sourceIndex = nodes.findIndex((n) => n.id === draggedNode.value?.nodeId);
    const targetIndex = nodes.findIndex((n) => n.id === targetNodeId);

    if (sourceIndex === -1 || targetIndex === -1) return;

    const [movedNode] = nodes.splice(sourceIndex, 1);
    nodes.splice(targetIndex, 0, movedNode);
    emit('reorder_nodes', deviceId, nodes);
    draggedNode.value = null;
};
</script>

<template>
    <div class="node-list">
        <div class="nodes">
            <TransitionGroup name="node">
                <div
                    v-for="node in device.nodes"
                    :key="node.id"
                    class="node"
                    draggable="true"
                    @dragstart="onDragStart(device.id, node.id)"
                    @dragover="onDragOver"
                    @drop="onDrop(device.id, node.id)"
                >
                    <template v-if="editingNode?.deviceId === device.id && editingNode?.nodeId === node.id">
                        <input
                            v-model="newNodeName"
                            class="edit-input"
                            @keyup.enter="saveNode(device.id, node.id)"
                            @blur="saveNode(device.id, node.id)"
                        />
                        <div class="node-actions">
                            <button class="btn save" @click="saveNode(device.id, node.id)">Сохранить</button>
                            <button class="btn cancel" @click="editingNode = null">Отмена</button>
                        </div>
                    </template>
                    <template v-else>
                        <span class="node-name">{{ node.name }}</span>
                        <div class="node-actions">
                            <button
                                class="btn move"
                                :disabled="device.nodes.indexOf(node) === 0"
                                @click="moveNode(device.id, node.id, 'up')"
                            >
                                ↑
                            </button>
                            <button
                                class="btn move"
                                :disabled="device.nodes.indexOf(node) === device.nodes.length - 1"
                                @click="moveNode(device.id, node.id, 'down')"
                            >
                                ↓
                            </button>
                            <button class="btn edit" @click="startEditingNode(device.id, node.id, node.name)">
                                Изменить
                            </button>
                            <button class="btn delete" @click="emit('delete_node', device.id, node.id)">Удалить</button>
                        </div>
                    </template>
                </div>
            </TransitionGroup>
        </div>
    </div>
</template>

<style scoped>
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

.btn.move {
    padding: 4px 8px;
    font-size: 0.85rem;
    color: white;
    background-color: #718096;
}

.btn.move:disabled {
    cursor: not-allowed;
    background-color: #cbd5e0;
    transform: none;
}

.btn.move:hover:not(:disabled) {
    background-color: #4a5568;
}

.node-move,
.node-enter-active,
.node-leave-active {
    transition: all 0.5s ease;
}

.node-enter-from,
.node-leave-to {
    opacity: 0;
    transform: translateX(30px);
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

    .node {
        flex-direction: column;
        gap: 10px;
    }

    .node-actions {
        justify-content: flex-end;
        width: 100%;
    }

    .edit-input {
        width: 100%;
    }
}
</style>
