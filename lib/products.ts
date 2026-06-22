export interface Product {
  /** Product or product-line name as the company brands it */
  name: string
  /** One short sentence: what it is / what it is for */
  description: string
  /** Direct link to official product or solutions page */
  url: string
}

export interface CompanyProducts {
  /** Must match a company name exactly as it appears in lib/tiers.ts */
  company: string
  tier: number
  products: Product[]
}

/**
 * Curated, researched product catalog — 606 product lines across 149 companies.
 * Companies without an entry show a "visit site" fallback on the products page.
 */
export const COMPANY_PRODUCTS: CompanyProducts[] = [

  // ==========================================================
  // TIER 1 – FABLESS DESIGNERS & TECH ARCHITECTS
  // ==========================================================

  {
    company: "Nvidia", tier: 1,
    products: [
      { name: "GeForce RTX 50 Series", description: "Consumer gaming and creator GPUs (Blackwell architecture)", url: "https://www.nvidia.com/en-us/geforce/" },
      { name: "Data Center GPUs (B200 / H100)", description: "AI training and inference accelerators for hyperscale", url: "https://www.nvidia.com/en-us/data-center/" },
      { name: "DGX Systems", description: "Turnkey AI supercomputers combining multiple data center GPUs", url: "https://www.nvidia.com/en-us/data-center/dgx-platform/" },
      { name: "Jetson", description: "Edge AI and robotics compute modules", url: "https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/" },
      { name: "DRIVE", description: "Autonomous vehicle compute and software platform", url: "https://www.nvidia.com/en-us/self-driving-cars/" },
      { name: "Networking (Spectrum-X / InfiniBand)", description: "High-bandwidth switches and interconnects for AI clusters", url: "https://www.nvidia.com/en-us/networking/" },
      { name: "CUDA Toolkit", description: "Parallel computing platform and API for GPU programming", url: "https://developer.nvidia.com/cuda-toolkit" },
      { name: "Omniverse", description: "Platform for 3D industrial digital twins", url: "https://www.nvidia.com/en-us/omniverse/" },
      { name: "RTX PRO", description: "Professional workstation graphics (successor to Quadro)", url: "https://www.nvidia.com/en-us/design-visualization/rtx-pro/" },
      { name: "GeForce NOW", description: "Cloud gaming streaming service", url: "https://www.nvidia.com/en-us/geforce-now/" },
    ],
  },
  {
    company: "AMD", tier: 1,
    products: [
      { name: "Ryzen", description: "Desktop and laptop CPUs", url: "https://www.amd.com/en/products/processors/laptop/ryzen.html" },
      { name: "EPYC", description: "Server and data center CPUs", url: "https://www.amd.com/en/products/processors/server/epyc.html" },
      { name: "Radeon", description: "Consumer gaming graphics cards", url: "https://www.amd.com/en/products/graphics/desktops.html" },
      { name: "Radeon PRO", description: "Professional workstation graphics", url: "https://www.amd.com/en/products/graphics/workstations.html" },
      { name: "Instinct", description: "AI and HPC data center accelerators", url: "https://www.amd.com/en/products/accelerators/instinct.html" },
      { name: "Threadripper", description: "High-end desktop and workstation CPUs", url: "https://www.amd.com/en/products/processors/workstations/ryzen-threadripper.html" },
      { name: "Versal", description: "Adaptive SoCs combining CPU, AI engines, and programmable logic", url: "https://www.amd.com/en/products/adaptive-socs-and-fpgas/versal.html" },
      { name: "Alveo", description: "Data center accelerator cards for compute-intensive workloads", url: "https://www.amd.com/en/products/accelerators/alveo.html" },
      { name: "Pensando DPU", description: "Data Processing Units and SmartNICs for data center networking", url: "https://www.amd.com/en/products/accelerators/pensando.html" },
      { name: "ROCm", description: "Open software stack for AI and HPC on AMD accelerators", url: "https://www.amd.com/en/products/software/rocm.html" },
    ],
  },
  {
    company: "Apple", tier: 1,
    products: [
      { name: "iPhone", description: "Smartphone line built on Apple's A-series silicon", url: "https://www.apple.com/iphone/" },
      { name: "Mac", description: "Computer line built on Apple's M-series silicon", url: "https://www.apple.com/mac/" },
      { name: "iPad", description: "Tablet line, recent models on M-series silicon", url: "https://www.apple.com/ipad/" },
      { name: "Apple Watch", description: "Wearable built on Apple's S-series chip", url: "https://www.apple.com/watch/" },
      { name: "AirPods", description: "Wireless audio built on Apple's H-series chip", url: "https://www.apple.com/airpods/" },
      { name: "Apple Vision Pro", description: "Spatial computing headset on M-series and R1 chips", url: "https://www.apple.com/apple-vision-pro/" },
      { name: "Apple Silicon Developer Hub", description: "Developer resources for Apple's custom chip platform", url: "https://developer.apple.com/apple-silicon/" },
    ],
  },
  {
    company: "Qualcomm", tier: 1,
    products: [
      { name: "Snapdragon Mobile", description: "Smartphone application processors and modems", url: "https://www.qualcomm.com/products/mobile/snapdragon" },
      { name: "Snapdragon X (PC)", description: "Arm-based laptop and PC platforms", url: "https://www.qualcomm.com/products/mobile/snapdragon/laptops-and-tablets/snapdragon-x-series" },
      { name: "Snapdragon Digital Chassis", description: "Automotive compute, connectivity, and ADAS platforms", url: "https://www.qualcomm.com/products/automotive" },
      { name: "FastConnect", description: "Wi-Fi and Bluetooth connectivity chips", url: "https://www.qualcomm.com/products/technology/connectivity" },
      { name: "Snapdragon IoT", description: "Compute platforms for industrial and consumer IoT", url: "https://www.qualcomm.com/products/internet-of-things" },
      { name: "RF Front-End", description: "RF components for cellular connectivity", url: "https://www.qualcomm.com/products/technology/rf-front-end" },
    ],
  },
  {
    company: "Broadcom", tier: 1,
    products: [
      { name: "Tomahawk Ethernet Switches", description: "High-radix switch ASICs for data center networking", url: "https://www.broadcom.com/products/ethernet-connectivity/switching/tomahawk" },
      { name: "Jericho Routing Silicon", description: "Routing silicon for service provider and data center", url: "https://www.broadcom.com/products/ethernet-connectivity/routing/jericho" },
      { name: "Custom AI Accelerators", description: "Custom ASIC design services for hyperscale AI", url: "https://www.broadcom.com/products/ai" },
      { name: "Wireless Connectivity", description: "Wi-Fi and Bluetooth combo chips for mobile and consumer", url: "https://www.broadcom.com/products/wireless" },
      { name: "Fibre Channel Adapters", description: "Storage adapters and connectivity (Emulex / Brocade)", url: "https://www.broadcom.com/products/storage" },
      { name: "Optical Components", description: "Lasers and photodetectors for fiber-optic networking", url: "https://www.broadcom.com/products/optical-components" },
    ],
  },
  {
    company: "MediaTek", tier: 1,
    products: [
      { name: "Dimensity", description: "Smartphone system-on-chip platforms", url: "https://www.mediatek.com/products/smartphones-2/dimensity-1" },
      { name: "Genio IoT", description: "SoC platforms for IoT and edge AI devices", url: "https://www.mediatek.com/products/iot" },
      { name: "Kompanio", description: "Chips for Chromebooks and tablets", url: "https://www.mediatek.com/products/chromebooks" },
      { name: "Pentonic TV", description: "Smart TV and display processors", url: "https://www.mediatek.com/products/smart-display/pentonic" },
      { name: "Filogic Wi-Fi", description: "Wi-Fi and broadband connectivity chips", url: "https://www.mediatek.com/products/broadband-wifi" },
      { name: "Dimensity Auto", description: "Automotive cockpit and connectivity platforms", url: "https://www.mediatek.com/products/auto" },
    ],
  },
  {
    company: "Marvell Technology", tier: 1,
    products: [
      { name: "Custom AI Silicon", description: "Custom ASIC design services for hyperscale AI infrastructure", url: "https://www.marvell.com/products/custom-asics.html" },
      { name: "Ethernet Switching", description: "Data center and carrier switch silicon", url: "https://www.marvell.com/products/switching.html" },
      { name: "Optical Interconnect DSPs", description: "PAM4 DSPs and optical modules for data center interconnect", url: "https://www.marvell.com/products/interconnect.html" },
      { name: "Storage Controllers", description: "Controllers for enterprise SSDs and storage systems", url: "https://www.marvell.com/products/storage.html" },
      { name: "Automotive Ethernet", description: "In-vehicle networking silicon", url: "https://www.marvell.com/products/automotive.html" },
    ],
  },
  {
    company: "Amazon Web Services", tier: 1,
    products: [
      { name: "Trainium", description: "Custom ML training chip for AWS deep learning workloads", url: "https://aws.amazon.com/ai/trainium/" },
      { name: "Inferentia", description: "Custom ML inference chip for low-cost, high-throughput AI", url: "https://aws.amazon.com/ai/machine-learning/inferentia/" },
      { name: "Graviton", description: "Arm-based CPU for EC2 cloud instances", url: "https://aws.amazon.com/ec2/graviton/" },
    ],
  },
  {
    company: "Google", tier: 1,
    products: [
      { name: "Cloud TPU v5", description: "Tensor Processing Units for ML training and inference at scale", url: "https://cloud.google.com/tpu" },
      { name: "Axion CPU", description: "Arm-based CPU for Google Cloud compute instances", url: "https://cloud.google.com/blog/products/compute/introducing-googles-new-arm-based-cpu" },
      { name: "Google Tensor", description: "Custom SoC for Pixel smartphones (G4 in Pixel 9)", url: "https://store.google.com/us/category/phones" },
      { name: "Pixel 9 Series", description: "Smartphones built on Google Tensor silicon", url: "https://store.google.com/us/category/phones" },
      { name: "Pixel Tablet", description: "Tablet built on Google Tensor silicon", url: "https://store.google.com/us/category/tablets" },
    ],
  },
  {
    company: "Microsoft", tier: 1,
    products: [
      { name: "Azure Maia 100", description: "Custom AI accelerator chip for Azure large language model training", url: "https://azure.microsoft.com/en-us/blog/microsoft-azure-maia-100-ai-accelerator-chip/" },
      { name: "Azure Cobalt 100", description: "Custom Arm-based CPU for Azure cloud compute", url: "https://azure.microsoft.com/en-us/blog/azure-cobalt-100-arm-based-processor/" },
      { name: "Azure AI Platform", description: "Cloud infrastructure for AI development on custom silicon", url: "https://azure.microsoft.com/en-us/solutions/ai/" },
    ],
  },
  {
    company: "Meta Platforms", tier: 1,
    products: [
      { name: "MTIA v2", description: "Custom AI inference accelerator for Meta's recommendation systems", url: "https://ai.meta.com/blog/next-generation-meta-training-inference-accelerator-ai-mtia/" },
      { name: "Meta Quest 3", description: "Mixed reality headset with Snapdragon XR2 Gen 2", url: "https://www.meta.com/quest/quest-3/" },
      { name: "Ray-Ban Meta Glasses", description: "AI-enabled smart glasses with custom audio/camera silicon", url: "https://www.meta.com/smart-glasses/" },
    ],
  },
  {
    company: "Tesla", tier: 1,
    products: [
      { name: "Full Self-Driving (FSD) Chip", description: "Custom AI chip for Autopilot and autonomous driving", url: "https://www.tesla.com/autopilot" },
      { name: "Dojo D1", description: "Custom training chip for Tesla's AI supercomputer", url: "https://www.tesla.com/dojo" },
      { name: "Autopilot Hardware", description: "Vision-based driver assistance compute platform in every Tesla", url: "https://www.tesla.com/en_us/autopilot" },
    ],
  },
  {
    company: "Cisco Systems", tier: 1,
    products: [
      { name: "Silicon One", description: "Unified routing and switching ASIC family for data center and service provider", url: "https://www.cisco.com/c/en/us/solutions/silicon-one.html" },
      { name: "Catalyst Switches", description: "Enterprise and campus switching platforms", url: "https://www.cisco.com/c/en/us/products/switches/catalyst-series-switches.html" },
      { name: "Nexus Data Center Switches", description: "High-performance data center switching", url: "https://www.cisco.com/c/en/us/products/switches/data-center-switches.html" },
      { name: "8000 Series Routers", description: "Service provider and large enterprise routing", url: "https://www.cisco.com/c/en/us/products/routers/8000-series-routers.html" },
    ],
  },
  {
    company: "IBM", tier: 1,
    products: [
      { name: "Power10", description: "High-performance RISC server processor", url: "https://www.ibm.com/products/power10" },
      { name: "IBM z16 (Telum)", description: "Mainframe processor with on-chip AI accelerator", url: "https://www.ibm.com/products/z16" },
      { name: "IBM Quantum", description: "Quantum computing processors and cloud access", url: "https://www.ibm.com/quantum" },
    ],
  },
  {
    company: "Realtek Semiconductor", tier: 1,
    products: [
      { name: "Network Interface Controllers", description: "PCIe NICs and Ethernet controllers for PCs and servers", url: "https://www.realtek.com/en/products/communications-network-ics" },
      { name: "Audio Codecs", description: "HD audio controllers for PC motherboards", url: "https://www.realtek.com/en/products/audio-ics" },
      { name: "PCIe / Storage ICs", description: "PCIe bridges and card readers", url: "https://www.realtek.com/en/products/memory-storage-ics" },
      { name: "Wi-Fi Chipsets", description: "802.11ax (Wi-Fi 6) and Wi-Fi 7 chipsets", url: "https://www.realtek.com/en/products/wireless-communication-ics" },
    ],
  },
  {
    company: "Novatek Microelectronics", tier: 1,
    products: [
      { name: "Display Driver ICs (DDIC)", description: "Driver ICs for OLED and LCD panels in smartphones and TVs", url: "https://www.novatek.com.tw/en/product/index.aspx" },
      { name: "Timing Controllers (TCON)", description: "Panel timing controllers for high-resolution displays", url: "https://www.novatek.com.tw/en/product/index.aspx?cid=3" },
      { name: "Automotive Display ICs", description: "Display drivers for instrument clusters and infotainment", url: "https://www.novatek.com.tw/en/application/automotive.aspx" },
    ],
  },
  {
    company: "Cirrus Logic", tier: 1,
    products: [
      { name: "Smart Codecs", description: "Audio codecs with integrated DSP for boosted amplification in smartphones", url: "https://www.cirrus.com/products/smart-codecs/" },
      { name: "Audio ADC/DAC", description: "High-precision audio converters for professional audio", url: "https://www.cirrus.com/products/audio-converters/" },
      { name: "Haptic Drivers", description: "Precision haptic feedback drivers for mobile devices", url: "https://www.cirrus.com/products/haptic-drivers/" },
      { name: "Voice Processors", description: "Voice-over-chip DSPs for always-on voice detection", url: "https://www.cirrus.com/products/voice-processors/" },
    ],
  },
  {
    company: "Skyworks Solutions", tier: 1,
    products: [
      { name: "RF Front-End Modules (Mobile)", description: "Amplifiers and filters for mobile device connectivity", url: "https://www.skyworksinc.com/en/Products/RF/Front-End-Modules" },
      { name: "Wi-Fi / Bluetooth SiPs", description: "System-in-package solutions for wireless connectivity", url: "https://www.skyworksinc.com/en/Application-Pages/Wi-Fi" },
      { name: "Automotive RF", description: "RF components for V2X and in-vehicle connectivity", url: "https://www.skyworksinc.com/en/Application-Pages/Automotive" },
      { name: "5G Infrastructure", description: "Power amplifiers and switches for 5G base stations", url: "https://www.skyworksinc.com/en/Application-Pages/Infrastructure" },
      { name: "IoT Wireless", description: "Small-form-factor chips for connected devices", url: "https://www.skyworksinc.com/en/Application-Pages/IoT" },
    ],
  },
  {
    company: "Qorvo", tier: 1,
    products: [
      { name: "Cellular RF Front-End", description: "RF power amplifiers and FEMs for mobile devices", url: "https://www.qorvo.com/products/cellular-rf-power" },
      { name: "Wi-Fi & Connectivity", description: "Connectivity ICs supporting Wi-Fi 6E and Matter protocol", url: "https://www.qorvo.com/products/wifi" },
      { name: "Ultra-Wideband (UWB)", description: "Precision short-range location and ranging chips", url: "https://www.qorvo.com/products/ultra-wideband" },
      { name: "GaN Power Devices", description: "Gallium nitride power transistors for defense and telecom", url: "https://www.qorvo.com/products/power-management" },
      { name: "Defense & Aerospace RF", description: "RF components for radar, missile, and satellite systems", url: "https://www.qorvo.com/products/defense-aerospace" },
    ],
  },
  {
    company: "Monolithic Power Systems", tier: 1,
    products: [
      { name: "DC-DC Power Modules", description: "Integrated step-down and step-up power conversion modules", url: "https://www.monolithicpower.com/en/products/power-modules" },
      { name: "Battery Management ICs", description: "ICs for battery charging, protection, and fuel gauging", url: "https://www.monolithicpower.com/en/products/battery-management" },
      { name: "Motor Control ICs", description: "ICs for precision stepper and brushless DC motor drive", url: "https://www.monolithicpower.com/en/products/motor-control" },
      { name: "Automotive Power", description: "High-efficiency power solutions for EV and ADAS", url: "https://www.monolithicpower.com/en/applications/automotive" },
      { name: "AI Data Center Power", description: "High-density point-of-load power for AI server GPU clusters", url: "https://www.monolithicpower.com/en/applications/data-center-and-communications" },
    ],
  },
  {
    company: "Ambarella", tier: 1,
    products: [
      { name: "CVflow AI Vision SoCs", description: "AI-powered vision processors for security cameras and ADAS", url: "https://www.ambarella.com/products/" },
      { name: "CV72 / CV3 Automotive", description: "Central perception SoCs for L2+ to L4 autonomous driving", url: "https://www.ambarella.com/products/automotive/" },
      { name: "IP Camera SoCs", description: "Energy-efficient video processing for smart security cameras", url: "https://www.ambarella.com/products/ip-security/" },
    ],
  },
  {
    company: "Lattice Semiconductor", tier: 1,
    products: [
      { name: "Nexus FPGAs", description: "Low-power, small-footprint FPGAs for edge applications", url: "https://www.latticesemi.com/en/Products/FPGAandCPLD/Nexus" },
      { name: "ECP5 FPGAs", description: "Mid-range FPGAs for comms and industrial applications", url: "https://www.latticesemi.com/Products/FPGAandCPLD/ECP5" },
      { name: "sensAI", description: "AI inference platform for edge deployments on Lattice FPGAs", url: "https://www.latticesemi.com/Solutions/Solutions/SolutionsDetails02.aspx?id=88" },
      { name: "Automate Platform", description: "FPGA platform targeting industrial automation", url: "https://www.latticesemi.com/solutions/industry/industrial" },
      { name: "Avant FPGAs", description: "Mid-range FPGAs with PCIe 5.0 and DDR5 support", url: "https://www.latticesemi.com/en/Products/FPGAandCPLD/Avant" },
    ],
  },
  {
    company: "Nordic Semiconductor", tier: 1,
    products: [
      { name: "nRF52 Series (Bluetooth LE)", description: "Multi-protocol Bluetooth 5 SoCs for IoT wearables", url: "https://www.nordicsemi.com/Products/Bluetooth-Low-Energy" },
      { name: "nRF9151 (LTE-M / NB-IoT)", description: "Cellular IoT SiP for asset tracking and low-power devices", url: "https://www.nordicsemi.com/Products/nRF9151" },
      { name: "nRF7002 (Wi-Fi 6)", description: "Ultra-low-power Wi-Fi 6 companion chip for IoT devices", url: "https://www.nordicsemi.com/Products/nRF7002" },
      { name: "nRF54 Series", description: "Next-generation multiprotocol SoCs with RISC-V application core", url: "https://www.nordicsemi.com/Products/nRF54L15" },
      { name: "nRF Connect SDK", description: "Open-source firmware SDK for all Nordic devices", url: "https://www.nordicsemi.com/Products/Development-software/nRF-Connect-SDK" },
    ],
  },
  {
    company: "Semtech", tier: 1,
    products: [
      { name: "LoRa Transceivers", description: "Long-range, low-power wireless modems used in IoT LPWAN networks", url: "https://www.semtech.com/lora" },
      { name: "ClearEdge CDRs", description: "Signal integrity ICs for 800G data center interconnect", url: "https://www.semtech.com/products/signal-integrity" },
      { name: "LinkEdge Platform", description: "Optical networking PHYs for cloud data center interconnect", url: "https://www.semtech.com/products/optical" },
      { name: "Sierra Wireless (IoT Modules)", description: "Integrated LTE and 5G IoT modules and connectivity solutions", url: "https://www.semtech.com/products/wireless-rf" },
    ],
  },
  {
    company: "MaxLinear", tier: 1,
    products: [
      { name: "Broadband Access (GPON / XGS-PON)", description: "Optical line terminal chips for fiber broadband access networks", url: "https://www.maxlinear.com/products/access-broadband" },
      { name: "Ethernet PAM4 PHYs", description: "High-speed Ethernet PHYs for 400G/800G data center links", url: "https://www.maxlinear.com/products/high-speed-interconnect" },
      { name: "Storage SAS/SATA Controllers", description: "Host bus adapters for enterprise storage systems", url: "https://www.maxlinear.com/products/storage" },
      { name: "Cable Access (DOCSIS)", description: "DOCSIS 3.1/4.0 chips for cable broadband infrastructure", url: "https://www.maxlinear.com/products/broadband" },
    ],
  },
  {
    company: "Allegro MicroSystems", tier: 1,
    products: [
      { name: "Current Sensor ICs", description: "Galvanically isolated current sensors for EV and industrial", url: "https://www.allegromicro.com/en/products/sense" },
      { name: "Brushless DC Motor Drivers", description: "Integrated gate drivers for BLDC motor control", url: "https://www.allegromicro.com/en/products/drive" },
      { name: "Position & Speed Sensors", description: "Magnetic position sensors for automotive throttle and power steering", url: "https://www.allegromicro.com/en/products/sense/position-speed-sensors" },
      { name: "Linear Regulator ICs", description: "Low-dropout regulators for automotive and industrial", url: "https://www.allegromicro.com/en/products/power/linear-regulators" },
    ],
  },
  {
    company: "Rambus", tier: 1,
    products: [
      { name: "Memory Interface Chips (MIC)", description: "On-DIMM PHY chips enabling JEDEC DDR5 and HBM3 at maximum speed", url: "https://www.rambus.com/memory/" },
      { name: "Root of Trust Security IP", description: "Hardware security modules implementing cryptographic functions", url: "https://www.rambus.com/security/" },
      { name: "PCIe / CXL SerDes IP", description: "High-speed serial PHY IP for PCIe 6.0 and CXL", url: "https://www.rambus.com/interface-ip/serdes/" },
      { name: "Crypto Acceleration IP", description: "Hardware accelerators for AES, SHA, RSA and elliptic curve crypto", url: "https://www.rambus.com/security/cryptography/" },
    ],
  },
  {
    company: "CEVA", tier: 1,
    products: [
      { name: "CEVA-X DSP Cores", description: "Baseband DSP IP for 4G/5G modem designs", url: "https://www.ceva-dsp.com/product/ceva-xc-dsp/" },
      { name: "CEVA-BX AI Cores", description: "Neural network inference IP for edge AI acceleration", url: "https://www.ceva-dsp.com/product/ceva-bx/" },
      { name: "CEVA-WE Wi-Fi IP", description: "Wi-Fi 6E and 7 PHY and MAC IP for wireless SoC designs", url: "https://www.ceva-dsp.com/product/ceva-wifi/" },
      { name: "CEVA-Radar Processing IP", description: "Digital front-end and CFAR IP for automotive radar SoCs", url: "https://www.ceva-dsp.com/product/ceva-radar/" },
      { name: "RivieraWaves Bluetooth IP", description: "Bluetooth 5.4 and BLE IP for IoT and wearable SoCs", url: "https://www.ceva-dsp.com/product/rivierawaves-bluetooth/" },
    ],
  },
  {
    company: "Silicon Laboratories", tier: 1,
    products: [
      { name: "EFM32 / EFR32 MCUs", description: "Ultra-low-power 32-bit microcontrollers for IoT and wearables", url: "https://www.silabs.com/microcontrollers/32-bit" },
      { name: "Matter / Zigbee / Thread Chips", description: "Multi-protocol wireless SoCs for smart home devices", url: "https://www.silabs.com/wireless/matter" },
      { name: "Series 2 Wi-Fi Module", description: "Low-power Wi-Fi modules for IoT connectivity", url: "https://www.silabs.com/wireless/wi-fi" },
      { name: "Precision Oscillators (Si5x)", description: "Ultra-low-jitter timing ICs for networking and data center", url: "https://www.silabs.com/timing" },
    ],
  },
  {
    company: "Mobileye", tier: 1,
    products: [
      { name: "EyeQ6 SoC", description: "6th-generation autonomous driving perception processor", url: "https://www.mobileye.com/technology/" },
      { name: "SuperVision", description: "Supervised highway driving system built on EyeQ chips", url: "https://www.mobileye.com/supervision/" },
      { name: "Mobileye Drive", description: "Full self-driving software and hardware stack", url: "https://www.mobileye.com/mobileye-drive/" },
    ],
  },
  {
    company: "Diodes Incorporated", tier: 1,
    products: [
      { name: "MOSFETs (TrenchFET)", description: "Power MOSFETs for load switching and DC-DC converters", url: "https://www.diodes.com/products/transistors/mosfets/" },
      { name: "Schottky Rectifiers", description: "Schottky barrier diodes for power supply rectification", url: "https://www.diodes.com/products/diodes-and-rectifiers/schottky/" },
      { name: "Logic ICs", description: "7400-family and advanced CMOS logic devices", url: "https://www.diodes.com/products/logic-ics/" },
      { name: "LED Drivers", description: "Constant-current drivers for automotive and display LED lighting", url: "https://www.diodes.com/products/led-drivers/" },
      { name: "USB Power Controllers", description: "USB Type-C and PD controllers for chargers and ports", url: "https://www.diodes.com/products/usb/" },
    ],
  },
  {
    company: "Power Integrations", tier: 1,
    products: [
      { name: "InnoSwitch3", description: "Flyback power supply ICs integrating HV MOSFET, controller, and sense", url: "https://www.power.com/products/innoswitch3/" },
      { name: "LYTSwitch-7", description: "LED driver ICs for isolated, dimmable smart lighting", url: "https://www.power.com/products/lytswitch-7/" },
      { name: "HiperLCS-2", description: "Highly integrated LLC resonant controller for high-power supplies", url: "https://www.power.com/products/hiperlcs-2/" },
      { name: "BridgeSwitch", description: "Motor drive ICs with integrated GaN switches for appliance BLDC motors", url: "https://www.power.com/products/bridgeswitch/" },
    ],
  },
  {
    company: "indie Semiconductor", tier: 1,
    products: [
      { name: "UWB Ranging (Voyager)", description: "Ultra-wideband chips for centimeter-accuracy automotive access and ranging", url: "https://www.indiesemi.com/products/uwb/" },
      { name: "LiDAR Transceiver", description: "Mixed-signal front-ends for solid-state automotive LiDAR", url: "https://www.indiesemi.com/products/lidar/" },
      { name: "Vehicle Connectivity (V2X)", description: "802.11p / C-V2X chipsets for vehicle-to-everything communication", url: "https://www.indiesemi.com/products/connectivity/" },
      { name: "In-Cabin Sensing", description: "Radar and camera sensing ICs for driver and occupant monitoring", url: "https://www.indiesemi.com/products/in-cabin/" },
    ],
  },
  {
    company: "SiTime", tier: 1,
    products: [
      { name: "Elite Platform (SiT9514x)", description: "MEMS-based TCXO and OCXO replacements with superior stability", url: "https://www.sitime.com/products/mems-oscillators/sit9514x" },
      { name: "Epoch Platform", description: "Ultra-low-jitter MEMS oscillators for networking and data center timing", url: "https://www.sitime.com/products/epoch-platform" },
      { name: "SiT1602 (Oscillators)", description: "Temperature-compensated MEMS oscillators for IoT and wearables", url: "https://www.sitime.com/products/mems-oscillators" },
    ],
  },
  {
    company: "Navitas Semiconductor", tier: 1,
    products: [
      { name: "GaNFast ICs", description: "Integrated GaN power ICs for ultra-fast EV and mobile chargers", url: "https://navitassemi.com/products/gallium-nitride-ics/" },
      { name: "GeneSiC SiC MOSFETs", description: "High-voltage SiC MOSFETs for EV inverters and solar inverters", url: "https://navitassemi.com/products/silicon-carbide/" },
      { name: "NV6247 GaN Charger IC", description: "Fully integrated charger-on-chip targeting USB-C adapters", url: "https://navitassemi.com/products/gallium-nitride-ics/" },
    ],
  },
  {
    company: "Astera Labs", tier: 1,
    products: [
      { name: "Aries PCIe / CXL Retimers", description: "Smart DSP retimers extending reach for PCIe 5.0 / 6.0 and CXL 3.0", url: "https://asteralabs.com/products/aries-smart-dsp-retimers/" },
      { name: "Leo Memory Connectivity", description: "CXL memory expander controllers for large memory pool architectures", url: "https://asteralabs.com/products/leo-cxl-memory-connectivity/" },
      { name: "Scorpio AI Fabric Switches", description: "Intelligent fabric switches for AI server pod interconnect", url: "https://asteralabs.com/products/scorpio-ai-fabric-switches/" },
    ],
  },
  {
    company: "Credo Technology Group", tier: 1,
    products: [
      { name: "HiWire Active Electrical Cables", description: "AEC chipsets for high-density rack-to-rack interconnect at 800G", url: "https://www.credosemi.com/products/cables/" },
      { name: "Line Card PHYs", description: "112G / 224G SerDes PHYs for optical line cards", url: "https://www.credosemi.com/products/line-card/" },
      { name: "Dove optical DSPs", description: "PAM4 DSPs for optical coherent and direct-detect transceivers", url: "https://www.credosemi.com/products/optical/" },
    ],
  },
  {
    company: "Espressif Systems", tier: 1,
    products: [
      { name: "ESP32", description: "Dual-core Wi-Fi and Bluetooth SoC — the definitive IoT microcontroller", url: "https://www.espressif.com/en/products/socs/esp32" },
      { name: "ESP32-S3", description: "AI-capable SoC with vector instructions for tinyML inference", url: "https://www.espressif.com/en/products/socs/esp32-s3" },
      { name: "ESP32-C6", description: "RISC-V SoC supporting Wi-Fi 6, Bluetooth 5, and Thread/Matter", url: "https://www.espressif.com/en/products/socs/esp32-c6" },
      { name: "ESP-IDF", description: "Official firmware development framework for all ESP32 devices", url: "https://www.espressif.com/en/products/sdks/esp-idf" },
      { name: "ESP RainMaker", description: "Cloud IoT platform for ESP32-based connected devices", url: "https://rainmaker.espressif.com/" },
    ],
  },
  {
    company: "u-blox", tier: 1,
    products: [
      { name: "M10 GNSS Module", description: "Ultra-low-power GNSS positioning module for asset tracking", url: "https://www.u-blox.com/en/product-category/gnss/positioning" },
      { name: "SARA-R4 (LTE-M / NB-IoT)", description: "Cellular IoT module for global low-power deployments", url: "https://www.u-blox.com/en/product-category/cellular/lte-m-nb-iot" },
      { name: "NORA-W10 Wi-Fi / BT", description: "Compact Wi-Fi 4 and Bluetooth 5.0 module for IoT", url: "https://www.u-blox.com/en/product-category/wifi" },
      { name: "NEO-D9 Correction Services", description: "L-band satellite-delivered GNSS correction data receiver", url: "https://www.u-blox.com/en/product-category/gnss/high-precision" },
    ],
  },
  {
    company: "Ampere Computing", tier: 1,
    products: [
      { name: "AmpereOne", description: "192-core cloud-native Arm server processor for hyperscale compute", url: "https://amperecomputing.com/processors/ampere-one" },
      { name: "Altra / Altra Max", description: "80–128 core Arm server processor for cloud and enterprise", url: "https://amperecomputing.com/processors/ampere-altra" },
    ],
  },
  {
    company: "Cerebras Systems", tier: 1,
    products: [
      { name: "CS-3 Wafer Scale Engine", description: "The largest chip ever made — 900,000 AI cores on a full 300mm wafer", url: "https://www.cerebras.net/chip/" },
      { name: "Cerebras Inference", description: "Purpose-built inference service delivering unprecedented token speed", url: "https://www.cerebras.net/product-cloud/" },
    ],
  },
  {
    company: "Tenstorrent", tier: 1,
    products: [
      { name: "Wormhole n150 / n300", description: "RISC-V AI accelerator cards for training and inference", url: "https://tenstorrent.com/cards/" },
      { name: "Galaxy", description: "Dense multi-Wormhole server platform for LLM training", url: "https://tenstorrent.com/cards/" },
      { name: "Blackhole", description: "Next-generation 7nm RISC-V AI processor", url: "https://tenstorrent.com/cards/" },
    ],
  },
  {
    company: "Groq", tier: 1,
    products: [
      { name: "Language Processing Unit (LPU)", description: "Deterministic, ultra-low-latency AI inference processor", url: "https://wow.groq.com/" },
      { name: "GroqCloud", description: "Inference-as-a-service API delivering record tokens-per-second for LLMs", url: "https://groq.com/" },
    ],
  },
  {
    company: "SiFive", tier: 1,
    products: [
      { name: "P870 RISC-V Core IP", description: "High-performance 64-bit RISC-V application core for AI and HPC", url: "https://www.sifive.com/risc-v-core-ip/" },
      { name: "Intelligence X280", description: "Vector-extended RISC-V core targeting ML inference workloads", url: "https://www.sifive.com/risc-v-core-ip/" },
      { name: "HiFive Unmatched", description: "RISC-V Linux developer board for SoC prototyping", url: "https://www.sifive.com/boards/" },
    ],
  },
  {
    company: "Synaptics", tier: 1,
    products: [
      { name: "ClearPad Touchpad Controllers", description: "Precision trackpad ICs for Chromebooks and premium laptops", url: "https://www.synaptics.com/products/touchpad-controllers" },
      { name: "VideoSmart Display Bridges", description: "Video interface bridging chips for AR/VR and IoT displays", url: "https://www.synaptics.com/products/displays" },
      { name: "Natural ID Fingerprint Sensors", description: "Fingerprint authentication ICs for smartphones and laptops", url: "https://www.synaptics.com/products/fingerprint" },
      { name: "AudioSmart DSPs", description: "Far-field microphone and noise cancellation DSPs for smart speakers", url: "https://www.synaptics.com/products/audio" },
    ],
  },
  {
    company: "Macom Technology Solutions", tier: 1,
    products: [
      { name: "GaN RF Power Transistors", description: "Wideband GaN transistors for 5G base stations and defense radar", url: "https://www.macom.com/products/rf-microwave-millimeter-wave" },
      { name: "MAAD-011126 PIN Diodes", description: "Microwave PIN diodes for signal switching and attenuation", url: "https://www.macom.com/products/diodes" },
      { name: "MALD Series Laser Drivers", description: "Laser drivers and TIAs for optical data center interconnect", url: "https://www.macom.com/products/optical" },
      { name: "Power Management ICs", description: "High-voltage DC-DC controllers for telecom and datacom", url: "https://www.macom.com/products/power-management" },
    ],
  },
  {
    company: "Wolfspeed", tier: 1,
    products: [
      { name: "SiC MOSFETs (Wolfpack)", description: "Silicon carbide power transistors for EV inverters and industrial", url: "https://www.wolfspeed.com/products/power/sic-mosfets/" },
      { name: "SiC Schottky Diodes", description: "SiC Schottky barrier diodes for power factor correction", url: "https://www.wolfspeed.com/products/power/sic-diodes/" },
      { name: "Power Modules (EV)", description: "Packaged SiC power modules for automotive traction inverters", url: "https://www.wolfspeed.com/products/power/power-modules/" },
      { name: "GaN RF Transistors", description: "High-power GaN-on-SiC transistors for 5G and defense", url: "https://www.wolfspeed.com/products/rf/" },
    ],
  },
  {
    company: "Silicon Motion Technology", tier: 1,
    products: [
      { name: "SM2267 NVMe SSD Controller", description: "PCIe 4.0 NVMe controller targeting consumer and client SSDs", url: "https://www.siliconmotion.com/Products-NVMe-SSD-Controllers" },
      { name: "NAND Management IP", description: "Proprietary flash management firmware and wear-leveling algorithms", url: "https://www.siliconmotion.com/Products-NAND-Management-IP" },
      { name: "eMMC / UFS Controllers", description: "Embedded storage controllers for smartphones and tablets", url: "https://www.siliconmotion.com/Products-eMMC-UFS" },
    ],
  },
  {
    company: "Phison Electronics", tier: 1,
    products: [
      { name: "PS5026-E26 (PCIe 5.0)", description: "Flagship PCIe 5.0 NVMe SSD controller for ultra-high-speed SSDs", url: "https://www.phison.com/en/Storage-Products" },
      { name: "E18 PCIe 4.0 Controller", description: "High-performance PCIe 4.0 consumer SSD controller", url: "https://www.phison.com/en/Storage-Products" },
      { name: "AI Edge Storage", description: "Storage controllers and AI acceleration for edge devices", url: "https://www.phison.com/en/AIoT-Products" },
    ],
  },
  {
    company: "Parade Technologies", tier: 1,
    products: [
      { name: "PS8815 USB4 / Thunderbolt Retimer", description: "USB4 and Thunderbolt 4 signal conditioner for docks and laptops", url: "https://www.paradetech.com/products/usb-type-c-solutions/" },
      { name: "DP-to-HDMI Bridge ICs", description: "DisplayPort-to-HDMI 2.1 display bridge chips", url: "https://www.paradetech.com/products/dp-to-hdmi/" },
      { name: "TCON Display Controllers", description: "Touch and timing controller ICs for laptop and tablet panels", url: "https://www.paradetech.com/products/lvds-solutions/" },
    ],
  },
  {
    company: "Nuvoton Technology", tier: 1,
    products: [
      { name: "NuMicro M4 MCU", description: "Arm Cortex-M4 microcontrollers for industrial and IoT", url: "https://www.nuvoton.com/products/microcontrollers/arm-cortex-m4-mcus/" },
      { name: "NPCX9 Super I/O", description: "Embedded controller for PC platform management (Chromebook, laptop EC)", url: "https://www.nuvoton.com/products/pc-connectivity-components/" },
      { name: "NAU88xx Audio Codecs", description: "High-quality audio codecs for consumer electronics", url: "https://www.nuvoton.com/products/audio-ics/" },
    ],
  },
  {
    company: "Melexis", tier: 1,
    products: [
      { name: "MLX90640 IR Array Sensor", description: "32×24 thermal imaging array for occupancy detection and contactless temp", url: "https://www.melexis.com/en/products/infrared-sensor/thermal-imager" },
      { name: "MLX81300 Automotive IC", description: "LIN motor driver and body electronics IC for automotive", url: "https://www.melexis.com/en/products/actuator-driver/motor-driver" },
      { name: "MLX90393 3D Magnetic Sensor", description: "3-axis magnetic position sensor for joystick and rotary encoder", url: "https://www.melexis.com/en/products/magnetic-position-sensors" },
      { name: "Automotive Hall-Effect Sensors", description: "Speed and position sensors for powertrain and transmission", url: "https://www.melexis.com/en/products/magnetic-position-sensors/current-position" },
    ],
  },
  {
    company: "Socionext", tier: 1,
    products: [
      { name: "SC2000 5G Baseband SoC", description: "Integrated baseband processor for small cell 5G base stations", url: "https://www.socionext.com/en/products/assp/5g/" },
      { name: "SC1200A Image Processor", description: "High-speed image processing SoC for machine vision and surveillance", url: "https://www.socionext.com/en/products/assp/image/" },
      { name: "Milbeaut Camera ISP", description: "Image signal processor IP for smartphone and embedded camera pipelines", url: "https://www.socionext.com/en/products/assp/image/milbeaut/" },
    ],
  },
  {
    company: "Asahi Kasei Microdevices", tier: 1,
    products: [
      { name: "AK4191 Audio DAC", description: "Flagship 32-bit stereo audio DAC for high-resolution music players", url: "https://www.akm.com/us/en/products/audio/dac/ak4191eg/" },
      { name: "AK5394A ADC", description: "Professional 32-bit audio ADC for recording equipment", url: "https://www.akm.com/us/en/products/audio/adc/" },
      { name: "AK09918 3-Axis Compass", description: "Ultra-small 3-axis electronic compass for mobile and wearable devices", url: "https://www.akm.com/us/en/products/electronic-compass/" },
      { name: "AK7755 Audio DSP", description: "Low-power audio DSP for far-field voice and ANC applications", url: "https://www.akm.com/us/en/products/dsp/" },
    ],
  },
  {
    company: "VIA Technologies", tier: 1,
    products: [
      { name: "EPIA Pico-ITX Boards", description: "Compact x86 embedded computing platforms for digital signage and kiosks", url: "https://www.via.com.tw/en/products/embedded/boards/" },
      { name: "VIA ARTiGO Embedded Computers", description: "Fan-less embedded computers for industrial IoT applications", url: "https://www.via.com.tw/en/products/embedded/computers/" },
      { name: "VX3000 Chipset", description: "Integrated platform chipsets for industrial embedded computing", url: "https://www.via.com.tw/en/products/chipsets/" },
    ],
  },

  // ==========================================================
  // TIER 2 – FOUNDRIES, IDMs & OSATs
  // ==========================================================

  {
    company: "TSMC", tier: 2,
    products: [
      { name: "N2 (2nm) Process", description: "Leading-edge logic for AI accelerators and flagship mobile SoCs", url: "https://www.tsmc.com/english/dedicatedFoundry/technology/logic/l_N2" },
      { name: "N3 (3nm) Process", description: "High-volume production for Apple A17, Qualcomm Snapdragon 8 Gen 3", url: "https://www.tsmc.com/english/dedicatedFoundry/technology/logic/l_N3" },
      { name: "CoWoS Advanced Packaging", description: "2.5D chiplet packaging joining compute dies with HBM stacks", url: "https://3dfabric.tsmc.com/english/dedicatedFoundry/technology/cowos.htm" },
      { name: "SoIC (System on Integrated Chips)", description: "3D stacking technology for chiplet-to-chiplet integration", url: "https://3dfabric.tsmc.com/english/dedicatedFoundry/technology/soic.htm" },
      { name: "N5 Process", description: "Volume-production 5nm for broad AI and mobile chip production", url: "https://www.tsmc.com/english/dedicatedFoundry/technology/logic/l_N5" },
      { name: "Specialty Technologies (BCD, RFSOI)", description: "Analog and specialty processes for power management and RF", url: "https://www.tsmc.com/english/dedicatedFoundry/technology/specialty" },
    ],
  },
  {
    company: "Intel Foundry", tier: 2,
    products: [
      { name: "Intel 18A Process", description: "Leading-edge node with RibbonFET gate-all-around transistors and PowerVia", url: "https://www.intel.com/content/www/us/en/foundry/process-technology.html" },
      { name: "Intel 3 Process", description: "High-performance node for Intel's own Meteor Lake and Panther Lake CPUs", url: "https://www.intel.com/content/www/us/en/foundry/process-technology.html" },
      { name: "EMIB Advanced Packaging", description: "Embedded Multi-die Interconnect Bridge for 2.5D chiplet integration", url: "https://www.intel.com/content/www/us/en/foundry/packaging.html" },
      { name: "Foveros 3D Stacking", description: "Face-to-face 3D die stacking for disaggregated chip design", url: "https://www.intel.com/content/www/us/en/foundry/packaging.html" },
    ],
  },
  {
    company: "Samsung Foundry", tier: 2,
    products: [
      { name: "SF2 (2nm GAA)", description: "Gate-all-around 2nm process for next-generation flagship chips", url: "https://semiconductor.samsung.com/us/foundry/process-technology/" },
      { name: "SF3 (3nm GAA)", description: "First mass-produced gate-all-around node, used in Samsung Exynos", url: "https://semiconductor.samsung.com/us/foundry/process-technology/" },
      { name: "2.5D I-Cube Packaging", description: "Silicon interposer-based advanced packaging for HPC and AI", url: "https://semiconductor.samsung.com/us/foundry/advanced-packaging/" },
      { name: "HBM3E DRAM", description: "High Bandwidth Memory for AI accelerators and HPC systems", url: "https://semiconductor.samsung.com/us/consumer-storage/hbm/" },
    ],
  },
  {
    company: "SK Hynix", tier: 2,
    products: [
      { name: "HBM3E", description: "High Bandwidth Memory 3E — 1.2 TB/s per stack for AI accelerators", url: "https://www.skhynix.com/products/hbm/hbm3e/" },
      { name: "DDR5 DRAM", description: "High-speed server and PC memory modules up to 7200 MT/s", url: "https://www.skhynix.com/products/main-memory/ddr5/" },
      { name: "LPDDR5X", description: "Ultra-low-power mobile DRAM for flagship smartphones", url: "https://www.skhynix.com/products/main-memory/lpddr5x/" },
      { name: "PCIe 5.0 NVMe Enterprise SSD", description: "High-endurance enterprise SSDs for data center storage", url: "https://www.skhynix.com/products/enterprise-ssd/" },
      { name: "CXL Memory Modules", description: "Compute Express Link memory expansion for AI server memory pools", url: "https://www.skhynix.com/products/cxl/" },
    ],
  },
  {
    company: "Micron Technology", tier: 2,
    products: [
      { name: "HBM3E DRAM", description: "High Bandwidth Memory for AI accelerators — supply to Nvidia H200", url: "https://www.micron.com/products/high-bandwidth-memory" },
      { name: "DDR5 DRAM", description: "Server and PC memory modules for modern platforms", url: "https://www.micron.com/products/dram/ddr5" },
      { name: "LPDDR5X", description: "Low-power mobile DRAM for smartphones and laptops", url: "https://www.micron.com/products/dram/lpddr" },
      { name: "9550 PCIe Gen 5 NVMe SSD", description: "High-performance data center NVMe SSD", url: "https://www.micron.com/products/storage/solid-state-drives/enterprise-ssds" },
      { name: "Automotive DRAM", description: "AEC-Q100 qualified DRAM for ADAS and infotainment", url: "https://www.micron.com/products/automotive" },
    ],
  },
  {
    company: "GlobalFoundries", tier: 2,
    products: [
      { name: "GF 22FDX (22nm FD-SOI)", description: "Fully depleted SOI process for RF, IoT, and automotive chips", url: "https://gf.com/technology-platforms/22fdx/" },
      { name: "GF 45RFSOI", description: "RF SOI process for 5G PA switches and tunable filters", url: "https://gf.com/technology-platforms/45rfsoi/" },
      { name: "GF 12LP+", description: "12nm FinFET process for performance-efficient consumer and automotive chips", url: "https://gf.com/technology-platforms/12lpp/" },
      { name: "Aerospace & Defense PDKs", description: "Radiation-hardened and secure process flows", url: "https://gf.com/markets/aerospace-defense/" },
    ],
  },
  {
    company: "Texas Instruments", tier: 2,
    products: [
      { name: "C2000 Microcontrollers", description: "Real-time MCUs for motor control, solar inverters, and industrial drives", url: "https://www.ti.com/microcontrollers-mcus/arm-based-microcontrollers/c2000-microcontrollers/overview.html" },
      { name: "MSP430 MCUs", description: "Ultra-low-power 16-bit MCUs for sensing and metering", url: "https://www.ti.com/microcontrollers-mcus/msp430-microcontrollers/overview.html" },
      { name: "TMS320 DSP", description: "High-performance digital signal processors for comms and imaging", url: "https://www.ti.com/semiconductors/dsp/digital-signal-processors/overview.html" },
      { name: "TPS6x DC-DC Converters", description: "Miniaturized step-down and boost converters for portable devices", url: "https://www.ti.com/power-management/dc-dc-switching-regulators/overview.html" },
      { name: "StellarEX Automotive MCUs", description: "Automotive functional safety MCUs for zone controllers and ADAS", url: "https://www.ti.com/microcontrollers-mcus/arm-based-microcontrollers/automotive-mcus/overview.html" },
      { name: "LMK Clocking Devices", description: "Ultra-low-jitter clock generators and synchronizers for test and telecom", url: "https://www.ti.com/clock-and-timing/overview.html" },
    ],
  },
  {
    company: "STMicroelectronics", tier: 2,
    products: [
      { name: "STM32 Microcontrollers", description: "ARM Cortex-M0 to M7 MCUs — world's leading 32-bit MCU family", url: "https://www.st.com/en/microcontrollers-microprocessors/stm32-32-bit-arm-cortex-mcus.html" },
      { name: "STM8 Microcontrollers", description: "8-bit MCUs for cost-sensitive and low-power applications", url: "https://www.st.com/en/microcontrollers-microprocessors/stm8-8-bit-mcus.html" },
      { name: "SiC Power Devices (MDmesh)", description: "SiC MOSFETs and diodes for EV chargers and solar inverters", url: "https://www.st.com/en/power-transistors/sic-mosfets.html" },
      { name: "MEMS Sensors (LSM6DSV)", description: "IMU and motion sensors for smartphones, AR/VR, and wearables", url: "https://www.st.com/en/mems-and-sensors.html" },
      { name: "BlueNRG (Bluetooth LE SoC)", description: "Bluetooth Low Energy SoCs and modules for IoT", url: "https://www.st.com/en/wireless-connectivity/bluetooth-ble.html" },
      { name: "L6985 Buck Converters", description: "Synchronous DC-DC converters for industrial and automotive", url: "https://www.st.com/en/power-management/step-down-buck-controllers-and-converters.html" },
    ],
  },
  {
    company: "Infineon Technologies", tier: 2,
    products: [
      { name: "AURIX TC4x Automotive MCU", description: "Safety MCU family for ADAS compute, body control, and functional safety", url: "https://www.infineon.com/cms/en/product/microcontroller/32-bit-tricore-microcontroller/" },
      { name: "CoolSiC MOSFETs", description: "Silicon carbide transistors for EV chargers and industrial drives", url: "https://www.infineon.com/cms/en/product/power/silicon-carbide/" },
      { name: "OptiMOS Power MOSFETs", description: "Low-gate-charge Si MOSFETs for power supplies and motor drive", url: "https://www.infineon.com/cms/en/product/power/mosfet/" },
      { name: "XENSIV Sensors", description: "Pressure, radar (BGT60), and CO2 sensors for automotive and IoT", url: "https://www.infineon.com/cms/en/product/sensor/" },
      { name: "PSoC 6 Wi-Fi BT", description: "Dual-core MCU with integrated Wi-Fi and Bluetooth for IoT", url: "https://www.infineon.com/cms/en/product/microcontroller/32-bit-psoc-arm-cortex-microcontroller/" },
      { name: "OPTIGA TPM Security", description: "Trusted Platform Module for PC and IoT hardware security", url: "https://www.infineon.com/cms/en/product/security-smart-card-solutions/optiga-embedded-security-solutions/optiga-tpm/" },
    ],
  },
  {
    company: "NXP Semiconductors", tier: 2,
    products: [
      { name: "i.MX RT Crossover MCU", description: "High-performance MCU with HMI and ML acceleration for industrial", url: "https://www.nxp.com/products/processors-and-microcontrollers/arm-microcontrollers/i-mx-rt-crossover-mcus:IMX-RT-SERIES" },
      { name: "S32 Automotive Processors", description: "Automotive-grade SoCs for domain and zonal controllers", url: "https://www.nxp.com/products/processors-and-microcontrollers/s32-automotive-platform:S32_HOME" },
      { name: "NCF3340 NFC Controller", description: "Near-field communication controllers for mobile payments and access", url: "https://www.nxp.com/products/wireless-connectivity/nfc:NFC-OVERVIEW" },
      { name: "KEA Automotive MCU", description: "Automotive-qualified Arm Cortex-M0+ MCU for body electronics", url: "https://www.nxp.com/products/processors-and-microcontrollers/s32-automotive-platform/kea-and-ke-mcus:KEA-AND-KE" },
      { name: "Layerscape Networking", description: "Network processors for 5G infrastructure and enterprise routers", url: "https://www.nxp.com/products/processors-and-microcontrollers/arm-processors/layerscape-processors:LAYERSCAPE" },
      { name: "TJA110x CAN FD Transceivers", description: "CAN FD and automotive Ethernet physical layer transceivers", url: "https://www.nxp.com/products/interfaces/can-transceivers:MC-CANTRAN" },
    ],
  },
  {
    company: "Analog Devices", tier: 2,
    products: [
      { name: "AD9174 RF DAC", description: "High-speed digital-to-analog converter for 5G, radar, and software-defined radio", url: "https://www.analog.com/en/products/ad9174.html" },
      { name: "ADIS16IMU", description: "Precision MEMS inertial measurement units for navigation and robotics", url: "https://www.analog.com/en/products/imu.html" },
      { name: "LTC2946 Power Monitor", description: "High-side current and power monitoring ICs", url: "https://www.analog.com/en/products/ltc2946.html" },
      { name: "ADUM Isolators", description: "Digital isolators for motor drives and industrial safety interfaces", url: "https://www.analog.com/en/product-category/isolators.html" },
      { name: "HMC Microwave ICs", description: "GaAs and GaN microwave/mmWave ICs for defense and 5G backhaul", url: "https://www.analog.com/en/product-category/microwave-ics.html" },
      { name: "AD74115H Industrial IO", description: "Universal analog I/O for PLC and DCS field instruments", url: "https://www.analog.com/en/products/ad74115h.html" },
    ],
  },
  {
    company: "Renesas Electronics", tier: 2,
    products: [
      { name: "RA MCU Family", description: "Arm Cortex-M23 to M85 MCUs for IoT security and edge AI", url: "https://www.renesas.com/en/products/microcontrollers-microprocessors/ra-cortex-m-mcus" },
      { name: "RH850 Automotive MCU", description: "Automotive functional-safety MCU for body control and ADAS", url: "https://www.renesas.com/en/products/microcontrollers-microprocessors/rh850-automotive-mcus" },
      { name: "R-Car SoC", description: "Automotive compute SoC for cockpit, ADAS, and central compute", url: "https://www.renesas.com/en/products/microcontrollers-microprocessors/r-car-automotive-system-on-chip-solutions" },
      { name: "DA1469x BLE SoC", description: "Ultra-low-power Bluetooth LE SoC for wearables and IoT", url: "https://www.renesas.com/en/products/wireless-connectivity/bluetooth-low-energy" },
      { name: "ISL Series Power Management", description: "Power ICs for communications and data center infrastructure", url: "https://www.renesas.com/en/products/power-power-management" },
    ],
  },
  {
    company: "Microchip Technology", tier: 2,
    products: [
      { name: "PIC MCUs", description: "8-bit and 32-bit PIC microcontrollers — industry staple since 1975", url: "https://www.microchip.com/en-us/products/microcontrollers-and-microprocessors/pic-mcus" },
      { name: "AVR MCUs", description: "8-bit AVR microcontrollers for embedded and Arduino-class designs", url: "https://www.microchip.com/en-us/products/microcontrollers-and-microprocessors/avr-mcus" },
      { name: "SAM Cortex-M MCUs", description: "Arm Cortex-M series MCUs for industrial, IoT, and automotive", url: "https://www.microchip.com/en-us/products/microcontrollers-and-microprocessors/32-bit-mcus/sam-arm-cortex-m-based" },
      { name: "dsPIC DSC", description: "Digital signal controllers combining DSP and MCU for motor drive", url: "https://www.microchip.com/en-us/products/microcontrollers-and-microprocessors/dspic-dscs" },
      { name: "CAN FD Controllers", description: "Standalone and embedded CAN FD controllers for automotive", url: "https://www.microchip.com/en-us/products/interface/can" },
      { name: "PolarFire FPGA / SoC", description: "Power-efficient mid-range FPGAs with RISC-V SoC option", url: "https://www.microchip.com/en-us/products/fpgas-and-plds/fpgas/polarfire-fpgas" },
    ],
  },
  {
    company: "onsemi", tier: 2,
    products: [
      { name: "NVMFS Automotive MOSFETs", description: "Power MOSFETs for EV battery management and motor drives", url: "https://www.onsemi.com/products/power-conversion/mosfets" },
      { name: "EliteSiC MOSFETs", description: "SiC power transistors for EV charging and industrial drives", url: "https://www.onsemi.com/products/power-conversion/silicon-carbide" },
      { name: "AR0521 CMOS Image Sensor", description: "5MP automotive image sensors for surround-view cameras", url: "https://www.onsemi.com/products/sensors/image-sensors" },
      { name: "NCP3170 DC-DC Converter", description: "High-frequency synchronous buck converters for power supply", url: "https://www.onsemi.com/products/power-management/switching-regulators" },
      { name: "NCEF03 Intelligent Gate Drivers", description: "Isolated and non-isolated gate drivers for SiC and IGBT", url: "https://www.onsemi.com/products/power-conversion/gate-drivers" },
    ],
  },
  {
    company: "Vishay Intertechnology", tier: 2,
    products: [
      { name: "VSIB120 Schottky Diodes", description: "Schottky barrier diodes for reverse polarity protection and ORing", url: "https://www.vishay.com/en/diodes-rectifiers/" },
      { name: "SiC Schottky Diodes", description: "Silicon carbide Schottky diodes for EV and solar inverters", url: "https://www.vishay.com/en/sic-discrete-devices/" },
      { name: "Foil Resistors (Z-foil)", description: "Ultra-precision foil resistors for metrology and audio applications", url: "https://www.vishay.com/en/resistors/" },
      { name: "Inductors and Transformers", description: "Power inductors for DC-DC converters in consumer and automotive", url: "https://www.vishay.com/en/inductors-coils-chokes/" },
      { name: "MOSFET Arrays", description: "Power MOSFET arrays for motor drive H-bridges", url: "https://www.vishay.com/en/mosfets/" },
    ],
  },
  {
    company: "Littelfuse", tier: 2,
    products: [
      { name: "Automotive Blade Fuses", description: "OEM blade fuses for automotive circuits — the global standard", url: "https://www.littelfuse.com/products/automotive.aspx" },
      { name: "PolySwitch PTC Devices", description: "Resettable polymer positive-temperature-coefficient fuses for USB ports", url: "https://www.littelfuse.com/products/circuit-protection/resettable-ptcs.aspx" },
      { name: "SiC MOSFETs", description: "Silicon carbide power transistors for EV and industrial inverters", url: "https://www.littelfuse.com/products/power-semiconductors/silicon-carbide.aspx" },
      { name: "TVS Diodes", description: "Transient voltage suppressors for ESD and lightning protection", url: "https://www.littelfuse.com/products/tvs-diodes.aspx" },
    ],
  },
  {
    company: "Macronix International", tier: 2,
    products: [
      { name: "NOR Flash (MX25L Series)", description: "Serial NOR flash memory for code storage in MCUs and networking", url: "https://www.macronix.com/en-us/products/NOR-Flash/Serial-NOR-Flash/Pages/default.aspx" },
      { name: "NAND Flash", description: "NAND storage devices for industrial and automotive applications", url: "https://www.macronix.com/en-us/products/NAND-Flash/Pages/default.aspx" },
      { name: "ArmorFlash Secure NOR", description: "Authenticated and encrypted flash for secure boot applications", url: "https://www.macronix.com/en-us/products/Secure-Flash/Pages/default.aspx" },
    ],
  },
  {
    company: "Winbond Electronics", tier: 2,
    products: [
      { name: "W25Q SpiFlash", description: "The most widely used serial NOR flash — present in billions of devices", url: "https://www.winbond.com/hq/product/code-storage-flash-memory/serial-nor-flash/" },
      { name: "HyperRAM / PSRAM", description: "High-speed pseudo-SRAM for display frame buffers and ML inference", url: "https://www.winbond.com/hq/product/memories/psram/" },
      { name: "Secure Flash", description: "Encrypted NOR flash with hardware root-of-trust for IoT security", url: "https://www.winbond.com/hq/product/code-storage-flash-memory/secure-flash/" },
    ],
  },
  {
    company: "Yangtze Memory Technologies", tier: 2,
    products: [
      { name: "Xtacking 3.0 NAND", description: "232-layer 3D NAND with peripheral circuits bonded above cell array", url: "https://www.ymtc.com/en/product-series/" },
      { name: "X3-9070 Consumer SSD", description: "Consumer NVMe SSD targeting value PC market", url: "https://www.ymtc.com/en/product-series/" },
    ],
  },
  {
    company: "Kioxia", tier: 2,
    products: [
      { name: "BiCS Flash (3D NAND)", description: "Kioxia's proprietary 3D flash cell — used in SSDs and flash cards", url: "https://www.kioxia.com/en-us/business/memories/flash-memories.html" },
      { name: "CD8P Enterprise NVMe SSD", description: "PCIe 5.0 NVMe enterprise SSD for read-intensive data center workloads", url: "https://www.kioxia.com/en-us/business/ssd/enterprise-ssd.html" },
      { name: "eMMC / UFS", description: "Embedded storage for smartphones and automotive infotainment", url: "https://www.kioxia.com/en-us/business/memories/embedded-memories.html" },
    ],
  },
  {
    company: "ASE Group", tier: 2,
    products: [
      { name: "Fan-Out Wafer-Level Packaging", description: "Ultra-compact packaging for mobile SoCs and IoT chips", url: "https://www.aseglobal.com/en/technology/advanced-packaging/" },
      { name: "System-in-Package (SiP)", description: "Multi-component integration in a single package for wearables", url: "https://www.aseglobal.com/en/technology/advanced-packaging/" },
      { name: "Flip-Chip BGA", description: "Ball grid array packaging for high-performance processors", url: "https://www.aseglobal.com/en/technology/packaging-technologies/" },
      { name: "Test Services", description: "Final test and burn-in services for ICs and modules", url: "https://www.aseglobal.com/en/technology/testing/" },
    ],
  },
  {
    company: "Amkor Technology", tier: 2,
    products: [
      { name: "SWIFT (Fan-Out) Packaging", description: "Silicon Wafer Integrated Fan-out Technology for mobile SoCs", url: "https://www.amkor.com/services/advanced-packaging/swift-silicon-wafer-integrated-fan-out-technology/" },
      { name: "High-Bandwidth Packaging (SLIM)", description: "Silicon-Less Interconnect Module for AI accelerator packaging", url: "https://www.amkor.com/services/advanced-packaging/slim/" },
      { name: "Auto Grade FC-BGA", description: "Automotive-grade flip-chip BGA for ADAS and electrification", url: "https://www.amkor.com/markets/automotive/" },
    ],
  },
  {
    company: "Fuji Electric", tier: 2,
    products: [
      { name: "SBD / IGBT Modules", description: "Power modules for industrial motor drives and inverters", url: "https://www.fujielectric.com/products/semiconductor/model/power_module/" },
      { name: "SiC Power Devices", description: "SiC SBDs and MOSFETs for EV powertrain and renewable energy", url: "https://www.fujielectric.com/products/semiconductor/model/sic/" },
      { name: "2MBI Series IPM", description: "Intelligent Power Modules for air conditioning and industrial drives", url: "https://www.fujielectric.com/products/semiconductor/model/power_module/ipm/" },
    ],
  },
  {
    company: "Rohm Semiconductor", tier: 2,
    products: [
      { name: "SiC Power Devices (SCT Series)", description: "SiC MOSFETs and diodes for EV charging and renewable energy", url: "https://www.rohm.com/products/sic-power-devices" },
      { name: "Automotive ICs", description: "AEC-Q100 power management and gate driver ICs for vehicles", url: "https://www.rohm.com/products/automotive" },
      { name: "LED Drivers", description: "Constant-current LED drivers for automotive lighting", url: "https://www.rohm.com/products/power-management/led-drivers" },
      { name: "Motor Driver ICs", description: "Integrated motor driver ICs for printers, robots, and appliances", url: "https://www.rohm.com/products/motor-drivers" },
    ],
  },

  // ==========================================================
  // TIER 3 – SEMICONDUCTOR MANUFACTURING EQUIPMENT
  // ==========================================================

  {
    company: "ASML", tier: 3,
    products: [
      { name: "EXE:5200 (High-NA EUV)", description: "0.55 NA extreme ultraviolet scanner for sub-2nm lithography", url: "https://www.asml.com/en/products/euv-lithography-systems" },
      { name: "NXE:3800E (EUV)", description: "0.33 NA EUV scanner — workhorse of 5nm/3nm/2nm production", url: "https://www.asml.com/en/products/euv-lithography-systems" },
      { name: "TWINSCAN NXT:2100i (DUV)", description: "193nm immersion DUV scanner for mature node production", url: "https://www.asml.com/en/products/duv-lithography-systems" },
      { name: "YieldStar Metrology", description: "Overlay and focus metrology for process control between exposure steps", url: "https://www.asml.com/en/products/metrology-and-inspection" },
      { name: "HMI eScan Electron Beam Inspection", description: "E-beam defect inspection for detecting nanometer-scale wafer defects", url: "https://www.asml.com/en/products/metrology-and-inspection" },
    ],
  },
  {
    company: "Applied Materials", tier: 3,
    products: [
      { name: "Centura Etch Systems", description: "Dry plasma etch systems for precision material removal at leading edge", url: "https://www.appliedmaterials.com/us/en/semiconductor/products/etch.html" },
      { name: "Producer CVD / ALD", description: "Chemical vapor deposition and atomic layer deposition systems", url: "https://www.appliedmaterials.com/us/en/semiconductor/products/cvd.html" },
      { name: "Mirra CMP System", description: "Chemical mechanical planarization for wafer surface polishing", url: "https://www.appliedmaterials.com/us/en/semiconductor/products/cmp.html" },
      { name: "Vantage Radiance Plus RTP", description: "Rapid thermal processing for annealing and oxidation steps", url: "https://www.appliedmaterials.com/us/en/semiconductor/products/thermal.html" },
      { name: "PVD (Physical Vapor Deposition)", description: "Endura PVD for metal barrier, seed, and interconnect deposition", url: "https://www.appliedmaterials.com/us/en/semiconductor/products/pvd.html" },
      { name: "Actis Plus Ion Implant", description: "High-current ion implantation for source/drain doping", url: "https://www.appliedmaterials.com/us/en/semiconductor/products/ion-implant.html" },
    ],
  },
  {
    company: "Lam Research", tier: 3,
    products: [
      { name: "Kiyo Etch System", description: "Conductor and dielectric etch for FinFET and gate-all-around patterning", url: "https://www.lamresearch.com/products/conductor-etch/" },
      { name: "Altus CVD/ALD", description: "Tungsten and molybdenum CVD for contact and gate fill", url: "https://www.lamresearch.com/products/cvd-ald/" },
      { name: "Sabre Electroplating", description: "Copper electroplating systems for interconnect metallization", url: "https://www.lamresearch.com/products/electrochemical-deposition/" },
      { name: "Sola UV Cure", description: "UV-cure processing for low-k dielectric strengthening", url: "https://www.lamresearch.com/products/uv-cure/" },
      { name: "Syndion Etch (DRAM / 3D NAND)", description: "Deep silicon etch for high aspect-ratio 3D NAND hole etching", url: "https://www.lamresearch.com/products/high-aspect-ratio-etch/" },
      { name: "Reliant Legacy Systems", description: "Maintenance and support for mature node etch and deposition tools", url: "https://www.lamresearch.com/products/reliant/" },
    ],
  },
  {
    company: "Tokyo Electron", tier: 3,
    products: [
      { name: "CLEAN TRACK Lithius Pro Z", description: "Coat/develop track — applies photoresist and develops after EUV exposure", url: "https://www.tel.com/product/semiconductor/coating/" },
      { name: "TACTRAS ALD / CVD", description: "Atomic layer deposition for high-k gate dielectrics", url: "https://www.tel.com/product/semiconductor/deposition/" },
      { name: "Triassic PSP Etch", description: "Plasma etch system for conductor patterning", url: "https://www.tel.com/product/semiconductor/etching/" },
      { name: "Oceans W-CMP", description: "Wet cleaning systems for post-CMP and post-etch particle removal", url: "https://www.tel.com/product/semiconductor/cleaning/" },
      { name: "ELTRAN Epitaxial", description: "Epitaxial silicon deposition for advanced logic substrates", url: "https://www.tel.com/product/semiconductor/" },
    ],
  },
  {
    company: "KLA Corporation", tier: 3,
    products: [
      { name: "Surfscan SP7XP (Unpatterned Inspection)", description: "Wafer surface inspection for particle and haze detection on blank wafers", url: "https://www.kla.com/products/wafer-inspection/surfscan-sp7xp" },
      { name: "29xx Series Patterned Wafer Inspection", description: "Optical inspection for finding defects on patterned wafers at EUV nodes", url: "https://www.kla.com/products/wafer-inspection/29xx-series" },
      { name: "eDR-7xxx Electron Beam Review", description: "E-beam review for classifying defects found by optical inspection tools", url: "https://www.kla.com/products/wafer-inspection/edr-7xxx" },
      { name: "Archer AIM Overlay Metrology", description: "Optical overlay measurement for alignment accuracy between exposure layers", url: "https://www.kla.com/products/metrology/archer-aim" },
      { name: "Zeta Reticle Inspection", description: "Actinic EUV reticle inspection — checks the mask used for EUV exposure", url: "https://www.kla.com/products/reticle-inspection" },
    ],
  },
  {
    company: "Screen Holdings", tier: 3,
    products: [
      { name: "SU-3300 Single Wafer Clean", description: "Spin clean system for post-CMP and post-etch wafer cleaning", url: "https://www.screen.co.jp/sse/en/products/single_process/cleaning/su3300/" },
      { name: "SK-3500 Spin Processor", description: "Photoresist coat and develop processor for advanced nodes", url: "https://www.screen.co.jp/sse/en/products/single_process/litho/" },
      { name: "DW-3000 Batch Wet Station", description: "Multi-tank batch wet cleaning system for silicon surface preparation", url: "https://www.screen.co.jp/sse/en/products/batch/cleaning/" },
      { name: "HT-3300 Thermal Processing", description: "Rapid thermal anneal and oxidation for gate dielectric formation", url: "https://www.screen.co.jp/sse/en/products/single_process/thermal/" },
    ],
  },
  {
    company: "Nikon Corporation", tier: 3,
    products: [
      { name: "NSR-S635E (DUV Immersion)", description: "ArF immersion scanner for 10nm–65nm node manufacturing", url: "https://www.nikon.com/en/business/lithography/products/duv/" },
      { name: "NSR-S322F (DUV Dry)", description: "ArF dry scanner for mature node digital and analog chips", url: "https://www.nikon.com/en/business/lithography/products/duv/" },
      { name: "NS Series Die Bonder", description: "Precision flip-chip die bonders for advanced packaging", url: "https://www.nikon.com/en/business/lithography/" },
    ],
  },
  {
    company: "Hitachi High-Tech", tier: 3,
    products: [
      { name: "CD-SEM CG7000", description: "Critical dimension scanning electron microscope for CD measurement at 3nm", url: "https://www.hitachi-hightech.com/en/products/device/semiconductor/cdsem.html" },
      { name: "Defect Review SEM (RS-2000)", description: "E-beam defect review system for root cause analysis", url: "https://www.hitachi-hightech.com/en/products/device/semiconductor/" },
      { name: "Ion Milling System (E-3500)", description: "Ion beam cross-section preparation for TEM sample preparation", url: "https://www.hitachi-hightech.com/en/products/device/semiconductor/" },
    ],
  },
  {
    company: "Advantest", tier: 3,
    products: [
      { name: "T2000 Memory Test System", description: "High-speed DRAM and NAND flash test system for volume production", url: "https://www.advantest.com/products/semiconductor-test-equipment/memory-test-systems" },
      { name: "V93000 SoC Test System", description: "Flagship SoC test system for digital, analog, RF, and power testing", url: "https://www.advantest.com/products/semiconductor-test-equipment/soc-test-systems/v93000" },
      { name: "T6391 RF Test System", description: "RF and millimeter-wave test system for 5G transceivers", url: "https://www.advantest.com/products/semiconductor-test-equipment" },
    ],
  },
  {
    company: "Teradyne", tier: 3,
    products: [
      { name: "UltraFLEX SoC Tester", description: "High-pin-count SoC tester for application processors and modems", url: "https://www.teradyne.com/ultraflex-soc-tester/" },
      { name: "J750 Digital IC Tester", description: "Flexible digital IC test system for high-volume mid-range chips", url: "https://www.teradyne.com/j750/" },
      { name: "Lemsys Power IC Test", description: "Power semiconductor test system for GaN and SiC devices", url: "https://www.teradyne.com/power-ic/" },
      { name: "Eagle Test (Analog)", description: "Analog/mixed-signal parametric test for power management ICs", url: "https://www.teradyne.com/eagle/" },
    ],
  },
  {
    company: "Disco Corporation", tier: 3,
    products: [
      { name: "DFD Dicing Saws", description: "Diamond blade dicing saws for singulating chips from wafers", url: "https://www.disco.co.jp/eg/products/" },
      { name: "DFL Laser Saws", description: "Laser dicing for thin and fragile wafer singulation", url: "https://www.disco.co.jp/eg/products/" },
      { name: "DGP Grinders", description: "Backside wafer grinders for thinning wafers before packaging", url: "https://www.disco.co.jp/eg/products/" },
      { name: "DLE Laser Markers", description: "Laser marking systems for wafer and chip identification", url: "https://www.disco.co.jp/eg/products/" },
    ],
  },
  {
    company: "Aixtron SE", tier: 3,
    products: [
      { name: "AIX G5+ C MOCVD", description: "Metal-organic CVD reactor for GaN epitaxial growth on 6\" wafers", url: "https://www.aixtron.com/en/products/mocvd/" },
      { name: "AIX R6 MOCVD", description: "R&D and small-volume MOCVD for compound semiconductor research", url: "https://www.aixtron.com/en/products/mocvd/" },
      { name: "APCVD Systems", description: "Atmospheric pressure CVD for SiC epitaxy", url: "https://www.aixtron.com/en/products/cvd/" },
      { name: "Planetary Reactors", description: "High-throughput multi-wafer MOCVD for LED manufacturing", url: "https://www.aixtron.com/en/products/mocvd/" },
    ],
  },
  {
    company: "Oxford Instruments", tier: 3,
    products: [
      { name: "Plasma Pro 100 Cobra ICP", description: "Inductively coupled plasma etch for III-V devices and MEMS", url: "https://www.oxinst.com/products/etching-deposition-growth/plasma-etching/" },
      { name: "NanoFab ALD / CVD", description: "Atomic layer deposition tools for research and small-volume production", url: "https://www.oxinst.com/products/etching-deposition-growth/ald-cvd/" },
      { name: "Ion Beam Etch (Ionfab)", description: "Ion beam etch for precision patterning of optical and MEMS devices", url: "https://www.oxinst.com/products/etching-deposition-growth/ion-beam-etch-deposit/" },
    ],
  },
  {
    company: "FormFactor", tier: 3,
    products: [
      { name: "Pyramid Probe Cards", description: "Cantilever probe cards for parametric wafer test in volume production", url: "https://www.formfactor.com/products/probe-cards/" },
      { name: "Memi System", description: "Automated wafer metrology and inspection system", url: "https://www.formfactor.com/products/semi-automated-probers/" },
      { name: "Cascade Summit Probe Station", description: "Engineering probe station for device characterization at DC to mmWave", url: "https://www.formfactor.com/products/probe-stations/" },
    ],
  },
  {
    company: "Bruker Corporation", tier: 3,
    products: [
      { name: "Dimension Icon AFM", description: "Atomic force microscope for nanometer-scale surface characterization", url: "https://www.bruker.com/en/products-and-solutions/materials/dimension-icon.html" },
      { name: "Qemscan EVO SEM/EDX", description: "SEM with energy-dispersive X-ray for materials analysis", url: "https://www.bruker.com/en/products-and-solutions/materials/scanning-electron-microscopy-edx.html" },
      { name: "X-Ray Diffraction (D8 Advance)", description: "XRD for thin-film and crystal structure characterization", url: "https://www.bruker.com/en/products-and-solutions/diffractometers/x-ray-diffractometers.html" },
    ],
  },

  // ==========================================================
  // TIER 4 – EQUIPMENT SUBSYSTEMS & MODULES
  // ==========================================================

  {
    company: "Carl Zeiss SMT", tier: 4,
    products: [
      { name: "EUV Projection Optics", description: "Precision multilayer-coated mirrors for ASML EUV scanners", url: "https://www.zeiss.com/semiconductor-manufacturing-technology/inspiring-technology/euv-lithography.html" },
      { name: "High-NA EUV Optics", description: "0.55 NA anamorphic projection optics for ASML EXE:5200 scanners", url: "https://www.zeiss.com/semiconductor-manufacturing-technology/inspiring-technology/high-na-euv-lithography.html" },
      { name: "DUV Optical Elements", description: "Lens elements and illumination modules for ASML DUV TWINSCAN scanners", url: "https://www.zeiss.com/semiconductor-manufacturing-technology/products/optics-for-wafer-lithography.html" },
      { name: "Wafer Inspection Optics", description: "High-NA objective lenses for brightfield and darkfield wafer inspection systems", url: "https://www.zeiss.com/semiconductor-manufacturing-technology/products/inspection-optics.html" },
    ],
  },
  {
    company: "TRUMPF", tier: 4,
    products: [
      { name: "TruDisk CO2 Laser", description: "High-power CO2 laser — fires the main pulse that vaporizes tin droplets in ASML EUV sources", url: "https://www.trumpf.com/en_INT/products/lasers/disk-lasers/" },
      { name: "TruMicro Ultrashort Pulse", description: "Ultrashort-pulse laser for precision semiconductor processing and scribing", url: "https://www.trumpf.com/en_INT/products/lasers/short-and-ultrashort-pulse-lasers/" },
      { name: "EUV Pre-Pulse Laser", description: "Pre-pulse CO2 laser for flattening tin droplets before main EUV generation pulse", url: "https://www.trumpf.com/en_INT/applications/semiconductor-manufacturing/" },
      { name: "VCSEL Arrays", description: "High-power VCSEL arrays for LiDAR and optical sensing", url: "https://www.trumpf.com/en_INT/products/electronics/vcsels/" },
    ],
  },
  {
    company: "MKS Instruments", tier: 4,
    products: [
      { name: "Granville-Phillips Vacuum Gauges", description: "Ionization and Pirani gauges for measuring ultra-high vacuum levels in process chambers", url: "https://www.mks.com/c/vacuum-measurement" },
      { name: "Astron RF Power Generators", description: "13.56 MHz and 2 MHz RF power supplies for plasma etch and CVD chambers", url: "https://www.mks.com/c/rf-power" },
      { name: "Baratron Capacitance Manometers", description: "Precision pressure transducers for process chamber pressure monitoring", url: "https://www.mks.com/c/pressure" },
      { name: "Mass Flow Controllers (MFC)", description: "Gas flow controllers for precision delivery of etch and deposition gases", url: "https://www.mks.com/c/gas-flow" },
      { name: "Surftrac Impedance Matching", description: "Automatic RF impedance matching networks for plasma tools", url: "https://www.mks.com/c/rf-matching" },
    ],
  },
  {
    company: "Advanced Energy", tier: 4,
    products: [
      { name: "Pinnacle RF Generators", description: "High-frequency RF generators for capacitively coupled plasma etch", url: "https://www.advancedenergy.com/en/products/power-control/rf-power/" },
      { name: "Versatile Power DC Systems", description: "DC power supplies for PVD sputtering and ion beam applications", url: "https://www.advancedenergy.com/en/products/power-control/dc-power/" },
      { name: "Trek Electrostatic Chucks", description: "Voltage amplifiers and controllers for electrostatic wafer clamping", url: "https://www.advancedenergy.com/en/products/power-control/high-voltage/" },
      { name: "Thyro Solid-State Power Controllers", description: "Solid-state thyristor power controllers for thermal process heaters", url: "https://www.advancedenergy.com/en/products/power-control/thyristor-power-controllers/" },
    ],
  },
  {
    company: "Entegris", tier: 4,
    products: [
      { name: "Ultrapure HDPE Chemical Storage", description: "Ultra-clean chemical containers for HF, H2SO4, and photoresist chemistry", url: "https://www.entegris.com/en/home/products/liquid-microelectronics/containers.html" },
      { name: "300mm FOUP", description: "Front Opening Unified Pods for wafer handling between process tools", url: "https://www.entegris.com/en/home/products/wafer-handling/foups.html" },
      { name: "Poco EDM Graphite", description: "Ultra-pure isostatic graphite for ion implant and CVD components", url: "https://www.entegris.com/en/home/products/materials/graphite.html" },
      { name: "PlanarTech CMP Pads", description: "Polishing pads for chemical mechanical planarization of metal and oxide layers", url: "https://www.entegris.com/en/home/products/cmp/cmp-pads.html" },
      { name: "Gas Purifiers", description: "Point-of-use purifiers removing trace contaminants from process gases", url: "https://www.entegris.com/en/home/products/gas/gas-purifiers.html" },
    ],
  },
  {
    company: "Coherent", tier: 4,
    products: [
      { name: "Nd:YAG Laser Systems", description: "Pulsed and CW Nd:YAG lasers for wafer scribing and trimming", url: "https://www.coherent.com/lasers/diode-pumped-solid-state" },
      { name: "Excimer Lasers (KrF / ArF)", description: "KrF 248nm and ArF 193nm excimer laser sources for lithography", url: "https://www.coherent.com/lasers/excimer" },
      { name: "Fiber Laser Systems", description: "High-power fiber lasers for cutting, marking, and via drilling", url: "https://www.coherent.com/lasers/fiber-lasers" },
      { name: "Optical Components & Crystals", description: "NLO crystals, polarizers, and beam-shaping optics for laser systems", url: "https://www.coherent.com/optics-components" },
      { name: "II-VI SiC Substrates", description: "Semi-insulating SiC substrates for GaN RF device epitaxy", url: "https://www.coherent.com/materials/sic-substrates" },
    ],
  },
  {
    company: "VAT Vacuum Valves", tier: 4,
    products: [
      { name: "Gate Valves (Series 01 / 02)", description: "Ultra-high vacuum gate valves for isolating process chambers", url: "https://www.vatvalve.com/en/products/vacuum-valves/gate-valves" },
      { name: "Pendulum Control Valves", description: "Variable-conductance pendulum valves for pressure control in etch/CVD", url: "https://www.vatvalve.com/en/products/vacuum-valves/pendulum-control-valves" },
      { name: "Slit Valves (Series 10)", description: "High-cycle-life slit valves for wafer transfer in load-lock systems", url: "https://www.vatvalve.com/en/products/vacuum-valves/slit-valves" },
      { name: "Butterfly Valves", description: "Isolation butterfly valves for foreline and roughing pump isolation", url: "https://www.vatvalve.com/en/products/vacuum-valves/butterfly-valves" },
    ],
  },
  {
    company: "Edwards Vacuum", tier: 4,
    products: [
      { name: "iXH Dry Screw Pumps", description: "Dry screw vacuum pumps for corrosive process gases in etch and CVD", url: "https://www.edwardsvacuum.com/en/products/dry-pumps" },
      { name: "STP-iXA Turbomolecular Pumps", description: "High-throughput turbo pumps for achieving high vacuum in process chambers", url: "https://www.edwardsvacuum.com/en/products/turbomolecular-pumps" },
      { name: "Neon Recovery Systems", description: "Neon gas recovery and recycling for EUV laser sources", url: "https://www.edwardsvacuum.com/en/products/abatement" },
      { name: "iQMD Exhaust Abatement", description: "Burn/wet process exhaust treatment for safely disposing of silane and PFCs", url: "https://www.edwardsvacuum.com/en/products/abatement" },
    ],
  },
  {
    company: "Pfeiffer Vacuum", tier: 4,
    products: [
      { name: "HiPace Turbomolecular Pumps", description: "High-performance turbo pumps for ultra-high vacuum applications", url: "https://www.pfeiffer-vacuum.com/en/products/turbomolecular-pumps/" },
      { name: "Duo Rotary Vane Pumps", description: "Rotary vane rough pumps for fore-vacuum in turbo pump backing", url: "https://www.pfeiffer-vacuum.com/en/products/backing-pumps/" },
      { name: "PKR / PBR Compact Full Range Gauges", description: "Combined Pirani/Cold Cathode gauges for wide-range vacuum measurement", url: "https://www.pfeiffer-vacuum.com/en/products/vacuum-measurement/" },
      { name: "Mass Spectrometers (Omnistar)", description: "Quadrupole mass spectrometers for residual gas analysis in vacuum systems", url: "https://www.pfeiffer-vacuum.com/en/products/gas-analysis-and-measurement/" },
    ],
  },
  {
    company: "Lumentum Holdings", tier: 4,
    products: [
      { name: "Chip-on-Submount (COS) Laser", description: "High-power single-emitter pump lasers for fiber laser manufacturing", url: "https://www.lumentum.com/en/products/telecommunications/lasers/" },
      { name: "VCSEL Arrays (3D Sensing)", description: "850nm and 940nm VCSEL arrays for iPhone Face ID and ToF sensors", url: "https://www.lumentum.com/en/products/datacom/vcsels/" },
      { name: "Coherent Optical Transceivers", description: "400G–800G CFP2/QSFP-DD coherent pluggables for data center interconnect", url: "https://www.lumentum.com/en/products/datacom/transceivers/" },
      { name: "WSS (Wavelength Selective Switch)", description: "Reconfigurable ROADM components for optical networking", url: "https://www.lumentum.com/en/products/telecommunications/optical-transport-networking/" },
    ],
  },
  {
    company: "Hamamatsu Photonics", tier: 4,
    products: [
      { name: "InGaAs PIN Photodiodes", description: "Near-infrared photodetectors for optical fiber receiver modules", url: "https://www.hamamatsu.com/us/en/product/optical-sensors/photodiodes/ingaas-pin-photodiode.html" },
      { name: "PMT (Photomultiplier Tubes)", description: "Ultra-sensitive photomultiplier tubes for fluorescence microscopy and PET", url: "https://www.hamamatsu.com/us/en/product/optical-sensors/pmt.html" },
      { name: "Silicon APD Arrays", description: "Avalanche photodiode arrays for LiDAR distance measurement", url: "https://www.hamamatsu.com/us/en/product/optical-sensors/apd.html" },
      { name: "Xe Flash Lamps", description: "Xenon flash lamps used as the light source in photolithography mask aligners", url: "https://www.hamamatsu.com/us/en/product/light-sources/xenon-flash-lamp.html" },
      { name: "EUV Sensors", description: "EUV light sensors for monitoring exposure dose in ASML scanners", url: "https://www.hamamatsu.com/us/en/product/optical-sensors/euv-sensors.html" },
    ],
  },
  {
    company: "Ebara Corporation", tier: 4,
    products: [
      { name: "EV Series Dry Vacuum Pumps", description: "Dry screw pumps for CVD and etch process chamber exhaust", url: "https://www.ebara.com/en/products/vacuum/pumps.html" },
      { name: "Turbo Molecular Pumps", description: "High-speed turbo pumps for ultra-high vacuum in implant and PVD tools", url: "https://www.ebara.com/en/products/vacuum/turbo.html" },
      { name: "CMP Slurry Delivery", description: "Ultra-pure slurry supply systems for chemical mechanical polishing tools", url: "https://www.ebara.com/en/products/semiconductor/cmp.html" },
    ],
  },
  {
    company: "Keyence Corporation", tier: 4,
    products: [
      { name: "IM-8000 Image Dimension System", description: "Fully automatic in-line optical CMM for part measurement without fixturing", url: "https://www.keyence.com/products/measure/vision-measuring/im-8000/" },
      { name: "LK-G Series Laser Displacement", description: "High-speed laser displacement sensors for precision positioning feedback", url: "https://www.keyence.com/products/measure/laser-1d/lk-g/" },
      { name: "VR-6000 3D Optical Profilometer", description: "Contactless 3D surface profiler for roughness and step-height measurement", url: "https://www.keyence.com/products/measure/surface/vr-6000/" },
      { name: "SR-2000W Barcode Reader", description: "Fixed-mount 2D code readers for wafer and carrier tracking in fabs", url: "https://www.keyence.com/products/code/code-readers/sr-2000/" },
    ],
  },

  // ==========================================================
  // TIER 5 – PRECISION COMPONENTS & OPTO-MECHATRONICS
  // ==========================================================

  {
    company: "Corning Inc.", tier: 5,
    products: [
      { name: "EAGLE XG Display Glass", description: "Ultra-thin alumino-borosilicate glass substrate for LCD and OLED displays", url: "https://www.corning.com/displaytechnologies/en/products.html" },
      { name: "Gorilla Glass", description: "Chemically strengthened cover glass for smartphone screens", url: "https://www.corning.com/gorillaglass/worldwide/en.html" },
      { name: "Valor Glass (Pharmaceutical)", description: "Borosilicate glass tubing for pharmaceutical vials — delamination resistant", url: "https://www.corning.com/valor-glass/worldwide/en/home.html" },
      { name: "Ceramic Substrates (Corning DXF)", description: "High-purity ceramic substrates for semiconductor packaging", url: "https://www.corning.com/worldwide/en/products/advanced-optics/products.html" },
      { name: "Optical Fiber (SMF-28 Ultra)", description: "Single-mode fiber for telecom and data center networks", url: "https://www.corning.com/optical-communications/worldwide/en/home/products.html" },
    ],
  },
  {
    company: "Hoya Corporation", tier: 5,
    products: [
      { name: "EUV Photomask Blanks", description: "Ultra-flat low-thermal-expansion mask blanks for EUV lithography", url: "https://www.hoya.co.jp/en/products/eleops/index.html" },
      { name: "ArF Photomask Blanks", description: "Quartz mask blanks for ArF immersion lithography", url: "https://www.hoya.co.jp/en/products/eleops/index.html" },
      { name: "Optical Glass (FC, FCD)", description: "Proprietary optical glass compositions for camera and scientific lenses", url: "https://www.hoya.com/en/products/optical_glass/optical_glass/index.html" },
      { name: "Optical Thin Film Coatings", description: "AR, HR, and bandpass coatings for semiconductor optics", url: "https://www.hoya-optronics.com/en/products/" },
    ],
  },
  {
    company: "Renishaw", tier: 5,
    products: [
      { name: "ATOM DX Linear Encoder", description: "Miniature optical linear encoder for sub-nanometer position readback in lithography stages", url: "https://www.renishaw.com/en/atom-dex--45455" },
      { name: "FORTiS Absolute Encoder", description: "Absolute optical encoder for direct-drive stages in semiconductor handling", url: "https://www.renishaw.com/en/fortis--33610" },
      { name: "Raman InVia Microscope", description: "Confocal Raman microscope for stress and strain mapping in silicon wafers", url: "https://www.renishaw.com/en/invia-raman-microscopes--6260" },
      { name: "RESOLUTE Angle Encoder", description: "Ultra-high-accuracy rotary angle encoder for precision spindle metrology", url: "https://www.renishaw.com/en/resolute-absolute-optical-encoder--17338" },
    ],
  },
  {
    company: "Kyocera Corporation", tier: 5,
    products: [
      { name: "Ceramic Packages", description: "Co-fired alumina and LTCC packages for RF and optical semiconductor devices", url: "https://kyocera.us/products/semiconductor-components/ceramic-packages/" },
      { name: "Cutting Tools (KC Series)", description: "PVD-coated carbide inserts for precision machining of semiconductor tooling", url: "https://www.kyocera.com/products/industrial-tools/" },
      { name: "Fine Ceramic Components", description: "Alumina and silicon nitride components for wafer handling end-effectors", url: "https://global.kyocera.com/fcworld/" },
      { name: "Industrial Lenses", description: "Fixed-focus and zoom lenses for machine vision systems in wafer inspection", url: "https://www.kyocera.com/products/optics/" },
    ],
  },
  {
    company: "Amphenol Corporation", tier: 5,
    products: [
      { name: "DuraClik Connectors", description: "Board-to-board connectors for compact consumer electronic assemblies", url: "https://www.amphenol.com/products/connectors" },
      { name: "HDAS High-Density Array", description: "High-density array connectors for server backplanes", url: "https://www.amphenol-cs.com/products.html" },
      { name: "SV Microwave RF Connectors", description: "Precision SMA/SSMA microwave connectors for test and defense", url: "https://www.sv-microwave.com/" },
      { name: "FCI Backplane Systems", description: "High-speed card-edge backplane connectors for data center infrastructure", url: "https://www.amphenol-cs.com/products.html" },
    ],
  },
  {
    company: "TE Connectivity", tier: 5,
    products: [
      { name: "STRADA Whisper HD Connector", description: "High-density connector delivering 56 Gbps per lane for data center", url: "https://www.te.com/en/products/connectors/backplane-connectors.html" },
      { name: "HV-100 Automotive HV Connectors", description: "High-voltage connectors for EV battery packs and charging systems", url: "https://www.te.com/en/industries/automotive.html" },
      { name: "Corcom EMI Filters", description: "Power line EMI filters for industrial and medical equipment", url: "https://www.te.com/en/products/filters.html" },
      { name: "MEAS Sensors", description: "Pressure and temperature sensors for industrial and medical applications", url: "https://www.te.com/en/products/sensors.html" },
    ],
  },
  {
    company: "Schaeffler Group", tier: 5,
    products: [
      { name: "FAG Precision Spindle Bearings", description: "High-precision angular contact ball bearings for wafer-handling robot arms", url: "https://www.schaeffler.com/en/products-services/technical-information/spindle-bearings/" },
      { name: "INA Linear Recirculating Guides", description: "Linear ball rail guides for precision wafer stage linear motion", url: "https://www.schaeffler.com/en/products-services/technical-information/linear-guidance-systems/" },
      { name: "LuK Clutch Systems", description: "Industrial clutch systems for precision torque transmission", url: "https://www.schaeffler.com/en/products-services/industrial/" },
    ],
  },
  {
    company: "Materion", tier: 5,
    products: [
      { name: "Beryllium Copper Strip", description: "High-conductivity, high-strength copper alloy for precision springs and connectors", url: "https://www.materion.com/products/performance-alloys-and-composites/beryllium-copper" },
      { name: "AlBeMet (Al-Be Metal Matrix)", description: "Lightweight Al-Be composite for precision mirrors and aerospace structures", url: "https://www.materion.com/products/precision-optics/albemet" },
      { name: "Sputtering Targets", description: "High-purity metal and compound targets for PVD thin-film deposition", url: "https://www.materion.com/products/thin-film-deposition-materials/sputtering-targets" },
    ],
  },
  {
    company: "Hirose Electric", tier: 5,
    products: [
      { name: "FPC Connectors (ZH / ZD Series)", description: "Ultra-miniature FPC connectors for smartphone cameras and displays", url: "https://www.hirose.com/product/en/" },
      { name: "DF Series Board-to-Board", description: "Board-to-board connectors for stacked PCB assemblies in compact devices", url: "https://www.hirose.com/product/en/" },
      { name: "Coaxial Connectors (U.FL)", description: "Miniature coaxial connectors used for antenna connections in phones and IoT modules", url: "https://www.hirose.com/product/en/" },
    ],
  },
  {
    company: "Furukawa Electric", tier: 5,
    products: [
      { name: "Optical Fiber (FutureGuide)", description: "Single-mode and multi-mode optical fiber for telecoms", url: "https://www.furukawa.co.jp/en/solution/optical/" },
      { name: "Electric Wire and Cable", description: "Automotive wire harnesses and high-voltage EV cables", url: "https://www.furukawa.co.jp/en/solution/automotive/" },
      { name: "Copper Alloy Strips", description: "High-performance copper alloy flat-rolled products for connectors and lead frames", url: "https://www.furukawa.co.jp/en/solution/copper/" },
    ],
  },
  {
    company: "Sumitomo Electric Industries", tier: 5,
    products: [
      { name: "Diamond Cutting Tools", description: "Polycrystalline diamond (PCD) and CBN tools for precision machining", url: "https://www.sumitomoel.com/en/products/cutting-tools/" },
      { name: "Optical Fiber Cables", description: "Ribbon and loose-tube fiber cables for data center and telecoms", url: "https://www.sumitomoelectric.com/en/products/optical_cables/" },
      { name: "Automotive Wire Harnesses", description: "High-voltage cables and connectors for EV powertrains", url: "https://www.sumitomoelectric.com/en/products/automotive/" },
      { name: "WC-Co Sintered Carbide", description: "Cemented carbide rods and blanks for drill and milling tool manufacture", url: "https://www.sumitomoel.com/en/products/hard-materials/" },
    ],
  },
  {
    company: "Nidec Corporation", tier: 5,
    products: [
      { name: "Hard Disk Drive Spindle Motors", description: "Brushless DC spindle motors for 3.5\" and 2.5\" hard disk drives", url: "https://www.nidec.com/en/product/others/motors-for-hard-disk-drives/" },
      { name: "Automotive Traction Motors", description: "High-efficiency motors for EV powertrains and EPS systems", url: "https://www.nidec.com/en/product/transportation/" },
      { name: "Cooling Fans for Servers", description: "DC axial fans and centrifugal blowers for server and data center cooling", url: "https://www.nidec.com/en/product/fan/" },
      { name: "Servo Motors", description: "High-torque servo motors and drives for industrial robots and machine tools", url: "https://www.nidec.com/en/product/others/servo-system/" },
    ],
  },

  // ==========================================================
  // TIER 6 – PROCESS MATERIALS, GASES & SUBSTRATES
  // ==========================================================

  {
    company: "Shin-Etsu Chemical", tier: 6,
    products: [
      { name: "300mm Silicon Wafers", description: "Epitaxial and polished silicon wafers for leading-edge chip production", url: "https://www.shinetsu-silicon.com/en/products/" },
      { name: "EUV Photoresist (SEVR)", description: "Chemically amplified photoresist formulations for EUV lithography", url: "https://www.shinetsu.co.jp/en/business/electronics/photoresist.html" },
      { name: "KrF / ArF Photoresist", description: "ArF immersion photoresists for 193nm DUV lithography at 7nm–28nm", url: "https://www.shinetsu.co.jp/en/business/electronics/photoresist.html" },
      { name: "Silicone Encapsulants", description: "LED encapsulation and optically clear silicone adhesive for packaging", url: "https://www.shinetsu.co.jp/en/business/electronics/silicone.html" },
      { name: "Synthetic Quartz Glass", description: "Ultra-high-purity fused quartz for EUV and DUV optical components", url: "https://www.shinetsu-sqtech.co.jp/en/" },
    ],
  },
  {
    company: "Sumco Corporation", tier: 6,
    products: [
      { name: "Epitaxial Silicon Wafers", description: "Epi wafers with custom dopant and resistivity profiles for logic and power", url: "https://www.sumcosi.com/english/products/wafer.html" },
      { name: "CZ Silicon Wafers (ELTRAN)", description: "Czochralski-grown prime silicon wafers for mainstream logic fabs", url: "https://www.sumcosi.com/english/products/wafer.html" },
      { name: "SOI Wafers", description: "Silicon-on-insulator wafers for FD-SOI and RF-SOI process platforms", url: "https://www.sumcosi.com/english/products/soi.html" },
    ],
  },
  {
    company: "JSR Corporation", tier: 6,
    products: [
      { name: "ArF Immersion Photoresist (THR-9xxx)", description: "Chemically amplified ArF photoresists for 193nm immersion lithography", url: "https://www.jsr.co.jp/en/products/microelectronics-materials.html" },
      { name: "EUV Photoresist (JPX-13x)", description: "Metal-oxide EUV resists for next-generation lithography", url: "https://www.jsr.co.jp/en/products/microelectronics-materials.html" },
      { name: "CMP Slurries", description: "Abrasive slurries for chemical mechanical planarization of metal and oxide layers", url: "https://www.jsr.co.jp/en/products/semiconductor-materials.html" },
      { name: "Anti-Reflective Coatings", description: "Organic bottom and top anti-reflective coatings for lithography", url: "https://www.jsr.co.jp/en/products/microelectronics-materials.html" },
    ],
  },
  {
    company: "Tokyo Ohka Kogyo", tier: 6,
    products: [
      { name: "EUV Photoresist (TSMR-EX)", description: "Chemically amplified EUV resists for sub-5nm patterning", url: "https://www.tok.co.jp/en/products/semi/" },
      { name: "ArF Photoresist", description: "ArF and ArF immersion photoresists for DUV lithography", url: "https://www.tok.co.jp/en/products/semi/" },
      { name: "Thick Film Photoresist (PMER)", description: "Thick-film negative/positive resists for MEMS and packaging", url: "https://www.tok.co.jp/en/products/semi/" },
      { name: "Dry Film Photoresist", description: "Laminated dry films for package substrate circuit patterning", url: "https://www.tok.co.jp/en/products/semi/" },
    ],
  },
  {
    company: "Linde plc", tier: 6,
    products: [
      { name: "Silane (SiH4)", description: "Ultra-high-purity silane for silicon nitride and oxide CVD deposition", url: "https://www.linde.com/gases/semiconductor" },
      { name: "Tungsten Hexafluoride (WF6)", description: "CVD tungsten precursor for contact plug metallization", url: "https://www.linde.com/gases/semiconductor" },
      { name: "Nitrogen Trifluoride (NF3)", description: "Remote plasma chamber cleaning agent replacing fluorine gas", url: "https://www.linde.com/gases/semiconductor" },
      { name: "Bulk Cryogenics", description: "Liquid nitrogen and liquid argon supply for fab cooling systems", url: "https://www.linde.com/gases/bulk-gases" },
      { name: "Specialty Gas Blends", description: "Calibration gas mixtures and isotopically labeled gases for metrology", url: "https://www.linde.com/gases/specialty-gases" },
    ],
  },
  {
    company: "Air Liquide", tier: 6,
    products: [
      { name: "ALOHA Hydrogen Peroxide", description: "Ultra-pure H2O2 for cleaning and wet etch in semiconductor fabs", url: "https://www.airliquide.com/markets-innovation/electronics/electronic-industry" },
      { name: "Nitrogen and Argon", description: "Ultra-high-purity inert gases for blanketing, purging, and cooling", url: "https://www.airliquide.com/markets-innovation/electronics/electronic-industry" },
      { name: "Fluorine Compounds", description: "ClF3 and NF3 for chamber cleaning applications", url: "https://www.airliquide.com/markets-innovation/electronics/electronic-industry" },
      { name: "NEON Recovery Service", description: "Neon gas supply, purification, and recycling for EUV laser systems", url: "https://www.airliquide.com/markets-innovation/electronics/electronic-industry" },
    ],
  },
  {
    company: "Air Products and Chemicals", tier: 6,
    products: [
      { name: "Hydrogen (H2)", description: "Ultra-pure hydrogen for epitaxial silicon and anneal atmospheres", url: "https://www.airproducts.com/electronics" },
      { name: "Tetraethylorthosilicate (TEOS)", description: "Silicon oxide CVD precursor for inter-layer dielectric deposition", url: "https://www.airproducts.com/electronics" },
      { name: "Trimethylaluminum (TMA)", description: "ALD aluminum oxide precursor for high-k gate dielectric deposition", url: "https://www.airproducts.com/electronics" },
      { name: "Germane (GeH4)", description: "Germanium precursor for SiGe strained channel formation in FinFETs", url: "https://www.airproducts.com/electronics" },
    ],
  },
  {
    company: "Merck KGaA", tier: 6,
    products: [
      { name: "HIPERTEG™ EUV Photoresists", description: "Metal-oxide EUV resists with outstanding pattern fidelity at sub-3nm", url: "https://www.emdelectronics.com/products/photoresists-and-ancillaries/euv/" },
      { name: "OPTISTACK® ARC", description: "Anti-reflective coating systems for ArF and EUV lithography", url: "https://www.emdelectronics.com/products/photoresists-and-ancillaries/arc/" },
      { name: "Selectilux™ TB Negative Resist", description: "Thermal negative resist for MEMS and advanced packaging", url: "https://www.emdelectronics.com/products/photoresists-and-ancillaries/mems/" },
      { name: "CMOS-grade Chemicals", description: "Ultra-pure chemical formulations for critical cleaning and wet etch", url: "https://www.emdelectronics.com/products/wet-process-chemicals/" },
      { name: "Liquid Crystal Mixtures (LC)", description: "Custom nematic LC mixtures for TFT-LCD and automotive displays", url: "https://www.emdelectronics.com/products/display-materials/" },
    ],
  },
  {
    company: "Soitec", tier: 6,
    products: [
      { name: "SOI Wafers (Smart Cut)", description: "Silicon-on-insulator wafers manufactured by Smart Cut layer transfer", url: "https://www.soitec.com/en/products/soi-wafers" },
      { name: "RF-SOI Wafers", description: "High-resistivity SOI wafers for 5G RF front-end switch and LNA silicon", url: "https://www.soitec.com/en/products/rf-soi" },
      { name: "Power-SOI Wafers", description: "Thick-film SOI for high-voltage analog and power management ICs", url: "https://www.soitec.com/en/products/power-soi" },
      { name: "Photonic SOI", description: "SOI wafers for silicon photonics waveguides and modulators", url: "https://www.soitec.com/en/products/photonic-soi" },
    ],
  },
  {
    company: "Umicore", tier: 6,
    products: [
      { name: "Sputtering Targets", description: "High-purity metal and compound PVD targets for thin-film deposition", url: "https://www.umicore.com/en/products/thin-film-products/" },
      { name: "ITO Rotatable Targets", description: "Indium tin oxide rotating targets for transparent conductive coating", url: "https://www.umicore.com/en/products/thin-film-products/ito-targets/" },
      { name: "Bonding Wire", description: "Ultra-fine gold and copper bonding wire for IC wire bonding", url: "https://www.umicore.com/en/products/jewelry-metals/" },
      { name: "Electrolytic Copper Foil", description: "Ultra-thin copper foil for advanced package substrate circuits", url: "https://www.umicore.com/en/businesses/recycling/" },
    ],
  },
  {
    company: "Fujifilm Electronic Materials", tier: 6,
    products: [
      { name: "CMP Slurries (PlanarCore)", description: "Copper and barrier CMP slurry formulations for advanced interconnect polishing", url: "https://www.fujifilm.com/ffem/en/products/cmp/" },
      { name: "ArF Immersion Photoresist", description: "High-sensitivity positive-tone ArF photoresists for DUV lithography", url: "https://www.fujifilm.com/ffem/en/products/pr/" },
      { name: "Low-k Dielectric Materials", description: "Spin-on dielectric films for reducing parasitic capacitance in interconnects", url: "https://www.fujifilm.com/ffem/en/products/" },
      { name: "Optical Coating Materials", description: "Anti-reflection coatings for camera module glass and display panels", url: "https://www.fujifilm.com/ffem/en/products/optical/" },
    ],
  },
  {
    company: "Samsung Electro-Mechanics", tier: 6,
    products: [
      { name: "MLCC (Multi-Layer Ceramic Capacitor)", description: "High-capacitance MLCCs for smartphone power delivery and decoupling", url: "https://www.samsungsem.com/global/product/passive-component/mlcc/" },
      { name: "FC-BGA Package Substrates", description: "Flip-chip BGA substrates for high-pin-count SoCs and AI accelerators", url: "https://www.samsungsem.com/global/product/substrate/package-substrate/" },
      { name: "Camera Actuator Modules", description: "Optical image stabilization and AF actuator modules for smartphone cameras", url: "https://www.samsungsem.com/global/product/optics-sensor-module/camera-actuator-module/" },
      { name: "Power Inductors", description: "High-current wire-wound power inductors for mobile device DC-DC converters", url: "https://www.samsungsem.com/global/product/passive-component/power-inductor/" },
    ],
  },
  {
    company: "LG Innotek", tier: 6,
    products: [
      { name: "Camera Module (ToF / 3D)", description: "Time-of-flight 3D camera modules for facial recognition and depth sensing", url: "https://www.lginnotek.com/product/product.do?prdId=5&catId=&catGrpId=" },
      { name: "FC-CSP Substrate", description: "Flip-chip chip-scale package substrates for AP and baseband chips", url: "https://www.lginnotek.com/product/product.do?prdId=7" },
      { name: "Vehicle LED Lighting", description: "High-power LED modules for automotive headlights and rear lamps", url: "https://www.lginnotek.com/product/product.do?prdId=6" },
      { name: "Wireless Charging Modules", description: "WPC-standard wireless charging coil and driver modules for smartphones", url: "https://www.lginnotek.com/product/product.do?prdId=4" },
    ],
  },

  // ==========================================================
  // TIER 7 – COMMODITY EXTRACTION, REFINING & PRECURSORS
  // ==========================================================

  {
    company: "Sibelco", tier: 7,
    products: [
      { name: "Spruce Pine Quartz", description: "Ultra-high-purity quartz sand from the Spruce Pine mining district — feedstock for all synthetic quartz used in EUV and DUV optics", url: "https://www.sibelco.com/materials/quartz/" },
      { name: "Industrial Silica Sand", description: "Consistent-specification silica sand for glass, foundry, and industrial use", url: "https://www.sibelco.com/materials/silica/" },
      { name: "Feldspar Minerals", description: "Feldspar for ceramic and glass manufacturing", url: "https://www.sibelco.com/materials/feldspar/" },
    ],
  },
  {
    company: "Wacker Chemie", tier: 7,
    products: [
      { name: "Polysilicon (POLY-SIL / WACKER POLY-Si)", description: "Electronic-grade polysilicon — the starting material for all silicon wafers", url: "https://www.wacker.com/cms/en-us/products/brands/poly-si/poly-si.html" },
      { name: "WACKER SiC Precursor", description: "Methyltrichlorosilane precursor for silicon carbide epitaxial deposition", url: "https://www.wacker.com/cms/en-us/products/product-groups/silicon-compounds/silicon-compounds.html" },
      { name: "HDK Fumed Silica", description: "Pyrogenic silica used in CMP slurry formulations and encapsulants", url: "https://www.wacker.com/cms/en-us/products/brands/hdk/hdk.html" },
      { name: "SILPURAN Silicone", description: "High-purity silicone elastomers for LED and optical device encapsulation", url: "https://www.wacker.com/cms/en-us/products/product-groups/silicones/silicones.html" },
    ],
  },
  {
    company: "OCI Company", tier: 7,
    products: [
      { name: "Trichlorosilane (TCS)", description: "Key precursor for Siemens process polysilicon production", url: "https://www.oci.co.kr/eng/product/semiconductor/trichlorosilane" },
      { name: "Electronic-grade Polysilicon", description: "Solar and semiconductor-grade polysilicon for wafer manufacturing", url: "https://www.oci.co.kr/eng/product/semiconductor" },
      { name: "Hydrogen Peroxide (Electronic grade)", description: "High-concentration H2O2 for wet clean in semiconductor fabs", url: "https://www.oci.co.kr/eng/product/specialty_chemicals" },
    ],
  },
  {
    company: "MP Materials", tier: 7,
    products: [
      { name: "Mixed Rare Earth Carbonate", description: "Mined and processed rare earth concentrate from Mountain Pass, California", url: "https://www.mpmaterials.com/products/" },
      { name: "Separated Rare Earth Oxides", description: "NdPr, La, Ce oxides for EV motors, wind turbines, and electronics magnets", url: "https://www.mpmaterials.com/products/" },
      { name: "NdFeB Magnets", description: "Neodymium-iron-boron permanent magnets for EV traction motors", url: "https://www.mpmaterials.com/products/" },
    ],
  },
  {
    company: "Lynas Rare Earths", tier: 7,
    products: [
      { name: "Neodymium-Praseodymium Oxide (NdPr)", description: "Separated rare earth oxide for high-strength NdFeB permanent magnet production", url: "https://www.lynasrareearths.com/products-and-services/products/" },
      { name: "Lanthanum and Cerium", description: "Bulk rare earth products for catalysts, glass, and polishing compounds", url: "https://www.lynasrareearths.com/products-and-services/products/" },
      { name: "Dysprosium and Terbium", description: "Heavy rare earths used to improve magnet performance at high temperatures", url: "https://www.lynasrareearths.com/products-and-services/products/" },
    ],
  },
  {
    company: "Rio Tinto", tier: 7,
    products: [
      { name: "Iron Ore (Pilbara Blend)", description: "High-grade Pilbara iron ore for global steel production", url: "https://www.riotinto.com/en/about/business-operations/iron-ore" },
      { name: "ISAL Aluminium", description: "Primary aluminium smelted in Iceland using hydroelectric power", url: "https://www.riotinto.com/en/about/business-operations/aluminium" },
      { name: "Copper (Kennecott)", description: "Mined copper from Kennecott, Utah — feedstock for wiring and packaging", url: "https://www.riotinto.com/en/about/business-operations/copper" },
      { name: "Borates (Borax)", description: "Refined borate minerals used in glass fiber and electronics", url: "https://www.riotinto.com/en/about/business-operations/borates" },
      { name: "Lithium (Rincon)", description: "Battery-grade lithium carbonate from Rincon brine project in Argentina", url: "https://www.riotinto.com/en/about/business-operations/lithium" },
    ],
  },
  {
    company: "BHP Group", tier: 7,
    products: [
      { name: "Escondida Copper", description: "World's largest copper mine — primary source of high-grade copper concentrate", url: "https://www.bhp.com/what-we-do/products/copper" },
      { name: "Olympic Dam Uranium/Copper/Gold", description: "Multi-mineral Olympic Dam mine in South Australia", url: "https://www.bhp.com/what-we-do/products/copper" },
      { name: "Nickel Sulphide (Mt Keith)", description: "Battery-grade nickel sulphate for EV battery cathode materials", url: "https://www.bhp.com/what-we-do/products/nickel" },
      { name: "Iron Ore (WAIO)", description: "West Australian iron ore for steelmaking — feedstock for silicon iron", url: "https://www.bhp.com/what-we-do/products/iron-ore" },
    ],
  },
  {
    company: "Freeport-McMoRan", tier: 7,
    products: [
      { name: "Grasberg Copper/Gold", description: "World's largest gold mine and one of the largest copper mines in Indoensia", url: "https://www.fcx.com/operations/indonesia" },
      { name: "Morenci Copper", description: "Largest copper mine in North America — 30% cathode copper", url: "https://www.fcx.com/operations/north-america" },
      { name: "Refined Copper Cathode", description: "LME Grade A refined copper cathode for electronics and wiring", url: "https://www.fcx.com/operations" },
      { name: "Molybdenum Concentrate", description: "Molybdenum byproduct for superalloy and chemical applications", url: "https://www.fcx.com/operations" },
    ],
  },
  {
    company: "Albemarle Corporation", tier: 7,
    products: [
      { name: "Battery-Grade Lithium Carbonate", description: "Purified Li2CO3 for cathode active material in lithium-ion batteries", url: "https://www.albemarle.com/businesses/lithium/" },
      { name: "Battery-Grade Lithium Hydroxide", description: "LiOH monohydrate for NMC and NCA cathode for EV batteries", url: "https://www.albemarle.com/businesses/lithium/" },
      { name: "Ketjenblack Carbon", description: "Conductive carbon black additive improving electrode conductivity in batteries", url: "https://www.albemarle.com/businesses/refining-solutions/" },
      { name: "Bromine Compounds", description: "Organobromides for flame retardant applications in PCBs and enclosures", url: "https://www.albemarle.com/businesses/bromine/" },
    ],
  },
  {
    company: "SQM", tier: 7,
    products: [
      { name: "Lithium Carbonate (LiC)", description: "Battery-grade lithium carbonate extracted from the Atacama salt flat brine", url: "https://www.sqm.com/en/product/lithium/" },
      { name: "Lithium Hydroxide (LiOH)", description: "Battery-grade LiOH for nickel-rich EV cathode materials", url: "https://www.sqm.com/en/product/lithium/" },
      { name: "Potassium Nitrate", description: "Fertilizer-grade and technical-grade potassium nitrate", url: "https://www.sqm.com/en/product/potassium/" },
      { name: "Iodine", description: "High-purity iodine for x-ray contrast media and semiconductor photomask chemistry", url: "https://www.sqm.com/en/product/iodine/" },
    ],
  },
  {
    company: "Ganfeng Lithium", tier: 7,
    products: [
      { name: "Battery-Grade Lithium Hydroxide", description: "LiOH for NCM/NCA cathode active materials in EV batteries", url: "https://www.ganfenglithium.com/products_l.html" },
      { name: "Lithium Metal", description: "High-purity lithium metal for solid-state battery anodes", url: "https://www.ganfenglithium.com/products_l.html" },
      { name: "Solid-State Battery Cells", description: "Lithium solid-state batteries for EV and consumer electronics", url: "https://www.ganfenglithium.com/products_l.html" },
    ],
  },
  {
    company: "Vale S.A.", tier: 7,
    products: [
      { name: "Vale+ Nickel Sulphate", description: "Battery-grade nickel sulphate for EV battery cathode (NMC/NCA)", url: "https://www.vale.com/en/business/energy-transition-metals/nickel" },
      { name: "Iron Ore Pellets", description: "Direct-reduction pellets for electric arc furnace steelmaking", url: "https://www.vale.com/en/business/iron-ore-solutions/iron-ore" },
      { name: "Copper Concentrate (Sossego)", description: "Copper byproduct from Brazilian mining for electronics", url: "https://www.vale.com/en/business/energy-transition-metals/copper" },
    ],
  },
  {
    company: "Norsk Hydro", tier: 7,
    products: [
      { name: "Hydro Reduxa Low-Carbon Aluminium", description: "Aluminium smelted using 100% renewable hydropower for electronics casings", url: "https://www.hydro.com/en/aluminium/products/primary-aluminium/reduxa/" },
      { name: "Hydro CIRCAL Recycled Aluminium", description: "Post-consumer recycled aluminium with 75%+ recycled content", url: "https://www.hydro.com/en/aluminium/products/recycled-aluminium/circal/" },
      { name: "Aluminium Billets and Extrusions", description: "Precision extrusions for heatsinks, enclosures, and structural parts", url: "https://www.hydro.com/en/aluminium/products/extrusion-profiles/" },
    ],
  },
  {
    company: "Alcoa Corporation", tier: 7,
    products: [
      { name: "Alumina (Smelter Grade)", description: "Sandy alumina feedstock for primary aluminium smelting", url: "https://www.alcoa.com/global/en/what-we-do/aluminum-and-products.asp" },
      { name: "Primary Aluminium Ingots", description: "Standard-purity P1020 ingots for rolling, casting, and extrusion", url: "https://www.alcoa.com/global/en/what-we-do/aluminum-and-products.asp" },
      { name: "Alcoa SUSTANA EcoDura", description: "Low-carbon aluminium for electronics and automotive applications", url: "https://www.alcoa.com/global/en/what-we-do/aluminum-and-products/sustana.asp" },
    ],
  },
  {
    company: "Dow Chemical", tier: 7,
    products: [
      { name: "CYCLOTENE Dielectric Resin", description: "BCB-based spin-on dielectric for advanced packaging redistribution layers", url: "https://www.dow.com/en-us/market/mkt-electronics.html" },
      { name: "PARALOID Impact Modifiers", description: "Acrylic impact modifiers for semiconductor encapsulant formulations", url: "https://www.dow.com/en-us/market/mkt-electronics.html" },
      { name: "DOW CORNING Silicone Encapsulants", description: "Optical-grade silicone for LED and display device encapsulation", url: "https://www.dow.com/en-us/market/mkt-electronics/sub-elect-semiconductor.html" },
    ],
  },
  {
    company: "Chemours", tier: 7,
    products: [
      { name: "Opteon Refrigerants", description: "Low-GWP HFO refrigerants for fab HVAC and chiller systems", url: "https://www.chemours.com/en/brands/opteon/" },
      { name: "Teflon PTFE", description: "PTFE tubing, films, and coatings for ultra-pure chemical handling in fabs", url: "https://www.chemours.com/en/brands/teflon/teflon-industrial/" },
      { name: "NovecFluids (Legacy)", description: "Fluorinated heat transfer fluids for immersion cooling of power electronics", url: "https://www.chemours.com/en/brands/" },
    ],
  },
]

/** Returns the catalogued products for a company, or null if not yet researched. */
export function getCompanyProducts(companyName: string): Product[] | null {
  return COMPANY_PRODUCTS.find((c) => c.company === companyName)?.products ?? null
}