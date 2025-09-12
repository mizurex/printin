import Link from "next/link";

export default function SuccessPage() {
  return <div>
    Success
    <div>
        <Link href="/">
        <button>
             back to home
        </button>
        </Link>
    </div>
    </div>;
}