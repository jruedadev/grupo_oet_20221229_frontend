import { Component, OnInit, ViewChild } from '@angular/core';
import { VehicleService } from './vehicle.service';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable } from 'rxjs';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent {
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'id', headerName: "ID" },
    { field: 'license_plate', headerName: "Placa" },
    { field: 'brand', headerName: "Marca" },
    { field: 'type', headerName: "Tipo de servicio" },
    { field: 'owner.document', headerName: "Propietario" }
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: false,
    filter: false,
  };

  // Data that gets displayed in the grid
  public rowData$!: Observable<any[]>;

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private vehicleService: VehicleService) {

  }

  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.vehicleService.getData();
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
