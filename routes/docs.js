const router = require('express').Router();
const swagger_js_doc = require('swagger-jsdoc');
const swagger_ui = require('swagger-ui-express');
const options = require('../common/docs/swagger_options');

const specs = swagger_js_doc(options);
router.use('/docs', swagger_ui.serve);
router.get('/docs', swagger_ui.setup(specs, { explorer: true }));

module.exports = router;
