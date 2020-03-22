import { customElement, inject, json, bindable } from "aurelia";
import { ToiletTrackerModel } from "../models/toilet-tracker-model";

const defaultShit: ToiletTrackerModel = {
    numberOfMenInHousehold: 1,
    numberOfPeesPerDay: 5,
    numberOfShitsPerDay: 1,
    numberOfRollsOnHand: 1,
    numberOfWomenInHousehold: 1,
    sheetsPerPee: 10,
    sheetsPerShit: 30,
    numberOfSheetsPerRoll: 450
};

export class ToiletApp {

    window = window;
    @bindable
    textContent: string;
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
            ));
    }

    textContentChanged(val, val2) {
        this.setNumberOfDaysTillOut(Number(val) || 0);
    }

    setNumberOfDaysTillOut(val: number) {
        const model = this.toiletTrackerModel;
        model.numberOfRollsOnHand =
            ((val *
                ((model.numberOfShitsPerDay * model.sheetsPerShit * ((model.numberOfMenInHousehold * 1) + (model.numberOfWomenInHousehold * 1))) +
                    (model.sheetsPerPee * model.numberOfWomenInHousehold * model.numberOfPeesPerDay)
                )) / model.numberOfSheetsPerRoll);
    }

    reset() {
        this.toiletTrackerModel = { ...defaultShit };
    }
}