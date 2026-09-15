export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-slate-800">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 font-semibold mb-4">
          🌱
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          AI Waste Segregation Assistant
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          Aligned with UN SDG 12: Responsible Consumption and Production
        </p>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-500">
          Phase 2 Scaffolding Complete &bull; Awaiting Phase 3 UI Implementation
        </div>
      </div>
    </main>
  );
}
