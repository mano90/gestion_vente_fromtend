import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatMoney'
})
export class FormatMoneyPipe implements PipeTransform {
    transform(money: number | string): string | number {
        money = money.toString();
        var toReturn = '';

        switch (money.length % 3) {
            case 0:
                for (var i = 0; i < money.length; i += 3) {
                    toReturn += money.substr(i, 3) + ' ';
                }
                break;

            case 1:
                toReturn += money.substr(0, 1) + ' ';
                for (var i = 1; i < money.length; i += 3) {
                    toReturn += money.substr(i, 3) + ' ';
                }
                break;
            case 2:
                toReturn += money.substr(0, 2) + ' ';
                for (var i = 2; i < money.length; i += 3) {
                    toReturn += money.substr(i, 3) + ' ';
                }
                break;
        }
        return toReturn + 'Ar';
    }
}
