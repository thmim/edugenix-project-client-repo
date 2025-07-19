// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import { useState } from 'react';
// import { useParams } from 'react-router';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import Loading from '../../shared/loading/Loading';



// const PaymentForm = () => {
//   const stripe = useStripe();
//   const axiosSecure = useAxiosSecure();
//   const elements = useElements();
//   const { courseId } = useParams();
//   const [error, setError] = useState('');

//   const { isPending, data: classInfo = {} } = useQuery({
//     queryKey: ["classes", courseId],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/classes/${courseId}`)
//       return res.data;
//     }
//   })

//   const amount = classInfo.price;
//   const amountInCents = amount * 100;

  
//   const { mutateAsync: createPaymentIntent, isPending: isCreatingIntent } = useMutation({
//     mutationFn: async () => {
//       const res = await axiosSecure.post('/create-payment-intent', {
//         amountInCents,
//         courseId
//       });
//       return res.data;
//     }
//   });

//   if (isPending) {
//     return <Loading></Loading>;
//   }
 

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) {
//       return;
//     }
//     const card = elements.getElement(CardElement)
//     if (!card) {
//       return;
//     }

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card
//     })
//     if (error) {
//       setError(error.message)

//     }
//     else {
//       setError('')
//       console.log('paymentMethod:', paymentMethod);

//     }
    
//     try {
//       const paymentIntentData = await createPaymentIntent();
//       console.log('Payment Intent Created:', paymentIntentData);
     
//       const clientSecret = paymentIntentData?.clientSecret;
//     if (!clientSecret) {
//       setError("No client secret received.");
//       return;
//     }

    
//     const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card,
//         billing_details: {
          
//           name: "Test User",
//           email: "test@example.com",
//         },
//       },
//     });

//     if (confirmError) {
//       setError(confirmError.message);
//       console.error("Payment confirmation failed:", confirmError);
//     } else if (paymentIntent.status === "succeeded") {
//       console.log("Payment succeeded!", paymentIntent);
      
//     }
//   } catch (err) {
//     console.error('Error during payment:', err);
//     setError("Something went wrong. Please try again.");
//   }
//   };
//   if (isPending || isCreatingIntent) {
//     return <Loading />;
//   }


//   return (
//     <div className="mt-10 p-6 bg-white shadow-md rounded-xl">
//       <form className="space-y-6" onSubmit={handleSubmit}>
//         <CardElement className='p-4 border border-gray-300 rounded-md bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500'>

//         </CardElement>
//         <button
//           type='submit'
//           className='w-full py-2 px-4 rounded-md text-white font-semibold transition duration-300 bg-blue-600 hover:bg-blue-700'
//           disabled={!stripe}>
//           Pay {amount} $
//         </button>
//         {error && <p className='text-red-500'>{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default PaymentForm;
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery, useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import Swal from 'sweetalert2';
import useAuth from '../../../hooks/UseAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../shared/loading/Loading';

const PaymentForm = () => {
  const { courseId } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');

  const { isPending, data: classInfo = {} } = useQuery({
    queryKey: ["classes", courseId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${courseId}`);
      return res.data;
    }
  });

  const createPaymentIntentMutation = useMutation({
    mutationFn: (paymentData) => axiosSecure.post('/create-payment-intent', paymentData)
  });

  const savePaymentMutation = useMutation({
    mutationFn: (paymentInfo) => axiosSecure.post('/payments', paymentInfo)
  });

  if (isPending) {
    return <Loading></Loading>;
  }
   console.log(classInfo);
  const amount = classInfo.price;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: cardError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card
    });

    if (cardError) {
      setError(cardError.message);
      return;
    } else {
      console.log('paymentMethod:', paymentMethod);
      setError('');
    }

    try {
      const res = await createPaymentIntentMutation.mutateAsync({
        amountInCents,
        courseId
      });

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email
          }
        }
      });

      if (result.error) {
        setError(result.error.message);
        console.log(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          setError('');
          console.log('Payment succeeded!');
          console.log(result);

          const paymentInfo = {
            courseId,
            transactionId: result.paymentIntent.id,
            amount,
            email: user.email,
            paymentMethod: result.paymentIntent.payment_method_types
          };

          const paymentRes = await savePaymentMutation.mutateAsync(paymentInfo);

          if (paymentRes.data.insertedId) {
            console.log('payment successfully');
            Swal.fire({
              title: 'Payment Successful!',
              text: `Thank you for your payment. Your transaction id: ${result.paymentIntent.id}.`,
              icon: 'success',
              confirmButtonText: 'OK',
              confirmButtonColor: '#3085d6',
              background: '#fff',
              color: '#333',
              customClass: {
                popup: 'rounded-xl shadow-lg'
              }
            });
            navigate('/dashboard/my-enroll-class');
          }
        }
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="mt-10 p-6 bg-white shadow-md rounded-xl">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <CardElement className="p-4 border border-gray-300 rounded-md bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500" />
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md text-white font-semibold transition duration-300 bg-blue-600 hover:bg-blue-700"
          disabled={!stripe}
        >
          Pay ${amount}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
