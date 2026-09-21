import { EvidenceRecord } from '@/types'

export const mockEvidenceRecords: EvidenceRecord[] = [
  {
    "id": "EV001",
    "type": "CDR",
    "title": "Cellular Session CDR-2026-0811",
    "source": "Synthetel Telecom Log Database",
    "date": "2026-08-11",
    "reliability": 0.95,
    "linkedEntities": [
      "P001",
      "P002",
      "PH001",
      "PH002"
    ],
    "linkedRelationships": [
      "R001",
      "R002",
      "R003"
    ],
    "description": "Synthetic telecommunications record confirming voice link between P001 and P002."
  },
  {
    "id": "EV002",
    "type": "INTELLIGENCE_NOTE",
    "title": "Device Subscriber Registration Profile",
    "source": "Synthetic Telecom Registry",
    "date": "2026-06-12",
    "reliability": 0.94,
    "linkedEntities": [
      "P001",
      "P002",
      "PH001",
      "PH002"
    ],
    "linkedRelationships": [
      "R002",
      "R003"
    ],
    "description": "Synthetic subscriber registration attaching handsets to persons."
  },
  {
    "id": "EV003",
    "type": "LOCATION_RECORD",
    "title": "Tower Telemetry Ping Trail",
    "source": "Cellular Base Station Sector Logs",
    "date": "2026-08-11",
    "reliability": 0.92,
    "linkedEntities": [
      "P002",
      "PH002",
      "LOC001"
    ],
    "linkedRelationships": [
      "R003",
      "R016"
    ],
    "description": "Synthetic radio handshake confirming presence at North Sector Hub."
  },
  {
    "id": "EV004",
    "type": "INTELLIGENCE_NOTE",
    "title": "Dispatch Order #NT-904",
    "source": "Warehouse Internal Audit",
    "date": "2026-08-10",
    "reliability": 0.88,
    "linkedEntities": [
      "P001",
      "P004",
      "ORG001"
    ],
    "linkedRelationships": [
      "R004",
      "R008"
    ],
    "description": "Synthetic internal dispatch directive."
  },
  {
    "id": "EV005",
    "type": "INTELLIGENCE_NOTE",
    "title": "Haulage Loading Schedule #L-221",
    "source": "Central Terminal Dispatch Archive",
    "date": "2026-08-12",
    "reliability": 0.89,
    "linkedEntities": [
      "P002",
      "P004",
      "LOC002"
    ],
    "linkedRelationships": [
      "R005",
      "R017"
    ],
    "description": "Synthetic bay allocation ledger co-signed by contractor and supervisor."
  },
  {
    "id": "EV006",
    "type": "CASE_RECORD",
    "title": "Corporate Consortium Registration #NS-884",
    "source": "Commercial Registrar of Companies",
    "date": "2026-06-12",
    "reliability": 0.96,
    "linkedEntities": [
      "P001",
      "P002",
      "P004",
      "P006",
      "ORG001"
    ],
    "linkedRelationships": [
      "R006",
      "R007",
      "R008",
      "R009"
    ],
    "description": "Synthetic incorporation filing for Northstar Logistics."
  },
  {
    "id": "EV007",
    "type": "INTELLIGENCE_NOTE",
    "title": "Inter-Agency Operational Review",
    "source": "Regional Cargo Task Force",
    "date": "2026-08-12",
    "reliability": 0.91,
    "linkedEntities": [
      "P001",
      "P002",
      "ORG001"
    ],
    "linkedRelationships": [
      "R001",
      "R007"
    ],
    "description": "Synthetic multi-source assessment on command hierarchy."
  },
  {
    "id": "EV008",
    "type": "EVENT_RECORD",
    "title": "Convoy Alpha Radio Telemetry Manifest",
    "source": "Highway Patrol Monitor",
    "date": "2026-08-11",
    "reliability": 0.93,
    "linkedEntities": [
      "P001",
      "P002",
      "P006",
      "VEH001",
      "EVT001"
    ],
    "linkedRelationships": [
      "R010",
      "R014",
      "R023",
      "R024",
      "R025"
    ],
    "description": "Synthetic radio logs for coordinated night haulage."
  },
  {
    "id": "EV009",
    "type": "CDR",
    "title": "Satellite Terminal Handshake Logs",
    "source": "AeroComm Satellite Downlink",
    "date": "2026-08-12",
    "reliability": 0.89,
    "linkedEntities": [
      "P006",
      "PH006"
    ],
    "linkedRelationships": [
      "R011"
    ],
    "description": "Synthetic transponder pings matching satellite unit with driver."
  },
  {
    "id": "EV010",
    "type": "VEHICLE_RECORD",
    "title": "Vehicle Registration UK07-TR-9182",
    "source": "State Motor Vehicle Department",
    "date": "2026-06-08",
    "reliability": 0.96,
    "linkedEntities": [
      "P002",
      "VEH001"
    ],
    "linkedRelationships": [
      "R012",
      "R014"
    ],
    "description": "Synthetic heavy registration certificate."
  },
  {
    "id": "EV011",
    "type": "VEHICLE_RECORD",
    "title": "Terminal Gate Pass DL05-VT-4410",
    "source": "North Hub Security Gate Records",
    "date": "2026-08-11",
    "reliability": 0.88,
    "linkedEntities": [
      "P001",
      "VEH002",
      "LOC001"
    ],
    "linkedRelationships": [
      "R013",
      "R015"
    ],
    "description": "Synthetic RFID barcode capture."
  },
  {
    "id": "EV012",
    "type": "LOCATION_RECORD",
    "title": "North Hub Biometric Access Logs",
    "source": "Automated Facility Security Server",
    "date": "2026-08-11",
    "reliability": 0.94,
    "linkedEntities": [
      "P001",
      "P002",
      "LOC001"
    ],
    "linkedRelationships": [
      "R015",
      "R016"
    ],
    "description": "Synthetic biometric swipes."
  },
  {
    "id": "EV013",
    "type": "EVENT_RECORD",
    "title": "Terminal Staging Meeting Minutes",
    "source": "Confidential Internal Memo",
    "date": "2026-08-14",
    "reliability": 0.92,
    "linkedEntities": [
      "P001",
      "P002",
      "P003",
      "P004",
      "LOC002",
      "EVT002"
    ],
    "linkedRelationships": [
      "R018",
      "R019",
      "R026",
      "R027",
      "R028",
      "R036",
      "R038"
    ],
    "description": "Synthetic operational briefing record."
  },
  {
    "id": "EV014",
    "type": "FIR",
    "title": "Formal Complaint FIR-2026-081",
    "source": "Central Police Station Registry",
    "date": "2026-07-22",
    "reliability": 0.97,
    "linkedEntities": [
      "P001",
      "P002",
      "P004",
      "CASE001"
    ],
    "linkedRelationships": [
      "R020",
      "R021",
      "R022"
    ],
    "description": "Synthetic FIR for cargo diversion."
  },
  {
    "id": "EV015",
    "type": "INTELLIGENCE_NOTE",
    "title": "Permit Verification Waybill Log",
    "source": "Highland State Transport Office",
    "date": "2026-08-15",
    "reliability": 0.82,
    "linkedEntities": [
      "P004",
      "P007"
    ],
    "linkedRelationships": [
      "R029"
    ],
    "description": "Synthetic permit stamp requests."
  },
  {
    "id": "EV016",
    "type": "LOCATION_RECORD",
    "title": "Highland Weighbridge Pass Scan",
    "source": "Checkpost Camera Archive",
    "date": "2026-08-28",
    "reliability": 0.86,
    "linkedEntities": [
      "P007",
      "LOC004"
    ],
    "linkedRelationships": [
      "R030"
    ],
    "description": "Synthetic plate and toll capture at pass."
  },
  {
    "id": "EV017",
    "type": "FIR",
    "title": "Transit Permit Investigation #205",
    "source": "Highway Vigilance Cell",
    "date": "2026-08-27",
    "reliability": 0.89,
    "linkedEntities": [
      "P007",
      "CASE005"
    ],
    "linkedRelationships": [
      "R031"
    ],
    "description": "Synthetic compliance file on duplicate barcodes."
  },
  {
    "id": "EV018",
    "type": "CDR",
    "title": "Bridge Call Surge Analysis #CDR-B99",
    "source": "Telecom Analysis Extraction",
    "date": "2026-08-16",
    "reliability": 0.95,
    "linkedEntities": [
      "P001",
      "P002",
      "P003",
      "PH003"
    ],
    "linkedRelationships": [
      "R032",
      "R033",
      "R034"
    ],
    "description": "Synthetic telephony extract for bridge calls."
  },
  {
    "id": "EV019",
    "type": "CASE_RECORD",
    "title": "Commercial Commission Agreement #B-108",
    "source": "Arbitration Registry",
    "date": "2026-07-05",
    "reliability": 0.91,
    "linkedEntities": [
      "P002",
      "P003"
    ],
    "linkedRelationships": [
      "R033"
    ],
    "description": "Synthetic brokerage commission agreement."
  },
  {
    "id": "EV020",
    "type": "INTELLIGENCE_NOTE",
    "title": "SIM Registration Profile PH003",
    "source": "Nexus Mobile Subscriber Database",
    "date": "2026-06-15",
    "reliability": 0.95,
    "linkedEntities": [
      "P003",
      "PH003"
    ],
    "linkedRelationships": [
      "R034"
    ],
    "description": "Synthetic identification linking PH003 to Sameer Khan."
  },
  {
    "id": "EV021",
    "type": "VEHICLE_RECORD",
    "title": "Ownership Certificate UP14-FL-3309",
    "source": "State Transport Registration",
    "date": "2026-06-18",
    "reliability": 0.94,
    "linkedEntities": [
      "P003",
      "VEH003"
    ],
    "linkedRelationships": [
      "R035"
    ],
    "description": "Synthetic vehicle title for Utility Pickup."
  },
  {
    "id": "EV022",
    "type": "CDR",
    "title": "Late-Hour Burst CDR Record Set",
    "source": "Synthetel Cell Station B-04",
    "date": "2026-08-16",
    "reliability": 0.92,
    "linkedEntities": [
      "P001",
      "P003"
    ],
    "linkedRelationships": [
      "R032"
    ],
    "description": "Synthetic after-hours call records."
  },
  {
    "id": "EV023",
    "type": "EVENT_RECORD",
    "title": "Metro Plaza Executive Access Log",
    "source": "Tower B Building Management",
    "date": "2026-08-18",
    "reliability": 0.94,
    "linkedEntities": [
      "P003",
      "P005",
      "P010",
      "LOC005",
      "EVT003"
    ],
    "linkedRelationships": [
      "R037",
      "R041",
      "R054",
      "R055",
      "R060"
    ],
    "description": "Synthetic RFID badge captures at Financial Settlement."
  },
  {
    "id": "EV024",
    "type": "CDR",
    "title": "Surge Window Radio Monitor #SW-25",
    "source": "Automated Spectrum Monitor",
    "date": "2026-08-25",
    "reliability": 0.96,
    "linkedEntities": [
      "P001",
      "P002",
      "P003",
      "P005",
      "P010",
      "EVT005"
    ],
    "linkedRelationships": [
      "R039"
    ],
    "description": "Synthetic detection of rapid cross-network calls."
  },
  {
    "id": "EV025",
    "type": "FIR",
    "title": "Investigation Order FIR-2026-104",
    "source": "Cyber & Telecom Inquiry Cell",
    "date": "2026-08-05",
    "reliability": 0.93,
    "linkedEntities": [
      "P003",
      "PH003",
      "CASE002"
    ],
    "linkedRelationships": [
      "R040"
    ],
    "description": "Synthetic case file for unauthorized telecom gateway."
  },
  {
    "id": "EV026",
    "type": "FIR",
    "title": "Financial Irregularity Audit FIR-2026-139",
    "source": "Economic Offence Wing",
    "date": "2026-08-14",
    "reliability": 0.91,
    "linkedEntities": [
      "P005",
      "P010",
      "CASE003"
    ],
    "linkedRelationships": [
      "R058",
      "R059"
    ],
    "description": "Synthetic forensic accounting on irregular credits."
  },
  {
    "id": "EV027",
    "type": "CASE_RECORD",
    "title": "Blue Ridge Corporate Dossier #BR-01",
    "source": "Ministry of Corporate Affairs",
    "date": "2026-06-25",
    "reliability": 0.96,
    "linkedEntities": [
      "P003",
      "P005",
      "P009",
      "P010",
      "ORG002",
      "ORG001"
    ],
    "linkedRelationships": [
      "R042",
      "R044",
      "R046",
      "R049",
      "R051",
      "R064"
    ],
    "description": "Synthetic corporate governance documents."
  },
  {
    "id": "EV028",
    "type": "CDR",
    "title": "Handset Echo Billing Extract",
    "source": "Metro Wireless Accounts",
    "date": "2026-07-20",
    "reliability": 0.92,
    "linkedEntities": [
      "P005",
      "PH005"
    ],
    "linkedRelationships": [
      "R043"
    ],
    "description": "Synthetic billing statement for encrypted subscriptions."
  },
  {
    "id": "EV029",
    "type": "CASE_RECORD",
    "title": "Apex Advisory Service Retainer",
    "source": "Commercial Contracts Registry",
    "date": "2026-07-01",
    "reliability": 0.9,
    "linkedEntities": [
      "P005",
      "P008",
      "P010",
      "ORG003"
    ],
    "linkedRelationships": [
      "R045",
      "R047",
      "R052",
      "R053"
    ],
    "description": "Synthetic corporate service agreement."
  },
  {
    "id": "EV030",
    "type": "VEHICLE_RECORD",
    "title": "Executive Fleet Permit HR26-SU-5501",
    "source": "State Executive Fleet Registration",
    "date": "2026-06-30",
    "reliability": 0.95,
    "linkedEntities": [
      "P010",
      "PH008",
      "VEH005",
      "EVT008"
    ],
    "linkedRelationships": [
      "R048",
      "R057",
      "R061"
    ],
    "description": "Synthetic vehicle title assigned to executive."
  },
  {
    "id": "EV031",
    "type": "EVENT_RECORD",
    "title": "Port Customs Manifest & Weighbridge Record",
    "source": "Portview Bonded Warehouse Authority",
    "date": "2026-09-02",
    "reliability": 0.93,
    "linkedEntities": [
      "P009",
      "VEH004",
      "LOC003",
      "EVT007"
    ],
    "linkedRelationships": [
      "R056",
      "R062",
      "R063"
    ],
    "description": "Synthetic cargo clearance log."
  },
  {
    "id": "EV032",
    "type": "INTELLIGENCE_NOTE",
    "title": "Hardware GPS Telemetry Extract",
    "source": "Asset Tracking Portal",
    "date": "2026-08-01",
    "reliability": 0.88,
    "linkedEntities": [
      "P008",
      "P005"
    ],
    "linkedRelationships": [
      "R053"
    ],
    "description": "Synthetic diagnostic reports to finance desk."
  },
  {
    "id": "EV033",
    "type": "LOCATION_RECORD",
    "title": "Border ANPR Camera Capture Log",
    "source": "Inter-State Border Surveillance",
    "date": "2026-08-28",
    "reliability": 0.9,
    "linkedEntities": [
      "P011",
      "LOC008",
      "VEH007"
    ],
    "linkedRelationships": [
      "R065",
      "R066",
      "R067"
    ],
    "description": "Synthetic automated plate recognition log at border checkpoint."
  },
  {
    "id": "EV034",
    "type": "EVENT_RECORD",
    "title": "Border Breach Incident Report",
    "source": "Border Security Post",
    "date": "2026-09-01",
    "reliability": 0.91,
    "linkedEntities": [
      "P011",
      "LOC008",
      "EVT011"
    ],
    "linkedRelationships": [
      "R068"
    ],
    "description": "Synthetic incident report for unauthorized border crossing."
  },
  {
    "id": "EV035",
    "type": "LOCATION_RECORD",
    "title": "Depot Night Shift Attendance Log",
    "source": "Industrial Bypass Depot Security",
    "date": "2026-08-22",
    "reliability": 0.87,
    "linkedEntities": [
      "P012",
      "LOC006",
      "EVT004"
    ],
    "linkedRelationships": [
      "R070",
      "R072"
    ],
    "description": "Synthetic biometric attendance for night shift workers."
  },
  {
    "id": "EV036",
    "type": "FIR",
    "title": "Hawala Network Intelligence Dossier",
    "source": "Financial Intelligence Unit",
    "date": "2026-08-30",
    "reliability": 0.93,
    "linkedEntities": [
      "P013",
      "P016",
      "ORG004",
      "CASE006"
    ],
    "linkedRelationships": [
      "R073",
      "R074",
      "R075",
      "R076",
      "R077",
      "R078"
    ],
    "description": "Synthetic dossier on informal value transfer network operations."
  },
  {
    "id": "EV037",
    "type": "INTELLIGENCE_NOTE",
    "title": "Crescent Exchange Surveillance Report",
    "source": "District Intelligence Bureau",
    "date": "2026-08-25",
    "reliability": 0.89,
    "linkedEntities": [
      "P016",
      "ORG004",
      "LOC009",
      "DOC002"
    ],
    "linkedRelationships": [
      "R078",
      "R079",
      "R080",
      "R081",
      "R082",
      "R083"
    ],
    "description": "Synthetic surveillance report on hawala coordination points."
  },
  {
    "id": "EV038",
    "type": "CASE_RECORD",
    "title": "Port Smuggling Investigation Brief",
    "source": "Customs Intelligence Wing",
    "date": "2026-09-01",
    "reliability": 0.92,
    "linkedEntities": [
      "P017",
      "LOC003",
      "CASE007"
    ],
    "linkedRelationships": [
      "R084",
      "R085",
      "R086",
      "R087",
      "R088"
    ],
    "description": "Synthetic customs investigation into container misclassification."
  },
  {
    "id": "EV039",
    "type": "INTELLIGENCE_NOTE",
    "title": "Multi-Domain Facilitator Profile",
    "source": "Organized Crime Task Force",
    "date": "2026-08-20",
    "reliability": 0.94,
    "linkedEntities": [
      "P018",
      "PH012",
      "LOC007",
      "LOC011"
    ],
    "linkedRelationships": [
      "R089",
      "R090",
      "R091",
      "R092",
      "R093",
      "R094",
      "R095",
      "R096"
    ],
    "description": "Synthetic comprehensive profile of cross-domain facilitator."
  },
  {
    "id": "EV040",
    "type": "FIR",
    "title": "Document Forgery Investigation FIR-2026-289",
    "source": "Document Forensics Lab",
    "date": "2026-09-05",
    "reliability": 0.9,
    "linkedEntities": [
      "P022",
      "P014",
      "DOC001",
      "CASE009"
    ],
    "linkedRelationships": [
      "R099",
      "R110",
      "R111",
      "R112"
    ],
    "description": "Synthetic forensic analysis of forged transit documents."
  },
  {
    "id": "EV041",
    "type": "CDR",
    "title": "Night Operations Handset Activity Log",
    "source": "Synthetel Cellular Network",
    "date": "2026-08-10",
    "reliability": 0.87,
    "linkedEntities": [
      "P015",
      "PH013"
    ],
    "linkedRelationships": [
      "R102"
    ],
    "description": "Synthetic activity log for night operations handset."
  },
  {
    "id": "EV042",
    "type": "INTELLIGENCE_NOTE",
    "title": "Historical Informant Contact File",
    "source": "Intelligence Bureau Archive",
    "date": "2026-08-15",
    "reliability": 0.78,
    "linkedEntities": [
      "P019",
      "P003"
    ],
    "linkedRelationships": [
      "R104"
    ],
    "description": "Synthetic archived informant contact record."
  },
  {
    "id": "EV043",
    "type": "VEHICLE_RECORD",
    "title": "Modified Van Equipment Manifest",
    "source": "Communications Equipment Registry",
    "date": "2026-08-12",
    "reliability": 0.88,
    "linkedEntities": [
      "P021",
      "VEH009"
    ],
    "linkedRelationships": [
      "R108"
    ],
    "description": "Synthetic equipment manifest for mobile relay van."
  },
  {
    "id": "EV044",
    "type": "VEHICLE_RECORD",
    "title": "Motorcycle Assignment Log DL10-MB-7721",
    "source": "Fleet Management System",
    "date": "2026-08-20",
    "reliability": 0.85,
    "linkedEntities": [
      "P023",
      "VEH006"
    ],
    "linkedRelationships": [
      "R114"
    ],
    "description": "Synthetic scout motorcycle assignment record."
  },
  {
    "id": "EV045",
    "type": "INTELLIGENCE_NOTE",
    "title": "Grey Market Procurement Intelligence",
    "source": "Economic Intelligence Cell",
    "date": "2026-08-22",
    "reliability": 0.86,
    "linkedEntities": [
      "P024",
      "LOC010",
      "VEH010"
    ],
    "linkedRelationships": [
      "R116",
      "R117",
      "R118",
      "R119"
    ],
    "description": "Synthetic intelligence on grey market commodity trading."
  },
  {
    "id": "EV046",
    "type": "CASE_RECORD",
    "title": "Legal Counsel Engagement File",
    "source": "Bar Council Registry",
    "date": "2026-08-22",
    "reliability": 0.91,
    "linkedEntities": [
      "P025",
      "P010",
      "PH014"
    ],
    "linkedRelationships": [
      "R120",
      "R121",
      "R122"
    ],
    "description": "Synthetic legal representation engagement records."
  },
  {
    "id": "EV047",
    "type": "CASE_RECORD",
    "title": "Shell Company Investigation Dossier",
    "source": "Corporate Fraud Investigation Unit",
    "date": "2026-08-15",
    "reliability": 0.89,
    "linkedEntities": [
      "ORG005",
      "VEH010",
      "LOC010"
    ],
    "linkedRelationships": [
      "R127",
      "R128",
      "R146",
      "R147"
    ],
    "description": "Synthetic investigation into Phantom Freight Corp shell company."
  },
  {
    "id": "EV048",
    "type": "LOCATION_RECORD",
    "title": "Underground Garage CCTV Analysis",
    "source": "Urban Surveillance Network",
    "date": "2026-09-04",
    "reliability": 0.87,
    "linkedEntities": [
      "VEH007",
      "LOC012",
      "EVT014"
    ],
    "linkedRelationships": [
      "R131",
      "R132",
      "R133"
    ],
    "description": "Synthetic CCTV footage analysis of vehicle plate swap operation."
  },
  {
    "id": "EV049",
    "type": "EVENT_RECORD",
    "title": "Multi-Agency Raid Operation Report",
    "source": "Organized Crime Task Force",
    "date": "2026-09-10",
    "reliability": 0.97,
    "linkedEntities": [
      "P001",
      "P002",
      "P003",
      "LOC001",
      "EVT015",
      "CASE010"
    ],
    "linkedRelationships": [
      "R138",
      "R139",
      "R140",
      "R141"
    ],
    "description": "Synthetic raid operation report with seizures and arrests."
  },
  {
    "id": "EV050",
    "type": "CDR",
    "title": "Pre-Raid Communication Spike Analysis",
    "source": "Spectrum Intelligence Unit",
    "date": "2026-09-10",
    "reliability": 0.95,
    "linkedEntities": [
      "P001",
      "P003",
      "P018",
      "P010"
    ],
    "linkedRelationships": [
      "R140",
      "R141"
    ],
    "description": "Synthetic analysis of panic communications before multi-agency raid."
  },
  {
    "id": "EV051",
    "type": "INTELLIGENCE_NOTE",
    "title": "Cross-Cluster Bridge Analysis Report",
    "source": "Network Analytics Unit",
    "date": "2026-09-08",
    "reliability": 0.93,
    "linkedEntities": [
      "P003",
      "P018"
    ],
    "linkedRelationships": [
      "R090",
      "R140"
    ],
    "description": "Synthetic betweenness centrality analysis identifying bridge entities."
  },
  {
    "id": "EV052",
    "type": "CASE_RECORD",
    "title": "Organized Syndicate Master Case File",
    "source": "Organized Crime Task Force",
    "date": "2026-09-08",
    "reliability": 0.96,
    "linkedEntities": [
      "P003",
      "P010",
      "P018",
      "CASE010"
    ],
    "linkedRelationships": [
      "R095",
      "R140",
      "R141"
    ],
    "description": "Synthetic master case file linking all sub-investigations."
  },
  {
    "id": "EV053",
    "type": "LOCATION_RECORD",
    "title": "Safe House Surveillance Photos",
    "source": "Covert Surveillance Team",
    "date": "2026-08-20",
    "reliability": 0.88,
    "linkedEntities": [
      "P003",
      "P018",
      "LOC007",
      "EVT009"
    ],
    "linkedRelationships": [
      "R093",
      "R094",
      "R136",
      "R137"
    ],
    "description": "Synthetic surveillance imagery from riverside safe house."
  },
  {
    "id": "EV054",
    "type": "CDR",
    "title": "Hawala Phone Cluster Analysis",
    "source": "Telecom Forensics Unit",
    "date": "2026-08-29",
    "reliability": 0.91,
    "linkedEntities": [
      "P013",
      "P016",
      "PH010"
    ],
    "linkedRelationships": [
      "R073",
      "R079"
    ],
    "description": "Synthetic phone cluster analysis showing shared device usage."
  },
  {
    "id": "EV055",
    "type": "VEHICLE_RECORD",
    "title": "Vehicle Plate Swap Forensic Report",
    "source": "Motor Vehicle Crime Cell",
    "date": "2026-09-04",
    "reliability": 0.86,
    "linkedEntities": [
      "VEH007",
      "LOC012",
      "CASE008"
    ],
    "linkedRelationships": [
      "R131",
      "R132",
      "R133"
    ],
    "description": "Synthetic forensic analysis of registration plate counterfeiting."
  },
  {
    "id": "EV056",
    "type": "EVENT_RECORD",
    "title": "Air Cargo Diversion Incident Report",
    "source": "Airport Security Division",
    "date": "2026-09-05",
    "reliability": 0.92,
    "linkedEntities": [
      "P018",
      "LOC011",
      "EVT013"
    ],
    "linkedRelationships": [
      "R129",
      "R130"
    ],
    "description": "Synthetic incident report for unauthorized air consignment rerouting."
  },
  {
    "id": "EV057",
    "type": "INTELLIGENCE_NOTE",
    "title": "Night Convoy Escort Operations Log",
    "source": "Highway Patrol Command",
    "date": "2026-08-11",
    "reliability": 0.85,
    "linkedEntities": [
      "P023",
      "VEH006",
      "EVT001"
    ],
    "linkedRelationships": [
      "R113",
      "R114",
      "R115"
    ],
    "description": "Synthetic log of motorcycle escort during night convoy operations."
  },
  {
    "id": "EV058",
    "type": "CASE_RECORD",
    "title": "Vehicle Ring Investigation Progress",
    "source": "Motor Vehicle Crime Cell",
    "date": "2026-09-03",
    "reliability": 0.88,
    "linkedEntities": [
      "CASE008",
      "LOC012"
    ],
    "linkedRelationships": [
      "R133"
    ],
    "description": "Synthetic progress report on vehicle identity fraud investigation."
  },
  {
    "id": "EV059",
    "type": "INTELLIGENCE_NOTE",
    "title": "Mill Complex Thermal Imaging Report",
    "source": "Aerial Surveillance Unit",
    "date": "2026-09-03",
    "reliability": 0.84,
    "linkedEntities": [
      "LOC010",
      "EVT012",
      "P024"
    ],
    "linkedRelationships": [
      "R118",
      "R119"
    ],
    "description": "Synthetic thermal imaging showing nocturnal activity at abandoned mill."
  },
  {
    "id": "EV060",
    "type": "CDR",
    "title": "Executive Legal Communication Analysis",
    "source": "Court-Authorized Intercept",
    "date": "2026-09-06",
    "reliability": 0.9,
    "linkedEntities": [
      "P025",
      "P010",
      "PH014",
      "PH008"
    ],
    "linkedRelationships": [
      "R120",
      "R121"
    ],
    "description": "Synthetic analysis of legal counsel communications with executive."
  }
];
