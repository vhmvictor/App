const axios = require('axios');
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());
app.use(cors());

//TESTE DO SERVIDOR
app.get("/hello", (request, response) => {
    response.json({ message: 'Hello, Anna Prata!' })
});
//
app.post("/customers/create", async (req, res, next) => {
  try {
    console.log(req.body);
    //
    let customer;
    customer = {
      "event_type": "CONVERSION",
      "event_family":"CDP",
      "payload": {
        "conversion_identifier": "Novo-Cadastro",
        "name": req.body.first_name + " " + req.body.last_name,
        "email": req.body.email,
        "job_title": "",
        "state": "",
        "city": "",
        "country": "",
        "personal_phone": "",
        "mobile_phone": req.body.phone,
        "cf_orders_count": JSON.stringify(req.body.orders_count),
        "cf_total_spent": req.body.total_spent,
        "twitter": "",
        "facebook": "",
        "linkedin": "",
        "website": "",
        "company_name": "",
        "company_site": "",
        "company_address": "",
        "client_tracking_id": "",
        "traffic_source": "",
        "traffic_medium": "",
        "traffic_campaign": "",
        "traffic_value": "",
        "tags": [""],
        "available_for_mailing": true,
      }
    }
    console.log(customer);
    // 
    let authentication = await axios({ method: 'POST', url: process.env.RD_AUTH_URL,
      header: {
        "Content-Type": "application/json"
      },
      data: {
        "client_id": process.env.RD_CLIENT_ID,
        "client_secret": process.env.RD_CLIENT_SECRET,
        "refresh_token": process.env.RD_REFLESH_TOKEN
      }
    });
    //
    let create_customer = await axios({ method: 'POST', url: process.env.RD_LEAD_URL,
      headers: {
        "Authorization": "Bearer " + authentication.data.access_token,
        "Content-Type": "application/json"
      },
      data: customer
    });
    console.log(create_customer.data);
    return res.status(200).send('Ok');
  } catch(error) {
    return res.status(500).send('Erro ao criar a lead.');
  }
})
//
app.post("/checkouts/create", async (req, res, next) => {
  try {
    console.log(req.body);
    //
    let checkout;
    checkout = {
      "event_type": "CONVERSION",
      "event_family":"CDP",
      "payload": {
        "conversion_identifier": "Carrinho-Abandonado",
        "name": req.body.customer.first_name + " " + req.body.customer.last_name,
        "email": req.body.email,
        "job_title": "",
        "state": req.body.customer.default_address.province,
        "city": req.body.customer.default_address.city,
        "country": req.body.customer.default_address.country,
        "personal_phone": req.body.customer.default_address.phone,
        "mobile_phone": req.body.customer.phone,
        "cf_orders_count": JSON.stringify(req.body.customer.orders_count),
        "cf_total_spent": req.body.customer.total_spent,
        "cf_checkout_url": req.body.abandoned_checkout_url, 
        "twitter": "",
        "facebook": "",
        "linkedin": "",
        "website": "",
        "company_name": "",
        "company_site": "",
        "company_address": "",
        "client_tracking_id": "",
        "traffic_source": req.body.referring_site,
        "traffic_medium": "",
        "traffic_campaign": "",
        "traffic_value": "",
        "tags": ["carrinho-abandonado"],
        "available_for_mailing": true,
      }
    }
    console.log(checkout);
    // 
    let authentication = await axios({ method: 'POST', url: process.env.RD_AUTH_URL,
      header: {
        "Content-Type": "application/json"
      },
      data: {
        "client_id": process.env.RD_CLIENT_ID,
        "client_secret": process.env.RD_CLIENT_SECRET,
        "refresh_token": process.env.RD_REFLESH_TOKEN
      }
    });
    //
    let create_checkout = await axios({ method: 'POST', url: process.env.RD_LEAD_URL,
      headers: {
        "Authorization": "Bearer " + authentication.data.access_token,
        "Content-Type": "application/json"
      },
      data: checkout
    });
    console.log(create_checkout.data);
    return res.status(200).send('Ok');
  } catch(error) {
    return res.status(500).send('Erro ao criar a lead.');
  }
});
//
app.post("/orders/create", async (req, res, next) => {
  try {
    console.log(req.body);
    //
    let order_create;
    order_create = {
      "event_type": "CONVERSION",
      "event_family":"CDP",
      "payload": {
        "conversion_identifier": "Pagamento-Pendente",
        "name": req.body.customer.first_name + " " + req.body.customer.last_name,
        "email": req.body.email,
        "job_title": "",
        "state": req.body.customer.default_address.province,
        "city": req.body.customer.default_address.city,
        "country": req.body.customer.default_address.country,
        "personal_phone": req.body.customer.default_address.phone,
        "mobile_phone": req.body.customer.phone,
        "cf_orders_count": JSON.stringify(req.body.customer.orders_count),
        "cf_total_spent": req.body.customer.total_spent,
        "cf_checkout_url": "",
        "cf_order_status_url": req.body.order_status_url, 
        "twitter": "",
        "facebook": "",
        "linkedin": "",
        "website": "",
        "company_name": "",
        "company_site": "",
        "company_address": "",
        "client_tracking_id": "",
        "traffic_source": req.body.referring_site,
        "traffic_medium": "",
        "traffic_campaign": "",
        "traffic_value": "",
        "tags": ["shopify", "anna-prata"],
        "available_for_mailing": true,
      }
    }
    console.log(order_create);
    // 
    let authentication = await axios({ method: 'POST', url: process.env.RD_AUTH_URL,
      header: {
        "Content-Type": "application/json"
      },
      data: {
        "client_id": process.env.RD_CLIENT_ID,
        "client_secret": process.env.RD_CLIENT_SECRET,
        "refresh_token": process.env.RD_REFLESH_TOKEN
      }
    });
    //
    let create_order = await axios({ method: 'POST', url: process.env.RD_LEAD_URL,
      headers: {
        "Authorization": "Bearer " + authentication.data.access_token,
        "Content-Type": "application/json"
      },
      data: order_create
    });
    console.log(create_order.data);
    return res.status(200).send('Ok');
  } catch(error) {
    return res.status(500).send('Erro ao criar a lead.');
  }
})
//
app.post("/orders/paid", async (req, res, next) => {
  try {
    console.log(req.body);
    //
    let order_paid;
    let sale;
    order_paid = {
      "event_type": "CONVERSION",
      "event_family":"CDP",
      "payload": {
        "conversion_identifier": "Pagamento-Finalizado",
        "name": req.body.customer.first_name + " " + req.body.customer.last_name,
        "email": req.body.email,
        "job_title": "",
        "state": req.body.customer.default_address.province,
        "city": req.body.customer.default_address.city,
        "country": req.body.customer.default_address.country,
        "personal_phone": req.body.customer.default_address.phone,
        "mobile_phone": req.body.customer.phone,
        "cf_orders_count": JSON.stringify(req.body.customer.orders_count),
        "cf_total_spent": req.body.customer.total_spent,
        "cf_checkout_url": "",
        "cf_order_status_url": req.body.order_status_url,
        "cf_order_price": req.body.total_price,
        "twitter": "",
        "facebook": "",
        "linkedin": "",
        "website": "",
        "company_name": "",
        "company_site": "",
        "company_address": "",
        "client_tracking_id": "",
        "traffic_source": req.body.referring_site,
        "traffic_medium": "",
        "traffic_campaign": "",
        "traffic_value": "",
        "tags": ["processo-concluído"],
        "available_for_mailing": true,
      }
    }
    console.log(order_paid);
    //
    sale = {
      "event_type": "SALE",
      "event_family":"CDP",
      "payload": {
        "email": req.body.customer.email,
        "funnel_name": "default",
        "value": parseFloat(req.body.total_price)
      }
    };
    console.log(sale);
    // 
    let authentication = await axios({ method: 'POST', url: process.env.RD_AUTH_URL,
      header: {
        "Content-Type": "application/json"
      },
      data: {
        "client_id": process.env.RD_CLIENT_ID,
        "client_secret": process.env.RD_CLIENT_SECRET,
        "refresh_token": process.env.RD_REFLESH_TOKEN
      }
    });
    //
    let create_order = await axios({ method: 'POST', url: process.env.RD_LEAD_URL,
      headers: {
        "Authorization": "Bearer " + authentication.data.access_token,
        "Content-Type": "application/json"
      },
      data: order_paid
    });
    console.log(create_order.data);
    //
    let create_sale = await axios({ method: 'POST', url: process.env.RD_LEAD_URL,
      headers: {
        "Authorization": "Bearer " + authentication.data.access_token,
        "Content-Type": "application/json"
      },
      data: sale
    });
    console.log(create_sale.data);
    return res.status(200).send('Ok');
  } catch(error) {
    return res.status(500).send('Erro ao criar a lead.');
  }
})
//
app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor iniciado!");
});