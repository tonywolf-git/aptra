import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { NgCalendarModule  } from 'ionic6-calendar';
import { Tab3PageRoutingModule } from './tab3-routing.module';
import { LOCALE_ID } from '@angular/core';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

registerLocaleData(es);

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    NgCalendarModule,
    Tab3PageRoutingModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-MX' }],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
