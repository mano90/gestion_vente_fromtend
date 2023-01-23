import { Pipe, PipeTransform } from '@angular/core';
import { Produit } from '../class/real/produit';
@Pipe({ name: 'filterGraphiqueCustom' })
export class FilterGraphiqueCustom implements PipeTransform {
    /**
     * Transform
     *
     * @param {any[]} items
     * @param {string} searchText
     * @returns {any[]}
     */
    transform(items: Produit[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;

        return items.filter((item) => {
            return Object.keys(item).some(() => {
                return (
                    String(item['reference']).toLowerCase().includes(searchText.toLowerCase()) ||
                    String(item['nom']).toLowerCase().includes(searchText.toLowerCase())
                );
            });
        });
    }
}
