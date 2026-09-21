import { EventEntity } from '@/types'

export const mockEvents: EventEntity[] = [
  {
    "id": "EVT001",
    "type": "EVENT",
    "name": "Night Transport Convoy",
    "aliases": [
      "Convoy Alpha"
    ],
    "status": "ACTIVE",
    "basePriority": 80,
    "role": "Scheduled Freight Movement",
    "createdAt": "2026-08-11",
    "date": "2026-08-11",
    "time": "23:30",
    "description": "Synthetic coordinated haulage of 4 heavy container vehicles through highway corridor.",
    "locationId": "LOC001"
  },
  {
    "id": "EVT002",
    "type": "EVENT",
    "name": "Terminal Staging Meeting",
    "aliases": [
      "Yard Staging Briefing"
    ],
    "status": "ACTIVE",
    "basePriority": 75,
    "role": "Physical Operative Assembly",
    "createdAt": "2026-08-14",
    "date": "2026-08-14",
    "time": "14:15",
    "description": "Synthetic rendezvous of fleet supervisors and dispatchers at central terminal.",
    "locationId": "LOC002"
  },
  {
    "id": "EVT003",
    "type": "EVENT",
    "name": "Financial Settlement Session",
    "aliases": [
      "Audit Review 3"
    ],
    "status": "ACTIVE",
    "basePriority": 70,
    "role": "Commercial Settlement Review",
    "createdAt": "2026-08-18",
    "date": "2026-08-18",
    "time": "16:45",
    "description": "Synthetic escrow accounts reconciliation and disbursement check at corporate plaza.",
    "locationId": "LOC005"
  },
  {
    "id": "EVT004",
    "type": "EVENT",
    "name": "Cargo Transfer at Industrial Depot",
    "aliases": [
      "Offload Ops"
    ],
    "status": "ACTIVE",
    "basePriority": 82,
    "role": "Container Cross-Dock Operation",
    "createdAt": "2026-08-22",
    "date": "2026-08-22",
    "time": "03:10",
    "description": "Synthetic late-night container transfer between prime hauler and auxiliary vans.",
    "locationId": "LOC006"
  },
  {
    "id": "EVT005",
    "type": "EVENT",
    "name": "Comms Spike Window",
    "aliases": [
      "Relay Surge Alpha"
    ],
    "status": "ACTIVE",
    "basePriority": 88,
    "role": "Telecommunication Surge Window",
    "createdAt": "2026-08-25",
    "date": "2026-08-25",
    "time": "20:00",
    "description": "Synthetic surge of rapid back-to-back phone contacts across 4 handsets within 90 minutes.",
    "locationId": "LOC002"
  },
  {
    "id": "EVT006",
    "type": "EVENT",
    "name": "Inter-State Vehicle Movement",
    "aliases": [
      "Transit Run Bravo"
    ],
    "status": "ACTIVE",
    "basePriority": 66,
    "role": "High-Altitude Corridor Run",
    "createdAt": "2026-08-28",
    "date": "2026-08-28",
    "time": "06:30",
    "description": "Synthetic convoy pass observed through Highland transit checkpoint.",
    "locationId": "LOC004"
  },
  {
    "id": "EVT007",
    "type": "EVENT",
    "name": "Port Clearance Inspection",
    "aliases": [
      "Bonded Dock Clearance"
    ],
    "status": "UNDER_REVIEW",
    "basePriority": 62,
    "role": "Regulatory Customs Audit",
    "createdAt": "2026-09-02",
    "date": "2026-09-02",
    "time": "11:00",
    "description": "Synthetic inspection of warehouse seals and container tare weight.",
    "locationId": "LOC003"
  },
  {
    "id": "EVT008",
    "type": "EVENT",
    "name": "Executive Strategy Briefing",
    "aliases": [
      "Q3 Governance Call"
    ],
    "status": "ACTIVE",
    "basePriority": 73,
    "role": "Executive Management Assembly",
    "createdAt": "2026-09-06",
    "date": "2026-09-06",
    "time": "17:30",
    "description": "Synthetic high-level conference between syndicate directors and trading coordinators.",
    "locationId": "LOC005"
  },
  {
    "id": "EVT009",
    "type": "EVENT",
    "name": "Riverside Covert Assembly",
    "aliases": [
      "River Meet"
    ],
    "status": "UNDER_REVIEW",
    "basePriority": 79,
    "role": "Secret Operational Meeting",
    "createdAt": "2026-08-20",
    "date": "2026-08-20",
    "time": "21:00",
    "description": "Synthetic clandestine meeting at riverside safe house attended by cross-cluster operatives.",
    "locationId": "LOC007"
  },
  {
    "id": "EVT010",
    "type": "EVENT",
    "name": "Hawala Transfer Window",
    "aliases": [
      "Wire Session 4"
    ],
    "status": "ACTIVE",
    "basePriority": 83,
    "role": "Informal Value Transfer Event",
    "createdAt": "2026-08-29",
    "date": "2026-08-29",
    "time": "15:30",
    "description": "Synthetic coordinated hawala transfer session across 3 district exchange points.",
    "locationId": "LOC009"
  },
  {
    "id": "EVT011",
    "type": "EVENT",
    "name": "Border Checkpoint Breach",
    "aliases": [
      "Gate 14 Incident"
    ],
    "status": "ACTIVE",
    "basePriority": 86,
    "role": "Security Breach Event",
    "createdAt": "2026-09-01",
    "date": "2026-09-01",
    "time": "02:45",
    "description": "Synthetic unauthorized vehicle crossing detected at border checkpoint with forged permits.",
    "locationId": "LOC008"
  },
  {
    "id": "EVT012",
    "type": "EVENT",
    "name": "Mill Complex Night Operation",
    "aliases": [
      "Shadow Load"
    ],
    "status": "UNDER_REVIEW",
    "basePriority": 77,
    "role": "Unauthorized Cargo Staging",
    "createdAt": "2026-09-03",
    "date": "2026-09-03",
    "time": "01:15",
    "description": "Synthetic nocturnal cargo staging and repackaging operation at abandoned mill facility.",
    "locationId": "LOC010"
  },
  {
    "id": "EVT013",
    "type": "EVENT",
    "name": "Air Cargo Diversion",
    "aliases": [
      "Flight Swap"
    ],
    "status": "ACTIVE",
    "basePriority": 85,
    "role": "Air Freight Rerouting Incident",
    "createdAt": "2026-09-05",
    "date": "2026-09-05",
    "time": "09:30",
    "description": "Synthetic high-value air consignment redirected through unauthorized handling bay.",
    "locationId": "LOC011"
  },
  {
    "id": "EVT014",
    "type": "EVENT",
    "name": "Vehicle Plate Swap Operation",
    "aliases": [
      "Plate Switch Bravo"
    ],
    "status": "UNDER_REVIEW",
    "basePriority": 71,
    "role": "Vehicle Identity Fraud Event",
    "createdAt": "2026-09-04",
    "date": "2026-09-04",
    "time": "23:00",
    "description": "Synthetic organized vehicle registration plate swapping at underground garage.",
    "locationId": "LOC012"
  },
  {
    "id": "EVT015",
    "type": "EVENT",
    "name": "Multi-Agency Raid",
    "aliases": [
      "Operation Thunder"
    ],
    "status": "ACTIVE",
    "basePriority": 90,
    "role": "Law Enforcement Operation",
    "createdAt": "2026-09-10",
    "date": "2026-09-10",
    "time": "05:00",
    "description": "Synthetic coordinated multi-agency raid on warehouse hub resulting in seizures and arrests.",
    "locationId": "LOC001"
  }
];
