<script setup lang="ts">
const props = defineProps<{
    placeholder?: string;
    label?: string;
}>();

const amount = defineModel<number>('amount');
</script>

<template>
    <div class="number-form">
        <label v-if="label" class="number-form__label">
            {{ props.label }}
        </label>
        <input v-model="amount" type="number" :placeholder="props.placeholder" class="number-input" />
    </div>
</template>

<style scoped>
.number-form {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 20px 0;
}

.number-input {
    width: 100%;
    max-width: 400px;
    padding: 10px 16px;
    font-size: 16px;
    color: #333;
    border: 2px solid #ccc;
    border-radius: 25px;
    transition:
        border-color 0.3s ease,
        box-shadow 0.3s ease;
}

.number-input::placeholder {
    color: #aaa;
}

.number-input:focus {
    border-color: #6a5acd;
    outline: none;
    box-shadow: 0 0 8px rgb(106 90 205 / 50%);
}

.number-input:hover {
    border-color: #888;
}
</style>
