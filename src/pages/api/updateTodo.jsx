import { updateData } from '@/services/index';



// UPDATE DATA FROM DB HANDLER
export default async function handler(req, res) {
    const method = req.method;
    if (method !== 'PUT') {
        return res.status(405).json({ error: "Method Not Allowed!" });
    }

    try {
        const { id, title, description } = req.body; 

        if (!id || !title || !description) {
            return res.status(400).json({ error: "ID, title, and description are required!" }); 
        }

        const data = await updateData('Todo', { id }, { title, description });

        if (!data || data.error || data === undefined) {
            throw new Error(data.error);
        }

        return res.status(200).json({
            success: true,
            message: 'Todo updated successfully',
            data: data,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
