import { Pipe, PipeTransform } from '@angular/core';
import { Client } from '../class/real/client';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
    /**
     * Transform
     *
     * @param {any[]} items
     * @param {string} searchText
     * @returns {any[]}
     */
    transform(items: Client[], searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLocaleLowerCase();

        return items.filter((it) => {
            return it.nom.toLocaleLowerCase().includes(searchText);
        });
    }
}
