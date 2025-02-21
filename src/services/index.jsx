import prisma from '@/lib/prisma';

// tableName = table name to push
// where = the key name of data that will be push
//newData = the datas that will be update or push



// GET ALL DATA FROM DB
export const getAllData = async (tableName) => {
    try {
        const data = await prisma[tableName].findMany();
        return data;
    } catch (error) {
        return { error: error.message };
    }
};

// POST DATA TO DB
export const postData = async (tableName, newData) => {
    try {
        const data = await prisma[tableName].create({
            data: newData,
        });
        return data;
    } catch (error) {
        return { error: error.message };
    }
};

// DELETE DATA FROM DB 
export const deleteData = async (tableName, where) => { 
    try {
        const data = await prisma[tableName].delete({
            where: where,
        });
        return data;
    } catch (error) {
        return { error: error.message };
    }
};

// UPDATE DATA FROM DB
export const updateData = async (tableName, where, newData) => { 
    try {
        const data = await prisma[tableName].update({
            where: where,
            data: newData,
        });
        return data;
    } catch (error) {
        return { error: error.message };
    }
};