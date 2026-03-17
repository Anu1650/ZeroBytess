import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Plus, Trash2, Search, Edit2, Save, X, ExternalLink } from "lucide-react";

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbzsdF9n-jASb3CJ4-pHF3GRo3vb6B8j_g1ttBzQ7oB-FvMn8-_OPkJecgo4QIZ6o5Y/exec";

interface DataRow {
  rowIndex: number;
  [key: string]: any;
}

const Admin = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"inquiries" | "projects">("inquiries");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRow, setEditingRow] = useState<DataRow | null>(null);
  const [editForm, setEditForm] = useState<Record<string, string>>({});
  const [newItem, setNewItem] = useState<Record<string, string>>({});

  const ADMIN_PASSWORD = "zerobytes123";

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(GOOGLE_SHEET_URL);
      const result = await response.json();
      console.log("Fetch result:", result);
      if (result.success) {
        setData(result.data);
        if (result.data.length > 0) {
          setColumns(Object.keys(result.data[0]).filter(k => k !== "rowIndex"));
        }
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
      if (activeTab === "inquiries") {
        formData.append("action", "addInquiry");
        formData.append("name", newItem.Name || "");
        formData.append("email", newItem.Email || "");
        formData.append("phone", newItem.Phone || "");
        formData.append("service", newItem.Service || "");
        formData.append("message", newItem.Message || "");
      } else {
        formData.append("action", "addProject");
        formData.append("projectName", newItem.Name || "");
        formData.append("projectDesc", newItem.Description || "");
        formData.append("projectCategory", newItem.Category || "");
        formData.append("projectImage", newItem.Image || "");
      }

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
    columns.forEach(col => {
      if (col !== "rowIndex") {
        form[col] = row[col] || "";
      }
    });
    setEditForm(form);
  };

  const filteredData = data.filter((item) => {
    const isProject = item.Type === "PROJECT" || item.type === "PROJECT";
    const itemType = activeTab === "projects" ? isProject : !isProject;
    if (!itemType) return false;
    
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return Object.values(item).some(val => 
      String(val).toLowerCase().includes(search)
    );
  });

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
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "inquiries" ? "bg-primary text-white" : "bg-surface border border-border"
              }`}
            >
              All Data ({data.length})
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center gap-2 justify-center"
          >
            <Plus className="w-4 h-4" />
            Add New
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            {data.length > 0 ? "No matching records found" : "No data found. Submit a form entry first."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">#</th>
                  {columns.filter(c => c !== "rowIndex").map(col => (
                    <th key={col} className="text-left p-3 text-sm font-medium text-muted-foreground">{col}</th>
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
                    <td className="p-3 text-sm text-muted-foreground">{index + 1}</td>
                    {columns.filter(c => c !== "rowIndex").map(col => (
                      <td key={col} className="p-3 text-sm max-w-[200px] truncate">
                        {editingRow?.rowIndex === item.rowIndex ? (
                          <input
                            type="text"
                            value={editForm[col] || ""}
                            onChange={(e) => setEditForm({ ...editForm, [col]: e.target.value })}
                            className="w-full px-2 py-1 rounded bg-background border border-border text-sm"
                          />
                        ) : col.toLowerCase().includes("image") || col.toLowerCase().includes("url") ? (
                          item[col] ? (
                            <a href={item[col]} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                              <ExternalLink className="w-3 h-3" /> Link
                            </a>
                          ) : "-"
                        ) : (
                          String(item[col] || "-")
                        )}
                      </td>
                    ))}
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-2">
                        {editingRow?.rowIndex === item.rowIndex ? (
                          <>
                            <button
                              onClick={handleUpdate}
                              className="p-2 rounded-lg bg-green-500/20 text-green-500 hover:bg-green-500/30"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => { setEditingRow(null); setEditForm({}); }}
                              className="p-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(item)}
                              className="p-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.rowIndex)}
                              className="p-2 rounded-lg bg-red-500/20 text-red-500 hover:bg-red-500/30"
                            >
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

      <AnimatePresence>
        {showAddModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              className="glass-card p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="font-display text-xl font-bold mb-4">Add New Entry</h2>
              <form onSubmit={handleAdd} className="space-y-4">
                {columns.filter(c => c !== "rowIndex" && c !== "Timestamp" && c !== "Type").map(field => (
                  <div key={field}>
                    <label className="block text-sm font-medium mb-1">{field}</label>
                    {field.toLowerCase().includes("message") || field.toLowerCase().includes("description") ? (
                      <textarea
                        value={newItem[field] || ""}
                        onChange={(e) => setNewItem({ ...newItem, [field]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
                        rows={3}
                      />
                    ) : (
                      <input
                        type="text"
                        value={newItem[field] || ""}
                        onChange={(e) => setNewItem({ ...newItem, [field]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    )}
                  </div>
                ))}
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="btn-primary flex-1">Add</button>
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn-outline flex-1">Cancel</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;
