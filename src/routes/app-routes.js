const response = require("../utils/response");

class AppRoutes {
    static getRoutes(app, router) {
        router.get("/status", (req, res, next) => {
            response.success(res, {});
        });
    }
}

module.exports = AppRoutes;
