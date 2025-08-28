import OrderNav from "@/components/order/OrderNav";

export default function Layout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    return(
        <main>
            
           {children} 
        </main>
        
    )
}