import { localeCurrency } from './model/constants';

export function getDefaultCurrency() {
    const locale = (navigator.language || navigator.languages[0]) as keyof typeof localeCurrency;
    const currency = localeCurrency[locale];

    return currency;
}
