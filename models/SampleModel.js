const BaseModel = require("../base/BaseModel");

class SampleModel extends BaseModel{
    constructor() {
        // Pass table name to the BaseModel
        super("sampleTableName");
    }

    // Create different methods

}

module.exports = new SampleModel();
