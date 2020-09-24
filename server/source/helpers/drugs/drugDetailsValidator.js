class DrugDetailsValidator {
    static validate = (attributes) => {
        const errorMessages = new Set();
        const { name, expiryDate } = attributes;

        const verify = () => {
            Object.keys(attributes).forEach((attrb) => {
                if (!attributes[attrb]) {
                    errorMessages.add(`${attrb} is required`);
                }
            });

            if (name.length > 100) {
                errorMessages.add(
                    'drug name cannot have more than 100 characters'
                );
            }

            if (Date.parse(expiryDate) < Date.now()) {
                errorMessages.add('drug has been expired');
            }
        };

        verify();

        if (errorMessages.size) {
            return { valid: false, errors: [...errorMessages] };
        }

        return { valid: true };
    };
}

module.exports = DrugDetailsValidator;
