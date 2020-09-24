const pool = require('../../database');
const DrugDetailsValidator = require('../../helpers/drugs/drugDetailsValidator');

class DrugsCreationManager {
    addDrug = async (req, res) => {
        try {
            const {
                drug: { name, price, expiryDate, manufacturerName, supplierName },
            } = req.body;

            const validation = DrugDetailsValidator.validate(req.body.drug);

            if (!validation.valid) {
                return res.status(400).json({ errors: [...validation.errors] });
            }

            const attributes = '(name, price, expiry_date, manufacturer_name, supplier_name)';
            const query = `insert into drugs ${attributes} values ($1, $2, $3, $4, $5);`;
            const params = [name, price, expiryDate, manufacturerName, supplierName];

            const executedStatement = await pool.query(query, params);

            if (executedStatement.rowCount === 1) {
                return res.status(200).json({ msg: 'inserted drug in database' });
            }

            // return res.status(200).json({ msg: 'yet to add in db' });
        } catch (err) {
            console.error(err);

            // Drug already exists
            if (err.code === '23505') {
                return res.status(400).json({ error: 'drug already exists' });
            }

            return res.status(500).json({ error: err.detail });
        }
    };
}

module.exports = DrugsCreationManager;
