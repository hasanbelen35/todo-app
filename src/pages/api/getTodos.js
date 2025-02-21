import { getAllData } from '@/services/index';

// GET ALL DATA HANDLER 
export default async function handler(req, res) {
    const method = req.method;
    if (method !== 'GET') {
        return res.status(405).json({ error: "Method Dont Allow!" });
    }

    try {
        const data = await getAllData('Todo');
        if (!data || data.error || data === undefined) {
            throw new Error(data.error);
        }
        return res.status(200).json({
            success: true,
            data: data,
        })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
