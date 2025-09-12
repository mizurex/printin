import { create } from "zustand";

interface FileData {
  url: string;
  type: string;
}

interface DeliveryDetails {
  name: string;
  address: string;
  city: string;
  postal: string;
  email: string;
  phone: string;
  date?: string;
}

interface PickupDetails {
  store_id: string;
  store_name: string;
  store_addr: string;
  lat: number;
  lng: number;
  date?: string;
}

interface OrderData {
  files: FileData;
  options: {
    colour: string;
    sides: string;
    binding: string;
    lamination: string;
  };
  service: {
    method: "delivery" | "pickup";
    delivery?: DeliveryDetails;
    pickup?: PickupDetails;
  };
  copies: number;
  totalAmount: number;
}

interface OrderStore {
  step: number;
  orderData: OrderData;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  setOrderData: (data: Partial<OrderData>) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  step: 1,
  orderData: {
    files: {
      url: "",
      type: "",
    },
    options: {
      colour: "Black & White",
      sides: "Single-Sided",
      binding: "None",
      lamination: "None",
    },
    service: {
      method: "delivery",
      delivery: {
        name: "",
        address: "",
        city: "",
        postal: "",
        email: "",
        phone: "",
      },
      pickup: {
        store_id: "",
        store_name: "",
        store_addr: "",
        lat: 0,
        lng: 0,
      },
    },
    copies: 1,
    totalAmount: 0,
  },
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 4) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
  setStep: (step) => set({ step }),
  setOrderData: (data) =>
    set((state) => ({
      orderData: { ...state.orderData, ...data },
    })),
}));
