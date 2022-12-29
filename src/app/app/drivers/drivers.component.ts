import { Component, OnInit, ViewChild } from '@angular/core';
import { DriverService } from './driver.service';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable } from 'rxjs';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})

export class DriversComponent {

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'id', headerName: "ID" },
    { field: 'type_document', headerName: "Tipo Documento" },
    { field: 'document', headerName: "Documento" },
    { field: 'first_name', headerName: "Nombres" },
    { field: 'last_name', headerName: "Apellidos" }
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: false,
    filter: false,
  };

  // Data that gets displayed in the grid
  public rowData$!: Observable<any[]>;

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private driverService: DriverService) {

  }

  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.driverService.getData();
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}
