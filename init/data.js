const sampleListings = [
  {
    title: "Minimalist Glass Villa",
    description: "Experience unparalleled luxury in this stunning minimalist glass villa set amongst lush tropical foliage. Floor-to-ceiling windows offer panoramic views while the private infinity pool provides the ultimate relaxation.",
    images: [
      { filename: "img1", url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img2", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img3", url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img4", url: "https://images.unsplash.com/photo-1613490900233-08210134444a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img5", url: "https://images.unsplash.com/photo-1600607687931-ce8e0025d5d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" }
    ],
    price: 3200,
    location: "Uluwatu",
    country: "Indonesia",
    category: "Trending"
  },
  {
    title: "Nordic Alpine Cabin",
    description: "Nestled high in the snow-capped mountains, this premium A-frame cabin offers a warm, wood-fired sanctuary after a day of skiing. Enjoy underfloor heating, premium amenities, and majestic forest views.",
    images: [
      { filename: "img1", url: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img2", url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img3", url: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img4", url: "https://images.unsplash.com/photo-1478827536114-da961b7f86d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img5", url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" }
    ],
    price: 1800,
    location: "Tromsø",
    country: "Norway",
    category: "Mountains"
  },
  {
    title: "Pacific Beachfront Estate",
    description: "Step right out onto pristine white sands from this sprawling beachfront estate. Featuring an open-concept living area, private chef kitchen, and uninterrupted sunset views over the Pacific Ocean.",
    images: [
      { filename: "img1", url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img2", url: "https://images.unsplash.com/photo-1618012658872-6eb628d06b51?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img3", url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img4", url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img5", url: "https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" }
    ],
    price: 5500,
    location: "Malibu",
    country: "United States",
    category: "Amazing Pools"
  },
  {
    title: "Aurora Observation Dome",
    description: "Sleep under the stars in this climate-controlled geodesic dome designed for viewing the Northern Lights. Located deep within the Arctic circle, it offers an unforgettable, once-in-a-lifetime glamping experience.",
    images: [
      { filename: "img1", url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img2", url: "https://images.unsplash.com/photo-1483321528445-5655eb9dd043?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img3", url: "https://images.unsplash.com/photo-1510312529949-5f257a4190cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img4", url: "https://images.unsplash.com/photo-1502307185361-b552abe8d39e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img5", url: "https://images.unsplash.com/photo-1516000219661-d7031ac6b8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" }
    ],
    price: 2400,
    location: "Lapland",
    country: "Finland",
    category: "Arctic"
  },
  {
    title: "Sahara Desert Glamping Resort",
    description: "An exclusive desert oasis combining ancient luxury with modern amenities. Relax in your private plunge pool overlooking endless dunes before enjoying a world-class dinner under a canopy of desert stars.",
    images: [
      { filename: "img1", url: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img2", url: "https://images.unsplash.com/photo-1523986490752-c28064f26be3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img3", url: "https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img4", url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img5", url: "https://images.unsplash.com/photo-1618220048045-10a6db81bfda?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" }
    ],
    price: 4100,
    location: "Merzouga",
    country: "Morocco",
    category: "Desert"
  },
  {
    title: "Industrial Chic Penthouse",
    description: "High above the bustling city streets, this expansive two-story loft features exposed brick, structural steel beams, and mid-century modern furniture. Includes a massive rooftop terrace with a 360-degree city skyline view.",
    images: [
      { filename: "img1", url: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img2", url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img3", url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img4", url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img5", url: "https://images.unsplash.com/photo-1520699697851-3dc68aa3a474?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" }
    ],
    price: 1550,
    location: "New York",
    country: "United States",
    category: "Iconic Cities"
  },
  {
    title: "Historic Tuscan Castle Estate",
    description: "Live like medieval royalty with modern comforts. This beautifully restored 14th-century castle sits on a private vineyard and olive grove, featuring grand stone fireplaces and antique chandeliers.",
    images: [
      { filename: "img1", url: "https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img2", url: "https://images.unsplash.com/photo-1582885994273-05b1062c9c7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img3", url: "https://images.unsplash.com/photo-1600122390886-f2d1e0d3cb3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img4", url: "https://images.unsplash.com/photo-1628169123896-ac563ba90d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img5", url: "https://images.unsplash.com/photo-1555523098-9cd9dc17a02c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" }
    ],
    price: 8500,
    location: "Florence",
    country: "Italy",
    category: "Castles"
  },
  {
    title: "Floating Villa in the Maldives",
    description: "An overwater bungalow extending over crystal clear turquoise waters. Relax on your private sun deck, descend steps directly into the lagoon, or watch marine life through the glass floor panel.",
    images: [
      { filename: "img1", url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img2", url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img3", url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img4", url: "https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img5", url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" }
    ],
    price: 6800,
    location: "Male",
    country: "Maldives",
    category: "Boats"
  },
  {
    title: "Secluded Redwood Treehouse",
    description: "Suspended 50 feet in the air among old-growth trees, this luxury treehouse offers full plumbing, climate control, and a wrap-around balcony where you can birdwatch over your morning coffee.",
    images: [
      { filename: "img1", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img2", url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img3", url: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img4", url: "https://images.unsplash.com/photo-1478827536114-da961b7f86d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img5", url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" }
    ],
    price: 1200,
    location: "Tulum",
    country: "Mexico",
    category: "Camping"
  },
  {
    title: "Lavender Country Farmhouse",
    description: "Breathe in the countryside at this sprawling farmhouse estates. Featuring local culinary classes, fresh organic produce straight from the garden, and cozy interiors illuminated by natural light.",
    images: [
      { filename: "img1", url: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img2", url: "https://images.unsplash.com/photo-1555523098-9cd9dc17a02c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img3", url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img4", url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img5", url: "https://images.unsplash.com/photo-1520699697851-3dc68aa3a474?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" }
    ],
    price: 900,
    location: "Provence",
    country: "France",
    category: "Farms"
  },
  {
    title: "Downtown Studio Room",
    description: "Compact, efficient, and beautifully designed room right in the heart of the tech district. Best suited for quick weekend getaways or remote workers seeking a chic urban location.",
    images: [
      { filename: "img1", url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img2", url: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img3", url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img4", url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img5", url: "https://images.unsplash.com/photo-1520699697851-3dc68aa3a474?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" }
    ],
    price: 350,
    location: "San Francisco",
    country: "United States",
    category: "Rooms"
  },
  {
    title: "Biodome Eco Retreat",
    description: "An entirely self-sustaining futuristic dome hidden deep in the valley. Surrounded by rivers, this architectural marvel offers total solitude while leaving a zero-carbon footprint.",
    images: [
      { filename: "img1", url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img2", url: "https://images.unsplash.com/photo-1483321528445-5655eb9dd043?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img3", url: "https://images.unsplash.com/photo-1510312529949-5f257a4190cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img4", url: "https://images.unsplash.com/photo-1502307185361-b552abe8d39e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
      { filename: "img5", url: "https://images.unsplash.com/photo-1516000219661-d7031ac6b8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" }
    ],
    price: 600,
    location: "Patagonia",
    country: "Chile",
    category: "Domes"
  }
];

module.exports = { data: sampleListings };