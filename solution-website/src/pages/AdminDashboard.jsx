export default function AdminDashboard() {
  return (
    <div className="pt-24 max-w-6xl mx-auto px-6">
      <h2 className="text-3xl font-semibold mb-6">Admin Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg shadow-sm text-center">
          <h3 className="text-xl font-semibold">Total Inquiries</h3>
          <p className="text-4xl font-bold mt-2">42</p>
        </div>
      </div>
    </div>
  );
}
