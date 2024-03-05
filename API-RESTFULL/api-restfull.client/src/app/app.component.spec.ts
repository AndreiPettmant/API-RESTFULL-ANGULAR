import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should process numbers on form submission', () => {
    const mockResults = ['Result 1', 'Result 2'];

    component.numberList = '1,2,3,4,5';
    component.processNumbers();

    const req = httpMock.expectOne('https://localhost:7050/NumberProcessing');
    expect(req.request.method).toEqual('POST');
    req.flush(mockResults);

    expect(component.results).toEqual(mockResults);
    expect(component.processing).toBe(false);
  });
});
