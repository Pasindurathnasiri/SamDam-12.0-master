import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface EmployeeTableItem {
  name: string;
  emp_id: number;
  nic: string;
  gender: string;
  address: string;
  epf_no: string;
  etf_no: string;
  designation: string;
  current_site:string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: EmployeeTableItem[] = [
  {emp_id: 1, name: 'Sandaruwan Jeewantha',nic:'962041264V',gender:'male',address:'Amupitiya,Imbulpe', epf_no:'4568425DF', etf_no:'489453548984BHV',designation:'SK',current_site:'Badulla'},
  {emp_id: 2, name: 'Sandaruwan Jeewantha',nic:'962041264V',gender:'male',address:'Amupitiya,Imbulpe', epf_no:'4568425DF', etf_no:'489453548984BHV',designation:'SK',current_site:'Badulla'},
  {emp_id: 3, name: 'Sandaruwan Jeewantha',nic:'962041264V',gender:'male',address:'Amupitiya,Imbulpe', epf_no:'4568425DF', etf_no:'489453548984BHV',designation:'SK',current_site:'Badulla'},
  {emp_id: 4, name: 'Sandaruwan Jeewantha',nic:'962041264V',gender:'male',address:'Amupitiya,Imbulpe', epf_no:'4568425DF', etf_no:'489453548984BHV',designation:'SK',current_site:'Badulla'},
  {emp_id: 5, name: 'Sandaruwan Jeewantha',nic:'962041264V',gender:'male',address:'Amupitiya,Imbulpe', epf_no:'4568425DF', etf_no:'489453548984BHV',designation:'SK',current_site:'Badulla'},
  {emp_id: 6, name: 'Sandaruwan Jeewantha',nic:'962041264V',gender:'male',address:'Amupitiya,Imbulpe', epf_no:'4568425DF', etf_no:'489453548984BHV',designation:'SK',current_site:'Badulla'},
  {emp_id: 7, name: 'Sandaruwan Jeewantha',nic:'962041264V',gender:'male',address:'Amupitiya,Imbulpe', epf_no:'4568425DF', etf_no:'489453548984BHV',designation:'SK',current_site:'Badulla'},
  {emp_id: 8, name: 'Sandaruwan Jeewantha',nic:'962041264V',gender:'male',address:'Amupitiya,Imbulpe', epf_no:'4568425DF', etf_no:'489453548984BHV',designation:'SK',current_site:'Badulla'},
  
];

/**
 * Data source for the EmployeeTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class EmployeeTableDataSource extends DataSource<EmployeeTableItem> {
  data: EmployeeTableItem[] = EXAMPLE_DATA;
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
  connect(): Observable<EmployeeTableItem[]> {
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
  private getPagedData(data: EmployeeTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: EmployeeTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'emp_id': return compare(+a.emp_id, +b.emp_id, isAsc);
        case 'gender': return compare(a.gender, b.gender, isAsc);
        case 'address': return compare(a.address, b.address, isAsc);
        case 'epf_no': return compare(a.epf_no, b.epf_no, isAsc);
        case 'etf_no': return compare(a.etf_no, b.etf_no, isAsc);
        case 'designation': return compare(a.designation, b.designation, isAsc);
        case 'current_site': return compare(a.current_site, b.current_site, isAsc);
        
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
