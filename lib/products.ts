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
 * Curated, researched product catalog.
 * 1179 product lines across 326 companies, all 7 tiers.
 * Companies without an entry show a 'visit site' fallback on the products page.
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
  {
    company: "Arm Holdings", tier: 1,
    products: [
      { name: "Cortex-A Application Cores", description: "High-performance CPU IP for smartphones, tablets, and laptop SoCs", url: "https://www.arm.com/products/silicon-ip-cpu/cortex-a" },
      { name: "Cortex-M Microcontroller Cores", description: "Ultra-low-power embedded CPU IP powering billions of IoT devices", url: "https://www.arm.com/products/silicon-ip-cpu/cortex-m" },
      { name: "Cortex-X Custom Cores", description: "Maximum-performance CPU IP for flagship mobile and PC designs", url: "https://www.arm.com/products/silicon-ip-cpu/cortex-x" },
      { name: "Neoverse Data Center Cores", description: "Cloud and infrastructure CPU IP — used by AWS Graviton, Ampere Altra", url: "https://www.arm.com/products/silicon-ip-cpu/neoverse" },
      { name: "Immortalis / Mali GPU IP", description: "Graphics processor IP for mobile gaming and content creation", url: "https://www.arm.com/products/silicon-ip-multimedia" },
      { name: "Ethos NPU IP", description: "Neural processing unit IP for on-device AI inference", url: "https://www.arm.com/products/silicon-ip-cpu/ethos" },
      { name: "CoreLink Interconnect IP", description: "High-bandwidth cache-coherent interconnect fabric IP for SoCs", url: "https://www.arm.com/products/silicon-ip-system" },
      { name: "Arm Total Design", description: "Ecosystem program for custom chiplet-based silicon designs", url: "https://www.arm.com/partners/arm-total-design" },
    ],
  },
  {
    company: "Altera", tier: 1,
    products: [
      { name: "Agilex 5 FPGAs", description: "Mid-range FPGAs with PCIe 4.0 and HBM for compute-intensive workloads", url: "https://www.altera.com/products/fpga/features/agx-agilex.html" },
      { name: "Agilex 7 FPGAs", description: "High-end FPGAs for networking, defense, and AI acceleration", url: "https://www.altera.com/products/fpga/features/agx-agilex.html" },
      { name: "Agilex 9 FPGAs", description: "Flagship FPGAs with HBM2e memory integration for HPC", url: "https://www.altera.com/products/fpga/features/agx-agilex.html" },
      { name: "Cyclone FPGAs", description: "Low-power, cost-optimized FPGAs for industrial and IoT", url: "https://www.altera.com/products/fpga/cyclone-series.html" },
      { name: "Stratix 10 FPGAs", description: "High-performance FPGAs for wireline, radar, and compute", url: "https://www.altera.com/products/fpga/stratix-series.html" },
      { name: "MAX 10 FPGAs", description: "Non-volatile instant-on FPGAs for power-sensitive edge designs", url: "https://www.altera.com/products/fpga/max-series.html" },
    ],
  },
  {
    company: "OmniVision Technologies", tier: 1,
    products: [
      { name: "OV50H Image Sensor", description: "50MP 1/1.3\" flagship smartphone main camera image sensor", url: "https://www.ovt.com/products/" },
      { name: "OX08B Automotive Image Sensor", description: "8MP AEC-Q100 automotive surround-view camera sensor", url: "https://www.ovt.com/products/?category=automotive" },
      { name: "OH02A Medical Image Sensor", description: "Ultra-miniature endoscope sensor for capsule and surgical cameras", url: "https://www.ovt.com/products/?category=medical" },
      { name: "OVMed Ophthalmic Sensors", description: "Low-light sensors for retinal imaging and ophthalmology equipment", url: "https://www.ovt.com/products/?category=medical" },
    ],
  },
  {
    company: "Himax Technologies", tier: 1,
    products: [
      { name: "Display Driver ICs (DDIC)", description: "Driver ICs for large-panel LCD, OLED, and automotive displays", url: "https://www.himax.com.tw/products/display-drivers/" },
      { name: "WiseEye Ultra-Low-Power AI", description: "Always-on AI sensing SoC for gesture and object recognition", url: "https://www.himax.com.tw/products/ultra-low-power-microcontroller/" },
      { name: "CMOS Image Sensors", description: "CIS for webcams, smart home cameras, and industrial imaging", url: "https://www.himax.com.tw/products/cmos-image-sensor/" },
      { name: "3D Sensing SoCs", description: "Structured light and ToF depth-sensing ASICs for AR/VR devices", url: "https://www.himax.com.tw/products/depth-sensing/" },
    ],
  },
  {
    company: "Unisoc", tier: 1,
    products: [
      { name: "Tiger T820 SoC", description: "Flagship mobile SoC with 5G modem for mid-range Android smartphones", url: "https://www.unisoc.com/en_us/product" },
      { name: "Tanggula T770 SoC", description: "5G SoC targeting premium mid-range handsets", url: "https://www.unisoc.com/en_us/product" },
      { name: "SC9863A SoC", description: "Cost-optimized 4G SoC for entry-level Android Go devices", url: "https://www.unisoc.com/en_us/product" },
      { name: "UMS9117 IoT Module", description: "Cellular IoT modules for asset tracking and wearables", url: "https://www.unisoc.com/en_us/product" },
    ],
  },
  {
    company: "HiSilicon", tier: 1,
    products: [
      { name: "Kirin 9000S SoC", description: "Flagship mobile SoC for Huawei Mate 60 — 7nm from SMIC", url: "https://www.hisilicon.com/" },
      { name: "Ascend 910 AI Chip", description: "High-performance AI training accelerator for data center", url: "https://www.hisilicon.com/" },
      { name: "Kunpeng 920 Server CPU", description: "64-core Arm-based server processor for cloud infrastructure", url: "https://www.hisilicon.com/" },
      { name: "Hi35xx Camera SoC", description: "IP camera and video surveillance SoC family", url: "https://www.hisilicon.com/" },
    ],
  },
  {
    company: "Graphcore", tier: 1,
    products: [
      { name: "IPU-M2000", description: "Intelligence Processing Unit server for ML training and inference", url: "https://www.graphcore.ai/products/ipu" },
      { name: "Bow IPU", description: "Second-generation IPU with 3D wafer-on-wafer stacking", url: "https://www.graphcore.ai/products/ipu" },
      { name: "IPU-POD64", description: "Rack-scale ML compute pod with 64 IPUs and 57.6 TB/s IPU-Fabric", url: "https://www.graphcore.ai/products/ipu-pod" },
    ],
  },
  {
    company: "SambaNova Systems", tier: 1,
    products: [
      { name: "SN40L Chip", description: "Reconfigurable Dataflow Architecture chip for LLM inference", url: "https://sambanova.ai/blog/sambanova-sn40l-chip" },
      { name: "DataScale SN30", description: "Full-stack AI system for enterprise LLM deployment", url: "https://sambanova.ai/products/datascale/" },
      { name: "SambaNova Cloud API", description: "Managed API providing access to open LLMs on SambaNova hardware", url: "https://sambanova.ai/solutions/ai-inference" },
    ],
  },
  {
    company: "Syntiant", tier: 1,
    products: [
      { name: "NDP120 TinyML Chip", description: "Neural Decision Processor for always-on keyword spotting at µW power", url: "https://www.syntiant.com/ndp120" },
      { name: "NDP200 Edge AI", description: "Next-gen TinyML SoC for audio and sensor fusion inference at milliwatt power", url: "https://www.syntiant.com/ndp200" },
    ],
  },
  {
    company: "Hailo", tier: 1,
    products: [
      { name: "Hailo-8 AI Accelerator", description: "26 TOPS edge AI inference module in M.2 form factor", url: "https://hailo.ai/products/ai-accelerators/hailo-8-m2-ai-acceleration-module/" },
      { name: "Hailo-15 Camera SoC", description: "AI vision processor for smart cameras with integrated ISP", url: "https://hailo.ai/products/hailo-15/" },
      { name: "Hailo-10H Generative AI", description: "On-device generative AI accelerator for LLM inference at the edge", url: "https://hailo.ai/products/ai-accelerators/" },
    ],
  },
  {
    company: "BrainChip", tier: 1,
    products: [
      { name: "Akida NSoC AKD1000", description: "Neuromorphic event-based AI processor for ultra-low-power inference", url: "https://brainchip.com/akida-neuromorphic-system-on-chip/" },
      { name: "Akida Pico", description: "Smallest edge AI inference chip — targets wearables and IoT sensors", url: "https://brainchip.com/akida-neuromorphic-system-on-chip/" },
      { name: "MetaTF SDK", description: "TensorFlow-compatible SDK for mapping neural networks to Akida hardware", url: "https://brainchip.com/sdk-download/" },
    ],
  },
  {
    company: "Imagination Technologies", tier: 1,
    products: [
      { name: "IMG DXT GPU IP", description: "High-performance mobile and embedded GPU IP for SoC licensing", url: "https://www.imaginationtech.com/products/gpu/" },
      { name: "IMG RTXM GPU IP", description: "Real-time ray-tracing GPU IP for next-generation mobile graphics", url: "https://www.imaginationtech.com/products/gpu/" },
      { name: "Series4 Neural Network Accelerator", description: "Inference NPU IP for mobile and embedded AI workloads", url: "https://www.imaginationtech.com/products/ai/" },
      { name: "PowerVR Legacy GPU IP", description: "Widely licensed GPU IP core powering Apple A-series and millions of SoCs", url: "https://www.imaginationtech.com/products/gpu/" },
    ],
  },
  {
    company: "VeriSilicon", tier: 1,
    products: [
      { name: "VeriSilicon GPU IP", description: "Vivante GPU IP for SoC display and graphics acceleration", url: "https://www.verisilicon.com/en/IPPortfolio" },
      { name: "VeriSilicon NPU IP", description: "Neural network inference IP for AI-enabled edge SoC designs", url: "https://www.verisilicon.com/en/IPPortfolio" },
      { name: "ISP IP", description: "Image signal processor IP for camera applications", url: "https://www.verisilicon.com/en/IPPortfolio" },
      { name: "ASIC Turnkey Services", description: "Full custom chip design services from RTL to GDS", url: "https://www.verisilicon.com/en/Services" },
    ],
  },
  {
    company: "GigaDevice Semiconductor", tier: 1,
    products: [
      { name: "GD32 MCU Family", description: "Arm Cortex-M based MCUs — China's most popular 32-bit MCU series", url: "https://www.gigadevice.com/products/microcontrollers/" },
      { name: "GD25 NOR Flash", description: "SPI NOR flash memory for embedded code storage", url: "https://www.gigadevice.com/products/flash-memory/nor-flash/" },
      { name: "GD5F NAND Flash", description: "SPI NAND flash for IoT and industrial storage", url: "https://www.gigadevice.com/products/flash-memory/nand-flash/" },
      { name: "GD32VF RISC-V MCU", description: "RISC-V based microcontrollers — alternative to Arm for cost-sensitive designs", url: "https://www.gigadevice.com/products/microcontrollers/gd32vf/" },
    ],
  },
  {
    company: "Horizon Robotics", tier: 1,
    products: [
      { name: "Journey 5 (J5) Automotive SoC", description: "10 TOPS automotive AI SoC for L2+ ADAS systems", url: "https://en.horizon.cc/journey5" },
      { name: "Journey 6 (J6) Automotive SoC", description: "Next-gen multi-domain SoC for L4 autonomous driving", url: "https://en.horizon.cc/journey6" },
      { name: "BPU (Brain Processing Unit)", description: "Proprietary AI inference architecture optimized for driving perception", url: "https://en.horizon.cc/technology" },
    ],
  },
  {
    company: "Black Sesame Technologies", tier: 1,
    products: [
      { name: "Huanyuan A2000 SoC", description: "High-performance automotive AI SoC for L3/L4 autonomous vehicles", url: "https://www.blacksesametech.com/products/a2000" },
      { name: "Wudao A1000 SoC", description: "Entry-level automotive computing SoC for ADAS", url: "https://www.blacksesametech.com/products/a1000" },
    ],
  },
  {
    company: "Cambricon Technologies", tier: 1,
    products: [
      { name: "MLU590 AI Chip", description: "Training and inference accelerator for data center AI workloads", url: "https://www.cambricon.com/products/cloud" },
      { name: "MLU370 Inference Card", description: "High-density AI inference accelerator in PCIe card form factor", url: "https://www.cambricon.com/products/cloud" },
      { name: "Siyuan 590 Cluster", description: "Full AI compute cluster built on MLU590 accelerators", url: "https://www.cambricon.com/products/cluster" },
    ],
  },
  {
    company: "Rockchip", tier: 1,
    products: [
      { name: "RK3588 SoC", description: "8-core SoC with integrated NPU for single-board computers and NAS", url: "https://www.rock-chips.com/a/en/products/RK35_Series/2022/0926/1660.html" },
      { name: "RK3566 / RK3568", description: "Mid-range quad-core SoCs for IoT gateways and industrial displays", url: "https://www.rock-chips.com/a/en/products/RK35_Series/" },
      { name: "RK3326 Tablet SoC", description: "Low-power quad-core SoC for low-cost Android tablets and handhelds", url: "https://www.rock-chips.com/a/en/products/RK33_Series/" },
      { name: "RV1126 Vision SoC", description: "AI vision processor for smart cameras and industrial inspection", url: "https://www.rock-chips.com/a/en/products/RV_Series/" },
    ],
  },
  {
    company: "Allwinner Technology", tier: 1,
    products: [
      { name: "T527 Automotive SoC", description: "Octa-core Arm SoC for automotive infotainment and DMS", url: "https://www.allwinnertech.com/index.php?c=product&a=index&id=131" },
      { name: "A527 Application Processor", description: "Octa-core Arm Cortex-A55 SoC for mid-range tablets and TVs", url: "https://www.allwinnertech.com/index.php?c=product" },
      { name: "V853 Vision SoC", description: "AI vision SoC for smart surveillance and edge computing", url: "https://www.allwinnertech.com/index.php?c=product" },
      { name: "R818 Smart Home SoC", description: "Quad-core SoC for voice assistants and smart displays", url: "https://www.allwinnertech.com/index.php?c=product" },
    ],
  },
  {
    company: "StarFive Technology", tier: 1,
    products: [
      { name: "JH7110 RISC-V SoC", description: "64-bit quad-core RISC-V SoC for the VisionFive 2 single-board computer", url: "https://www.starfivetech.com/en/site/products/series/jh7110" },
      { name: "JH8100 AI RISC-V SoC", description: "Next-gen RISC-V SoC with integrated NPU for AI edge applications", url: "https://www.starfivetech.com/en/site/products" },
    ],
  },
  {
    company: "Sequans Communications", tier: 1,
    products: [
      { name: "Monarch 2 (LTE-M/NB-IoT)", description: "Ultra-low-power LTE-M and NB-IoT chip with integrated power management", url: "https://www.sequans.com/products/monarch-2/" },
      { name: "Cassiopeia (5G NR-Light)", description: "5G NR-Light / RedCap chip for industrial IoT and wearables", url: "https://www.sequans.com/products/cassiopeia/" },
      { name: "Taurus 5G Module", description: "5G NR sub-6GHz module for mobile broadband IoT", url: "https://www.sequans.com/products/taurus/" },
    ],
  },
  {
    company: "XMOS", tier: 1,
    products: [
      { name: "xcore.ai Processor", description: "Deterministic multi-core AI+DSP processor for voice and audio edge AI", url: "https://www.xmos.com/technology/xcore-ai/" },
      { name: "XVSM-3800 Voice Processor", description: "Purpose-built voice DSP for far-field microphone arrays", url: "https://www.xmos.com/products/" },
      { name: "XE216 Multi-core Processor", description: "16-core deterministic processor for industrial motor control and audio", url: "https://www.xmos.com/products/" },
    ],
  },
  {
    company: "Kalray", tier: 1,
    products: [
      { name: "MPPA Coolidge2 DPU", description: "Massively parallel processor array for storage and network acceleration", url: "https://www.kalrayinc.com/products/mppa-processor/" },
      { name: "Kalray Coolidge for NVMe-oF", description: "DPU optimized for NVMe-over-Fabrics storage target offload", url: "https://www.kalrayinc.com/solutions/storage/" },
    ],
  },
  {
    company: "SiPearl", tier: 1,
    products: [
      { name: "Rhea1 HPC Processor", description: "European HPC CPU based on Arm Neoverse V1 for exascale supercomputers", url: "https://www.sipearl.com/en/product" },
    ],
  },
  {
    company: "eMemory Technology", tier: 1,
    products: [
      { name: "NeoBit OTP IP", description: "One-time programmable non-volatile memory IP for SoC configuration", url: "https://www.ememory.com.tw/neovlp.html" },
      { name: "NeoPUF Security IP", description: "Physical unclonable function IP for hardware root-of-trust and chip fingerprinting", url: "https://www.ememory.com.tw/neopuf.html" },
      { name: "NeoEE MTP IP", description: "Multi-time programmable non-volatile memory IP for calibration data", url: "https://www.ememory.com.tw/neovlp.html" },
    ],
  },
  {
    company: "pSemi", tier: 1,
    products: [
      { name: "PE42525 RF Switch", description: "UltraCMOS SPDT switch for 5G sub-6GHz antenna switching", url: "https://www.psemi.com/products/rf-switches/" },
      { name: "PE28A51 Power Divider", description: "High-isolation power divider IC for 5G and Wi-Fi front-ends", url: "https://www.psemi.com/products/" },
      { name: "Peregrine Buck Converters", description: "UltraCMOS efficient DC-DC converters for RF power management", url: "https://www.psemi.com/products/power-management/" },
    ],
  },
  {
    company: "Ambiq Micro", tier: 1,
    products: [
      { name: "Apollo510 MCU", description: "Arm Cortex-M55 + Ethos-U55 MCU delivering AI at under 1mW", url: "https://ambiq.com/mcu/" },
      { name: "Apollo4 Plus MCU", description: "Ultra-low-power MCU with integrated GPU for wearable displays", url: "https://ambiq.com/mcu/" },
      { name: "Apollo510 SiP", description: "System-in-package combining MCU, PMIC, and memory for wearables", url: "https://ambiq.com/sip/" },
    ],
  },
  {
    company: "Achronix Semiconductor", tier: 1,
    products: [
      { name: "Speedster7t FPGA", description: "7nm FPGA with 2D network-on-chip and hardened ML blocks", url: "https://www.achronix.com/product/speedster7t-fpgas/" },
      { name: "VectorPath Accelerator Card", description: "PCIe accelerator card based on Speedster7t for ML and networking", url: "https://www.achronix.com/product/vectorpath-accelerator-cards/" },
      { name: "Speedcore eFPGA IP", description: "Embedded FPGA IP for integrating programmable logic into custom ASICs", url: "https://www.achronix.com/product/speedcore-efpga/" },
    ],
  },
  {
    company: "d-Matrix", tier: 1,
    products: [
      { name: "Corsair LLM Inference Chip", description: "In-memory computing chip for ultra-efficient large language model inference", url: "https://www.d-matrix.ai/product/" },
      { name: "Corsair Inference Rack", description: "Rack-scale system combining multiple Corsair chips for enterprise AI", url: "https://www.d-matrix.ai/product/" },
    ],
  },
  {
    company: "Faraday Technology", tier: 1,
    products: [
      { name: "ASIC Turnkey Services", description: "Full silicon design services from spec to tape-out on TSMC/UMC processes", url: "https://www.faraday-tech.com/en/Services/Service_ASIC.html" },
      { name: "Silicon IP Library", description: "Standard cell, memory, and I/O libraries for TSMC/UMC process nodes", url: "https://www.faraday-tech.com/en/IP/ip_list.html" },
      { name: "RISC-V MCU IP", description: "Embedded RISC-V processor IP for ASIC integration", url: "https://www.faraday-tech.com/en/IP/ip_list.html" },
    ],
  },
  {
    company: "Global Unichip Corp", tier: 1,
    products: [
      { name: "ASIC Design Services", description: "Design services partner for TSMC — specializes in advanced node tape-outs", url: "https://www.globalunichip.com/en/service.html" },
      { name: "High-Speed SerDes IP", description: "PCIe 5.0 and 112G SerDes IP targeting TSMC N5/N3 processes", url: "https://www.globalunichip.com/en/ip.html" },
      { name: "CoWoS Integration Services", description: "Advanced packaging integration for multi-die chiplet designs on TSMC", url: "https://www.globalunichip.com/en/service.html" },
    ],
  },
  {
    company: "Etron Technology", tier: 1,
    products: [
      { name: "SigmaRAM ZBT SRAM", description: "Zero Bus Turnaround SRAM for networking and telecom equipment", url: "https://www.etron.com/en/products.php" },
      { name: "Virtual Channel SDRAM", description: "High-speed SDRAM for graphics and display frame buffer applications", url: "https://www.etron.com/en/products.php" },
      { name: "SuperRAM Low-Power DRAM", description: "Low-power discrete DRAM for IoT and wearable devices", url: "https://www.etron.com/en/products.php" },
    ],
  },
  {
    company: "MegaChips Corporation", tier: 1,
    products: [
      { name: "HDMI/DP Retimers", description: "HDMI 2.1 and DisplayPort 2.0 retimer ICs for consumer AV equipment", url: "https://www.megachips.com/en/product/" },
      { name: "FRC Frame Rate Converter", description: "Frame rate and resolution conversion ICs for TV and monitor scaling", url: "https://www.megachips.com/en/product/" },
      { name: "Secure MCU", description: "Secure microcontroller ICs for payment terminals and authentication", url: "https://www.megachips.com/en/product/" },
    ],
  },
  {
    company: "LX Semicon", tier: 1,
    products: [
      { name: "Display Driver ICs (DDI)", description: "Large-panel LCD driver ICs for Samsung and LG TV panels", url: "https://www.lxsemicon.com/product" },
      { name: "TDDI (Touch and Display Driver IC)", description: "Integrated touch and display driver ICs for smartphone panels", url: "https://www.lxsemicon.com/product" },
      { name: "Power Management ICs", description: "PMICs for display panels and electronic devices", url: "https://www.lxsemicon.com/product" },
    ],
  },
  {
    company: "Telechips", tier: 1,
    products: [
      { name: "TCC803x Automotive SoC", description: "Automotive-grade SoC for digital cluster and infotainment", url: "https://www.telechips.com/product" },
      { name: "TCC750x AI Vision SoC", description: "Automotive vision SoC for ADAS camera processing", url: "https://www.telechips.com/product" },
      { name: "TCC893x Media SoC", description: "Connected car and IVI SoC with 5G and AI capabilities", url: "https://www.telechips.com/product" },
    ],
  },
  {
    company: "FADU", tier: 1,
    products: [
      { name: "FC500M Enterprise NVMe SSD", description: "PCIe 5.0 NVMe SSD controller for enterprise and data center use", url: "https://www.fadu.io/products/" },
      { name: "FC510E CSD Controller", description: "Computational Storage Drive controller with in-storage processing", url: "https://www.fadu.io/products/" },
    ],
  },
  {
    company: "M31 Technology", tier: 1,
    products: [
      { name: "USB4 / Thunderbolt PHY IP", description: "USB4 and Thunderbolt 4 physical layer IP for advanced node SoCs", url: "https://www.m31tech.com/USBPort.html" },
      { name: "PCIe 5.0 / 6.0 PHY IP", description: "High-speed PCIe physical layer IP targeting TSMC N5/N3", url: "https://www.m31tech.com/PCIePort.html" },
      { name: "MIPI C/D-PHY IP", description: "Camera and display MIPI PHY IP for mobile and automotive SoCs", url: "https://www.m31tech.com/MIPIPort.html" },
    ],
  },
  {
    company: "Andes Technology", tier: 1,
    products: [
      { name: "AndesCore A25 RISC-V", description: "32-bit RISC-V CPU IP for microcontroller and IoT applications", url: "https://www.andestech.com/en/products-solutions/andescore-processors/" },
      { name: "AndesCore AX45MP RISC-V", description: "Multi-core 64-bit application CPU IP for Linux-capable SoCs", url: "https://www.andestech.com/en/products-solutions/andescore-processors/" },
      { name: "AndesAIRE NPU IP", description: "AI inference accelerator IP for RISC-V SoC integration", url: "https://www.andestech.com/en/products-solutions/" },
    ],
  },
  {
    company: "Pragmatic Semiconductor", tier: 1,
    products: [
      { name: "PragmatIC Flex ICs", description: "Ultra-thin flexible integrated circuits manufactured on PET film — not silicon", url: "https://www.pragmaticsemi.com/technology/" },
      { name: "FlexIC Foundry Services", description: "Foundry services for flexible IC production at low cost and high volume", url: "https://www.pragmaticsemi.com/foundry-services/" },
    ],
  },
  {
    company: "Untether AI", tier: 1,
    products: [
      { name: "speedAI384 Inference Chip", description: "At-memory inference accelerator delivering 2000 TOPS at 350W", url: "https://www.untether.ai/products/" },
      { name: "Boqueria PCIe Accelerator Card", description: "PCIe accelerator card for high-throughput LLM and computer vision inference", url: "https://www.untether.ai/products/" },
    ],
  },
  {
    company: "Mythic", tier: 1,
    products: [
      { name: "M1076 Analog Matrix Processor", description: "Analog in-memory compute chip for ultra-efficient AI inference", url: "https://www.mythic-ai.com/technology/" },
      { name: "Mythic Intelligence Scale System", description: "Edge AI inference system for vision and language applications", url: "https://www.mythic-ai.com/products/" },
    ],
  },
  {
    company: "Esperanto Technologies", tier: 1,
    products: [
      { name: "ET-SoC-1 RISC-V Chip", description: "1092-core RISC-V ML inference chip for energy-efficient data center AI", url: "https://www.esperanto.ai/products/" },
    ],
  },
  {
    company: "Enfusion", tier: 1,
    products: [
      { name: "Custom Chip Design IP", description: "Specializes in networking and connectivity ASIC design for datacom", url: "https://www.enfusion.com/" },
    ],
  },
  {
    company: "Phytium Technology", tier: 1,
    products: [
      { name: "Tengyun S2500 Server CPU", description: "64-core Arm-compatible server processor for Chinese cloud infrastructure", url: "https://www.phytium.com.cn/en/product/" },
      { name: "D2000 Desktop CPU", description: "8-core desktop processor for Chinese PC ecosystem", url: "https://www.phytium.com.cn/en/product/" },
      { name: "E2000 Embedded Processor", description: "Quad-core SoC for industrial and embedded applications", url: "https://www.phytium.com.cn/en/product/" },
    ],
  },
  {
    company: "Loongson Technology", tier: 1,
    products: [
      { name: "3A6000 Desktop CPU", description: "4-core LoongArch64 desktop CPU for Chinese commercial PCs", url: "https://www.loongson.cn/product/show?id=10" },
      { name: "3C6000 Server CPU", description: "32-core LoongArch server processor for Chinese data centers", url: "https://www.loongson.cn/product/show?id=11" },
      { name: "2K2000 Embedded SoC", description: "Dual-core LoongArch SoC for industrial control applications", url: "https://www.loongson.cn/product/show?id=12" },
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
  {
    company: "UMC", tier: 2,
    products: [
      { name: "22nm ULP Process", description: "Ultra-low-power 22nm for IoT, wearable, and embedded applications", url: "https://www.umc.com/en/StaticPage/Technology_22" },
      { name: "28nm HPC+ Process", description: "28nm high-performance compact for consumer and networking chips", url: "https://www.umc.com/en/StaticPage/Technology_28nm" },
      { name: "RFSOI Process", description: "RF silicon-on-insulator for 5G front-end module designs", url: "https://www.umc.com/en/StaticPage/Technology_RFSOI" },
      { name: "BCD Power Process", description: "Bipolar-CMOS-DMOS process for analog and power management ICs", url: "https://www.umc.com/en/StaticPage/Technology_BCD" },
    ],
  },
  {
    company: "SMIC", tier: 2,
    products: [
      { name: "N+2 (7nm-class) Process", description: "Most advanced SMIC node used in Huawei Kirin 9000S via Loophole", url: "https://www.smics.com/en/site/service_AdvancedCMOS" },
      { name: "14nm FinFET Process", description: "Logic FinFET process for mid-range SoCs and AI chips", url: "https://www.smics.com/en/site/service_AdvancedCMOS" },
      { name: "28nm HKMG Process", description: "High-k metal gate 28nm for mainstream SoC production in China", url: "https://www.smics.com/en/site/service_MatureCMOS" },
      { name: "HVMOS / BCD", description: "High-voltage and power management specialty processes", url: "https://www.smics.com/en/site/service_Specialty" },
    ],
  },
  {
    company: "Sony Semiconductor Solutions", tier: 2,
    products: [
      { name: "IMX989 Stacked CMOS Sensor", description: "1\" flagship smartphone image sensor with dual-layer transistor pixel", url: "https://www.sony-semicon.com/en/products/is/index.html" },
      { name: "IMX500 Intelligent Vision Sensor", description: "AI-integrated image sensor with onboard inference processor", url: "https://www.sony-semicon.com/en/products/is/industry/imx500_imx501.html" },
      { name: "Automotive Image Sensors (IMX490)", description: "HDR image sensor for automotive surround view and ADAS cameras", url: "https://www.sony-semicon.com/en/products/is/automotive/" },
      { name: "ToF Depth Sensors", description: "Time-of-flight distance sensors for robotics and industrial measurement", url: "https://www.sony-semicon.com/en/products/is/tof/" },
      { name: "DRAM Memory (LPDDR5)", description: "Low-power DRAM modules for PlayStation and consumer electronics", url: "https://www.sony-semicon.com/en/products/memory/" },
    ],
  },
  {
    company: "Tower Semiconductor", tier: 2,
    products: [
      { name: "SiGe BiCMOS RF Process", description: "SiGe HBT process for PA, LNA, and transceiver design at mmWave", url: "https://www.towersemi.com/technology/rf-cmos-sigebi/" },
      { name: "Silicon Photonics Platform", description: "Monolithic SiPh process for optical transceivers and LiDAR", url: "https://www.towersemi.com/technology/silicon-photonics/" },
      { name: "CMOS Image Sensor Process", description: "Backside illuminated CMOS image sensor specialty process", url: "https://www.towersemi.com/technology/cis/" },
      { name: "Mixed-Signal Power BCD", description: "Analog-mixed-signal BCD process for power management ICs", url: "https://www.towersemi.com/technology/mixed-signal/" },
    ],
  },
  {
    company: "Nexperia", tier: 2,
    products: [
      { name: "PRISM MOSFETs", description: "Automotive and industrial MOSFETs in compact LFPAK package", url: "https://www.nexperia.com/products/mosfets/" },
      { name: "Logic Gates", description: "74-series CMOS logic ICs for digital signal conditioning", url: "https://www.nexperia.com/products/logic/" },
      { name: "ESD / TVS Diodes", description: "ESD protection diodes and TVS arrays for high-speed interface protection", url: "https://www.nexperia.com/products/esd-tvs-protection/" },
      { name: "Schottky Diodes", description: "Ultra-fast Schottky rectifiers for switch-mode power supplies", url: "https://www.nexperia.com/products/diodes/" },
      { name: "Bipolar Transistors", description: "Small-signal and power BJTs for analog signal processing", url: "https://www.nexperia.com/products/bipolar-transistors/" },
    ],
  },
  {
    company: "ams OSRAM", tier: 2,
    products: [
      { name: "OSLON LED Series", description: "High-power SMD LEDs for automotive headlights and projection displays", url: "https://ams-osram.com/products/leds/high-power-leds" },
      { name: "AS7341 Spectral Sensor", description: "11-channel spectral color sensor for food quality and plant monitoring", url: "https://ams-osram.com/products/sensor-solutions/color-sensors" },
      { name: "TCS34725 Color Sensor", description: "RGB and clear light sensor with I2C interface for ambient light control", url: "https://ams-osram.com/products/sensor-solutions/color-sensors" },
      { name: "SFH 4780S UV-C LED", description: "Deep UV-C LED for water and surface sterilization applications", url: "https://ams-osram.com/products/leds/uv-leds" },
      { name: "ICM-42688-P IMU", description: "6-axis IMU with integrated digital DMP for wearable motion sensing", url: "https://ams-osram.com/products/sensor-solutions/inertial-sensors" },
    ],
  },
  {
    company: "Elmos Semiconductor", tier: 2,
    products: [
      { name: "Ultrasonic Transceiver ICs", description: "Parking sensor ICs for automotive ultrasonic distance measurement", url: "https://www.elmos.com/products/automotive-ics/ultrasonic/" },
      { name: "LIN Transceivers", description: "LIN bus transceivers for automotive body electronics communication", url: "https://www.elmos.com/products/automotive-ics/communication/" },
      { name: "LED Driver ICs (Automotive)", description: "Automotive-grade LED matrix driver ICs for adaptive headlight control", url: "https://www.elmos.com/products/automotive-ics/lighting/" },
    ],
  },
  {
    company: "Bosch Semiconductors", tier: 2,
    products: [
      { name: "SiC MOSFETs", description: "Gen 2 SiC power transistors for EV powertrains — own Bosch production", url: "https://www.bosch-semiconductors.com/power-semiconductors/sic-mosfets/" },
      { name: "MEMS Accelerometers", description: "High-precision MEMS accelerometers for automotive airbag and stability", url: "https://www.bosch-semiconductors.com/mems-sensors/inertial-sensors/" },
      { name: "BME688 Environmental Sensor", description: "AI-ready gas scanner with temperature, humidity, and VOC sensing", url: "https://www.bosch-semiconductors.com/mems-sensors/environmental-sensors/" },
      { name: "BNO085 IMU", description: "9-axis IMU with integrated sensor fusion for AR/VR and robotics", url: "https://www.bosch-semiconductors.com/mems-sensors/inertial-sensors/" },
    ],
  },
  {
    company: "X-Fab", tier: 2,
    products: [
      { name: "SiC Foundry Process (SiC018)", description: "SiC MOSFET and SBD process for EV and industrial power designs", url: "https://www.xfab.com/technology/silicon-carbide/" },
      { name: "MEMS Foundry (XM018)", description: "0.18µm MEMS process for pressure sensors, gyroscopes, and microphones", url: "https://www.xfab.com/technology/mems/" },
      { name: "SOI Analog Process", description: "SOI-based analog and mixed-signal process for automotive sensors", url: "https://www.xfab.com/technology/analog-mixed-signal/" },
      { name: "GaN-on-SiC Process", description: "GaN epitaxy on SiC substrate for RF power amplifier production", url: "https://www.xfab.com/technology/gallium-nitride/" },
    ],
  },
  {
    company: "Nichia Corporation", tier: 2,
    products: [
      { name: "NSPWR70CSS-K1 High-Power LED", description: "White LED for automotive LED headlamps and daytime running lights", url: "https://www.nichia.co.jp/en/products/led.html" },
      { name: "Phosphor Technology LEDs", description: "Proprietary phosphor-converted LEDs for display backlights and SSL", url: "https://www.nichia.co.jp/en/products/led.html" },
      { name: "Laser Diodes (450nm/638nm)", description: "Blue and red laser diodes for projectors, LiDAR, and optical storage", url: "https://www.nichia.co.jp/en/products/laser.html" },
      { name: "UV LED (365nm/385nm)", description: "UV LED for curing, sterilization, and fluorescence applications", url: "https://www.nichia.co.jp/en/products/led_uv.html" },
    ],
  },
  {
    company: "JCET Group", tier: 2,
    products: [
      { name: "WLCSP Packaging", description: "Wafer-level chip-scale packaging for mobile and IoT silicon", url: "https://www.jcetglobal.com/en/technology/wlcsp/" },
      { name: "System-in-Package (SiP)", description: "Multi-component SiP for wearables and wireless modules", url: "https://www.jcetglobal.com/en/technology/sip/" },
      { name: "Flip-Chip BGA", description: "FC-BGA for high-pin-count mobile SoCs and networking chips", url: "https://www.jcetglobal.com/en/technology/fc-bga/" },
      { name: "Advanced Stacking (SFO)", description: "Package-on-package stacking for mobile memory-on-logic integration", url: "https://www.jcetglobal.com/en/technology/" },
    ],
  },
  {
    company: "Magnachip Semiconductor", tier: 2,
    products: [
      { name: "OLED Display Driver ICs", description: "DDIC for foldable and curved OLED smartphone displays", url: "https://www.magnachip.com/products/display/" },
      { name: "Power MOSFETs", description: "Super-junction MOSFETs for high-efficiency power supplies", url: "https://www.magnachip.com/products/power/" },
      { name: "SiC Diodes", description: "SiC Schottky barrier diodes for automotive charging stations", url: "https://www.magnachip.com/products/power/sic/" },
    ],
  },
  {
    company: "BYD Semiconductor", tier: 2,
    products: [
      { name: "IGBT Modules (EV Traction)", description: "IGBT modules for BYD's own EV traction inverters and third-party", url: "https://www.bydsemi.com/en/products/igbt/" },
      { name: "SiC MOSFETs", description: "SiC power transistors for next-generation BYD EV platforms", url: "https://www.bydsemi.com/en/products/sic/" },
      { name: "AC-DC Controller ICs", description: "Power supply control ICs for consumer and industrial applications", url: "https://www.bydsemi.com/en/products/" },
    ],
  },
  {
    company: "Mitsubishi Electric", tier: 2,
    products: [
      { name: "J-Series IGBT Modules", description: "6th-gen IGBT power modules for industrial motor drives and inverters", url: "https://www.mitsubishielectric.com/semiconductors/products/powermod/" },
      { name: "SiC Power Modules", description: "SiC MOSFET modules for EV drivetrains and railway traction", url: "https://www.mitsubishielectric.com/semiconductors/products/sic/" },
      { name: "L-series Laser Diodes", description: "High-power laser diode arrays for fiber laser pumping", url: "https://www.mitsubishielectric.com/semiconductors/products/laserdiode/" },
      { name: "DIPIPM (Dual-In-line Power IP Module)", description: "Self-contained IPM for appliance motor drives — HVAC compressors", url: "https://www.mitsubishielectric.com/semiconductors/products/powermod/dip/" },
    ],
  },
  {
    company: "Powerchip Semiconductor Mfg Corp", tier: 2,
    products: [
      { name: "DRAM Foundry Services", description: "DRAM wafer foundry for third-party DRAM fabless customers", url: "https://www.powerchip.com/en/business.html" },
      { name: "Logic/Embedded Non-Volatile Memory", description: "Embedded Flash and EEPROM process for automotive MCUs", url: "https://www.powerchip.com/en/business.html" },
    ],
  },
  {
    company: "ChangXin Memory Technologies", tier: 2,
    products: [
      { name: "LPDDR5 DRAM", description: "Low-power mobile DRAM for Chinese smartphone manufacturers", url: "https://www.cxmt.com/products.html" },
      { name: "DDR4 DRAM", description: "Server and desktop DRAM modules for the domestic Chinese market", url: "https://www.cxmt.com/products.html" },
    ],
  },
  {
    company: "SkyWater Technology", tier: 2,
    products: [
      { name: "SKY130 Open-Source PDK", description: "Openly documented 130nm process design kit — first open-source foundry PDK", url: "https://www.skywatertechnology.com/technology/" },
      { name: "Rad-Hard CMOS Process", description: "Radiation-hardened CMOS for US government space and defense chips", url: "https://www.skywatertechnology.com/rad-hard/" },
      { name: "Trusted Foundry (DMEA)", description: "DoD-accredited US foundry for classified and sensitive defense ICs", url: "https://www.skywatertechnology.com/trusted-foundry/" },
    ],
  },
  {
    company: "Hangzhou Silan Microelectronics", tier: 2,
    products: [
      { name: "IGBT and FRD Modules", description: "Insulated gate bipolar transistors for industrial drives and welding", url: "https://www.silan.com.cn/en/product.html" },
      { name: "SiC Power Devices", description: "SiC MOSFETs and diodes for EV and solar energy applications", url: "https://www.silan.com.cn/en/product.html" },
      { name: "MOSFET Devices", description: "Power MOSFETs for switching power supplies and motor drives", url: "https://www.silan.com.cn/en/product.html" },
    ],
  },
  {
    company: "Holtek Semiconductor", tier: 2,
    products: [
      { name: "HT32 ARM MCUs", description: "Arm Cortex-M0+ MCUs for consumer appliances and industrial control", url: "https://www.holtek.com/en/products/microcontrollers/" },
      { name: "Capacitive Touch Controllers", description: "Self- and mutual-capacitance touch controller ICs for appliances", url: "https://www.holtek.com/en/products/touch/" },
      { name: "8-bit MCUs (HT66)", description: "Ultra-low-cost 8-bit MCUs for simple consumer products", url: "https://www.holtek.com/en/products/microcontrollers/8bit/" },
    ],
  },
  {
    company: "Unisem", tier: 2,
    products: [
      { name: "QFN / DFN Packaging", description: "Quad flat no-lead packages for compact semiconductor devices", url: "https://www.unisemgroup.com/services/packaging" },
      { name: "Wafer-Level CSP", description: "Wafer-level chip-scale packaging for ultra-compact devices", url: "https://www.unisemgroup.com/services/packaging" },
      { name: "Test and Burn-In Services", description: "Final test, burn-in, and reliability screening for ICs", url: "https://www.unisemgroup.com/services/test" },
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
  {
    company: "Canon Inc.", tier: 3,
    products: [
      { name: "FPA-5550iZ2 i-line Stepper", description: "365nm stepper for MEMS, power devices, and mature-node chips", url: "https://www.canon.com/exposure-systems/products/" },
      { name: "MPA-8000 DUV Scanner", description: "Deep UV scanner for 90nm–200nm node production", url: "https://www.canon.com/exposure-systems/products/" },
      { name: "CMOS Package Lithography", description: "Semiconductor packaging-grade exposure systems for RDL patterning", url: "https://www.canon.com/exposure-systems/products/" },
    ],
  },
  {
    company: "ASM International", tier: 3,
    products: [
      { name: "Pulsar ALD System", description: "Atomic layer deposition for high-k gate dielectrics and memory capacitors", url: "https://www.asm.com/products/ald/" },
      { name: "EmerALD LP DRAM ALD", description: "Low-pressure ALD system optimized for DRAM capacitor dielectrics", url: "https://www.asm.com/products/ald/" },
      { name: "A400 Epitaxial Reactor", description: "Silicon epitaxial growth system for advanced CMOS substrates", url: "https://www.asm.com/products/epitaxy/" },
      { name: "Horizon Vertical Furnace", description: "Batch horizontal/vertical furnace for thermal oxidation and annealing", url: "https://www.asm.com/products/furnace/" },
    ],
  },
  {
    company: "Kokusai Electric", tier: 3,
    products: [
      { name: "VERTEX Vertical Batch ALD", description: "High-throughput vertical batch ALD system for DRAM and 3D NAND", url: "https://www.kokusai-electric.com/en/products/ald_cvd/" },
      { name: "CHABOC Batch Furnace", description: "Horizontal batch furnace for diffusion and oxidation at mature nodes", url: "https://www.kokusai-electric.com/en/products/furnace/" },
      { name: "SiNgen+ LP-CVD", description: "Low-pressure silicon nitride CVD for spacer and passivation layers", url: "https://www.kokusai-electric.com/en/products/" },
    ],
  },
  {
    company: "Onto Innovation", tier: 3,
    products: [
      { name: "Dragonfly G3 Inspection", description: "Optical inspection of advanced packaging substrates and panel-level boards", url: "https://www.ontoinnovation.com/products/dragonfly-g3/" },
      { name: "Firefly Infrared Inspection", description: "Infrared inspection for hidden defects in through-silicon vias and bonds", url: "https://www.ontoinnovation.com/products/firefly/" },
      { name: "Archer AIM Overlay Metrology", description: "Precision overlay metrology for multi-patterning and EUV lithography", url: "https://www.ontoinnovation.com/products/archer/" },
      { name: "Revolution ELS Film Metrology", description: "Spectroscopic ellipsometry for film thickness measurement on patterned wafers", url: "https://www.ontoinnovation.com/products/revolution/" },
    ],
  },
  {
    company: "Veeco Instruments", tier: 3,
    products: [
      { name: "MOCVD System (K475i)", description: "Multi-wafer MOCVD reactor for GaN LED and laser epitaxial growth", url: "https://www.veeco.com/products/mocvd/" },
      { name: "MBE System (Gen10)", description: "Molecular beam epitaxy for III-V compound semiconductor research", url: "https://www.veeco.com/products/mbe/" },
      { name: "Propel MOCVD (Power GaN)", description: "High-volume MOCVD for GaN-on-silicon power devices", url: "https://www.veeco.com/products/mocvd/" },
      { name: "Lumina ALD", description: "Spatial ALD for high-throughput thin-film encapsulation of OLED panels", url: "https://www.veeco.com/products/ald/" },
    ],
  },
  {
    company: "EV Group", tier: 3,
    products: [
      { name: "GEMINI Wafer Bonding System", description: "Fusion and anodic wafer bonding systems for 3D-IC and MEMS", url: "https://www.evgroup.com/products/wafer-bonding/" },
      { name: "HERCULES Die-to-Wafer Bonder", description: "Hybrid bonding system for Cu-Cu die-to-wafer integration in 3D-IC", url: "https://www.evgroup.com/products/die-bonding/" },
      { name: "LITHOGRAPHIX Nano-Imprint", description: "Nano-imprint lithography system for photonics and advanced packaging", url: "https://www.evgroup.com/products/lithography/" },
      { name: "CAPA Spin Coater / Developer", description: "Resist processing equipment for advanced packaging lithography", url: "https://www.evgroup.com/products/photoresist-processing/" },
    ],
  },
  {
    company: "BE Semiconductor Industries", tier: 3,
    products: [
      { name: "Datacon Die Attach", description: "High-accuracy die attach system for flip-chip and advanced packaging", url: "https://www.besi.com/products/die-attach/" },
      { name: "Fico Molding Systems", description: "Transfer and compression molding systems for IC encapsulation", url: "https://www.besi.com/products/molding/" },
      { name: "Esec Flip Chip Bonder", description: "Thermocompression flip-chip bonder for CoW and hybrid bonding", url: "https://www.besi.com/products/flip-chip-bonding/" },
      { name: "Datacon 2200 Hybrid Bonder", description: "Cu-Cu hybrid bonding system enabling highest density 3D-IC integration", url: "https://www.besi.com/products/hybrid-bonding/" },
    ],
  },
  {
    company: "Kulicke & Soffa", tier: 3,
    products: [
      { name: "IConn PLUS Ball Bonder", description: "High-speed ball wire bonder for QFP and BGA packages", url: "https://www.kns.com/equipment/ball-bonders/" },
      { name: "Asterion APMAX Ball Bonder", description: "Advanced ball bonder for fine-pitch and high-density wire bonding", url: "https://www.kns.com/equipment/ball-bonders/" },
      { name: "MaxUM II Wedge Bonder", description: "Aluminum wedge bonder for power packages and automotive devices", url: "https://www.kns.com/equipment/wedge-bonders/" },
      { name: "VIPER Die Sorter", description: "High-throughput die sorter and pick-and-place for backend packaging", url: "https://www.kns.com/equipment/advanced-packaging/" },
    ],
  },
  {
    company: "Suss MicroTec", tier: 3,
    products: [
      { name: "MA/BA 8 Mask Aligner", description: "UV contact / proximity aligner for MEMS, power IC, and LED wafers", url: "https://www.suss.com/en/products/mask-aligner/" },
      { name: "XBC300 Wafer Bonder", description: "Aligned wafer bonding for 3D-IC, MEMS, and sensor fusion devices", url: "https://www.suss.com/en/products/wafer-bonder/" },
      { name: "SSX200 Spin Coater", description: "Automatic spin coater for photoresist and BCB film application", url: "https://www.suss.com/en/products/photoresist-processing/" },
      { name: "LithoPack Die-Level Lithography", description: "Fan-out packaging lithography for RDL exposure on molded panels", url: "https://www.suss.com/en/products/lithography/advanced-packaging/" },
    ],
  },
  {
    company: "Hanmi Semiconductor", tier: 3,
    products: [
      { name: "HIPEX TC Bonder", description: "Thermocompression bonder for HBM-to-interposer stacking in CoWoS", url: "https://www.hanmisemiconductor.com/products/" },
      { name: "MERLIN Vision Inspection", description: "3D vision inspection system for post-bond die placement accuracy", url: "https://www.hanmisemiconductor.com/products/" },
      { name: "Micro Saw", description: "Precision wafer dicing saw for thin wafer singulation", url: "https://www.hanmisemiconductor.com/products/" },
    ],
  },
  {
    company: "Naura Technology Group", tier: 3,
    products: [
      { name: "PECVD Systems", description: "Plasma-enhanced CVD for SiO2, SiN, and TEOS deposition", url: "https://www.naura.com/en/product/" },
      { name: "ICP Etch Systems", description: "Inductively coupled plasma etch for advanced logic patterning", url: "https://www.naura.com/en/product/" },
      { name: "ALD Systems", description: "Atomic layer deposition for high-k dielectrics", url: "https://www.naura.com/en/product/" },
      { name: "Diffusion Furnaces", description: "Horizontal diffusion and oxidation furnaces for mature node fabs", url: "https://www.naura.com/en/product/" },
    ],
  },
  {
    company: "AMEC", tier: 3,
    products: [
      { name: "Primo Nanova ICP Etch", description: "High-density ICP etch system for conductor and dielectric patterning", url: "https://www.amec-ma.com/en/products/" },
      { name: "Primo AD-RIE", description: "Advanced dielectric etch for STI and contact hole applications", url: "https://www.amec-ma.com/en/products/" },
      { name: "SACVD System", description: "Sub-atmospheric CVD for gap-fill oxide deposition in shallow trench isolation", url: "https://www.amec-ma.com/en/products/" },
    ],
  },
  {
    company: "Axcelis Technologies", tier: 3,
    products: [
      { name: "Purion XE Ion Implanter", description: "High-energy ion implanter for deep retrograde well and CMOS twin-well", url: "https://www.axcelis.com/products/purion-xe/" },
      { name: "Purion Dragon Implanter", description: "High-current implanter for source/drain and substrate doping", url: "https://www.axcelis.com/products/purion-dragon/" },
      { name: "Purion M SiC Implanter", description: "Ion implanter optimized for silicon carbide power device doping", url: "https://www.axcelis.com/products/purion-m/" },
    ],
  },
  {
    company: "Nova Measuring Instruments", tier: 3,
    products: [
      { name: "Stratus OCD (Optical CD)", description: "Optical critical dimension metrology using model-based scatterometry", url: "https://www.novami.com/products/optical-cd/" },
      { name: "Prism Integrated Metrology", description: "In-line process control metrology for ALD and CVD film thickness", url: "https://www.novami.com/products/integrated-metrology/" },
      { name: "i-Nova Chemical Composition", description: "X-ray fluorescence metrology for film composition and thickness", url: "https://www.novami.com/products/xrf/" },
    ],
  },
  {
    company: "ACM Research", tier: 3,
    products: [
      { name: "Ultra C Single-Wafer Clean", description: "Megasonic + chemical single-wafer cleaning for advanced nodes", url: "https://www.acmrcsh.com/products/" },
      { name: "Ultra ECP Electroplating", description: "Advanced copper and nickel electroplating for interconnect and packaging", url: "https://www.acmrcsh.com/products/" },
      { name: "Ultra Stress-Free Polish (SFP)", description: "Stress-free copper polishing for TSV reveal in 3D-IC processing", url: "https://www.acmrcsh.com/products/" },
    ],
  },
  {
    company: "Cohu", tier: 3,
    products: [
      { name: "COHU Pick-and-Place Handlers", description: "High-speed gravity and strip handlers for IC final test", url: "https://www.cohu.com/semiconductor-test-handler-systems" },
      { name: "Krypton SoC Test System", description: "Multi-site SoC tester for analog, mixed-signal, and RF devices", url: "https://www.cohu.com/semiconductor-test-systems" },
      { name: "Neon Contactors", description: "Precision test contactors and socket systems for chip burn-in and test", url: "https://www.cohu.com/contactors-sockets" },
    ],
  },
  {
    company: "Camtek", tier: 3,
    products: [
      { name: "Hawk G6 2D Inspection", description: "Optical 2D inspection system for advanced packaging substrates", url: "https://www.camtek.com/products/hawk/" },
      { name: "Falcon 3D Metrology", description: "3D metrology system for bump height and coplanarity on flip-chip wafers", url: "https://www.camtek.com/products/falcon/" },
      { name: "Golden Eagle Inspection", description: "AOI system for die-level defect detection in wafer packaging", url: "https://www.camtek.com/products/golden-eagle/" },
    ],
  },
  {
    company: "Park Systems", tier: 3,
    products: [
      { name: "NX20 Atomic Force Microscope", description: "Research AFM for 3D nanostructure imaging at angstrom resolution", url: "https://www.parksystems.com/products/park-nx20" },
      { name: "NX-Wafer Production AFM", description: "In-line production AFM for roughness and CMP endpoint metrology", url: "https://www.parksystems.com/products/park-nx-wafer" },
      { name: "Park FX40 Failure Analysis", description: "Cross-platform AFM for semiconductor failure analysis and process debug", url: "https://www.parksystems.com/products/park-fx40" },
    ],
  },
  {
    company: "Mycronic AB", tier: 3,
    products: [
      { name: "MY700 Jet Printer", description: "Inkjet solder paste printer for advanced electronics assembly", url: "https://www.mycronic.com/products/jet-printing/" },
      { name: "MYPro A40 Pick-and-Place", description: "High-flexibility SMD assembly machine for mixed-technology PCBs", url: "https://www.mycronic.com/products/assembly/" },
      { name: "SLX Laser Photoplotter", description: "Laser pattern generator for PCB phototools and semiconductor masks", url: "https://www.mycronic.com/products/pattern-generation/" },
      { name: "MY300SX SMD Tower Storage", description: "Automated SMD tape-reel storage and kitting system for PCB factories", url: "https://www.mycronic.com/products/high-mix/" },
    ],
  },
  {
    company: "Daifuku", tier: 3,
    products: [
      { name: "AMHS Overhead Transport", description: "Automated wafer carrier transport systems for 300mm semiconductor fabs", url: "https://www.daifuku.com/solution/semiconductor/" },
      { name: "Stocker Systems", description: "High-density automated FOUP stocker for wafer inventory management", url: "https://www.daifuku.com/solution/semiconductor/" },
      { name: "Automated Conveyor Systems", description: "Conveyor and sorter systems for semiconductor backend factories", url: "https://www.daifuku.com/solution/semiconductor/" },
    ],
  },
  {
    company: "Chroma ATE", tier: 3,
    products: [
      { name: "8200 SiC/GaN Power Tester", description: "Precision power semiconductor parametric tester for SiC and GaN", url: "https://www.chromaate.com/en/product/" },
      { name: "3260 PV Cell Tester", description: "Solar cell I-V curve tracer for wafer-level photovoltaic characterization", url: "https://www.chromaate.com/en/product/" },
      { name: "62000D SAS", description: "DC Power Supply programmable source for burn-in and functional test", url: "https://www.chromaate.com/en/product/" },
      { name: "8500 EV Battery Test System", description: "Battery cell and module test system for EV and energy storage", url: "https://www.chromaate.com/en/product/" },
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
  {
    company: "Yaskawa Electric", tier: 4,
    products: [
      { name: "Sigma-7 Servo Drives", description: "High-precision AC servo systems for semiconductor handling robots", url: "https://www.yaskawa.com/products/motion/sigma-servo-systems" },
      { name: "MOTOMAN GP Series Robots", description: "Industrial 6-axis robots for wafer handling and assembly automation", url: "https://www.yaskawa.com/products/robotics/industrial-robots" },
      { name: "A1000 AC Variable Frequency Drive", description: "General-purpose VFD for cleanroom HVAC and pump motor control", url: "https://www.yaskawa.com/products/drives/ac-drives" },
      { name: "SOLECTRIA PVI Inverters", description: "Solar inverters for fab roof-mounted PV energy systems", url: "https://www.yaskawa.com/products/drives/solar-inverters" },
    ],
  },
  {
    company: "Fanuc", tier: 4,
    products: [
      { name: "FANUC ROBODRILL", description: "High-speed precision CNC machining center for mold and semiconductor tooling", url: "https://www.fanuc.com/en-us/product/robodrill" },
      { name: "FANUC R-2000 Robot", description: "High-payload industrial robot for substrate and module handling", url: "https://www.fanuc.com/en-us/product/robot" },
      { name: "FANUC RoboShot Injection Molding", description: "Electric injection molding machine for semiconductor packaging molds", url: "https://www.fanuc.com/en-us/product/roboshot" },
      { name: "FANUC Linear Servo Motor", description: "Direct-drive linear motors for ultra-high-precision positioning stages", url: "https://www.fanuc.com/en-us/product/servo" },
      { name: "CNC Series 30i-B", description: "High-performance CNC controller for 5-axis machining of semiconductor fixtures", url: "https://www.fanuc.com/en-us/product/cnc" },
    ],
  },
  {
    company: "Parker Hannifin", tier: 4,
    products: [
      { name: "Gas Delivery Systems (SSD)", description: "Precision semiconductor gas panels for process tool gas delivery", url: "https://www.parker.com/us/en/divisions/industrial-gas-and-process/semiconductor.html" },
      { name: "Pneumatic Cylinders and Actuators", description: "Cleanroom-compatible pneumatic actuators for wafer handling systems", url: "https://www.parker.com/us/en/products/pneumatics.html" },
      { name: "Posi-flate Butterfly Valves", description: "High-purity butterfly isolation valves for gas and chemical lines", url: "https://www.parker.com/us/en/products/valves-and-fittings.html" },
      { name: "Schrader Bellows Solenoid Valves", description: "Pneumatic solenoid valves for cleanroom automation", url: "https://www.parker.com/us/en/products/pneumatics/solenoid-valves.html" },
    ],
  },
  {
    company: "SMC Corporation", tier: 4,
    products: [
      { name: "CJ2 Miniature Cylinders", description: "Ultra-compact pneumatic cylinders for wafer handling and clamping", url: "https://www.smcworld.com/products/en-jp/group/actuator/" },
      { name: "EX510 Fieldbus Systems", description: "Valve manifold systems with EtherNet/IP and PROFIBUS control", url: "https://www.smcworld.com/products/en-jp/group/valve_manifold/" },
      { name: "IDF Membrane Air Dryers", description: "Point-of-use membrane air dryers for cleanroom pneumatic systems", url: "https://www.smcworld.com/products/en-jp/group/dryer/" },
      { name: "VQ Solenoid Valve Series", description: "High-speed solenoid valves for rapid switching in semiconductor automation", url: "https://www.smcworld.com/products/en-jp/group/directional/" },
    ],
  },
  {
    company: "Inficon", tier: 4,
    products: [
      { name: "Transpector MPH RGA", description: "Residual gas analyzer for process chamber contamination monitoring", url: "https://www.inficon.com/en/products/process-instruments/residual-gas-analyzers" },
      { name: "ULTRATEST UL3000 Fab Leak Detector", description: "Helium and hydrogen leak detector for vacuum system integrity checks", url: "https://www.inficon.com/en/products/leak-detection" },
      { name: "SKY CDG Gauges", description: "Capacitance diaphragm gauges for ultra-precise process pressure measurement", url: "https://www.inficon.com/en/products/vacuum-gauges" },
      { name: "Q-pod EPD Sensor", description: "Endpoint detection system for plasma etch process control", url: "https://www.inficon.com/en/products/process-instruments" },
    ],
  },
  {
    company: "Horiba", tier: 4,
    products: [
      { name: "STEC Mass Flow Controllers", description: "High-precision gas MFCs for semiconductor CVD and etch processes", url: "https://www.horiba.com/en/process-control/products/mass-flow-controllers/" },
      { name: "FT-MFM Flow Monitor", description: "Coriolis mass flow meters for liquid chemical monitoring in CMP", url: "https://www.horiba.com/en/process-control/products/flow-measurement/" },
      { name: "EMIA-Pro Carbon/Sulfur Analyzer", description: "Combustion analyzer for trace carbon and sulfur in silicon and metals", url: "https://www.horiba.com/en/materials/products/carbon-sulfur-analyzers/" },
      { name: "LA-960 Laser Particle Analyzer", description: "Laser diffraction particle size analyzer for CMP slurry characterization", url: "https://www.horiba.com/en/scientific/products/particle-characterization/" },
    ],
  },
  {
    company: "Comet Group", tier: 4,
    products: [
      { name: "RF Power Generators (PCT)", description: "RF plasma power generators for etch and deposition chambers", url: "https://www.comet-group.com/en/divisions/plasma-control-technologies/rf-generators/" },
      { name: "Variable Capacitors (VVC)", description: "Vacuum variable capacitors for RF impedance matching networks", url: "https://www.comet-group.com/en/divisions/plasma-control-technologies/" },
      { name: "X-Ray Tubes (XRT)", description: "Micro-focus X-ray tubes for PCB and IC failure analysis systems", url: "https://www.comet-group.com/en/divisions/x-ray/x-ray-tubes/" },
    ],
  },
  {
    company: "Jenoptik", tier: 4,
    products: [
      { name: "JENlaser Diode Modules", description: "High-power laser diode modules for pump and direct applications", url: "https://www.jenoptik.com/products/lasers/laser-diode-modules" },
      { name: "Optical Systems (ENTOVIS)", description: "Precision optical systems for semiconductor metrology and inspection", url: "https://www.jenoptik.com/products/optical-systems" },
      { name: "Traffic Detection Sensors", description: "Laser-based traffic measurement and LiDAR systems", url: "https://www.jenoptik.com/products/traffic-solutions" },
    ],
  },
  {
    company: "Leybold", tier: 4,
    products: [
      { name: "VARODRY Dry Screw Pump", description: "Oil-free screw pump for cleanroom-compatible vacuum generation", url: "https://www.leybold.com/en/products/dry-compressing-vacuum-pumps/varodry" },
      { name: "TURBOVAC MAG Turbo Pump", description: "Magnetically levitated turbomolecular pump for ultra-high vacuum", url: "https://www.leybold.com/en/products/turbomolecular-pumps/turbovac-mag" },
      { name: "IONIVAC Measurement System", description: "Wide-range vacuum gauges for rough to ultra-high vacuum measurement", url: "https://www.leybold.com/en/products/vacuum-gauges" },
    ],
  },
  {
    company: "Cymer", tier: 4,
    products: [
      { name: "XLR 700i ArF Laser Source", description: "High-repetition-rate 193nm ArF excimer laser source for DUV immersion scanners", url: "https://www.cymer.com/light-sources/duv/" },
      { name: "LPP EUV Light Source", description: "Laser-produced plasma EUV source powering ASML NXE scanners", url: "https://www.cymer.com/light-sources/euv/" },
    ],
  },
  {
    company: "Gigaphoton", tier: 4,
    products: [
      { name: "GT60A ArF Immersion Laser", description: "193nm ArF excimer laser light source for DUV immersion lithography", url: "https://www.gigaphoton.com/products/light-source/" },
      { name: "GL series KrF Laser", description: "KrF 248nm laser source for mature-node lithography systems", url: "https://www.gigaphoton.com/products/light-source/" },
    ],
  },
  {
    company: "VDL Groep", tier: 4,
    products: [
      { name: "Precision Mechatronic Modules", description: "High-precision electromechanical assemblies for ASML scanner subsystems", url: "https://www.vdlgroep.com/en/divisions/industrial-manufacturing/precision-equipment/" },
      { name: "VDL ETG Mechatronics", description: "Complex mechatronic systems and modules for semiconductor equipment OEMs", url: "https://www.vdlgroep.com/en/divisions/industrial-manufacturing/precision-equipment/" },
      { name: "VDL Enabling Technologies", description: "Advanced system integration and industrialization for high-tech OEMs", url: "https://www.vdlgroep.com/en/divisions/industrial-manufacturing/" },
    ],
  },
  {
    company: "THK Co. Ltd.", tier: 4,
    products: [
      { name: "LM Guides (Linear Motion)", description: "Precision linear ball guides used in wafer stages and robot axes", url: "https://www.thk.com/?q=en/products/linearmotion" },
      { name: "Ball Screws", description: "High-lead precision ball screws for wafer handling linear actuators", url: "https://www.thk.com/?q=en/products/ballscrew" },
      { name: "Cross Roller Rings", description: "Ultra-compact cross roller bearings for rotary joints in wafer handling robots", url: "https://www.thk.com/?q=en/products/crossroller" },
    ],
  },
  {
    company: "NSK Ltd.", tier: 4,
    products: [
      { name: "Precision Ball Bearings (7900 Series)", description: "Ultra-precision angular contact bearings for spindle and stage applications", url: "https://www.nsk.com/products/precision/" },
      { name: "Mega Torque Motor Actuators", description: "Direct-drive motors for semiconductor wafer transfer robots", url: "https://www.nsk.com/products/mechatronics/" },
      { name: "Linear Guides (NH/NS Series)", description: "Miniature linear guides for compact precision motion stages", url: "https://www.nsk.com/products/linearguides/" },
    ],
  },
  {
    company: "Eaton Corporation", tier: 4,
    products: [
      { name: "Power Xpert Switchgear", description: "Medium-voltage switchgear for fab utility power distribution", url: "https://www.eaton.com/us/en-us/catalog/electrical-power-distribution.html" },
      { name: "Eaton UPS (9395P)", description: "3-phase UPS for semiconductor fab critical power protection", url: "https://www.eaton.com/us/en-us/catalog/ups-uninterruptible-power-supply.html" },
      { name: "PDUs for Data Centers", description: "Rack-mount power distribution units for server and fab tool power", url: "https://www.eaton.com/us/en-us/catalog/power-distribution-units-pdu.html" },
    ],
  },
  {
    company: "Vertiv Holdings", tier: 4,
    products: [
      { name: "Liebert EXL S1 UPS", description: "High-efficiency 3-phase UPS for semiconductor fab and data center", url: "https://www.vertiv.com/en-us/products-catalog/power-systems/" },
      { name: "Liebert DSE Precision Cooling", description: "Energy-efficient direct-expansion cooling for semiconductor tool bays", url: "https://www.vertiv.com/en-us/products-catalog/thermal-management/" },
      { name: "Geist PDUs", description: "Intelligent rack PDUs with remote power monitoring for fabs", url: "https://www.vertiv.com/en-us/products-catalog/power-management/" },
    ],
  },
  {
    company: "Schneider Electric", tier: 4,
    products: [
      { name: "Galaxy VX UPS", description: "Modular 3-phase UPS for large semiconductor fab power protection", url: "https://www.se.com/us/en/product-category/power-systems-and-services/" },
      { name: "EcoStruxure Building Management", description: "Integrated building automation for cleanroom environment control", url: "https://www.se.com/us/en/work/solutions/buildings/" },
      { name: "Square D Switchboards", description: "Medium and low-voltage electrical distribution for fab utility substations", url: "https://www.se.com/us/en/product-category/electrical-distribution/" },
    ],
  },
  {
    company: "ABB Ltd", tier: 4,
    products: [
      { name: "IRB 1200 Collaborative Robot", description: "Small collaborative robot for precision pick-and-place in electronics assembly", url: "https://new.abb.com/products/robotics/industrial-robots" },
      { name: "ACS880 Industrial Drive", description: "Variable speed drive for precision motor control in semiconductor HVAC", url: "https://new.abb.com/drives/low-voltage-ac/industrial-drives" },
      { name: "MV Power Products", description: "Medium-voltage switchgear and transformers for fab utility infrastructure", url: "https://new.abb.com/power-grids" },
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
  {
    company: "Schott AG", tier: 5,
    products: [
      { name: "BOROFLOAT 33 Borosilicate Glass", description: "Low-expansion glass for photomasks, MEMS substrates, and optical windows", url: "https://www.schott.com/en-us/products/borofloat-p1000318" },
      { name: "ZERODUR Glass-Ceramic", description: "Ultra-low thermal expansion glass-ceramic for precision mirror substrates in EUV optics", url: "https://www.schott.com/en-us/products/zerodur-p1000269" },
      { name: "Eternaloc Pharmaceutical Glass", description: "ISO Class 1 borosilicate glass tubing for pharmaceutical primary packaging", url: "https://www.schott.com/en-us/industries/pharma/" },
      { name: "Thin Glass (AF 32 eco)", description: "Ultra-thin glass wafers 25µm–1.1mm for display and semiconductor carrier plates", url: "https://www.schott.com/en-us/products/af-32-p1000007" },
    ],
  },
  {
    company: "PI Physik Instrumente", tier: 5,
    products: [
      { name: "PI Hexapod (H-811)", description: "6-DOF parallel kinematic positioning system for metrology and alignment", url: "https://www.pi.ws/products/parallel-kinematics-hexapods/" },
      { name: "Piezo Nanopositioning Stages (P-563)", description: "Sub-nanometer resolution piezo stages for AFM and optical alignment", url: "https://www.pi.ws/products/piezo-nanopositioning-stages/" },
      { name: "NEXLINE Linear Motor Stages", description: "Linear piezo motor stages for long-travel ultra-precise positioning", url: "https://www.pi.ws/products/piezo-linear-motor-stages/" },
      { name: "PIHera Piezo Actuators", description: "High-force piezo actuators for precision tip-tilt mirror and valve control", url: "https://www.pi.ws/products/piezo-actuators/" },
    ],
  },
  {
    company: "Heidenhain", tier: 5,
    products: [
      { name: "ERA 4000 Angle Encoder", description: "Exposed ring angle encoder for high-precision rotary axis feedback", url: "https://www.heidenhain.com/products/angle-encoders/ring-encoders/" },
      { name: "LIC 4000 Linear Encoder", description: "High-accuracy linear encoder for wafer stage displacement measurement", url: "https://www.heidenhain.com/products/linear-encoders/" },
      { name: "TNC 7 CNC Controller", description: "High-performance CNC controller for 5-axis machining of semiconductor fixtures", url: "https://www.heidenhain.com/products/cnc-controls/" },
      { name: "TS 760 Touch Probe", description: "High-precision workpiece touch probe for on-machine part inspection", url: "https://www.heidenhain.com/products/machine-inspection/" },
    ],
  },
  {
    company: "Maxon Motor", tier: 5,
    products: [
      { name: "EC-i 40 Brushless DC Motor", description: "Flat brushless DC motor for medical robots, prosthetics, and lab automation", url: "https://www.maxongroup.com/maxon/view/category/motor" },
      { name: "GP 32 Planetary Gearhead", description: "Ultra-precision planetary gearhead for stepper and BLDC motor integration", url: "https://www.maxongroup.com/maxon/view/category/gear" },
      { name: "EPOS4 Motion Controller", description: "Compact digital servo controller for positioning and speed control", url: "https://www.maxongroup.com/maxon/view/category/controller" },
    ],
  },
  {
    company: "Edmund Optics", tier: 5,
    products: [
      { name: "N-BK7 Precision Lenses", description: "Standard optical lenses in borosilicate glass for imaging and laser beam conditioning", url: "https://www.edmundoptics.com/f/lenses/10765/" },
      { name: "Bandpass Interference Filters", description: "Narrow-band optical filters for fluorescence microscopy and machine vision", url: "https://www.edmundoptics.com/f/bandpass-filters/" },
      { name: "UV Fused Silica Windows", description: "Low-scatter optical windows for UV and deep UV transmission", url: "https://www.edmundoptics.com/f/windows/10776/" },
      { name: "Optical Coatings Service", description: "Custom anti-reflection, HR, and beamsplitter coating services", url: "https://www.edmundoptics.com/knowledge-center/application-notes/optics/optical-coatings/" },
    ],
  },
  {
    company: "Thorlabs", tier: 5,
    products: [
      { name: "SM1 Cage Optomechanics System", description: "Modular optical cage assembly components for laser and imaging systems", url: "https://www.thorlabs.com/navigation.cfm?guide_id=2010" },
      { name: "Piezo Fiber Optic Switchers", description: "Fast fiber-optic switches for optical testing and telecommunications", url: "https://www.thorlabs.com/navigation.cfm?guide_id=2066" },
      { name: "InGaAs Photodetectors", description: "Near-infrared silicon and InGaAs photodetectors for optical test equipment", url: "https://www.thorlabs.com/newgrouppage9.cfm?objectgroup_id=10" },
      { name: "Laser Diode Mounts and Drivers", description: "Temperature-controlled mounts and precision current drivers for laser diodes", url: "https://www.thorlabs.com/navigation.cfm?guide_id=2000" },
    ],
  },
  {
    company: "Mitutoyo", tier: 5,
    products: [
      { name: "Crysta-Apex S CMM", description: "High-accuracy coordinate measuring machine for precision part inspection", url: "https://www.mitutoyo.com/products/coordinate-measuring-machines/" },
      { name: "PJ-A3000 Profile Projector", description: "Optical comparator for 2D profile measurement of small precision parts", url: "https://www.mitutoyo.com/products/form-measuring-machines/" },
      { name: "SURFTEST SJ-411 Surface Roughness", description: "Portable contact profilometer for surface finish and roughness measurement", url: "https://www.mitutoyo.com/products/surftest/" },
      { name: "Litematic VL-50A Height Gauge", description: "Precision pneumatic height gauge for IC lead and BGA ball height measurement", url: "https://www.mitutoyo.com/products/linear-gages/" },
    ],
  },
  {
    company: "W.L. Gore & Associates", tier: 5,
    products: [
      { name: "GORE-TEX Cleanroom Garments", description: "Laminated membrane cleanroom suits and gloves for ISO Class 1–5 fabs", url: "https://www.gore.com/products/clean-room-environments" },
      { name: "GORE Microporous Membrane Filters", description: "Ultra-clean gas filtration membranes for ultra-pure gas delivery", url: "https://www.gore.com/products/industrial-filtration" },
      { name: "GORE Cables for Fab Equipment", description: "Ultra-flexible, shielded cables for wafer handling robots in high-cycle applications", url: "https://www.gore.com/products/industrial-cables" },
      { name: "GORE Sealants", description: "Chemically resistant PTFE sealant tape for ultra-high-purity chemical fittings", url: "https://www.gore.com/products/industrial-sealants" },
    ],
  },
  {
    company: "Molex LLC", tier: 5,
    products: [
      { name: "MXC Board-to-Board Connector", description: "High-density board-to-board connector for compact electronics assemblies", url: "https://www.molex.com/en-us/products/connectors/board-to-board" },
      { name: "iPass+ Cable Assemblies", description: "High-speed cable assemblies for storage and server internal connections", url: "https://www.molex.com/en-us/products/connectors/cable-assemblies" },
      { name: "Mini-Fit Sr Power Connectors", description: "High-current power connectors for PC power supply and server boards", url: "https://www.molex.com/en-us/products/connectors/power" },
      { name: "SL Connector System", description: "Single-row crimp headers — the standard discrete wire connector family", url: "https://www.molex.com/en-us/products/connectors/crimp-housing" },
    ],
  },
  {
    company: "Sensata Technologies", tier: 5,
    products: [
      { name: "Pressure Sensors (IPTE11)", description: "Industrial and automotive pressure sensors for HVAC and powertrain", url: "https://www.sensata.com/products/sensors/pressure-sensors" },
      { name: "Current Sensors (LXS Series)", description: "Hall-effect current sensors for EV battery management systems", url: "https://www.sensata.com/products/sensors/current-sensors" },
      { name: "Contactors (Gigavac)", description: "High-voltage DC contactors for EV battery pack switching", url: "https://www.sensata.com/products/contactors" },
      { name: "Thermistors (NTC)", description: "NTC thermistors for temperature sensing in power electronics and batteries", url: "https://www.sensata.com/products/sensors/temperature-sensors" },
    ],
  },
  {
    company: "Largan Precision", tier: 5,
    products: [
      { name: "Smartphone Camera Lenses", description: "High-resolution plastic aspherical lens assemblies for flagship smartphone cameras", url: "https://www.largan.com.tw/en/product/" },
      { name: "Automotive Camera Lenses", description: "Glass-hybrid optical lenses for ADAS surround-view camera systems", url: "https://www.largan.com.tw/en/product/" },
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
  {
    company: "Ajinomoto Fine-Techno", tier: 6,
    products: [
      { name: "ABF (Ajinomoto Build-up Film)", description: "The dominant insulating interlayer film for FC-BGA package substrates for all modern CPUs and GPUs", url: "https://www.ajinomoto-fine-techno.co.jp/en/product/abf/" },
      { name: "GX Series ABF (Thin Core)", description: "Thin-core ABF variants for ultra-thin chip package substrates", url: "https://www.ajinomoto-fine-techno.co.jp/en/product/abf/" },
    ],
  },
  {
    company: "Resonac", tier: 6,
    products: [
      { name: "CMP Slurry (GPX Series)", description: "High-selectivity CMP slurry for tungsten, copper, and silicon oxide polishing", url: "https://www.resonac.com/en/products/semiconductor/cmp-slurry/" },
      { name: "G-COAT Photoresist Undercoat", description: "Phenyl polysiloxane undercoat for EUV and ArF photoresist adhesion", url: "https://www.resonac.com/en/products/semiconductor/photoresist/" },
      { name: "Epoxy Molding Compound (EMC)", description: "Black molding compounds for IC package encapsulation", url: "https://www.resonac.com/en/products/semiconductor/emc/" },
      { name: "Sealing Films", description: "Encapsulation films for wafer-level fan-out packaging", url: "https://www.resonac.com/en/products/semiconductor/" },
    ],
  },
  {
    company: "AT&S", tier: 6,
    products: [
      { name: "IC Substrates (SFC)", description: "Substrate-like PCBs and IC package substrates for mobile processors", url: "https://www.ats.net/en/products/ic-substrates/" },
      { name: "ECP (Embedded Component Packaging)", description: "PCBs with embedded active dies for ultra-compact power modules", url: "https://www.ats.net/en/products/embedded-component-packaging/" },
      { name: "HDI PCBs", description: "High-density interconnect boards for smartphones and wearables", url: "https://www.ats.net/en/products/high-density-interconnect/" },
      { name: "mSAP PCBs", description: "Modified semi-additive process boards for 5G antenna modules", url: "https://www.ats.net/en/products/msap/" },
    ],
  },
  {
    company: "Taiyo Nippon Sanso", tier: 6,
    products: [
      { name: "Ultra-Pure Nitrogen", description: "Nitrogen gas supply and on-site generation for fab purging and blanketing", url: "https://www.tn-sanso.co.jp/en/products/semiconductor/" },
      { name: "Ultra-Pure Oxygen", description: "High-purity O2 for thermal oxidation and PECVD process gases", url: "https://www.tn-sanso.co.jp/en/products/semiconductor/" },
      { name: "Bulk Argon", description: "Ultra-high-purity argon for sputtering and plasma processes", url: "https://www.tn-sanso.co.jp/en/products/semiconductor/" },
      { name: "NF3 Chamber Clean Gas", description: "Nitrogen trifluoride for remote plasma chamber cleaning in CVD tools", url: "https://www.tn-sanso.co.jp/en/products/semiconductor/" },
    ],
  },
  {
    company: "Ibiden Co. Ltd.", tier: 6,
    products: [
      { name: "FC-BGA Package Substrates", description: "High-layer-count FC-BGA substrates for AI accelerators and server CPUs", url: "https://www.ibiden.com/en/business/electronic-components/" },
      { name: "IBIDEN SLC Build-up Film Substrate", description: "Surface Laminar Circuit substrates for high-pin-count BGA packaging", url: "https://www.ibiden.com/en/business/electronic-components/" },
      { name: "Ceramic Substrates", description: "Aluminium nitride and alumina ceramic substrates for high-power LED and RF modules", url: "https://www.ibiden.com/en/business/electronic-components/" },
    ],
  },
  {
    company: "Indium Corporation", tier: 6,
    products: [
      { name: "Indium Solder Alloys", description: "Low-melting-point indium solder and preforms for thermoelectric and optical bonding", url: "https://www.indium.com/soldering/indium-alloys/" },
      { name: "SAC305 Solder Paste", description: "Lead-free SnAgCu solder paste for SMT assembly of PCBs", url: "https://www.indium.com/soldering/solder-pastes/" },
      { name: "Indium Thermal Interface Material", description: "Solid indium TIM for die-to-heat-spreader bonding in CPUs and power modules", url: "https://www.indium.com/thermal-management/thermal-interface-materials/" },
      { name: "Electroplating Solutions", description: "Indium, tin, and solder electroplating chemistry for lead frame finishing", url: "https://www.indium.com/electroplating/" },
    ],
  },
  {
    company: "Senju Metal Industry", tier: 6,
    products: [
      { name: "M705 Lead-Free Solder Wire", description: "SAC305 lead-free solder wire for hand soldering and auto-feed systems", url: "https://www.senju-m.co.jp/en/product/solder/" },
      { name: "Ultra-Low-Void Solder Paste (SMLF)", description: "Low-void solder paste for die-attach in power module assembly", url: "https://www.senju-m.co.jp/en/product/paste/" },
      { name: "Eco Solder Bar", description: "Lead-free solder bar for wave soldering of through-hole PCBs", url: "https://www.senju-m.co.jp/en/product/bar/" },
    ],
  },
  {
    company: "Siltronic AG", tier: 6,
    products: [
      { name: "300mm Prime Silicon Wafers", description: "CZ-grown prime polished silicon wafers for leading-edge logic production", url: "https://www.siltronic.com/en/silicon-wafers/silicon-wafers.html" },
      { name: "Epitaxial Silicon Wafers", description: "Epi wafers with custom p-type or n-type epitaxial layers for power and logic", url: "https://www.siltronic.com/en/silicon-wafers/silicon-wafers.html" },
      { name: "FZ (Float Zone) Silicon Wafers", description: "Highest-purity float-zone silicon for power devices and solar cells", url: "https://www.siltronic.com/en/silicon-wafers/silicon-wafers.html" },
    ],
  },
  {
    company: "GlobalWafers", tier: 6,
    products: [
      { name: "300mm CZ Polished Wafers", description: "Czochralski silicon wafers for leading-edge foundry production", url: "https://www.globalwafers.com.tw/en/products/silicon_wafer.html" },
      { name: "200mm Epitaxial Wafers", description: "Epi wafers for automotive, power management, and analog IC fabs", url: "https://www.globalwafers.com.tw/en/products/silicon_wafer.html" },
      { name: "SOI Wafers", description: "Silicon-on-insulator wafers for RF-SOI and FD-SOI process platforms", url: "https://www.globalwafers.com.tw/en/products/soi_wafer.html" },
    ],
  },
  {
    company: "SK Siltron", tier: 6,
    products: [
      { name: "300mm CZ Silicon Wafers", description: "Prime polished wafers for Samsung Foundry and SK Hynix production", url: "https://www.sksiltron.com/en/products" },
      { name: "SiC Epitaxial Wafers (4H-SiC)", description: "4H-SiC substrates and epi wafers for power semiconductor production", url: "https://www.sksiltron.com/en/products/sic" },
    ],
  },
  {
    company: "Kinsus Interconnect Technology", tier: 6,
    products: [
      { name: "FC-BGA Substrates", description: "High-density flip-chip BGA substrates for mobile SoCs", url: "https://www.kinsus.com.tw/en/product/" },
      { name: "BOC Chip-on-Board Substrates", description: "PCB substrates for LED chip-on-board modules", url: "https://www.kinsus.com.tw/en/product/" },
    ],
  },
  {
    company: "Nitto Denko", tier: 6,
    products: [
      { name: "Dicing Tape", description: "UV-release dicing tape for wafer sawing and laser dicing processes", url: "https://www.nitto.com/jp/en/products/group/semiconductor_related_tape/" },
      { name: "Die Bonding Film (DAF)", description: "Die-attach film for stacked NAND and DRAM package assembly", url: "https://www.nitto.com/jp/en/products/group/semiconductor_related_tape/" },
      { name: "Protective Film for Grinding", description: "Surface protective tape applied to wafer frontside during backside grinding", url: "https://www.nitto.com/jp/en/products/group/semiconductor_related_tape/" },
      { name: "Optical Films", description: "Polarizer and retardation films for LCD and OLED display panels", url: "https://www.nitto.com/jp/en/products/group/optical_film/" },
    ],
  },
  {
    company: "DuPont Electronic Solutions", tier: 6,
    products: [
      { name: "LuxFilm Dry Film Photoresist", description: "Dry film photoresist for PCB circuit patterning and advanced packaging", url: "https://www.dupont.com/electronics-industrial/photoresists.html" },
      { name: "Pyralux Flexible Laminates", description: "Adhesive and adhesiveless copper-clad laminates for flex circuit boards", url: "https://www.dupont.com/electronics-industrial/flexible-laminates.html" },
      { name: "Brillant CMP Slurries", description: "Tungsten and TEOS CMP slurry for semiconductor interconnect polishing", url: "https://www.dupont.com/electronics-industrial/cmp-slurries.html" },
      { name: "Kapton Polyimide Film", description: "Thermally stable polyimide film for flexible PCBs and insulation", url: "https://www.dupont.com/electronics-industrial/kapton-polyimide-film.html" },
    ],
  },
  {
    company: "Arkema", tier: 6,
    products: [
      { name: "Kynar PVDF", description: "Polyvinylidene fluoride tubing and fittings for ultra-pure chemical handling in fabs", url: "https://www.arkema.com/global/en/products/product-finder/product/kynar/" },
      { name: "Photoresist Polymers", description: "Specialty polymer platforms for EUV and ArF photoresist formulation", url: "https://www.arkema.com/global/en/markets/electronics/photoresists/" },
      { name: "Rilsan Polyamide 11", description: "Bio-sourced PA11 for flexible semiconductor equipment tubing", url: "https://www.arkema.com/global/en/products/product-finder/product/rilsan/" },
    ],
  },
  {
    company: "Sumitomo Chemical", tier: 6,
    products: [
      { name: "LCD Polarizer Films", description: "World's largest supplier of LCD polarizing plates for TV and IT displays", url: "https://www.sumitomo-chem.co.jp/english/business/it/product/display.html" },
      { name: "OLED Light-Emitting Materials", description: "Organic light-emitting dopant materials for OLED display panels", url: "https://www.sumitomo-chem.co.jp/english/business/it/product/oled.html" },
      { name: "Alumina Slurry (Sumicorundum)", description: "High-purity alumina abrasive for oxide CMP slurry", url: "https://www.sumitomo-chem.co.jp/english/business/it/" },
    ],
  },
  {
    company: "MacDermid Alpha Electronics", tier: 6,
    products: [
      { name: "ALPHA OM-338 Solder Paste", description: "Lead-free SAC305 solder paste for high-reliability PCB assembly", url: "https://www.macdermidalpha.com/electronics-assembly/products/solder-pastes" },
      { name: "ALPHA® Flux Products", description: "No-clean and water-soluble flux solutions for wave and selective soldering", url: "https://www.macdermidalpha.com/electronics-assembly/products/fluxes" },
      { name: "CIRCUPOSIT Electroless Copper", description: "Electroless copper deposition chemistry for PCB via plating", url: "https://www.macdermidalpha.com/circuit-board-assembly/products/" },
    ],
  },
  {
    company: "Henkel Electronic Materials", tier: 6,
    products: [
      { name: "LOCTITE GC 10 Solder Paste", description: "High-reliability no-clean solder paste for advanced SMT assembly", url: "https://www.henkel-adhesives.com/us/en/products/electronic-components/solder-paste.html" },
      { name: "LOCTITE Ablestik Die Attach", description: "Silver-filled conductive adhesive for semiconductor die attach", url: "https://www.henkel-adhesives.com/us/en/products/electronic-components/die-attach.html" },
      { name: "LOCTITE ECCOBOND Underfill", description: "Capillary and no-flow underfill for flip-chip and BGA rework protection", url: "https://www.henkel-adhesives.com/us/en/products/electronic-components/underfills.html" },
      { name: "Bonderite Etching Chemistry", description: "PCB micro-etching chemistry for copper surface preparation", url: "https://www.henkel-adhesives.com/us/en/products/surface-treatment.html" },
    ],
  },
  {
    company: "Heraeus Electronics", tier: 6,
    products: [
      { name: "Bonding Wire (Bonder Bond)", description: "Gold, copper, and silver alloy bonding wire for IC wire bonding", url: "https://www.heraeus.com/en/hpm/bonding_wire_and_ribbon/bonding_wire_and_ribbon.html" },
      { name: "Thick-Film Pastes", description: "Silver and gold paste for ceramic substrate metallization", url: "https://www.heraeus.com/en/hpm/thick_film_materials/thick_film_materials.html" },
      { name: "Sinter Silver Paste", description: "Low-temperature sintered silver die-attach paste for SiC power modules", url: "https://www.heraeus.com/en/hpm/die_attach/die_attach.html" },
      { name: "Protective Coatings (SolderCoat)", description: "Tin-silver conformal coatings for PCB corrosion protection", url: "https://www.heraeus.com/en/hpm/coatings/coatings.html" },
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
  {
    company: "The Quartz Corp", tier: 7,
    products: [
      { name: "High-Purity Quartz Sand", description: "Ultra-high-purity quartz (>99.998% SiO2) for synthetic fused silica and solar polysilicon production", url: "https://www.thequartzcorp.com/en/products/high-purity-quartz/" },
      { name: "Quartz Lumps and Granules", description: "Processed quartz feedstock for EUV optic blank and lamp manufacturing", url: "https://www.thequartzcorp.com/en/products/high-purity-quartz/" },
    ],
  },
  {
    company: "Hemlock Semiconductor", tier: 7,
    products: [
      { name: "Electronic-Grade Polysilicon", description: "Siemens-process polysilicon for silicon wafer manufacturing", url: "https://www.hscpoly.com/products/" },
      { name: "Granular Polysilicon", description: "Fluidized-bed reactor polysilicon for direct Czochralski crystal growing", url: "https://www.hscpoly.com/products/" },
    ],
  },
  {
    company: "Tokuyama Corporation", tier: 7,
    products: [
      { name: "Polycrystalline Silicon (Tokuyama grade)", description: "High-purity polysilicon for semiconductor-grade silicon wafer production", url: "https://www.tokuyama.co.jp/en/products/semiconductor/" },
      { name: "Fumed Silica (Reolosil)", description: "Pyrogenic silica for CMP slurry and rubber compound reinforcement", url: "https://www.tokuyama.co.jp/en/products/functional_materials/" },
      { name: "Silicon Tetrachloride (SiCl4)", description: "Chemical vapor deposition precursor for optical fiber and specialty coatings", url: "https://www.tokuyama.co.jp/en/products/semiconductor/" },
    ],
  },
  {
    company: "REC Silicon", tier: 7,
    products: [
      { name: "Granular Polysilicon (FBR)", description: "Fluidized-bed-reactor polysilicon for solar and semiconductor wafer growth", url: "https://www.recsilicon.com/products/" },
      { name: "Silane Gas (SiH4)", description: "High-purity monosilane gas for CVD thin-film deposition processes", url: "https://www.recsilicon.com/products/" },
    ],
  },
  {
    company: "Daqo New Energy", tier: 7,
    products: [
      { name: "High-Purity Polysilicon (Grade N)", description: "N-type semiconductor-grade polysilicon for advanced wafer production", url: "https://www.daqonewenergy.com/products/polysilicon" },
      { name: "Solar-Grade Polysilicon", description: "High-volume polysilicon feedstock for crystalline silicon solar cell production", url: "https://www.daqonewenergy.com/products/polysilicon" },
    ],
  },
  {
    company: "Iluka Resources", tier: 7,
    products: [
      { name: "Rutile (High-Grade TiO2)", description: "Natural rutile titanium dioxide feedstock for pigment and titanium metal", url: "https://www.iluka.com/products/products-minerals/rutile/" },
      { name: "Zircon", description: "Zirconium silicate for advanced ceramics, refractory linings, and opacifiers", url: "https://www.iluka.com/products/products-minerals/zircon/" },
      { name: "Synthetic Rutile", description: "Upgraded ilmenite for titanium production and high-purity TiO2 chemistry", url: "https://www.iluka.com/products/products-minerals/synthetic-rutile/" },
    ],
  },
  {
    company: "Tronox", tier: 7,
    products: [
      { name: "Titanium Dioxide Pigment (TR-93)", description: "High-performance TiO2 pigment for plastics, coatings, and laminates", url: "https://www.tronox.com/products/titanium-dioxide/" },
      { name: "Zirconium Chemicals", description: "Zirconium oxychloride and other Zr compounds for advanced ceramics and electronics", url: "https://www.tronox.com/products/zirconium-chemicals/" },
      { name: "Titanium Metal Feedstock", description: "Chloride-process TiO2 slag for titanium metal sponge production", url: "https://www.tronox.com/products/" },
    ],
  },
  {
    company: "Glencore", tier: 7,
    products: [
      { name: "Copper Concentrate", description: "Mined copper concentrate from Antamina, Collahuasi, and Katanga operations", url: "https://www.glencore.com/what-we-do/metals-and-minerals/copper" },
      { name: "Cobalt", description: "Refined cobalt hydroxide from DRC for EV battery cathode materials", url: "https://www.glencore.com/what-we-do/metals-and-minerals/cobalt" },
      { name: "Zinc", description: "Refined zinc from Mount Isa and Lady Loretta for galvanizing and chemicals", url: "https://www.glencore.com/what-we-do/metals-and-minerals/zinc" },
      { name: "Nickel", description: "Nickel sulphate and refined nickel for EV batteries and stainless steel", url: "https://www.glencore.com/what-we-do/metals-and-minerals/nickel" },
    ],
  },
  {
    company: "Anglo American", tier: 7,
    products: [
      { name: "Platinum Group Metals (PGMs)", description: "Platinum, palladium, and rhodium for catalytic converters, fuel cells, and electronics", url: "https://www.angloamerican.com/our-business/pgms" },
      { name: "Copper (Los Bronces / Quellaveco)", description: "Mined and refined copper for electrical wiring and semiconductor packaging", url: "https://www.angloamerican.com/our-business/copper" },
      { name: "Diamonds (De Beers)", description: "Rough diamonds via De Beers subsidiary for industrial cutting tools", url: "https://www.angloamerican.com/our-business/diamonds" },
      { name: "Crop Nutrients (Woodsmith)", description: "Ultra-high-grade polyhalite for fertilizer — long-term supply for downstream", url: "https://www.angloamerican.com/our-business/crop-nutrients" },
    ],
  },
  {
    company: "Codelco", tier: 7,
    products: [
      { name: "Refined Copper Cathode (Grade A)", description: "LME Grade A electrolytic copper cathode from Chuquicamata and Escondida", url: "https://www.codelco.com/en/codelco/the-company/products" },
      { name: "Copper Rod", description: "Continuous cast copper rod for wire drawing and cable manufacturing", url: "https://www.codelco.com/en/codelco/the-company/products" },
      { name: "Molybdenite Concentrate", description: "Molybdenum disulfide byproduct for refining into Mo oxide and ferromolybdenum", url: "https://www.codelco.com/en/codelco/the-company/products" },
    ],
  },
  {
    company: "Tianqi Lithium", tier: 7,
    products: [
      { name: "Lithium Concentrate (Spodumene)", description: "Mined spodumene lithium ore from the Greenbushes mine in Australia", url: "https://www.tianqilithium.com/en/products.html" },
      { name: "Battery-Grade Lithium Hydroxide", description: "Refined LiOH for EV battery cathode material production", url: "https://www.tianqilithium.com/en/products.html" },
    ],
  },
  {
    company: "Pilbara Minerals", tier: 7,
    products: [
      { name: "Spodumene Concentrate (SC6)", description: "6% Li2O spodumene lithium ore for lithium chemical conversion", url: "https://www.pilbaraminerals.com.au/operations/pilgangoora-operation/" },
      { name: "P680 Lithia-Rich Tantalite", description: "Tantalum byproduct from lithium mining for capacitor and cutting tool use", url: "https://www.pilbaraminerals.com.au/operations/" },
    ],
  },
  {
    company: "China Molybdenum", tier: 7,
    products: [
      { name: "Molybdenum Concentrate", description: "MoS2 concentrate for roasting into MoO3 oxide for steel and alloys", url: "https://www.cmoc.com/en/Business/mining/" },
      { name: "Cobalt Hydroxide (Tenke)", description: "Cobalt hydroxide from DRC Tenke-Fungurume mine for EV battery cathodes", url: "https://www.cmoc.com/en/Business/mining/" },
      { name: "Copper Cathode", description: "Refined copper from Tenke-Fungurume for electronics and cable", url: "https://www.cmoc.com/en/Business/mining/" },
      { name: "Niobium Oxide", description: "Nb2O5 from Brazil Niobras operations for high-strength steel and ceramics", url: "https://www.cmoc.com/en/Business/mining/" },
    ],
  },
  {
    company: "Eramet", tier: 7,
    products: [
      { name: "High-Grade Manganese Ore (COMILOG)", description: "High-purity manganese ore from Gabon for battery and steel production", url: "https://www.eramet.com/en/activities/high-performance-alloys/manganese" },
      { name: "Nickel Matte (SLN)", description: "Nickel matte and refined nickel from New Caledonia for stainless and batteries", url: "https://www.eramet.com/en/activities/high-performance-alloys/nickel" },
      { name: "Lithium from Brines (Argentina)", description: "Direct lithium extraction from Centenario-Ratones brine deposit", url: "https://www.eramet.com/en/activities/mining/lithium" },
    ],
  },
  {
    company: "LG Chem", tier: 7,
    products: [
      { name: "EV Battery Cells (NCMA Cathode)", description: "High-nickel NCMA battery cells for electric vehicles — supplied to GM, Hyundai", url: "https://www.lgchem.com/global/green-energy/battery-cell" },
      { name: "ABS Plastics", description: "Acrylonitrile-butadiene-styrene engineering plastic for electronics enclosures", url: "https://www.lgchem.com/global/chemical/synthetic-resin" },
      { name: "OLED Encapsulation Materials", description: "Thin-film encapsulation materials for flexible OLED display panels", url: "https://www.lgchem.com/global/information-electronic/display" },
      { name: "Separators (ESS)", description: "Lithium-ion battery separator film for energy storage systems", url: "https://www.lgchem.com/global/green-energy/battery-materials" },
    ],
  },
  {
    company: "BASF SE", tier: 7,
    products: [
      { name: "Cathode Active Materials", description: "NMC and LMFP cathode materials for EV and stationary storage batteries", url: "https://www.basf.com/global/en/industries/automotive/battery-materials.html" },
      { name: "Electronic Chemicals", description: "Ultra-pure etchants, cleaning agents, and process chemicals for semiconductor fabs", url: "https://www.basf.com/global/en/industries/electronics/semiconductor.html" },
      { name: "Functional Plastics (Ultradur)", description: "PBT and PPS engineering plastics for electronic connectors and housings", url: "https://www.basf.com/global/en/industries/electronics/plastics-electronics.html" },
      { name: "Polyurethane Systems (Elastolit)", description: "Structural PU composites for lightweight EV battery enclosures", url: "https://www.basf.com/global/en/industries/automotive/lightweight-construction.html" },
    ],
  },
  {
    company: "Eastman Chemical Company", tier: 7,
    products: [
      { name: "Tritan Copolyester", description: "BPA-free copolyester for semiconductor equipment tubing and fluid handling", url: "https://www.eastman.com/brand/tritan-copolyester" },
      { name: "Saflex PVB Interlayer", description: "Polyvinyl butyral interlayer for automotive and architectural laminated glass", url: "https://www.eastman.com/brand/saflex" },
      { name: "Acetate Tow", description: "Cellulose acetate fiber tow for specialty filter and optical film production", url: "https://www.eastman.com/brand/acetate-tow" },
    ],
  },
  {
    company: "Hanwha Solutions", tier: 7,
    products: [
      { name: "Polysilicon (Hanwha Q Cells)", description: "Solar-grade polysilicon produced in Korea for upstream PV supply", url: "https://www.hanwhasolutions.com/en/business/chemicals/solar/" },
      { name: "Chlorine / Caustic Soda", description: "Electrolysis-based chlor-alkali products for specialty chemical feedstocks", url: "https://www.hanwhasolutions.com/en/business/chemicals/" },
      { name: "PVC Compounds", description: "PVC insulation and sheath compounds for cable and wire manufacturing", url: "https://www.hanwhasolutions.com/en/business/chemicals/" },
    ],
  },
  {
    company: "Sumitomo Metal Mining", tier: 7,
    products: [
      { name: "Electrolytic Copper", description: "High-purity refined copper from Toyo and Harima smelters", url: "https://www.smm.co.jp/E/products/copper/" },
      { name: "Nickel (Hyuga Smelter)", description: "Ferro-nickel and battery-grade nickel sulphate for EV batteries", url: "https://www.smm.co.jp/E/products/nickel/" },
      { name: "Gold and Silver", description: "Precious metal refining byproducts from copper smelting operations", url: "https://www.smm.co.jp/E/products/precious/" },
      { name: "NiMH Battery Positive Electrode Materials", description: "Nickel hydroxide positive electrode for hybrid vehicle batteries", url: "https://www.smm.co.jp/E/products/battery/" },
    ],
  },
  {
    company: "Mitsubishi Materials", tier: 7,
    products: [
      { name: "Copper Smelting (Naoshima)", description: "Refined copper cathode, copper rod, and byproduct precious metals", url: "https://www.mmc.co.jp/corporate/en/business/copper/" },
      { name: "Cemented Carbide (Carbide Tools)", description: "WC-Co sintered carbide inserts and end mills for precision machining", url: "https://www.mmc.co.jp/corporate/en/business/carbide_tools/" },
      { name: "Aluminum and Copper Strip", description: "Precision-rolled metal strip for semiconductor lead frames and connectors", url: "https://www.mmc.co.jp/corporate/en/business/metal_products/" },
    ],
  },
  {
    company: "South32", tier: 7,
    products: [
      { name: "Alumina / Aluminium (Worsley)", description: "Bauxite mining and alumina refining in Western Australia", url: "https://www.south32.net/our-operations/australia/worsley-alumina" },
      { name: "Manganese Ore (South Africa)", description: "High-grade manganese ore for steel alloy and battery cathode", url: "https://www.south32.net/our-operations/south-africa/south-africa-manganese" },
      { name: "Zinc / Lead / Silver (Cannington)", description: "Polymetallic zinc, lead, and silver from Queensland for chemicals and electronics", url: "https://www.south32.net/our-operations/australia/cannington" },
    ],
  },
  {
    company: "Denka Company", tier: 7,
    products: [
      { name: "Aluminum Nitride Substrates", description: "High-thermal-conductivity AlN ceramic substrates for power module packaging", url: "https://www.denka.co.jp/en/specialty/almighty.html" },
      { name: "Acetylene Black", description: "Highly conductive carbon black for lithium-ion battery electrode conductivity", url: "https://www.denka.co.jp/en/specialty/acetylene_black.html" },
      { name: "SAP (Superabsorbent Polymer)", description: "Polyacrylate SAP for chemical mechanical planarization pads and hygiene", url: "https://www.denka.co.jp/en/" },
    ],
  },
  {
    company: "Tokai Carbon", tier: 7,
    products: [
      { name: "Isostatic Graphite", description: "Ultra-pure isostatic graphite for semiconductor CVD susceptors and electrodes", url: "https://www.tokaicarbon.co.jp/en/products/carbon/isostatic_graphite/" },
      { name: "Carbon Black (Seast Series)", description: "Reinforcing carbon blacks for rubber compounds and conductive plastics", url: "https://www.tokaicarbon.co.jp/en/products/carbon_black/" },
      { name: "SiC Coated Graphite Components", description: "Silicon carbide coated graphite for epitaxial and CVD chamber parts", url: "https://www.tokaicarbon.co.jp/en/products/carbon/" },
    ],
  },
  {
    company: "Asahi Kasei", tier: 7,
    products: [
      { name: "HIPORE Separator Film", description: "Wet-process polyethylene separator for lithium-ion battery cells", url: "https://www.asahi-kasei.co.jp/en/solutions/mobility/battery-separator.html" },
      { name: "SUNFORT Photoresist Film", description: "Dry film photoresist for PCB and advanced packaging patterning", url: "https://www.asahi-kasei.co.jp/en/solutions/electronics/electronic-materials.html" },
      { name: "PIM Ion Exchange Membrane", description: "Bipolar ion exchange membranes for electrolysis and water treatment", url: "https://www.asahi-kasei.co.jp/en/solutions/" },
      { name: "Leona Polyamide 66", description: "Engineering polyamide for automotive connectors and precision housings", url: "https://www.asahi-kasei.co.jp/en/solutions/automotive/polyamide.html" },
    ],
  },
  {
    company: "Tosoh Corporation", tier: 7,
    products: [
      { name: "ALD Precursors (TDMA-Hf)", description: "Tetrakis(dimethylamido)hafnium — ALD precursor for HfO2 high-k gate dielectrics", url: "https://www.tosoh.com/en/business/electronic_materials/" },
      { name: "Zirconia Powders", description: "High-purity ZrO2 for structural ceramics and fuel cell electrolytes", url: "https://www.tosoh.com/en/business/materials/" },
      { name: "Silica Gel", description: "High-surface-area silica for chromatography and chemical purification", url: "https://www.tosoh.com/en/business/materials/" },
    ],
  },
  {
    company: "Mitsui Chemicals", tier: 7,
    products: [
      { name: "APEL Cyclic Olefin Polymer (COP)", description: "Ultra-transparent, low-birefringence polymer for semiconductor photomask pellicles", url: "https://www.mitsuichem.com/en/release/2021/products/apel/" },
      { name: "Admer Adhesive Resin", description: "Multi-layer adhesive resin for flexible packaging and barrier films", url: "https://www.mitsuichem.com/en/business/functional_polymers/admer/" },
      { name: "LUCANT HC Oil", description: "Ethylene-α-olefin polymer oil for high-performance lubricants", url: "https://www.mitsuichem.com/en/business/" },
    ],
  },
  {
    company: "LyondellBasell Industries", tier: 7,
    products: [
      { name: "Adstif Polypropylene", description: "Specialty PP grades for thin-wall electronic packaging and semiconductor tape reels", url: "https://www.lyondellbasell.com/en/polymers/polypropylene/" },
      { name: "Hostalen HDPE", description: "High-density polyethylene for chemical bottles, drums, and fab container liners", url: "https://www.lyondellbasell.com/en/polymers/polyethylene/" },
      { name: "Catalloy Polyolefin", description: "Reactor-made polyolefin alloys for automotive and construction applications", url: "https://www.lyondellbasell.com/en/polymers/" },
    ],
  },
  {
    company: "INEOS Group", tier: 7,
    products: [
      { name: "INEOS Olefins and Polymers", description: "Ethylene, propylene, and polyolefins as base chemicals for downstream synthesis", url: "https://www.ineos.com/businesses/ineos-o-and-p-usa/" },
      { name: "INEOS Inovyn (PVC / Chlorine)", description: "Chlorine and PVC for chemical synthesis and semiconductor-grade HCl production", url: "https://www.ineos.com/businesses/ineos-inovyn/" },
      { name: "INEOS Oligomers (PAO Synthetics)", description: "Poly-alpha-olefin synthetic lubricants for semiconductor equipment bearing lubrication", url: "https://www.ineos.com/businesses/ineos-oligomers/" },
    ],
  },
  {
    company: "Sinopec", tier: 7,
    products: [
      { name: "Electronic-Grade Sulfuric Acid", description: "Ultra-pure H2SO4 for semiconductor wet clean and etch applications", url: "https://www.sinopec.com/listco/en/products/chemical.shtml" },
      { name: "Electronic-Grade Isopropanol (IPA)", description: "High-purity IPA for wafer rinsing and photoresist stripping", url: "https://www.sinopec.com/listco/en/products/chemical.shtml" },
      { name: "Polypropylene Resins", description: "PP granules for injection-molded semiconductor component packaging", url: "https://www.sinopec.com/listco/en/products/chemical.shtml" },
    ],
  },
  {
    company: "PetroChina", tier: 7,
    products: [
      { name: "Electronic-Grade Acetone", description: "High-purity acetone solvent for photoresist and polymer synthesis", url: "https://www.petrochina.com.cn/en/" },
      { name: "Ethylene Glycol", description: "Ethylene glycol feedstock for polyester and specialty polymer production", url: "https://www.petrochina.com.cn/en/" },
    ],
  },
  {
    company: "Reliance Industries", tier: 7,
    products: [
      { name: "Electronic-Grade Chemicals", description: "High-purity solvents and chemicals for electronics manufacturing in India", url: "https://www.ril.com/businesses/manufacturing/chemical" },
      { name: "Polyester Films", description: "PET base film for flexible display and semiconductor carrier tape", url: "https://www.ril.com/businesses/manufacturing/chemical" },
      { name: "New Energy Materials", description: "Emerging battery cell and energy storage material production (Faradion, Lithium)", url: "https://www.ril.com/new-energy" },
    ],
  },
  {
    company: "Formosa Plastics Group", tier: 7,
    products: [
      { name: "PVC Resin", description: "Suspension PVC for wire insulation and semiconductor component housings", url: "https://www.fpg.com.tw/en/business.aspx" },
      { name: "ABS Resin", description: "Acrylonitrile-butadiene-styrene for electronic device enclosures and keyboards", url: "https://www.fpg.com.tw/en/business.aspx" },
      { name: "Specialty Polymers", description: "Acrylic and specialty resin compounds for display components and optical films", url: "https://www.fpg.com.tw/en/business.aspx" },
    ],
  },
  {
    company: "Kanto Denka Kogyo", tier: 7,
    products: [
      { name: "NF3 (Nitrogen Trifluoride)", description: "Ultra-pure NF3 for CVD chamber remote plasma cleaning", url: "https://www.kantodenka.co.jp/en/products/fluorine/nf3/" },
      { name: "WF6 (Tungsten Hexafluoride)", description: "Tungsten CVD precursor for contact plug metallization in leading-edge logic", url: "https://www.kantodenka.co.jp/en/products/fluorine/wf6/" },
      { name: "SiF4 (Silicon Tetrafluoride)", description: "Silicon tetrafluoride for ion implantation and specialty gas applications", url: "https://www.kantodenka.co.jp/en/products/fluorine/sif4/" },
    ],
  },
  {
    company: "Yunnan Tin Group", tier: 7,
    products: [
      { name: "Refined Tin", description: "LME-deliverable refined tin — feedstock for electronics solder and tin chemicals", url: "https://www.yntin.com/en/products.html" },
      { name: "Tin Alloys", description: "Custom tin alloy compositions for lead-free solder bar and wire", url: "https://www.yntin.com/en/products.html" },
      { name: "Indium Metal", description: "High-purity indium byproduct for ITO targets and semiconductor bonding", url: "https://www.yntin.com/en/products.html" },
    ],
  },
  {
    company: "PT Timah", tier: 7,
    products: [
      { name: "Refined Tin Ingots", description: "Bangka Island tin — one of the world's largest tin producers", url: "https://www.timah.com/product/" },
      { name: "Tin Solder", description: "Lead-free tin-based solder for electronics assembly export market", url: "https://www.timah.com/product/" },
    ],
  },
  {
    company: "Jinchuan Group", tier: 7,
    products: [
      { name: "Nickel Cathode", description: "Full-plate electrolytic nickel for EV batteries and superalloys — China's largest nickel producer", url: "https://www.jnmc.com/en/chanpin/" },
      { name: "Copper Cathode", description: "Refined copper from Jinchuan's smelters in Gansu province", url: "https://www.jnmc.com/en/chanpin/" },
      { name: "Cobalt Metal", description: "Refined cobalt powder and salts for battery cathode and hard alloy production", url: "https://www.jnmc.com/en/chanpin/" },
      { name: "Platinum Group Metals", description: "PGMs from Jinchuan nickel refining for catalysis and electronics", url: "https://www.jnmc.com/en/chanpin/" },
    ],
  },
  {
    company: "5N Plus Inc", tier: 7,
    products: [
      { name: "Bismuth Metal (5N)", description: "99.999% pure bismuth for pharmaceutical, cosmetics, and electronic alloys", url: "https://www.5nplus.com/products/bismuth/" },
      { name: "Tellurium Metal (6N)", description: "Ultra-high purity tellurium for thermoelectric devices and CdTe solar cells", url: "https://www.5nplus.com/products/tellurium/" },
      { name: "Gallium Metal", description: "High-purity gallium for GaN and GaAs semiconductor epitaxy", url: "https://www.5nplus.com/products/gallium/" },
      { name: "Germanium Metal", description: "High-purity germanium for infrared optics and SiGe semiconductor applications", url: "https://www.5nplus.com/products/germanium/" },
    ],
  },
  {
    company: "Almonty Industries", tier: 7,
    products: [
      { name: "Tungsten Concentrate (APT)", description: "Ammonium paratungstate from Sangdong mine in South Korea — largest tungsten mine outside China", url: "https://www.almonty.com/projects/sangdong-mine/" },
      { name: "Tungsten Metal Powder", description: "Refined tungsten powder for hard metal, CVD precursor, and semiconductor contacts", url: "https://www.almonty.com/products/" },
    ],
  },
  {
    company: "Eti Maden", tier: 7,
    products: [
      { name: "Refined Boric Acid", description: "B(OH)3 — Turkey holds 73% of global boron reserves; key feedstock for borosilicate glass", url: "https://www.etimaden.gov.tr/en/products" },
      { name: "Borax Decahydrate", description: "Na2B4O7·10H2O for borosilicate glass, fiberglass, and nuclear applications", url: "https://www.etimaden.gov.tr/en/products" },
      { name: "Ulexite and Colemanite Ore", description: "Raw boron minerals for glass fiber and ceramic frits", url: "https://www.etimaden.gov.tr/en/products" },
    ],
  },
  {
    company: "Eurasian Resources Group", tier: 7,
    products: [
      { name: "Cobalt Hydroxide (Metalkol RTR)", description: "Battery-grade cobalt from the Metalkol operation in DRC", url: "https://www.ergroup.com/businesses/cobalt/" },
      { name: "Copper Cathode (Frontier / BAMIN)", description: "High-grade refined copper from Kazakhstan and DRC operations", url: "https://www.ergroup.com/businesses/copper/" },
      { name: "Aluminium (Kazakhstan)", description: "Primary aluminium from Kazakhstan Aluminium Smelter", url: "https://www.ergroup.com/businesses/aluminium/" },
    ],
  },
  {
    company: "Newmont Corporation", tier: 7,
    products: [
      { name: "Gold Bullion", description: "Refined gold bars from Boddington, Peñasquito, Ahafo, and other mines", url: "https://www.newmont.com/en/gold/" },
      { name: "Silver Byproduct", description: "Silver recovered from gold and polymetallic mines for electronics and photovoltaics", url: "https://www.newmont.com/en/silver/" },
      { name: "Copper Concentrate", description: "Copper concentrate from Peñasquito and Phoenix polymetallic operations", url: "https://www.newmont.com/en/copper/" },
    ],
  },
  {
    company: "Barrick Gold", tier: 7,
    products: [
      { name: "Gold Bullion", description: "Gold from Carlin, Cortez, Kibali, Loulo-Gounkoto, and Pueblo Viejo operations", url: "https://www.barrick.com/gold/" },
      { name: "Copper Cathode (Lumwana / Reko Diq)", description: "Copper cathode from Zambia and Pakistan — growing copper production", url: "https://www.barrick.com/copper/" },
    ],
  },
  {
    company: "Vedanta Limited", tier: 7,
    products: [
      { name: "Zinc and Lead (HZL)", description: "India's largest zinc-lead producer via Hindustan Zinc subsidiary", url: "https://www.vedantalimited.com/zinc.aspx" },
      { name: "Aluminium (BALCO / VAAL)", description: "Primary aluminium from Korba and Jharsuguda smelters", url: "https://www.vedantalimited.com/aluminium.aspx" },
      { name: "Iron Ore", description: "Iron ore from Goa and Karnataka operations for steel and silicon iron", url: "https://www.vedantalimited.com/iron-ore.aspx" },
      { name: "Oil and Gas (Cairn India)", description: "Oil production from Rajasthan Block 70 for petrochemical feedstocks", url: "https://www.vedantalimited.com/oil-gas.aspx" },
    ],
  },
  {
    company: "Idemitsu Kosan", tier: 7,
    products: [
      { name: "OLED Emitter Materials", description: "Organic emitter compounds for OLED panel manufacturing — major Apple OLED supplier", url: "https://www.idemitsu.com/en/business/info_elect/oled/" },
      { name: "Synthetic Lubricants", description: "PAO and ester-based lubricants for semiconductor clean-room equipment", url: "https://www.idemitsu.com/en/business/lubricants/" },
      { name: "Polycarbonate Resins", description: "Engineering thermoplastics for optical media and precision optical components", url: "https://www.idemitsu.com/en/business/chemical_products/" },
    ],
  },
  {
    company: "Sinochem Holdings", tier: 7,
    products: [
      { name: "Electronic-Grade Chemicals", description: "Ultra-pure acids, solvents, and specialty chemicals for semiconductor processing", url: "https://www.sinochem.com/en/business/" },
      { name: "Agri Nutrients", description: "Potash and phosphate for global agriculture — upstream chemical feedstock integration", url: "https://www.sinochem.com/en/business/" },
      { name: "Fluorochemicals", description: "Fluoropolymer and fluorocarbon products for specialty chemical and fab applications", url: "https://www.sinochem.com/en/business/" },
    ],
  },
]

/** Returns the catalogued products for a company, or null if not yet researched. */
export function getCompanyProducts(companyName: string): Product[] | null {
  return COMPANY_PRODUCTS.find((c) => c.company === companyName)?.products ?? null
}