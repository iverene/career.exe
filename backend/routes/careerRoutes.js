const express = require('express');
const router = express.Router();
const { runDiagnostic } = require('../middleware/diagnosticEngine');

router.post('/', async (req, res) => {
    try {
        const { userData } = req.body;
        
        if (!userData) {
            return res.status(400).json({ error: "Invalid diagnostic data" });
        }

        const report = await runDiagnostic(userData);
        return res.status(200).json(report);
    } catch (error) {
        console.error("Diagnostic Route Error:", error);
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;