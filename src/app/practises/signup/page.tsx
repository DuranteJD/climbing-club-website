// /app/practises/signup/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../../../../components/navbar";
import Footer from "../../../../components/Footer";

// ... (interface and formatDate function remain the same) ...
interface SignUpFormData {
  id: string;
  name: string;
  date: string;
  status: "confirmed" | "waitlist";
}

const ADMIN_PASSWORD = "coachpass123";
const MAX_CONFIRMED = 18;

const formatDate = (dateStr: string, opts?: Intl.DateTimeFormatOptions) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(
    "en-US",
    opts ?? { month: "long", day: "numeric", year: "numeric" }
  );
};

// **1. Create a new component for the main content**
function PracticeSignUpContent() {
  const searchParams = useSearchParams();
  const wantsAdmin = searchParams.get("admin") === "true";

  const [formData, setFormData] = useState<
    Omit<SignUpFormData, "id" | "status">
  >({ name: "", date: "" });
  const [submitted, setSubmitted] = useState(false);
  const [signUps, setSignUps] = useState<SignUpFormData[]>([]);
  const [myIds, setMyIds] = useState<string[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkedAdmin, setCheckedAdmin] = useState(false);

  // ... (all other hooks and functions remain here) ...
  // Load stored signup IDs
  useEffect(() => {
    const savedIds = localStorage.getItem("myIds");
    if (savedIds) setMyIds(JSON.parse(savedIds));
  }, []);

  // Admin password prompt
  useEffect(() => {
    if (!wantsAdmin || checkedAdmin) return;

    const storedAdmin = localStorage.getItem("isAdmin");
    if (storedAdmin === "true") {
      setIsAdmin(true);
    } else {
      const pw = prompt("Enter admin password:");
      if (pw === ADMIN_PASSWORD) {
        setIsAdmin(true);
        localStorage.setItem("isAdmin", "true");
      } else {
        alert("❌ Wrong password");
        setIsAdmin(false);
      }
    }
    setCheckedAdmin(true);
  }, [wantsAdmin, checkedAdmin]);

  // Fetch signups & practice dates
  const fetchSignUps = async () => {
    const res = await fetch("/api/signup");
    const data = await res.json();
    setSignUps(data.signUps);
    setDates(data.practiceDates);
  };

  useEffect(() => {
    fetchSignUps();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      const data = await res.json();
      setSubmitted(true);
      setFormData({ name: "", date: "" });
      const newIds = [...myIds, data.signup.id];
      setMyIds(newIds);
      localStorage.setItem("myIds", JSON.stringify(newIds));
      fetchSignUps();
    } else {
      const data = await res.json();
      alert(data.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (isAdmin && !myIds.includes(id)) {
      if (!confirm("Are you sure you want to remove this signup?")) return;
    }
    await fetch("/api/signup", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const updatedIds = myIds.filter((i) => i !== id);
    setMyIds(updatedIds);
    localStorage.setItem("myIds", JSON.stringify(updatedIds));
    fetchSignUps();
  };

  // Group signups by date
  const signUpsByDate = dates.map((date, idx) => {
    const confirmedCount = signUps.filter(
      (s) => s.date === date && s.status === "confirmed"
    ).length;
    return {
      date,
      key: `${date}-${idx}`, // unique key
      signUps: signUps.filter((s) => s.date === date),
      spotsRemaining: MAX_CONFIRMED - confirmedCount,
    };
  });

  return (
    <>
      <div className="flex flex-col items-center p-6 pt-20 gap-6 max-w-[1400px] mx-auto">
        <p className="font-bold text-error">
          NOTE: ONLY SIGN UP FOR PRACTICES IF YOU ARE IN THE CLUB.
        </p>
        {/* SIGNUP FORM */}
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Practice Sign-Up
          </h1>
          {submitted && (
            <div className="alert alert-success shadow-lg mb-4">
              <div>
                <span>✅ Thanks for signing up!</span>
              </div>
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-base-200 p-6 rounded-xl shadow-lg"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
            <select
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="select select-bordered w-full"
            >
              <option value="">Select Practice Date</option>
              {dates.map((d) => (
                <option key={d} value={d}>
                  {formatDate(d, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </option>
              ))}
            </select>
            <button type="submit" className="btn btn-primary w-full">
              Sign Up
            </button>
          </form>
        </div>

        {/* SIGNUP LISTS GRID */}
        <div
          className="grid gap-6 w-full"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          {signUpsByDate.map(({ date, key, signUps, spotsRemaining }) => (
            <div key={key} className="bg-base-100 p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-1 text-center">
                {formatDate(date)}
              </h2>
              <div className="text-center mb-2">
                <span
                  className={`badge ${
                    spotsRemaining === 0 ? "badge-error" : "badge-success"
                  }`}
                >
                  {spotsRemaining} spots remaining
                </span>
              </div>

              {signUps.length === 0 ? (
                <p className="text-gray-500 text-center">No sign-ups yet</p>
              ) : (
                <ul className="space-y-2">
                  {signUps.map((s) => (
                    <li
                      key={s.id}
                      className="flex justify-between items-center border p-2 rounded-lg bg-base-200"
                    >
                      <span>
                        {s.name}{" "}
                        {s.status === "waitlist" && (
                          <span className="badge badge-warning">Waitlist</span>
                        )}
                      </span>
                      {(myIds.includes(s.id) || isAdmin) && (
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="btn btn-error btn-sm"
                        >
                          Remove
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* ADMIN CONTROLS */}
        {wantsAdmin && isAdmin && (
          <div className="w-full max-w-md mt-10 bg-base-200 p-4 rounded-xl shadow-lg">
            <h2 className="font-bold mb-2 text-secondary text-center">
              Admin Controls
            </h2>
            <textarea
              placeholder="Enter dates (YYYY-MM-DD), one per line"
              className="textarea textarea-bordered w-full mb-2"
              rows={4}
              defaultValue={dates.join("\n")}
              id="datesInput"
            />
            <button
              className="btn btn-info btn-soft rounded w-full mb-2"
              onClick={async () => {
                const newDates = (
                  document.getElementById("datesInput") as HTMLTextAreaElement
                ).value
                  .split("\n")
                  .map((d) => d.trim())
                  .filter(Boolean);
                await fetch("/api/signup", {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ practiceDates: newDates }),
                });
                fetchSignUps();
              }}
            >
              Update Practice Dates
            </button>
            <button
              className="btn btn-error btn-soft rounded w-full mb-2"
              onClick={async () => {
                if (confirm("Are you sure? This will delete ALL signups.")) {
                  await fetch("/api/signup", { method: "PATCH" });
                  fetchSignUps();
                }
              }}
            >
              Clear All Signups
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// **2. Wrap the new component in Suspense for the default export**
export default function PageWithSuspense() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <PracticeSignUpContent />
      </Suspense>
      <Footer />
    </>
  );
}
