// Template Controller
class SampleController {
    index(request, response) {
        response.render("index");
    }
}

module.exports = new SampleController();

