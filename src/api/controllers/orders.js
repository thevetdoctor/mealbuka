// api/controllers/orders.js
import models from '../models';

const ordersController = {

  makeOrder: (req, res) => {
    const order = {
      id: null,
      userId: req.body.userId,
      mealId: req.body.mealId,
      date: new Date().toDateString(),
      confirmed: false,
    };

    models.Order.findAll()
      .then((response) => {
        const ordersIds = response.map(value => value.id);
        const lastOrderId = Math.max(...ordersIds);
        order.id = lastOrderId + 1;

        if (order.userId === undefined || order.mealId === undefined) {
          res.status(400).json({
            status: 400,
            data: {
              message: 'Order incomplete',
            },
          });
        } else {
          models.Order.create(order)
            .then((result) => {
              if (result) {
                res.status(200).json({
                  status: 200,
                  data: order,
                  message: `Order ${order.id} created`,
                });
              } else {
                res.status(400).json({
                  status: 400,
                  error: 'Not successful',
                });
              }
            });
        }
      });
  },


  getOrders: (req, res) => {
    models.Order.findAll({ where: { date: new Date().toDateString() } })
      .then((orders) => {
        if (orders.length > 0) {
          res.status(200).json({
            status: 200,
            data: orders,
            message: 'Orders displayed for today',
          });
        } else {
          res.status(400).json({
            status: 400,
            error: 'No orders available',
          });
        }
      });
  },


  getSpecificOrders: (req, res) => {
    const id = parseInt(req.params.id, 10);
    models.Order.findAll({ where: { userId: id } })
      .then((orders) => {
        if (orders.length > 0) {
          res.status(200).json({
            status: 200,
            data: orders,
            message: `Orders displayed for userId ${id}`,
          });
        } else {
          res.status(400).json({
            status: 400,
            error: 'No orders available',
          });
        }
      });
  },

  modifyOrder: (req, res) => {
    const orderId = parseInt(req.params.id, 10);
    const meal = req.body.mealId;

    if (!req.params.id || req.params.id === '') {
      res.status(400).json({
        status: 'orderId not supplied',
      });
    }

    if (req.body.mealId === undefined && req.body.mealId === '') {
      res.status(400).json({
        status: 400,
        error: 'Order not modified',
      });
    } else {
      models.Order.update({ mealId: meal }, { where: { id: orderId } }, { returning: true })
        .then((response) => {
          if (response[0] === 1) {
            res.status(200).json({
              status: 200,
              data: response,
              message: 'Order updated',
            });
          } else {
            res.status(400).json({
              status: 400,
              error: `Order id ${orderId} not updated`,
            });
          }
        });
    }
  },


  deleteOrder: (req, res) => {
    const orderId = parseInt(req.params.id, 10);

    if (!req.params.id || req.params.id === '') {
      res.status(400).json({
        status: 'orderId not supplied',
      });
    } else {
      models.Order.destroy({ where: { id: orderId } })
        .then((response) => {
          if (response > 0) {
            res.status(200).json({
              status: 200,
              data: response,
              message: 'Order deleted',
            });
          } else {
            res.status(400).json({
              status: 400,
              error: `Order id ${orderId} not deleted`,
            });
          }
        });
    }
  },


  confirmOrders: (req, res) => {
    if (!req.params.id || req.params.id === '') {
      res.status(400).json({
        status: 'orderId not supplied',
      });
    } else {
      models.Order.update({ confirmed: true }, { where: { id: orderId } })
        .then((response) => {
          if (response > 0) {
            res.status(200).json({
              status: 200,
              data: response,
              message: 'Order deleted',
            });
          } else {
            res.status(400).json({
              status: 400,
              error: 'Orders confirmed',
            });
          }
        });
    }
  },
};

export default ordersController;
