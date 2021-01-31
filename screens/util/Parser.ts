import {UserInfo} from "../../user/UserInfo";

export default class Parser {
    // EFFECTS: Reads and returns the dataset from memory.
    public static readFromFile(): UserInfo {
        let fs = require('browserify-fs');
        let data: UserInfo = {
            stocks: [],
            money: 10000
        };
        fs.readFile("../../data/data.json", (err: any, jsonString: any) => {
            if (err) {
                console.log("File read failed:", err)
                return;
            }
            data = JSON.parse(jsonString);
        })
        return data;
    }

    public static writeToFile(datasets: UserInfo) {
        let fs = require('browserify-fs');
        fs.writeFile("../../data/data.json", JSON.stringify(datasets), function () {
            console.log("written");
        });
    }
}



