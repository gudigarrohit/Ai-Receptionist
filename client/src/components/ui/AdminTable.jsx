import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminTable({ refreshTrigger }) {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/appointments");
      setAppointments(res.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [refreshTrigger]);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg w-full max-w-4xl">
      <h2 className="text-xl font-bold mb-4">Appointments</h2>

      <table className="min-w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Doctor</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Phone</th>
          </tr>
        </thead>

        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No Appointments Found
              </td>
            </tr>
          ) : (
            appointments.map((a) => (
              <tr key={a._id}>
                <td className="border p-2">{a.name}</td>
                <td className="border p-2">{a.doctor}</td>
                <td className="border p-2">
                  {a.date
                    ? new Date(a.date).toLocaleString()
                    : "No Date"}
                </td>
                <td className="border p-2">{a.phone}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}