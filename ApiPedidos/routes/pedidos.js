var express = require('express');
var func = require('../Mongo/CRUD');
var router = express.Router();

/* GET users listing. */
router.get('/',function(req, res, next) {
    func.listPedido().then(response => {
          res.status(200).json(response);
      }).catch(error => {
        console.log(error);
        res.status(500).json({message:"Ohhh ha ocurrido un error :c!"});
      });
});


router.post('/SaveOrder', function (req, res, next) {
    if (req.headers["content-type"] == 'application/json') {
        func.SavePedido(req.body).then(response => {
                if (response.result.n > 0) {
                    res.status(201).send();
                } else {
                    res.status(404).json({message:"No se pudo guardar el pedido"});
                }
            }).catch(error => {
                console.log(error);
                res.status(500).json({message:"Ohhh ha ocurrido un error en el servidor"});
            });
    } else {
        res.status(404).json({message:"No se pudo guardar el pedido"});
    }
});


router.delete('/:id',function(req, res, next){
    func.DeletePedido(req.params.id).then(response => {
		if (response.result.n > 0) {
			res.status(204).send();
		} else {
			res.status(404).json({message:"No se encontro la Orden"});
		}
	}).catch( error => {
        console.log(error);
        res.status(500).json({message:"Ohhh ha ocurrido un error :c!"});
    });
});
module.exports = router;
