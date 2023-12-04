const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUser = async (req, res, next) => {
    try {
        let { email, name } = req.body
        let existUser = await prisma.user.findUnique({ where: { email } })
        if (existUser) {
            return res.status(400).json({
                status: false,
                message: "bad request",
                data: "email sudah ada"
            });
        }
        let user = await prisma.user.create({
            data: {
                email: email,
                name: name,

            }
        });
        res.status(201).json({
            status: true,
            message: "created",
            data: user
        })
    } catch (error) {
        next(error);
    }

};

const getUser = async (req, res, next) => {
    try {
        let user = await prisma.user.findMany()
        if (!user || user.length === 0) {
            return res.status(400).json({
                status: false,
                message: "bad request",
                error: null
            })
        }
        res.status(200).json({
            status: true,
            message: "user all",
            data: user
        })
    } catch (error) {
        next(error)
    }
}

const getUserById = async (req, res, next) => {
    try {
        let { id } = req.params;
        let existUser = await prisma.user.findUnique({ where: { id } })
        if (!existUser) {
            return res.status(400).json({
                status: false,
                message: "bad request",
                data: "User tidak ditemukan"
            })
        }
        res.status(200).json({
            status: true,
            message: "user ditemukan",
            data: existUser
        })

    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        let { id } = req.params
        let { name, email } = req.body
        let existUser = await prisma.user.findUnique({ where: { id } })
        if (!existUser) {
            return res.status(400).json({
                status: false,
                message: "bad request",
                data: "user tidak ditemukan"
            })
        }
        let updateUser = await prisma.user.update({
            where: { id },
            data: {
                name: name,
                email: email
            }
        })
        res.status(201).json({
            status: true,
            message: "Created",
            data: updateUser
        })
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        let { id } = req.params
        let existUser = await prisma.user.findUnique({ where: { id } });
        if (!existUser) {
            return res.status(400).json({
                status: false,
                message: "bad request",
                data: "user tidak ditemukan"
            })
        }
        let user = await prisma.user.delete({ where: { id } })
        res.status(200).json({
            status: true,
            message: "delete success",
            data: user
        })
    } catch (error) {
        next(error);
    }
}

module.exports = { createUser, getUser, getUserById, updateUser, deleteUser }