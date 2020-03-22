import { customElement, inject, json } from "aurelia";
import { ToiletTrackerModel } from "../models/toilet-tracker-model";

const defaultShit: ToiletTrackerModel = {
    numberOfMenInHousehold: 1,
    numberOfPeesPerDay: 1,
    numberOfShitsPerDay: 1,
    numberOfRollsOnHand: 1,
    numberOfWomenInHousehold: 1,
    sheetsPerPee: 10,
    sheetsPerShit: 30,
    numberOfSheetsPerRoll: 450
};

export class ToiletApp {

    window = window;
    constructor() {
        if (this.toiletTrackerModel = JSON.parse(localStorage.getItem('toiletModel'))) return;
        this.toiletTrackerModel = { ...defaultShit };
    }
    toiletTrackerModel: ToiletTrackerModel;
    get numberOfDaysTillOut() {
        const model = this.toiletTrackerModel;
        localStorage.setItem('toiletModel', JSON.stringify(this.toiletTrackerModel));
        return ((model.numberOfRollsOnHand * model.numberOfSheetsPerRoll) /
            (
                (model.numberOfShitsPerDay * model.sheetsPerShit * ((model.numberOfMenInHousehold * 1) + (model.numberOfWomenInHousehold * 1))) +
                (model.sheetsPerPee * model.numberOfWomenInHousehold * model.numberOfPeesPerDay)
            )).toFixed(0);
    }
    set numberOfDaysTillOut(val: string) {
        const value = Number(val);
        if (!value) {
            this.toiletTrackerModel.numberOfRollsOnHand = 0;
            return;
        }
        
        
    }

    reset() {
        this.toiletTrackerModel = { ...defaultShit };

    }
}


