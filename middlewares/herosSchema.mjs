import Joi from 'joi';
import joioid from 'joi-objectid';
const ObjectId = joioid(Joi);


// const editShift = data => {
//     const schema = Joi.object({
//         startTime: Joi.date().required(),
//         endTime: Joi.date().required(),
//         workTimeMM: Joi.number().min(1).required(),
//         clientID: ObjectId().required(),
//         // reportedProblem:Joi.string().min(5).max(200),
 
//     })
//     return schema.validate(data)
// }

// const editManyShifts = data => {
//     const schema = Joi.object({
//         shifts: Joi.array().min(1)
//             .items(Joi.object({
//                 _id: ObjectId().required(),
//                 startTime: Joi.date().required(),
//                 endTime: Joi.date().required(),
//                 workTimeMM: Joi.number().min(1).required(),
//                 clientID: ObjectId().required(),
//             }))
//     })
//     return schema.validate(data)
// }

export default {
    
}