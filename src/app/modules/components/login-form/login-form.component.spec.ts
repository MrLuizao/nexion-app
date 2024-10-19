import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoginFormComponent } from './login-form.component';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFormComponent ],
      // imports: [IonicModule.forRoot()]
      imports: [HttpClientTestingModule, IonicModule.forRoot()], // Incluye HttpClientTestingModule
      providers: [AuthenticationService] // Asegúrate de incluir tus servicios

    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
