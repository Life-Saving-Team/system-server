const ceratePatient = require('../../data-layer/create-patient.db')


/**
 * @api {post} /admin/divisions Add division
 * @apiGroup Divisions
 * @apiUse AdminAuthorization
 * @apiParam {String} name Name of the new division
 * @apiParam {String[]} categories Ids of categories in which the new division sponsors
 * @apiParam {Number} colorTheme Color theme that would appear to app users registered in the new division
 * @apiParam {Number} colorTheme Color theme that would appear to app users registered in the new division
 * @apiParam {Number} colorTheme Color theme that would appear to app users registered in the new division
 * @apiParam {Number} colorTheme Color theme that would appear to app users registered in the new division
 * @apiParam {Number} colorTheme Color theme that would appear to app users registered in the new division
 * @apiParam {Number} colorTheme Color theme that would appear to app users registered in the new division
 * @apiParam {Number} colorTheme Color theme that would appear to app users registered in the new division

 */

 
module.exports = (req, res, next) => {
    return addbloodRequest(req.params.id, req.body).catch(err => next(err)).then(user => res.status(200).json(user))
}
