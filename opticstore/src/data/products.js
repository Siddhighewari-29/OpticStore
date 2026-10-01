// Mock product catalog for OpticStore.
// In a production build this would be replaced by calls to a REST API
// (see src/services/api.js for the Axios-ready structure).

// const img = (seed) => `https://picsum.photos/seed/${seed}/700/700`;
// ===============================================
// const img = (seed) => {
//   const images = {

//     // =====================================================
//     // MEN'S EYEWEAR — NEW IMAGES
//     // =====================================================
// "men-aviator-steel":
//       "https://images.pexels.com/photos/10220082/pexels-photo-10220082.jpeg?auto=compress&cs=tinysrgb&w=700",

//     "men-square-acetate":
//       "https://images.pexels.com/photos/39716/pexels-photo-39716.jpeg?auto=compress&cs=tinysrgb&w=700",

//     "men-titan-rimless":
//       "https://images.pexels.com/photos/16683295/pexels-photo-16683295.jpeg?auto=compress&cs=tinysrgb&w=700",

//     "men-wood-wayfarer":
//       "https://images.pexels.com/photos/18700611/pexels-photo-18700611.jpeg?auto=compress&cs=tinysrgb&w=700",

//     "men-carbon-sport":
//       "https://images.pexels.com/photos/6969332/pexels-photo-6969332.jpeg?auto=compress&cs=tinysrgb&w=700",

    // "men-round-bronze":
    //   "https://images.pexels.com/photos/1479724/pexels-photo-1479724.jpeg?auto=compress&cs=tinysrgb&w=700",

    // "men-classic-black":
    //   "https://images.pexels.com/photos/8972136/pexels-photo-8972136.jpeg?auto=compress&cs=tinysrgb&w=700",

//     // "men-premium-optical":
//     //   "https://images.pexels.com/photos/25096378/pexels-photo-25096378.jpeg?auto=compress&cs=tinysrgb&w=700",
//     // "men-metal-frame":
//     //   "https://images.pexels.com/photos/1438190/pexels-photo-1438190.jpeg?auto=compress&cs=tinysrgb&w=700",

//     "men-premium-optical":
//       "https://images.pexels.com/photos/13084948/pexels-photo-13084948.jpeg?auto=compress&cs=tinysrgb&w=700",


//     // =====================================================
//     // WOMEN'S EYEWEAR — NEW IMAGES
//     // =====================================================

//     "women-cateye-elegance":
//       "https://images.pexels.com/photos/5920017/pexels-photo-5920017.jpeg?auto=compress&cs=tinysrgb&w=700",

//     "women-oversized-round":
//       "https://images.pexels.com/photos/4947408/pexels-photo-4947408.jpeg?auto=compress&cs=tinysrgb&w=700",

//     "women-slim-halfrim":
//       "https://images.pexels.com/photos/16683295/pexels-photo-16683295.jpeg?auto=compress&cs=tinysrgb&w=700",

//     "women-butterfly-crystal":
//       "https://images.pexels.com/photos/18700611/pexels-photo-18700611.jpeg?auto=compress&cs=tinysrgb&w=700",

//     // "women-geometric-minimal":
//     //   "https://images.pexels.com/photos/6969332/pexels-photo-6969332.jpeg?auto=compress&cs=tinysrgb&w=700",

//     // "women-pearl-trim":
//     //   "https://images.pexels.com/photos/1479724/pexels-photo-1479724.jpeg?auto=compress&cs=tinysrgb&w=700",

//     // "women-round-gold":
//     //   "https://images.pexels.com/photos/8972136/pexels-photo-8972136.jpeg?auto=compress&cs=tinysrgb&w=700",

//     // "women-square-fashion":
//     //   "https://images.pexels.com/photos/5201901/pexels-photo-5201901.jpeg?auto=compress&cs=tinysrgb&w=700",

//     // "women-clear-frame":
//     //   "https://images.pexels.com/photos/1438190/pexels-photo-1438190.jpeg?auto=compress&cs=tinysrgb&w=700",

//     // "women-luxury-frame":
//     //   "https://images.pexels.com/photos/27237494/pexels-photo-27237494.jpeg?auto=compress&cs=tinysrgb&w=700",


//     // =====================================================
//     // KIDS' EYEWEAR — NEW IMAGES
//     // =====================================================

//     "kids-flexi-round":
//       "https://images.pexels.com/photos/5920017/pexels-photo-5920017.jpeg?auto=compress&cs=tinysrgb&w=700",

//     "kids-explorer-square":
//       "https://images.pexels.com/photos/4947408/pexels-photo-4947408.jpeg?auto=compress&cs=tinysrgb&w=700",

//     "kids-dino-print":
//       "https://images.pexels.com/photos/16683295/pexels-photo-16683295.jpeg?auto=compress&cs=tinysrgb&w=700",

//     "kids-star-cateye":
//       "https://images.pexels.com/photos/18700611/pexels-photo-18700611.jpeg?auto=compress&cs=tinysrgb&w=700",

//     // "kids-sporty-wrap":
//     //   "https://images.pexels.com/photos/6969332/pexels-photo-6969332.jpeg?auto=compress&cs=tinysrgb&w=700",

//     // "kids-rainbow-round":
//     //   "https://images.pexels.com/photos/1479724/pexels-photo-1479724.jpeg?auto=compress&cs=tinysrgb&w=700",

//     // "kids-blue-frame":
//     //   "https://images.pexels.com/photos/8972136/pexels-photo-8972136.jpeg?auto=compress&cs=tinysrgb&w=700",

//     // "kids-black-frame":
//     //   "https://images.pexels.com/photos/5201901/pexels-photo-5201901.jpeg?auto=compress&cs=tinysrgb&w=700",

//     // "kids-color-frame":
//     //   "https://images.pexels.com/photos/1438190/pexels-photo-1438190.jpeg?auto=compress&cs=tinysrgb&w=700",

//     // "kids-clear-round":
//     //   "https://images.pexels.com/photos/27237494/pexels-photo-27237494.jpeg?auto=compress&cs=tinysrgb&w=700",


//     // =====================================================
//     // SUNGLASSES — NEW IMAGES
//     // =====================================================

//     "sun-classic-aviator":
//       "https://images.pexels.com/photos/20689005/pexels-photo-20689005.jpeg?auto=compress&cs=tinysrgb&w=700",

//     "sun-retro-round":
//       "https://images.pexels.com/photos/9011193/pexels-photo-9011193.jpeg?auto=compress&cs=tinysrgb&w=700",

//     "sun-sport-shield":
//       "https://images.pexels.com/photos/21859044/pexels-photo-21859044.jpeg?auto=compress&cs=tinysrgb&w=700",

//     "sun-oversized-glam":
//       "https://images.pexels.com/photos/13471023/pexels-photo-13471023.jpeg?auto=compress&cs=tinysrgb&w=700",

//     // "sun-wood-square":
//     //   "https://images.pexels.com/photos/25096378/pexels-photo-25096378.jpeg?auto=compress&cs=tinysrgb&w=700",

//     // "sun-mirror-explorer":
//     //   "https://images.pexels.com/photos/27237494/pexels-photo-27237494.jpeg?auto=compress&cs=tinysrgb&w=700",

//     // "sun-black-classic":
//     //   "https://images.pexels.com/photos/13084948/pexels-photo-13084948.jpeg?auto=compress&cs=tinysrgb&w=700",

//     // "sun-modern-frame":
//     //   "https://images.pexels.com/photos/9011193/pexels-photo-9011193.jpeg?auto=compress&cs=tinysrgb&w=700",

//     // "sun-premium-dark":
//     //   "https://images.pexels.com/photos/20689005/pexels-photo-20689005.jpeg?auto=compress&cs=tinysrgb&w=700",

//     // "sun-fashion-square":
//     //   "https://images.pexels.com/photos/21859044/pexels-photo-21859044.jpeg?auto=compress&cs=tinysrgb&w=700"
//   };

//   return images[seed] || images["men-aviator-steel"];
// };

const img = (seed) => {
  const images = {

    // =====================================================
    // MEN'S EYEWEAR
    // =====================================================

    "men-round-bronze":
      "https://images.pexels.com/photos/1479724/pexels-photo-1479724.jpeg?auto=compress&cs=tinysrgb&w=700",

    "men-classic-black":
      "https://images.pexels.com/photos/8972136/pexels-photo-8972136.jpeg?auto=compress&cs=tinysrgb&w=700",

    "men-aviator-steel":
      "https://images.pexels.com/photos/10220082/pexels-photo-10220082.jpeg?auto=compress&cs=tinysrgb&w=700",

    "men-square-acetate":
      "https://images.pexels.com/photos/12720210/pexels-photo-12720210.jpeg?auto=compress&cs=tinysrgb&w=700",

    "men-titan-rimless":
      "https://images.pexels.com/photos/13430501/pexels-photo-13430501.jpeg?auto=compress&cs=tinysrgb&w=700",

    "men-wood-wayfarer":
      "https://images.pexels.com/photos/18279390/pexels-photo-18279390.jpeg?auto=compress&cs=tinysrgb&w=700",

    "men-carbon-sport":
      "https://images.pexels.com/photos/26762547/pexels-photo-26762547.jpeg?auto=compress&cs=tinysrgb&w=700",


    // =====================================================
    // WOMEN'S EYEWEAR
    // =====================================================

    "women-cateye-elegance":
      "https://images.pexels.com/photos/13430485/pexels-photo-13430485.jpeg?auto=compress&cs=tinysrgb&w=700",

    "women-oversized-round":
      "https://images.pexels.com/photos/13430477/pexels-photo-13430477.jpeg?auto=compress&cs=tinysrgb&w=700",

    "women-slim-halfrim":
      "https://images.pexels.com/photos/13430505/pexels-photo-13430505.jpeg?auto=compress&cs=tinysrgb&w=700",

    "women-butterfly-crystal":
      "https://images.pexels.com/photos/13430471/pexels-photo-13430471.jpeg?auto=compress&cs=tinysrgb&w=700",

    "women-geometric-minimal":
      "https://images.pexels.com/photos/7357971/pexels-photo-7357971.jpeg?auto=compress&cs=tinysrgb&w=700",

    "women-pearl-trim":
      "https://images.pexels.com/photos/9328548/pexels-photo-9328548.jpeg?auto=compress&cs=tinysrgb&w=700",


    // =====================================================
    // KIDS' EYEWEAR
    // =====================================================

    "kids-flexi-round":
      "https://images.pexels.com/photos/7357970/pexels-photo-7357970.jpeg?auto=compress&cs=tinysrgb&w=700",

    "kids-explorer-square":
      "https://images.pexels.com/photos/10130816/pexels-photo-10130816.jpeg?auto=compress&cs=tinysrgb&w=700",

    "kids-dino-print":
      "https://images.pexels.com/photos/7720709/pexels-photo-7720709.jpeg?auto=compress&cs=tinysrgb&w=700",

    "kids-star-cateye":
      "https://images.pexels.com/photos/12353761/pexels-photo-12353761.jpeg?auto=compress&cs=tinysrgb&w=700",

    "kids-sporty-wrap":
      "https://images.pexels.com/photos/25651730/pexels-photo-25651730.jpeg?auto=compress&cs=tinysrgb&w=700",

    "kids-rainbow-round":
      "https://images.pexels.com/photos/1499476/pexels-photo-1499476.jpeg?auto=compress&cs=tinysrgb&w=700",


    // =====================================================
    // SUNGLASSES
    // =====================================================

    "sun-classic-aviator":
      "https://images.pexels.com/photos/1548027/pexels-photo-1548027.jpeg?auto=compress&cs=tinysrgb&w=700",

    "sun-retro-round":
      "https://images.pexels.com/photos/5583998/pexels-photo-5583998.jpeg?auto=compress&cs=tinysrgb&w=700",

    "sun-sport-shield":
      "https://images.pexels.com/photos/5107723/pexels-photo-5107723.jpeg?auto=compress&cs=tinysrgb&w=700",

    "sun-oversized-glam":
      "https://images.pexels.com/photos/7822912/pexels-photo-7822912.jpeg?auto=compress&cs=tinysrgb&w=700",

    "sun-wood-square":
      "https://images.pexels.com/photos/2371940/pexels-photo-2371940.jpeg?auto=compress&cs=tinysrgb&w=700",

    "sun-mirror-explorer":
      "https://images.pexels.com/photos/6837219/pexels-photo-6837219.jpeg?auto=compress&cs=tinysrgb&w=700"
  };

  return images[seed] || images["men-aviator-steel"];
};
const products = [
  // ---------------- MEN'S EYEWEAR ----------------
  {
    id: 1,
    name: 'Aviator Classic Steel',
    brand: 'OpticStore Signature',
    category: "Men's Eyewear",
    price: 2499,
    image: img('men-aviator-steel'),
    description:
      'A timeless aviator silhouette reworked in brushed steel with anti-reflective lenses. Built for everyday confidence.',
    rating: 4.6,
    reviews: 128,
    stock: 24,
    frameMaterial: 'Stainless Steel',
    lensType: 'Anti-Reflective, Blue Light Filter',
    colors: ['Gunmetal', 'Matte Black', 'Gold'],
  },
  {
    id: 2,
    name: 'Urban Square Acetate',
    brand: 'Lenscraft',
    category: "Men's Eyewear",
    price: 1899,
    image: img('men-square-acetate'),
    description:
      'Bold square frames in premium Italian acetate. A sharp choice for the modern professional.',
    rating: 4.4,
    reviews: 96,
    stock: 30,
    frameMaterial: 'Acetate',
    lensType: 'Anti-Glare',
    colors: ['Tortoise', 'Jet Black', 'Navy'],
  },
  {
    id: 3,
    name: 'Titan Flex Rimless',
    brand: 'OpticStore Signature',
    category: "Men's Eyewear",
    price: 3299,
    image: img('men-titan-rimless'),
    description:
      'Ultra-light titanium rimless frame engineered for all-day comfort with a flexible memory bridge.',
    rating: 4.8,
    reviews: 74,
    stock: 15,
    frameMaterial: 'Titanium',
    lensType: 'Scratch-Resistant, UV400',
    colors: ['Silver', 'Rose Gold'],
  },
  {
    id: 4,
    name: 'Wood Grain Wayfarer',
    brand: 'Nordic Optics',
    category: "Men's Eyewear",
    price: 2199,
    image: img('men-wood-wayfarer'),
    description:
      'A wayfarer silhouette finished with genuine wood-grain textured temples for a distinctive, earthy look.',
    rating: 4.3,
    reviews: 58,
    stock: 18,
    frameMaterial: 'Acetate + Wood Veneer',
    lensType: 'Anti-Reflective',
    colors: ['Walnut', 'Ebony'],
  },
  {
    id: 5,
    name: 'Carbon Sport Wrap',
    brand: 'Lenscraft',
    category: "Men's Eyewear",
    price: 2799,
    image: img('men-carbon-sport'),
    description:
      'Performance-ready wraparound frame with a carbon-fibre finish built for active lifestyles.',
    rating: 4.5,
    reviews: 41,
    stock: 22,
    frameMaterial: 'TR90 Nylon',
    lensType: 'Impact-Resistant, Anti-Fog',
    colors: ['Matte Black', 'Graphite'],
  },
  {
    id: 6,
    name: 'Heritage Round Bronze',
    brand: 'OpticStore Signature',
    category: "Men's Eyewear",
    price: 2099,
    image: img('men-round-bronze'),
    description:
      'Vintage-inspired round metal frames with a warm bronze finish, reminiscent of classic library reading glasses.',
    rating: 4.2,
    reviews: 33,
    stock: 27,
    frameMaterial: 'Metal Alloy',
    lensType: 'Anti-Reflective',
    colors: ['Bronze', 'Antique Gold'],
  },

  // ---------------- WOMEN'S EYEWEAR ----------------
  {
    id: 7,
    name: 'Cat-Eye Elegance',
    brand: 'Lenscraft',
    category: "Women's Eyewear",
    price: 2399,
    image: img('women-cateye-elegance'),
    description:
      'A refined cat-eye shape with a subtle upward sweep, finished with crystal-effect temple tips.',
    rating: 4.7,
    reviews: 142,
    stock: 20,
    frameMaterial: 'Acetate',
    lensType: 'Anti-Reflective, Blue Light Filter',
    colors: ['Blush Pink', 'Tortoise', 'Black'],
  },
  {
    id: 8,
    name: 'Oversized Glam Round',
    brand: 'Nordic Optics',
    category: "Women's Eyewear",
    price: 2699,
    image: img('women-oversized-round'),
    description:
      'Statement oversized round frames that pair effortlessly with both casual and formal looks.',
    rating: 4.5,
    reviews: 87,
    stock: 19,
    frameMaterial: 'Acetate',
    lensType: 'UV400, Anti-Glare',
    colors: ['Champagne', 'Charcoal'],
  },
  {
    id: 9,
    name: 'Slim Metal Half-Rim',
    brand: 'OpticStore Signature',
    category: "Women's Eyewear",
    price: 1999,
    image: img('women-slim-halfrim'),
    description:
      'A delicate half-rim design in polished metal, designed to feel virtually weightless.',
    rating: 4.4,
    reviews: 63,
    stock: 25,
    frameMaterial: 'Metal Alloy',
    lensType: 'Anti-Reflective',
    colors: ['Rose Gold', 'Silver'],
  },
  {
    id: 10,
    name: 'Butterfly Crystal Fade',
    brand: 'Lenscraft',
    category: "Women's Eyewear",
    price: 2299,
    image: img('women-butterfly-crystal'),
    description:
      'Butterfly-shaped frames with a soft gradient fade from crystal to color for a dreamy finish.',
    rating: 4.6,
    reviews: 71,
    stock: 16,
    frameMaterial: 'Acetate',
    lensType: 'Anti-Glare, UV400',
    colors: ['Crystal Rose', 'Crystal Grey'],
  },
  {
    id: 11,
    name: 'Minimalist Geometric',
    brand: 'Nordic Optics',
    category: "Women's Eyewear",
    price: 1799,
    image: img('women-geometric-minimal'),
    description:
      'Clean hexagonal lenses on an ultra-thin metal frame for a modern, minimalist statement.',
    rating: 4.3,
    reviews: 45,
    stock: 28,
    frameMaterial: 'Titanium',
    lensType: 'Scratch-Resistant',
    colors: ['Matte Gold', 'Gunmetal'],
  },
  {
    id: 12,
    name: 'Pearl Trim Cat-Eye',
    brand: 'OpticStore Signature',
    category: "Women's Eyewear",
    price: 2599,
    image: img('women-pearl-trim'),
    description:
      'A playful cat-eye frame finished with delicate pearl detailing along the brow line.',
    rating: 4.8,
    reviews: 54,
    stock: 12,
    frameMaterial: 'Acetate',
    lensType: 'Anti-Reflective, Blue Light Filter',
    colors: ['Ivory Pearl', 'Black Pearl'],
  },

  // ---------------- KIDS EYEWEAR ----------------
  {
    id: 13,
    name: 'Flexi-Bend Junior Round',
    brand: 'Lenscraft Kids',
    category: 'Kids Eyewear',
    price: 1299,
    image: img('kids-flexi-round'),
    description:
      'Virtually unbreakable flexible frames designed for active kids, with soft rounded edges for safety.',
    rating: 4.7,
    reviews: 39,
    stock: 35,
    frameMaterial: 'TR90 Flexible Nylon',
    lensType: 'Impact-Resistant, UV400',
    colors: ['Sky Blue', 'Coral Pink', 'Mint Green'],
  },
  {
    id: 14,
    name: 'Little Explorer Square',
    brand: 'OpticStore Kids',
    category: 'Kids Eyewear',
    price: 1199,
    image: img('kids-explorer-square'),
    description:
      'Durable square frames sized for small faces, built to survive playground adventures.',
    rating: 4.5,
    reviews: 28,
    stock: 32,
    frameMaterial: 'TR90 Nylon',
    lensType: 'Scratch-Resistant',
    colors: ['Orange', 'Navy Blue'],
  },
  {
    id: 15,
    name: 'Dino Print Flex Frame',
    brand: 'Lenscraft Kids',
    category: 'Kids Eyewear',
    price: 1399,
    image: img('kids-dino-print'),
    description:
      'Fun dinosaur-print temples on a bendable frame that keeps young wearers smiling at check-ups.',
    rating: 4.6,
    reviews: 22,
    stock: 26,
    frameMaterial: 'TR90 Flexible Nylon',
    lensType: 'Impact-Resistant',
    colors: ['Green Dino', 'Blue Dino'],
  },
  {
    id: 16,
    name: 'Star Shine Cat-Eye Jr',
    brand: 'OpticStore Kids',
    category: 'Kids Eyewear',
    price: 1349,
    image: img('kids-star-cateye'),
    description:
      'A junior cat-eye frame with sparkly star accents, a favorite among younger kids.',
    rating: 4.4,
    reviews: 17,
    stock: 20,
    frameMaterial: 'TR90 Nylon',
    lensType: 'Anti-Glare',
    colors: ['Lilac', 'Sunshine Yellow'],
  },
  {
    id: 17,
    name: 'Sporty Bounce Wrap Jr',
    brand: 'Lenscraft Kids',
    category: 'Kids Eyewear',
    price: 1499,
    image: img('kids-sporty-wrap'),
    description:
      'A wraparound sport frame with a soft silicone strap option, ideal for outdoor play.',
    rating: 4.5,
    reviews: 24,
    stock: 18,
    frameMaterial: 'Silicone + TR90',
    lensType: 'Impact-Resistant, UV400',
    colors: ['Red', 'Black/Blue'],
  },
  {
    id: 18,
    name: 'Rainbow Round Flex',
    brand: 'OpticStore Kids',
    category: 'Kids Eyewear',
    price: 1249,
    image: img('kids-rainbow-round'),
    description:
      'Cheerful round frames in a soft gradient rainbow finish that kids love to wear.',
    rating: 4.3,
    reviews: 15,
    stock: 21,
    frameMaterial: 'TR90 Flexible Nylon',
    lensType: 'Scratch-Resistant',
    colors: ['Rainbow', 'Pastel Multi'],
  },

  // ---------------- SUNGLASSES ----------------
  {
    id: 19,
    name: 'Polarized Classic Aviator',
    brand: 'OpticStore Signature',
    category: 'Sunglasses',
    price: 2999,
    image: img('sun-classic-aviator'),
    description:
      'The original aviator, now with 100% polarized lenses that cut glare on sunny drives.',
    rating: 4.8,
    reviews: 201,
    stock: 40,
    frameMaterial: 'Stainless Steel',
    lensType: 'Polarized, UV400',
    colors: ['Gold/Green', 'Silver/Grey', 'Black/Black'],
  },
  {
    id: 20,
    name: 'Retro Round Tint',
    brand: 'Nordic Optics',
    category: 'Sunglasses',
    price: 1899,
    image: img('sun-retro-round'),
    description:
      'Small round lenses in a warm tint, channeling 70s retro cool with modern UV protection.',
    rating: 4.4,
    reviews: 66,
    stock: 30,
    frameMaterial: 'Metal Alloy',
    lensType: 'UV400, Gradient Tint',
    colors: ['Amber', 'Smoke'],
  },
  {
    id: 21,
    name: 'Sport Shield Wrap',
    brand: 'Lenscraft',
    category: 'Sunglasses',
    price: 2499,
    image: img('sun-sport-shield'),
    description:
      'A single-lens shield silhouette built for cycling and running, with a non-slip nose bridge.',
    rating: 4.6,
    reviews: 53,
    stock: 24,
    frameMaterial: 'TR90 Nylon',
    lensType: 'Polarized, Anti-Fog',
    colors: ['Matte Black', 'Neon Yellow'],
  },
  {
    id: 22,
    name: 'Oversized Glam Shades',
    brand: 'OpticStore Signature',
    category: 'Sunglasses',
    price: 2199,
    image: img('sun-oversized-glam'),
    description:
      'Red-carpet-ready oversized frames with dark gradient lenses for maximum sun coverage.',
    rating: 4.7,
    reviews: 88,
    stock: 17,
    frameMaterial: 'Acetate',
    lensType: 'UV400, Gradient Tint',
    colors: ['Black Gradient', 'Brown Gradient'],
  },
  {
    id: 23,
    name: 'Square Wood-Effect Shades',
    brand: 'Nordic Optics',
    category: 'Sunglasses',
    price: 2099,
    image: img('sun-wood-square'),
    description:
      'Square sunglasses with a wood-effect finish and polarized brown lenses for a natural look.',
    rating: 4.3,
    reviews: 34,
    stock: 23,
    frameMaterial: 'Acetate + Wood Veneer',
    lensType: 'Polarized',
    colors: ['Walnut Brown', 'Espresso'],
  },
  {
    id: 24,
    name: 'Mirror Lens Explorer',
    brand: 'Lenscraft',
    category: 'Sunglasses',
    price: 2399,
    image: img('sun-mirror-explorer'),
    description:
      'Reflective mirror lenses on a lightweight metal frame, designed for high-glare adventures.',
    rating: 4.5,
    reviews: 47,
    stock: 19,
    frameMaterial: 'Metal Alloy',
    lensType: 'Mirror Coated, Polarized',
    colors: ['Blue Mirror', 'Silver Mirror'],
  },
];

export default products;

export const categories = ["Men's Eyewear", "Women's Eyewear", 'Kids Eyewear', 'Sunglasses'];
