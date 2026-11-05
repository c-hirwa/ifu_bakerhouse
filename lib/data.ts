// All business details are fictional — swap these out when you reuse the template for a real client.
export const BAKERY = {
  name: "Ifu Bakehouse",
  // Replace with the client's WhatsApp number (country code, no + or spaces).
  whatsapp: "250780000000",
  phoneDisplay: "+250 780 000 000",
  address: "KG 7 Ave, Kimihurura, Kigali",
  timeZone: "Africa/Kigali",
};

export type Illustration =
  | "sourdough" | "brioche" | "sandwich" | "baguette" | "croissant" | "cinnamon"
  | "mandazi" | "banana" | "muffin" | "cookie" | "coffee" | "tea" | "juice" | "slice" | "chocoslice";

export type MenuItem = { id: string; name: string; note: string; price: number; art: Illustration };
export type Category = { id: string; label: string; items: MenuItem[] };

export const MENU: Category[] = [
  {
    id: "bread", label: "Bread",
    items: [
      { id: "sourdough", name: "Morning sourdough", note: "48-hour ferment, blistered crust", price: 3500, art: "sourdough" },
      { id: "brioche", name: "Butter brioche loaf", note: "Soft, rich, great for French toast", price: 4000, art: "brioche" },
      { id: "sandwich", name: "Whole-wheat sandwich loaf", note: "Sliced to order", price: 2500, art: "sandwich" },
      { id: "baguette", name: "Baguette", note: "Out of the oven at noon", price: 1200, art: "baguette" },
    ],
  },
  {
    id: "pastry", label: "Pastries",
    items: [
      { id: "croissant", name: "Butter croissant", note: "27 layers, no shortcuts", price: 1200, art: "croissant" },
      { id: "cinnamon", name: "Cinnamon roll", note: "Cream cheese glaze", price: 1500, art: "cinnamon" },
      { id: "mandazi", name: "Mandazi, 3 pieces", note: "Cardamom and coconut", price: 600, art: "mandazi" },
      { id: "banana", name: "Banana bread slice", note: "Made with Rwandan bananas", price: 1000, art: "banana" },
      { id: "muffin", name: "Passion fruit muffin", note: "Tangy curd centre", price: 1200, art: "muffin" },
      { id: "cookie", name: "Chocolate chip cookie", note: "Crisp edge, soft middle", price: 800, art: "cookie" },
    ],
  },
  {
    id: "cake", label: "Cake by the slice",
    items: [
      { id: "carrot", name: "Carrot cake", note: "Walnuts, cream cheese frosting", price: 2500, art: "slice" },
      { id: "fudge", name: "Chocolate fudge cake", note: "Three layers, ganache", price: 3000, art: "chocoslice" },
    ],
  },
  {
    id: "drinks", label: "Drinks",
    items: [
      { id: "coffee", name: "Rwandan coffee", note: "Single-origin, washed process", price: 2000, art: "coffee" },
      { id: "tea", name: "Spiced African tea", note: "Milk, ginger, masala", price: 1500, art: "tea" },
      { id: "juice", name: "Fresh passion juice", note: "Squeezed this morning", price: 2000, art: "juice" },
    ],
  },
];

export const ALL_ITEMS = MENU.flatMap((c) => c.items);

// Bake times are a real sequence, so the schedule shows them in order.
export const BAKES = [
  { time: "06:00", what: "Sourdough & sandwich loaves" },
  { time: "07:00", what: "Croissants & mandazi" },
  { time: "09:30", what: "Cinnamon rolls" },
  { time: "12:00", what: "Baguettes" },
  { time: "15:00", what: "Banana bread & muffins" },
];

// 0 = Sunday
export const HOURS: { day: string; open: string; close: string }[] = [
  { day: "Sunday", open: "07:00", close: "14:00" },
  { day: "Monday", open: "06:00", close: "20:00" },
  { day: "Tuesday", open: "06:00", close: "20:00" },
  { day: "Wednesday", open: "06:00", close: "20:00" },
  { day: "Thursday", open: "06:00", close: "20:00" },
  { day: "Friday", open: "06:00", close: "20:00" },
  { day: "Saturday", open: "06:00", close: "20:00" },
];

export const DELIVERY_AREAS = [
  { id: "kimihurura", label: "Kimihurura", fee: 1000 },
  { id: "kacyiru", label: "Kacyiru", fee: 1000 },
  { id: "remera", label: "Remera", fee: 1500 },
  { id: "nyarutarama", label: "Nyarutarama", fee: 1500 },
  { id: "kicukiro", label: "Kicukiro", fee: 2000 },
  { id: "nyamirambo", label: "Nyamirambo", fee: 2000 },
];

export const rwf = (n: number) => `${n.toLocaleString("en-US")} RWF`;
