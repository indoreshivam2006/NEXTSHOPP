// Define interfaces for our product data
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: string;
  categoryId: string;
  featured: boolean;
  rating: number;
  reviewCount: number;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  features?: string[]; // Array of product features
}

// Mock data for development
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Samsung Galaxy S25",
    description: "5G AI Smartphone (Silver Shadow, 12GB RAM, 256GB Storage), 50MP Camera with Galaxy AI",
    price: 80999,
  
    images: [
      "/samsung_25.jpg?height=600&width=600",
      "/samsung_25_1.jpg",
      "/samsung_25_2.jpg",
      "/samsung_25_3.jpg",
      "/samsung_25_4.jpg",
      "/samsung_25_5.jpg",
      "/samsung_25_6.jpg",
      "/samsung_25_7.jpg",
      "/samsung_25_8.jpg",
      "/samsung_25_9.jpg",
      "/samsung_25_10.jpg",
      "/samsung_25_11.jpg",
    ],
    category: "Electronics",
    categoryId: "4",
    featured: true,
    rating: 4.8,
    reviewCount: 9058,
    sizes: ["128GB", "256GB", "512GB"],
    colors: [],
    inStock: true,
  },
  {
    id: "2",
    name: "Own the Run Colorblock Jacket",
    description: "A running jacket for all your daily miles, made with recycled materials.",
    price: 5599.99,
    originalPrice: 6999.99,
    discount: 20,
    images: [
      "/jacket_1.avif?height=600&width=600",
      "/jacket_2.avif",
      "/jacket_3.avif",
      "/jacket_4.avif"
    ],
    category: "Jacket",
    categoryId: "1",
    featured: true,
    rating: 4.2,
    reviewCount: 95,
    sizes: ["XS","S", "M", "L", "XL"],
    colors: [],
    inStock: true,
  },
 {
  id: "3",
  name: "Decazone Macrame Indoor Wall Hanging Shelf Chic.",
  description: "Decor Wood Floating Boho Shelves with Wooden Dowel Hand Woven Bohemian Decor for Apartment Dorm Bedroom Living Room Nursery 60 x 30 cm (Beige)  ",
  price: 284.00,
  originalPrice: 899.99,
  discount: 70,
  images: [
    "/home.jpg?height=600&width=600",
    "/home1.jpg",
    "/home2.jpg"
  ],
  category: "Home Decor",
  categoryId: "5",
  featured: true,
  rating: 4.2,
  reviewCount: 566,
  sizes: ["60 x 30 cm"],
  colors: ["Beige"],
  inStock: true,
  },
  {
    id: "4",
    name: "Decazone Macrame Indoor Wall Hanging Shelf Chic.",
    description: "A stylish macrame wall hanging shelf made from engineered wood. Perfect for office, bedroom, or living room spaces. Features 2 shelves with dimensions of 90D x 15W x 60H centimeters in a casual style.",
    price: 1979.00,
    originalPrice: 3599.99,
    discount: 45,
    images: [
      "/home_1.jpg?height=600&width=600",
      "/home_2.jpg",
      "/home_3.jpg",
      "/home_4.jpg",
      "/home_5.jpg",
      "/home_6.jpg",
      "/home_7.jpg"
    ],
    category: "Home Decor",
    categoryId: "5",
    featured: true,
    rating: 4.2,
    reviewCount: 236,
    sizes: ["90D x 15W x 60H Centimeters"],
    colors: ["Black"],
    inStock: true,

  },
  
  {
    id: "5",
    name: "Men Ribbed Knit Polo T-shirt",
    description: "Add a touch of sporty elegance to your wardrobe with this ribbed knit polo t-shirt. Featuring a classic johnny collar and half sleeves, this stylish piece combines comfort and a modern edge.",
    price: 799.00,
    originalPrice: 1299.00,
    discount: 30,
    images: [
      "/polo Tshrit1.jpg?height=600&width=600",
      "/polo Tshrit2.jpg",
      "/polo Tshrit3.jpg",
      "/polo Tshrit4.jpg",
      "/polo Tshrit5.jpg",
      "/polo Tshrit6.jpg",
      "/polo Tshrit7.jpg"
    ],
    category: "T-shirt",
    categoryId: "1",
    featured: true,
    rating: 4.8,
    reviewCount: 5000,
    sizes: ["S", "M", "L", "XL", "3XL"],
    colors: ["#b8767a"],
    inStock: true,
  },
  {
    id: "6",
    name: "Nike Mercurial Vapor 16 Elite By You",
    description: "Lightweight running shoes with responsive cushioning.",
    price: 24500.00,
    originalPrice: 24895.00,
    discount: 15,
    images: [
      "/football shoes1.avif?height=600&width=600",
      "/football shoes2.avif",
      "/football shoes3.avif",
      "/football shoes4.avif",
      "/football shoes5.avif",
      "/football shoes6.avif"
    ],
    category: "Footwear",
    categoryId: "2",
    featured: true,
    rating: 4.8,
    reviewCount: 213,
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
    colors: ["#d4af37", "#FFFFFF"],
    inStock: true,
  },
  {
    id: "7",
    name: "Nike Mercurial Vapor 16 Elite By You",
    description: "Lightweight running shoes with responsive cushioning.",
    price: 24500.00,
    originalPrice: 24895.00,
    discount: 15,
    images: [
      "/football shoes_black1.avif?height=600&width=600",
      "/football shoes_black2.avif",
      "/football shoes_black3.avif",
      "/football shoes_black4.avif",
      "/football shoes_black5.avif",
      "/football shoes_black6.avif"
    ],
    category: "Footwear",
    categoryId: "2",
    featured: true,
    rating: 4.8,
    reviewCount: 213,
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
    colors: ["#0A0A0A", "#d4af37"],
    inStock: true,
  },

  {
    id: "8",
    name: "GG Marmont leather bi-fold wallet",
    description: "Genuine leather wallet with multiple card slots and a coin pocket.",
    price: 2000.00,
    originalPrice: 2500.00,
    discount: 20,
    images: [
      "/gucci_1.avif?height=600&width=600",
      "/gucci_2.avif",
      "/gucci_3.avif"
    ],
    category: "Accessories",
    categoryId: "3",
    featured: false,
    rating: 4.6,
    reviewCount: 78,
    sizes: [],
    colors: [],
    inStock: true,
  },
  {
    id: "9",  
    name: "Razer BlackShark V2 X Wired Gaming On Ear Headset",
    description: "Razer BlackShark V2 X Wired Gaming On Ear Headset - Black|7.1 Surround Sound-50mm Drivers-Memory Foam Cushion-for PC,PS4,PS5,Switch,Xbox One,Xbox Series X|S,Mobile-3.5mm Audio Jack-RZ04-03240100-R3M1",
    price: 2499.00,
    originalPrice: 7999.00,
    discount: 70,
    images: [
      "/razer_1.jpg?height=600&width=600",
      "/razer_2.jpg",
      "/razer_3.jpg",
      "/razer_4.jpg",
      "/razer_5.jpg",
      "/razer_6.jpg",
      "/razer_7.jpg"
    ],
    category: "Electronics",
    categoryId: "4",
    featured: false,
    rating: 4.7,
    reviewCount: 1059,
    sizes: [],
    colors: ["#000000", "#FFFFFF"],
    inStock: true,
  },
  {
    id: "10",
    name: "2-pack bracelets",
    description: "Weight: 22g\nPieces/Pairs: 2\nAccessory Style: Chain necklace, Pendant necklace\nColors: Gold-coloured/Red/White\n Price: Rs. 999.00 (incl. of all taxes)\n Country of production: India \nCommon generic name: Bracelet \nNet Quantity: 2 N (1 Pack)",
    price: 999.00,
    originalPrice: 1999.00,
    discount: 50,
    images: [
      "/assss_1.avif?height=600&width=600",
      "/assss_2.avif"
    ],
    category: "Accessories",
    categoryId: "3",
    featured: false,
    rating: 4.4,
    reviewCount: 8529,
    sizes: [],
    colors: [],
    inStock: true,
  },
  {
    id: "11",
    name: "ColorFit Pro 6 Max",
    description: "1.96 AMOLED Display, AI Create, AI Companion",
    price: 7999.00,
    originalPrice: 10999.00,
    discount: 30,
    images: [
      "/noice_1.webp?height=600&width=600",
      "/noice_2.webp",
      "/noice_3.webp",
      "/noice_4.webp",
      "/noice_5.webp", 
      "/noice_6.webp",
    ],
    category: "Electronics",
    categoryId: "4",
    featured: true,
    rating: 4.8,
    reviewCount: 90584,
    sizes: [],
    colors: ["#000000", "#8a827c"],
    inStock: true,
    features: [
      "1.96 AMOLED Display for vibrant visuals",
      "AI Create functionality for personalized features",
      "AI Companion for smart assistance",
      "Stylish design with premium finish",
      "Long battery life of up to 7 days"
    ]
  },
  {
    id: "12",
    name: "Voyage UV Protection Wayfarer Sunglasses for Men & Women ",
    description: "Frame Shape: Wayfarer | Feature: UV Protected | Lens Colour: Black | Frame Colour: Black | Frame Material: Metal | Lens Material: CR 39 (Plastic Polymer) | Care Instructions: Remove dust and grime by gently wiping the lens with a cloth | Lens Width (mm): 52mm | Nose Length (mm): 17mm | Temple Length (mm): 150mm",
    price: 900.00,
    originalPrice: 3000.00,
    discount: 70,
    images: [
      "/glass1.jpg?height=600&width=600",
      "/glass2.jpg",
      "/glass3.jpg",
      "/glass4.jpg",
      "/glass5.jpg"
    ],
    category: "Accessories",
    categoryId: "3",
    featured: false,
    rating: 4.1,
    reviewCount: 8513,
    sizes: [],
    colors: [],
    inStock: true,
  },
  {
    id: "13",
    name: "boAt Rockerz 650 Pro",
    description: "Wireless Headphone with 80 Hours Playback, Dolby Audio, Touch & Swipe Controls",
    price: 2999.00,
    originalPrice: 8990.00,
    discount: 60,
    images: [
      "/headphone_1.webp?height=600&width=600",
      "/headphone_2.webp",
      "/headphone_3.webp",
      "/headphone_4.webp",
      "/headphone_5.webp",
      "/headphone_6.webp",
      "/headphone_7.webp",
      "/headphone_8.webp",
      "/headphone_9.webp",
      "/headphone_10.webp",
      "/headphone_11.webp",
      "/headphone_12.webp",
    ],
    category: "Electronics",
    categoryId: "4",
    featured: false,
    rating: 4.8,
    reviewCount: 15559,
    sizes: [],
    colors: ["#2c3e50", "#FFFFFF"],
    inStock: true,
  },
  {
    id: "14",
    name: "L'Oreal Paris Infallible Matte Resistance Liquid Lipstick",
    description: "Dimethicone, Isododecane, Trimethylsiloxysilicate, Nylon-611/Dimethicone Copolymer, Dimethicone Crosspolymer, C30-45 Alkyldimethylsilyl Polypropylsilsesquioxane, Lauroyl Lysine, Silica Silylate, Phenoxyethanol, Ethylhexyl Palmitate, Triethoxysilylethyl Polydimethylsiloxyethyl Dimethicone, Isopropyl Titanium Triisostearate, Trihydroxystearin, Benzyl Alcohol, Sodium Hyaluronate, Glucomannan, Parfum / Fragrance. [+/- May Contain: Ci 77891 / Titanium Dioxide, Ci 15850 / Red 7, Ci 77491, Ci 77492, Ci 77499 / Iron Oxides, Ci 45380 / Red 22 Lake, Ci 45410 / Red 28 Lake, Ci 15985 / Yellow 6 Lake, Ci 19140 / Yellow 5 Lake, Ci 15850 / Red 6, Ci 42090 / Blue 1 Lake]. (F.I.L. Y70028100/2).",
    price: 649.00,
    originalPrice: 999.00,
    discount: 35,
    images: [
      "/lipstick_1.avif?height=600&width=600",
      "/lipstick_2.avif",
      "/lipstick_3.avif",
      "/lipstick_4.avif",
      "/lipstick_5.avif",
      "/lipstick_6.avif",
      "/lipstick_7.avif",
      "/lipstick_8.avif",
      "/lipstick_9.avif",
      "/lipstick_10.avif"
    ],
    category: "Beauty",
    categoryId: "6",
    featured: false,
    rating: 4.8,  
    reviewCount: 1559,
    sizes: [],
    colors: ["#c94c4c"],
    inStock: true,
  },
  {
    id: "15",
    name: "Men Mid-Top Lace-Up Sneakers",
    description: "Wipe with a clean, dry cloth when needed. Benefits: Engineered for comfort with a lightweight design and cushioned insoles, they provide all-day support without compromising on style. Casual. Memory foam insole. Lace Fastening. 45-day warranty against manufacturing defects. PU upper. Package contains: 1 pair of sneakers.",
    price: 1206.00,
    originalPrice: 6699.00,
    discount: 82,
    images: [
      "/red_tape1.avif?height=600&width=600",
      "/red_tape2.avif",
      "/red_tape3.avif",
      "/red_tape4.avif",
      "/red_tape5.avif",
      "/red_tape6.avif",
      "/red_tape7.avif"
    ],
    category: "Footwear",
    categoryId: "2",
    featured: true,
    rating: 4.3,
    reviewCount: 152,
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
    colors: ["#8b5a2b", "#FFFFFF"],
    inStock: true,
  },
  {
    id: "16",
    name: "X Lows PINECONE",
    description: "Sombre hues of brown and olive. An mnemonic of the vast timber trails of India. PINECONE is a rendezvous with solitude. A moment of hush amidst chaos. Let this be the one to reawaken your tranquillity and embark you on new journeys. Funk it up with an added Brown shoelace.",
    price: 3439.00,
    originalPrice: 4299.00,
    discount: 20,
    images: [
      "/comet1.webp?height=600&width=600",
      "/comet2.webp",
      "/comet3.webp",
      "/comet4.webp",
      "/comet5.webp",
      "/comet6.webp",
      "/comet7.webp"
    ],
    category: "Footwear",
    categoryId: "2",
    featured: true,
    rating: 4.6,
    reviewCount: 1954,
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
    colors: ["#a55a2a", "#4b4434", "#FFFFFF"],
    inStock: true,
  },
  {
    id: "17",
    name: "iPhone 16 Plus",
    description: "128 GB: 5G Mobile Phone with Camera Control, A18 Chip and a Big Boost in Battery Life. Works with AirPods; Black",
    price: 82900,
    originalPrice: 89900,
    discount: 8,
  
    images: [
      "/iphone_1.jpg?height=600&width=600",
      "/iphone_2.jpg",
      "/iphone_3.jpg",
      "/iphone_4.jpg",
      "/iphone_5.jpg",
      "/iphone_6.jpg"
    ],
    category: "Electronics",
    categoryId: "4",
    featured: true,
    rating: 4.5,
    reviewCount: 275,
    sizes: ["128GB", "256GB", "512GB"],
    colors: [],
    inStock: true,
  },
  {
    id: "18",
    name: "Rado Hyperchrome Chronograph",
    description: "Introduced in 2012, HyperChrome draws on elements of vintage Rado watches while embracing modern technology and style. The collection with its diverse range of models, has successfully positioned itself as a timepiece for everyday wear and varied occasions. Central to the collection is Rado's signature use of high-tech ceramics which features an innovative monobloc case construction that integrates the case and its components into a seamless piece. This technique not only ensures strength and lightness but also contributes to the watch's distinctive look. The design often showcases a polished or matte finish, which gives each timepiece a contemporary yet elegant appeal.",
    price: 183800,
    originalPrice: 204200,
    discount: 10,
  
    images: [
      "/rado1.png?height=600&width=600",
      "/rado2.avif",
      "/rado3.avif",
      "/rado4.avif",
      "/rado5.avif"
    ],
    category: "Watches",
    categoryId: "3",
    featured: true,
    rating: 4.5,
    reviewCount: 275,
    sizes: [],
    colors: [],
    inStock: true,
  },
  
  {
    id: "19",
    name: "Lymio Men Cargo",
    description: "Men Cargo Pants || Men Cargo Pants Cotton || Cargos for Men (Cargo-38-41)",
    price: 699.00,
    originalPrice: 4599.00,
    discount: 85,
    images: [
      "/cargo_1.jpg?height=600&width=600",
      "/cargo_2.jpg",
      "/cargo_3.jpg",
      "/cargo_4.jpg",
      "/cargo_5.jpg"
    ],
    category: "Pant",
    categoryId: "1",
    featured: true,
    rating: 3.9,
    reviewCount: 992,
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["#000000"],
    inStock: true,
  },
  
  {
    id: "20",
    name: "Suede-effect bomber jacket",
    description: "Suede-effect bomber jacket",
    price: 1999.00,
    originalPrice: 9990.00,
    discount: 33,
    images: [
      "/bomber_1.avif?height=600&width=600",
      "/bomber_2.avif",
      "/bomber_3.avif",
      "/bomber_4.avif",
      "/bomber_5.avif",
      "/bomber_6.avif"
    ],
    category: "Jacket",
    categoryId: "1",
    featured: true,
    rating: 4.5,  
    reviewCount: 1000,
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["#A1866F"],
    inStock: true,
  },
  {
    id: "21",
    name: "IMNISHNAY Tree Lamp for Baby Room",
    description: "Decor, Pearl LED Fairy Lights Spirit Tree, Bonsai Tree Light, LED Tree Lamp, Twinkling Tree Light Decoration for Room, Wedding. Brand: IMNISHNAY. Product Dimensions: 20D x 10W x 10H Centimeters. Colour: 36 Pearl Tree. Material: Plastic. Item Weight: 0.31 Kilograms. Package Quantity: 1. Recommended Uses: Decoration. Occasion: Any occasion. Special Feature: Energy Efficient. Tree Type: Bonsai.",
    price: 599.00,
    originalPrice: 1999.00,
    discount: 70,
    images: [
      "/lamp_tree1.jpg?height=600&width=600",
      "/lamp_tree2.jpg",
      "/lamp_tree3.jpg",
      "/lamp_tree4.jpg",
      "/lamp_tree5.jpg",
      "/lamp_tree6.jpg"
    ],
    category: "Lamp",
    categoryId: "5",
    featured: true,
    rating: 4.0,
    reviewCount: 512,
    sizes: ["20D x 10W x 10H Centimeters"],
    colors: ["#e3cc4a"],
    inStock: true,

  },
  {
    id: "22",
    name: "Odara Jewellery Self design uncut polki tukdi in center with pirohi work hasli",
    description: "Add a touch of quirkiness to your outfit with this self design uncut polki tukdi necklace. The center features intricate pirohi work, while the hasli adds a playful twist. Stand out from the crowd with this unique piece! ",
    price: 2999.00,
    originalPrice: 3800.00,
    discount: 20,
    images: [
      "/necklace.webp?height=600&width=600",
      "/necklace1.webp",
      "/necklace2.webp",
      "/necklace3.webp",
      "/necklace4.webp"
    ],
    category: "Jewellery",
    categoryId: "3",
    featured: false,
    rating: 4.9,
    reviewCount: 10594,
    sizes: [],
    colors: [],
    inStock: true,
  },
  {
    id: "23",
    name: "LUNA BLU Ivory Pearlescent Wedge-Heel Sandals",
    description: "These ivory sandals from Luna Blu exude elegance with pearlescent detailing on the straps. Designed for both style and stability, they feature an elevated wedge heel for added height and balanced support. The padded insole ensures all-day comfort, while the textured outsole provides a secure grip with every step. Dimensions: 22.5cm. Net Quantity: 2N (1 Pair). Care Instruction: Dry Clean. Sole Material: TPR. Upper Material: Beaded.",
    price: 1699.00,
    originalPrice: 2499.00,
    discount: 32,
    images: [
      "/ladies1.webp?height=600&width=600",
      "/ladies2.webp",
      "/ladies3.webp",
      "/ladies4.webp"
    ],
    category: "Ladies",
    categoryId: "2",
    featured: true,
    rating: 4.8,
    reviewCount: 954,
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
    colors: ["#f5e8d2"],
    inStock: true,
  },
  {
    id: "24",
    name: "Kids Unisex Pureboost Running Shoes",
    description: "Foot-hugging running shoes made in part with recycled materials.",
    price: 4000.00,
    originalPrice: 9999.00,
    discount: 59,
    images: [
      "/kids1.avif?height=600&width=600",
      "/kids2.avif",
      "/kids3.avif",
      "/kids4.avif",
      "/kids5.avif",
      "/kids6.avif",
      "/kids7.avif"
    ],
    category: "Kids",
    categoryId: "2",
    featured: true,
    rating: 3.9,
    reviewCount: 485,
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
    colors: ["#ffffff"],
    inStock: true,
  },
  {
    id: "25",
    name: "Coral Blue Woven Paithani Silk Saree With Contrast Blouse",
    description: `Exquisite Paithani silk saree, handwoven with love and precision. Adorned with intricate peacock and floral motifs, a true masterpiece. Soft, lustrous silk fabric, perfect for special occasions. A timeless classic, steeped in tradition and elegance.

Saree length: 5.5 meter

Blouse piece:  0.8 meter

Fabric: Blended silk.`,
    price: 7899.00,
    originalPrice: 15798.00,
    discount: 50,
    images: [
      "/saree1.webp?height=600&width=600",
      "/saree2.webp",
      "/saree3.webp",
      "/saree4.webp",
      "/saree5.webp"
    ],
    category: "Saree",
    categoryId: "1",
    featured: true,
    rating: 4.9,
    reviewCount: 4856,
    sizes: [],
    colors: ["#005b5c", "#d4af37"],
    inStock: true,
  },
  {
    id: "26",
    name: "VRCT Antique Design Lantern Ceiling Hanging Pendant Light",
    description: `Decoration of Home, Restaurant - 3 Set Piece (Bulb not Included)(AC/DC, Metal)  
Brand	VRCT
Colour	Black
Material	Metal
Style	Vintage
Light fixture form	Pendant
Room Type	indoor
Product Dimensions	11L x 11W x 9.4H Centimeters
Indoor/Outdoor Usage	Indoor
Power Source	AC/DC
Installation Type	Ceiling Mount`,
    price: 849.00,
    originalPrice: 1490.00,
    discount: 43,
    images: [
      "/hanging_lamp.jpg?height=600&width=600",
      "/hanging_lamp1.jpg",
      "/hanging_lamp2.jpg",
      "/hanging_lamp3.jpg"
    ],
    category: "Lamp",
    categoryId: "5",
    featured: true,
    rating: 3.7,
    reviewCount: 357,
    sizes: ["20D x 10W x 10H Centimeters"],
    colors: ["#000000"],
    inStock: true,

  },
  {
    id: "27",
    name: "Bhoomi Impex Bedsheets for King Bed - Microfiber Plain King Size Bed Sheet",
    description: "Include Pillow Cover, Ultra Soft | for Home, Hotel, Villa, Resort and Guest House_Navy Blue Solid",
    price: 498.00,
    originalPrice: 999.00,
    discount: 50,
    images: [
      "/bed_1.jpg?height=600&width=600",
      "/bed_2.jpg",
      "/bed_3.jpg"
    ],
    category: "Bedsheet",
    categoryId: "5",
    featured: true,
    rating: 4.7,
    reviewCount: 456,
    sizes: ["Double - 90x100 Inch"],
    colors: ["#1c2d3f"],
    inStock: true,
  },
  {
    id: "28",
    name: "FACESCANADA All Day Hydra Matte Foundation",
    description: "3-In-1 Foundation + Moisturizer Cream + Spf 30|24 Hr Aloe Hydration&Vitamin C|10Hr Long Wear|Medium To High Buildable Coverage|Rose Ivory 011|25Ml,Pack Of 1",
    price: 312.00,
    originalPrice: 549.00,
    discount: 43,
    images: [
      "/foundation_1.jpg?height=600&width=600",
      "/foundation_2.jpg",
      "/foundation_3.jpg",
      "/foundation_4.jpg",
      "/foundation_5.jpg",
      "/foundation_6.jpg",
      "/foundation_7.jpg"
    ],
    category: "Foundation",
    categoryId: "6",
    featured: false,
    rating: 4.0,  
    reviewCount: 1650,
    sizes: [],
    colors: ["#EDC7B7"],
    inStock: true,
  },
  {
    id: "29",
    name: "Lakme Eyeconic Liquid Eye Liner",
    description: `Black, Long Lasting Matte Waterproof Liner - Smudge Proof, Transfer Proof Eye Makeup for 24 hrs, 4.5 ml Colour	Black
Brand	LAKMÉ
Item Form	Liquid
Finish Type	Matte
Special Feature	Transfer Proof, Smudge Resistant
Product Benefits	Long Lasting
Number of Items	1
Net Quantity	4.5 millilitre
Coverage	Medium
Eyelid Colour Type	Eye Liner`,
    price: 229.00,
    originalPrice: 275.00,
    discount: 16,
    images: [
      "/eye1.jpg?height=600&width=600",
      "/eye2.jpg",
      "/eye3.jpg",
      "/eye4.jpg",
      "/eye5.jpg",
      "/eye6.jpg",
      "/eye7.jpg",
      "/eye8.jpg",
      "/eye9.jpg"
    ],
    category: "Eye",
    categoryId: "6",
    featured: false,
    rating: 4.2,  
    reviewCount: 9486,
    sizes: [],
    colors: ["#000000"],
    inStock: true,
  },
  {
    id: "30",
    name: "Lakme Rose Loose Face Powder",
    description: `Sunscreen, Soft Pink, Face Makeup for a Rosy Glow - Matte Finish for Oily Skin Control, 40 g    Brand	LAKMÉ
Item Form	Loose
Colour	Soft Pink
Finish Type	Natural
Skin Type	Oily
Product Benefits	Long Lasting,Uv Protection,Oil Control,Softening,Easy Application,Spf Rich
Number of Items	1`,
    price: 173.00,
    originalPrice: 250.00,
    discount: 30,
    images: [
      "/powder1.jpg?height=600&width=600",
      "/powder2.jpg",
      "/powder3.jpg",
      "/powder4.jpg",
      "/powder5.jpg",
      "/powder6.jpg",
      "/powder7.jpg",
      "/powder8.jpg"
    ],
    category: "Powder",
    categoryId: "6",
    featured: false,
    rating: 4.2,  
    reviewCount: 36975,
    sizes: [],
    colors: ["#e8c7b0"],
    inStock: true,
  }


  
]

export async function getProducts() {
  try {
    // In a real app, you would fetch from Firestore
    // const productsCollection = collection(db, "products");
    // const productsSnapshot = await getDocs(productsCollection);
    // return productsSnapshot.docs.map(doc => ({
    //   id: doc.id,
    //   ...doc.data()
    // }));

    // For development, return mock data
    return mockProducts
  } catch (error) {
    console.error("Error getting products:", error)
    throw error
  }
}

export async function getFeaturedProducts() {
  try {
    // In a real app, you would fetch from Firestore
    // const productsCollection = collection(db, "products");
    // const q = query(productsCollection, where("featured", "==", true), limit(3));
    // const productsSnapshot = await getDocs(q);
    // return productsSnapshot.docs.map(doc => ({
    //   id: doc.id,
    //   ...doc.data()
    // }));

    // For development, return mock data
    return mockProducts.filter((product) => product.featured).slice(0, 3)
  } catch (error) {
    console.error("Error getting featured products:", error)
    throw error
  }
}

export async function getProductById(id: string) {
  try {
    // In a real app, you would fetch from Firestore
    // const productDoc = doc(db, "products", id);
    // const productSnapshot = await getDoc(productDoc);
    // if (!productSnapshot.exists()) {
    //   return null;
    // }
    // return {
    //   id: productSnapshot.id,
    //   ...productSnapshot.data()
    // };

    // For development, return mock data
    const product = mockProducts.find((product) => product.id === id)
    return product || null
  } catch (error) {
    console.error("Error getting product:", error)
    throw error
  }
}

export async function getProductsByCategory(categoryId: string) {
  try {
    // In a real app, you would fetch from Firestore
    // const productsCollection = collection(db, "products");
    // const q = query(productsCollection, where("categoryId", "==", categoryId));
    // const productsSnapshot = await getDocs(q);
    // return productsSnapshot.docs.map(doc => ({
    //   id: doc.id,
    //   ...doc.data()
    // }));

    // For development, filter the mock data
    const filtered = mockProducts.filter(product => product.categoryId === categoryId);
    return filtered;
  } catch (error) {
    console.error("Error getting products by category:", error);
    throw error;
  }
}

export async function getRelatedProducts(categoryId: string, currentProductId: string) {
  try {
    // In a real app, you would fetch from Firestore
    // const productsCollection = collection(db, "products");
    // const q = query(
    //   productsCollection,
    //   where("categoryId", "==", categoryId),
    //   where("id", "!=", currentProductId),
    //   limit(4)
    // );
    // const productsSnapshot = await getDocs(q);
    // return productsSnapshot.docs.map(doc => ({
    //   id: doc.id,
    //   ...doc.data()
    // }));

    // For development, return mock data
    return mockProducts
      .filter((product) => product.categoryId === categoryId && product.id !== currentProductId)
      .slice(0, 4)
  } catch (error) {
    console.error("Error getting related products:", error)
    throw error
  }
}

export async function searchProducts(searchTerm: string) {
  try {
    // In a real app, you would use Firestore or a search service like Algolia
    // For development, return mock data with simple filtering
    return mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  } catch (error) {
    console.error("Error searching products:", error)
    throw error
  }
}

export async function getFilteredProducts(filters: {
  categoryIds?: string[];
  brandIds?: string[];
  colors?: string[];
  priceRange?: [number, number];
  sizes?: string[];
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest';
  inStock?: boolean;
}) {
  try {
    // In a real app, you would use Firestore queries with where clauses
    
    // Start with all products
    let filteredProducts = [...mockProducts];
    
    // Apply category filter
    if (filters.categoryIds && filters.categoryIds.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        filters.categoryIds?.includes(product.categoryId)
      );
    }
    
    // Apply brand filter (using category as proxy for brand in our mock data)
    if (filters.brandIds && filters.brandIds.length > 0) {
      // This would be enhanced in a real app with actual brand data
      filteredProducts = filteredProducts.filter(product => {
        // In this example, we're simulating brands based on product names
        const hasBrand = filters.brandIds?.some(brandId => {
          if (brandId === "1" && product.name.toLowerCase().includes("nike")) return true;
          if (brandId === "2" && product.name.toLowerCase().includes("adidas")) return true;
          if (brandId === "3" && product.name.toLowerCase().includes("apple")) return true;
          if (brandId === "4" && product.name.toLowerCase().includes("samsung")) return true;
          if (brandId === "5" && product.name.toLowerCase().includes("sony")) return true;
          return false;
        });
        return hasBrand;
      });
    }
    
    // Apply color filter
    if (filters.colors && filters.colors.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        product.colors.some(color => filters.colors?.includes(color))
      );
    }
    
    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filteredProducts = filteredProducts.filter(product => 
        product.price >= min && product.price <= max
      );
    }
    
    // Apply size filter
    if (filters.sizes && filters.sizes.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        product.sizes.some(size => filters.sizes?.includes(size))
      );
    }
    
    // Apply in-stock filter
    if (filters.inStock !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.inStock === filters.inStock
      );
    }
    
    // Apply sorting
    if (filters.sortBy) {
      switch(filters.sortBy) {
        case 'price-asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          // In a real app, we'd have a timestamp field to sort by
          // Here we're just using ID as a stand-in for recency
          filteredProducts.sort((a, b) => Number(b.id) - Number(a.id));
          break;
      }
    }
    
    return filteredProducts;
  } catch (error) {
    console.error("Error filtering products:", error);
    throw error;
  }
}

// Function to get all available product filters (for dynamic filter UI)
export async function getProductFilters() {
  try {
    // Generate price range (min/max) from products
    const prices = mockProducts.map(product => product.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    // Extract all unique categories
    const categories = [...new Set(mockProducts.map(product => ({
      id: product.categoryId,
      name: product.category
    })))].reduce((unique, item) => {
      const exists = unique.some(i => i.id === item.id);
      return exists ? unique : [...unique, item];
    }, [] as {id: string, name: string}[]);
    
    // Extract all unique colors
    const colors = [...new Set(mockProducts.flatMap(product => product.colors))];
    
    // Extract all unique sizes
    const sizes = [...new Set(mockProducts.flatMap(product => product.sizes))];
    
    // Brands (simulated in our example)
    const brands = [
      { id: "1", name: "Nike" },
      { id: "2", name: "Adidas" },
      { id: "3", name: "Apple" },
      { id: "4", name: "Samsung" },
      { id: "5", name: "Sony" },
    ];
    
    return {
      priceRange: {min: minPrice, max: maxPrice},
      categories,
      colors,
      sizes,
      brands
    };
  } catch (error) {
    console.error("Error getting product filters:", error);
    throw error;
  }
}
