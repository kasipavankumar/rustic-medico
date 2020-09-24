const pool = require('../../database');

class DrugsQueryManager {
    getAllDrugs = async (req, res) => {
        try {
            const query = 'select * from drugs;';
            const { rows } = await pool.query(query);

            if (!rows.length) {
                return res.status(400).json({ msg: 'no records found' });
            }

            return res.status(200).json({ drugs: rows });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ err });
        }
    };

    getDrugByName = async (res, name) => {
        try {
            const query = 'select * from drugs where name = $1;';
            const { rows } = await pool.query(query, [name]);

            if (!rows) {
                return res.status(400).json({ msg: 'no records found' });
            }

            return res.status(200).json({ drug: rows });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ err });
        }
    };

    getDrugById = async (res, id) => {
        try {
            const query = 'select * from drugs where id = $1;';
            const { rows } = await pool.query(query, [id]);

            if (!rows) {
                return res.status(400).json({ msg: 'no records found' });
            }

            return res.status(200).json({ drug: rows });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ err });
        }
    };

    getOneDrug = async (req, res) => {
        try {
            const { id, name } = req.query;

            if (id) return this.getDrugById(res, id);
            if (name) return this.getDrugByName(res, name);

            return res.status(404).end();
        } catch (err) {
            console.error(err);
            return res.status(500).json({ err });
        }
    };
}

module.exports = DrugsQueryManager;
