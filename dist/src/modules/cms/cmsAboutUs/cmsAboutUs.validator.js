import * as yup from "yup";
export const aboutUsSchema = yup.object().shape({
    titlePl: yup.string().required("Title PL is required").trim(),
    titleEn: yup.string().required("Title EN is required").trim(),
    subtitlePl: yup.string().required("Subtitle PL is required").trim(),
    subtitleEn: yup.string().required("Subtitle EN is required").trim(),
    feature1Icon: yup.string().required("Feature 1 icon is required").trim(),
    feature1TitlePl: yup
        .string()
        .required("Feature 1 title PL is required")
        .trim(),
    feature1TitleEn: yup
        .string()
        .required("Feature 1 title EN is required")
        .trim(),
    feature1DescPl: yup
        .string()
        .required("Feature 1 description PL is required")
        .trim(),
    feature1DescEn: yup
        .string()
        .required("Feature 1 description EN is required")
        .trim(),
    feature2Icon: yup.string().required("Feature 2 icon is required").trim(),
    feature2TitlePl: yup
        .string()
        .required("Feature 2 title PL is required")
        .trim(),
    feature2TitleEn: yup
        .string()
        .required("Feature 2 title EN is required")
        .trim(),
    feature2DescPl: yup
        .string()
        .required("Feature 2 description PL is required")
        .trim(),
    feature2DescEn: yup
        .string()
        .required("Feature 2 description EN is required")
        .trim(),
    ctaTextPl: yup.string().required("CTA text PL is required").trim(),
    ctaTextEn: yup.string().required("CTA text EN is required").trim(),
    ctaLink: yup.string().required("CTA link is required").trim(),
    image1Url: yup.string().required("Image 1 URL is required").trim(),
    image2Url: yup.string().required("Image 2 URL is required").trim(),
});
export const validateAboutUs = async (req, res, next) => {
    try {
        // abortEarly: false ensures all validation errors are collected, not just the first one
        await aboutUsSchema.validate(req.body, { abortEarly: false });
        next();
    }
    catch (error) {
        if (error.name === "ValidationError") {
            const errorMessage = error.inner
                .map((err) => err.message)
                .join(", ");
            return res.status(400).json({
                success: false,
                message: errorMessage,
            });
        }
        next(error);
    }
};
