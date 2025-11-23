'use client';
import {useX402Fetch, useWallets} from '@privy-io/react-auth';

export function MyComponent() {
  const {wallets} = useWallets();
  const {wrapFetchWithPayment} = useX402Fetch();

  async function fetchPremiumContent() {
    console.log("Wallets:", wallets);
    // Wrap fetch with your wallet
    const fetchWithPayment = wrapFetchWithPayment({
      walletAddress: wallets[0]?.address,
      fetch,
    });

    // Use exactly like native fetch - automatically handles 402 payments
    const response = await fetchWithPayment('https://api.example.com/premium');
    const data = await response.json();

    return data;
  }

  return <button className='bg-red-500' onClick={fetchPremiumContent}>Fetch Premium Content</button>;
}