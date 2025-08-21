// components/OrderStepper.tsx
type Props = { step: number };

export default function OrderStepper({ step }: Props) {
  const steps = ["Files", "Options", "Service", "Checkout"];

  return (
    <div className="flex justify-between mb-6">
      {steps.map((label, i) => (
        <div key={i} className="flex-1 text-center">
          <div
            className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-white 
              ${step >= i + 1 ? "bg-green-500" : "bg-gray-300"}`}
          >
            {i + 1}
          </div>
          <p className="mt-1 text-sm">{label}</p>
        </div>
      ))}
    </div>
  );
}
