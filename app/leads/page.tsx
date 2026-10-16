
"use client";

import { useState } from "react";

type Lead = {
  id: number;
  name: string;
  business: string;
  phone: string;
  status: string;
  notes: string;
};

const statuses = [
  "New",
  "Contacted",
  "Interested",
  "Follow-up",
  "Converted",
  "Lost",
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    business: "",
    phone: "",
    status: "New",
    notes: "",
  });

  const filteredLeads = leads.filter((lead) =>
    `${lead.name} ${lead.business} ${lead.phone} ${lead.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function resetForm() {
    setForm({
      name: "",
      business: "",
      phone: "",
      status: "New",
      notes: "",
    });
    setEditingId(null);
    setShowForm(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (editingId !== null) {
      setLeads((current) =>
        current.map((lead) =>
          lead.id === editingId
            ? { ...lead, ...form }
            : lead
        )
      );
    } else {
      const newLead: Lead = {
        id: Date.now(),
        ...form,
      };

      setLeads((current) => [newLead, ...current]);
    }

    resetForm();
  }

  function editLead(lead: Lead) {
    setForm({
      name: lead.name,
      business: lead.business,
      phone: lead.phone,
      status: lead.status,
      notes: lead.notes,
    });

    setEditingId(lead.id);
    setShowForm(true);
  }

  function deleteLead(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (confirmed) {
      setLeads((current) =>
        current.filter((lead) => lead.id !== id)
      );
    }
  }

  return (
    <main className="main">
      <header className="topbar">
        <div>
          <p className="breadcrumb">Workspace / Leads</p>
          <h1>Leads Management</h1>
        </div>

        <button
          className="primary-btn"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          + Add Lead
        </button>
      </header>

      <section className="leads-section">
        <div className="section-heading">
          <div>
            <h2>All Leads</h2>
            <p>Manage your clients and potential customers.</p>
          </div>
        </div>

        <div className="table-toolbar">
          <input
            type="search"
            placeholder="Search by name, phone or business..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <span>{filteredLeads.length} records</span>
        </div>

        {showForm && (
          <form className="lead-form" onSubmit={handleSubmit}>
            <h2>{editingId !== null ? "Edit Lead" : "Add New Lead"}</h2>

            <div className="lead-form-grid">
              <label>
                Business Name *
                <input
                  required
                  value={form.name}
                  placeholder="e.g. Dynamic Sportswear"
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                />
              </label>

              <label>
                Business Type *
                <input
                  required
                  value={form.business}
                  placeholder="e.g. Manufacturing"
                  onChange={(event) =>
                    setForm({ ...form, business: event.target.value })
                  }
                />
              </label>

              <label>
                Phone Number *
                <input
                  required
                  value={form.phone}
                  placeholder="+92 300 1234567"
                  onChange={(event) =>
                    setForm({ ...form, phone: event.target.value })
                  }
                />
              </label>

              <label>
                Lead Status
                <select
                  value={form.status}
                  onChange={(event) =>
                    setForm({ ...form, status: event.target.value })
                  }
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>

              <label className="full-width">
                Call Notes
                <textarea
                  value={form.notes}
                  placeholder="Client ne kya kaha? Follow-up kab karna hai?"
                  rows={3}
                  onChange={(event) =>
                    setForm({ ...form, notes: event.target.value })
                  }
                />
              </label>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={resetForm}
              >
                Cancel
              </button>

              <button type="submit" className="primary-btn">
                {editingId !== null ? "Update Lead" : "Save Lead"}
              </button>
            </div>
          </form>
        )}

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>BUSINESS NAME</th>
                <th>BUSINESS TYPE</th>
                <th>PHONE</th>
                <th>STATUS</th>
                <th>CALL NOTES</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id}>
                  <td><strong>{lead.name}</strong></td>
                  <td>{lead.business}</td>
                  <td>{lead.phone}</td>
                  <td>
                    <select
                      className={`status status-${lead.status
                        .toLowerCase()
                        .replace(/-/g, "")}`}
                      value={lead.status}
                      onChange={(event) =>
                        setLeads((current) =>
                          current.map((item) =>
                            item.id === lead.id
                              ? { ...item, status: event.target.value }
                              : item
                          )
                        )
                      }
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{lead.notes || "—"}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => editLead(lead)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteLead(lead.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={6} className="empty">
                    {search
                      ? "No matching leads found."
                      : "No leads added yet. Click + Add Lead to get started."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
