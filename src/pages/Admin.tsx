import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Plus, Trash2, Search, Edit2, Save, X, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbz83HRSdtTMrOzvwb5zvO_JjR69WdJ4wwBPFtDds78hCTPcKTWiR5N2WO4jVnHfkKE-/exec";

interface DataRow {
  rowIndex: number;
  [key: string]: any;
}

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

const FIXED_COLUMNS = ["Timestamp", "Name", "Email", "CountryCode", "Phone", "Service", "Message"];

const Admin = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRow, setEditingRow] = useState<DataRow | null>(null);
  const [editForm, setEditForm] = useState<Record<string, string>>({});
  const [newItem, setNewItem] = useState<Record<string, string>>({});
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'Timestamp', direction: 'desc' });

  const ADMIN_PASSWORD = "zerobytes123";

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(GOOGLE_SHEET_URL, { redirect: "follow" });
      const text = await response.text();
      const result = JSON.parse(text);
      
      if (result.success && result.data) {
        const sortedData = [...result.data].sort((a, b) => {
          const aVal = a.Timestamp || "";
          const bVal = b.Timestamp || "";
          if (!aVal || !bVal) return 0;
          return new Date(bVal).getTime() - new Date(aVal).getTime();
        });
        setData(sortedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Invalid password");
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("action", "addInquiry");
      formData.append("name", newItem.Name || "");
      formData.append("email", newItem.Email || "");
      formData.append("countryCode", newItem.CountryCode || "+91");
      formData.append("phone", newItem.Phone || "");
      formData.append("service", newItem.Service || "");
      formData.append("message", newItem.Message || "");

      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        body: formData,
        redirect: "follow",
      });

      setShowAddModal(false);
      setNewItem({});
      fetchData();
    } catch (error) {
      console.error("Error adding:", error);
    }
  };

  const handleUpdate = async () => {
    if (!editingRow) return;
    
    try {
      for (const [key, value] of Object.entries(editForm)) {
        const formData = new FormData();
        formData.append("action", "update");
        formData.append("rowIndex", editingRow.rowIndex.toString());
        formData.append("field", key);
        formData.append("value", value);
        
        await fetch(GOOGLE_SHEET_URL, {
          method: "POST",
          body: formData,
          redirect: "follow",
        });
      }
      
      setEditingRow(null);
      setEditForm({});
      fetchData();
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  const handleDelete = async (rowIndex: number) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    
    try {
      const formData = new FormData();
      formData.append("action", "delete");
      formData.append("rowIndex", rowIndex.toString());

      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        body: formData,
        redirect: "follow",
      });
      
      fetchData();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const startEdit = (row: DataRow) => {
    setEditingRow(row);
    const form: Record<string, string> = {};
    FIXED_COLUMNS.forEach(col => {
      form[col] = row[col] || "";
    });
    setEditForm(form);
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    const aVal = a[sortConfig.key] || "";
    const bVal = b[sortConfig.key] || "";
    
    if (sortConfig.key === "Timestamp") {
      const dateA = new Date(aVal).getTime();
      const dateB = new Date(bVal).getTime();
      return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    const aStr = String(aVal).toLowerCase();
    const bStr = String(bVal).toLowerCase();
    
    if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredData = sortedData.filter((item) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      (item.Name && item.Name.toLowerCase().includes(search)) ||
      (item.Email && item.Email.toLowerCase().includes(search)) ||
      (item.CountryCode && item.CountryCode.toLowerCase().includes(search)) ||
      (item.Phone && item.Phone.toLowerCase().includes(search)) ||
      (item.Service && item.Service.toLowerCase().includes(search)) ||
      (item.Message && item.Message.toLowerCase().includes(search))
    );
  });

  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return <ArrowUpDown className="w-3 h-3 ml-1" />;
    return sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3 ml-1" /> : <ArrowDown className="w-3 h-3 ml-1" />;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          className="glass-card p-8 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-2xl font-bold text-center mb-6">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn-primary w-full">Login</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="font-display text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={fetchData}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-surface border border-border hover:bg-primary/10"
          >
            Refresh
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, email, phone, service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Inquiry
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : data.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No data found. Submit a form entry first.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-border">
                  {FIXED_COLUMNS.map(col => (
                    <th 
                      key={col} 
                      className="text-left p-3 text-sm font-medium text-muted-foreground cursor-pointer hover:text-primary whitespace-nowrap"
                      onClick={() => handleSort(col)}
                    >
                      <div className="flex items-center">
                        {col}
                        {getSortIcon(col)}
                      </div>
                    </th>
                  ))}
                  <th className="text-right p-3 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <motion.tr
                    key={item.rowIndex}
                    className="border-b border-border/50 hover:bg-surface/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    {FIXED_COLUMNS.map(col => (
                      <td key={col} className="p-3 text-sm max-w-[200px] truncate">
                        {editingRow?.rowIndex === item.rowIndex ? (
                          <input
                            type="text"
                            value={editForm[col] || ""}
                            onChange={(e) => setEditForm({ ...editForm, [col]: e.target.value })}
                            className="w-full px-2 py-1 rounded bg-background border border-border text-sm"
                          />
                        ) : col === "Timestamp" ? (
                          <span className="text-xs text-muted-foreground">
                            {item[col] ? new Date(item[col]).toLocaleString() : "-"}
                          </span>
                        ) : col === "CountryCode" ? (
                          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">
                            {item[col] || "-"}
                          </span>
                        ) : col === "Message" ? (
                          <span className="block max-w-[200px] truncate" title={item[col]}>
                            {item[col] || "-"}
                          </span>
                        ) : (
                          <span>{item[col] || "-"}</span>
                        )}
                      </td>
                    ))}
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-2">
                        {editingRow?.rowIndex === item.rowIndex ? (
                          <>
                            <button onClick={handleUpdate} className="p-2 rounded-lg bg-green-500/20 text-green-500 hover:bg-green-500/30">
                              <Save className="w-4 h-4" />
                            </button>
                            <button onClick={() => { setEditingRow(null); setEditForm({}); }} className="p-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30">
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => startEdit(item)} className="p-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(item.rowIndex)} className="p-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAddModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowAddModal(false)}
        >
          <motion.div
            className="glass-card p-6 w-full max-w-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display text-xl font-bold mb-4">Add New Inquiry</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input type="text" value={newItem.Name || ""} onChange={(e) => setNewItem({ ...newItem, Name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-surface border border-border" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" value={newItem.Email || ""} onChange={(e) => setNewItem({ ...newItem, Email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-surface border border-border" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Country Code</label>
                <select value={newItem.CountryCode || "+91"} onChange={(e) => setNewItem({ ...newItem, CountryCode: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-surface border border-border">
                  <option value="+1">+1 (US/CA)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+91">+91 (India)</option>
                  <option value="+86">+86 (China)</option>
                  <option value="+81">+81 (Japan)</option>
                  <option value="+49">+49 (Germany)</option>
                  <option value="+971">+971 (UAE)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input type="text" value={newItem.Phone || ""} onChange={(e) => setNewItem({ ...newItem, Phone: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-surface border border-border" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Service</label>
                <select value={newItem.Service || ""} onChange={(e) => setNewItem({ ...newItem, Service: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-surface border border-border" required>
                  <option value="">Select Service</option>
                  <option>Web Development</option>
                  <option>Data Analytics & Science</option>
                  <option>Branding & Design</option>
                  <option>AI Automation</option>
                  <option>Full-Stack Systems</option>
                  <option>Digital Marketing</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea value={newItem.Message || ""} onChange={(e) => setNewItem({ ...newItem, Message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-surface border border-border" rows={3} />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="btn-primary flex-1">Add</button>
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-outline flex-1">Cancel</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Admin;
