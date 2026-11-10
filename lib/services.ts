
export type Service = {
  id: string;
  title: string;
  priceNPR: number;
  detail: string;
  note?: string;
};

export type ServiceGroup = {
  id: string;
  title: string;
  items: Service[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "portraits",
    title: "Portraits and personal photography",
    items: [
      { id: "individual", title: "Individual portrait", priceNPR: 2500, detail: "30-45 minutes, 10 edited photos", note: "Natural light, one location in Sunwal" },
      { id: "headshot", title: "Professional headshot", priceNPR: 1500, detail: "5 edited professional portraits", note: "Ideal for CVs, LinkedIn and professional profiles" },
      { id: "graduation", title: "Graduation photoshoot", priceNPR: 2500, detail: "30-45 minutes, 10 edited photos", note: "Individual or graduation portraits" },
      { id: "birthday-portrait", title: "Birthday portrait", priceNPR: 2500, detail: "30 minutes, 10 edited photos", note: "Individual birthday portraits" },
      { id: "fashion", title: "Fashion photoshoot", priceNPR: 4000, detail: "1 hour, 15 edited photos", note: "Outdoor or suitable indoor location" },
      { id: "model-portfolio", title: "Model portfolio", priceNPR: 5000, detail: "1-1.5 hours, 20 edited photos", note: "Multiple poses and looks" },
      { id: "personal-branding", title: "Personal branding", priceNPR: 4000, detail: "1 hour, 15 edited photos", note: "For entrepreneurs and professionals" },
      { id: "outdoor", title: "Outdoor photoshoot", priceNPR: 4000, detail: "1 hour, 20 edited photos", note: "Travel beyond Sunwal quoted separately" },
      { id: "indoor", title: "Indoor portrait session", priceNPR: 3000, detail: "45 minutes, 12 edited photos", note: "Subject to suitable lighting and location" },
      { id: "maternity", title: "Maternity photoshoot", priceNPR: 4500, detail: "1 hour, 20 edited photos", note: "Individual or family maternity portraits" },
      { id: "newborn", title: "Newborn lifestyle session", priceNPR: 5000, detail: "1 hour, 20 edited photos", note: "Natural family moments; no unsafe posing" },
      { id: "family", title: "Family photoshoot", priceNPR: 4000, detail: "1 hour, 20 edited photos", note: "One family, one location" },
      { id: "siblings", title: "Sibling photoshoot", priceNPR: 3000, detail: "45 minutes, 15 edited photos" },
      { id: "friends", title: "Friends photoshoot", priceNPR: 3500, detail: "1 hour, 15 edited photos" },
      { id: "couple", title: "Couple photoshoot", priceNPR: 4500, detail: "1-1.5 hours, 25 edited photos", note: "Candid and posed photography" },
      { id: "anniversary", title: "Anniversary photoshoot", priceNPR: 4000, detail: "1 hour, 20 edited photos" },
      { id: "pet-portrait", title: "Pet portrait", priceNPR: 2000, detail: "30-45 minutes, 10 edited photos", note: "Dogs and other companion animals" }
    ]
  },

  {
    id: "cultural",
    title: "Nepali cultural ceremonies",
    items: [
      { id: "pasni", title: "Pasni ceremony", priceNPR: 8000, detail: "Up to 2 hours, 60 edited photos" },
      { id: "bratabandha", title: "Bratabandha ceremony", priceNPR: 10000, detail: "Up to 3 hours, 80 edited photos" },
      { id: "griha-pravesh", title: "Griha Pravesh", priceNPR: 7000, detail: "Up to 2 hours, 50 edited photos" },
      { id: "nwaran", title: "Nwaran ceremony", priceNPR: 7000, detail: "Up to 2 hours, 50 edited photos" },
      { id: "chhewar", title: "Chhewar ceremony", priceNPR: 8000, detail: "Up to 2 hours, 60 edited photos" },
      { id: "gunyo-cholo", title: "Gunyo Cholo", priceNPR: 8000, detail: "Up to 2 hours, 60 edited photos" },
      { id: "mehendi", title: "Mehendi ceremony", priceNPR: 8000, detail: "Up to 2 hours, 60 edited photos" },
      { id: "haldi", title: "Haldi ceremony", priceNPR: 8000, detail: "Up to 2 hours, 60 edited photos" },
      { id: "teej", title: "Teej programme", priceNPR: 8000, detail: "Up to 2 hours, 60 edited photos" },
      { id: "puja", title: "Puja photography", priceNPR: 5000, detail: "Up to 1 hour, 35 edited photos" },
      { id: "laxmi-puja", title: "Laxmi Puja", priceNPR: 5000, detail: "Up to 1 hour, 35 edited photos" },
      { id: "saraswati-puja", title: "Saraswati Puja", priceNPR: 5000, detail: "Up to 1 hour, 35 edited photos" },
      { id: "kul-puja", title: "Kul Puja", priceNPR: 8000, detail: "Up to 2 hours, 60 edited photos" },
      { id: "anniversary-ceremony", title: "Anniversary ceremony", priceNPR: 6000, detail: "Up to 2 hours, 45 edited photos" },
      { id: "retirement", title: "Retirement celebration", priceNPR: 6000, detail: "Up to 2 hours, 45 edited photos" }
    ]
  },
  {
    id: "events",
    title: "Birthdays and private events",
    items: [
      { id: "birthday", title: "Birthday photography", priceNPR: 6000, detail: "Up to 2 hours, 40 edited photos" },
      { id: "kids-birthday", title: "Kids birthday", priceNPR: 6000, detail: "Up to 2 hours, 40 edited photos" },
      { id: "first-birthday", title: "First birthday", priceNPR: 7000, detail: "Up to 2 hours, 50 edited photos" },
      { id: "surprise-birthday", title: "Surprise birthday", priceNPR: 5000, detail: "Up to 1.5 hours, 35 edited photos" },
      { id: "small-event", title: "Small event", priceNPR: 8000, detail: "2-3 hours, 60 edited photos" },
      { id: "baby-shower", title: "Baby shower", priceNPR: 7000, detail: "Up to 2 hours, 50 edited photos" },
      { id: "gender-reveal", title: "Gender reveal", priceNPR: 6000, detail: "Up to 2 hours, 40 edited photos" },
      { id: "family-gathering", title: "Family gathering", priceNPR: 7000, detail: "Up to 2 hours, 50 edited photos" },
      { id: "reunion", title: "Family or friends reunion", priceNPR: 8000, detail: "Up to 3 hours, 60 edited photos" },
      { id: "farewell", title: "Farewell party", priceNPR: 6000, detail: "Up to 2 hours, 40 edited photos" },
      { id: "anniversary-party", title: "Anniversary party", priceNPR: 7000, detail: "Up to 2 hours, 50 edited photos" },
      { id: "private-celebration", title: "Private celebration", priceNPR: 6000, detail: "Up to 2 hours, 40 edited photos" }
    ]
  },
  {
    id: "institutional",
    title: "Schools, colleges and institutions",
    items: [
      { id: "school-function", title: "School annual function", priceNPR: 8000, detail: "Up to 3 hours, edited event gallery" },
      { id: "college-event", title: "College programme", priceNPR: 8000, detail: "Up to 3 hours, edited event gallery" },
      { id: "graduation-event", title: "Graduation ceremony", priceNPR: 10000, detail: "Up to 3 hours, edited event gallery" },
      { id: "sports-day", title: "Sports day", priceNPR: 8000, detail: "Up to 3 hours, action and group photographs" },
      { id: "school-groups", title: "School group portraits", priceNPR: 0, detail: "Custom quotation", note: "Bulk pricing based on student numbers" },
      { id: "student-portraits", title: "Student individual portraits", priceNPR: 150, detail: "Per student, bulk orders only", note: "Minimum order and print/digital format agreed in advance" },
      { id: "teacher-portraits", title: "Teacher portraits", priceNPR: 500, detail: "Per person, bulk orders" },
      { id: "id-photography", title: "ID card photography", priceNPR: 100, detail: "Per person, bulk orders", note: "Printing and card production are separate" },
      { id: "workshop", title: "Educational workshop", priceNPR: 7000, detail: "Up to 2 hours, edited event gallery" },
      { id: "seminar", title: "Seminar photography", priceNPR: 8000, detail: "Up to 3 hours, edited event gallery" },
      { id: "conference", title: "Conference photography", priceNPR: 12000, detail: "Up to 4 hours, edited event gallery" },
      { id: "award-ceremony", title: "Award ceremony", priceNPR: 8000, detail: "Up to 3 hours, edited event gallery" }
    ]
  },
  {
    id: "business",
    title: "Corporate and business photography",
    items: [
      { id: "corporate-headshots", title: "Corporate headshots", priceNPR: 1500, detail: "Per person, 5 edited portraits" },
      { id: "office", title: "Office photography", priceNPR: 5000, detail: "Up to 1.5 hours, 20 edited photos" },
      { id: "staff-group", title: "Staff group photography", priceNPR: 3000, detail: "One group session, edited group portraits" },
      { id: "business-opening", title: "Business opening", priceNPR: 7000, detail: "Up to 2 hours, 50 edited photos" },
      { id: "shop-inauguration", title: "Shop inauguration", priceNPR: 7000, detail: "Up to 2 hours, 50 edited photos" },
      { id: "restaurant", title: "Restaurant photography", priceNPR: 5000, detail: "Up to 1.5 hours, 20 edited photos" },
      { id: "hotel", title: "Hotel photography", priceNPR: 8000, detail: "Up to 2 hours, 30 edited photos" },
      { id: "real-estate", title: "Real estate photography", priceNPR: 5000, detail: "One property, up to 20 edited photos" },
      { id: "construction", title: "Construction progress", priceNPR: 4000, detail: "One site visit, 15 edited photos" },
      { id: "corporate-event", title: "Corporate event", priceNPR: 12000, detail: "Up to 4 hours, 80 edited photos" },
      { id: "business-branding", title: "Business branding collection", priceNPR: 8000, detail: "Up to 2 hours, 30 edited photos" }
    ]
  },
  {
    id: "commercial",
    title: "Product, food and commercial photography",
    items: [
      { id: "product", title: "Product photography", priceNPR: 3500, detail: "10 products, edited product images", note: "Simple background and styling" },
      { id: "single-product", title: "Single product", priceNPR: 500, detail: "One product, edited photograph" },
      { id: "five-products", title: "5-product collection", priceNPR: 2000, detail: "5 products, edited photographs" },
      { id: "twenty-products", title: "20-product collection", priceNPR: 6000, detail: "20 products, edited photographs" },
      { id: "food", title: "Food photography", priceNPR: 4000, detail: "Up to 10 dishes, edited photos" },
      { id: "restaurant-menu", title: "Restaurant menu collection", priceNPR: 6000, detail: "Menu photography, up to 20 edited photos" },
      { id: "clothing", title: "Clothing photography", priceNPR: 4000, detail: "Up to 10 clothing items" },
      { id: "jewellery", title: "Jewellery photography", priceNPR: 3500, detail: "Up to 10 products" },
      { id: "cosmetics", title: "Cosmetics photography", priceNPR: 3500, detail: "Up to 10 products" },
      { id: "social-media", title: "Social media photo collection", priceNPR: 5000, detail: "Up to 20 edited images" },
      { id: "ecommerce", title: "E-commerce product collection", priceNPR: 0, detail: "Custom quotation", note: "Based on product quantity and editing requirements" }
    ]
  },
  {
    id: "travel",
    title: "Travel, nature and documentary photography",
    items: [
      { id: "travel-companion", title: "Travel photography session", priceNPR: 4000, detail: "Up to 1 hour, 20 edited photos" },
      { id: "family-travel", title: "Family travel photoshoot", priceNPR: 5000, detail: "Up to 1.5 hours, 25 edited photos" },
      { id: "tourist-portrait", title: "Tourist portrait session", priceNPR: 3500, detail: "Up to 1 hour, 15 edited photos" },
      { id: "nature-assignment", title: "Nature photography assignment", priceNPR: 5000, detail: "Half-day assignment, selected edited photos" },
      { id: "tourism-promotion", title: "Local tourism promotion", priceNPR: 8000, detail: "Custom photography collection" },
      { id: "village-documentary", title: "Village documentation", priceNPR: 8000, detail: "Half-day assignment, edited documentary photos" },
      { id: "cultural-documentary", title: "Cultural documentation", priceNPR: 8000, detail: "Half-day assignment, edited documentary photos" },
      { id: "wildlife", title: "Wildlife photography assignment", priceNPR: 0, detail: "Custom quotation", note: "Depends on location, access and assignment duration" },
      { id: "tourism-business", title: "Tourism business portfolio", priceNPR: 8000, detail: "Custom photography collection" }
    ]
  },
  {
    id: "extras",
    title: "Editing and additional services",
    items: [
      { id: "extra-hour", title: "Additional shooting hour", priceNPR: 1500, detail: "Per additional hour" },
      { id: "extra-photo", title: "Additional edited photograph", priceNPR: 100, detail: "Per photograph" },
      { id: "advanced-retouch", title: "Advanced photo retouching", priceNPR: 300, detail: "Per photograph" },
      { id: "photo-restoration", title: "Old photo restoration", priceNPR: 500, detail: "Per photograph; condition dependent" },
      { id: "urgent-delivery", title: "Urgent photo delivery", priceNPR: 1500, detail: "Starting surcharge", note: "Subject to availability and workload" },
      { id: "album-design", title: "Photo album design", priceNPR: 3000, detail: "Digital album layout", note: "Printing and delivery quoted separately" },
      { id: "photo-enlargement", title: "Printed photo enlargement", priceNPR: 0, detail: "Custom quotation", note: "Depends on print size and material" },
      { id: "extra-location", title: "Additional shoot location", priceNPR: 1000, detail: "Starting travel and setup charge" },
      { id: "photo-collage", title: "Custom photo collage", priceNPR: 500, detail: "One digital collage" }
    ]
  }
];

// Preserve existing homepage references and pricing IDs.
export const allServices = serviceGroups.flatMap((group) => group.items);
