module.exports = {
    // todo remove test
    user: (id, req) => {
        console.log('@@@@@@@@@')
        console.log(id)
        console.log(req.user)
        return { id: "testid", username: "alan" }
    }
}