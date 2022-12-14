import { PaymentType } from "../schemas/apiSchemas.js";
import axios from "axios";
import _env from "../config/env.js";
import _rules from "../config/constRules.js";

async function Dispathing(payment: PaymentType) {
  let recommendation = "approve";

  const config_ML_SERVICE = {
    headers: {
      "X-Api-Key": _env.INTERN_TOKEN,
    },
  };
  const config_RULES_SERVICE = {
    headers: {
      authorization: _env.INTERN_TOKEN,
    },
  };
  await axios
    .post(_env.ML_SERVER, payment, config_ML_SERVICE)
    .then((response) => {
      const { chance } = response.data;
      if (!chance || typeof chance !== "number") {
        throw {
          type: "Tensorflow response Error!",
          message: "Tensorflow message fail!",
        };
      }

      const percentage = Math.floor(chance).toFixed(0);

      console.log(`ML-SERVICE says: the risk is ${percentage}%`);

      if (chance >= _rules.MAX_RISK_LIMIT) {
        recommendation = "Decline";
        return;
      }

      return;
    })
    .catch((error) => {
      if (_env.MODE === "TEST") {
        console.log(error);
      }
      throw {
        type: "Tensorflow Connection",
        message: "Can't connect with server!",
      };
    });

  if (recommendation === "Decline") {
    throw {
      type: "Cancel",
      transaction_id: payment.transaction_id,
      recommendation: "Decline",
      status: 406,
    };
  }

  await axios
    .post(_env.RULES_SERVER, payment, config_RULES_SERVICE)
    .then((response) => {
      const { code } = response.data;
      if (!code) {
        return;
      }
      if (code === "C1") {
        recommendation = "Decline";
        return;
      }
      return;
    })
    .catch((error) => {
      if (_env.MODE === "TEST") {
        console.log(error);
      }
      if (error.response.data.code === "C1") {
        recommendation = "Decline";
        return;
      }
      throw {
        type: "Ruby Connection",
        message: "Can't connect with server!",
      };
    });

  if (recommendation === "Decline") {
    throw {
      type: "Cancel",
      transaction_id: payment.transaction_id,
      recommendation: "Decline",
      status: 406,
    };
  }

  return;
}

export default Dispathing;
