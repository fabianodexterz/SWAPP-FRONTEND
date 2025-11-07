export const metadata = {
  title: 'SWAPP',
  description: 'Summoners War App'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
