const logout = async (req, res) => {
    res
        .status(200)
        .clearCookie("Authorization")
        .json(
            {
                success: true,
                message: "logout successfull"
            }
        )
}

module.exports = { logout }