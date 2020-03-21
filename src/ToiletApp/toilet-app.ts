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

    toiletTrackerModel: ToiletTrackerModel = { ...defaultShit };
    get numberOfDaysTillOut() {
        const model = this.toiletTrackerModel;
        return model.numberOfRollsOnHand * model.numberOfSheetsPerRoll /
            (
                (model.numberOfShitsPerDay * model.sheetsPerShit * (model.numberOfMenInHousehold + model.numberOfWomenInHousehold)) +
                (model.sheetsPerPee * model.numberOfWomenInHousehold * model.numberOfPeesPerDay)
            );
    }

    reset() {
        this.toiletTrackerModel = { ...defaultShit };
    }
}


