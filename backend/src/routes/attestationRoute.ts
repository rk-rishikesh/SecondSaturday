import express, { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import trueNetworkRepository from '../repository/trueNetworkRepository';

const router = express.Router();

router.post('/attest', async (req: any, res: any) => {
    try {
        const { address, score, playerId, gameName } = req.body;

        // Validate required fields
        if (!address || !score || !playerId || !gameName) {
            return res.status(400).json({
                error: 'Missing required fields: address, score, playerId, and gameName are required'
            });
        }

        const result = await trueNetworkRepository.attestGamePlayToUser(
            address,
            score,
            playerId,
            gameName
        );

        res.status(200).json({
            success: true,
            result: result
        });

    } catch (error) {
        console.error('Error attesting gameplay:', error);
        res.status(500).json({
            error: 'Failed to attest gameplay',
            details: error
        });
    }
});

export default router;