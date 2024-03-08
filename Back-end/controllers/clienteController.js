const { getService, postService, putService, deleteService,getFilterService, routeService } = require('../services/clienteService')

const getController = async (req, res) => {
  const serviceGet = await getService();

  return res.status(200).json(serviceGet)

}

const filterController = async (req, res) => {
  const serviceGet = await getFilterService(req.params.nome);

  return res.status(200).json(serviceGet)

}

const postController = async (req, res) => {
  if (!req.body) {
    res.status(400).json({ "error": "body sem dados!" })
    return
  }

  const resService = await postService(req.body)
  if (resService.success == "true") {
    return res.status(200).json(resService)
  } else {
    return res.status(500).json(resService)
  }
}

const putController = async (req, res) => {
  if (!req.body.id) {
    res.status(400).json({ "error": "ID não informado!" })
    return
  }

  const putResService = await putService(req.body)
  if (putResService.success == "true") {
    return res.status(200).json(putResService)
  } else {
    return res.status(500).json(putResService)
  }
}

const deleteController = async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ "error": "ID não informado!" })
    return
  }

  const deleteResService = await deleteService(req.params.id)
  if (deleteResService.success == "true") {
    return res.status(200).json(deleteResService)
  } else {
    return res.status(500).json(deleteResService)
  }
}

const routeController = async (req, res) => {
  const service = await routeService()
  return res.status(200).json(service)
}

module.exports = { getController, postController, putController, deleteController, filterController, routeController }