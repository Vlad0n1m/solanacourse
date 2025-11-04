'use client'
import AccountInfo from "@/components/AccountInfo";
import Transfer from "@/components/Transfer";
export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <AccountInfo />
      <Transfer />
    </div>
  );
}