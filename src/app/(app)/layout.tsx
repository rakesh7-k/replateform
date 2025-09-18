
import Header from '@/components/common/header';
import { DonationProvider } from '@/context/DonationContext';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <DonationProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </DonationProvider>
  );
}
