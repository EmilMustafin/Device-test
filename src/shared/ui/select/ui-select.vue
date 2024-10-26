<script setup lang="ts">
import { defineProps } from 'vue';
import { Currency } from '@/shared/lib/locale-currency/model/types';

const props = defineProps<{
    currencies: Currency[];
    label?: string;
    id?: string;
}>();

const currency = defineModel<string>('currency');
</script>

<template>
    <label class="ui-select__label">
        <p class="ui-select__label-text">
            {{ props.label }}
        </p>
        <select :id="props.id" v-model="currency" class="ui-select__dropdown">
            <option v-for="item_currency in props.currencies" :key="item_currency" :value="item_currency">
                {{ item_currency }}
            </option>
        </select>
    </label>
</template>

<style scoped>
.ui-select-label {
    display: block;
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: 500;
    color: #555;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.ui-select-label-text {
    margin-bottom: 15px;
}

.ui-select-dropdown {
    width: 100%;
    padding: 12px 16px;
    font-size: 16px;
    color: #333;
    cursor: pointer;
    background-color: #f0f4f8;
    border: 1px solid #ccc;
    border-radius: 6px;
    outline: none;
    box-shadow:
        inset 0 0 3px rgb(255 255 255 / 60%),
        0 4px 8px rgb(0 0 0 / 10%);
    transition:
        border-color 0.3s ease,
        box-shadow 0.3s ease,
        background-color 0.3s ease;
}

.ui-select-dropdown:hover {
    background-color: #e8f1f8;
    border-color: #00bfff;
}

.ui-select-dropdown:focus {
    background-color: #fff;
    border-color: #00bfff;
    box-shadow:
        0 0 8px #00bfff,
        0 4px 8px rgb(0 0 0 / 20%);
}
</style>
