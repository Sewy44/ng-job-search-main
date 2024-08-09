import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockActivatedRoute;

  beforeEach(async () => {

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => 'test-value' // Mock implementation of paramMap.get
        }
      }
    };
    await TestBed.configureTestingModule({
      imports: [RouterOutlet, RouterLink, CommonModule, AppComponent], 
      providers: [{provide: ActivatedRoute, useValue: mockActivatedRoute}]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title 'ng-job-search'`, () => {
    expect(component.title).toEqual('ng-job-search');
  });

  it('should set the initial active button to "jobs"', () => {
    expect(component.activeButton).toBe('jobs');
  });

  it('should change activeButton when setActiveButton is called', () => {
    component.setActiveButton('companies');
    expect(component.activeButton).toBe('companies');
  });

  it('should call setActiveButton on ngOnInit', () => {
    const setActiveButtonSpy = spyOn(component, 'setActiveButton');
    component.ngOnInit();
    expect(setActiveButtonSpy).toHaveBeenCalledWith('jobs');
  });

  it('should render the router outlet', () => {
    const routerOutletDebugElement = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(routerOutletDebugElement).not.toBeNull();
  });
});
