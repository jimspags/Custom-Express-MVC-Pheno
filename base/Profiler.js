class Profiler {
    profiler(request, response) {
        const httpHeaders = {};
        // HTTP headers
        for(const property in request.headers) {
            httpHeaders[property] = request.headers[property];
        }

        const session = {};
        // SESSION
        for(const property in request.session) {
            if(property !== "cookie") {
                session[property] = request.headers[property];
            }
        }

        return {
            memoryUsage: process.memoryUsage(),
            performance: performance.now(),
            httpHeaders: JSON.stringify(httpHeaders),
            session: JSON.stringify(session),
            getData: JSON.stringify(request.query),
            postData: JSON.stringify(request.body)
        }
    }

}

module.exports = Profiler;

// To use in controllers
// let profiler = BC.profiler(request, response);
