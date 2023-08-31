export default {
  categories: [
    {
      name: 'Consumables',
      description: 'Single-use utility items as well as payloads and charges for various types of equipment.',
      thumbnail: '1'
    },
    {
      name: 'Replicas',
      description: 'Small-scale toy models of popular armaments used during the Corporia Conflagration of war-era Ionia. And if you\'re wondering why we\'re selling toy guns: the Galatic Authority revoked our firearms dealers license, so all we can do now is sell toys.',
      thumbnail: '2'
    },
    {
      name: 'Exoskeletons',
      description: 'Hardened armour shells designed for strenuous activity and defence applications.',
      thumbnail: '3'
    },
    {
      name: 'Provisions',
      description: 'Supplies and consumables for various applications, including storage, medical and technological.',
      thumbnail: '4'
    },
    {
      name: 'Cybernetics',
      description: 'Highly customisable nanocircuitry that can be used to upgrade or tune various types of electronics at small, medium and large scales.',
      thumbnail: '5'
    },
    {
      name: 'Components',
      description: 'Assorted electronic and mechanical components for a wide range of applications.',
      thumbnail: '6'
    },
    {
      name: 'Upgrades',
      description: 'Patented software and hardware upgrades for armour, assorted ship parts and untested prototypes.',
      thumbnail: '7'
    },
    {
      name: 'Junk',
      description: 'Boom\'s Black Market doesn\'t just sell high-value merchandise - we also stock a wide variety of mundane junk items. As the old saying goes, one man\'s rubbish is another man\'s treasure. You never know what you\'ll come across in our collection of junk items.',
      thumbnail: '8'
    },
    {
      name: 'Lost & Found',
      description: 'Items reported lost, misplaced or stolen and eventually (mysteriously) found their way to the black market. Might be worth taking a look.',
      thumbnail: '9'
    }
  ],
  suppliers: [
    {
      name: 'Novina Corp',
      location: 'Rygel-9',
      description: 'With patents in exotic prototypes, cutting-edge biotech and bold designs, Novina Corp are at the forefront of pioneering technological advancements, with important political and economic ties across Styx Theta and Rygel Cluster.',
      establishYear: 2125,
      thumbnail: '1'
    },
    {
      name: 'Mikkei Combine',
      location: 'Reunion',
      description: 'Mikkei\'s militarised R&D division is responsible for some of the most influential cybernetic tech of the second half of the 23rd century, with a handful of large subsidiaries overseeing research in nanoinformatics and biotics.',
      establishYear: 2946,
      thumbnail: '2'
    },
    {
      name: 'Sirta Foundation',
      location: 'Noveria',
      description: 'Specialising in medical and general provisions, Sirta Foundation was first created as a non-profit civilian group tasked with conducting research into genetic engineering on behalf of some of the biggest names in the field. Sirta have since expanded their efforts and now oversee research in many areas related to interspecies genetics, xenobiology and pathogen containment.',
      establishYear: 3003,
      thumbnail: '3'
    },
    {
      name: 'Ferrous LPX',
      location: 'Novina Sector',
      description: 'Ferrous LPX (previously Ferrous Mercantile) was founded as a collective of separate research divisions which eventually combined their efforts and now oversee research and production in electronics, omni-tools, high grade armour and advanced communication tools. Ferrous LPX also owns several exclusive contracts in weapons design and manufacture.',
      establishYear: 2541,
      thumbnail: '4'
    },
    {
      name: 'Deckow & Kiehn',
      location: 'Taliphus-8',
      description: 'Headquartered in the Taliphus system of the Minos Nebula, Deckow & Kiehn specialises in mid-range tech, electornics, drones and engineering components. They recently won several bids to become the main electronics suppliers for industrial contracts in Artemis Tau, but they also do a lot of business in the consumer markets of their local star cluster.',
      establishYear: 2127,
      thumbnail: '5'
    },
    {
      name: 'G & B Supplies',
      location: 'Kryden System',
      description: 'Cheap generic supplies and popular provisions and the mainstay of G&B\'s business, though they are also involved in many big asteroid mining and gas hauling operations in the Krogan demilitarised zone. G&B was recently commissioned by the Outer Planets Alliance to distribute rations, supplies and engineering supplies to various colonies near Hades Nexus where most of the company\'s business is located.',
      establishYear: 2319,
      thumbnail: '6'
    }
  ],
  products: [
    {
      name: '20 kilovolt powercell (pack of 2)',
      description: 'High charge capacity powercell with fast recharge capability. Good for 2500 recharge cycles before failure.',
      price: 236.00,
      stock: 45,
      categoryName: 'Components',
      supplierName: 'Ferrous LPX',
      thumbnail: '20.png'
    },
    {
      name: 'Short-range thermal sensors',
      description: '8-pack of thermal sensors, each with a 10-m radius and 30 second duration. Useful for inconspicuously tracking heat signatures within a small radius.',
      price: 236.00,
      stock: 45,
      categoryName: 'Components',
      supplierName: 'G & B Supplies',
      thumbnail: '28.png'
    },
    {
      name: 'CX-28 peripheral connector (mark IV)',
      description: 'This composite connector works with peripheral motor components and allows a backup power source to be linked to the main circuit.',
      price: 236.00,
      stock: 45,
      categoryName: 'Components',
      supplierName: 'G & B Supplies',
      thumbnail: '29.png'
    },
    {
      name: 'G & B overcharged capacitor',
      description: 'With integrated 6-pole fused circuitry, this capacitor module boosts recharge speed of various types of cybernetic implants while keeping power usage within safe limits. Designed to integrate with mainframe components.',
      price: 46.56,
      stock: 45,
      categoryName: 'Cybernetics',
      supplierName: 'G & B Supplies',
      thumbnail: '30.png'
    },
    {
      name: 'ARC-3000 disruptor device',
      description: 'Intended for short-range use, this device sends out a high-speed electircal pulse that fries any nearby circuitry and permanently disables all electornics.',
      price: 460.56,
      stock: 45,
      categoryName: 'Consumables',
      supplierName: 'Ferrous LPX',
      thumbnail: '31.png'
    },
    {
      name: 'Enhanced EMR signal jammer',
      description: 'Invented by Hyperion Holdings in 2866, this device broadcasts a low frequency buffer that interferes with all nearby electromagnetic signals and disables all communications within a 2-klick radius.',
      price: 18.23,
      stock: 139,
      categoryName: 'Consumables',
      supplierName: 'Deckow & Kiehn',
      thumbnail: '36.png'
    },
    {
      name: 'Perception enhancer module',
      description: 'Intended to be used with an existing circuit that supports sensory upgrades. Boosts noradrenaline levels and enhances fight-or-flight reflexes for a short duration.',
      price: 24.87,
      stock: 13,
      categoryName: 'Cybernetics',
      supplierName: 'Deckow & Kiehn',
      thumbnail: '39.png'
    },
    {
      name: 'Cryo rounds',
      description: 'Auto rounds. Useful for freezing affected targets for a short duration, these release an icy mist that slows down the subject without causing any damage.',
      price: 24.87,
      stock: 13,
      categoryName: 'Consumables',
      supplierName: 'Novina Corp',
      thumbnail: '40.png'
    },
    {
      name: 'Large caliber cryo rounds',
      description: 'Single-fire mode. Useful for freezing affected targets for a short duration, these release an icy mist that slows down the subject without causing any damage.',
      price: 14.87,
      stock: 13,
      categoryName: 'Consumables',
      supplierName: 'Novina Corp',
      thumbnail: '40_02.png'
    },
    {
      name: 'SFT5 nanite injector',
      description: 'Long-acting nanite infusions designed to heal tissue damage, boost nanite-powered implants and enhance general wellbeing. Compatible with 1st, 2nd and 3rd generation nanite technology.',
      price: 14.87,
      stock: 13,
      categoryName: 'Consumables',
      supplierName: 'Mikkei Combine',
      thumbnail: '43.png'
    },
    {
      name: 'Nailgun rounds',
      description: 'Corrosion-resistant, heat-stable metal rivets for high-capacity nailguns.',
      price: 14.87,
      stock: 13,
      categoryName: 'Consumables',
      supplierName: 'Deckow & Kiehn',
      thumbnail: '45.png'
    },
    {
      name: 'Replica type-3 VRG incendiary payload',
      description: 'This is a replica of the incendiary payload used by Corporia squadrons during the 27th century conflicts in the Verzan Zone.',
      price: 44.13,
      stock: 13,
      categoryName: 'Replicas',
      supplierName: 'Mikkei Combine',
      thumbnail: '57.png'
    },
    {
      name: 'Liquid neodymium suspension, 300ml',
      description: 'Effective in repairing mechanical damage to alloys and composites, including scratches, dents and superficial cracks. Also effective in restoring structural integrity to rusted parts.',
      price: 2.76,
      stock: 242,
      categoryName: 'Consumables',
      supplierName: 'G & B Supplies',
      thumbnail: '61.png'
    },
    {
      name: 'Replica ballista missile',
      description: 'A replica model of the supersonic ballista ordnance created by Vladof for wide area of effect impact.',
      price: 43.19,
      stock: 108,
      categoryName: 'Replicas',
      supplierName: 'G & B Supplies',
      thumbnail: '91.png'
    },
    {
      name: 'X-62 hydraulic assembly connector',
      description: 'Can be added to different types of hydraulic assemblies for cybernetic limbs, modified powertools and even some small vehicles.',
      price: 43.19,
      stock: 108,
      categoryName: 'Components',
      supplierName: 'G & B Supplies',
      thumbnail: '92.png'
    },
    {
      name: 'Tachyon emitter',
      description: 'Part of a quantum entanglement communication assembly used for trasmitting pulsed tachyon signals across temporal boundaries. Pre-calibrated for backwards compatibility with quantum interfacers that do not rely on polarised photon streams.',
      price: 72.77,
      stock: 287,
      categoryName: 'Components',
      supplierName: 'Novina Corp',
      thumbnail: '93.png'
    },
    {
      name: 'Kinetic round',
      description: 'Low-tech, fast imapct projectile inspired by early 22nd century vacuum ballistics reserach. No longer in production but highly sought after by collectors and enthusiasts.',
      price: 122.06,
      stock: 263,
      categoryName: 'Consumables',
      supplierName: 'Novina Corp',
      thumbnail: '99.png'
    },
    {
      name: 'Replica nanobot corruptor missile',
      description: 'A replica of the nanobot corruptor orignally designed by Victor Forsa in 2115 to target nanobot-powered devices. The original missile worked by emitting a long-range, variable-wavelength signal that completely disabled affected annobots, including their ability to self-repair.',
      price: 65.78,
      stock: 64,
      categoryName: 'Replicas',
      supplierName: 'Ferrous LPX',
      thumbnail: '100.png'
    },
    {
      name: 'Viridium-infused chest plate',
      description: 'Exoskeleton chest armour forged from superheated viridum alloy, completed with a frictionless lining and embedded nanocircuitry for monitoring the wearer\'s vitals. Suitable for extreme applications.',
      price: 420.00,
      stock: 243,
      categoryName: 'Exoskeletons',
      supplierName: 'Novina Corp',
      thumbnail: '24.png'
    },
    {
      name: 'Mark II Charrid bone exoskeleton',
      description: 'Second generation exoskeleton made of synthetic materials resembling Charrad bone in appearance and density. Not the most reliable choice for combat, but handy for most basic and non-critical applications.',
      price: 29.00,
      stock: 243,
      categoryName: 'Exoskeletons',
      supplierName: 'Deckow & Kiehn',
      thumbnail: '46.png'
    },
    {
      name: 'XTRU combat exoskeleton',
      description: 'Modelled after the Spartan programme\'s armour, the XTRU exoskeleton is lightweight, tough and able to be connected to a secondary power source to provide increased movement speed and power generation. Also comes equipped with hidden internal pouches for tactical equipment.',
      price: 162.00,
      stock: 243,
      categoryName: 'Exoskeletons',
      supplierName: 'Ferrous LPX',
      thumbnail: '47.png'
    },
    {
      name: 'Salarian STG recon exoskeleton',
      description: 'Used by the Salarian STG during the Rachni encounters, this design contains high-tech parts built with a patented specification. Integrates effectively with electronic assistive technology and other STG gear.',
      price: 142.00,
      stock: 212,
      categoryName: 'Exoskeletons',
      supplierName: 'Mikkei Combine',
      thumbnail: '48.png'
    },
    {
      name: 'Workman\'s exoshell',
      description: 'Low tech universal work gear for professional labour applications. Single size fits all. It\'s not upgradeable, but it can take a hell of a beating.',
      price: 67.00,
      stock: 416,
      categoryName: 'Exoskeletons',
      supplierName: 'G & B Supplies',
      thumbnail: '49.png'
    },
    {
      name: 'Ceryllium alloy exosuit (VTG-12 Enhanced Edition)',
      description: 'Ultra rare prototype built by Cerberus to integrate with specific ship modules, allowing pilots to interface directly with ship systems via neural link. Equipped with an advanced onboard computer specialised in monitoring ship systems and providing diagnostics to the user via a holographic display.',
      price: 220.00,
      stock: 56,
      categoryName: 'Exoskeletons',
      supplierName: 'Novina Corp',
      thumbnail: '62.png'
    },
    {
      name: 'Mark IV vanadium demolishionist armour',
      description: 'Hardened against medium-impact blasts, providing good protection in high-risk environments. Popular in construction applications but has also been known to be used by Cerberus infantry in the past.',
      price: 127.00,
      stock: 248,
      categoryName: 'Exoskeletons',
      supplierName: 'Ferrous LPX',
      thumbnail: '64.png'
    },
    {
      name: 'Electronull exoskeleton',
      description: 'Low density insulator exoskeleton, excelling in protecting against electrical hazrads. This is the exoskeleton of choice for many engineers working on ship electircal systems or performing EVA in the midst of an electrical storm.',
      price: 89.00,
      stock: 387,
      categoryName: 'Exoskeletons',
      supplierName: 'Deckow & Kiehn',
      thumbnail: '66.png'
    },
    {
      name: 'Reinforced titanium plates',
      description: 'Moldable, transverse titanium plates which can be affixed to most types of exoskeletons to enhance impact strength and defence capabilities. Comes with the tools necessary to attach each plate to your existing exoskeleton.',
      price: 34.00,
      stock: 864,
      categoryName: 'Exoskeletons',
      supplierName: 'G & B Supplies',
      thumbnail: '69.png'
    },
    {
      name: 'G&B LEV9 exoskeleton',
      description: 'Equipped with levitation technology to counteract the wearer\'s weight in high gravity environments, or for making short work of strenuous tasks involving heavy lifting.',
      price: 77.80,
      stock: 422,
      categoryName: 'Exoskeletons',
      supplierName: 'G & B Supplies',
      thumbnail: '72.png'
    },
    {
      name: 'Armax infiltrator exoskeleton',
      description: 'Camouflage-enabled exterior that adapts to surrounding light levels and conceals the wearer. Includes exterior motion and thermal sensors for detecting neraby lifeforms. Useful for many applications, including combat, recon, wildlife exploration, or genral usage.',
      price: 77.80,
      stock: 422,
      categoryName: 'Exoskeletons',
      supplierName: 'G & B Supplies',
      thumbnail: '73.png'
    },
    {
      name: 'Companion exoshell',
      description: 'Provides protection for your robotic assistants. Compatible with various models of robotic units, including DRD-2, DRD-3, DRD-8 and VCG-1. Equipped with backup power and failsafe redundancies for malfunctioning units.',
      price: 37.80,
      stock: 342,
      categoryName: 'Exoskeletons',
      supplierName: 'Ferrous LPX',
      thumbnail: '74.png'
    },
    {
      name: 'Speed enhancer exoskeleton',
      description: 'For high-speed encounters, this is the perfect tool. It integrates with peripheral cybernetics as well as interfacing directly with the peripheral nervous system to boost your speed without adversely affecting your precision or coordination. Mainly used for athletic and recreational applications.',
      price: 59.00,
      stock: 623,
      categoryName: 'Exoskeletons',
      supplierName: 'G & B Supplies',
      thumbnail: '75.png'
    },
    {
      name: 'Spare parts container',
      description: 'Large metallic container for storing random items. Top vent can be opened to allow for airflow and ventilation. Includes insulation lining for col item storage.',
      price: 23.22,
      stock: 244,
      categoryName: 'Provisions',
      supplierName: 'Ferrous LPX',
      thumbnail: '23.png'
    },
    {
      name: 'Shidelded electornics container',
      description: 'General storage for small and medium-sized electronics. Imbued with shileding against electrostatic discahrges and equipped with internal recharge circuitry for compatible devices.',
      price: 68.47,
      stock: 832,
      categoryName: 'Provisions',
      supplierName: 'Novina Corp',
      thumbnail: '32.png'
    },
    {
      name: 'Standard field medical kit',
      description: 'Assorted medical supplies: 3x Medi-Gel, 5x bandages, 1x IV fluid kit, 30x Adrenodol capsules.',
      price: 6.86,
      stock: 1032,
      categoryName: 'Consumables',
      supplierName: 'Sirta Foundation',
      thumbnail: '33.png'
    },
    {
      name: 'Dysprosium storage device',
      description: 'High thermal neutron absorption unit intended for storage of reactive elements, specifically calibrated for high-molecular weight compounds with unstable nuclei. Can also be used for certain low-power applications.',
      price: 325.00,
      stock: 522,
      categoryName: 'Provisions',
      supplierName: 'G & B Supplies',
      thumbnail: '34.png'
    },
    {
      name: 'Specialist medical kit',
      description: 'Mission-ready medical unit containing 10x standard field medical units. Useful for long-range missions, high-risk encounters, long-haul trips, or ships with large crews.',
      price: 104.00,
      stock: 742,
      categoryName: 'Consumables',
      supplierName: 'Sirta Foundation',
      thumbnail: '35.png'
    },
    {
      name: 'Single-use Medi-Gel',
      description: 'All-purpose medicinal salve combining an anaesthetic and clotting agent. Heals various wounds and ailments, instantly sealing injuries against infection and allowing for rapid healing by having the gel grip tight to flesh until subjected to a frequency of ultrasound.',
      price: 2.80,
      stock: 2131,
      categoryName: 'Consumables',
      supplierName: 'Sirta Foundation',
      thumbnail: '37.png'
    },
    {
      name: 'Spare parts supply crate',
      description: 'A supply crate containing an assortment of replacement parts, components and repair equipment for various types of devices. Includes x20 circuit boards, x50 universal screws, x1 basic fabricator, x1 heat gun, x5 titanium plates, x30 CX-28 peripheral connectors and x30 FD-32 universal connectors.',
      price: 65.00,
      stock: 631,
      categoryName: 'Provisions',
      supplierName: 'Deckow & Kiehn',
      thumbnail: '38.png'
    },
    {
      name: 'Meal replacement supply crate',
      description: 'A supply crate containing various types of rations and supplements of unknown origin, enough to keep a small-sized crew going for a number of days. Includes recipe ideas and basic utensils. All included foodstuffs are artificial and have not been safety-tested for human consumption.',
      price: 32.00,
      stock: 429,
      categoryName: 'Provisions',
      supplierName: 'G & B Supplies',
      thumbnail: '41.png'
    },
    {
      name: 'Single rail 2 kV control transformer',
      description: 'Low-end transformer with enough capacity to handle basic loads and low-power devices. Can be connected to the same bus as other electricals using a variety of mounting configurations. Encased in protective nichrome housing, allowing for external placement.',
      price: 44.73,
      stock: 763,
      categoryName: 'Provisions',
      supplierName: 'G & B Supplies',
      thumbnail: '42.png'
    },
    {
      name: 'Secure strongbox',
      description: 'Basic yet highly secure, this lockable container is ideal for the storage of small valuable items. The locking mechanism uses a digital trigger that destroys the contents within after a specific number of failed unlocking attempts, the number of which can be configured by the owner.',
      price: 14.45,
      stock: 266,
      categoryName: 'Provisions',
      supplierName: 'G & B Supplies',
      thumbnail: '59.png'
    },
    {
      name: 'Replica sidewinder pistol',
      description: 'A toy replica of one of the most popular sidearms of choice for Enclave personnel. The original weapon packs enough to stop a mutant in its tracks, with good fire rate and handling, not to mention its cheap ammo supply.',
      price: 46.00,
      stock: 521,
      categoryName: 'Replicas',
      supplierName: 'Mikkei Combine',
      thumbnail: '50.png'
    },
    {
      name: 'Replica ranger AR',
      description: 'A toy replica of Mikkei\'s standard-issue assault rifle. The original weapon was a staple for civilian defence contractors in low risk environments. It was favoured for its simplicity and versatility but was eventually replaced by more powerful designs powered by chakan oil.',
      price: 25.80,
      stock: 153,
      categoryName: 'Replicas',
      supplierName: 'Mikkei Combine',
      thumbnail: '51.png'
    },
    {
      name: 'Replica Hyperion Defender',
      description: 'A toy replica of Hyperion\'s first elemental pistol made available for commercial sales. Mass production began in 2361, featuring the original design that was based on Hyperion\'s typical reverse recoil behaviour.',
      price: 61.00,
      stock: 286,
      categoryName: 'Replicas',
      supplierName: 'Novina Corp',
      thumbnail: '52.png'
    },
    {
      name: 'Replica Maliwan pulse generator',
      description: 'A toy replica of Maliwan\'s most popular third generation pulse design. The original prototype was built around the idea of generating a wide-range electrostatic discharge at the point of impact, effective at permanently disabling electronics and electricals.',
      price: 26.00,
      stock: 523,
      categoryName: 'Replicas',
      supplierName: 'Novina Corp',
      thumbnail: '53.png'
    },
    {
      name: 'Replica Bandit rapidfire Maximiser',
      description: 'A toy replica of an early version of the Maximiser sold by the Bandit group. The story is that the original weapon was supposedly cobbled together from spare parts and bits of old, rusted junk by one of Bandit\'s employees after he ran out of construction materials. The weapon went into limited production run in response to an unexpected level of interest from collectors and enthusiasts, but was eventually discontinued due to poor performance and lack of reliability.',
      price: 8.33,
      stock: 362,
      categoryName: 'Replicas',
      supplierName: 'Deckow & Kiehn',
      thumbnail: '54.png'
    },
    {
      name: 'Replica Mk I Emmex Atomiser',
      description: 'A toy replica of the Mark I Atomiser sidearm developed at Emmex Industries at the peak of the Kellek Conflict of 2231. The original design was known for its impressive range and stopping power against non-organics and was effectively used by inhabitants of the Kellek System to stop the threat from their synthetic invaders. The weapon produces and ejects molten slugs at supersonic speeds, easily shredding most types of alloys and synthetic materials.',
      price: 52.00,
      stock: 713,
      categoryName: 'Replicas',
      supplierName: 'Deckow & Kiehn',
      thumbnail: '60.png'
    },
    {
      name: 'Replica Twinson corrosive railgun',
      description: 'A toy replica of Twinson Industries\' signature railgun and currently the most widely sold railgun in the Taliphus system. The weapon fires 1 metre-long streams of corrosive gel at speeds upwards of 800 metres per second, causing massive damage at the point of impact. This replica even includes some blinking lights and programmable noises that mimick the distinctive sound of the original weapon.',
      price: 213.00,
      stock: 162,
      categoryName: 'Replicas',
      supplierName: 'Ferrous LPX',
      thumbnail: '65.png'
    },
    {
      name: 'Modular carbon steel mechanical frame',
      description: 'Advanced mechanical frame compatible with most commercially available exoskeletons. It can be used as a piece of protective armour or as a replacement part for those who need it. Useful for a wide range of applications, especially defence and construction.',
      price: 612.00,
      stock: 652,
      categoryName: 'Exoskeletons',
      supplierName: 'Ferrous LPX',
      thumbnail: '68.png'
    },
    {
      name: 'Replica Jacob\'s Boltshooter',
      description: 'A toy replica of the infamous Boltshooter developed by Henry Jacob during the industrial era of the 23rd century. The original tool was designed to be used with special metallic bolts and inadvertently became a popular item with construction workers due to its penetrative power agasint steel, carbon, rock and concrete.',
      price: 31.00,
      stock: 824,
      categoryName: 'Replicas',
      supplierName: 'G & B Supplies',
      thumbnail: '70.png'
    },
    {
      name: 'Replica Hyperion Mini Canister Launcher',
      description: 'A toy replica of Hyperion\'s popular crowd control tool which was initially standard-issue for its security personnel, until the patent was acquired by Torgue and the weapon was converted into a utility tool. The launcher can be equipped with a range of different canisters and non-lethal grenades for various applications, which include clearing infestations and dealing with troublesome wildlife pests.',
      price: 62.00,
      stock: 423,
      categoryName: 'Replicas',
      supplierName: 'Novina Corp',
      thumbnail: '71.png'
    },
    {
      name: 'Replica Torgue LVP Hole Puncher',
      description: 'A toy replica of one of Torgue\'s popular low-velocity projectile cannons. Originally marketed as the Torgue LVP D900 Pistol, it was later nicknamed the Hole Puncher for its remarkable ability to punch through thick slabs of material. It later had to be recalled from the market due to safety concerns over backfire damage, but many enthusiasts retained their purchases adnt hese eventually found their way into various black markets.',
      price: 251.00,
      stock: 258,
      categoryName: 'Replicas',
      supplierName: 'Novina Corp',
      thumbnail: '77.png'
    },
    {
      name: 'Replica Vladof RPM-INF VRG ballistic rifle',
      description: 'A toy replica of Vladof\'s high-end VRG ballistic rifle belonging to the RPM-INF family of rifles. The fire rate of the stock-issue version of this rifle is so high that it cannot be handled effectively without a cybernetic arm or exoskeleton. Most users end up having to dial down the fire rate but even then, the weapon maintains excellent performance and is the preferred choice for many contractors and military units.',
      price: 162.00,
      stock: 474,
      categoryName: 'Replicas',
      supplierName: 'Deckow & Kiehn',
      thumbnail: '78.png'
    },
    {
      name: 'Replica semi-auto DS-3 Dahl Stopper',
      description: 'A toy replica of a single-fire mode bullpup rifle developed by Dahl Corp in 2172. With its dated design and hard-to-source ammunition, it eventually fell out of favour upon the discovery of chakan oil and the advent of elemental pulse-fire weapons. Still, it finds its niche among collectors and historians with an interest in early firearm design.',
      price: 52.00,
      stock: 182,
      categoryName: 'Replicas',
      supplierName: 'Mikkei Combine',
      thumbnail: '79.png'
    },
    {
      name: 'Replica Hyperion GOOMY Breach Shotgun',
      description: 'A toy replica of the \'Get Out Of My Way\' (GOOMY) shotgun developed by Hyperion for its civil defence contractors. With its dual-chamber design and ammo-regen tech, the original weapon had good range and immense destructive power against hardened targets, making it a popular choice for anti-material applications.',
      price: 152.00,
      stock: 316,
      categoryName: 'Replicas',
      supplierName: 'Ferrous LPX',
      thumbnail: '80.png'
    },
    {
      name: 'Replica Torgue Pocket Cannon',
      description: 'A toy replica of the Pocket Cannon developed by Samuel T Anders on behalf of Torgue Corp in 2252. The original weapon\'s main selling point was its extremely small size and low cost of production, but the intent behind its conception remains unclear. Due to a number of concessions taken during the manufacturing process, the final product ended up being largely ineffective for most applications but continues to be sold at discounted prices while stocks remain high.',
      price: 6.36,
      stock: 2016,
      categoryName: 'Replicas',
      supplierName: 'Ferrous LPX',
      thumbnail: '81.png'
    },
    {
      name: 'Replica Weyland-Yutani P.649 HEL',
      description: 'A toy replica of the UACM\'s second most-advanced heavy weapon after only the Hyperdyne Microburst. Only recently released by Weyland-Yutani\'s experimental branch, the Project 649 High-Energy-Laser (HEL) is a fully weaponised variable-charge energy weapon. Highly accurate at long range, it brings a new form of combat to the standard Heavy Weapons Platform of the UACM.',
      price: 142.00,
      stock: 371,
      categoryName: 'Replicas',
      supplierName: 'Ferrous LPX',
      thumbnail: '82.png'
    },
    {
      name: 'Replica Armax Mk III Auto ST',
      description: 'A toy replica of the Mark III Auto slug-thrower developed at Armax Co for non-military anti-personnel applications. The original weapon fired short-range slugs with good precision and stopping power, but a small magazine capacity and the need for frequent maintenance made it difficult for Armax to market this design to the mass market until it was eventually discontinued and replaced by the Armax 8A7 Slugger.',
      price: 38.00,
      stock: 634,
      categoryName: 'Replicas',
      supplierName: 'Deckow & Kiehn',
      thumbnail: '83.png'
    },
    {
      name: 'Kevtran Arc Welder',
      description: 'Specialised arc welder with variable voltage. Intended for nickel and chromium-based alloys but can also be used for general repair and fabrication. Features thermal overload protection and fan cooling for improved duty cycle. Supplied with electrode holder, earthing clamp, hand-held welding mask and chipping hammer.',
      price: 174.00,
      stock: 462,
      categoryName: 'Provisions',
      supplierName: 'G & B Supplies',
      thumbnail: '84.png'
    },
    {
      name: 'Replica Hyperion SG4',
      description: 'A toy replica of the only commercially available electrical pistol designed by Hyperion as an internal prototype whose patent was unofficially leaked to a rival corporation, leading to a limited run of under 1000 units that were sold mostly in Rygel-9\'s black markets. The prototype featured an innovative electrical design that relied on powercells to provide the necessary kinetic energy to exiting projectiles, leading to silent and efficient operation.',
      price: 38.00,
      stock: 634,
      categoryName: 'Replicas',
      supplierName: 'Mikkei Combine',
      thumbnail: '85.png'
    },
    {
      name: 'Replica Hyperion U1A2 GL Disintegrator',
      description: 'A toy replica of an upcoming prototype currently in active development at Hyperion. The appearance and external design of the weapon have been finalised but its mode of operation remains unclear. The experimental R&D division is aiming for an air-powered design that will supposedly drive a continuous stream of air through its length at supersonic speeds, causing extreme air compression and likely significant damage to any targets at the receiving end of that air stream.',
      price: 342,
      stock: 594,
      categoryName: 'Replicas',
      supplierName: 'Novina Corp',
      thumbnail: '86.png'
    },
    {
      name: 'Replica Graal Spike Thrower',
      description: 'A toy replica of the infamous Graal, one of a long line of krogan weapons used to hunt thresher maws. Its ammunition consists of oversized flechettes meant to pierce thresher hide and create deep wound channels leading to massive blood loss. For additional firepower, the weapon is double-barreled, and, as a last resort, possesses blades to cause internal injuries if the wielder is swallowed by the thresher. Using a Graal on a humanoid target has predictably grisly effects. Its shots can be charged for more damage.',
      price: 94,
      stock: 466,
      categoryName: 'Replicas',
      supplierName: 'Ferrous LPX',
      thumbnail: '87.png'
    },
    {
      name: 'Replica M-22 Eviscerator',
      description: 'A toy replica of the Lieberschaft 2180 shotgun, or "Eviscerator", known for its unique ammunition generator. Where most modern firearms shave off chips or pellets from an ammunition block, the M-22 shaves off serrated metal wedges designed to fly aerodynamically. This dramatically improves its armor-piercing capabilities, and its tight grouping helps wound ballistics at longer ranges than standard shotguns. This design also violates several intergalactic weapons treaties, so the M-22 is not distributed to militaries.',
      price: 210.00,
      stock: 193,
      categoryName: 'Replicas',
      supplierName: 'Ferrous LPX',
      thumbnail: '88.png'
    },
    {
      name: 'Replica Alliance M-11 Suppressor',
      description: 'A toy replica of the flagship weapon of the Citadel Space Alliance\'s Offensive Handgun Project that developed an infiltration weapon to be used in close-quarters situations where silence is key. The Suppressor features a built-in integral sound moderator that reduces noise and muzzle flash. Civilian variants of the weapon are considered illegal but can be found in some sectors, especially around the League Of Unaligned Worlds.',
      price: 79.00,
      stock: 277,
      categoryName: 'Replicas',
      supplierName: 'Ferrous LPX',
      thumbnail: '89.png'
    },
    {
      name: 'Replica M-6 Carnifex',
      description: 'A toy replica of one of the most accurate and lethal sidearms developed by Hyperdyne Corp for the Citadel Space Alliance. Effective against armor, weak against shields and biotic barriers, it was released as an upgrades to the older, and much weaker, Predator heavy pistol. An expensive but powerful weapon, the Carnifex is a favored sidearm of mercenary leaders and Eclipse mercenary tech specialists. Its marketing materials feature a charging krogan with the slogan "Don\'t you wish Carnifex was at your side?"',
      price: 62.00,
      stock: 546,
      categoryName: 'Replicas',
      supplierName: 'Ferrous LPX',
      thumbnail: '90.png'
    },
    {
      name: 'Refillable Medi-Gel applicator',
      description: 'Compatibel with Sirtra\'s specialised Medi-Gel canisters containing fast-acting topical gel that is extremely effective at healing wounds and injuries of varying severity. Its application can be used to counteract a wide variety of toxins and poisons, as well as to revive subjects that are critically injured, unconscious, or otherwise severely injured or incapacitated.',
      price: 342.00,
      stock: 812,
      categoryName: 'Provisions',
      supplierName: 'Sirta Foundation',
      thumbnail: '102.png'
    },
    {
      name: 'Ferrochrome alloy shoulder plates',
      description: 'Upgraded shoulder plates designed to integrate with compatible exoskeleton models. Reinforced with stable kinetic barriers offering limited protection against kinetic damage.',
      price: 42.00,
      stock: 962,
      categoryName: 'Upgrades',
      supplierName: 'Novina Corp',
      thumbnail: '01.png'
    },
    {
      name: 'Reinforced hydraulic joint system',
      description: 'Pneumatic hydraulic system designed to integrate with external joint assemblies in compatible exoskeleton models. Features a thick corrosive-resistant protective coating.',
      price: 81.84,
      stock: 366,
      categoryName: 'Upgrades',
      supplierName: 'Novina Corp',
      thumbnail: '02.png'
    },
    {
      name: 'Unstable fissile power core',
      description: 'Designed to integrate with only a handful of advanced exoskeleton prototypes, this power core delivers massive amounts of power but is prone to unpredictable radioactive decay and possesses no means to contain that radiation. As such, it is not suitable for use by organics or in close proximity to other organics, but may serve as an excellent power source for synthetics or remote installations requiring massive amounts of power.',
      price: 852.00,
      stock: 170,
      categoryName: 'Upgrades',
      supplierName: 'Sirta Foundation',
      thumbnail: '03.png'
    },
    {
      name: 'Autonomous hydraulic assembly',
      description: 'Designed to fit in with existing hydraulic assemblies, this particular model can be configured with specific values for tension, torque, speed and power, making it ideal for unpredictable automated environments.',
      price: 116.00,
      stock: 285,
      categoryName: 'Upgrades',
      supplierName: 'Mikkei Combine',
      thumbnail: '04.png'
    },
    {
      name: 'Scratch-resistant coating',
      description: 'Durable superficial coating with ceramic binder, designed for protecting the external surface of armour plates, exoskeleton modules and even electronic or electrical devices. Comes in various colors and viscosities.',
      price: 44.74,
      stock: 523,
      categoryName: 'Upgrades',
      supplierName: 'Mikkei Combine',
      thumbnail: '05.png'
    },
    {
      name: 'Autonomous recon drone',
      description: 'Small covert drone with a 4-klick operating range, equipped with thermal and motion senors, advanced spatial navigation, target-tracking and a neural interface command module. Features an operating system with integrated heuristic subroutines and automatic system patches.',
      price: 576.00,
      stock: 325,
      categoryName: 'Upgrades',
      supplierName: 'Ferrous LPX',
      thumbnail: '06.png'
    },
    {
      name: 'Universal power converter',
      description: 'Widely compatible, 2-in-1 energy generator and converter for power-intensive applications. Uses variable voltage control to monitor power usage and direct system power wherever it is required. Can be fitted as an extension to existing power supply configuration or used as a standalone unit.',
      price: 211.34,
      stock: 477,
      categoryName: 'Upgrades',
      supplierName: 'Ferrous LPX',
      thumbnail: '07.png'
    },
    {
      name: 'Armax Elemental Repurposer',
      description: 'Multipurpose unit for the containment and repurposing of hazardous substances, including radioactive waste, biotoxins, or any other waste materials. Breaks down matter into its constituent parts, producing a dense crystalline compound which can be further reprocessed and converted into something more useful.',
      price: 163.62,
      stock: 395,
      categoryName: 'Provisions',
      supplierName: 'G & B Supplies',
      thumbnail: '08.png'
    },
    {
      name: 'Compact VI Drone',
      description: 'Designed by Cerberus, this self-learning drone serves many roles, including personal helper, communications manager, data processor, and general assistant. Powered by Cerberus\'s powerful AGI, it\'s particularly strong at pattern recognition and decision making, which allows it to excel in domestic applications as well as industrial, commercial and outdoor settings.',
      price: 428.26,
      stock: 266,
      categoryName: 'Upgrades',
      supplierName: 'Ferrous LPX',
      thumbnail: '09.png'
    },
    {
      name: 'Personal security drone',
      description: 'Commonly found as part of the security system of many homes and businesses, this Cerberus-designed drone is able to effectively monitor its surrounding environment, detect patterns, observe behaviours, assess risks, and take decisive action to protect its owner in accordance with its programmed mandate.',
      price: 371.00,
      stock: 387,
      categoryName: 'Upgrades',
      supplierName: 'Ferrous LPX',
      thumbnail: '10.png'
    },
    {
      name: 'Stasis pod',
      description: 'Long-duration cryostasis pod designed for passengers on long-range interstellar trips. The pod\'s systems are able to perfectly preserve the user with minimal risk and maximum comfort. Its sophisticated operating system also allows the user to regain consciousness at will, in case of any ship emergencies. By continuously monitoring the user\'s brainstate and maintaining detailed logs, it provides a safe medical option and peace of mind for the user.',
      price: 1050.00,
      stock: 93,
      categoryName: 'Upgrades',
      supplierName: 'Novina Corp',
      thumbnail: '11.png'
    },
    {
      name: 'Centurion Mk XIV Android Headpiece',
      description: 'Replacement headpiece for compatible android units. This particular head is reinforced with a vanadium outer shell that sits atop a layer of integrated circuitry providing visual feedback and a heads-up display for the android. The unit houses a dual-CPU system with multiple redundancies in case of power failure of system corruption, making this an ideal unit for those who do not wish to engage in regular maintenance.',
      price: 2012.00,
      stock: 351,
      categoryName: 'Cybernetics',
      supplierName: 'Sirta Foundation',
      thumbnail: '12.png'
    },
    {
      name: 'Protective shoulder plate',
      description: 'With an expandable inner portion, this shoulder plate can fit over your existing armour and offers several extra features, including a mounting slot for shoulder-mounted devices and a self-repairing internal shell.',
      price: 38.00,
      stock: 233,
      categoryName: 'Upgrades',
      supplierName: 'G & B Supplies',
      thumbnail: '13.png'
    },
    {
      name: 'Krogan biotic exosuit',
      description: 'Krogan power armour fortified with a biotic barrier which can be purged to boost speed and damage output for a short duration. As a biotic-focused piece of kit, this exosuit enhances the effectiveness of various biotic abilities by interfacing directly with the user\'s peripheral nervous system, boosting power regeneration and biotic potency while retaining its protective benefits.',
      price: 382.29,
      stock: 233,
      categoryName: 'Exoskeletons',
      supplierName: 'Novina Corp',
      thumbnail: '14.png'
    },
    {
      name: 'DGX-2 sublight engine',
      description: 'Early version of the DGX series of sublight engines used in small craft. The design is relatively simple compared to large-scale FTL engines, thought the DGX-2 is noted for its reliability and fuel efficiency, making it a very popular choice among pilots over the last decade since its original release.',
      price: 9800.00,
      stock: 14,
      categoryName: 'Upgrades',
      supplierName: 'Deckow & Kiehn',
      thumbnail: '15.png'
    },
    {
      name: 'Striker S & C Hybrid Turbofan Engine',
      description: 'Intra-atmospheric aircraft engine designed for high-speed, single-pilot jets. These engines burn fast and dirty and do not cope well with atmospheric drag, but they do provide an unrivalled level of acceleration over short distances, making them a popular choice for racing vessels. Though rated for atmosphere, these engines are also capable of propelling ships through short-duration exosphere flights, thanks to their hybrid design.',
      price: 6420.00,
      stock: 17,
      categoryName: 'Upgrades',
      supplierName: 'Mikkei Combine',
      thumbnail: '16.png'
    },
    {
      name: 'Pressurised fuel canister',
      description: 'Cast iron airtight container for storing fuels as pressurised gases or in liquid form. Microscopic seal technology ensures there are no leaks while also preventing any contamination from external sources. Internal thermocouples keep the fuel temperature in cehck, while other internal instruments ensure the fuel remains viable.',
      price: 52.22,
      stock: 421,
      categoryName: 'Provisions',
      supplierName: 'Sirta Foundation',
      thumbnail: '17.png'
    },
    {
      name: 'Circuitry protective housing',
      description: 'Protective housing for electrical units like those on outer ship\'s surfaces or any other electrical installations exposed to the environment. Featuring an impenetrable alloy cover with a vented design, internal sensors for monitoring temperature and pressure, and an antistatic field to negate any unexpected surges.',
      price: 27.45,
      stock: 474,
      categoryName: 'Upgrades',
      supplierName: 'Mikkei Combine',
      thumbnail: '18.png'
    },
    {
      name: 'Agricultural spotter drone',
      description: 'Autonomous farming drone with a wide array of sensors and probes for measuring humidity, precipitation, soil pH and ambient temperatures. Equipped with a system of cameras that are programmed to identify insects and pests and provide detailed reports on biotic stress.',
      price: 163.46,
      stock: 78,
      categoryName: 'Upgrades',
      supplierName: 'G & B Supplies',
      thumbnail: '19.png'
    },
    {
      name: 'High pressure vent seal',
      description: 'Heavy duty, full-thickness seal designed to protect the integrity of pressurised vents. Its coating is impervious to corrosion as well as to extreme heat or cold, making it a highly versatile choice for ventilation systems, cooling loops, heat exchangers and fuel delivery systems.',
      price: 73.80,
      stock: 422,
      categoryName: 'Provisions',
      supplierName: 'Novina Corp',
      thumbnail: '21.png'
    },
    {
      name: 'Vented cylinder',
      description: 'This multipurpose attachment is compatible with various types of heat guns, blow torches, fire hoses, nozzle atachments, pipe assemblies, fuel pipes and cooling rods. Its internal diameter can expand or contract to suit different types of applications. As such, the cylinder can even be used as an improvised barrel for low-velocity projectiles, which is exactly how it is used in the Type 12 Machine Pistol developed by Armax Co.',
      price: 38.34,
      stock: 579,
      categoryName: 'Provisions',
      supplierName: 'Sirta Foundation',
      thumbnail: '22.png'
    },
    {
      name: 'Turian Light Explorer Armour',
      description: 'Advanced Turian exoskeleton featuring built-in shield generator powered by the wearer\'s natural body motion, kinetic stabilisers, integrated heat-regulation, fluid recycler, hydraulic power booster, power recharge modules and adaptive cloaking technology. Due to its versatility and wide range of benefits, it is considered a staple for any spacer who takes their exploration seriously.',
      price: 638.00,
      stock: 62,
      categoryName: 'Exoskeletons',
      supplierName: 'Mikkei Combine',
      thumbnail: '24.png'
    },
    {
      name: 'Fuel delivery system',
      description: 'Versatile fuel distribution and delivery system consisting of multiple pumps, durable yet flexible tubing, secure seals, pressure sensors, temperature regulators, emergency vent action, spare fuel tank and many more state-of-the-art components. Suitable for a wide range of applications, from small vehicles to medium ships and beyond. This will keep the fuel flowing and ensure there are no leaks. And if the system does somehow get compromised, the safety mechanisms and spare fuel supply will keep you humming along until you can get the problem fixed.',
      price: 317.55,
      stock: 47,
      categoryName: 'Components',
      supplierName: 'Ferrous LPX',
      thumbnail: '25.png'
    },
    {
      name: 'MOBCAM Mobile Security Monitor',
      description: 'Advanced floating gadget with a wide array of programmable parameters, intended for use as a mobile security camera. Excellent for providing continuous monitoring while on the move, or to cover a large area, or even to cover a single line of sight. Whatever your needs, this device will serve you well with its variable zoom, rapid autofocus, enormous memory capacity, weatherprof design and advanced propulsion system.',
      price: 45.35,
      stock: 633,
      categoryName: 'Upgrades',
      supplierName: 'Ferrous LPX',
      thumbnail: '26.png'
    },
    {
      name: 'Collapsable workman\'s ladder',
      description: 'Extensible safety ladder featuring safety grips and a locking pin mechanism for securing the ladder in a safe open position. Highly trusted in domestic as well as construction and industrial settings, this won\'t let you down and will make sure you keep your balance while at a high elevation. (Just make sure you don\'t let your feet slip out from underneath you, becasue for some reason the product does not come with any warranty. Hmmm...)',
      price: 45.35,
      stock: 633,
      categoryName: 'Provisions',
      supplierName: 'Ferrous LPX',
      thumbnail: '27.png'
    },
    {
      name: 'Tavlek Gauntlet',
      description: 'A powerful short-range energy discharger and augmentation contraption housed in a gauntlet that will attach itself to he wearer\'s forearm. It does this automatically via a locking brace and a series of needles that make direct contact with nerve endings and augment the wearer\'s physiology through a poorly understood endocrine cascade. The device is capable of emitting powerful offensive energy pulses. Extended use comes with detrimental side-effects, as a result of the direct contact that the device makes with the peripheral nervous system, though this doesn\'t seem to affect the original Tavleks who procured this technology.',
      price: 106.35,
      stock: 633,
      categoryName: 'Cybernetics',
      supplierName: 'Sirta Foundation',
      thumbnail: '44.png'
    },
    {
      name: 'Protomolecule sample',
      description: 'Ultra rare and extremely hazardous protomolecule sample obtained by the Marasmus medical crew who arrived at Hyperion station and procured a protomolecule sample while the station was under total quarantine procedure after the first major protomolecule incident. This sample contains active protomolecule and is housed in a special dual-layer shatterproof container.',
      price: 7000.00,
      stock: 4,
      categoryName: 'Provisions',
      supplierName: 'G & B Supplies',
      thumbnail: '55.png'
    },
    {
      name: 'Sentinel Rune',
      description: 'Thought to originate in Exultia, this ancient rune is imbued with Argent Energy and had initially been kept in Nekravol Museum until its acquisition by and delivery to the Taliphus black markets in 2377, where it is now sold as part of the ultra rare collection of runes and artefacts representing important points in history. The exact story behind this particular sentinel rune is unknown, but it is thought to be related to the intense battle at Urdak between the loyalist sentinels and the depraved forces of Hell.',
      price: 4000.00,
      stock: 13,
      categoryName: 'Provisions',
      supplierName: 'Novina Corp',
      thumbnail: '56.png'
    },
    {
      name: 'Synergia Nanobot Replicator',
      description: 'All-in-one unit containing all the apparatus required for assembly and replication of nanobots. Can be fitted to some exoskeletons to deliver a stream of nanobots as needed.',
      price: 16.43,
      stock: 254,
      categoryName: 'Components',
      supplierName: 'Sirta Foundation',
      thumbnail: '58.png'
    },
    {
      name: 'Cerberus Service Drone',
      description: 'Industrial drone used in factory and production environments to monitor equipment, assist staff, diagnose and repair machine faults and log operational performance statistics. Some of these drones were taken out of service and retrofitted with a modified version of the original operating system to enable them to serve as personal drones.',
      price: 43.20,
      stock: 19,
      categoryName: 'Provisions',
      supplierName: 'Mikkei Combine',
      thumbnail: '63.png'
    },
    {
      name: 'Organic Tissue Synthesiser, Model HRG',
      description: 'This cybernetic implant is usually given to those with physical injuries to allow them to repair low-grade tissue damage. Recently, tissue synthesisers have found usage in healthy individuals for cosmetic purposes, though the effects are questionable at best. The Model HRG is unique in its ability to moderately enhance muscle tissue mass in healthy subjects, making it popular among fitness enthusiasts.',
      price: 53.50,
      stock: 93,
      categoryName: 'Cybernetics',
      supplierName: 'Sirta Foundation',
      thumbnail: '67.png'
    },
    {
      name: 'Fissile material compartment',
      description: 'Storage container made of nonflammable materials with a thick water moderator enclosing 42 individual units as part of a container array. The internal moderator permits high vault loadings and substantially reduces the ambient dose rate in the storage area, while also reducing the temperature of the stored fissile material. That\'s what we here call a win-win-win.',
      price: 82.32,
      stock: 337,
      categoryName: 'Provisions',
      supplierName: 'Deckow & Kiehn',
      thumbnail: '76.png'
    },
    {
      name: 'Carbon steel plates',
      description: 'Hardened steel plates designed to be welded over exoskeletons made of suitable alloys. Lightweight yet strong, these add significant strength and improve the structural integrity of the underlying material.',
      price: 12.20,
      stock: 229,
      categoryName: 'Components',
      supplierName: 'Novina Corp',
      thumbnail: '94.png'
    },
    {
      name: 'CL4P-TP General Purpose Bot',
      description: 'Hyperion-designed bot programmed specifically for social interaction and emotional intelligence. Includes different modes to suit different moods, including humorous, ironic, sarcastic, slapstick, and many more. Can occasionally be seen accompanying vault hunters on their adventures across Pandora and the rest of the borderlands. One CL4P-TP unit even made a name for himself as a vault hunter at one point (and perhaps still continues to do so).',
      price: 264.63,
      stock: 152,
      categoryName: 'Cybernetics',
      supplierName: 'Ferrous LPX',
      thumbnail: '95.png'
    },
    {
      name: 'ECHO Holo-Display',
      description: 'Personal digital assitant, communications, calendar and organiser all in a single package. This device also includes a few hidden features, including an experimental quanteum entanglement interfacer, chargeless powercell and cloak field generator.',
      price: 422.19,
      stock: 371,
      categoryName: 'Components',
      supplierName: 'Ferrous LPX',
      thumbnail: '96.png'
    },
    {
      name: 'Cerberus Stasis Module',
      description: 'Prototype device capable of producing a temporary time dilation effect, suspending objects within a designated volume of space for a short period of time. Also features three alternative modes - anti-grav, temporal stasis and time dilation - which work on smaller objects.',
      price: 364.42,
      stock: 74,
      categoryName: 'Cybernetics',
      supplierName: 'G & B Supplies',
      thumbnail: '97.png'
    },
    {
      name: 'Unstable Radioisotope Core',
      description: 'Embeddable high-energy core designed to integrate with powersuits, ship drives and Hyperdyne proprietary energy delivery systems. Powered by a miniaturised fusion device and featuring gravitational stabilisers, nuclear magnetic shielding and replaceable fuel rods.',
      price: 251.00,
      stock: 336,
      categoryName: 'Cybernetics',
      supplierName: 'Deckow & Kiehn',
      thumbnail: '98.png'
    },
    {
      name: 'Biomass Fuel Pellet',
      description: 'Part of a delivery system for active and inert biomass-fueled systems. The liquid suspension is housed within a protective atmosphere that prevents breakdown of the organic material while in storage.',
      price: 36.53,
      stock: 63,
      categoryName: 'Consumables',
      supplierName: 'Sirta Foundation',
      thumbnail: '101.png'
    },
    {
      name: 'Cooling loop reservoir',
      description: 'High-capacity transparent reservoir containing nanofluid coolant, designed to integrate with open liquid cooling loops. Features an automatic air-bleed mechanism and external pump.',
      price: 64.86,
      stock: 274,
      categoryName: 'Consumables',
      supplierName: 'Deckow & Kiehn',
      thumbnail: '103.png'
    },
    {
      name: 'Kryden 640-core CPU chip',
      description: 'Hyperthreaded CPU with variable logical core configuration, designed to work as a secondary processing unit for quantum mainframes, command and navigation systems, communications modules and autonomous synthetics.',
      price: 855.00,
      stock: 42,
      categoryName: 'Cybernetics',
      supplierName: 'Deckow & Kiehn',
      thumbnail: '104.png'
    },
    {
      name: 'Maliwan MCS Caesium Superheater',
      description: 'Precision flame generator for maintenance and engineering applications, with an energy transfer rate of 10 megajoules per second and low heat dissipation coefficient, this is capable of melting through even the toughest alloys without leaving undesirable trace contaminants.',
      price: 68.75,
      stock: 188,
      categoryName: 'Components',
      supplierName: 'Sirta Foundation',
      thumbnail: '105.png'
    },
    {
      name: 'Dragon\'s breath rounds (pack of 2)',
      description: 'Packed with incendiary magnesium shavings capable of instantaneously igniting flammable targets at close to medium range.',
      price: 8.05,
      stock: 2322,
      categoryName: 'Consumables',
      supplierName: 'Deckow & Kiehn',
      thumbnail: 'ammunition_01.png'
    },
    {
      name: '.45 ACP rounds (pack of 12)',
      description: 'Standard issue full metal jacket rounds with brass shell casings.',
      price: 2400,
      stock: 625,
      categoryName: 'Consumables',
      supplierName: 'Mikkei Combine',
      thumbnail: 'ammunition_02.png'
    },
    {
      name: 'Armour-shredding rounds (pack of 3)',
      description: 'High velocity anti-material rifle ammunition, for hectic long-range encounters against synthetics.',
      price: 2400,
      stock: 625,
      categoryName: 'Consumables',
      supplierName: 'Mikkei Combine',
      thumbnail: 'ammunition_03.png'
    },
    {
      name: 'Adaptive antidote',
      description: 'Effective against various poisons, venoms, parastiic infections, synthetic pathogens and drug-resistant strains.',
      price: 25.82,
      stock: 142,
      categoryName: 'Consumables',
      supplierName: 'Deckow & Kiehn',
      thumbnail: 'antidote_01.png'
    },
    {
      name: 'Compact stainless steel awl',
      description: 'Handy and versatile awl for piercing through tough leather hides, thick fabrics, thin metal sheets, and other types of material.',
      price: 6.62,
      stock: 322,
      categoryName: 'Provisions',
      supplierName: 'G & B Supplies',
      thumbnail: 'awl_01.png'
    },
    {
      name: 'Basic fabric bandage (2000mm x 100mm)',
      description: 'Basic field bandage with an antiseptic lining and self-tightening design.',
      price: 0.37,
      stock: 862,
      categoryName: 'Provisions',
      supplierName: 'Sirta Foundation',
      thumbnail: 'bandages_01.png'
    },
    {
      name: 'Steel drum barrel (210 litres)',
      description: 'Standard GV-approved steel drum barrel with removable top, leakproof construction, non-porous materials, latching ring, radiation shileding and plain interior. Suitable for storing various sustances including flammable and volatile fuels, oils, toxic waste, and liquids at extreme temperature ranges.',
      price: 0.37,
      stock: 862,
      categoryName: 'Provisions',
      supplierName: 'G & B Supplies',
      thumbnail: 'barrel_01.png'
    },
    {
      name: 'Polarised cybernetic powercell',
      description: 'Variable charge powercell designed for driving external low-power cybernetic implants. Contains a lithium-caesium mixture with rapid charge capability and long battery life.',
      price: 1.52,
      stock: 761,
      categoryName: 'Cybernetics',
      supplierName: 'G & B Supplies',
      thumbnail: 'battery_01.png'
    },
    {
      name: 'Bootleg Ryncol (190 proof)',
      description: 'Extremely potent Krogan liquor originally manufactured using engine coolant and industrial cleaner. Its exact composition is unknown and krogans say it "hits aliens like ground glass". Acidic and highly flammable, it\'s capable of melting through machinery, making its consumption extremely hazardous to non-krogans.',
      price: 26.00,
      stock: 422,
      categoryName: 'Consumables',
      supplierName: 'Mikkei Combine',
      thumbnail: 'beer_01.png'
    },
    {
      name: 'General purpose bolt',
      description: 'Nickel-iron screw-thread bolt used in construction, DIY projects, mechanical devices and small and large machinery.',
      price: 0.31,
      stock: 238,
      categoryName: 'Provisions',
      supplierName: 'G & B Supplies',
      thumbnail: 'bolt_01.png'
    },
    {
      name: 'Spacer\'s diary',
      description: 'Personal journal belonging to an unknown passenger aboard the Greenleaf freighter during its journey across the Attican Traverse.',
      price: 0.72,
      stock: 251,
      categoryName: 'Lost & Found',
      supplierName: 'Novina Corp',
      thumbnail: 'book_01.png'
    },
    {
      name: 'Double-Bulleit Frontier Bourbon',
      description: 'Original Kentucky bourbon whiskey with high-rye content, distinctive oaky aroma, spicy notes, subtle toffee flavour and an ultra smooth finish.',
      price: 32.00,
      stock: 572,
      categoryName: 'Consumables',
      supplierName: 'Ferrous LPX',
      thumbnail: 'bottle_01.png'
    },
    {
      name: 'Medium wooden box',
      description: 'Multi-purpose, medium capacity storage box constructed using synthetic oak, with a waterproof outer coat and internal insulation.',
      price: 37.16,
      stock: 169,
      categoryName: 'Provisions',
      supplierName: 'Deckow & Kiehn',
      thumbnail: 'box_01.png'
    },
    {
      name: 'Wooden storage crate with lid',
      description: 'General purpose wooden crate for assorted item storage, including personal items, perishable goods, fresh produce, machinery, tools, and more.',
      price: 34.00,
      stock: 233,
      categoryName: 'Provisions',
      supplierName: 'Deckow & Kiehn',
      thumbnail: 'box_02.png'
    },
    {
      name: 'Block of butter',
      description: 'Preserved unsalted butter churned from grolak milk. Loved by grolaks, but is probably unsafe for human consumption.',
      price: 1.65,
      stock: 621,
      categoryName: 'Consumables',
      supplierName: 'G & B Supplies',
      thumbnail: 'box_03.png'
    },
    {
      name: 'Cleaning brush',
      description: 'Basic cleaning brush. Can be used on teeth, clothes, floors, machine parts, eyebrows, hair, and almost anything you can think of.',
      price: 0.82,
      stock: 172,
      categoryName: 'Junk',
      supplierName: 'G & B Supplies',
      thumbnail: 'brush_01.png'
    },
    {
      name: 'Bucket',
      description: 'A simple metallic bucket with a swing handle.',
      price: 2.17,
      stock: 752,
      categoryName: 'Junk',
      supplierName: 'G & B Supplies',
      thumbnail: 'bucket_01.png'
    },
    {
      name: 'Numbered notebook',
      description: 'A spiral notebook with a single number printed on each page. The design intent behind this item is unclear and its usefulness is questionable at best, which is why it is being sold at a steep discount.',
      price: 0.06,
      stock: 3211,
      categoryName: 'Junk',
      supplierName: 'G & B Supplies',
      thumbnail: 'calendar_01.png'
    },
    {
      name: 'Plain notebook',
      description: 'Spiral notebook with plain cream pages (300 GSM) and a hard leather back.',
      price: 3.80,
      stock: 772,
      categoryName: 'Junk',
      supplierName: 'G & B Supplies',
      thumbnail: 'calendar_02.png'
    },
    {
      name: 'Gentleman\'s Cane',
      description: 'Elegant wooden cane with a 9-carat gold handle. Ideal for cane connoisseur with sophisticated tastes.',
      price: 511.00,
      stock: 133,
      categoryName: 'Provisions',
      supplierName: 'Deckow & Kiehn',
      thumbnail: 'cane_01.png'
    },
    {
      name: 'Playing cards',
      description: 'Caprican playing cards typically used to play Dead Man\'s Chest and Triad.',
      price: 12.00,
      stock: 208,
      categoryName: 'Junk',
      supplierName: 'Sirta Foundation',
      thumbnail: 'cards_01.png'
    },
    {
      name: 'Crosska chocolate bar',
      description: 'Plain choclate bar made with artificial cocoa, synthetic milk and edible organic plastic.',
      price: 1.20,
      stock: 198,
      categoryName: 'Consumables',
      supplierName: 'Sirta Foundation',
      thumbnail: 'chocolate_01.png'
    },
    {
      name: 'Clew',
      description: 'A ball of thread found in a crate on some shipwreck.',
      price: 0.72,
      stock: 720,
      categoryName: 'Junk',
      supplierName: 'G & B Supplies',
      thumbnail: 'clew_01.png'
    },
    {
      name: 'Whac-A-Mole club',
      description: 'Basic wooden club constructed from cheap syntehtic materials. Prone to breakage and not suitable for real ball games.',
      price: 9.00,
      stock: 271,
      categoryName: 'Junk',
      supplierName: 'G & B Supplies',
      thumbnail: 'club_01.png'
    },
    {
      name: 'Corkscrew',
      description: 'Basic metallic corkscrew with wooden handle for opening vintage cork-top bottles.',
      price: 1.50,
      stock: 188,
      categoryName: 'Junk',
      supplierName: 'Novina Corp',
      thumbnail: 'corkscrew_01.png'
    },
    {
      name: 'Heavy wrecking crowbar',
      description: 'Heat treated carbon steel construction with chisel end and swan neck. Forged and ground with hexagonal shank.',
      price: 7.30,
      stock: 211,
      categoryName: 'Junk',
      supplierName: 'Ferrous LPX',
      thumbnail: 'crowbar_01.png'
    },
    {
      name: 'Salted caramel doughnut',
      description: 'Fresh glazed dougnut with salted caramel filling. Doughnuts don\'t get any better than this.',
      price: 0.14,
      stock: 7254,
      categoryName: 'Junk',
      supplierName: 'Ferrous LPX',
      thumbnail: 'donut_01.png'
    },
    {
      name: 'Nobels Extradynamit',
      description: 'Construction dynamite made with powdered clay and a copper percussion cap. Especially designed for construction applications.',
      price: 51.34,
      stock: 155,
      categoryName: 'Consumables',
      supplierName: 'Mikkei Combine',
      thumbnail: 'dynamite_01.png'
    },
    {
      name: 'Extinguisher',
      description: 'Dry powwder fire extinguisher especially suited for mixed fire risk environments, making it a good all-rounder for different types of fires. Also effective agaisnt methane, propane, hydrogen and natural gas.',
      price: 32.00,
      stock: 281,
      categoryName: 'Provisions',
      supplierName: 'Deckow & Kiehn',
      thumbnail: 'extinguisher_01.png'
    },
    {
      name: 'Dry soil fertiliser',
      description: 'Heavily fortified phosphorous-potassium mixture intended for depleted soil patches, barren terrain and pest-inflicted crops.',
      price: 12.90,
      stock: 145,
      categoryName: 'Junk',
      supplierName: 'Deckow & Kiehn',
      thumbnail: 'fertilizers_01.png'
    },
    {
      name: 'Flash drive',
      description: 'Portable NVME drive with a TLC memory controller, 10-digit encryption and expandable storage.',
      price: 17.39,
      stock: 1022,
      categoryName: 'Components',
      supplierName: 'Novina Corp',
      thumbnail: 'flash_drive_02.png'
    },
    {
      name: 'UV beam torch',
      description: 'UV flashlight with excellent range, 16 bit dimming, 250V fuse, 0-100% brightness curve, strobe function and variable fade control.',
      price: 27.12,
      stock: 721,
      categoryName: 'Provisions',
      supplierName: 'Mikkei Combine',
      thumbnail: 'flashlight_01.png'
    },
    {
      name: 'Stainless steel hip flask',
      description: 'Take your favourite tipple with you on chilly winter walks with this screw-top stainless steel hip flask, whether it\'s bourbon, single-malt, raslak or ryncol.',
      price: 36.67,
      stock: 485,
      categoryName: 'Provisions',
      supplierName: 'Deckow & Kiehn',
      thumbnail: 'flask_01.png'
    },
    {
      name: 'Mystery elixir',
      description: 'Unknown potion of Batarian origin. Some claim it possesses medicinal benefits, while others insist that it\'s a potent biotoxin.',
      price: 14.46,
      stock: 182,
      categoryName: 'Consumables',
      supplierName: 'Sirta Foundation',
      thumbnail: 'flask_02.png'
    },
    {
      name: 'Gaff hook',
      description: 'Razor sharp hook designed to fit onto fishing gaffs, but it probably has some alternative uses.',
      price: 0.28,
      stock: 84,
      categoryName: 'Junk',
      supplierName: 'G & B Supplies',
      thumbnail: 'gaff_01.png'
    },
    {
      name: '8-segment rotary gear',
      description: 'Straight steel gear with 8mm bore diameter, 40mm pitch diameter and 19mm hub diameter. Compatible with machine tools, transmissions and complex gear groupings.',
      price: 7.05,
      stock: 294,
      categoryName: 'Components',
      supplierName: 'Ferrous LPX',
      thumbnail: 'gears_01.png'
    },
    {
      name: 'Birthday gift',
      description: 'Unclaimed personal gift containing a random item. Looks like someone missed their birthday, but don\'t let that spoil your fun. In a way, you\'ll be celebrating their birthday on their behalf.',
      price: 1.59,
      stock: 48,
      categoryName: 'Lost & Found',
      supplierName: 'Mikkei Combine',
      thumbnail: 'gift_01.png'
    },
    {
      name: 'Reading glasses',
      description: 'Elegant glasses in pristine condition, fitted with non-prescription lenses.',
      price: 4.00,
      stock: 362,
      categoryName: 'Junk',
      supplierName: 'G & B Supplies',
      thumbnail: 'glasses_01.png'
    },
    {
      name: 'Replica Jacob\'s "Two Fer" Maggie',
      description: 'A toy replica of the infamous Jacob\'s Maggie revolver, chambered in 0.38 ammunition. The original kicks like an angry mule but packs a wallop and is known (and feared) for its reliability and effectiveness.',
      price: 74.00,
      stock: 215,
      categoryName: 'Replicas',
      supplierName: 'Novina Corp',
      thumbnail: 'gun_01.png'
    },
    {
      name: 'Club hammer',
      description: 'Whether you\'re looking to hammer some nails, tenderise a slab of meat or break through a strong wall, this hammer has all of your needs covered.',
      price: 7.66,
      stock: 175,
      categoryName: 'Junk',
      supplierName: 'Sirta Foundation',
      thumbnail: 'hammer_01.png'
    },
    {
      name: 'Crash helmet',
      description: 'Fibreglass safety helmet with removable head strap, internal loudspeakers, thick protective shell and opaque visor. That means you won\'t be able to see anything while wearing this helmet.',
      price: 38.62,
      stock: 89,
      categoryName: 'Junk',
      supplierName: 'Deckow & Kiehn',
      thumbnail: 'helmet_01.png'
    },
    {
      name: 'Insulating tape',
      description: 'A handy item for electrical work, engineering jobs, repair and maintenance tasks, or general household duties.',
      price: 3.18,
      stock: 283,
      categoryName: 'Junk',
      supplierName: 'Ferrous LPX',
      thumbnail: 'insulating_tape_01.png'
    },
    {
      name: 'Jerry can',
      description: '20 litre fuel oil storage can made of aluminium alloy and coated with fuel-resistant alkyd ammonia paint to prevent internal rust.',
      price: 7.00,
      stock: 653,
      categoryName: 'Junk',
      supplierName: 'Mikkei Combine',
      thumbnail: 'jerrycan_01.png'
    },
    {
      name: 'Storage unit key',
      description: 'Generic lockbox key of unknown origin. Might be worth something if you melt it down.',
      price: 0.60,
      stock: 18,
      categoryName: 'Lost & Found',
      supplierName: 'Sirta Foundation',
      thumbnail: 'key_01.png'
    },
    {
      name: 'Outdoor key',
      description: 'Lost key possibly belonging to a storage shed or some kind of outdoor structure.',
      price: 1.13,
      stock: 62,
      categoryName: 'Lost & Found',
      supplierName: 'G & B Supplies',
      thumbnail: 'key_02.png'
    },
    {
      name: 'Brass key',
      description: 'Unclaimed key of unknown origin. Belongs to a set of similar keys found abandoned near a residential facility.',
      price: 0.84,
      stock: 7,
      categoryName: 'Lost & Found',
      supplierName: 'Sirta Foundation',
      thumbnail: 'key_03.png'
    },
    {
      name: 'Silver ring key',
      description: 'This key seems to be decorative or ornamental rather than functional.',
      price: 2.84,
      stock: 13,
      categoryName: 'Lost & Found',
      supplierName: 'Deckow & Kiehn',
      thumbnail: 'key_04.png'
    },
    {
      name: 'Spare car key',
      description: 'This seems to be some sort of personal vehicle key with a separate remote control unit.',
      price: 0.73,
      stock: 7,
      categoryName: 'Lost & Found',
      supplierName: 'Novina Corp',
      thumbnail: 'key_05.png'
    },
    {
      name: 'Fixed blade knife',
      description: 'Utility blade with a fixed straight 6-inch steel blade, full tang and steel grip.',
      price: 37.00,
      stock: 736,
      categoryName: 'Provisions',
      supplierName: 'Mikkei Combine',
      thumbnail: 'knife_01.png'
    },
    {
      name: 'Pocket knife',
      description: 'Compact knife with a 3-inch straight-edged blade and smooth locking action.',
      price: 32.50,
      stock: 820,
      categoryName: 'Provisions',
      supplierName: 'Mikkei Combine',
      thumbnail: 'knife_02.png'
    },
    {
      name: 'Sealed letter',
      description: 'An old official letter with a plain wax seal found in an abandoned outpost in the Thousand Cuts region of Charon-6.',
      price: 0.27,
      stock: 8,
      categoryName: 'Junk',
      supplierName: 'G & B Supplies',
      thumbnail: 'letter_01.png'
    },
    {
      name: 'LED lightbulb',
      description: 'Virtual filament flat cap lightbulb with 1055lm brightness and 10W power draw.',
      price: 3.85,
      stock: 377,
      categoryName: 'Provisions',
      supplierName: 'G & B Supplies',
      thumbnail: 'lightbulb_01.png'
    },
    {
      name: 'Kerosene oil lighter',
      description: 'Zinc alloy mechanical oil-based lighter for high-end cigars.',
      price: 36.00,
      stock: 526,
      categoryName: 'Provisions',
      supplierName: 'Sirta Foundation',
      thumbnail: 'lighter_01.png'
    },
    {
      name: 'Magnifying glass',
      description: 'Basic magnification lens with wooden handle. Not to be used against ants.',
      price: 5.15,
      stock: 294,
      categoryName: 'Provisions',
      supplierName: 'Mikkei Combine',
      thumbnail: 'magnifier_01.png'
    },
    {
      name: 'Vierja capsules',
      description: 'Potent, fast-acting and long-lasting painkillers for some serious pain relief. Sirta\'s pharmaceutics division managed to engineer the active substance with a pharmakokinetic profile that minimises toxicity even at high doses.',
      price: 48.00,
      stock: 995,
      categoryName: 'Consumables',
      supplierName: 'Sirta Foundation',
      thumbnail: 'medicine_01.png'
    },
    {
      name: 'Medical supplies chest',
      description: 'Secure and sterile container for holding medical supplies. Includes complimentary first-aid action kit with a few Medi-Gels, sterile gauze, bandages and painkillers.',
      price: 18.00,
      stock: 753,
      categoryName: 'Consumables',
      supplierName: 'Sirta Foundation',
      thumbnail: 'medicine_chest_01.png'
    },
    {
      name: 'Counterfeit bank notes',
      description: 'Seized from Eclipse mercenaries by a rival organisation during a bandit camp raid, these counterfeit notes are worthless but are highly flammable, serving as an excellent feed source for your next camp fire.',
      price: 0.60,
      stock: 680,
      categoryName: 'Junk',
      supplierName: 'Ferrous LPX',
      thumbnail: 'money_01.png'
    },
    {
      name: 'Mouthpiece broadcaster',
      description: 'For when you need to make a statement or if you\'re feeling the need to be heard out loud, take this mouthpiece to your next group gathering and let the world hear your voice.',
      price: 14.40,
      stock: 321,
      categoryName: 'Junk',
      supplierName: 'Mikkei Combine',
      thumbnail: 'mouthpiece_01.png'
    },
    {
      name: 'Standard 3-inch nail',
      description: 'Iron nail with straight flat tip and circular top section.',
      price: 0.08,
      stock: 2324,
      categoryName: 'Junk',
      supplierName: 'Deckow & Kiehn',
      thumbnail: 'nail_01.png'
    },
    {
      name: 'Threading needle',
      description: 'Use this for your next sewing adventure, whether you\'re working on fabrics or flesh.',
      price: 2.00,
      stock: 741,
      categoryName: 'Junk',
      supplierName: 'Deckow & Kiehn',
      thumbnail: 'needle_01.png'
    },
    {
      name: 'Wire cutter',
      description: 'Basic plier for cutting through electircal cables, coils, thin metal sheets, jewellery, bones, etc.',
      price: 13.57,
      stock: 466,
      categoryName: 'Provisions',
      supplierName: 'Novina Corp',
      thumbnail: 'nippers_01.png'
    },
    {
      name: 'Ship captain\'s personal jounal entry',
      description: 'An extract taken from a ship captain\'s personal journal which was found in an abandoned mining settlement on Rygel-9.',
      price: 0.47,
      stock: 22,
      categoryName: 'Junk',
      supplierName: 'Novina Corp',
      thumbnail: 'note_01.png'
    },
    {
      name: 'Manuscript fragment',
      description: 'A set of pages from an unknown manuscript written in an undocumented language.',
      price: 7.92,
      stock: 18,
      categoryName: 'Junk',
      supplierName: 'Sirta Foundation',
      thumbnail: 'note_02.png'
    },
    {
      name: 'Steel hex nut',
      description: 'General purpose hexagonal fastener for connecting and tightening bolts or screws in a wide range of applications.',
      price: 1.12,
      stock: 1273,
      categoryName: 'Junk',
      supplierName: 'G & B Supplies',
      thumbnail: 'nut_01.png'
    },
    {
      name: 'Milk carton',
      description: 'Preserved milk from synthetic cows. Not the tastiest stuff, but at least it doesn\'t go off.',
      price: 0.42,
      stock: 713,
      categoryName: 'Consumables',
      supplierName: 'G & B Supplies',
      thumbnail: 'packaging_01.png'
    },
    {
      name: 'Plain notebook',
      description: 'Great for journalling, note-taking, scribbling, drawing, or simply capturing creative thoughts and ideas.',
      price: 2.00,
      stock: 170,
      categoryName: 'Junk',
      supplierName: 'G & B Supplies',
      thumbnail: 'pad_01.png'
    },
    {
      name: 'Covert IDENT chip',
      description: 'Configurable identity chip that prevents detection systems from registering the user on facial and DNA-based recognition systems. It hides the user\'s identity by masking its signal emissions with broad-spectrum interference which is perceived as background noise by most detection systems.',
      price: 372.50,
      stock: 183,
      categoryName: 'Cybernetics',
      supplierName: 'Ferrous LPX',
      thumbnail: 'pass_01.png'
    },
    {
      name: 'Enhanced ID documents',
      description: 'Expertly forged passport enabling anonymous and untraceable passage through restricted trade zones.',
      price: 1300.00,
      stock: 207,
      categoryName: 'Provisions',
      supplierName: 'Ferrous LPX',
      thumbnail: 'passport_01.png'
    },
    {
      name: 'Protective plaster',
      description: 'Cushioned plaster with topical local anaesthetic and antiseptic center patch.',
      price: 0.28,
      stock: 870,
      categoryName: 'Consumables',
      supplierName: 'Sirta Foundation',
      thumbnail: 'patch_01.png'
    },
    {
      name: 'Pencil',
      description: 'Basic pencil for writing, drawing, or as a behind-the-ear accessory.',
      price: 0.17,
      stock: 259,
      categoryName: 'Junk',
      supplierName: 'G & B Supplies',
      thumbnail: 'pencil_01.png'
    },
    {
      name: 'Hyperion HX-3000 tablet',
      description: 'Digital organiser, personal assistant, streaming device and data analyser, all wrapped up in one power-efficient package housing a 180-core CPU, virtual volatile memory and floating inputs.',
      price: 736.00,
      stock: 518,
      categoryName: 'Provisions',
      supplierName: 'Novina Corp',
      thumbnail: 'phone_01.png'
    },
    {
      name: 'AdrenoCoryzone combo',
      description: 'Prescription-free combination regimen consisting of AdrenoCore and Coryzone, a fast-onset adrenergic agonist and a short-acting stimulant, respectively.',
      price: 28.80,
      stock: 322,
      categoryName: 'Consumables',
      supplierName: 'Sirta Foundation',
      thumbnail: 'pills_01.png'
    },
    {
      name: 'AdrenoCore capsule',
      description: 'Adrenergic receptor agonist with fast onset and negligible side-effect profile.',
      price: 15.00,
      stock: 219,
      categoryName: 'Consumables',
      supplierName: 'Sirta Foundation',
      thumbnail: 'pills_02.png'
    },
    {
      name: 'Orexeza tablets',
      description: 'Appetite suppressant used in weight loss therapy as well as by slingshot racers, athletes and those undergoing radiation exposure.',
      price: 32.00,
      stock: 755,
      categoryName: 'Consumables',
      supplierName: 'Sirta Foundation',
      thumbnail: 'pills_03.png'
    },
    {
      name: 'Safety pin',
      description: 'Basic nickel-palted safety pin for your sewing kit.',
      price: 1.17,
      stock: 326,
      categoryName: 'Junk',
      supplierName: 'G & B Supplies',
      thumbnail: 'pin_01.png'
    },
    {
      name: 'Copper pipe',
      description: 'Generic pipe with U-bend. Part of most standard plumbing systems.',
      price: 8.42,
      stock: 192,
      categoryName: 'Junk',
      supplierName: 'Deckow & Kiehn',
      thumbnail: 'pipe_01.png'
    },
    {
      name: 'Fluorescent flowering plant',
      description: 'Genetically modified lily with glow-in-the-dark phenotype and anti-senescence.',
      price: 3.62,
      stock: 422,
      categoryName: 'Lost & Found',
      supplierName: 'Mikkei Combine',
      thumbnail: 'plant_01.png'
    },
    {
      name: 'Ceramic pot',
      description: 'Growing pot for small plants. Comes with fortified soil mix.',
      price: 0.73,
      stock: 658,
      categoryName: 'Junk',
      supplierName: 'Sirta Foundation',
      thumbnail: 'pot_01.png'
    },
    {
      name: 'Fossilised hand print',
      description: 'Fossilised specimen discovered in an Earth cave dating back to the early paleoxoic period.',
      price: 0.06,
      stock: 8,
      categoryName: 'Junk',
      supplierName: 'Deckow & Kiehn',
      thumbnail: 'print_01.png'
    },
    {
      name: 'Cloth rag',
      description: 'Thin plain waterproof rag with anti-static technology.',
      price: 0.28,
      stock: 530,
      categoryName: 'Junk',
      supplierName: 'Deckow & Kiehn',
      thumbnail: 'rag_01.png'
    },
    {
      name: 'Garden rake',
      description: 'Raking tool with 6-tooth design, composite handle and adjustable spacing.',
      price: 4.00,
      stock: 64,
      categoryName: 'Junk',
      supplierName: 'Novina Corp',
      thumbnail: 'rake_01.png'
    },
    {
      name: 'Carpenter\'s rasp',
      description: 'Flat single-sided carbon-steel rasp for shaping wood.',
      price: 12.42,
      stock: 167,
      categoryName: 'Junk',
      supplierName: 'Ferrous LPX',
      thumbnail: 'rasp_01.png'
    },
    {
      name: 'Safety razor',
      description: 'Cheap safety razor with a single blunt-edged blade. This will leave one hell of a razor burn.',
      price: 0.30,
      stock: 767,
      categoryName: 'Junk',
      supplierName: 'G & B Supplies',
      thumbnail: 'razor_01.png'
    },
    {
      name: 'Barber\'s straight razor',
      description: 'High quality barber\'s razor with replaceable sharp alloy blade and loose pivot joint.',
      price: 6.50,
      stock: 624,
      categoryName: 'Junk',
      supplierName: 'G & B Supplies',
      thumbnail: 'razor_02.png'
    },
    {
      name: 'Steel ring',
      description: 'Non-descript cheap ring of brittle design. The outer surface appears chipped and slightly tarnished.',
      price: 0.17,
      stock: 27,
      categoryName: 'Lost & Found',
      supplierName: 'G & B Supplies',
      thumbnail: 'ring_01.png'
    },
    {
      name: 'Braided rope',
      description: '8mm 2-strand synthetic utility rope suitable for outdoor tasks, crafts, DIY, sports, etc.',
      price: 2.72,
      stock: 539,
      categoryName: 'Junk',
      supplierName: 'G & B Supplies',
      thumbnail: 'rope_01.png'
    },
    {
      name: 'Hand saw',
      description: 'Chromium-vanadium steel saw with metal handle. Suitable for use on wood, metal and plastic.',
      price: 27.00,
      stock: 372,
      categoryName: 'Junk',
      supplierName: 'Novina Corp',
      thumbnail: 'saw_01.png'
    },
    {
      name: 'Flat screw',
      description: 'Basic utility screw with 40mm length and 14 inch thread.',
      price: 0.18,
      stock: 826,
      categoryName: 'Junk',
      supplierName: 'Novina Corp',
      thumbnail: 'screw_01.png'
    },
    {
      name: 'Undertaker\'s shovel',
      description: 'Basic outdoor shovel with steel head and wooden handle.',
      price: 8.00,
      stock: 175,
      categoryName: 'Junk',
      supplierName: 'G & B Supplies',
      thumbnail: 'shovel_01.png'
    },
    {
      name: 'UP stimulant drink (370ml)',
      description: 'Keeps you going even when you\'re running on empty. Enriched with cadmium, azathioprine, naphthylamine and thorium-232.',
      price: 1.50,
      stock: 1227,
      categoryName: 'Consumables',
      supplierName: 'G & B Supplies',
      thumbnail: 'soda_01.png'
    },
    {
      name: 'Brass spring',
      description: 'Flexible brass spring with 5-inch diameter and 4-foot extended length.',
      price: 2.43,
      stock: 263,
      categoryName: 'Junk',
      supplierName: 'G & B Supplies',
      thumbnail: 'spring_01.png'
    },
    {
      name: 'Straight ladder',
      description: 'Small single-section wooden ladder with reinforced rungs.',
      price: 15.43,
      stock: 421,
      categoryName: 'Junk',
      supplierName: 'Deckow & Kiehn',
      thumbnail: 'stairs_01.png'
    },
    {
      name: 'Medical syringe',
      description: '100ml plastic syringe with single-use sterile hypodermic needle.',
      price: 2.62,
      stock: 886,
      categoryName: 'Provisions',
      supplierName: 'Sirta Foundation',
      thumbnail: 'syringe_01.png'
    },
    {
      name: 'Tension strap',
      description: 'Elasticated tensioning strap for stabilising joints and ligaments. Can also be used as a torniquet.',
      price: 0.40,
      stock: 425,
      categoryName: 'Provisions',
      supplierName: 'Sirta Foundation',
      thumbnail: 'tape_01.png'
    },
    {
      name: 'Canned soup',
      description: 'Canned green tomatoes for your next soup, preserved in a herb and tomato mix.',
      price: 0.25,
      stock: 2143,
      categoryName: 'Consumables',
      supplierName: 'G & B Supplies',
      thumbnail: 'tomato_soup_01.png'
    },
    {
      name: 'Contractor\'s trowel',
      description: 'Tradesman tool with a hardened and corrosion-resistant steel head. Ideal for plastering, masonry, tiling and brick work.',
      price: 4.20,
      stock: 57,
      categoryName: 'Junk',
      supplierName: 'G & B Supplies',
      thumbnail: 'trowel_01.png'
    },
    {
      name: 'Antique mechanical watch',
      description: 'Sophisticated timepiece with leather strap, brass parts, floating dials and mechanical clockwork mechanism.',
      price: 225.00,
      stock: 230,
      categoryName: 'Provisions',
      supplierName: 'G & B Supplies',
      thumbnail: 'watch_01.png'
    },
    {
      name: 'Drinking water',
      description: 'Distilled deuterium water in a biodegradeable bottle.',
      price: 0.21,
      stock: 905,
      categoryName: 'Consumables',
      supplierName: 'Sirta Foundation',
      thumbnail: 'water_01.png'
    },
    {
      name: 'Ultrasonic whistle',
      description: 'Whistle with adjustable waveform characteristics. Useful for training animals and pets...and some humans.',
      price: 0.31,
      stock: 107,
      categoryName: 'Junk',
      supplierName: 'Mikkei Combine',
      thumbnail: 'whistle_01.png'
    },
    {
      name: 'Split-ended rhodium wire',
      description: 'Superconducting magnetised cable for communications circuitry, power delivery systems and charge transduction components.',
      price: 41.00,
      stock: 407,
      categoryName: 'Cybernetics',
      supplierName: 'Ferrous LPX',
      thumbnail: 'wire_01.png'
    },
    {
      name: 'Continuous rhodium wire',
      description: 'Continuous rhodium cable with protective sleeve cover, ideal for use with solenoids, small motors and electrical generators.',
      price: 35.00,
      stock: 420,
      categoryName: 'Cybernetics',
      supplierName: 'Ferrous LPX',
      thumbnail: 'wire_02.png'
    },
    {
      name: 'Vanadium steel spanner',
      description: 'Everyday tool for tightening and loosening nuts and bolts. Made with vanadium steel and measuring 13 x 15 mm.',
      price: 5.27,
      stock: 368,
      categoryName: 'Junk',
      supplierName: 'Mikkei Combine',
      thumbnail: 'wrench_01.png'
    },
  ],
  addresses: [
    {
      /* id: 1 */
      addressLine1: '1 Konopelski Close',
      addressLine2: 'Suite 734',
      city: 'Wintheiserhill',
      county: 'Central',
      postcode: 'BQ5 9TU'
    },
    {
       /* id: 2 */
      addressLine1: '69 Elliot Wynd',
      addressLine2: 'Apt. 690',
      city: 'Nether Leannon',
      county: 'Dumfries and Galloway',
      postcode: 'IU6 4BM'
    },
    {
       /* id: 3 */
      addressLine1: "2 O'Keefe Brow",
      addressLine2: 'Suite 254',
      city: 'Newton Feilfield',
      county: 'West Glamorgan',
      postcode: 'XN06 4IN'
    },
    {
       /* id: 4 */
      addressLine1: '38 Brennan Hill',
      addressLine2: 'Apt. 142',
      city: 'Nether Tremblaywood',
      county: 'Borders',
      postcode: 'HI9 8ON'
    },
    {
       /* id: 5 */
      addressLine1: '50 Jazmyne Approach',
      addressLine2: 'Suite 430',
      city: 'West Lebsack Cross',
      county: 'Herefordshire',
      postcode: 'IU0 7PF'
    },
    {
       /* id: 6 */
      addressLine1: '467 Hallie Side',
      addressLine2: 'Apt. 697',
      city: 'Streich Cross',
      county: 'Bedfordshire',
      postcode: 'GB53 0OZ'
    },
    {
       /* id: 7 */
      addressLine1: '353 Cristian Glade',
      addressLine2: 'Apt. 626',
      city: 'South Rodriguez',
      county: 'Devon',
      postcode: 'JT0 9JE'
    },
    {
       /* id: 8 */
      addressLine1: '51 Kertzmann Park',
      addressLine2: 'Apt. 630',
      city: "O'Hara-under-Champlin-Kreiger",
      county: 'Somerset',
      postcode: 'BU72 9TW'
    },
    {
       /* id: 9 */
      addressLine1: '7 Verona Ridge',
      addressLine2: 'Apt. 786',
      city: 'Upper Bernhard-Cormier',
      county: 'Worcestershire',
      postcode: 'QV08 1DV'
    },
    {
       /* id: 10 */
      addressLine1: '30 Bode Road',
      addressLine2: 'Suite 132',
      city: 'Castle Hettinger',
      county: 'East Sussex',
      postcode: 'SO62 9OH'
    },
    {
       /* id: 11 */
      addressLine1: '32 Heath Side',
      addressLine2: 'Apt. 194',
      city: 'White Common',
      county: 'Kent',
      postcode: 'NQ0 3MX'
    },
    {
       /* id: 12 */
      addressLine1: '7 Aurelie Street',
      addressLine2: 'Suite 483',
      city: 'Wolfton',
      county: 'Hampshire',
      postcode: 'BR59 5PP'
    }
  ],
  customers: [
    {
      name: 'Alex Nes',
      username: 'alexnes',
      password: '$2b$10$3GyH.r/44whUPlyf0tTi/ejA2JFm2ERzS6guIONKB9FkfyEANiNbS',
      email: 'alex-nes@nexus.pk',
      joinDate: "2021-11-16T23:27:52.223Z",
      billingAddressId: 7,
      shippingAddressId: 8
    },
    {
      name: 'Randi Harvey',
      username: 'Randi.Harvey',
      password: '$2b$10$3GyH.r/44whUPlyf0tTi/ejA2JFm2ERzS6guIONKB9FkfyEANiNbS',
      email: 'Randi.Harvey@hotmail.com',
      billingAddressId: 2,
      shippingAddressId: 2,
      avatar: 'https://avatars.githubusercontent.com/u/38972965'
    },
    {
      name: 'Frida Flatley',
      username: 'Frida93',
      password: '$2b$10$3GyH.r/44whUPlyf0tTi/ejA2JFm2ERzS6guIONKB9FkfyEANiNbS',
      email: 'Frida_Flatley34@yahoo.com',
      billingAddressId: 3,
      shippingAddressId: 3,
      avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/793.jpg'
    },
    {
      name: 'Simone Kris',
      username: 'Simone28',
      password: '$2b$10$3GyH.r/44whUPlyf0tTi/ejA2JFm2ERzS6guIONKB9FkfyEANiNbS',
      email: 'Simone.Kris@yahoo.com',
      billingAddressId: 4,
      shippingAddressId: 4,
      avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1102.jpg'
    },
    {
      name: 'Olen Ritchie',
      username: 'Olen.Ritchie95',
      password: '$2b$10$3GyH.r/44whUPlyf0tTi/ejA2JFm2ERzS6guIONKB9FkfyEANiNbS',
      email: 'Olen_Ritchie@yahoo.com',
      billingAddressId: 5,
      shippingAddressId: 5,
      avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/899.jpg'
    },
    {
      name: 'Ryo Ishida',
      username: 'four',
      password: '$2b$10$3GyH.r/44whUPlyf0tTi/ejA2JFm2ERzS6guIONKB9FkfyEANiNbS',
      email: 'ryo_tetsuda@zairon.com',
      billingAddressId: 6,
      shippingAddressId: 6
    },
  ]
}
