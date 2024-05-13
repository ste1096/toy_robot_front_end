import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AxisModel, FacingEnum } from '../../models';
import { PlaceCommand } from '../../store/actions';

@Component({
  selector: 'place-dashboard',
  templateUrl: './place-dashboard.component.html',
  styleUrls: ['./place-dashboard.component.scss'],
})
export class PlaceDashboardComponent implements OnInit {
  @Input() axisDimensions: AxisModel;

  form: FormGroup;
  fControlPlaceX: FormControl;
  fControlPlaceY: FormControl;
  fControlFacing: FormControl;
  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.fControlPlaceX = new FormControl(null, Validators.required);
    this.fControlPlaceY = new FormControl(null, Validators.required);
    this.fControlFacing = new FormControl(null, Validators.required);
    this.form = this.fb.group({
      xplace: this.fControlPlaceX,
      yplace: this.fControlPlaceY,
      facing: this.fControlFacing,
    });
  }

  onPlace() {
    console.log(this.form.value);
    if (this.form?.valid) {
      const formValue = this.form.value;
      const payload: { axis: AxisModel; facing: FacingEnum } = {
        axis: { x: +formValue?.xplace, y: +formValue?.yplace },
        facing: +formValue?.facing,
      };
      this.store.dispatch(new PlaceCommand(payload));
    } else {
      this.form.markAllAsTouched();
    }
  }
}
