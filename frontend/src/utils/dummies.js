export const dummyUser = {
  id: 10,
  is_follower: true,
  first_name: "Admin",
  last_name: "Dev",
  username: "admin",
  email: "admin@dev",
  country: "Nigeria",
  state: "Lagos",
  profile_picture: "/img_frame_30156.png",
  password: "admin123",
  access_token: "edgyui359r8dgwhjryrrewvoiy8rjennbrrn",
};

export const dummyNotification = [
  {
    id: 10,
    image: "/img_frame_30156.png",
    content: "new post from admin",
  },
  {
    id: 11,
    image: "/Group.png",
    content: "new post from waverx",
  },
];

export const dummyPost = [
  {
    id: 1,
    comment_count: 2,
    reaction_count: 6,
    view_count: 0,
    repost_count: 5,
    bookmark_count: 5,
    user: dummyUser,
    is_reacted: true,
    is_bookmarked: true,
    is_reposted: true,
    content: "Dummy post on climate wavers",
  },
  {
    id: 2,
    comment_count: 2,
    reaction_count: 4,
    view_count: 0,
    repost_count: 5,
    bookmark_count: 5,
    user: dummyUser,
    is_reacted: true,
    is_bookmarked: true,
    is_reposted: true,
    content: "First post on climate wavers",
  },
];

export const dummyCampaigns = [
  {
    id: "1",
    image: "/campaign2.png",
    title: "Rise Above the Floods",
    details:
      "This campaign provides emergency relief, including food, shelter, and medical assistance, to families impacted by devastating floods.",
    raised: "10000",
    amount: "15000",
    location: "",
    disaster: "",
    date: "",
  },
  {
    id: "2",
    image: "/campaign1.png",
    title: "Wildfire Relief: Healing the Earth",
    details:
      "Our team works closely with local forestry agencies to replant trees and rehabilitate ecosystems affected by wildfires.",
    raised: "16000",
    amount: "20000",
    location: "",
    disaster: "",
    date: "",
  },
  {
    id: "3",
    image: "/campaign4.png",
    title: "Volcano Resilience: Rebuilding Lives",
    details:
      "This campaign provides immediate relief, long-term recovery, and education on volcanic safety measures.",
    raised: "32000",
    amount: "50000",
    location: "",
    disaster: "",
    date: "",
  },
  {
    id: "4",
    image: "/campaign3.png",
    title: "QuakeSafe: Earthquake Preparedness",
    details:
      "We collaborate with engineers and local governments to strengthen buildings, bridges, and critical infrastructure against earthquakes.",
    raised: "14000",
    amount: "25000",
    location: "",
    disaster: "",
    date: "",
  },
  {
    id: "5",
    image: "/campaign10.png",
    title: "Drought Resilience: Water for All",
    details:
      "Droughts threaten agriculture, health, and livelihoods. This campaign focuses on water conservation, rainwater harvesting, and community training to mitigate the impact of prolonged dry spells.",
    raised: "100000",
    amount: "150000",
    location: "",
    disaster: "",
    date: "",
  },
  {
    id: "6",
    image: "/campaign9.png",
    title: "Tornado Relief: Rebuilding Homes",
    details:
      "Tornadoes leave devastation in their wake. We provide emergency shelter, food, and psychological support to affected communities. Our goal is to rebuild homes and restore hope.",
    raised: "15000",
    amount: "20000",
    location: "",
    disaster: "",
    date: "",
  },
  {
    id: "7",
    image: "/campaign5.png",
    title: "Glacier Retreat Awareness",
    details:
      "Glaciers are shrinking due to global warming. This campaign raises awareness through documentaries, workshops, and field trips. Let’s protect our icy giants!",
    raised: "21000",
    amount: "32000",
    location: "",
    disaster: "",
    date: "",
  },
  {
    id: "8",
    image: "/campaign7.png",
    title: "Typhoon Resilience: Preparedness Kits",
    details:
      "Typhoons can be catastrophic. We assemble disaster kits containing essentials like food, water, and first aid supplies. Your donation ensures families are ready when the next storm hits.",
    raised: "17000",
    amount: "26000",
    location: "",
    disaster: "",
    date: "",
  },
  {
    id: "9",
    image: "/campaign1.png",
    title: "Heatwave Relief: Cooling Centers",
    details:
      "Heatwaves endanger vulnerable populations. This campaign establishes cooling centers, distributes fans, and educates communities on heat-related health risks.",
    raised: "1500",
    amount: "10000",
    location: "",
    disaster: "",
    date: "",
  },
  {
    id: "10",
    image: "/campaign11.png",
    title: "Avalanche Safety: Mountain Communities",
    details:
      "In snow-covered regions, avalanches pose serious threats. We train locals in avalanche safety, provide rescue equipment, and promote risk reduction strategies.",
    raised: "35000",
    amount: "42000",
    location: "",
    disaster: "",
    date: "",
  },
  {
    id: "11",
    image: "/campaign8.png",
    title: "Cyclone Recovery: Rebuilding Schools",
    details:
      "Cyclones damage schools, disrupting children’s education. This campaign focuses on rebuilding classrooms, providing books, and creating safe learning environments.",
    raised: "90000",
    amount: "150000",
    location: "",
    disaster: "",
    date: "",
  },
  {
    id: "12",
    image: "/campaign6.png",
    title: "Landslide Prevention: Slope Stabilization",
    details:
      "Landslides endanger lives and property. We work with geologists to stabilize slopes, plant vegetation, and educate residents on early warning signs.",
    raised: "36000",
    amount: "95000",
    location: "",
    disaster: "",
    date: "",
  },
];

export const dummyDisasters = [
  {
    image: "/disaster.png",
    id: "1",
    description: `In the early hours of August 20, 2024, 
      the Kiri Dam in Tudun Tsira, Shelleng LGA, Adamawa State,
      breached its banks, resulting in severe flooding across the communities of Kwakwambe, 
      Lure, Nbalang, Imburu, and Bare in the Numan Local Government Area. The deluge caused extensive damage,
      overwhelming local capacities and necessitating immediate humanitarian intervention. Just one day later,
      the communities of Duhu, Mayowandu, Kirchinga, Maiwandu, Jahili, Kokohu, Lumadu, Zhau, Pallam, Kwambula,
      Shuware, and Shuwa in Madagali Local Government Area were struck by another catastrophic flood, triggered by
      the upstream flow of waters from the Cameroonian highlands. This secondary flooding event exacerbated the already 
      dire situation, compounding the devastation and further straining local resources. According to the State Emergency 
      Management Agency (SEMA), the floodwaters rose with alarming speed, catching residents off guard and resulting
      in the widespread destruction of homes, infrastructure, and livelihoods. The disaster has affected 12,583 individuals,
      displaced 2,079 households, and caused the destruction of 298 buildings, 203 farmlands, and 509 livestock. The immediate
      humanitarian needs include shelter, food, non-food items, medical assistance, and access to clean water. (OCHA, 26 Aug 2024),`,
    title: "",
    disaster_type: "Earthquake",
    location: "South Africa",
    status: "Reported",
    date: "August 2024",
  },
  {
    image: "/disaster.png",
    id: "2",
    description: `In the early hours of August 20, 2024, 
      the Kiri Dam in Tudun Tsira, Shelleng LGA, Adamawa State,
      breached its banks, resulting in severe flooding across the communities of Kwakwambe, 
      Lure, Nbalang, Imburu, and Bare in the Numan Local Government Area. The deluge caused extensive damage,
      overwhelming local capacities and necessitating immediate humanitarian intervention. Just one day later,
      the communities of Duhu, Mayowandu, Kirchinga, Maiwandu, Jahili, Kokohu, Lumadu, Zhau, Pallam, Kwambula,
      Shuware, and Shuwa in Madagali Local Government Area were struck by another catastrophic flood, triggered by
      the upstream flow of waters from the Cameroonian highlands. This secondary flooding event exacerbated the already 
      dire situation, compounding the devastation and further straining local resources. According to the State Emergency 
      Management Agency (SEMA), the floodwaters rose with alarming speed, catching residents off guard and resulting
      in the widespread destruction of homes, infrastructure, and livelihoods. The disaster has affected 12,583 individuals,
      displaced 2,079 households, and caused the destruction of 298 buildings, 203 farmlands, and 509 livestock. The immediate
      humanitarian needs include shelter, food, non-food items, medical assistance, and access to clean water. (OCHA, 26 Aug 2024),`,
    title: "",
    disaster_type: "Earthquake",
    location: "Ethiopia",
    status: "Past",
    date: "August 2024",
  },
  {
    image: "/disaster.png",
    id: "3",
    description: `In the early hours of August 20, 2024, 
      the Kiri Dam in Tudun Tsira, Shelleng LGA, Adamawa State,
      breached its banks, resulting in severe flooding across the communities of Kwakwambe, 
      Lure, Nbalang, Imburu, and Bare in the Numan Local Government Area. The deluge caused extensive damage,
      overwhelming local capacities and necessitating immediate humanitarian intervention. Just one day later,
      the communities of Duhu, Mayowandu, Kirchinga, Maiwandu, Jahili, Kokohu, Lumadu, Zhau, Pallam, Kwambula,
      Shuware, and Shuwa in Madagali Local Government Area were struck by another catastrophic flood, triggered by
      the upstream flow of waters from the Cameroonian highlands. This secondary flooding event exacerbated the already 
      dire situation, compounding the devastation and further straining local resources. According to the State Emergency 
      Management Agency (SEMA), the floodwaters rose with alarming speed, catching residents off guard and resulting
      in the widespread destruction of homes, infrastructure, and livelihoods. The disaster has affected 12,583 individuals,
      displaced 2,079 households, and caused the destruction of 298 buildings, 203 farmlands, and 509 livestock. The immediate
      humanitarian needs include shelter, food, non-food items, medical assistance, and access to clean water. (OCHA, 26 Aug 2024),`,
    title: "Extreme Drought took several lives",
    disaster_type: "Drought",
    location: "Kenya",
    status: "Ongoing",
    date: "August 2024",
  },
  {
    image: "/disaster.png",
    id: "4",
    description: `In the early hours of August 20, 2024, 
      the Kiri Dam in Tudun Tsira, Shelleng LGA, Adamawa State,
      breached its banks, resulting in severe flooding across the communities of Kwakwambe, 
      Lure, Nbalang, Imburu, and Bare in the Numan Local Government Area. The deluge caused extensive damage,
      overwhelming local capacities and necessitating immediate humanitarian intervention. Just one day later,
      the communities of Duhu, Mayowandu, Kirchinga, Maiwandu, Jahili, Kokohu, Lumadu, Zhau, Pallam, Kwambula,
      Shuware, and Shuwa in Madagali Local Government Area were struck by another catastrophic flood, triggered by
      the upstream flow of waters from the Cameroonian highlands. This secondary flooding event exacerbated the already 
      dire situation, compounding the devastation and further straining local resources. According to the State Emergency 
      Management Agency (SEMA), the floodwaters rose with alarming speed, catching residents off guard and resulting
      in the widespread destruction of homes, infrastructure, and livelihoods. The disaster has affected 12,583 individuals,
      displaced 2,079 households, and caused the destruction of 298 buildings, 203 farmlands, and 509 livestock. The immediate
      humanitarian needs include shelter, food, non-food items, medical assistance, and access to clean water. (OCHA, 26 Aug 2024),`,
    title: "Disastrous Flood",
    disaster_type: "Flood",
    location: "Nigeria",
    status: "Alert",
    date: "August 2024",
  },
];
