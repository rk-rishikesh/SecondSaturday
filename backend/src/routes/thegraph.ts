import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/thegraph/players-registered', async (req, res) => {
    try {
        const response = await axios.post(
            'https://api.studio.thegraph.com/query/85163/secondsaturday/version/latest',
            {
                query: `
                    {
                        playerRegistered1S {
                            blockNumber
                            blockTimestamp
                            id
                            player
                            transactionHash
                        }
                    }
                `,
                operationName: "Subgraphs",
                variables: {}
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from The Graph API:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

router.get('/thegraph/players-jailed', async (req, res) => {
    try {
        const response = await axios.post(
            'https://api.studio.thegraph.com/query/85163/secondsaturday/version/latest',
            {
                query: `
                    {
                        playerJailed1S {
                            blockNumber
                            blockTimestamp
                            id
                            player
                            transactionHash
                        }
                    }
                `,
                operationName: "Subgraphs",
                variables: {}
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from The Graph API:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

router.get('/thegraph/properties-purchased/:player', async (req, res) => {
    const { player } = req.params;
    try {
        const response = await axios.post(
            'https://api.studio.thegraph.com/query/85163/secondsaturday/version/latest',
            {
                query: `
                        {
                            propertyPurchased1S(
                            where: {player: "${player}"}
                        ) {
                            blockNumber
                            blockTimestamp
                            cardId
                            id
                            player
                            transactionHash
                        }
                    }
                `,
                operationName: "Subgraphs",
                variables: { player }
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from The Graph API:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

export default router;
