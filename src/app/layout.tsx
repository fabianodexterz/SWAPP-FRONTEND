export const metadata = {
  title: "SWAPP",
  description: "Summoners War App - Frontend"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{fontFamily:'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif', background:'#0f1115', color:'#e5e7eb'}}>
        <div style={{maxWidth:960, margin:'0 auto', padding:'24px'}}>
          {children}
        </div>
      </body>
    </html>
  );
}
