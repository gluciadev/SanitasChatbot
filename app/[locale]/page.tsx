

import { Login } from '@/screens/Login/Login';

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return <Login locale={locale} />;
}
