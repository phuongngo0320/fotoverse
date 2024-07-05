export const validator = {
    required: {
        check: (field) => field.value,
        message: "This field is required"
    },
    length: (min, max) => { return {
        check: (field) => field.value.length >= min && field.value.length <= max,
        message: `Length must be between ${min} and ${max}`
    }},
    email: {
        check: (field) => field.value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        message: "Invalid email pattern"
    },
    photo: {
        check: (field) => field.files.length,
        message: "Please select a photo"
    }
}

export function validate(fcon, error, validator) {
    if (!validator.check(fcon)) {
        error.textContent = validator.message;
        return false;
    } else {
        error.textContent = "";
        return true;
    }
}
