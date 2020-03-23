import Aurelia from 'aurelia';
import { ToiletApp } from './ToiletApp/toilet-app';
import { MdbWavesEffect } from './attributes/waves';


const aurelia = Aurelia.register(MdbWavesEffect).app(ToiletApp);
aurelia.start();
