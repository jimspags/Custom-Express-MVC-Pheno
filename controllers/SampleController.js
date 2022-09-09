// Template Controller
class SampleController {
    index(request, response) {
        // Get sample model
        const SampleModel = require("../models/SampleModel");
        response.render("index");
    }
}

module.exports = new SampleController();

