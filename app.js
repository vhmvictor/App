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
        "cf_orders_count": req.body.orders_count,
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
    console.log(create_customer);
    return res.status(200).send('Ok');
  } catch(error) {
    return res.status(500).send('Erro ao criar a lead.');
  }
})
//
app.post("/checkouts/create", async (req, res, next) => {
    console.log(req.body);
    return res.status(200).send('Ok');
});
//
app.post("/orders/create", async (req, res, next) => {
  console.log(req.body);
  /*
  try {
    let order = [];
    let created_lead = [];
    let last_order = await axios({
        method: "GET", 
        url: "https://" + process.env.API_KEY + ":" + process.env.API_PASSWORD + "@" + process.env.API_SHOP + "/admin/api/2020-10/orders/" + req.body.id + ".json",
    });
    //
    order.push(last_order);
    //
    order.forEach((obj) => {
      created_lead.push({
        "event_type": "CONVERSION",
        "event_family":"CDP",
        "payload": {
          "conversion_identifier": "Pagamento-Pendente",
          "name": obj.customer.name,
          "email": obj.customer.email,
          "job_title": "",
          "state": obj.customer.billing_province,
          "city": obj.customer.billing_city,
          "country": obj.customer.billing_country,
          "personal_phone": "",
          "mobile_phone": obj.customer.phone,
          "cf_price": obj.total,
          "cf_order_payment_method": obj.payment_details.method,
          "cf_status": "pendente",
          "cf_order_id": JSON.stringify(obj.id),
          "twitter": "",
          "facebook": "",
          "linkedin": "",
          "website": "",
          "cf_custom_field_api_identifier": JSON.stringify(obj.customer.identification),
          "company_name": "",
          "company_site": "",
          "company_address": "",
          "client_tracking_id": JSON.stringify(obj.customer.id),
          "traffic_source": "Nuvemshop",
          "traffic_medium": "",
          "traffic_campaign": "",
          "traffic_value": "",
          "tags": ["nuvemshop", "rocklola"],
          "available_for_mailing": true,
        }
      });
      if(obj.payment_details.method == "credit_card") created_lead[0].payload.cf_order_payment_method = "Cartão de Crédito"
      else if(obj.payment_details.method == "offline") created_lead[0].payload.cf_order_payment_method = "Boleto"
    });
    //
    console.log(created_lead);
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
    created_lead.forEach(async (item) => {
      console.log(item)
      let req = await axios({ method: 'POST', url: process.env.RD_LEAD_URL,
        headers: {
          "Authorization": "Bearer " + authentication.data.access_token,
          "Content-Type": "application/json"
        },
        data: item
      });
    });
    return res.status(200).send('Lead criada com sucesso.');
  } catch (error) {
      return res.status(500).send('Erro ao criar a lead.');
  }
  */
 return res.status(200).send('Ok');
})
//
app.post("/orders/paid", async (req, res, next) => {
  console.log(req.body);
  /*
  try {
    nuvemshop.config({
      store_id: process.env.STORE_ID,
      access_token: process.env.ACCESS_TOKEN,
      user_agent: process.env.USER_AGENT
    });
    let order = [];
    order.push(await nuvemshop.getOrder(req.body.id));
    let created_lead = [];
    let lead_paid_order = [];
    order.forEach((obj) => {
      created_lead.push({
        "event_type": "CONVERSION",
        "event_family":"CDP",
        "payload": {
          "conversion_identifier": "Pagamento-Finalizado",
          "name": obj.customer.name,
          "email": obj.customer.email,
          "job_title": "",
          "state": obj.customer.billing_province,
          "city": obj.customer.billing_city,
          "country": obj.customer.billing_country,
          "personal_phone": "",
          "mobile_phone": obj.customer.phone,
          "cf_price": obj.total,
          "cf_order_payment_method": "",
          "cf_status": "aprovado",
          "cf_order_id": JSON.stringify(obj.id),
          "twitter": "",
          "facebook": "",
          "linkedin": "",
          "website": "",
          "cf_custom_field_api_identifier": JSON.stringify(obj.customer.identification),
          "company_name": "",
          "company_site": "",
          "company_address": "",
          "client_tracking_id": JSON.stringify(obj.customer.id),
          "traffic_source": "Nuvemshop",
          "traffic_medium": "",
          "traffic_campaign": "",
          "traffic_value": "",
          "tags": ["nuvemshop", "processo-concluído", "rocklola"],
          "available_for_mailing": true,
        }
      });
      if(obj.payment_details.method == "credit_card") created_lead[0].payload.cf_order_payment_method = "Cartão de Crédito"
      else if(obj.payment_details.method == "offline") created_lead[0].payload.cf_order_payment_method = "Boleto"
      lead_paid_order.push({
        "event_type": "SALE",
        "event_family":"CDP",
        "payload": {
          "email": obj.customer.email,
          "funnel_name": "default",
          "value": parseFloat(obj.total)
        }
      });
    });
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
    console.log(created_lead);
    //
    created_lead.forEach(async (item) => {
      console.log(item)
      let request = await axios({ method: 'POST', url: process.env.RD_LEAD_URL,
        headers: {
          "Authorization": "Bearer " + authentication.data.access_token,
          "Content-Type": "application/json"
        },
        data: item
      });
    });
    lead_paid_order.forEach(async (item) => {
      console.log(item)
      let request = await axios({ method: 'POST', url: process.env.RD_LEAD_URL,
        headers: {
          "Authorization": "Bearer " + authentication.data.access_token,
          "Content-Type": "application/json"
        },
        data: item
      });
    });
    return res.status(200).send('Lead criada com sucesso.');
  } catch (error) {
      return res.status(500).send('Erro ao criar a lead.');
  }
  */
  return res.status(200).send('Ok');
})
//
app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor iniciado!");
});