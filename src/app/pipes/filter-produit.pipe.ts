import { Pipe, PipeTransform } from '@angular/core';
interface shortProduit {
    reference: string;
    nom: string;
}
@Pipe({ name: 'filterProduit' })
export class FilterProduit implements PipeTransform {
    /**
     * Transform
     *
     * @param {any[]} items
     * @param {string} searchText
     * @returns {any[]}
     */
    transform(items: shortProduit[], searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLocaleLowerCase();

        return items.filter((it) => {
            return it.reference.toLocaleLowerCase().includes(searchText);
        });
    }
}
