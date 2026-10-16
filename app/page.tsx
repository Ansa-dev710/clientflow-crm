
"use client";

import { useState } from "react";

type Lead = {
  id: number;
  name: string;
  business: string;
  phone: string;
  status: string;
};

type Stat = {
  title: string;
  value: number;
  icon: string;
  color: string;
};

const initialLeads: Lead[] = [
  {
    id: 1,
    name: "Dynamic Sportswear",
    business: "Manufacturing",
    phone: "+92 42 37499066",
    status: "Contacted",
  },
  {
    id: 2,
    name: "Beauty Corner PK",
    business: "E-commerce",
    phone: "Not available",
    status: "Interested",
  },
  {
    id: 3,
    name: "Career O'clock",
    business: "Professional Firms",
    phone: "+92 370 0092525",
    status: "Lost",
  },
  {
    id: 4,
    name: "Khalifa Bakers",
    business: "Manufacturing",
    phone: "+92 314 4351616",
    status: "Follow-up",
  },
];

const navigationItems = [
  ["Dashboard", "▦"],
  ["Leads", "♙"],
  ["Follow-ups", "◷"],
  ["Reports", "▤"],
  ["Settings", "⚙"],
];

const availableStatuses = [
  "New",
  "Contacted",
  "Interested",
  "Follow-up",
  "Converted",
  "Lost",
];

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [activePage, setActivePage] = useState("Dashboard");
  const [search, setSearch] = useState("");

  const filteredLeads = leads.filter((lead) =>
    `${lead.name} ${lead.business} ${lead.status} ${lead.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const stats: Stat[] = [
    {
      title: "Total Leads",
      value: leads.length,
      icon: "👥",
      color: "#e8efff",
    },
    {
      title: "Contacted",
      value: leads.filter((lead) => lead.status === "Contacted").length,
      icon: "📞",
      color: "#e5f5ed",
    },
    {
      title: "Interested",
      value: leads.filter((lead) => lead.status === "Interested").length,
      icon: "⭐",
      color: "#fff2d9",
    },
    {
      title: "Converted",
      value: leads.filter((lead) => lead.status === "Converted").length,
      icon: "✅",
      color: "#f0e8ff",
    },
  ];

  function updateStatus(id: number, status: string): void {
    setLeads((current) =>
      current.map((lead) =>
        lead.id === id ? { ...lead, status } : lead
      )
    );
  }

  function getStatusClass(status: string): string {
    return `status status-${status.toLowerCase().replace(/-/g, "")}`;
  }

  function openLeadsPage(): void {
    window.location.href = "/leads";
  }

  return (
    <div className="crm">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">C</div>
          <div>
            <h2>ClientFlow</h2>
            <span>CRM Workspace</span>
          </div>
        </div>

        <p className="menu-label">WORKSPACE</p>

        {navigationItems.map(([name, icon]) => (
          <button
            key={name}
            type="button"
            className={`nav-item ${
              activePage === name ? "active" : ""
            }`}
            onClick={() => {
              if (name === "Leads") {
                openLeadsPage();
                return;
              }

              setActivePage(name);
            }}
          >
            <span>{icon}</span>
            {name}
          </button>
        ))}

        <div className="sidebar-bottom">
          <div className="avatar">AA</div>
          <div>
            <strong>CRM Admin</strong>
            <span>Administrator</span>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="breadcrumb">
              Workspace / {activePage}
            </p>
            <h1>{activePage}</h1>
          </div>

          <div className="topbar-right">
            <span className="online-dot" />
            <span>Workspace active</span>
            <div className="avatar">AA</div>
          </div>
        </header>

        {activePage === "Dashboard" ? (
          <>
            <section className="welcome">
              <div>
                <p className="eyebrow">
                  YOUR BUSINESS AT A GLANCE
                </p>
                <h2>Welcome back!</h2>
                <p>
                  Track your leads, manage client calls and grow
                  your business from one place.
                </p>
              </div>

              <div className="welcome-icon">📊</div>
            </section>

            <section className="stats-grid">
              {stats.map((stat) => (
                <article className="stat-card" key={stat.title}>
                  <div
                    className="stat-icon"
                    style={{ background: stat.color }}
                  >
                    {stat.icon}
                  </div>

                  <p>{stat.title}</p>

                  <h2>
                    {String(stat.value).padStart(2, "0")}
                  </h2>

                  <span className="stat-note">
                    Current lead records
                  </span>
                </article>
              ))}
            </section>

            <section className="leads-section">
              <div className="section-heading">
                <div>
                  <h2>Recent Leads</h2>
                  <p>Manage your client pipeline</p>
                </div>

                <button
                  type="button"
                  className="primary-btn"
                  onClick={openLeadsPage}
                >
                  + View Leads
                </button>
              </div>

              <div className="table-toolbar">
                <input
                  type="text"
                  placeholder="Search leads or business type..."
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                />

                <span>{filteredLeads.length} records</span>
              </div>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>BUSINESS NAME</th>
                      <th>BUSINESS TYPE</th>
                      <th>PHONE</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id}>
                        <td>
                          <strong>{lead.name}</strong>
                        </td>

                        <td>{lead.business}</td>
                        <td>{lead.phone}</td>

                        <td>
                          <select
                            className={getStatusClass(lead.status)}
                            value={lead.status}
                            onChange={(event) =>
                              updateStatus(
                                lead.id,
                                event.target.value
                              )
                            }
                            aria-label={`Status for ${lead.name}`}
                          >
                            {availableStatuses.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}

                    {filteredLeads.length === 0 && (
                      <tr>
                        <td colSpan={4} className="empty">
                          No leads found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : (
          <section className="leads-section page-placeholder">
            <p className="eyebrow">CLIENTFLOW WORKSPACE</p>

            <h2>{activePage}</h2>

            <p>
              {activePage === "Follow-ups"
                ? "Manage your upcoming client follow-ups."
                : activePage === "Reports"
                  ? "Review your sales and lead performance."
                  : "Manage your workspace preferences."}
            </p>

            <button
              type="button"
              className="primary-btn"
              onClick={() => setActivePage("Dashboard")}
            >
              Back to Dashboard
            </button>
          </section>
        )}
      </main>
    </div>
  );
}
