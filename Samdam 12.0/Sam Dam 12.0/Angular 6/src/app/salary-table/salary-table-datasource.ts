import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface SalaryTableItem {
  name: string;
  empid: number;
  site:string;
  days:number;
  ot:number;
  payperday:number;
  otrate:number;
  daypay:number;
  otpay:number;
  fullpay:number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: SalaryTableItem[] = [
  {empid: 1, name: 'Name1',site: 'Badulla',days: 25,ot:10,payperday:1500,otrate:105,daypay:37500,otpay:1050,fullpay:38550},
  {empid: 3, name: 'Name2',site: 'Badulla',days: 25,ot:10,payperday:1500,otrate:105,daypay:37500,otpay:1050,fullpay:38550},
  {empid: 4, name: 'Name1',site: 'Badulla',days: 25,ot:10,payperday:1500,otrate:105,daypay:37500,otpay:1050,fullpay:38550},
  {empid: 5, name: 'Name1',site: 'Balangoda',days: 25,ot:10,payperday:1500,otrate:105,daypay:37500,otpay:1050,fullpay:38550},
  {empid: 6, name: 'Name1',site: 'Badulla',days: 25,ot:10,payperday:1500,otrate:105,daypay:37500,otpay:1050,fullpay:38550},
  {empid: 7, name: 'Name1',site: 'Balangoda',days: 25,ot:10,payperday:1500,otrate:105,daypay:37500,otpay:1050,fullpay:38550},
  {empid: 2, name: 'Name1',site: 'Rathnapura',days: 25,ot:10,payperday:1500,otrate:105,daypay:37500,otpay:1050,fullpay:38550},
  {empid: 8, name: 'Name1',site: 'Balangoda',days: 25,ot:10,payperday:1500,otrate:105,daypay:37500,otpay:1050,fullpay:38550},
  {empid: 9, name: 'Name1',site: 'Badulla',days: 25,ot:10,payperday:1500,otrate:105,daypay:37500,otpay:1050,fullpay:38550},
  {empid: 10, name: 'Name1',site: 'Badulla',days: 25,ot:10,payperday:1500,otrate:105,daypay:37500,otpay:1050,fullpay:38550},
  {empid: 11, name: 'Name1',site: 'Badulla',days: 25,ot:10,payperday:1500,otrate:105,daypay:37500,otpay:1050,fullpay:38550}
];

/**
 * Data source for the SalaryTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class SalaryTableDataSource extends DataSource<SalaryTableItem> {
  data: SalaryTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<SalaryTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: SalaryTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: SalaryTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'empid': return compare(+a.empid, +b.empid, isAsc);
        case 'days': return compare(+a.days, +b.days, isAsc);
        case 'ot': return compare(+a.ot, +b.ot, isAsc);
        case 'payperday': return compare(+a.payperday, +b.payperday, isAsc);
        case 'otrate': return compare(+a.otrate, +b.otrate, isAsc);
        case 'site': return compare(a.site, b.site, isAsc);
        case 'daypay': return compare(+a.daypay, +b.daypay, isAsc);
        case 'otpay': return compare(+a.otpay, +b.otpay, isAsc);
        case 'fullpay': return compare(+a.fullpay, +b.fullpay, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
