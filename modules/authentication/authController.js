const prisma = require("../../utils/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {jwtTokens} = require("../../utils/jwt-helpers")

const userLogin = async (req, res) => {
    /*
    Body:
        {
            "email": Str,
            "password": Str
        }
    

    Response:
        {
            "accessToken": Str,
            "refreshToken": Str
}
    */
    try {
        const { email, password } = req.body;
        const findEmail = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!findEmail) {
            return res.status(400).json({ message: "Email is incorrect." });
        }

        // Password Check
        const validPassword = await bcrypt.compare(password, findEmail.password);
        if (!validPassword) {
            return res.status(401).json({ error: "Incorrect password." });
        }

        // JWT 
        let tokens = jwtTokens(findEmail);
        res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
        res.json(tokens);

    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = {
    userLogin
};
    