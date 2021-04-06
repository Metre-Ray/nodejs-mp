import Joi from "joi";

const errorResponse = (schemaErrors: Joi.ValidationErrorItem[]) => {
    const errors = schemaErrors.map(error => {
        const { path, message } = error;
        return { path, message };
    });
    return {
        status: 'failed',
        errors,
    };
}

export { errorResponse };
