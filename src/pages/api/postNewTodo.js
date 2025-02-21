import { postData } from  '@/services/index';

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { title, description } = req.body;

        if (!title || !description || title === "" || description === "") {
            return res.status(400).json({ error: "Title and descriptionis required" });
        }
        
        try {
            const newTodo = await postData("Todo", { title, description });
            return res.status(201).json({ success: true, data: newTodo });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    res.status(405).json({ error: "Method Not Allowed" });
}
