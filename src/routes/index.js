const router = require('express').Router()


/**
 * @apiDefine ReceptionistAuthenticationToken
 * @apiHeader {String} Authorization for a receptionist. String made up of 'Bearer' and then the json webtoken.
 */

 /**
 * @apiDefine AdminAuthenticationToken
 * @apiHeader {String} Authorization for an admin. String made up of 'Bearer' and then the json webtoken.
 */



 /**
 * @api {post} /patient_with_blood_request Add patient along with its blood request
 * @apiGroup receptionists
 * @apiUse AuthenticationToken
 * @apiParam  {Object} patient   
 * @apiParam  {String} patient.name   
 * @apiParam  {Number} receptionist   
 * @apiParam  {Object} bloodRequest   
 * @apiParam  {String} bloodRequest.source   
 * @apiParam  {String} bloodRequest.status   
 * @apiParam  {String} bloodRequest.isConfirmedReceivingBlood 
 * @apiParam  {String} bloodRequest   
 * @apiParam  {String} bloodRequest   
 * @apiParam  {String} bloodRequest   
 * @apiParam  {String} bloodRequest   

 * @apiParam  {String} patient.name   
 * @apiParam  {Number} receptionist   

 * @apiDescription Add a new receptionist. The dateCreated should be auto-generated. Use the user schema
 */
router.post('/patient_with_blood_request', verifyUser, Authorize.allowReceptionistOnly, validateAddPatientAlongWithABloodRequest, addPatientAlongWithABloodRequest)


/**
 * @api {post} /receptionist Add receptionist
 * @apiGroup receptionists
 * @apiUse AuthenticationToken
 * @apiParam {email} 
 * @apiParam {password} 
 * @apiDescription Add a new receptionist. The dateCreated should be auto-generated. Use the user schema
 */
router.post('/receptionists', verifyUser, Authorize.allowAdminOnly, validateAddReceptionist, AddReceptionist)


/**
 * @api {post} /receptionist Add receptionist
 * @apiGroup receptionists
 * @apiUse ReceptionistAuthorization
 * @apiParam {email} 
 * @apiParam {password} 
 * @apiDescription Add a new receptionist. The dateCreated should be auto-generated. Use the user schema
 * @apiSuccess {String} token Access token tha   need to be send as in a header to access other apis.
 * @apiSuccess {Object} receptionist   
 * @apiSuccess {Number} receptionist.name 
 */
router.post('/receptionists/login', validateLoginReceptionist, loginReceptionist)


router.get('/password_recovery_requests', validateVerifyActivationCode, verifyRecoveryCode)




module.exports = router