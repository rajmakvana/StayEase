const sampleListings = [
  {
    title: "Eiffel Tower Retreat",
    description:
      "Stay in the heart of Paris with a stunning view of the Eiffel Tower. Perfect for romantic getaways and cultural adventures.",
    image: {
      filename: "eiffel-paris.jpg",
      url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34"
    },
    price: 1800,
    location: "Paris",
    country: "France"
  },
  {
    title: "Tokyo City Lights Apartment",
    description:
      "Modern apartment in the center of Tokyo, surrounded by vibrant nightlife, tech hubs, and cultural sites.",
    image: {
      filename: "tokyo-apartment.jpg",
      url: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b"
    },
    price: 1400,
    location: "Tokyo",
    country: "Japan"
  },
  {
    title: "Santorini Sunset Villa",
    description:
      "Relax in a whitewashed villa overlooking the Aegean Sea. Enjoy iconic sunsets and charming Greek architecture.",
    image: {
      filename: "santorini-villa.jpg",
      url: "https://images.unsplash.com/photo-1509395176047-4a66953fd231"
    },
    price: 2200,
    location: "Santorini",
    country: "Greece"
  },
  {
    title: "Swiss Alps Chalet",
    description:
      "Cozy up in a mountain chalet surrounded by snow-capped peaks. Ideal for skiing, hiking, and nature escapes.",
    image: {
      filename: "alps-chalet.jpg",
      url: "https://images.unsplash.com/photo-1609526609740-e3a3c8a77f52"
    },
    price: 2000,
    location: "Zermatt",
    country: "Switzerland"
  },
  {
    title: "Dubai Marina Apartment",
    description:
      "Luxury apartment in Dubai's iconic marina. Close to beaches, skyscrapers, and top-notch shopping destinations.",
    image: {
      filename: "dubai-marina.jpg",
      url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29"
    },
    price: 1700,
    location: "Dubai",
    country: "United Arab Emirates"
  },
  {
    title: "Taj Mahal View Room",
    description:
      "Experience royal heritage with a direct view of the iconic Taj Mahal from your room.",
    image: {
      filename: "taj-mahal.jpg",
      url: "https://images.unsplash.com/photo-1548013146-72479768bada"
    },
    price: 2200,
    location: "Agra",
    country: "India"
  },
  {
    title: "Backwaters Houseboat",
    description:
      "Float peacefully through the serene Kerala backwaters in a traditional houseboat.",
    image: {
      filename: "kerala-backwaters.jpg",
      url: "https://images.unsplash.com/photo-1603354350317-6fc4fef2b4e9"
    },
    price: 1800,
    location: "Alleppey",
    country: "India"
  },
  {
    title: "Himalayan Mountain Cabin",
    description:
      "Retreat into the snowy Himalayas for peace, trekking, and breathtaking views.",
    image: {
      filename: "himalayas.jpg",
      url: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2"
    },
    price: 2500,
    location: "Manali",
    country: "India"
  },
  {
    title: "Rajasthani Desert Camp",
    description:
      "Sleep under the stars in the Thar Desert with camel rides and folk music.",
    image: {
      filename: "thar-desert.jpg",
      url: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3"
    },
    price: 1500,
    location: "Jaisalmer",
    country: "India"
  },
  {
    title: "Goan Beach Resort",
    description:
      "Enjoy sun, sand, and sea in a vibrant beachside resort with great nightlife.",
    image: {
      filename: "goa-beach.jpg",
      url: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90"
    },
    price: 1600,
    location: "Goa",
    country: "India"
  },
  {
    title: "Tea Estate Bungalow",
    description:
      "Stay amidst lush green tea plantations with panoramic hill views.",
    image: {
      filename: "munnar-tea.jpg",
      url: "https://images.unsplash.com/photo-1614326305433-3d13f7ab46cc"
    },
    price: 1700,
    location: "Munnar",
    country: "India"
  },
  {
    title: "Floating Temple Room",
    description:
      "A spiritual stay close to the holy Golden Temple in Amritsar.",
    image: {
      filename: "golden-temple.jpg",
      url: "https://images.unsplash.com/photo-1603027140000-321367ef80b8"
    },
    price: 1400,
    location: "Amritsar",
    country: "India"
  },
  {
    title: "Heritage Haveli",
    description:
      "Live like royalty in a restored haveli filled with history and charm.",
    image: {
      filename: "jaipur-haveli.jpg",
      url: "https://images.unsplash.com/photo-1578916171728-46686eac8d1f"
    },
    price: 2000,
    location: "Jaipur",
    country: "India"
  },
  {
    title: "Meghalaya Forest Retreat",
    description:
      "Surround yourself with waterfalls, caves, and untouched nature.",
    image: {
      filename: "meghalaya.jpg",
      url: "https://images.unsplash.com/photo-1608629099682-fff3d0a5b4a0"
    },
    price: 1550,
    location: "Cherrapunji",
    country: "India"
  },
  {
    title: "Ladakh Valley Homestay",
    description:
      "Experience traditional Ladakhi life with awe-inspiring Himalayan landscapes.",
    image: {
      filename: "ladakh.jpg",
      url: "https://images.unsplash.com/photo-1590402494682-3d3a92d14d7e"
    },
    price: 2300,
    location: "Leh",
    country: "India"
  },
  {
    title: "Andaman Beach Hut",
    description:
      "Private beach hut with turquoise waters and coral reefs at your doorstep.",
    image: {
      filename: "andaman.jpg",
      url: "https://images.unsplash.com/photo-1596112895323-d203c4f2e0d2"
    },
    price: 2100,
    location: "Havelock Island",
    country: "India"
  },
  {
    title: "Udaipur Lake View Suite",
    description:
      "Enjoy a luxurious suite overlooking the romantic Lake Pichola.",
    image: {
      filename: "udaipur-lake.jpg",
      url: "https://images.unsplash.com/photo-1577775617658-c9c97ec8fc99"
    },
    price: 2400,
    location: "Udaipur",
    country: "India"
  },
  {
    title: "Kolkata Colonial Apartment",
    description:
      "Stay in the cultural capital of India with rich colonial architecture.",
    image: {
      filename: "kolkata.jpg",
      url: "https://images.unsplash.com/photo-1607358086077-60e5d3b21fdc"
    },
    price: 1300,
    location: "Kolkata",
    country: "India"
  },
  {
    title: "Darjeeling Hill Lodge",
    description:
      "Wake up to misty mountains and tea gardens in a charming British-era lodge.",
    image: {
      filename: "darjeeling.jpg",
      url: "https://images.unsplash.com/photo-1588072432836-e10032774350"
    },
    price: 1600,
    location: "Darjeeling",
    country: "India"
  },
  {
    title: "Varanasi Riverside Guesthouse",
    description:
      "Peaceful stay along the ghats, surrounded by spiritual energy and tradition.",
    image: {
      filename: "varanasi-ghats.jpg",
      url: "https://images.unsplash.com/photo-1595242303027-30c464f4ac32"
    },
    price: 1100,
    location: "Varanasi",
    country: "India"
  }
];

module.exports = { data: sampleListings };
