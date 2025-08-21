import { useState } from "react";

type Props = {
    orderData: any;
    setOrderData: (data: any) => void;
    nextStep: () => void;
    prevStep: () => void;
};

export default function PrintOptions({ orderData, setOrderData, nextStep, prevStep }: Props) {
    const [subStep, setSubStep] = useState(1); // 👈 local step for options

    // Handle next/prev inside this component
    const nextSubStep = () => {
        if (subStep < 4) {
            setSubStep(subStep + 1);
        } else {
            nextStep(); // when finished (lamination), move to the big step
        }
    };

    const prevSubStep = () => {
        if (subStep > 1) {
            setSubStep(subStep - 1);
        } else {
            prevStep(); // if on first, go back to FileUpload
        }
    };

    return (
        <div>
            <div className="text-black">
                <div className="flex justify-center">
                    <h2 className="text-xl font-bold mb-4 text-black">What can we do for your printing?</h2>
                </div>
                <div className="flex justify-center">
                    <p>Select printing options</p>
                </div>
            </div>

            {/* Step tabs */}
            <div className="flex gap-4 mb-6 text-gray-600 justify-center">
                <span className={subStep === 1 ? "text-green-600 font-bold" : ""}>Colour</span>
                <span className={subStep === 2 ? "text-green-600 font-bold" : ""}>Sides</span>
                <span className={subStep === 3 ? "text-green-600 font-bold" : ""}>Binding</span>
                <span className={subStep === 4 ? "text-green-600 font-bold" : ""}>Lamination</span>
            </div>

            {/* Sub step 1: Colour */}
            {subStep === 1 && (
                <div className="flex gap-4 mb-4 justify-center">
                    {[
                        { label: "Black & White", img: "/brush.png" },
                        { label: "Colour", img: "/colorbrush.png" },
                    ].map((opt) => (
                        <button
                            key={opt.label}
                            className={`py-8 border rounded-lg w-40 flex flex-col items-center shadow-md ${
                                orderData.options.colour === opt.label
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-300"
                            }`}
                            onClick={() =>
                                setOrderData({
                                    ...orderData,
                                    options: { ...orderData.options, colour: opt.label },
                                })
                            }
                        >
                            <img src={opt.img} alt={opt.label} className="w-12 h-12 mb-2" />
                            <span
                                className={`font-semibold ${
                                    orderData.options.colour === opt.label
                                        ? "text-gray-900"
                                        : "text-gray-400"
                                }`}
                            >
                                {opt.label}
                            </span>
                            <input
                                type="checkbox"
                                checked={orderData.options.colour === opt.label}
                                readOnly
                                className="mt-2"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Sub step 2: Sides */}
            {subStep === 2 && (
                <div className="flex gap-4 mb-4 justify-center">
                    {[
                        { label: "Single-Sided", img: "/single.png" },
                        { label: "Double-Sided", img: "/double.png" },
                    ].map((opt) => (
                        <button
                            key={opt.label}
                            className={`py-8 border rounded-lg w-40 flex flex-col items-center shadow-md ${
                                orderData.options.sides === opt.label
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-300"
                            }`}
                            onClick={() =>
                                setOrderData({
                                    ...orderData,
                                    options: { ...orderData.options, sides: opt.label },
                                })
                            }
                        >
                            <img src={opt.img} alt={opt.label} className="w-12 h-12 mb-2" />
                            <span
                                className={`font-semibold ${
                                    orderData.options.sides === opt.label
                                        ? "text-gray-900"
                                        : "text-gray-400"
                                }`}
                            >
                                {opt.label}
                            </span>
                            <input
                                type="checkbox"
                                checked={orderData.options.sides === opt.label}
                                readOnly
                                className="mt-2"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Sub step 3: Binding */}
            {subStep === 3 && (
                <div className="flex gap-4 mb-4 justify-center">
                    {[
                        { label: "None", img: "/none.png" },
                        { label: "Binding", img: "/binding.png" },
                    ].map((opt) => (
                        <button
                            key={opt.label}
                            className={`py-8 border rounded-lg w-40 flex flex-col items-center shadow-md ${
                                orderData.options.binding === opt.label
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-300"
                            }`}
                            onClick={() =>
                                setOrderData({
                                    ...orderData,
                                    options: { ...orderData.options, binding: opt.label },
                                })
                            }
                        >
                            <img src={opt.img} alt={opt.label} className="w-12 h-12 mb-2" />
                            <span
                                className={`font-semibold ${
                                    orderData.options.binding === opt.label
                                        ? "text-gray-900"
                                        : "text-gray-400"
                                }`}
                            >
                                {opt.label}
                            </span>
                            <input
                                type="checkbox"
                                checked={orderData.options.binding === opt.label}
                                readOnly
                                className="mt-2"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Sub step 4: Lamination */}
            {subStep === 4 && (
                <div className="flex gap-4 mb-4 justify-center">
                    {[
                        { label: "None", img: "/none.png" },
                        { label: "Lamination", img: "/lamination.png" },
                    ].map((opt) => (
                        <button
                            key={opt.label}
                            className={`py-8 border rounded-lg w-40 flex flex-col items-center shadow-md ${
                                orderData.options.lamination === opt.label
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-300"
                            }`}
                            onClick={() =>
                                setOrderData({
                                    ...orderData,
                                    options: { ...orderData.options, lamination: opt.label },
                                })
                            }
                        >
                            <img src={opt.img} alt={opt.label} className="w-12 h-12 mb-2" />
                            <span
                                className={`font-semibold ${
                                    orderData.options.lamination === opt.label
                                        ? "text-gray-900"
                                        : "text-gray-400"
                                }`}
                            >
                                {opt.label}
                            </span>
                            <input
                                type="checkbox"
                                checked={orderData.options.lamination === opt.label}
                                readOnly
                                className="mt-2"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Navigation */}
            <div className="flex gap-2 mt-4">
                <button onClick={prevSubStep} className="px-4 py-2 border rounded-lg">
                    Back
                </button>
                <button onClick={nextSubStep} className="px-6 py-2 bg-green-500 text-white rounded-lg">
                    {subStep === 4 ? "Next" : "Continue"}
                </button>
            </div>
        </div>
    );
}
