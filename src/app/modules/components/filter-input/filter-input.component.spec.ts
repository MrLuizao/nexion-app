import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FilterInputComponent } from './filter-input.component';

/**
 * Este conjunto de pruebas unitarias verifica la funcionalidad del componente
 * `FilterInputComponent`, que se encarga de gestionar la entrada de filtros. Las 
 * pruebas incluyen la creación del componente, la visibilidad de los filtros, 
 * y la emisión de eventos relacionados con cambios en los filtros de texto, 
 * selección de fechas y regiones.
 * 
 * Las pruebas aseguran que:
 * - El componente se crea correctamente.
 * - Se alterna la visibilidad de los filtros.
 * - Se emiten eventos adecuados al cambiar el texto del filtro.
 * - Se emiten eventos al abrir los selectores de fecha y región.
 * - Se pueden limpiar los filtros de fecha y región, emitiendo el evento de cambio de filtro.
 * - Se aplican filtros y se emiten eventos con la configuración actual de filtros.
 */

describe('FilterInputComponent', () => {
  let component: FilterInputComponent;
  let fixture: ComponentFixture<FilterInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FilterInputComponent],
      imports: [HttpClientTestingModule, IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle filters visibility', () => {
    expect(component.hidden).toBeTrue();
    component.toggleFilters();
    expect(component.hidden).toBeFalse();
    component.toggleFilters();
    expect(component.hidden).toBeTrue();
  });

  it('should emit filterChange on text filter change', () => {
    spyOn(component.filterChange, 'emit');

    component.filterText = 'Test';
    component.onTextFilterChange();

    expect(component.filterChange.emit).toHaveBeenCalledWith({
      startDate: undefined,
      endDate: undefined,
      selectedRegions: undefined,
      filterText: 'Test'
    });
  });

  it('should emit datePickerOpen when openDatePickerModal is called', () => {
    spyOn(component.datePickerOpen, 'emit');

    component.openDatePickerModal();

    expect(component.datePickerOpen.emit).toHaveBeenCalled();
  });

  it('should emit regionPickerOpen when openCheckModal is called', () => {
    spyOn(component.regionPickerOpen, 'emit');

    component.openCheckModal();

    expect(component.regionPickerOpen.emit).toHaveBeenCalled();
  });

  it('should clear date filter and emit filterChange', () => {
    spyOn(component.filterChange, 'emit');

    component.startDate = new Date();
    component.endDate = new Date();
    component.clearDateFilter();

    expect(component.startDate).toBeUndefined();
    expect(component.endDate).toBeUndefined();
    expect(component.filterChange.emit).toHaveBeenCalled();
  });

  it('should clear region filter and emit filterChange', () => {
    spyOn(component.filterChange, 'emit');

    component.selectedRegions = ['Region1', 'Region2'];
    component.clearRegionFilter();

    expect(component.selectedRegions).toBeUndefined();
    expect(component.filterChange.emit).toHaveBeenCalled();
  });

  it('should emit filterChange when applyFilters is called', () => {
    spyOn(component.filterChange, 'emit');

    component.applyFilters();

    expect(component.filterChange.emit).toHaveBeenCalled();
  });

  it('should emit filterChange with the current filter config', () => {
    spyOn(component.filterChange, 'emit');

    component.startDate = new Date('2024-01-01');
    component.endDate = new Date('2024-01-31');
    component.selectedRegions = ['Region1'];
    component.filterText = 'Test';

    component.applyFilters();

    expect(component.filterChange.emit).toHaveBeenCalledWith({
      startDate: component.startDate,
      endDate: component.endDate,
      selectedRegions: component.selectedRegions,
      filterText: component.filterText
    });
  });
});

