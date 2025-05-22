import axios from 'axios';

const PaymentBTN = ({ amount }) => {
  const handlePayment = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/payment/create-order", { amount });

      const options = {
        key: res.data.key,
        amount: res.data.amount,
        currency: res.data.currency,
        name: "Strong Spark",
        description: "Test Payment",
        order_id: res.data.orderId,
        handler: function (response) {
          alert("Payment Successful!");
          console.log(response);
        },
        theme: { color: "#2C6EE0" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
    //   alert("Payment Failed");
    console.log(Response);
    
    }
  };

  return <button onClick={handlePayment}>Pay ₹{amount}</button>;
};

export default PaymentBTN;
