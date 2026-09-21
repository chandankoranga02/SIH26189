import { Relationship } from '@/types'

export const mockRelationships: Relationship[] = [
  {
    "id": "R001",
    "source": "P001",
    "target": "P002",
    "type": "ASSOCIATED_WITH",
    "category": "ASSOCIATION",
    "confidence": 0.94,
    "date": "2026-08-11",
    "evidenceIds": [
      "EV001",
      "EV007"
    ],
    "description": "Synthetic coordination between fleet coordinator and primary contractor.",
    "evidenceSupport": 38,
    "commSupport": 24,
    "tempConsistency": 19,
    "sourceRel": 13
  },
  {
    "id": "R002",
    "source": "P001",
    "target": "PH001",
    "type": "USED_PHONE",
    "category": "COMMUNICATION",
    "confidence": 0.96,
    "date": "2026-08-01",
    "evidenceIds": [
      "EV001",
      "EV002"
    ],
    "description": "Synthetic device subscriber registration and activity records.",
    "evidenceSupport": 39,
    "commSupport": 25,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R003",
    "source": "P002",
    "target": "PH002",
    "type": "USED_PHONE",
    "category": "COMMUNICATION",
    "confidence": 0.95,
    "date": "2026-08-01",
    "evidenceIds": [
      "EV002",
      "EV003"
    ],
    "description": "Synthetic SIM issuance and continuous tower telemetry link.",
    "evidenceSupport": 38,
    "commSupport": 24,
    "tempConsistency": 19,
    "sourceRel": 14
  },
  {
    "id": "R004",
    "source": "P001",
    "target": "P004",
    "type": "KNOWS",
    "category": "ASSOCIATION",
    "confidence": 0.88,
    "date": "2026-08-10",
    "evidenceIds": [
      "EV004"
    ],
    "description": "Synthetic direct operational instructions for terminal staging docks.",
    "evidenceSupport": 35,
    "commSupport": 22,
    "tempConsistency": 17,
    "sourceRel": 14
  },
  {
    "id": "R005",
    "source": "P002",
    "target": "P004",
    "type": "ASSOCIATED_WITH",
    "category": "ASSOCIATION",
    "confidence": 0.89,
    "date": "2026-08-12",
    "evidenceIds": [
      "EV005"
    ],
    "description": "Synthetic daily dispatch logs linking contractor to warehouse.",
    "evidenceSupport": 36,
    "commSupport": 21,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R006",
    "source": "P001",
    "target": "ORG001",
    "type": "WORKS_FOR",
    "category": "MEMBERSHIP",
    "confidence": 0.95,
    "date": "2026-06-12",
    "evidenceIds": [
      "EV006"
    ],
    "description": "Synthetic employment as senior fleet coordinator.",
    "evidenceSupport": 39,
    "commSupport": 23,
    "tempConsistency": 19,
    "sourceRel": 14
  },
  {
    "id": "R007",
    "source": "P002",
    "target": "ORG001",
    "type": "LEADS",
    "category": "MEMBERSHIP",
    "confidence": 0.92,
    "date": "2026-06-15",
    "evidenceIds": [
      "EV006",
      "EV007"
    ],
    "description": "Synthetic contractor authority over dispatch.",
    "evidenceSupport": 37,
    "commSupport": 23,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R008",
    "source": "P004",
    "target": "ORG001",
    "type": "MEMBER_OF",
    "category": "MEMBERSHIP",
    "confidence": 0.91,
    "date": "2026-06-18",
    "evidenceIds": [
      "EV006"
    ],
    "description": "Synthetic facility roster placing P004 under Northstar.",
    "evidenceSupport": 36,
    "commSupport": 23,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R009",
    "source": "P006",
    "target": "ORG001",
    "type": "WORKS_FOR",
    "category": "MEMBERSHIP",
    "confidence": 0.86,
    "date": "2026-07-01",
    "evidenceIds": [
      "EV006"
    ],
    "description": "Synthetic driver team roster under night operations.",
    "evidenceSupport": 34,
    "commSupport": 22,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R010",
    "source": "P006",
    "target": "P002",
    "type": "REPORTS_TO",
    "category": "ASSOCIATION",
    "confidence": 0.9,
    "date": "2026-08-08",
    "evidenceIds": [
      "EV008"
    ],
    "description": "Synthetic hierarchy: driver lead reports to contractor.",
    "evidenceSupport": 36,
    "commSupport": 23,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R011",
    "source": "P006",
    "target": "PH006",
    "type": "USED_PHONE",
    "category": "COMMUNICATION",
    "confidence": 0.89,
    "date": "2026-07-02",
    "evidenceIds": [
      "EV009"
    ],
    "description": "Synthetic satellite unit logged to driver identity.",
    "evidenceSupport": 36,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R012",
    "source": "P002",
    "target": "VEH001",
    "type": "OWNS",
    "category": "VEHICLE",
    "confidence": 0.94,
    "date": "2026-06-08",
    "evidenceIds": [
      "EV010"
    ],
    "description": "Synthetic lease registering heavy hauler to contractor.",
    "evidenceSupport": 38,
    "commSupport": 24,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R013",
    "source": "P001",
    "target": "VEH002",
    "type": "USED_VEHICLE",
    "category": "VEHICLE",
    "confidence": 0.87,
    "date": "2026-08-11",
    "evidenceIds": [
      "EV011"
    ],
    "description": "Synthetic terminal gate log verifying authorization.",
    "evidenceSupport": 35,
    "commSupport": 21,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R014",
    "source": "P006",
    "target": "VEH001",
    "type": "USED_VEHICLE",
    "category": "VEHICLE",
    "confidence": 0.91,
    "date": "2026-08-11",
    "evidenceIds": [
      "EV008",
      "EV010"
    ],
    "description": "Synthetic vehicle trip card showing P006 piloted rig.",
    "evidenceSupport": 37,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R015",
    "source": "P001",
    "target": "LOC001",
    "type": "VISITED",
    "category": "LOCATION",
    "confidence": 0.93,
    "date": "2026-08-11",
    "evidenceIds": [
      "EV012"
    ],
    "description": "Synthetic biometric badge records at North Hub.",
    "evidenceSupport": 38,
    "commSupport": 23,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R016",
    "source": "P002",
    "target": "LOC001",
    "type": "VISITED",
    "category": "LOCATION",
    "confidence": 0.92,
    "date": "2026-08-11",
    "evidenceIds": [
      "EV012"
    ],
    "description": "Synthetic badge swipe at North Sector Hub.",
    "evidenceSupport": 37,
    "commSupport": 23,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R017",
    "source": "P004",
    "target": "LOC002",
    "type": "LOCATED_AT",
    "category": "LOCATION",
    "confidence": 0.95,
    "date": "2026-08-14",
    "evidenceIds": [
      "EV013"
    ],
    "description": "Synthetic permanent duty post at Central Terminal.",
    "evidenceSupport": 39,
    "commSupport": 23,
    "tempConsistency": 19,
    "sourceRel": 14
  },
  {
    "id": "R018",
    "source": "P001",
    "target": "LOC002",
    "type": "VISITED",
    "category": "LOCATION",
    "confidence": 0.89,
    "date": "2026-08-14",
    "evidenceIds": [
      "EV013"
    ],
    "description": "Synthetic visitor pass for terminal staging.",
    "evidenceSupport": 36,
    "commSupport": 22,
    "tempConsistency": 17,
    "sourceRel": 14
  },
  {
    "id": "R019",
    "source": "P002",
    "target": "LOC002",
    "type": "VISITED",
    "category": "LOCATION",
    "confidence": 0.9,
    "date": "2026-08-14",
    "evidenceIds": [
      "EV013"
    ],
    "description": "Synthetic parking and entry gate confirmation.",
    "evidenceSupport": 36,
    "commSupport": 23,
    "tempConsistency": 17,
    "sourceRel": 14
  },
  {
    "id": "R020",
    "source": "P001",
    "target": "CASE001",
    "type": "INVOLVED_IN",
    "category": "CASE",
    "confidence": 0.93,
    "date": "2026-07-22",
    "evidenceIds": [
      "EV014"
    ],
    "description": "Synthetic FIR subject in manifest audit.",
    "evidenceSupport": 38,
    "commSupport": 23,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R021",
    "source": "P002",
    "target": "CASE001",
    "type": "INVOLVED_IN",
    "category": "CASE",
    "confidence": 0.92,
    "date": "2026-07-22",
    "evidenceIds": [
      "EV014"
    ],
    "description": "Synthetic contractor inquiry regarding rerouting.",
    "evidenceSupport": 37,
    "commSupport": 23,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R022",
    "source": "P004",
    "target": "CASE001",
    "type": "MENTIONED_IN",
    "category": "CASE",
    "confidence": 0.84,
    "date": "2026-07-25",
    "evidenceIds": [
      "EV014"
    ],
    "description": "Synthetic witness referencing terminal supervisor.",
    "evidenceSupport": 33,
    "commSupport": 21,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R023",
    "source": "P001",
    "target": "EVT001",
    "type": "ATTENDED",
    "category": "EVENT",
    "confidence": 0.91,
    "date": "2026-08-11",
    "evidenceIds": [
      "EV008"
    ],
    "description": "Synthetic telemetry logged during Night Convoy.",
    "evidenceSupport": 37,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R024",
    "source": "P002",
    "target": "EVT001",
    "type": "INVOLVED_IN",
    "category": "EVENT",
    "confidence": 0.93,
    "date": "2026-08-11",
    "evidenceIds": [
      "EV008"
    ],
    "description": "Synthetic dispatch order for Convoy Alpha.",
    "evidenceSupport": 38,
    "commSupport": 23,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R025",
    "source": "P006",
    "target": "EVT001",
    "type": "ATTENDED",
    "category": "EVENT",
    "confidence": 0.94,
    "date": "2026-08-11",
    "evidenceIds": [
      "EV008",
      "EV010"
    ],
    "description": "Synthetic GPS placing P006 in convoy lead.",
    "evidenceSupport": 38,
    "commSupport": 24,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R026",
    "source": "P001",
    "target": "EVT002",
    "type": "ATTENDED",
    "category": "EVENT",
    "confidence": 0.89,
    "date": "2026-08-14",
    "evidenceIds": [
      "EV013"
    ],
    "description": "Synthetic attendance at Terminal Staging.",
    "evidenceSupport": 36,
    "commSupport": 22,
    "tempConsistency": 17,
    "sourceRel": 14
  },
  {
    "id": "R027",
    "source": "P002",
    "target": "EVT002",
    "type": "ATTENDED",
    "category": "EVENT",
    "confidence": 0.9,
    "date": "2026-08-14",
    "evidenceIds": [
      "EV013"
    ],
    "description": "Synthetic contractor at Yard Staging.",
    "evidenceSupport": 36,
    "commSupport": 23,
    "tempConsistency": 17,
    "sourceRel": 14
  },
  {
    "id": "R028",
    "source": "P004",
    "target": "EVT002",
    "type": "ATTENDED",
    "category": "EVENT",
    "confidence": 0.92,
    "date": "2026-08-14",
    "evidenceIds": [
      "EV013"
    ],
    "description": "Synthetic host for terminal staging session.",
    "evidenceSupport": 37,
    "commSupport": 23,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R029",
    "source": "P007",
    "target": "P004",
    "type": "ASSOCIATED_WITH",
    "category": "ASSOCIATION",
    "confidence": 0.81,
    "date": "2026-08-15",
    "evidenceIds": [
      "EV015"
    ],
    "description": "Synthetic permit liaison with supervisor.",
    "evidenceSupport": 32,
    "commSupport": 20,
    "tempConsistency": 16,
    "sourceRel": 13
  },
  {
    "id": "R030",
    "source": "P007",
    "target": "LOC004",
    "type": "VISITED",
    "category": "LOCATION",
    "confidence": 0.83,
    "date": "2026-08-28",
    "evidenceIds": [
      "EV016"
    ],
    "description": "Synthetic toll pass at Highland Transit.",
    "evidenceSupport": 33,
    "commSupport": 21,
    "tempConsistency": 16,
    "sourceRel": 13
  },
  {
    "id": "R031",
    "source": "P007",
    "target": "CASE005",
    "type": "INVOLVED_IN",
    "category": "CASE",
    "confidence": 0.85,
    "date": "2026-08-27",
    "evidenceIds": [
      "EV017"
    ],
    "description": "Synthetic inquiry for duplicate barcodes.",
    "evidenceSupport": 34,
    "commSupport": 21,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R032",
    "source": "P003",
    "target": "P001",
    "type": "CONTACTED",
    "category": "COMMUNICATION",
    "confidence": 0.93,
    "date": "2026-08-16",
    "evidenceIds": [
      "EV018",
      "EV022"
    ],
    "description": "Synthetic high-volume calls linking broker to fleet coordinator.",
    "evidenceSupport": 38,
    "commSupport": 24,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R033",
    "source": "P003",
    "target": "P002",
    "type": "ASSOCIATED_WITH",
    "category": "ASSOCIATION",
    "confidence": 0.95,
    "date": "2026-08-16",
    "evidenceIds": [
      "EV018",
      "EV019"
    ],
    "description": "Synthetic brokerage contract with transport contractor.",
    "evidenceSupport": 39,
    "commSupport": 24,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R034",
    "source": "P003",
    "target": "PH003",
    "type": "USED_PHONE",
    "category": "COMMUNICATION",
    "confidence": 0.96,
    "date": "2026-06-15",
    "evidenceIds": [
      "EV020"
    ],
    "description": "Synthetic primary subscriber for relay handset.",
    "evidenceSupport": 39,
    "commSupport": 25,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R035",
    "source": "P003",
    "target": "VEH003",
    "type": "OWNS",
    "category": "VEHICLE",
    "confidence": 0.92,
    "date": "2026-06-18",
    "evidenceIds": [
      "EV021"
    ],
    "description": "Synthetic vehicle registration for Utility Pickup.",
    "evidenceSupport": 37,
    "commSupport": 23,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R036",
    "source": "P003",
    "target": "LOC002",
    "type": "VISITED",
    "category": "LOCATION",
    "confidence": 0.91,
    "date": "2026-08-14",
    "evidenceIds": [
      "EV013"
    ],
    "description": "Synthetic visitor entry during staging meeting.",
    "evidenceSupport": 37,
    "commSupport": 23,
    "tempConsistency": 17,
    "sourceRel": 14
  },
  {
    "id": "R037",
    "source": "P003",
    "target": "LOC005",
    "type": "VISITED",
    "category": "LOCATION",
    "confidence": 0.9,
    "date": "2026-08-18",
    "evidenceIds": [
      "EV023"
    ],
    "description": "Synthetic badge swipe at Metro Plaza.",
    "evidenceSupport": 36,
    "commSupport": 23,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R038",
    "source": "P003",
    "target": "EVT002",
    "type": "ATTENDED",
    "category": "EVENT",
    "confidence": 0.91,
    "date": "2026-08-14",
    "evidenceIds": [
      "EV013"
    ],
    "description": "Synthetic meeting record at Terminal Staging.",
    "evidenceSupport": 37,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R039",
    "source": "P003",
    "target": "EVT005",
    "type": "INVOLVED_IN",
    "category": "EVENT",
    "confidence": 0.94,
    "date": "2026-08-25",
    "evidenceIds": [
      "EV024"
    ],
    "description": "Synthetic origin node for comms spike.",
    "evidenceSupport": 38,
    "commSupport": 24,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R040",
    "source": "P003",
    "target": "CASE002",
    "type": "INVOLVED_IN",
    "category": "CASE",
    "confidence": 0.92,
    "date": "2026-08-05",
    "evidenceIds": [
      "EV025"
    ],
    "description": "Synthetic FIR naming P003 in telecom relay probe.",
    "evidenceSupport": 38,
    "commSupport": 23,
    "tempConsistency": 17,
    "sourceRel": 14
  },
  {
    "id": "R041",
    "source": "P003",
    "target": "P005",
    "type": "ASSOCIATED_WITH",
    "category": "ASSOCIATION",
    "confidence": 0.92,
    "date": "2026-08-18",
    "evidenceIds": [
      "EV023",
      "EV026"
    ],
    "description": "Synthetic joint transaction between broker and settlement agent.",
    "evidenceSupport": 37,
    "commSupport": 23,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R042",
    "source": "P003",
    "target": "ORG002",
    "type": "CONNECTED_TO",
    "category": "MEMBERSHIP",
    "confidence": 0.89,
    "date": "2026-06-25",
    "evidenceIds": [
      "EV027"
    ],
    "description": "Synthetic agency agreement as logistics consultant.",
    "evidenceSupport": 36,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R043",
    "source": "P005",
    "target": "PH005",
    "type": "USED_PHONE",
    "category": "COMMUNICATION",
    "confidence": 0.91,
    "date": "2026-06-22",
    "evidenceIds": [
      "EV028"
    ],
    "description": "Synthetic encrypted device for escrow transactions.",
    "evidenceSupport": 37,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R044",
    "source": "P005",
    "target": "ORG002",
    "type": "WORKS_FOR",
    "category": "MEMBERSHIP",
    "confidence": 0.94,
    "date": "2026-06-25",
    "evidenceIds": [
      "EV027"
    ],
    "description": "Synthetic payroll file as treasury manager.",
    "evidenceSupport": 38,
    "commSupport": 24,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R045",
    "source": "P005",
    "target": "ORG003",
    "type": "MEMBER_OF",
    "category": "MEMBERSHIP",
    "confidence": 0.88,
    "date": "2026-07-01",
    "evidenceIds": [
      "EV029"
    ],
    "description": "Synthetic advisory board membership in Apex.",
    "evidenceSupport": 35,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R046",
    "source": "P010",
    "target": "ORG002",
    "type": "LEADS",
    "category": "MEMBERSHIP",
    "confidence": 0.96,
    "date": "2026-06-01",
    "evidenceIds": [
      "EV027"
    ],
    "description": "Synthetic charter appointing P010 as MD.",
    "evidenceSupport": 39,
    "commSupport": 25,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R047",
    "source": "P010",
    "target": "ORG003",
    "type": "MANAGES",
    "category": "MEMBERSHIP",
    "confidence": 0.93,
    "date": "2026-06-05",
    "evidenceIds": [
      "EV029"
    ],
    "description": "Synthetic controlling interest in Apex.",
    "evidenceSupport": 38,
    "commSupport": 23,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R048",
    "source": "P010",
    "target": "PH008",
    "type": "USED_PHONE",
    "category": "COMMUNICATION",
    "confidence": 0.95,
    "date": "2026-06-05",
    "evidenceIds": [
      "EV030"
    ],
    "description": "Synthetic executive voice channel.",
    "evidenceSupport": 39,
    "commSupport": 24,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R049",
    "source": "P005",
    "target": "P010",
    "type": "REPORTS_TO",
    "category": "ASSOCIATION",
    "confidence": 0.94,
    "date": "2026-06-25",
    "evidenceIds": [
      "EV027"
    ],
    "description": "Synthetic reporting line to director.",
    "evidenceSupport": 38,
    "commSupport": 24,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R050",
    "source": "P009",
    "target": "P010",
    "type": "WORKS_FOR",
    "category": "ASSOCIATION",
    "confidence": 0.87,
    "date": "2026-07-14",
    "evidenceIds": [
      "EV031"
    ],
    "description": "Synthetic trade procurement under P010.",
    "evidenceSupport": 35,
    "commSupport": 21,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R051",
    "source": "P009",
    "target": "ORG002",
    "type": "MEMBER_OF",
    "category": "MEMBERSHIP",
    "confidence": 0.9,
    "date": "2026-07-14",
    "evidenceIds": [
      "EV027",
      "EV031"
    ],
    "description": "Synthetic trade representative at Blue Ridge.",
    "evidenceSupport": 36,
    "commSupport": 23,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R052",
    "source": "P008",
    "target": "ORG003",
    "type": "WORKS_FOR",
    "category": "MEMBERSHIP",
    "confidence": 0.86,
    "date": "2026-07-10",
    "evidenceIds": [
      "EV029"
    ],
    "description": "Synthetic technical contractor at Apex.",
    "evidenceSupport": 34,
    "commSupport": 22,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R053",
    "source": "P008",
    "target": "P005",
    "type": "ASSOCIATED_WITH",
    "category": "ASSOCIATION",
    "confidence": 0.85,
    "date": "2026-08-01",
    "evidenceIds": [
      "EV029",
      "EV032"
    ],
    "description": "Synthetic telemetry logs provided to accounts.",
    "evidenceSupport": 34,
    "commSupport": 21,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R054",
    "source": "P005",
    "target": "LOC005",
    "type": "LOCATED_AT",
    "category": "LOCATION",
    "confidence": 0.94,
    "date": "2026-08-18",
    "evidenceIds": [
      "EV023"
    ],
    "description": "Synthetic badge logs at Metro Plaza.",
    "evidenceSupport": 38,
    "commSupport": 24,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R055",
    "source": "P010",
    "target": "LOC005",
    "type": "LOCATED_AT",
    "category": "LOCATION",
    "confidence": 0.95,
    "date": "2026-08-18",
    "evidenceIds": [
      "EV023"
    ],
    "description": "Synthetic executive occupancy at Metro Plaza.",
    "evidenceSupport": 39,
    "commSupport": 24,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R056",
    "source": "P009",
    "target": "LOC003",
    "type": "VISITED",
    "category": "LOCATION",
    "confidence": 0.89,
    "date": "2026-09-02",
    "evidenceIds": [
      "EV031"
    ],
    "description": "Synthetic gate entry at Portview.",
    "evidenceSupport": 36,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R057",
    "source": "P010",
    "target": "VEH005",
    "type": "OWNS",
    "category": "VEHICLE",
    "confidence": 0.92,
    "date": "2026-06-30",
    "evidenceIds": [
      "EV030"
    ],
    "description": "Synthetic corporate transport assignment.",
    "evidenceSupport": 37,
    "commSupport": 23,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R058",
    "source": "P005",
    "target": "CASE003",
    "type": "INVOLVED_IN",
    "category": "CASE",
    "confidence": 0.88,
    "date": "2026-08-14",
    "evidenceIds": [
      "EV026"
    ],
    "description": "Synthetic escrow inquiry record.",
    "evidenceSupport": 35,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R059",
    "source": "P010",
    "target": "CASE003",
    "type": "MENTIONED_IN",
    "category": "CASE",
    "confidence": 0.85,
    "date": "2026-08-14",
    "evidenceIds": [
      "EV026"
    ],
    "description": "Synthetic reference to director in audit.",
    "evidenceSupport": 34,
    "commSupport": 21,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R060",
    "source": "P005",
    "target": "EVT003",
    "type": "ATTENDED",
    "category": "EVENT",
    "confidence": 0.93,
    "date": "2026-08-18",
    "evidenceIds": [
      "EV023"
    ],
    "description": "Synthetic attendee at Financial Settlement.",
    "evidenceSupport": 38,
    "commSupport": 23,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R061",
    "source": "P010",
    "target": "EVT008",
    "type": "ATTENDED",
    "category": "EVENT",
    "confidence": 0.94,
    "date": "2026-09-06",
    "evidenceIds": [
      "EV030"
    ],
    "description": "Synthetic chair for Executive Briefing.",
    "evidenceSupport": 38,
    "commSupport": 24,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R062",
    "source": "P009",
    "target": "EVT007",
    "type": "ATTENDED",
    "category": "EVENT",
    "confidence": 0.88,
    "date": "2026-09-02",
    "evidenceIds": [
      "EV031"
    ],
    "description": "Synthetic presence at Port Inspection.",
    "evidenceSupport": 35,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R063",
    "source": "VEH004",
    "target": "LOC003",
    "type": "LOCATED_AT",
    "category": "LOCATION",
    "confidence": 0.91,
    "date": "2026-09-02",
    "evidenceIds": [
      "EV031"
    ],
    "description": "Synthetic weighbridge scan at Portview.",
    "evidenceSupport": 37,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R064",
    "source": "ORG001",
    "target": "ORG002",
    "type": "CONNECTED_TO",
    "category": "ASSOCIATION",
    "confidence": 0.9,
    "date": "2026-07-15",
    "evidenceIds": [
      "EV027"
    ],
    "description": "Synthetic master transport contract.",
    "evidenceSupport": 36,
    "commSupport": 23,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R065",
    "source": "P011",
    "target": "PH009",
    "type": "USED_PHONE",
    "category": "COMMUNICATION",
    "confidence": 0.91,
    "date": "2026-07-18",
    "evidenceIds": [
      "EV033"
    ],
    "description": "Synthetic border line registered to cross-state operative.",
    "evidenceSupport": 37,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R066",
    "source": "P011",
    "target": "LOC008",
    "type": "VISITED",
    "category": "LOCATION",
    "confidence": 0.88,
    "date": "2026-08-28",
    "evidenceIds": [
      "EV033"
    ],
    "description": "Synthetic ANPR camera capture at border checkpoint.",
    "evidenceSupport": 35,
    "commSupport": 22,
    "tempConsistency": 17,
    "sourceRel": 14
  },
  {
    "id": "R067",
    "source": "P011",
    "target": "P001",
    "type": "ASSOCIATED_WITH",
    "category": "ASSOCIATION",
    "confidence": 0.86,
    "date": "2026-08-20",
    "evidenceIds": [
      "EV033"
    ],
    "description": "Synthetic coordination between border operative and fleet coordinator.",
    "evidenceSupport": 34,
    "commSupport": 22,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R068",
    "source": "P011",
    "target": "EVT011",
    "type": "INVOLVED_IN",
    "category": "EVENT",
    "confidence": 0.89,
    "date": "2026-09-01",
    "evidenceIds": [
      "EV034"
    ],
    "description": "Synthetic involvement in border checkpoint breach.",
    "evidenceSupport": 36,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R069",
    "source": "P012",
    "target": "ORG001",
    "type": "WORKS_FOR",
    "category": "MEMBERSHIP",
    "confidence": 0.87,
    "date": "2026-07-20",
    "evidenceIds": [
      "EV006"
    ],
    "description": "Synthetic night shift roster under Northstar.",
    "evidenceSupport": 35,
    "commSupport": 21,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R070",
    "source": "P012",
    "target": "LOC006",
    "type": "LOCATED_AT",
    "category": "LOCATION",
    "confidence": 0.9,
    "date": "2026-08-22",
    "evidenceIds": [
      "EV035"
    ],
    "description": "Synthetic duty post at Industrial Bypass Depot.",
    "evidenceSupport": 36,
    "commSupport": 23,
    "tempConsistency": 17,
    "sourceRel": 14
  },
  {
    "id": "R071",
    "source": "P012",
    "target": "P006",
    "type": "ASSOCIATED_WITH",
    "category": "ASSOCIATION",
    "confidence": 0.85,
    "date": "2026-08-15",
    "evidenceIds": [
      "EV008"
    ],
    "description": "Synthetic operational coordination between night supervisors.",
    "evidenceSupport": 34,
    "commSupport": 21,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R072",
    "source": "P012",
    "target": "EVT004",
    "type": "ATTENDED",
    "category": "EVENT",
    "confidence": 0.88,
    "date": "2026-08-22",
    "evidenceIds": [
      "EV035"
    ],
    "description": "Synthetic presence at night cargo transfer.",
    "evidenceSupport": 35,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R073",
    "source": "P013",
    "target": "PH010",
    "type": "USED_PHONE",
    "category": "COMMUNICATION",
    "confidence": 0.9,
    "date": "2026-08-01",
    "evidenceIds": [
      "EV036"
    ],
    "description": "Synthetic hawala phone registered to shadow accountant.",
    "evidenceSupport": 36,
    "commSupport": 23,
    "tempConsistency": 17,
    "sourceRel": 14
  },
  {
    "id": "R074",
    "source": "P013",
    "target": "P005",
    "type": "ASSOCIATED_WITH",
    "category": "ASSOCIATION",
    "confidence": 0.88,
    "date": "2026-08-20",
    "evidenceIds": [
      "EV036"
    ],
    "description": "Synthetic parallel ledger coordination.",
    "evidenceSupport": 35,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R075",
    "source": "P013",
    "target": "ORG004",
    "type": "WORKS_FOR",
    "category": "MEMBERSHIP",
    "confidence": 0.91,
    "date": "2026-08-01",
    "evidenceIds": [
      "EV036"
    ],
    "description": "Synthetic hawala network coordinator role.",
    "evidenceSupport": 37,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R076",
    "source": "P013",
    "target": "CASE006",
    "type": "INVOLVED_IN",
    "category": "CASE",
    "confidence": 0.9,
    "date": "2026-08-30",
    "evidenceIds": [
      "EV036"
    ],
    "description": "Synthetic FIR naming shadow accountant in hawala probe.",
    "evidenceSupport": 36,
    "commSupport": 23,
    "tempConsistency": 17,
    "sourceRel": 14
  },
  {
    "id": "R077",
    "source": "P013",
    "target": "EVT010",
    "type": "ATTENDED",
    "category": "EVENT",
    "confidence": 0.89,
    "date": "2026-08-29",
    "evidenceIds": [
      "EV036"
    ],
    "description": "Synthetic presence at hawala transfer session.",
    "evidenceSupport": 36,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R078",
    "source": "P016",
    "target": "ORG004",
    "type": "LEADS",
    "category": "MEMBERSHIP",
    "confidence": 0.93,
    "date": "2026-08-01",
    "evidenceIds": [
      "EV037"
    ],
    "description": "Synthetic leadership of Crescent Hawala Network.",
    "evidenceSupport": 38,
    "commSupport": 23,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R079",
    "source": "P016",
    "target": "PH010",
    "type": "USED_PHONE",
    "category": "COMMUNICATION",
    "confidence": 0.88,
    "date": "2026-08-05",
    "evidenceIds": [
      "EV037"
    ],
    "description": "Synthetic shared hawala line usage.",
    "evidenceSupport": 35,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R080",
    "source": "P016",
    "target": "LOC009",
    "type": "VISITED",
    "category": "LOCATION",
    "confidence": 0.87,
    "date": "2026-08-29",
    "evidenceIds": [
      "EV037"
    ],
    "description": "Synthetic café meeting for transfer coordination.",
    "evidenceSupport": 35,
    "commSupport": 21,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R081",
    "source": "P016",
    "target": "CASE006",
    "type": "INVOLVED_IN",
    "category": "CASE",
    "confidence": 0.92,
    "date": "2026-08-30",
    "evidenceIds": [
      "EV037"
    ],
    "description": "Synthetic FIR naming hawala coordinator.",
    "evidenceSupport": 37,
    "commSupport": 23,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R082",
    "source": "P016",
    "target": "P003",
    "type": "ASSOCIATED_WITH",
    "category": "ASSOCIATION",
    "confidence": 0.87,
    "date": "2026-08-20",
    "evidenceIds": [
      "EV037"
    ],
    "description": "Synthetic broker-hawala financial link.",
    "evidenceSupport": 35,
    "commSupport": 21,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R083",
    "source": "P016",
    "target": "DOC002",
    "type": "MENTIONED_IN",
    "category": "CASE",
    "confidence": 0.86,
    "date": "2026-08-25",
    "evidenceIds": [
      "EV037"
    ],
    "description": "Synthetic reference in seized hawala ledger.",
    "evidenceSupport": 34,
    "commSupport": 22,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R084",
    "source": "P017",
    "target": "PH011",
    "type": "USED_PHONE",
    "category": "COMMUNICATION",
    "confidence": 0.89,
    "date": "2026-08-03",
    "evidenceIds": [
      "EV038"
    ],
    "description": "Synthetic port authority communication line.",
    "evidenceSupport": 36,
    "commSupport": 22,
    "tempConsistency": 17,
    "sourceRel": 14
  },
  {
    "id": "R085",
    "source": "P017",
    "target": "LOC003",
    "type": "LOCATED_AT",
    "category": "LOCATION",
    "confidence": 0.93,
    "date": "2026-09-02",
    "evidenceIds": [
      "EV038"
    ],
    "description": "Synthetic port clearance coordinator station.",
    "evidenceSupport": 38,
    "commSupport": 23,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R086",
    "source": "P017",
    "target": "P009",
    "type": "ASSOCIATED_WITH",
    "category": "ASSOCIATION",
    "confidence": 0.86,
    "date": "2026-09-01",
    "evidenceIds": [
      "EV038"
    ],
    "description": "Synthetic port-trade liaison coordination.",
    "evidenceSupport": 34,
    "commSupport": 22,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R087",
    "source": "P017",
    "target": "CASE007",
    "type": "INVOLVED_IN",
    "category": "CASE",
    "confidence": 0.88,
    "date": "2026-09-01",
    "evidenceIds": [
      "EV038"
    ],
    "description": "Synthetic naming in port smuggling investigation.",
    "evidenceSupport": 35,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R088",
    "source": "P017",
    "target": "EVT007",
    "type": "ATTENDED",
    "category": "EVENT",
    "confidence": 0.91,
    "date": "2026-09-02",
    "evidenceIds": [
      "EV038"
    ],
    "description": "Synthetic attendance at port clearance inspection.",
    "evidenceSupport": 37,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R089",
    "source": "P018",
    "target": "PH012",
    "type": "USED_PHONE",
    "category": "COMMUNICATION",
    "confidence": 0.94,
    "date": "2026-08-05",
    "evidenceIds": [
      "EV039"
    ],
    "description": "Synthetic encrypted multi-domain relay handset.",
    "evidenceSupport": 38,
    "commSupport": 24,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R090",
    "source": "P018",
    "target": "P003",
    "type": "ASSOCIATED_WITH",
    "category": "ASSOCIATION",
    "confidence": 0.91,
    "date": "2026-08-18",
    "evidenceIds": [
      "EV039"
    ],
    "description": "Synthetic fixer-broker operational link.",
    "evidenceSupport": 37,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R091",
    "source": "P018",
    "target": "P016",
    "type": "ASSOCIATED_WITH",
    "category": "ASSOCIATION",
    "confidence": 0.89,
    "date": "2026-08-25",
    "evidenceIds": [
      "EV039"
    ],
    "description": "Synthetic fixer-hawala coordination.",
    "evidenceSupport": 36,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R092",
    "source": "P018",
    "target": "P017",
    "type": "CONTACTED",
    "category": "COMMUNICATION",
    "confidence": 0.87,
    "date": "2026-09-01",
    "evidenceIds": [
      "EV039"
    ],
    "description": "Synthetic fixer coordinating port clearance.",
    "evidenceSupport": 35,
    "commSupport": 21,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R093",
    "source": "P018",
    "target": "LOC007",
    "type": "VISITED",
    "category": "LOCATION",
    "confidence": 0.9,
    "date": "2026-08-20",
    "evidenceIds": [
      "EV039"
    ],
    "description": "Synthetic safe house meeting attendance.",
    "evidenceSupport": 36,
    "commSupport": 23,
    "tempConsistency": 17,
    "sourceRel": 14
  },
  {
    "id": "R094",
    "source": "P018",
    "target": "EVT009",
    "type": "ATTENDED",
    "category": "EVENT",
    "confidence": 0.92,
    "date": "2026-08-20",
    "evidenceIds": [
      "EV039"
    ],
    "description": "Synthetic fixer at riverside covert assembly.",
    "evidenceSupport": 37,
    "commSupport": 23,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R095",
    "source": "P018",
    "target": "CASE010",
    "type": "INVOLVED_IN",
    "category": "CASE",
    "confidence": 0.93,
    "date": "2026-09-08",
    "evidenceIds": [
      "EV039"
    ],
    "description": "Synthetic naming in master syndicate investigation.",
    "evidenceSupport": 38,
    "commSupport": 23,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R096",
    "source": "P018",
    "target": "ORG005",
    "type": "CONNECTED_TO",
    "category": "MEMBERSHIP",
    "confidence": 0.88,
    "date": "2026-08-10",
    "evidenceIds": [
      "EV039"
    ],
    "description": "Synthetic shell company connection.",
    "evidenceSupport": 35,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R097",
    "source": "P014",
    "target": "ORG001",
    "type": "WORKS_FOR",
    "category": "MEMBERSHIP",
    "confidence": 0.85,
    "date": "2026-07-25",
    "evidenceIds": [
      "EV006"
    ],
    "description": "Synthetic compliance officer under Northstar.",
    "evidenceSupport": 34,
    "commSupport": 21,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R098",
    "source": "P014",
    "target": "P007",
    "type": "ASSOCIATED_WITH",
    "category": "ASSOCIATION",
    "confidence": 0.83,
    "date": "2026-08-20",
    "evidenceIds": [
      "EV015"
    ],
    "description": "Synthetic compliance-transit liaison coordination.",
    "evidenceSupport": 33,
    "commSupport": 21,
    "tempConsistency": 16,
    "sourceRel": 13
  },
  {
    "id": "R099",
    "source": "P014",
    "target": "CASE009",
    "type": "MENTIONED_IN",
    "category": "CASE",
    "confidence": 0.8,
    "date": "2026-09-05",
    "evidenceIds": [
      "EV040"
    ],
    "description": "Synthetic reference in forgery investigation.",
    "evidenceSupport": 32,
    "commSupport": 20,
    "tempConsistency": 16,
    "sourceRel": 12
  },
  {
    "id": "R100",
    "source": "P015",
    "target": "P006",
    "type": "REPORTS_TO",
    "category": "ASSOCIATION",
    "confidence": 0.86,
    "date": "2026-08-01",
    "evidenceIds": [
      "EV008"
    ],
    "description": "Synthetic driver reporting to haulage coordinator.",
    "evidenceSupport": 34,
    "commSupport": 22,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R101",
    "source": "P015",
    "target": "VEH001",
    "type": "USED_VEHICLE",
    "category": "VEHICLE",
    "confidence": 0.88,
    "date": "2026-08-22",
    "evidenceIds": [
      "EV010"
    ],
    "description": "Synthetic driver assignment to heavy hauler.",
    "evidenceSupport": 35,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R102",
    "source": "P015",
    "target": "PH013",
    "type": "USED_PHONE",
    "category": "COMMUNICATION",
    "confidence": 0.87,
    "date": "2026-08-10",
    "evidenceIds": [
      "EV041"
    ],
    "description": "Synthetic night ops handset assignment.",
    "evidenceSupport": 35,
    "commSupport": 21,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R103",
    "source": "P015",
    "target": "LOC004",
    "type": "VISITED",
    "category": "LOCATION",
    "confidence": 0.84,
    "date": "2026-08-28",
    "evidenceIds": [
      "EV016"
    ],
    "description": "Synthetic highway transit log entry.",
    "evidenceSupport": 33,
    "commSupport": 21,
    "tempConsistency": 17,
    "sourceRel": 12
  },
  {
    "id": "R104",
    "source": "P019",
    "target": "P003",
    "type": "ASSOCIATED_WITH",
    "category": "ASSOCIATION",
    "confidence": 0.78,
    "date": "2026-08-15",
    "evidenceIds": [
      "EV042"
    ],
    "description": "Synthetic historical informant connection.",
    "evidenceSupport": 31,
    "commSupport": 19,
    "tempConsistency": 16,
    "sourceRel": 12
  },
  {
    "id": "R105",
    "source": "P020",
    "target": "LOC003",
    "type": "LOCATED_AT",
    "category": "LOCATION",
    "confidence": 0.89,
    "date": "2026-09-02",
    "evidenceIds": [
      "EV031"
    ],
    "description": "Synthetic equipment operator at Portview.",
    "evidenceSupport": 36,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R106",
    "source": "P020",
    "target": "P017",
    "type": "ASSOCIATED_WITH",
    "category": "ASSOCIATION",
    "confidence": 0.84,
    "date": "2026-09-01",
    "evidenceIds": [
      "EV038"
    ],
    "description": "Synthetic port operations coordination.",
    "evidenceSupport": 33,
    "commSupport": 21,
    "tempConsistency": 17,
    "sourceRel": 12
  },
  {
    "id": "R107",
    "source": "P021",
    "target": "P008",
    "type": "ASSOCIATED_WITH",
    "category": "ASSOCIATION",
    "confidence": 0.86,
    "date": "2026-08-15",
    "evidenceIds": [
      "EV032"
    ],
    "description": "Synthetic comms tech specialist coordination.",
    "evidenceSupport": 34,
    "commSupport": 22,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R108",
    "source": "P021",
    "target": "VEH009",
    "type": "USED_VEHICLE",
    "category": "VEHICLE",
    "confidence": 0.89,
    "date": "2026-08-12",
    "evidenceIds": [
      "EV043"
    ],
    "description": "Synthetic mobile comms van operation.",
    "evidenceSupport": 36,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R109",
    "source": "P021",
    "target": "CASE002",
    "type": "MENTIONED_IN",
    "category": "CASE",
    "confidence": 0.82,
    "date": "2026-08-10",
    "evidenceIds": [
      "EV025"
    ],
    "description": "Synthetic mention in telecom relay case.",
    "evidenceSupport": 33,
    "commSupport": 20,
    "tempConsistency": 17,
    "sourceRel": 12
  },
  {
    "id": "R110",
    "source": "P022",
    "target": "P007",
    "type": "ASSOCIATED_WITH",
    "category": "ASSOCIATION",
    "confidence": 0.84,
    "date": "2026-08-20",
    "evidenceIds": [
      "EV040"
    ],
    "description": "Synthetic document forgery coordination.",
    "evidenceSupport": 33,
    "commSupport": 21,
    "tempConsistency": 17,
    "sourceRel": 12
  },
  {
    "id": "R111",
    "source": "P022",
    "target": "CASE009",
    "type": "INVOLVED_IN",
    "category": "CASE",
    "confidence": 0.89,
    "date": "2026-09-05",
    "evidenceIds": [
      "EV040"
    ],
    "description": "Synthetic subject in document forgery case.",
    "evidenceSupport": 36,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R112",
    "source": "P022",
    "target": "DOC001",
    "type": "INVOLVED_IN",
    "category": "CASE",
    "confidence": 0.87,
    "date": "2026-08-20",
    "evidenceIds": [
      "EV040"
    ],
    "description": "Synthetic link to seized forged manifests.",
    "evidenceSupport": 35,
    "commSupport": 21,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R113",
    "source": "P023",
    "target": "P006",
    "type": "ASSOCIATED_WITH",
    "category": "ASSOCIATION",
    "confidence": 0.83,
    "date": "2026-08-18",
    "evidenceIds": [
      "EV008"
    ],
    "description": "Synthetic security escort assignment.",
    "evidenceSupport": 33,
    "commSupport": 21,
    "tempConsistency": 16,
    "sourceRel": 13
  },
  {
    "id": "R114",
    "source": "P023",
    "target": "VEH006",
    "type": "USED_VEHICLE",
    "category": "VEHICLE",
    "confidence": 0.86,
    "date": "2026-08-20",
    "evidenceIds": [
      "EV044"
    ],
    "description": "Synthetic motorcycle scout assignment.",
    "evidenceSupport": 34,
    "commSupport": 22,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R115",
    "source": "P023",
    "target": "EVT001",
    "type": "ATTENDED",
    "category": "EVENT",
    "confidence": 0.85,
    "date": "2026-08-11",
    "evidenceIds": [
      "EV008"
    ],
    "description": "Synthetic escort role in night convoy.",
    "evidenceSupport": 34,
    "commSupport": 21,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R116",
    "source": "P024",
    "target": "PH015",
    "type": "USED_PHONE",
    "category": "COMMUNICATION",
    "confidence": 0.87,
    "date": "2026-08-18",
    "evidenceIds": [
      "EV045"
    ],
    "description": "Synthetic market trading phone.",
    "evidenceSupport": 35,
    "commSupport": 21,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R117",
    "source": "P024",
    "target": "P009",
    "type": "ASSOCIATED_WITH",
    "category": "ASSOCIATION",
    "confidence": 0.85,
    "date": "2026-08-22",
    "evidenceIds": [
      "EV045"
    ],
    "description": "Synthetic black market procurement link.",
    "evidenceSupport": 34,
    "commSupport": 21,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R118",
    "source": "P024",
    "target": "LOC010",
    "type": "VISITED",
    "category": "LOCATION",
    "confidence": 0.86,
    "date": "2026-09-03",
    "evidenceIds": [
      "EV045"
    ],
    "description": "Synthetic presence at abandoned mill.",
    "evidenceSupport": 34,
    "commSupport": 22,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R119",
    "source": "P024",
    "target": "EVT012",
    "type": "ATTENDED",
    "category": "EVENT",
    "confidence": 0.87,
    "date": "2026-09-03",
    "evidenceIds": [
      "EV045"
    ],
    "description": "Synthetic attendance at mill night operation.",
    "evidenceSupport": 35,
    "commSupport": 21,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R120",
    "source": "P025",
    "target": "PH014",
    "type": "USED_PHONE",
    "category": "COMMUNICATION",
    "confidence": 0.88,
    "date": "2026-08-20",
    "evidenceIds": [
      "EV046"
    ],
    "description": "Synthetic legal counsel communication line.",
    "evidenceSupport": 35,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R121",
    "source": "P025",
    "target": "P010",
    "type": "ASSOCIATED_WITH",
    "category": "ASSOCIATION",
    "confidence": 0.9,
    "date": "2026-08-22",
    "evidenceIds": [
      "EV046"
    ],
    "description": "Synthetic legal representation of executive.",
    "evidenceSupport": 36,
    "commSupport": 23,
    "tempConsistency": 17,
    "sourceRel": 14
  },
  {
    "id": "R122",
    "source": "P025",
    "target": "CASE010",
    "type": "MENTIONED_IN",
    "category": "CASE",
    "confidence": 0.84,
    "date": "2026-09-08",
    "evidenceIds": [
      "EV046"
    ],
    "description": "Synthetic defense counsel for syndicate case.",
    "evidenceSupport": 33,
    "commSupport": 21,
    "tempConsistency": 17,
    "sourceRel": 12
  },
  {
    "id": "R123",
    "source": "P011",
    "target": "VEH007",
    "type": "USED_VEHICLE",
    "category": "VEHICLE",
    "confidence": 0.87,
    "date": "2026-08-25",
    "evidenceIds": [
      "EV033"
    ],
    "description": "Synthetic unmarked sedan used for covert border runs.",
    "evidenceSupport": 35,
    "commSupport": 21,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R124",
    "source": "P018",
    "target": "VEH007",
    "type": "USED_VEHICLE",
    "category": "VEHICLE",
    "confidence": 0.85,
    "date": "2026-08-20",
    "evidenceIds": [
      "EV039"
    ],
    "description": "Synthetic fixer using ghost sedan for safe house visits.",
    "evidenceSupport": 34,
    "commSupport": 21,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R125",
    "source": "P012",
    "target": "VEH008",
    "type": "USED_VEHICLE",
    "category": "VEHICLE",
    "confidence": 0.86,
    "date": "2026-08-22",
    "evidenceIds": [
      "EV035"
    ],
    "description": "Synthetic cargo tempo for depot distribution.",
    "evidenceSupport": 34,
    "commSupport": 22,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R126",
    "source": "P024",
    "target": "VEH010",
    "type": "USED_VEHICLE",
    "category": "VEHICLE",
    "confidence": 0.84,
    "date": "2026-09-03",
    "evidenceIds": [
      "EV045"
    ],
    "description": "Synthetic flatbed truck for mill cargo runs.",
    "evidenceSupport": 33,
    "commSupport": 21,
    "tempConsistency": 17,
    "sourceRel": 12
  },
  {
    "id": "R127",
    "source": "ORG005",
    "target": "VEH010",
    "type": "OWNS",
    "category": "VEHICLE",
    "confidence": 0.88,
    "date": "2026-08-15",
    "evidenceIds": [
      "EV047"
    ],
    "description": "Synthetic shell company vehicle registration.",
    "evidenceSupport": 35,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R128",
    "source": "ORG005",
    "target": "LOC010",
    "type": "LOCATED_AT",
    "category": "LOCATION",
    "confidence": 0.86,
    "date": "2026-08-05",
    "evidenceIds": [
      "EV047"
    ],
    "description": "Synthetic shell company operating from mill.",
    "evidenceSupport": 34,
    "commSupport": 22,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R129",
    "source": "P018",
    "target": "LOC011",
    "type": "VISITED",
    "category": "LOCATION",
    "confidence": 0.87,
    "date": "2026-09-05",
    "evidenceIds": [
      "EV039"
    ],
    "description": "Synthetic fixer at airport cargo terminal.",
    "evidenceSupport": 35,
    "commSupport": 21,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R130",
    "source": "P018",
    "target": "EVT013",
    "type": "INVOLVED_IN",
    "category": "EVENT",
    "confidence": 0.9,
    "date": "2026-09-05",
    "evidenceIds": [
      "EV039"
    ],
    "description": "Synthetic fixer involved in air cargo diversion.",
    "evidenceSupport": 36,
    "commSupport": 23,
    "tempConsistency": 17,
    "sourceRel": 14
  },
  {
    "id": "R131",
    "source": "VEH007",
    "target": "LOC012",
    "type": "LOCATED_AT",
    "category": "LOCATION",
    "confidence": 0.85,
    "date": "2026-09-04",
    "evidenceIds": [
      "EV048"
    ],
    "description": "Synthetic ghost sedan spotted at underground garage.",
    "evidenceSupport": 34,
    "commSupport": 21,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R132",
    "source": "P011",
    "target": "EVT014",
    "type": "ATTENDED",
    "category": "EVENT",
    "confidence": 0.84,
    "date": "2026-09-04",
    "evidenceIds": [
      "EV048"
    ],
    "description": "Synthetic presence at plate swap operation.",
    "evidenceSupport": 33,
    "commSupport": 21,
    "tempConsistency": 17,
    "sourceRel": 12
  },
  {
    "id": "R133",
    "source": "CASE008",
    "target": "LOC012",
    "type": "INVOLVED_IN",
    "category": "CASE",
    "confidence": 0.86,
    "date": "2026-09-03",
    "evidenceIds": [
      "EV048"
    ],
    "description": "Synthetic garage linked to vehicle ring case.",
    "evidenceSupport": 34,
    "commSupport": 22,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R134",
    "source": "ORG004",
    "target": "ORG002",
    "type": "CONNECTED_TO",
    "category": "ASSOCIATION",
    "confidence": 0.84,
    "date": "2026-08-20",
    "evidenceIds": [
      "EV037"
    ],
    "description": "Synthetic informal financial link between hawala and trading firm.",
    "evidenceSupport": 33,
    "commSupport": 21,
    "tempConsistency": 17,
    "sourceRel": 12
  },
  {
    "id": "R135",
    "source": "ORG005",
    "target": "ORG001",
    "type": "CONNECTED_TO",
    "category": "ASSOCIATION",
    "confidence": 0.82,
    "date": "2026-08-15",
    "evidenceIds": [
      "EV047"
    ],
    "description": "Synthetic shell company using Northstar logistics.",
    "evidenceSupport": 32,
    "commSupport": 20,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R136",
    "source": "P003",
    "target": "EVT009",
    "type": "ATTENDED",
    "category": "EVENT",
    "confidence": 0.89,
    "date": "2026-08-20",
    "evidenceIds": [
      "EV039"
    ],
    "description": "Synthetic broker at riverside covert meeting.",
    "evidenceSupport": 36,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R137",
    "source": "P003",
    "target": "LOC007",
    "type": "VISITED",
    "category": "LOCATION",
    "confidence": 0.88,
    "date": "2026-08-20",
    "evidenceIds": [
      "EV039"
    ],
    "description": "Synthetic broker at safe house.",
    "evidenceSupport": 35,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R138",
    "source": "P001",
    "target": "EVT015",
    "type": "MENTIONED_IN",
    "category": "EVENT",
    "confidence": 0.91,
    "date": "2026-09-10",
    "evidenceIds": [
      "EV049"
    ],
    "description": "Synthetic subject of multi-agency raid.",
    "evidenceSupport": 37,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R139",
    "source": "P002",
    "target": "EVT015",
    "type": "MENTIONED_IN",
    "category": "EVENT",
    "confidence": 0.9,
    "date": "2026-09-10",
    "evidenceIds": [
      "EV049"
    ],
    "description": "Synthetic contractor mentioned in raid report.",
    "evidenceSupport": 36,
    "commSupport": 23,
    "tempConsistency": 17,
    "sourceRel": 14
  },
  {
    "id": "R140",
    "source": "P003",
    "target": "CASE010",
    "type": "INVOLVED_IN",
    "category": "CASE",
    "confidence": 0.94,
    "date": "2026-09-08",
    "evidenceIds": [
      "EV049"
    ],
    "description": "Synthetic key subject in organized syndicate case.",
    "evidenceSupport": 38,
    "commSupport": 24,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R141",
    "source": "P010",
    "target": "CASE010",
    "type": "INVOLVED_IN",
    "category": "CASE",
    "confidence": 0.91,
    "date": "2026-09-08",
    "evidenceIds": [
      "EV049"
    ],
    "description": "Synthetic executive named in syndicate investigation.",
    "evidenceSupport": 37,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R142",
    "source": "P004",
    "target": "PH004",
    "type": "USED_PHONE",
    "category": "COMMUNICATION",
    "confidence": 0.9,
    "date": "2026-06-20",
    "evidenceIds": [
      "EV005"
    ],
    "description": "Synthetic warehouse hotline assignment.",
    "evidenceSupport": 36,
    "commSupport": 23,
    "tempConsistency": 17,
    "sourceRel": 14
  },
  {
    "id": "R143",
    "source": "P007",
    "target": "PH007",
    "type": "USED_PHONE",
    "category": "COMMUNICATION",
    "confidence": 0.85,
    "date": "2026-07-05",
    "evidenceIds": [
      "EV015"
    ],
    "description": "Synthetic standby field handset assignment.",
    "evidenceSupport": 34,
    "commSupport": 21,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R144",
    "source": "P013",
    "target": "LOC009",
    "type": "VISITED",
    "category": "LOCATION",
    "confidence": 0.87,
    "date": "2026-08-29",
    "evidenceIds": [
      "EV036"
    ],
    "description": "Synthetic accountant at café meeting point.",
    "evidenceSupport": 35,
    "commSupport": 21,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R145",
    "source": "P020",
    "target": "EVT007",
    "type": "ATTENDED",
    "category": "EVENT",
    "confidence": 0.86,
    "date": "2026-09-02",
    "evidenceIds": [
      "EV031"
    ],
    "description": "Synthetic crane operator at port inspection.",
    "evidenceSupport": 34,
    "commSupport": 22,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R146",
    "source": "P011",
    "target": "ORG005",
    "type": "MEMBER_OF",
    "category": "MEMBERSHIP",
    "confidence": 0.84,
    "date": "2026-08-10",
    "evidenceIds": [
      "EV047"
    ],
    "description": "Synthetic border operative in shell company.",
    "evidenceSupport": 33,
    "commSupport": 21,
    "tempConsistency": 17,
    "sourceRel": 12
  },
  {
    "id": "R147",
    "source": "P024",
    "target": "ORG005",
    "type": "MEMBER_OF",
    "category": "MEMBERSHIP",
    "confidence": 0.83,
    "date": "2026-08-18",
    "evidenceIds": [
      "EV047"
    ],
    "description": "Synthetic procurement agent in shell company.",
    "evidenceSupport": 33,
    "commSupport": 20,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R148",
    "source": "DOC003",
    "target": "P021",
    "type": "INVOLVED_IN",
    "category": "CASE",
    "confidence": 0.87,
    "date": "2026-09-01",
    "evidenceIds": [
      "EV043"
    ],
    "description": "Synthetic digital evidence linking comms specialist.",
    "evidenceSupport": 35,
    "commSupport": 21,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R149",
    "source": "P015",
    "target": "EVT006",
    "type": "ATTENDED",
    "category": "EVENT",
    "confidence": 0.85,
    "date": "2026-08-28",
    "evidenceIds": [
      "EV016"
    ],
    "description": "Synthetic driver on inter-state highland run.",
    "evidenceSupport": 34,
    "commSupport": 21,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R150",
    "source": "P018",
    "target": "P010",
    "type": "CONTACTED",
    "category": "COMMUNICATION",
    "confidence": 0.86,
    "date": "2026-09-06",
    "evidenceIds": [
      "EV039"
    ],
    "description": "Synthetic fixer-executive communication.",
    "evidenceSupport": 34,
    "commSupport": 22,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R151",
    "source": "P025",
    "target": "LOC005",
    "type": "VISITED",
    "category": "LOCATION",
    "confidence": 0.88,
    "date": "2026-09-06",
    "evidenceIds": [
      "EV046"
    ],
    "description": "Synthetic lawyer at Metro Plaza for case briefing.",
    "evidenceSupport": 35,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R152",
    "source": "P025",
    "target": "EVT008",
    "type": "ATTENDED",
    "category": "EVENT",
    "confidence": 0.87,
    "date": "2026-09-06",
    "evidenceIds": [
      "EV046"
    ],
    "description": "Synthetic legal counsel at executive strategy briefing.",
    "evidenceSupport": 35,
    "commSupport": 21,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R153",
    "source": "P016",
    "target": "EVT010",
    "type": "ATTENDED",
    "category": "EVENT",
    "confidence": 0.91,
    "date": "2026-08-29",
    "evidenceIds": [
      "EV037"
    ],
    "description": "Synthetic hawala coordinator at transfer session.",
    "evidenceSupport": 37,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R154",
    "source": "P003",
    "target": "EVT010",
    "type": "ATTENDED",
    "category": "EVENT",
    "confidence": 0.88,
    "date": "2026-08-29",
    "evidenceIds": [
      "EV037"
    ],
    "description": "Synthetic broker attending hawala transfer.",
    "evidenceSupport": 35,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R155",
    "source": "P012",
    "target": "EVT012",
    "type": "ATTENDED",
    "category": "EVENT",
    "confidence": 0.86,
    "date": "2026-09-03",
    "evidenceIds": [
      "EV045"
    ],
    "description": "Synthetic night supervisor at mill operation.",
    "evidenceSupport": 34,
    "commSupport": 22,
    "tempConsistency": 17,
    "sourceRel": 13
  },
  {
    "id": "R156",
    "source": "P014",
    "target": "DOC004",
    "type": "INVOLVED_IN",
    "category": "CASE",
    "confidence": 0.89,
    "date": "2026-08-28",
    "evidenceIds": [
      "EV040"
    ],
    "description": "Synthetic clearing agent linked to forged customs certificate.",
    "evidenceSupport": 36,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 13
  },
  {
    "id": "R157",
    "source": "DOC004",
    "target": "LOC003",
    "type": "LOCATED_AT",
    "category": "LOCATION",
    "confidence": 0.91,
    "date": "2026-08-28",
    "evidenceIds": [
      "EV040"
    ],
    "description": "Synthetic customs certificate seized at portview freight depot.",
    "evidenceSupport": 37,
    "commSupport": 22,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R158",
    "source": "P005",
    "target": "DOC005",
    "type": "MENTIONED_IN",
    "category": "CASE",
    "confidence": 0.93,
    "date": "2026-08-15",
    "evidenceIds": [
      "EV027"
    ],
    "description": "Synthetic nominee director listed on shell incorporation filings.",
    "evidenceSupport": 38,
    "commSupport": 23,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R159",
    "source": "ORG005",
    "target": "DOC005",
    "type": "ASSOCIATED_WITH",
    "category": "ASSOCIATION",
    "confidence": 0.95,
    "date": "2026-08-15",
    "evidenceIds": [
      "EV027"
    ],
    "description": "Synthetic corporate dossier linking shell vehicle holding company.",
    "evidenceSupport": 39,
    "commSupport": 24,
    "tempConsistency": 19,
    "sourceRel": 14
  },
  {
    "id": "R160",
    "source": "DOC006",
    "target": "LOC006",
    "type": "LOCATED_AT",
    "category": "LOCATION",
    "confidence": 0.88,
    "date": "2026-08-05",
    "evidenceIds": [
      "EV013"
    ],
    "description": "Synthetic staging dock lease contract tying depot to shell account.",
    "evidenceSupport": 35,
    "commSupport": 21,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R161",
    "source": "P021",
    "target": "DOC007",
    "type": "INVOLVED_IN",
    "category": "CASE",
    "confidence": 0.92,
    "date": "2026-09-03",
    "evidenceIds": [
      "EV043"
    ],
    "description": "Synthetic satellite terminal billing archive matching comms operative.",
    "evidenceSupport": 37,
    "commSupport": 23,
    "tempConsistency": 18,
    "sourceRel": 14
  },
  {
    "id": "R162",
    "source": "DOC008",
    "target": "LOC008",
    "type": "LOCATED_AT",
    "category": "LOCATION",
    "confidence": 0.94,
    "date": "2026-09-08",
    "evidenceIds": [
      "EV016"
    ],
    "description": "Synthetic border ANPR footage archive cross-matching midnight convoy pass.",
    "evidenceSupport": 38,
    "commSupport": 24,
    "tempConsistency": 18,
    "sourceRel": 14
  }
];
