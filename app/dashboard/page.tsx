export default function DashboardPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <h1 className="text-3xl font-semibold">Organizer Dashboard (Frontend)</h1>
        <p className="mt-2 text-white/70">
          This is a placeholder dashboard UI. Connect to your DB and auth provider later to list registrations, approve participants, and view statistics.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card">
            <h3 className="font-semibold">Statistics</h3>
            <p className="text-sm text-white/70 mt-2">Participant counts, top events, and live counters will appear here.</p>
          </div>
          <div className="card">
            <h3 className="font-semibold">Recent Registrations</h3>
            <p className="text-sm text-white/70 mt-2">List of latest registration rows (to be fetched from API)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
