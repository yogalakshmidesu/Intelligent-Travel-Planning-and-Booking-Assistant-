const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Destinations Database
const DESTINATIONS = [
  {
    id: 'tokyo-japan',
    name: 'Tokyo',
    country: 'Japan',
    region: 'Asia',
    category: 'City Break',
    vibe: ['Foodie', 'Cultural', 'Shopping', 'Nightlife'],
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80',
    tagline: 'Futuristic metropolis blending ancient traditions with neon-lit modern wonder',
    description: 'Experience the exhilarating contrast between futuristic skyscrapers and historic temples, world-class cuisine from Michelin ramen to high-end sushi, vibrant pop culture in Akihabara, and tranquil zen gardens in Meiji Shrine.',
    rating: 4.9,
    reviewsCount: 1420,
    avgCostPerDay: 140, // USD
    currency: 'JPY',
    bestMonths: 'Mar - May & Sep - Nov',
    idealDays: 5,
    budgetTier: 'Mid-range',
    attractions: [
      { name: 'Senso-ji Temple & Asakusa', category: 'Culture', icon: 'Landmark', duration: '3 hrs', rating: 4.8 },
      { name: 'Shibuya Crossing & Hachiko Statue', category: 'Sightseeing', icon: 'MapPin', duration: '2 hrs', rating: 4.7 },
      { name: 'Tsukiji Outer Market Food Tour', category: 'Food', icon: 'Utensils', duration: '3 hrs', rating: 4.9 },
      { name: 'teamLab Planets Digital Art Museum', category: 'Art', icon: 'Sparkles', duration: '2.5 hrs', rating: 4.9 },
      { name: 'Meiji Jingu Shrine & Harajuku', category: 'Nature & Fashion', icon: 'Trees', duration: '4 hrs', rating: 4.8 },
      { name: 'Akihabara Electric Town', category: 'Shopping', icon: 'ShoppingBag', duration: '3 hrs', rating: 4.6 }
    ],
    sampleHotels: [
      { id: 'h1', name: 'Shinjuku Granite Hotel', stars: 4, pricePerNight: 160, rating: 4.7, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80' },
      { id: 'h2', name: 'Tokyo Bay Luxury Resort', stars: 5, pricePerNight: 320, rating: 4.9, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80' },
      { id: 'h3', name: 'Asakusa Capsule & Suites', stars: 3, pricePerNight: 55, rating: 4.4, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80' }
    ],
    sampleFlights: [
      { id: 'f1', airline: 'Japan Airlines', flightNumber: 'JL 005', duration: '11h 20m', stops: 'Direct', price: 890 },
      { id: 'f2', airline: 'ANA Airways', flightNumber: 'NH 107', duration: '11h 45m', stops: 'Direct', price: 920 },
      { id: 'f3', airline: 'Singapore Airlines', flightNumber: 'SQ 638', duration: '14h 10m', stops: '1 Stop', price: 740 }
    ]
  },
  {
    id: 'paris-france',
    name: 'Paris',
    country: 'France',
    region: 'Europe',
    category: 'City Break',
    vibe: ['Romantic', 'Cultural', 'Foodie', 'Shopping'],
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1600&q=80',
    tagline: 'The City of Light, romance, iconic architecture, and gourmet bistro dining',
    description: 'Immerse yourself in legendary art galleries, stroll along the Seine River, admire the Eiffel Tower lit at dusk, enjoy buttery croissants at cobblestone cafes, and explore chic boutiques in Le Marais.',
    rating: 4.8,
    reviewsCount: 1850,
    avgCostPerDay: 180,
    currency: 'EUR',
    bestMonths: 'Apr - May & Sep - Oct',
    idealDays: 4,
    budgetTier: 'Luxury',
    attractions: [
      { name: 'Eiffel Tower & Champ de Mars', category: 'Sightseeing', icon: 'Camera', duration: '3 hrs', rating: 4.9 },
      { name: 'Louvre Museum Guided Highlights', category: 'Art & Culture', icon: 'Landmark', duration: '4 hrs', rating: 4.9 },
      { name: 'Montmartre & Sacré-Cœur Basilica', category: 'Walking Tour', icon: 'Footprints', duration: '3 hrs', rating: 4.7 },
      { name: 'Seine River Sunset Cruise', category: 'Romantic', icon: 'Ship', duration: '2 hrs', rating: 4.8 },
      { name: 'Palace of Versailles Day Trip', category: 'History', icon: 'Castle', duration: '6 hrs', rating: 4.8 }
    ],
    sampleHotels: [
      { id: 'hp1', name: 'Le Grand Hotel Seine View', stars: 5, pricePerNight: 390, rating: 4.9, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80' },
      { id: 'hp2', name: 'Boutique Hotel Marais', stars: 4, pricePerNight: 210, rating: 4.6, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80' },
      { id: 'hp3', name: 'Montmartre Cozy Studio', stars: 3, pricePerNight: 95, rating: 4.3, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80' }
    ],
    sampleFlights: [
      { id: 'fp1', airline: 'Air France', flightNumber: 'AF 023', duration: '7h 40m', stops: 'Direct', price: 780 },
      { id: 'fp2', airline: 'Delta Air Lines', flightNumber: 'DL 264', duration: '8h 10m', stops: 'Direct', price: 720 },
      { id: 'fp3', airline: 'British Airways', flightNumber: 'BA 112', duration: '9h 30m', stops: '1 Stop', price: 610 }
    ]
  },
  {
    id: 'bali-indonesia',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Asia',
    category: 'Beach',
    vibe: ['Relaxation', 'Nature', 'Adventure', 'Wellness'],
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1600&q=80',
    tagline: 'Tropical paradise of emerald rice terraces, sacred temples, and serene surf beaches',
    description: 'Find inner peace and thrilling adventures in Bali. From morning yoga overlooking lush jungle ravines in Ubud to golden sunset cocktails in Seminyak and waterfall hikes in Munduk.',
    rating: 4.9,
    reviewsCount: 2100,
    avgCostPerDay: 75,
    currency: 'IDR',
    bestMonths: 'Apr - Oct',
    idealDays: 7,
    budgetTier: 'Backpacker',
    attractions: [
      { name: 'Tegallalang Rice Terraces & Swing', category: 'Nature', icon: 'Trees', duration: '3 hrs', rating: 4.8 },
      { name: 'Uluwatu Temple Sunset & Kecak Dance', category: 'Culture', icon: 'Flame', duration: '4 hrs', rating: 4.9 },
      { name: 'Nusa Penida Island Boat Trip', category: 'Adventure', icon: 'Compass', duration: '8 hrs', rating: 4.8 },
      { name: 'Ubud Sacred Monkey Forest Sanctuary', category: 'Wildlife', icon: 'Footprints', duration: '2.5 hrs', rating: 4.6 }
    ],
    sampleHotels: [
      { id: 'hb1', name: 'Ubud Jungle Sanctuary Villa', stars: 5, pricePerNight: 195, rating: 4.9, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80' },
      { id: 'hb2', name: 'Seminyak Beach Resort', stars: 4, pricePerNight: 110, rating: 4.7, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80' },
      { id: 'hb3', name: 'Canggu Eco Surf Hostel', stars: 3, pricePerNight: 35, rating: 4.5, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80' }
    ],
    sampleFlights: [
      { id: 'fb1', airline: 'Garuda Indonesia', flightNumber: 'GA 881', duration: '14h 50m', stops: '1 Stop', price: 940 },
      { id: 'fb2', airline: 'Singapore Airlines', flightNumber: 'SQ 942', duration: '15h 20m', stops: '1 Stop', price: 880 }
    ]
  },
  {
    id: 'santorini-greece',
    name: 'Santorini',
    country: 'Greece',
    region: 'Europe',
    category: 'Beach',
    vibe: ['Romantic', 'Relaxation', 'Foodie'],
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80',
    tagline: 'Whitewashed cliffside villas, azure domes, and unforgettable Aegean sunsets',
    description: 'Perched on dramatic volcanic caldera cliffs overlooking deep sapphire blue waters, Santorini is famous for breathtaking sunset views in Oia, boutique cliffside cave suites, volcanic beaches, and crisp Assyrtiko white wines.',
    rating: 4.9,
    reviewsCount: 1670,
    avgCostPerDay: 210,
    currency: 'EUR',
    bestMonths: 'May - Oct',
    idealDays: 4,
    budgetTier: 'Luxury',
    attractions: [
      { name: 'Oia Sunset Walk & Castle View', category: 'Romantic', icon: 'Camera', duration: '3 hrs', rating: 4.9 },
      { name: 'Caldera Luxury Catamaran Cruise', category: 'Sailing', icon: 'Ship', duration: '5 hrs', rating: 4.9 },
      { name: 'Fira to Oia Cliffside Hike', category: 'Adventure', icon: 'Footprints', duration: '3.5 hrs', rating: 4.8 },
      { name: 'Akrotiri Prehistoric Ruins & Red Beach', category: 'History', icon: 'Landmark', duration: '4 hrs', rating: 4.6 }
    ],
    sampleHotels: [
      { id: 'hs1', name: 'Oia Caldera Cave Suites', stars: 5, pricePerNight: 450, rating: 4.9, image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80' },
      { id: 'hs2', name: 'Fira Sunset View Hotel', stars: 4, pricePerNight: 240, rating: 4.7, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80' }
    ],
    sampleFlights: [
      { id: 'fs1', airline: 'Aegean Airlines', flightNumber: 'A3 354', duration: '10h 15m', stops: '1 Stop', price: 810 },
      { id: 'fs2', airline: 'Lufthansa', flightNumber: 'LH 1750', duration: '11h 00m', stops: '1 Stop', price: 790 }
    ]
  },
  {
    id: 'reykjavik-iceland',
    name: 'Reykjavik & Golden Circle',
    country: 'Iceland',
    region: 'Europe',
    category: 'Mountain',
    vibe: ['Adventure', 'Nature', 'Relaxation'],
    image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1000&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=80',
    tagline: 'Land of Fire and Ice, geothermal springs, roaring waterfalls, and Northern Lights',
    description: 'Discover raw earth energy in Iceland! Soak in the geothermal waters of the Blue Lagoon, marvel at erupting geysers, walk behind massive roaring waterfalls like Seljalandsfoss, and hunt the shimmering Aurora Borealis.',
    rating: 4.8,
    reviewsCount: 1290,
    avgCostPerDay: 195,
    currency: 'ISK',
    bestMonths: 'Sep - Apr (Aurora) / Jun - Aug (Midnight Sun)',
    idealDays: 5,
    budgetTier: 'Mid-range',
    attractions: [
      { name: 'Blue Lagoon Geothermal Spa', category: 'Wellness', icon: 'Sparkles', duration: '3.5 hrs', rating: 4.8 },
      { name: 'Golden Circle (Thingvellir, Geysir, Gullfoss)', category: 'Nature', icon: 'Compass', duration: '7 hrs', rating: 4.9 },
      { name: 'Northern Lights Night Hunt Express', category: 'Night Tour', icon: 'Sparkles', duration: '4 hrs', rating: 4.7 },
      { name: 'South Coast Waterfalls & Black Sand Beach', category: 'Adventure', icon: 'Camera', duration: '9 hrs', rating: 4.9 }
    ],
    sampleHotels: [
      { id: 'hr1', name: 'Reykjavik Northern Light Hotel', stars: 4, pricePerNight: 230, rating: 4.8, image: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?auto=format&fit=crop&w=600&q=80' },
      { id: 'hr2', name: 'Downtown Nordic Boutique', stars: 3, pricePerNight: 140, rating: 4.5, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80' }
    ],
    sampleFlights: [
      { id: 'fr1', airline: 'Icelandair', flightNumber: 'FI 614', duration: '5h 45m', stops: 'Direct', price: 650 },
      { id: 'fr2', airline: 'PLAY Airlines', flightNumber: 'OG 112', duration: '6h 00m', stops: 'Direct', price: 490 }
    ]
  },
  {
    id: 'new-york-usa',
    name: 'New York City',
    country: 'United States',
    region: 'North America',
    category: 'City Break',
    vibe: ['Nightlife', 'Shopping', 'Cultural', 'Foodie'],
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1000&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1600&q=80',
    tagline: 'The city that never sleeps, filled with world-renowned Broadway shows, museums & skyline views',
    description: 'Experience the electric energy of New York City. Stroll through Central Park, admire the view from Summit One Vanderbilt or Top of the Rock, catch a hit Broadway Musical, and savor dollar slices to fine dining.',
    rating: 4.8,
    reviewsCount: 3100,
    avgCostPerDay: 230,
    currency: 'USD',
    bestMonths: 'Apr - Jun & Sep - Nov',
    idealDays: 4,
    budgetTier: 'Luxury',
    attractions: [
      { name: 'Central Park & High Line Walk', category: 'Nature & Sightseeing', icon: 'Trees', duration: '3 hrs', rating: 4.9 },
      { name: 'Broadway Show & Times Square', category: 'Entertainment', icon: 'Sparkles', duration: '4 hrs', rating: 4.8 },
      { name: 'Statue of Liberty & Ellis Island Ferry', category: 'History', icon: 'Landmark', duration: '4.5 hrs', rating: 4.7 },
      { name: 'Summit One Vanderbilt Observation Deck', category: 'Skyline', icon: 'Camera', duration: '2 hrs', rating: 4.9 }
    ],
    sampleHotels: [
      { id: 'hny1', name: 'Manhattan Skyline Suites', stars: 5, pricePerNight: 420, rating: 4.8, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80' },
      { id: 'hny2', name: 'SoHo Design Hotel', stars: 4, pricePerNight: 280, rating: 4.6, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80' }
    ],
    sampleFlights: [
      { id: 'fny1', airline: 'Delta Air Lines', flightNumber: 'DL 412', duration: '4h 30m', stops: 'Direct', price: 380 },
      { id: 'fny2', airline: 'United Airlines', flightNumber: 'UA 1204', duration: '4h 45m', stops: 'Direct', price: 350 }
    ]
  }
];

// Helper: AI Itinerary Generator Logic
function generateDynamicItinerary(destinationId, daysCount = 4, budget = 'Mid-range', vibe = 'Cultural', travelersCount = 2) {
  const dest = DESTINATIONS.find(d => d.id === destinationId) || DESTINATIONS[0];
  const numDays = Math.max(1, Math.min(10, parseInt(daysCount) || 4));

  const dayTemplates = [
    {
      title: 'Arrival, Iconic Landmarks & Welcome Feast',
      morning: { title: `Check-in & Morning Walk at ${dest.name} Center`, time: '09:00 AM', cost: 0, icon: 'MapPin', note: 'Pick up pocket Wi-Fi/transit pass and soak in the atmosphere.' },
      afternoon: { title: dest.attractions[0]?.name || 'Guided Cultural Tour', time: '01:30 PM', cost: 25, icon: 'Landmark', note: 'Explore historical heritage with local expert insights.' },
      evening: { title: 'Welcome Sunset Dinner & Signature Drinks', time: '07:00 PM', cost: 45, icon: 'Utensils', note: 'Sample authentic regional specialties and local wine/tea.' }
    },
    {
      title: 'Deep Cultural Exploration & Hidden Gems',
      morning: { title: dest.attractions[1]?.name || 'Local Neighborhood Walk', time: '09:30 AM', cost: 15, icon: 'Camera', note: 'Capture stunning photography before the crowds arrive.' },
      afternoon: { title: dest.attractions[2]?.name || 'Art & Heritage Immersion', time: '02:00 PM', cost: 30, icon: 'Sparkles', note: 'Interactive museum or workshop experience.' },
      evening: { title: 'Night Market & Live Entertainment Walk', time: '08:00 PM', cost: 35, icon: 'Flame', note: 'Immerse in nocturnal street food stalls and acoustic music.' }
    },
    {
      title: 'Nature Escape & Panoramic Views',
      morning: { title: dest.attractions[3]?.name || 'Scenic Outdoor Adventure', time: '08:30 AM', cost: 40, icon: 'Trees', note: 'Breathtaking viewpoints and crisp morning air.' },
      afternoon: { title: 'Lakeside/Cliffside Relaxation Lunch & Craft Coffee', time: '01:00 PM', cost: 20, icon: 'Utensils', note: 'Unwind at a highly rated local artisan café.' },
      evening: { title: 'Skyline Observation Deck & Evening Lounge', time: '06:30 PM', cost: 50, icon: 'Camera', note: 'Watch the dusk twilight illuminate the skyline.' }
    },
    {
      title: 'Gourmet Culinary Trail & Boutique Shopping',
      morning: { title: dest.attractions[4]?.name || 'Morning Artisan Market', time: '10:00 AM', cost: 20, icon: 'ShoppingBag', note: 'Handcrafted souvenirs, spices, and unique local gifts.' },
      afternoon: { title: 'Hands-on Cooking Class or Wine Tasting', time: '02:30 PM', cost: 60, icon: 'Utensils', note: 'Master local recipes from a master chef.' },
      evening: { title: 'Farewell Dinner & Night Cruise/Walk', time: '07:30 PM', cost: 70, icon: 'Ship', note: 'Celebrate the trip memories under the stars.' }
    }
  ];

  const days = [];
  let totalActivitiesCost = 0;

  for (let i = 1; i <= numDays; i++) {
    const template = dayTemplates[(i - 1) % dayTemplates.length];
    const morningCost = template.morning.cost;
    const afternoonCost = template.afternoon.cost;
    const eveningCost = template.evening.cost;
    const dayTotal = morningCost + afternoonCost + eveningCost;

    totalActivitiesCost += dayTotal;

    days.push({
      dayNumber: i,
      title: `Day ${i}: ${template.title}`,
      schedule: [
        { ...template.morning, id: `d${i}-m` },
        { ...template.afternoon, id: `d${i}-a` },
        { ...template.evening, id: `d${i}-e` }
      ],
      estimatedCostPerPerson: dayTotal
    });
  }

  const multiplier = budget === 'Luxury' ? 2.2 : budget === 'Backpacker' ? 0.6 : 1.0;
  const hotelPrice = (dest.sampleHotels[0]?.pricePerNight || 150) * multiplier;
  const flightsPrice = dest.sampleFlights[0]?.price || 650;
  const foodAndDailyCost = (dest.avgCostPerDay || 120) * numDays * multiplier;

  const totalPerPerson = Math.round(flightsPrice + (hotelPrice * (numDays - 1) / travelersCount) + totalActivitiesCost + foodAndDailyCost);
  const totalTripCost = totalPerPerson * travelersCount;

  return {
    id: `plan-${Date.now()}`,
    destination: dest,
    travelersCount: parseInt(travelersCount) || 1,
    durationDays: numDays,
    budgetTier: budget,
    vibe: vibe,
    costSummary: {
      flightEstimatePerPerson: flightsPrice,
      hotelEstimatePerNight: Math.round(hotelPrice),
      activitiesTotalPerPerson: Math.round(totalActivitiesCost),
      foodTotalPerPerson: Math.round(foodAndDailyCost),
      totalEstimatePerPerson: totalPerPerson,
      grandTotal: totalTripCost,
      currency: 'USD'
    },
    days: days,
    weatherForecast: {
      avgTemp: '22°C / 72°F',
      condition: 'Partly Sunny & Pleasant',
      rainChance: '15%',
      packingTip: 'Light layers, comfortable walking shoes, sunglasses, and compact umbrella recommended.'
    },
    packingChecklist: [
      { category: 'Essentials', items: ['Passport & Travel Insurance copy', 'Universal Power Adapter', 'Credit/Debit cards & local cash', 'Reusable water bottle'] },
      { category: 'Clothing', items: ['Comfortable walking sneakers', 'Light breathable jackets/sweaters', 'Versatile casual outfits', 'Sunglasses & Sun hat'] },
      { category: 'Tech & Extras', items: ['Power bank (10000mAh+)', 'Noise-canceling headphones', 'Daypack backpack', 'Travel size toiletries'] }
    ]
  };
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'TripMind Backend API', timestamp: new Date() });
});

// Get Destinations (with search & filters)
app.get('/api/destinations', (req, res) => {
  const { search, category, budget, vibe } = req.query;
  let results = [...DESTINATIONS];

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(d => 
      d.name.toLowerCase().includes(q) || 
      d.country.toLowerCase().includes(q) ||
      d.tagline.toLowerCase().includes(q)
    );
  }

  if (category && category !== 'All') {
    results = results.filter(d => d.category.toLowerCase() === category.toLowerCase());
  }

  if (vibe && vibe !== 'All') {
    results = results.filter(d => d.vibe.some(v => v.toLowerCase() === vibe.toLowerCase()));
  }

  if (budget && budget !== 'All') {
    results = results.filter(d => d.budgetTier.toLowerCase() === budget.toLowerCase());
  }

  res.json({ count: results.length, data: results });
});

// Get Single Destination by ID
app.get('/api/destinations/:id', (req, res) => {
  const dest = DESTINATIONS.find(d => d.id === req.params.id);
  if (!dest) {
    return res.status(404).json({ error: 'Destination not found' });
  }
  res.json(dest);
});

// Generate Itinerary
app.post('/api/generate-itinerary', (req, res) => {
  const { destinationId, days, budget, vibe, travelers } = req.body;
  
  if (!destinationId) {
    return res.status(400).json({ error: 'destinationId is required' });
  }

  const plan = generateDynamicItinerary(destinationId, days, budget, vibe, travelers);
  res.json(plan);
});

// AI Chatbot Assistant Endpoint
app.post('/api/chat', (req, res) => {
  const { message, destinationName } = req.body;
  const query = (message || '').toLowerCase();
  
  let reply = `Great question about ${destinationName || 'your trip'}! `;
  
  if (query.includes('weather') || query.includes('climate') || query.includes('season')) {
    reply += `The weather is typically pleasant during peak months. We recommend checking 7-day forecasts right before departing and carrying a light jacket!`;
  } else if (query.includes('food') || query.includes('eat') || query.includes('restaurant')) {
    reply += `Don't miss sampling local street specialties, visiting historic food markets in the morning, and reserving popular dinner spots in advance.`;
  } else if (query.includes('budget') || query.includes('cost') || query.includes('money')) {
    reply += `You can optimize costs by booking transit passes, eating at local bistros, and prioritizing free entry museum days or park walks.`;
  } else if (query.includes('flight') || query.includes('hotel') || query.includes('book')) {
    reply += `Direct flights booked 4-6 weeks early usually offer the best value. Check our mock booking tool right in the itinerary tab to compare rates!`;
  } else {
    reply += `TripMind recommends exploring iconic landmarks in the early morning to beat crowd queues, keeping local digital offline maps, and leaving room for spontaneous discoveries!`;
  }

  res.json({ reply, timestamp: new Date() });
});

// Booking Mock API
app.post('/api/bookings', (req, res) => {
  const { planId, flightId, hotelId, customerName, email } = req.body;
  
  const bookingRef = 'TM-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  res.json({
    success: true,
    bookingReference: bookingRef,
    message: `Reservation confirmed! Confirmation details sent to ${email || 'your email'}.`,
    dateConfirmed: new Date().toLocaleDateString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 TripMind Express Server listening on http://localhost:${PORT}`);
});
