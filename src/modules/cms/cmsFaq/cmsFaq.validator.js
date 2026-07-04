import * as yup from "yup";
export const createCmsFaqSchema = yup.object({
    questionPl: yup.string().required("Question PL is required"),
    questionEn: yup.string().required("Question EN is required"),
    answerPl: yup.string().required("Answer PL is required"),
    answerEn: yup.string().required("Answer EN is required"),
    order: yup.number().integer().default(0),
    isActive: yup.boolean().default(true),
});
export const updateCmsFaqSchema = yup.object({
    questionPl: yup.string().optional(),
    questionEn: yup.string().optional(),
    answerPl: yup.string().optional(),
    answerEn: yup.string().optional(),
    order: yup.number().integer().optional(),
    isActive: yup.boolean().optional(),
});
export const cmsFaqParamsSchema = yup.object({
    id: yup.string().uuid("Invalid ID format").required("ID is required"),
});
