
const SUPABASE_URL = "https://ytnhtajfcggiaukycakd.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_O5F8nxOPvrZKD7FLfVJqnA_UkdBRP7L";


const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const ShopCandyData = {
  // Fetch Products from Supabase Database
  async getProducts() {
    try {
      const { data, error } = await supabaseClient
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error("Error fetching products:", err.message);
      return [];
    }
  },

  // Save / Add Product to Supabase
  async saveProduct(product) {
    try {
      const { error } = await supabaseClient
        .from('products')
        .upsert([product]);

      if (error) throw error;
      return true;
    } catch (err) {
      alert("Error saving product: " + err.message);
      return false;
    }
  },


  async deleteProduct(id) {
    try {
      const { error } = await supabaseClient
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (err) {
      alert("Error deleting product: " + err.message);
      return false;
    }
  },

  
  getCart() {
    let cart = localStorage.getItem("shopcandy_cart");
    return cart ? JSON.parse(cart) : [];
  },

  saveCart(cart) {
    localStorage.setItem("shopcandy_cart", JSON.stringify(cart));
  },


  async getOrders() {
    try {
      const { data, error } = await supabaseClient
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error("Error fetching orders:", err.message);
      return [];
    }
  },

  
  async saveOrder(order) {
    try {
      const { error } = await supabaseClient
        .from('orders')
        .insert([order]);

      if (error) throw error;
      return true;
    } catch (err) {
      alert("Error saving order: " + err.message);
      return false;
    }
  },

  
  async updateOrder(orderId, updates) {
    try {
      const { error } = await supabaseClient
        .from('orders')
        .update(updates)
        .eq('id', orderId);

      if (error) throw error;
      return true;
    } catch (err) {
      alert("Error updating order: " + err.message);
      return false;
    }
  },

  formatNaira(amount) {
    return "₦" + Number(amount).toLocaleString("en-NG");
  }
};