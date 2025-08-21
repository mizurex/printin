// components/Checkout.tsx
type Props = {
  orderData: any;
  prevStep: () => void;
};

export default function Checkout({ orderData, prevStep }: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      <p>
        <strong>Files:</strong>{" "}
        {orderData.files.length
          ? orderData.files.map((f:any) => f.name).join(", ")
          : "No files uploaded"}
      </p>
      <p><strong>Colour:</strong> {orderData.options.colour}</p>
      <p><strong>Delivery:</strong> {orderData.service.delivery ? "Delivery" : "Pickup"}</p>
      <p><strong>Copies:</strong> {orderData.service.pickup.storeAddress}</p>
      <p><strong>Lamination:</strong> {orderData.options.lamination}</p>
      

      <div className="flex gap-2 mt-4">
        <button onClick={prevStep} className="px-4 py-2 border rounded-lg">
          Back
        </button>
        <button className="px-6 py-2 bg-green-500 text-white rounded-lg">
          Pay Now
        </button>
      </div>
    </div>
  );
}
