import { LocationEntity } from '@/types'

export const mockLocations: LocationEntity[] = [
  {
    "id": "LOC001",
    "type": "LOCATION",
    "name": "North Sector Warehouse Hub",
    "aliases": [
      "Hub 12",
      "Northern Terminal"
    ],
    "status": "ACTIVE",
    "basePriority": 72,
    "role": "Central Heavy Cargo Depot",
    "createdAt": "2026-05-10",
    "description": "Synthetic storage facility featuring automated loading docks and weighbridges.",
    "coordinates": "28.7041° N, 77.1025° E",
    "zone": "Northern Industrial Corridor"
  },
  {
    "id": "LOC002",
    "type": "LOCATION",
    "name": "Central Freight Terminal",
    "aliases": [
      "Yard C",
      "Interchange Yard"
    ],
    "status": "ACTIVE",
    "basePriority": 80,
    "role": "Multi-Modal Logistics Interchange",
    "createdAt": "2026-05-12",
    "description": "Synthetic rail-road intermodal depot where multiple convoys converge.",
    "coordinates": "28.6139° N, 77.2090° E",
    "zone": "Central Transit Hub"
  },
  {
    "id": "LOC003",
    "type": "LOCATION",
    "name": "Portview Logistics Park",
    "aliases": [
      "Dockside Sector 4"
    ],
    "status": "ACTIVE",
    "basePriority": 64,
    "role": "Bonded Freight Warehouse",
    "createdAt": "2026-05-15",
    "description": "Synthetic bonded warehouse facility for container storage and clearance.",
    "coordinates": "28.5355° N, 77.3910° E",
    "zone": "East Industrial Zone"
  },
  {
    "id": "LOC004",
    "type": "LOCATION",
    "name": "Highland Transit Point",
    "aliases": [
      "Checkpost 7",
      "Valley Crossing"
    ],
    "status": "ACTIVE",
    "basePriority": 58,
    "role": "Highway Checkpoint & Staging Stop",
    "createdAt": "2026-05-18",
    "description": "Synthetic mountain-pass weigh station and overnight vehicle rest area.",
    "coordinates": "29.9457° N, 78.1642° E",
    "zone": "Hill State Highway"
  },
  {
    "id": "LOC005",
    "type": "LOCATION",
    "name": "Metro Plaza Office Complex",
    "aliases": [
      "Tower B Suites"
    ],
    "status": "ACTIVE",
    "basePriority": 66,
    "role": "Corporate Management Suites",
    "createdAt": "2026-05-01",
    "description": "Synthetic commercial high-rise housing trading and investment offices.",
    "coordinates": "28.4595° N, 77.0266° E",
    "zone": "Commercial Business District"
  },
  {
    "id": "LOC006",
    "type": "LOCATION",
    "name": "Industrial Bypass Depot",
    "aliases": [
      "Depot 9B",
      "Auxiliary Yard"
    ],
    "status": "ACTIVE",
    "basePriority": 60,
    "role": "Auxiliary Haulage Yard",
    "createdAt": "2026-05-25",
    "description": "Synthetic maintenance garage and trailer staging facility.",
    "coordinates": "28.3880° N, 77.3150° E",
    "zone": "Southern Outer Ring"
  },
  {
    "id": "LOC007",
    "type": "LOCATION",
    "name": "Riverside Safe House",
    "aliases": [
      "River Point",
      "Meeting Spot R"
    ],
    "status": "UNDER_REVIEW",
    "basePriority": 74,
    "role": "Covert Meeting Location",
    "createdAt": "2026-07-15",
    "description": "Synthetic secluded riverside property used for off-record operational meetings.",
    "coordinates": "28.6853° N, 77.2217° E",
    "zone": "Yamuna Flood Plain"
  },
  {
    "id": "LOC008",
    "type": "LOCATION",
    "name": "Border Checkpoint Alpha",
    "aliases": [
      "State Gate 14",
      "Alpha Gate"
    ],
    "status": "ACTIVE",
    "basePriority": 69,
    "role": "Inter-State Border Crossing",
    "createdAt": "2026-07-20",
    "description": "Synthetic border checkpoint with automated ANPR cameras and toll collection.",
    "coordinates": "29.3824° N, 77.8215° E",
    "zone": "Inter-State Border Corridor"
  },
  {
    "id": "LOC009",
    "type": "LOCATION",
    "name": "Café Rendezvous",
    "aliases": [
      "The Coffee Point",
      "CR Lounge"
    ],
    "status": "ACTIVE",
    "basePriority": 55,
    "role": "Informal Meeting Venue",
    "createdAt": "2026-08-01",
    "description": "Synthetic upscale café used as informal meeting point for financial discussions.",
    "coordinates": "28.5244° N, 77.1855° E",
    "zone": "Commercial Business District"
  },
  {
    "id": "LOC010",
    "type": "LOCATION",
    "name": "Abandoned Mill Complex",
    "aliases": [
      "Old Mill",
      "Shadow Yard"
    ],
    "status": "UNDER_REVIEW",
    "basePriority": 71,
    "role": "Unregistered Storage Facility",
    "createdAt": "2026-08-05",
    "description": "Synthetic decommissioned textile mill used for temporary cargo staging.",
    "coordinates": "28.4120° N, 77.4530° E",
    "zone": "Eastern Rural Belt"
  },
  {
    "id": "LOC011",
    "type": "LOCATION",
    "name": "Airport Cargo Terminal",
    "aliases": [
      "ACT Bay 6",
      "Air Freight Hub"
    ],
    "status": "ACTIVE",
    "basePriority": 76,
    "role": "Air Freight Logistics Hub",
    "createdAt": "2026-08-10",
    "description": "Synthetic air cargo terminal handling high-value consignment shipments.",
    "coordinates": "28.5562° N, 77.1000° E",
    "zone": "Airport Industrial Zone"
  },
  {
    "id": "LOC012",
    "type": "LOCATION",
    "name": "Sector 44 Underground Garage",
    "aliases": [
      "S44 Garage",
      "The Vault"
    ],
    "status": "UNDER_REVIEW",
    "basePriority": 67,
    "role": "Vehicle Storage & Modification Facility",
    "createdAt": "2026-08-15",
    "description": "Synthetic underground parking structure used for vehicle modifications and plate swaps.",
    "coordinates": "28.5730° N, 77.3580° E",
    "zone": "Urban Residential Sector"
  }
];
