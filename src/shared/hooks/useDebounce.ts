import { ref, watch, onUnmounted } from 'vue';
import type { Ref } from 'vue';

export function useDebounce<T>(value: Ref<T>, delay = 300) {
    const debouncedValue = ref(value.value) as Ref<T>;
    let timeoutId: NodeJS.Timeout | null = null;

    watch(value, (newValue) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            debouncedValue.value = newValue;
        }, delay);
    });

    onUnmounted(() => {
        if (timeoutId) clearTimeout(timeoutId);
    });

    return debouncedValue;
}
