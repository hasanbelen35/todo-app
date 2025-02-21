import { deleteData } from  '@/services/index';

// DELETE DATA FROM DB HANDLER
export default async function handler(req, res) {
    const method = req.method;
    if (method !== 'DELETE') {
        return res.status(405).json({ error: "Method Not Allowed!" });
    }

    try {
        const { id } = req.body; 
        if (!id) {
            return res.status(400).json({ error: "ID is required!" });
        }

        const data = await deleteData('Todo', { id });

        if (!data || data.error || data === undefined) {
            throw new Error(data.error);
        }

        return res.status(200).json({
            success: true,
            message: 'Todo deleted successfully',
            data: data,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
