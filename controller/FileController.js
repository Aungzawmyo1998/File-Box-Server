

const fileGet = async(req, res) => {
    // console.log(req.headers["authorization"])
    res.json("File List")
}

const fileUpload = async(req, res) => {

}

const fileDownload = async (req, res) => {

}

module.exports = {
    fileGet,
    fileUpload,
    fileDownload
}