const bodyParser = require('body-parser');
const { submitContactForm } = require('../controllers/public-controller');


class PublicRoutes {
    static getRoutes(app, router) {
        router.post("/submit-contact-form", bodyParser.json(), submitContactForm);
    }
}

module.exports = PublicRoutes;
